---
title: OpenAI-Compatible API
description: Use Tokeness with OpenAI-compatible SDKs, cURL, Node.js, and Python clients.
---

# OpenAI-Compatible API

Tokeness exposes an OpenAI-compatible API. Most SDKs and tools that support a custom OpenAI Base URL can connect to Tokeness.

## Configuration

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: model name copied from Tokeness
```

## Node.js

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENESS_API_KEY,
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.chat.completions.create({
  model: 'YOUR_MODEL_NAME',
  messages: [{ role: 'user', content: 'Say hello from Tokeness.' }]
})

console.log(response.choices[0]?.message?.content)
```

## Python

```py
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_TOKENESS_API_KEY",
    base_url="https://n.tokeness.io/v1",
)

response = client.chat.completions.create(
    model="YOUR_MODEL_NAME",
    messages=[{"role": "user", "content": "Say hello from Tokeness."}],
)

print(response.choices[0].message.content)
```

## cURL

```bash
curl https://n.tokeness.io/v1/chat/completions \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_NAME",
    "messages": [{"role": "user", "content": "Say hello from Tokeness."}]
  }'
```
