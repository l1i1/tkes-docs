---
title: OpenAI Responses API
description: Call the OpenAI Responses API through Tokeness with Node.js, Python, cURL, and troubleshooting steps.
---

# OpenAI Responses API

The Responses API uses `POST /v1/responses`. If your code already calls `responses.create` from the OpenAI SDK, swap the Base URL and API key for your Tokeness configuration.

## Configuration

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: model name copied from the Tokeness model marketplace
```

## Verification order

1. First send a cURL request to `https://n.tokeness.io/v1/responses`.
2. Confirm the request appears in the Tokeness usage logs.
3. Then use the same key, model name, and Base URL in your SDK.

## Node.js

Install the SDK:

```bash
npm install openai
```

Create `test-tokeness-responses.mjs`:

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'YOUR_TOKENESS_API_KEY',
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.responses.create({
  model: 'YOUR_MODEL_NAME',
  input: 'Introduce Tokeness in one sentence.'
})

console.log(response.output_text)
```

Run:

```bash
node test-tokeness-responses.mjs
```

## Python

Install the SDK:

```bash
pip install openai
```

Create `test_tokeness_responses.py`:

```py
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_TOKENESS_API_KEY",
    base_url="https://n.tokeness.io/v1",
)

response = client.responses.create(
    model="YOUR_MODEL_NAME",
    input="Introduce Tokeness in one sentence.",
)

print(response.output_text)
```

## cURL

```bash
curl https://n.tokeness.io/v1/responses \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_NAME",
    "input": "Introduce Tokeness in one sentence."
  }'
```

## Message array format

When you need to distinguish roles, pass `input` as an array:

```json
{
  "model": "YOUR_MODEL_NAME",
  "input": [
    {
      "role": "developer",
      "content": "Keep your answer short."
    },
    {
      "role": "user",
      "content": "What is the Base URL for Tokeness?"
    }
  ]
}
```

## Troubleshooting

| Symptom | Check |
| --- | --- |
| 404 | Is the request path `/v1/responses`? |
| 401 | Is the Tokeness API key complete? Are you using `Authorization: Bearer`? |
| Model not supported | Switch to a model from the model marketplace that supports Responses or OpenAI-compatible calls |
| No output | Print the full `response` object first to inspect the returned structure and error fields |