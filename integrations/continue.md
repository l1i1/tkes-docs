---
title: Continue
description: Connect Continue to Tokeness through an OpenAI-compatible configuration.
---

# Continue

Continue is a coding assistant for VS Code and JetBrains. Its configuration file supports `provider: openai`, `apiBase`, `apiKey`, and `model`, so it can connect to an OpenAI-compatible endpoint.

## Preparation

Prepare three pieces of information first:

| Field | Value |
| --- | --- |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | Full model name copied from the Tokeness model marketplace |

If you want Continue to read and write files in Agent mode, the model needs to support tool calling. On first configuration, start with a regular chat to confirm the key, Base URL, and model name are correct, then test Agent mode.

## Open the configuration file

Open the configuration file from the Continue panel. The entry point name varies by version, but common locations are:

1. Open VS Code or JetBrains.
2. Open the Continue extension panel.
3. Go to settings or the configuration entry.
4. Open the local `config.yaml`.

You can also look for the Continue configuration directory under your user directory, for example `~/.continue/config.yaml`.

## Basic configuration

Add the following to `models`. Replace `YOUR_TOKENESS_API_KEY` and `YOUR_MODEL_NAME` with your own values.

```yaml
name: Tokeness Local
version: 1.0.0
schema: v1

models:
  - name: Tokeness Chat
    provider: openai
    model: YOUR_MODEL_NAME
    apiBase: https://n.tokeness.io/v1
    apiKey: YOUR_TOKENESS_API_KEY
    roles:
      - chat
      - edit
      - apply
```

Field meanings:

| Field | Description |
| --- | --- |
| `name` | The name displayed in the Continue interface, e.g. `Tokeness Chat` |
| `provider` | Set to `openai` so Continue uses the OpenAI-compatible calling method |
| `model` | Full model name from the Tokeness model marketplace |
| `apiBase` | Set to `https://n.tokeness.io/v1` |
| `apiKey` | Tokeness API key |
| `roles` | The tasks this model can handle |

After saving, restart the IDE or refresh the configuration in the Continue panel.

## Store the key in an environment variable

If you do not want to write the key into the configuration file, put it in an environment variable first.

macOS / Linux:

```bash
export TOKENESS_API_KEY="your Tokeness API key"
```

Windows PowerShell:

```powershell
$env:TOKENESS_API_KEY = "your Tokeness API key"
```

Then reference it in the configuration:

```yaml
models:
  - name: Tokeness Chat
    provider: openai
    model: YOUR_MODEL_NAME
    apiBase: https://n.tokeness.io/v1
    apiKey: ${{ env.TOKENESS_API_KEY }}
    roles:
      - chat
      - edit
      - apply
```

If your Continue version does not recognize this syntax, test with the local configuration file first, and once it works, adjust according to the secret management method supported by your current Continue version.

## Agent mode

Agent mode delegates file reads, file modifications, and command execution to the model for scheduling. You can explicitly declare tool-calling capability in the configuration:

```yaml
models:
  - name: Tokeness Agent
    provider: openai
    model: YOUR_TOOL_CALLING_MODEL
    apiBase: https://n.tokeness.io/v1
    apiKey: YOUR_TOKENESS_API_KEY
    roles:
      - chat
      - edit
      - apply
    capabilities:
      - tool_use
```

Here `YOUR_TOOL_CALLING_MODEL` should be replaced with a model confirmed to support tool calling on Tokeness. Do not judge by whether the model name looks like a coding model — use whether the actual call produces tool calls as the criterion.

## Verification

After saving the configuration, verify in the following order:

1. Select `Tokeness Chat` in Continue.
2. Send a simple question, such as "reply with ok only".
3. Confirm a reply appears in the IDE.
4. Open the Tokeness usage logs and confirm a corresponding request appears.
5. Then test code explanation, code rewriting, or Agent mode.

If chat works but rewriting or Agent mode is unstable, the issue is usually not the key — it is model capability, tool-calling format, or Continue version differences.

## Common issues

| Symptom | Fix |
| --- | --- |
| Model does not appear in the dropdown | Check `config.yaml` indentation, `schema`, and `models` structure; restart the IDE after saving |
| 401 | Re-copy the Tokeness API key and confirm there are no extra spaces |
| 404 | Check that `apiBase` is `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the Tokeness model marketplace |
| Agent tool calls fail | Switch to a model that supports tool calling, or use only chat, explanation, and rewriting first |
| Configuration looks correct but still uses the old model | Close all IDE windows and reopen |

## References

- [Continue OpenAI configuration](https://docs.continue.dev/customize/model-providers/top-level/openai)
- [Continue config.yaml Reference](https://docs.continue.dev/reference)