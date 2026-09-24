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

编辑 `~/.hermes/config.yaml`。**推荐把 Tokeness 配成一个自定义供应商（`provider: custom`）**，密钥由该条目自己携带，避免 Hermes 的 Anthropic 凭据优先级（`ANTHROPIC_TOKEN` / Claude Code 凭据）把你的 Tokeness Key 顶掉或发错端点：

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev
  api_mode: anthropic_messages
```

`api_mode` 决定传输协议，两种都受支持：

| `api_mode` | 协议 | 对应端点 |
| --- | --- | --- |
| `anthropic_messages` | 原生 Anthropic Messages | `https://n.tokeness.dev/v1/messages` |
| `chat_completions` | OpenAI 兼容 | `https://n.tokeness.dev/v1/chat/completions` |

用 OpenAI 兼容传输时，`base_url` 要带 `/v1`：

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev/v1
  api_mode: chat_completions
```

`base_url` 不要重复拼 `/v1`（写成 `https://n.tokeness.dev/v1/v1` 会 404）。API Key 放 `~/.hermes/.env`，不要写进 `config.yaml`。

## 3. 显式开启提示缓存

Anthropic 的提示缓存是**显式**的：请求里必须带 `cache_control` 断点，上游才会缓存这段前缀；没有断点就每一轮按全价重算整段上下文。Hermes 自己会注入这些断点，但它只对**能识别的供应商、域名和模型族**注入；Tokeness 属于自定义端点，Hermes 的默认判定是保守的，也就是**不注入**。

这解释了为什么只改传输协议（`api_mode` 改成 Anthropic）不会让命中率变好——改协议不改变这个判定，只有显式声明才会。

在供应商条目下按模型声明。**`api` 必须与 `model.base_url` 逐字一致**（Hermes 按归一化后的地址匹配路由，`/v1` 的有无是两条不同路由）：

```yaml
prompt_caching:
  cache_ttl: "5m"     # 或 "1h"；省略则用默认 5m

providers:
  tokeness:
    api: https://n.tokeness.dev        # 与 model.base_url 保持一致
    transport: anthropic_messages      # 或 openai_chat
    api_key: ${TOKENESS_API_KEY}
    discover_models: false             # 见第 4 步
    models:
      claude-opus-5-5:
        prompt_caching: true
```

要点：

- `api` 必须与 `model.base_url` 写同一个值（含 `/v1` 与否），否则声明匹配不上、缓存仍然不生效。
- `models:` 下的键名必须与控制台里的完整模型名一致。
- `transport` 决定断点布局：`openai_chat` 用 OpenAI 信封布局，`anthropic_messages` 用原生块内布局。两种布局 Tokeness 都能正确转换，不必为了缓存而换协议。
- 省略 `prompt_caching` 时 Hermes 保持保守（不注入）；显式写 `false` 则强制关闭。
- 若使用 `api_mode: anthropic_messages`，Hermes `v2026.8.27` 及以后对 Claude 模型也会自动注入断点；但显式声明更稳妥，且在 OpenAI 兼容传输下是**唯一**的开启方式。

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
| 401 | 检查 API Key；`anthropic_messages` 传输用 `x-api-key`，OpenAI 兼容传输用 `Authorization: Bearer` |
| 404 | `anthropic_messages` 的 `base_url` 填 `https://n.tokeness.dev`（不要再加 `/v1`）；OpenAI 兼容填 `https://n.tokeness.dev/v1` |
| model not found | 从控制台复制完整模型名；把 `discover_models` 设为 `false` 后手动填写 |
| 每轮输入 token 都很大、`缓存读取` 恒为 0 | 确认已声明 `prompt_caching: true`；确认 `providers.<名>.api` 与 `model.base_url` 完全一致；确认 `models:` 下的模型名与控制台一致 |
| 改了缓存配置但没有变化 | 该声明自 Hermes `v2026.8.27` 起生效，先确认版本 |
| 中途切换模型后费用突增 | 缓存按模型区分，换模型后第一轮必然全价重算整段上下文 |
