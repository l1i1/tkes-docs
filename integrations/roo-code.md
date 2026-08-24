---
title: Roo Code
description: Connect Roo Code to Tokeness using an OpenAI Compatible provider.
---

# Roo Code

Roo Code is a coding assistant for VS Code. It supports the `OpenAI Compatible` provider, which lets you fill in a custom Base URL, API Key, and Model ID.

## Preparation

First, prepare the following in the Tokeness console:

| Field | Value |
| --- | --- |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | A key created in the Tokeness console |
| Model ID | Full model name copied from the Tokeness model marketplace |

Roo Code relies heavily on tool calls. For coding tasks, prefer models on Tokeness that are confirmed to support OpenAI tool calling.

## Add a provider

Configure the following in VS Code:

1. Open Roo Code.
2. Go to settings.
3. Find API Provider.
4. Select `OpenAI Compatible`.
5. Set Base URL to `https://n.tokeness.dev/v1`.
6. Enter your Tokeness API key.
7. Enter the model name copied from the Tokeness model marketplace.
8. Save the configuration.

Field mapping:

| Roo Code field | Tokeness value |
| --- | --- |
| API Provider | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness API key |
| Model / Model ID | Tokeness model name |

## Model configuration

If Roo Code asks for model context window or output length, start with conservative values:

| Setting | Notes |
| --- | --- |
| Context Window | Use the context size shown in the Tokeness model marketplace; when unsure, start with a smaller value |
| Max Output Tokens | For the first test, use 2048 or 4096 |
| Image Support | Enable only if the model explicitly supports image input |
| Computer Use | Enable only if both the current model and environment support it |

Do not enable all advanced capabilities at once. Get chat and simple file edits working first, then gradually enable more complex features.

## Verification

Test in the following order:

1. Create a temporary file.
2. Ask Roo Code to explain a small piece of code.
3. Then ask it to modify the temporary file.
4. After each step, check the Tokeness usage logs.

If there are no requests in the Tokeness logs, Roo Code is not currently using the Tokeness provider. Go back to the settings page and check whether the provider was saved successfully.

## Tool calling notes

Roo Code uses the native OpenAI tool-calling format. If a model does not support tool calling, it may answer ordinary questions but cannot reliably perform tasks like reading files, editing files, or running commands.

When you encounter tool-calling issues, make two checks first:

1. Can the same model return content through a regular Chat Completions request?
2. Does the model support OpenAI-compatible tool calls?

If the first check passes but the second fails, switch to a model that supports tool calling — do not keep adjusting the Base URL or key.

## Common issues

| Symptom | Fix |
| --- | --- |
| Invalid API Key | Re-copy the key and confirm there are no line breaks, spaces, or non-ASCII quotation marks |
| Model Not Found | Re-copy the full model name from the Tokeness model marketplace |
| Connection Error | Check that the Base URL is `https://n.tokeness.dev/v1` |
| Chat works but file operations fail | Switch to a model that supports tool calling |
| Output interrupted | Reduce the task size, or increase Max Output Tokens |

## References

- [Roo Code OpenAI Compatible Provider](https://docs.roocode.com/providers/openai-compatible)