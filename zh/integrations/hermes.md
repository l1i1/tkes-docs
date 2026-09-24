---
title: Hermes Agent
description: 将 Nous Research 的 Hermes Agent 接入 Tokeness，包含自定义网关必须显式声明的提示缓存设置。
---

# Hermes Agent

Hermes Agent 是 Nous Research 的开源智能体，支持两种传输协议：OpenAI 兼容的 Chat Completions，以及原生 Anthropic Messages。Tokeness 两者都支持。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| 传输协议 | `anthropic_messages`（调用 Claude 推荐）或 `openai_chat` |
| Base URL（`anthropic_messages`） | `https://n.tokeness.dev` |
| Base URL（`openai_chat`） | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 控制台复制的完整模型名 |

## 1. 准备 Tokeness

在 Tokeness 控制台完成：

1. 确认钱包余额可用。
2. 创建 Hermes 专用 API Key。
3. 复制要用的完整模型名（例如 `claude-opus-5-5`）。
4. 打开使用日志，后面验证请求。

## 2. 配置 Hermes

编辑 `~/.hermes/config.yaml`。调用 Claude 时推荐原生 Anthropic 传输：

```yaml
model:
  provider: anthropic
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev
  api_mode: anthropic_messages
```

也可以走 OpenAI 兼容传输：

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev/v1
  api_mode: chat_completions
```

API Key 放 `~/.hermes/.env`，不要写进 `config.yaml`。

## 3. 显式开启提示缓存

Anthropic 的提示缓存是**显式**的：请求里必须带 `cache_control` 断点，上游才会缓存这段前缀；没有断点就每一轮按全价重算整段上下文。Hermes 自己会注入这些断点，但它只对**能识别的供应商、域名和模型族**注入；Tokeness 属于自定义端点，Hermes 的默认判定是保守的，也就是**不注入**。

这解释了为什么只改传输协议（`api_mode` 改成 Anthropic）不会让命中率变好——改协议不改变这个判定，只有显式声明才会。

在对应供应商条目下按模型声明：

```yaml
providers:
  tokeness:
    api: https://n.tokeness.dev/v1
    transport: openai_chat        # 或 anthropic_messages
    api_key: ${TOKENESS_API_KEY}
    discover_models: false        # 见第 4 步
    models:
      claude-opus-5-5:
        prompt_caching: true
```

要点：

- `models:` 下的键名必须与控制台里的完整模型名一致。
- `transport` 决定断点布局：`openai_chat` 用 OpenAI 信封布局，`anthropic_messages` 用原生块内布局。两种布局 Tokeness 都能正确转换，不必为了缓存而换协议。
- 省略 `prompt_caching` 时 Hermes 保持保守（不注入）；显式写 `false` 则强制关闭。

可选的缓存有效期（默认 5 分钟；长会话、轮次间隔较久时可改成 1 小时）：

```yaml
prompt_caching:
  cache_ttl: "5m"     # 或 "1h"
```

## 4. 模型名需要手动填写

Tokeness 的 `/v1/models` 只返回公开分组（`default`）的模型。Claude、GPT 等付费分组不在这份公开清单里，因此 Hermes 对这些分组的模型自动发现会得到空列表。把 `discover_models` 设为 `false`，再按控制台里的完整模型名填写即可正常调用。

## 5. 验证缓存是否生效

1. Hermes 启动时会打印缓存状态，例如 `💾 Prompt caching: ENABLED`。
2. 在 Tokeness 控制台的**使用日志**里打开这次请求的详情，查看 `缓存写入` 与 `缓存读取`。
3. 多轮对话的判断标准：

| 轮次 | 预期 |
| --- | --- |
| 第一轮 | `缓存写入` 大于 0；输入 token 很小（写入部分按写入价计费） |
| 后续轮 | `缓存读取` 大于 0；输入 token 同样很小 |

如果每一轮的输入 token 都接近整段上下文、且 `缓存读取` 恒为 0，说明断点没有发出来，回到第 3 步检查声明。

## 6. 排查

| 现象 | 处理 |
| --- | --- |
| 401 | 检查 API Key；`provider: anthropic` 用 `x-api-key`，OpenAI 兼容用 `Authorization: Bearer` |
| 404 | `anthropic_messages` 填根地址 `https://n.tokeness.dev`；`openai_chat` 填 `https://n.tokeness.dev/v1` |
| model not found | 从控制台复制完整模型名；把 `discover_models` 设为 `false` 后手动填写 |
| 每轮输入 token 都很大、`缓存读取` 恒为 0 | 确认已声明 `prompt_caching: true`，且模型名与请求路由完全一致 |
| 中途切换模型后费用突增 | 缓存按模型区分，换模型后第一轮必然全价重算整段上下文 |
