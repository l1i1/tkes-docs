---
title: Cursor
description: Connect Cursor to Tokeness using an OpenAI API key and Override OpenAI Base URL.
---

# Cursor

The custom model entry point in Cursor varies across versions. When you can see settings like OpenAI API Key, Override OpenAI Base URL, or Add Custom Model, you can connect to Tokeness using the OpenAI-compatible method.

If your current version does not offer these entry points, or if third-party models are unstable in Agent tool calls, switch to Cline, Claude Code, Codex CLI, or OpenCode.

## Connection details

| Field | Value |
| --- | --- |
| OpenAI API Key | A key created in the Tokeness console |
| Override OpenAI Base URL | `https://n.tokeness.io/v1` |
| Custom Model Name | Full model name from the Tokeness model marketplace |

The field names in Cursor may still say "OpenAI". Once Base URL override is enabled, requests are sent to the address you specify.

## 1. Prepare Tokeness

Prepare the following first:

1. A Cursor-dedicated API key.
2. A model name suited for coding tasks.
3. Available balance.

You can name the key:

```txt
cursor-local
```

## 2. Open Cursor model settings

In Cursor, go to:

```txt
Settings -> Models
```

Find the API Keys, OpenAI API Key, or similar area.

## 3. Fill in the API key and Base URL

1. Enable OpenAI API Key.
2. Paste your Tokeness API key.
3. Enable `Override OpenAI Base URL`.
4. Set the Base URL to `https://n.tokeness.io/v1`.
5. Save or confirm.

If Cursor shows a confirmation dialog, confirm that it will send OpenAI requests to the custom Base URL before proceeding.

## 4. Add a custom model

On the Models page, find Add Custom Model.

Enter the model name copied from the Tokeness model marketplace. After adding it, disable the default models you do not need, to avoid selecting the wrong one during testing.

For the first test, use a short prompt:

```txt
Please reply with a single sentence confirming Cursor is now connected to Tokeness.
```

Then check the Tokeness usage logs to confirm the request.

## 5. Scope of use

Cursor's custom Base URL is typically suited for:

| Scenario | Notes |
| --- | --- |
| Regular chat | Start with short questions |
| Single-file Q&A | Control the context range |
| Small-scale code explanation | Observe whether the model can reply stably |

For large-scale Agent edits, complex tool calls, and multi-file modifications, compatibility varies across third-party models. Start with small tasks, then expand the scope.

## 6. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Cannot find Override OpenAI Base URL | The current Cursor version may not support this entry point |
| 401 Unauthorized | Re-copy the Tokeness API key |
| 404 Not Found | Set Base URL to `https://n.tokeness.io/v1` |
| model not found | Re-copy the custom model name from the model marketplace |
| No Tokeness logs | The current model is not using the custom OpenAI configuration |
| Chat works but Agent errors | The model is not fully compatible with Cursor tool calls; switch models or tools |
| Still using the default model | Disable default models or manually select the custom model in the chat sidebar |

## External docs

- [OpenRouter Cursor Integration](https://openrouter.ai/docs/cookbook/coding-agents/cursor-integration)
- [SambaNova Cursor Integration](https://docs.sambanova.ai/docs/en/integrations/cursor)
- [LiteLLM Cursor Integration](https://docs.litellm.ai/docs/tutorials/cursor_integration)