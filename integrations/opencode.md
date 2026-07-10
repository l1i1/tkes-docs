---
title: OpenCode
description: Connect OpenCode to Tokeness through CC Switch or an OpenAI-compatible configuration.
---

# OpenCode

OpenCode supports multiple models and custom providers. When connecting to Tokeness, choose OpenAI Compatible and fill in the Tokeness Base URL, API key, and model name.

When you manage OpenCode configuration through [CC Switch](https://ccswitch.io/zh/docs?section=getting-started), Claude Code, Codex, and OpenCode can all switch providers from the same tool.

## Connection details

| Field | Value |
| --- | --- |
| Provider | `OpenAI Compatible` or custom |
| Name | `Tokeness` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | Copied from the Tokeness model marketplace |

## 1. Prepare Tokeness

In the Tokeness console:

1. Confirm the wallet balance is available.
2. Create an API key dedicated to OpenCode.
3. Copy a model name from the model marketplace.
4. Open the usage logs — you will use them later to verify requests.

You can name the key:

```txt
opencode-local
```

## 2. Install OpenCode

Install OpenCode using the official method. A common install command is:

```bash
curl -fsSL https://opencode.ai/install | bash
```

After installation, confirm the command is available:

```bash
opencode --version
```

If the system reports the command cannot be found, close the terminal and reopen it, or check the PATH configuration mentioned by the install script.

## 3. Configure through CC Switch

1. Open CC Switch.
2. Switch to `OpenCode` on the left.
3. Click the `+` button in the top right.
4. Choose `OpenAI Compatible` as the preset. If that preset is not available, choose custom.
5. Set the name to `Tokeness`.
6. Enter your Tokeness API key.
7. Set the Base URL to `https://n.tokeness.io/v1`.
8. Enter the full model name from the Tokeness model marketplace.
9. Save and enable.

If the interface supports a connection test, click it once after saving. If the test fails, check the key, Base URL, and model name first.

## 4. Field mapping for manual configuration

If you are not using CC Switch, fill in the fields in OpenCode's own provider settings according to the mapping below:

| OpenCode field | Tokeness value |
| --- | --- |
| Provider Type | OpenAI Compatible |
| API Key | Tokeness API key |
| Base URL / Endpoint | `https://n.tokeness.io/v1` |
| Model | Tokeness model name |

Do not select the Anthropic provider. The Tokeness general endpoint uses the OpenAI-compatible format.

## 5. Launch and verify

Close the current terminal, reopen one, and run:

```bash
opencode
```

Enter:

```txt
Please reply with a single sentence confirming OpenCode is connected to Tokeness.
```

Then check the Tokeness usage logs to confirm the request record.

## 6. Model switching

OpenCode is well suited to configuring multiple models at once. You can split them by purpose:

| Configuration | Purpose |
| --- | --- |
| Coding model | Writing code, fixing bugs, generating tests |
| Reasoning model | Complex problem analysis, architecture design |
| Low-cost model | Document cleanup, bulk renaming, simple Q&A |

After switching models, if OpenCode does not pick up the change immediately, exit OpenCode and re-enter.

## 7. Troubleshooting

| Symptom | Fix |
| --- | --- |
| OpenCode cannot find the provider | Confirm CC Switch has saved and enabled Tokeness |
| 401 Unauthorized | Re-copy the API key |
| 404 Not Found | Set Base URL to `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the model marketplace |
| Auto-fetch model list failed | Fill in the model name manually |
| No Tokeness logs | OpenCode is not using the Tokeness provider; check the currently enabled configuration |
| Still on the old model after switching | Exit OpenCode and reopen the terminal |