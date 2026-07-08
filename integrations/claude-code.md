---
title: Claude Code
description: Configure Claude Code with Tokeness through compatible routing tools or custom provider settings.
---

# Claude Code

Claude Code workflows can use Tokeness when your routing setup supports a custom provider or OpenAI-compatible endpoint.

## Configuration

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: model name copied from Tokeness
```

## Notes

- Keep the Tokeness API key in an environment variable or local secret file.
- Copy the exact model name from Tokeness.
- Check usage logs after the first request.
- If your Claude Code setup uses a switcher or proxy, configure Tokeness as that proxy's upstream provider.
