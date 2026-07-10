---
title: VS Code + Claude Code
description: Use Claude Code, Cline, or any VS Code extension that supports a custom Base URL to connect to Tokeness.
---

# VS Code + Claude Code

There are three common ways to use AI coding tools with Tokeness inside VS Code:

| Approach | Reference |
| --- | --- |
| Run Claude Code in the VS Code terminal | See the Claude Code page |
| Use the Cline extension | See the Cline page |
| Use another extension that supports a custom Base URL | Follow the general fields on this page |

Tokeness exposes a general OpenAI-compatible endpoint:

```txt
https://n.tokeness.io/v1
```

## 1. Run Claude Code in the VS Code terminal

If you only use VS Code as a terminal, the configuration is the same as for regular Claude Code:

1. Install Claude Code.
2. Install CC Switch.
3. Add the Tokeness provider for Claude Code in CC Switch.
4. Enable routing mode.
5. Run `claude` in the VS Code terminal.

In this scenario, do not re-enter the key in the VS Code extension settings. Claude Code reads its own configuration.

See: [Claude Code](/integrations/claude-code)

## 2. Use the Cline extension

Cline is a VS Code extension that supports an OpenAI Compatible provider.

Field values:

```txt
Provider: OpenAI Compatible
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model ID: copied from the Tokeness model marketplace
```

See: [Cline](/integrations/cline)

## 3. Use other VS Code AI extensions

As long as an extension exposes these fields, you can try connecting it to Tokeness:

| Extension field | Tokeness value |
| --- | --- |
| API Provider | OpenAI Compatible / OpenAI |
| API Key | Tokeness API key |
| Base URL / API Base / Endpoint | `https://n.tokeness.io/v1` |
| Model / Model ID | Full model name from the Tokeness model marketplace |

If an extension only supports logging in to a specific vendor and does not allow a custom Base URL, it cannot connect to Tokeness directly.

## 4. Claude Code LLM Gateway notes

Claude Code officially supports connecting to an LLM Gateway via `ANTHROPIC_BASE_URL`, but this requires the gateway to expose the Anthropic Messages format.

The Claude Code integration in the Tokeness documentation defaults to the CC Switch routing mode, because it can redirect Claude Code requests to an OpenAI-compatible provider. Only when you explicitly use an Anthropic Messages-compatible endpoint should you follow the Anthropic API page.

Related pages:

- [Claude Code](/integrations/claude-code)
- [Anthropic API](/integrations/anthropic-api)

## 5. Keys and quota

VS Code extensions typically read project context, so their consumption is higher than a plain chat session.

Recommended practices:

- Create a separate key for each VS Code extension.
- Set a quota on the key.
- Start with read-only tasks on first use.
- Confirm the Git working tree status before making large-scale changes.
- Filter usage logs by key to review call records.

## 6. Verification

In the extension or Claude Code, enter:

```txt
Please reply with a single sentence confirming the VS Code integration is working.
```

Then check the Tokeness usage logs:

1. A new request appears.
2. The key is the one dedicated to the VS Code extension.
3. The model name is correct.
4. The status code is successful.

## 7. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Extension does not show a Base URL field | The extension may not support custom APIs |
| Authentication failed | Check the key, whitespace, and whether it is enabled |
| 404 Not Found | Set Base URL to `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the model marketplace |
| No Claude Code logs | Check whether CC Switch has Tokeness enabled and routing mode on |
| Extension can chat but cannot edit code | Switch to a model with stronger coding ability, or use Cline / Claude Code |
| Abnormal consumption | Limit the context range and check for looping tasks |

## External docs

- [Claude Code LLM Gateway](https://docs.anthropic.com/en/docs/claude-code/llm-gateway)
- [Claude Code Settings](https://docs.anthropic.com/zh-CN/docs/claude-code/settings)
- [Cline OpenAI Compatible Provider](https://docs.cline.bot/provider-config/openai-compatible)