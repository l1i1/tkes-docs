# Anthropic API

Anthropic API 使用 Messages 格式，常见请求路径是 `POST /v1/messages`。Tokeness 接入时，实际请求端点填写：

```txt
https://n.tokeness.io/v1/messages
```

模型名从 Tokeness 模型广场复制。Claude 分组模型使用这一页的格式。

## 端点规则

| 场景 | 地址 |
| --- | --- |
| cURL 或手写 HTTP | `https://n.tokeness.io/v1/messages` |
| Anthropic SDK | `https://n.tokeness.io` |

Anthropic SDK 的 `messages.create` 会处理 Messages 路径。SDK 的 `base_url` 或 `baseURL` 填服务根地址，不要再追加 `/v1/messages`。

## 请求字段

| 字段 | 填写 |
| --- | --- |
| Endpoint | `https://n.tokeness.io/v1/messages` |
| API Key | Tokeness API Key |
| Header | `x-api-key: YOUR_TOKENESS_API_KEY` |
| Version | `anthropic-version: 2023-06-01` |
| Model | 从模型广场复制 Claude 模型名 |

## 验证顺序

1. 先用 cURL 请求 `https://n.tokeness.io/v1/messages`。
2. 确认使用日志里出现请求记录。
3. 再把同一个 Key、模型名和 SDK 根地址放进 Anthropic SDK。

## cURL

```bash
curl https://n.tokeness.io/v1/messages \
  -H "x-api-key: $TOKENESS_API_KEY" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{
    "model": "YOUR_CLAUDE_MODEL_NAME",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": "用一句话介绍 Tokeness"
      }
    ]
  }'
```

## Python SDK

SDK 场景填写服务根地址：

```bash
pip install anthropic
```

```py
from anthropic import Anthropic

client = Anthropic(
    api_key="YOUR_TOKENESS_API_KEY",
    base_url="https://n.tokeness.io",
)

message = client.messages.create(
    model="YOUR_CLAUDE_MODEL_NAME",
    max_tokens=1024,
    messages=[
        {
            "role": "user",
            "content": "用一句话介绍 Tokeness",
        }
    ],
)

text = "\n".join(
    block.text
    for block in message.content
    if block.type == "text"
)

print(text)
```

## TypeScript SDK

```bash
npm install @anthropic-ai/sdk
```

```ts
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: 'YOUR_TOKENESS_API_KEY',
  baseURL: 'https://n.tokeness.io'
})

const message = await anthropic.messages.create({
  model: 'YOUR_CLAUDE_MODEL_NAME',
  max_tokens: 1024,
  messages: [
    {
      role: 'user',
      content: '用一句话介绍 Tokeness'
    }
  ]
})

const text = message.content
  .map((block) => block.type === 'text' ? block.text : '')
  .filter(Boolean)
  .join('\n')

console.log(text)
```

## 与 OpenAI 格式的区别

| 项目 | Anthropic Messages | OpenAI Chat Completions |
| --- | --- | --- |
| 路径 | `/v1/messages` | `/v1/chat/completions` |
| Key Header | `x-api-key` | `Authorization: Bearer ...` |
| 版本 Header | `anthropic-version` | 不需要 |
| 输出字段 | `content[0].text` | `choices[0].message.content` |
| token 上限 | `max_tokens` | `max_tokens` 或模型对应字段 |

## 排查

| 现象 | 检查 |
| --- | --- |
| 401 | `x-api-key` 是否填写 Tokeness API Key |
| 404 | SDK 是否使用 `https://n.tokeness.io`，cURL endpoint 是否是 `https://n.tokeness.io/v1/messages` |
| 版本错误 | 是否带了 `anthropic-version: 2023-06-01` |
| 模型不可用 | 模型名是否来自 Claude 分组，Key 是否允许调用该模型 |
