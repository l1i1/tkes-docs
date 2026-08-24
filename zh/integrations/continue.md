---
title: Continue
description: 在 Continue 中通过 OpenAI 兼容配置接入 Tokeness。
---

# Continue

Continue 是 VS Code 和 JetBrains 里的代码助手。它的配置文件支持 `provider: openai`、`apiBase`、`apiKey` 和 `model`，可以接入 OpenAI 兼容接口。

## 准备

先准备三项信息：

| 项目 | 填写值 |
| --- | --- |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制完整模型名 |

如果要在 Agent 模式里让 Continue 读写文件，模型需要支持工具调用。首次配置时，可以先用普通聊天确认 Key、Base URL 和模型名没有问题，再测试 Agent。

## 打开配置文件

在 Continue 面板中打开配置文件。不同版本入口名称会有差异，常见位置是：

1. 打开 VS Code 或 JetBrains。
2. 打开 Continue 插件面板。
3. 进入设置或配置入口。
4. 打开本地 `config.yaml`。

也可以直接查找用户目录下的 Continue 配置目录，例如 `~/.continue/config.yaml`。

## 基础配置

把下面配置加入 `models`。将 `YOUR_TOKENESS_API_KEY` 和 `YOUR_MODEL_NAME` 换成自己的值。

```yaml
name: Tokeness Local
version: 1.0.0
schema: v1

models:
  - name: Tokeness Chat
    provider: openai
    model: YOUR_MODEL_NAME
    apiBase: https://n.tokeness.dev/v1
    apiKey: YOUR_TOKENESS_API_KEY
    roles:
      - chat
      - edit
      - apply
```

字段含义：

| 字段 | 说明 |
| --- | --- |
| `name` | Continue 界面里显示的名称，可以写 `Tokeness Chat` |
| `provider` | 填 `openai`，让 Continue 使用 OpenAI 兼容调用方式 |
| `model` | Tokeness 模型广场里的完整模型名 |
| `apiBase` | 填 `https://n.tokeness.dev/v1` |
| `apiKey` | Tokeness API Key |
| `roles` | 这个模型可以承担的任务 |

保存后重启 IDE，或在 Continue 面板里刷新配置。

## 使用环境变量保存 Key

如果不想把 Key 写进配置文件，可以先把 Key 放到环境变量里。

macOS / Linux：

```bash
export TOKENESS_API_KEY="你的 Tokeness API Key"
```

Windows PowerShell：

```powershell
$env:TOKENESS_API_KEY = "你的 Tokeness API Key"
```

然后在配置中引用：

```yaml
models:
  - name: Tokeness Chat
    provider: openai
    model: YOUR_MODEL_NAME
    apiBase: https://n.tokeness.dev/v1
    apiKey: ${{ env.TOKENESS_API_KEY }}
    roles:
      - chat
      - edit
      - apply
```

如果你的 Continue 版本不识别这种写法，就先使用本地配置文件测试，确认能跑通后再按 Continue 当前版本的密钥管理方式调整。

## Agent 模式

Agent 模式会把文件读取、文件修改、命令执行等能力交给模型调度。配置上可以显式声明工具调用能力：

```yaml
models:
  - name: Tokeness Agent
    provider: openai
    model: YOUR_TOOL_CALLING_MODEL
    apiBase: https://n.tokeness.dev/v1
    apiKey: YOUR_TOKENESS_API_KEY
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use
```

这里的 `YOUR_TOOL_CALLING_MODEL` 应该换成 Tokeness 中确认支持工具调用的模型。不要只看模型名称像不像代码模型，要以实际调用是否能产生工具调用为准。

## 验证

保存配置后按下面顺序验证：

1. 在 Continue 中选择 `Tokeness Chat`。
2. 发一句简单问题，例如“只回复 ok”。
3. 确认 IDE 中收到回复。
4. 打开 Tokeness 使用日志，确认出现对应请求。
5. 再测试选中代码解释、代码改写或 Agent 模式。

如果聊天能用，但改写或 Agent 不稳定，通常不是 Key 问题，而是模型能力、工具调用格式或 Continue 版本差异。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 模型没有出现在下拉框 | 检查 `config.yaml` 缩进、`schema`、`models` 结构，保存后重启 IDE |
| 401 | 重新复制 Tokeness API Key，确认没有多余空格 |
| 404 | 检查 `apiBase` 是否为 `https://n.tokeness.dev/v1` |
| model not found | 从 Tokeness 模型广场重新复制模型名 |
| Agent 调用工具失败 | 换用支持工具调用的模型，或先只使用聊天、解释、改写 |
| 配置看起来正确但仍走旧模型 | 关闭所有 IDE 窗口后重新打开 |

## 参考资料

- [Continue OpenAI 配置](https://docs.continue.dev/customize/model-providers/top-level/openai)
- [Continue config.yaml Reference](https://docs.continue.dev/reference)

