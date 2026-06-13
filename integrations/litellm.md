---
title: LiteLLM
description: 用 LiteLLM SDK 或 Proxy 转发到 Tokeness OpenAI 兼容接口。
---

# LiteLLM

LiteLLM 可以作为 Python SDK 使用，也可以作为 OpenAI 兼容网关运行。接入 Tokeness 时，核心是把 `api_base` 或 `api_base_url` 指向 `https://n.tokeness.io/v1`，并使用 Tokeness API Key。

## 准备

| 项目 | 填写值 |
| --- | --- |
| API Base | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制完整模型名 |

如果只是自己的代码要调用 Tokeness，直接用 OpenAI SDK 更简单。LiteLLM 更适合已有项目依赖 LiteLLM，或团队想在内部再做一层统一网关。

## Python SDK 方式

安装：

```bash
pip install litellm
```

示例：

```py
from litellm import completion

response = completion(
    model="openai/YOUR_MODEL_NAME",
    api_key="你的 Tokeness API Key",
    api_base="https://n.tokeness.io/v1",
    messages=[
        {"role": "user", "content": "只回复 ok"}
    ],
)

print(response["choices"][0]["message"]["content"])
```

注意 `model` 前面的 `openai/` 前缀。它告诉 LiteLLM 使用 OpenAI 兼容路径调用后端。`YOUR_MODEL_NAME` 换成 Tokeness 模型广场里的完整模型名。

## 环境变量方式

也可以把 Key 放到环境变量：

macOS / Linux：

```bash
export OPENAI_API_KEY="你的 Tokeness API Key"
```

Windows PowerShell：

```powershell
$env:OPENAI_API_KEY = "你的 Tokeness API Key"
```

代码：

```py
from litellm import completion

response = completion(
    model="openai/YOUR_MODEL_NAME",
    api_base="https://n.tokeness.io/v1",
    messages=[
        {"role": "user", "content": "只回复 ok"}
    ],
)
```

## LiteLLM Proxy 方式

如果要让团队里的多个工具都访问一个内部网关，可以启动 LiteLLM Proxy。

创建 `config.yaml`：

```yaml
model_list:
  - model_name: tokeness-chat
    litellm_params:
      model: openai/YOUR_MODEL_NAME
      api_base: https://n.tokeness.io/v1
      api_key: os.environ/TOKENESS_API_KEY
```

启动：

```bash
export TOKENESS_API_KEY="你的 Tokeness API Key"
litellm --config config.yaml --port 4000
```

启动后，其他 OpenAI 兼容客户端可以连到：

```txt
http://localhost:4000/v1
```

客户端里填：

| 客户端字段 | 填写值 |
| --- | --- |
| Base URL | `http://localhost:4000/v1` |
| API Key | LiteLLM Proxy 的访问 Key；本地测试可按你的 LiteLLM 配置处理 |
| Model | `tokeness-chat` |

这时客户端请求先到 LiteLLM，再由 LiteLLM 转发到 Tokeness。

## 什么时候不需要 LiteLLM

下面这些场景可以直接接 Tokeness，不需要再加 LiteLLM：

| 场景 | 做法 |
| --- | --- |
| OpenAI SDK 调用 | 直接设置 `base_url=https://n.tokeness.io/v1` |
| Cherry Studio / Cline / Roo Code | 直接填 Tokeness Base URL 和 Key |
| Dify / n8n | 直接按对应页面配置 |
| 单人本机使用 | 直接配置工具，少一层排查 |

LiteLLM 适合需要集中限流、集中日志、统一模型别名、内部多服务转发的团队环境。

## 验证

SDK 方式：

1. 运行 Python 示例。
2. 确认终端输出 `ok`。
3. 打开 Tokeness 使用日志。

Proxy 方式：

1. 启动 LiteLLM Proxy。
2. 用 OpenAI SDK 或 cURL 请求 `http://localhost:4000/v1/chat/completions`。
3. 模型名填 `tokeness-chat`。
4. 在 Tokeness 使用日志中确认请求。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| LiteLLM 报 provider 不明确 | 模型名前加 `openai/` |
| 401 | 检查 Tokeness Key，Proxy 模式还要检查客户端访问 Proxy 的 Key |
| 404 | `api_base` 应为 `https://n.tokeness.io/v1` |
| 客户端能连 Proxy，但 Tokeness 无日志 | 检查 LiteLLM `config.yaml` 是否真的转发到 Tokeness |
| 模型名变了 | 客户端填 LiteLLM 暴露的别名，例如 `tokeness-chat`；LiteLLM 内部再映射到 Tokeness 模型名 |

## 参考资料

- [LiteLLM OpenAI-Compatible Endpoints](https://docs.litellm.ai/docs/providers/openai_compatible)
- [LiteLLM Proxy Getting Started](https://docs.litellm.ai/docs/)

