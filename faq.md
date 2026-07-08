---
title: FAQ
description: Frequently asked questions about Tokeness Base URL, API keys, model names, billing, balance, and tool integrations.
---

# FAQ

## What is Tokeness?

Tokeness is an AI API gateway. You use one API key and a unified endpoint to call different AI models, then review balance, logs, and usage in the console.

## What Base URL should I use?

Use the standard OpenAI-compatible Base URL:

```txt
https://n.tokeness.io/v1
```

Do not remove `/v1` unless a specific client explicitly appends it automatically.

## Why does authentication fail?

Common causes include incomplete API key copy, missing `Bearer` prefix, disabled API key, an environment variable that did not take effect, or a tool configured with the wrong provider type.

## Why does a request show insufficient balance?

Tokeness is prepaid. Check wallet balance and the quota configured on the current API key. If a key has its own limit, the key can be exhausted even when the account still has balance.

## Where should model names be copied from?

Copy exact model names from the Tokeness console or model marketplace. Do not guess or shorten model IDs.

## Where are model prices authoritative?

Current model prices are authoritative in the Tokeness console model marketplace or in a formal quotation. Documentation avoids fixed price numbers because model availability and upstream costs can change.

## Which tools can connect to Tokeness?

Any tool that supports a custom OpenAI-compatible Base URL can usually connect. See [integration guides](/integrations/openai-compatible) for OpenAI SDKs, Claude Code, Cherry Studio, Cline, Roo Code, Continue, Cursor, Dify, n8n, Open WebUI, AnythingLLM, LibreChat, LiteLLM, OpenClaw, and OpenCode.
