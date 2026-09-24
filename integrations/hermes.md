---
title: Hermes Agent
description: Connect Nous Research's Hermes Agent to Tokeness, including the prompt-caching setting that custom gateways must declare explicitly.
---

# Hermes Agent

Hermes Agent is an open-source agent from Nous Research. It supports two transports: the OpenAI-compatible Chat Completions wire, and the native Anthropic Messages wire. Tokeness supports both.

## Connection details

| Field | Value |
| --- | --- |
| Transport | `anthropic_messages` (recommended for Claude) or `openai_chat` |
| Base URL (`anthropic_messages`) | `https://n.tokeness.dev` |
| Base URL (`openai_chat`) | `https://n.tokeness.dev/v1` |
| API Key | A key created in the Tokeness console |
| Model | The full model name copied from the Tokeness console |

## 1. Prepare Tokeness

In the Tokeness console:

1. Confirm the wallet balance is available.
2. Create an API key dedicated to Hermes.
3. Copy the full model name you intend to use (for example `claude-opus-5-5`).
4. Open the usage logs — you will use them later to verify requests.

## 2. Configure Hermes

Edit `~/.hermes/config.yaml`. For Claude models, the native Anthropic transport is recommended:

```yaml
model:
  provider: anthropic
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev
  api_mode: anthropic_messages
```

The OpenAI-compatible transport also works:

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev/v1
  api_mode: chat_completions
```

Keep the API key in `~/.hermes/.env` rather than in `config.yaml`.

## 3. Enable prompt caching explicitly

Anthropic prompt caching is **explicit**: the request must carry a `cache_control` breakpoint before the upstream caches that prefix. Without one, every turn re-bills the entire context at full input price. Hermes injects those breakpoints on its own, but only for providers, hosts, and model families it recognises. Tokeness is a custom endpoint, so Hermes defaults to the conservative choice and injects none.

This is why switching transport alone (`api_mode` set to Anthropic) does not improve the hit rate — the transport does not change that decision. Only an explicit declaration does.

Declare the capability on the model under its provider entry:

```yaml
providers:
  tokeness:
    api: https://n.tokeness.dev/v1
    transport: openai_chat        # or anthropic_messages
    api_key: ${TOKENESS_API_KEY}
    discover_models: false        # see step 4
    models:
      claude-opus-5-5:
        prompt_caching: true
```

Notes:

- The key under `models:` must match the full model name from the console exactly.
- `transport` selects the marker layout: `openai_chat` uses the OpenAI envelope layout, `anthropic_messages` uses the native inner-block layout. Tokeness converts both correctly, so you do not need to change transport for caching.
- When `prompt_caching` is omitted, Hermes stays conservative and injects nothing; `false` disables markers explicitly.

Optionally set the cache TTL (default 5 minutes; use 1 hour for long sessions with pauses between turns):

```yaml
prompt_caching:
  cache_ttl: "5m"     # or "1h"
```

## 4. Set the model name manually

Tokeness `/v1/models` returns only the public group (`default`) catalog. Paid groups such as Claude and GPT are not part of that public list, so Hermes' model discovery returns an empty list for them. Set `discover_models` to `false` and enter the full model name from the console; calls work normally.

## 5. Verify that caching is active

1. Hermes prints the cache status at startup, for example `💾 Prompt caching: ENABLED`.
2. In the Tokeness console, open the request in the **usage logs** and check `Cache Write` and `Cache Read`.
3. For a multi-turn conversation:

| Turn | Expected |
| --- | --- |
| First turn | `Cache Write` greater than 0; input tokens small (the written part is billed at the write rate) |
| Later turns | `Cache Read` greater than 0; input tokens also small |

If every turn shows input tokens close to the whole context and `Cache Read` stays at 0, the breakpoints are not being sent — go back to step 3 and check the declaration.

## 6. Troubleshooting

| Symptom | Fix |
| --- | --- |
| 401 | Check the API key; `provider: anthropic` uses `x-api-key`, the OpenAI-compatible transport uses `Authorization: Bearer` |
| 404 | Use the root address `https://n.tokeness.dev` for `anthropic_messages`, or `https://n.tokeness.dev/v1` for `openai_chat` |
| model not found | Copy the full model name from the console and set `discover_models` to `false` |
| Large input tokens every turn and `Cache Read` stays at 0 | Confirm `prompt_caching: true` is declared and that the model name matches the routed request exactly |
| Cost jumps after a mid-session model switch | Caches are keyed to the model, so the first turn after a switch always re-reads the whole context at full price |
