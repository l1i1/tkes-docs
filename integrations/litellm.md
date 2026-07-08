---
title: LiteLLM
description: Configure LiteLLM to route OpenAI-compatible traffic through Tokeness.
---

# LiteLLM

LiteLLM can use Tokeness as an OpenAI-compatible upstream provider.

## Example Model Entry

```yaml
model_list:
  - model_name: tokeness-model
    litellm_params:
      model: openai/YOUR_MODEL_NAME
      api_key: os.environ/TOKENESS_API_KEY
      api_base: https://n.tokeness.io/v1
```

Use the exact model name from Tokeness. Store the API key in environment variables or a secret manager.
