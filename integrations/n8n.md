---
title: n8n
description: Configure n8n AI nodes or OpenAI-compatible credentials with Tokeness.
---

# n8n

n8n workflows can use Tokeness when the node or credential supports a custom OpenAI Base URL.

## Configuration

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model: exact model name copied from Tokeness
```

## Workflow Tips

- Store the key in n8n credentials, not in node text fields.
- Use a small test workflow before production runs.
- Check Tokeness usage logs when debugging retries or repeated executions.
