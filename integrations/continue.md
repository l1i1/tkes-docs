---
title: Continue
description: Configure Continue with Tokeness using a custom OpenAI-compatible model provider.
---

# Continue

Continue can use Tokeness as a custom OpenAI-compatible model provider.

## Example Configuration

```json
{
  "models": [
    {
      "title": "Tokeness",
      "provider": "openai",
      "model": "YOUR_MODEL_NAME",
      "apiKey": "YOUR_TOKENESS_API_KEY",
      "apiBase": "https://n.tokeness.io/v1"
    }
  ]
}
```

Use environment variables or Continue's secret handling instead of committing real keys.
