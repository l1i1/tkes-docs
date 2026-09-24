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

Edit `~/.hermes/config.yaml`. **Configure Tokeness as a custom provider (`provider: custom`)** so the entry carries its own key — this avoids Hermes' Anthropic credential priority (`ANTHROPIC_TOKEN` / Claude Code credentials) shadowing your Tokeness key or sending it to the wrong endpoint:

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev
  api_mode: anthropic_messages
```

`api_mode` selects the transport; both are supported:

| `api_mode` | Protocol | Endpoint used |
| --- | --- | --- |
| `anthropic_messages` | Native Anthropic Messages | `https://n.tokeness.dev/v1/messages` |
| `chat_completions` | OpenAI-compatible | `https://n.tokeness.dev/v1/chat/completions` |

For the OpenAI-compatible transport, include `/v1` in `base_url`:

```yaml
model:
  provider: custom
  default: claude-opus-5-5
  base_url: https://n.tokeness.dev/v1
  api_mode: chat_completions
```

Do not append `/v1` twice (`https://n.tokeness.dev/v1/v1` returns 404). Keep the API key in `~/.hermes/.env` rather than in `config.yaml`.

## 3. Enable prompt caching explicitly

Anthropic prompt caching is **explicit**: the request must carry a `cache_control` breakpoint before the upstream caches that prefix. Without one, every turn re-bills the entire context at full input price. Hermes injects those breakpoints on its own, but only for providers, hosts, and model families it recognises. Tokeness is a custom endpoint, so Hermes defaults to the conservative choice and injects none.

This is why switching transport alone (`api_mode` set to Anthropic) does not improve the hit rate — the transport does not change that decision. Only an explicit declaration does.

Declare the capability on the model under its provider entry. **`api` must match `model.base_url` exactly** (Hermes matches routes on the normalized address, so `/v1` vs no `/v1` are two different routes):

```yaml
prompt_caching:
  cache_ttl: "5m"     # or "1h"; defaults to 5m when omitted

providers:
  tokeness:
    api: https://n.tokeness.dev        # keep identical to model.base_url
    transport: anthropic_messages      # or openai_chat
    api_key: ${TOKENESS_API_KEY}
    discover_models: false             # see step 4
    models:
      claude-opus-5-5:
        prompt_caching: true
```

Notes:

- `api` must be written the same way as `model.base_url` (with or without `/v1`); otherwise the declaration does not match and caching stays off.
- The key under `models:` must match the full model name from the console exactly.
- `transport` selects the marker layout: `openai_chat` uses the OpenAI envelope layout, `anthropic_messages` uses the native inner-block layout. Tokeness converts both correctly, so you do not need to change transport for caching.
- When `prompt_caching` is omitted, Hermes stays conservative and injects nothing; `false` disables markers explicitly.
- With `api_mode: anthropic_messages`, Hermes `v2026.8.27` and later also inject breakpoints for Claude models automatically. The explicit declaration is still the safer choice, and on the OpenAI-compatible transport it is the only way to enable caching.

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
| 401 | Check the API key; the `anthropic_messages` transport uses `x-api-key`, the OpenAI-compatible transport uses `Authorization: Bearer` |
| 404 | For `anthropic_messages`, set `base_url` to `https://n.tokeness.dev` (do not add `/v1`); for the OpenAI-compatible transport use `https://n.tokeness.dev/v1` |
| model not found | Copy the full model name from the console, then set `discover_models` to `false` and enter it manually |
| Large input tokens every turn and `Cache Read` stays at 0 | Confirm `prompt_caching: true` is declared; confirm `providers.<name>.api` matches `model.base_url` exactly; confirm the key under `models:` matches the console model name |
| Changed the caching config but nothing improved | The declaration takes effect from Hermes `v2026.8.27`; check the version first |
| Cost jumps after a mid-session model switch | Caches are keyed to the model, so the first turn after a switch always re-reads the whole context at full price |
