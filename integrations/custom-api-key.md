---
title: Custom API and Key
description: Generic Tokeness configuration for tools that support custom OpenAI-compatible providers.
---

# Custom API and Key

Many clients use names such as custom API, custom OpenAI provider, OpenAI Compatible, or custom Base URL. The required Tokeness fields are usually the same.

## Required Fields

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: exact model name copied from Tokeness
```

## Common Field Names

| Tool field | Tokeness value |
| --- | --- |
| API Base, Base URL, Endpoint | `https://n.tokeness.io/v1` |
| API Key, Secret Key, Bearer Token | Tokeness API key |
| Model, Model ID, Deployment | Exact model name from Tokeness |
| Provider | OpenAI Compatible or Custom OpenAI |

After saving the provider, run a short test prompt and check Tokeness usage logs.
