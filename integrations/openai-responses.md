---
title: OpenAI Responses API
description: Use the OpenAI Responses API shape through Tokeness.
---

# OpenAI Responses API

Use Tokeness with clients and tools that send OpenAI Responses API requests to a custom Base URL.

## Configuration

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: model name copied from Tokeness
```

## Example

```bash
curl https://n.tokeness.io/v1/responses \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_NAME",
    "input": "Write a one-sentence intro for Tokeness."
  }'
```

If a tool has separate fields for OpenAI-compatible Chat Completions and Responses API, keep the same Base URL and API key, then select a model available in the Tokeness console.
