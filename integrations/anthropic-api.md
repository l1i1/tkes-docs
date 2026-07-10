---
title: Anthropic API
description: Call the Anthropic Messages API through Tokeness with cURL, the Python SDK, the TypeScript SDK, and endpoint rules.
---

# Anthropic API

The Anthropic API uses the Messages format. The common request path is `POST /v1/messages`. When connecting through Tokeness, set the actual request endpoint to:

```txt
https://n.tokeness.io/v1/messages
```

Copy the model name from the Tokeness model marketplace. Models in the Claude group use the format described on this page.

## Endpoint rules

| Scenario | Address |
| --- | --- |
| cURL or hand-written HTTP | `https://n.tokeness.io/v1/messages` |
| Anthropic SDK | `https://n.tokeness.io` |

The Anthropic SDK's `messages.create` handles the Messages path internally. Set the SDK's `base_url` or `baseURL` to the service root address — do not append `/v1/messages` yourself.

## Request fields

| Field | Value |
| --- | --- |
| Endpoint | `https://n.tokeness.io/v1/messages` |
| API Key | Tokeness API key |
| Header | `x-api-key: YOUR_TOKENESS_API_KEY` |
| Version | `anthropic-version: 2023-06-01` |
| Model | Claude model name copied from the model marketplace |

## Verification order

1. First send a cURL request to `https://n.tokeness.io/v1/messages`.
2. Confirm the request appears in the Tokeness usage logs.
3. Then use the same key, model name, and SDK root address in the Anthropic SDK.

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
        "content": "Introduce Tokeness in one sentence."
      }
    ]
  }'
```

## Python SDK

For the SDK, set the service root address:

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
            "content": "Introduce Tokeness in one sentence.",
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
      content: 'Introduce Tokeness in one sentence.'
    }
  ]
})

const text = message.content
  .map((block) => block.type === 'text' ? block.text : '')
  .filter(Boolean)
  .join('\n')

console.log(text)
```

## Differences from the OpenAI format

| Item | Anthropic Messages | OpenAI Chat Completions |
| --- | --- | --- |
| Path | `/v1/messages` | `/v1/chat/completions` |
| Key header | `x-api-key` | `Authorization: Bearer ...` |
| Version header | `anthropic-version` | Not required |
| Output field | `content[0].text` | `choices[0].message.content` |
| Token limit | `max_tokens` | `max_tokens` or the model-specific field |

If the tool only supports OpenAI-compatible providers, use [OpenAI-Compatible API](/integrations/openai-compatible) instead.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| 401 | Is `x-api-key` set to your Tokeness API key? |
| 404 | Is the SDK using `https://n.tokeness.io`? Is the cURL endpoint `https://n.tokeness.io/v1/messages`? |
| Version error | Did you include `anthropic-version: 2023-06-01`? |
| Model unavailable | Is the model name from the Claude group? Does the key have permission to call that model? |