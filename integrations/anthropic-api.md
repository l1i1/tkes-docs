---
title: Anthropic API
description: Use Anthropic-format clients and tools through Tokeness when supported.
---

# Anthropic API

Some tools expose an Anthropic-compatible provider configuration. When Tokeness enables a compatible route for your model, configure the Tokeness endpoint, API key, and exact model name from the console.

## Configuration Checklist

| Field | Value |
| --- | --- |
| Provider type | Anthropic-compatible or custom Anthropic provider |
| Base URL | `https://n.tokeness.io/v1` unless the tool documents a different Anthropic route |
| API Key | Tokeness API key |
| Model | Exact model name copied from Tokeness |

If the tool only supports OpenAI-compatible providers, use [OpenAI-Compatible API](/integrations/openai-compatible) instead.
