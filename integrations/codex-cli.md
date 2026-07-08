---
title: Codex CLI
description: Configure Codex CLI-style OpenAI-compatible clients with Tokeness.
---

# Codex CLI

OpenAI-compatible CLI tools can use Tokeness when they allow a custom Base URL.

## Environment Variables

```bash
export OPENAI_API_KEY="YOUR_TOKENESS_API_KEY"
export OPENAI_BASE_URL="https://n.tokeness.io/v1"
```

Then configure or pass a model name copied from Tokeness.

## Checks

- The Base URL includes `/v1`.
- The API key belongs to Tokeness and is enabled.
- The model name is available for the current account or key group.
- Usage logs show the request after a test run.
