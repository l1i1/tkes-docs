---
title: Codex CLI
description: Connect Codex CLI to the Tokeness Responses API through CC Switch or manual configuration.
---

# Codex CLI

Codex CLI can use a custom model provider. Tokeness connects via the OpenAI Responses protocol — the Base URL is always:

```txt
https://n.tokeness.io/v1
```

If you use [CC Switch](https://ccswitch.io/zh/docs?section=getting-started), it writes Codex's `auth.json` and `config.toml` for you. If you need to check the configuration manually, this page also provides file examples.

## Connection details

| Field | Value |
| --- | --- |
| Provider Name | `Tokeness` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | Copied from the Tokeness model marketplace |
| Wire API | `responses` |

## 1. Prepare Tokeness

Prepare three things first:

1. A Tokeness API key.
2. A Tokeness model name.
3. Available balance.

Create a separate key for Codex:

```txt
codex-cli-local
```

If you later notice abnormal Codex consumption, you can disable just this key without affecting other tools.

## 2. Install Codex CLI

Confirm Node.js is available:

```bash
node --version
npm --version
```

Install:

```bash
npm install -g @openai/codex
```

If npm downloads are slow:

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

Confirm the command is available:

```bash
codex --version
```

## 3. Configure through CC Switch

1. Open CC Switch.
2. Switch to `Codex` on the left.
3. Click the `+` button in the top right.
4. If there is no Tokeness preset, choose a custom provider.
5. Set the name to `Tokeness`.
6. Enter your Tokeness API key.
7. Set the Base URL to `https://n.tokeness.io/v1`.
8. Enter the full model name from the Tokeness model marketplace.
9. For API type or Wire API, select `responses`.
10. Save and enable.

After switching, close the current terminal, reopen one, and then run Codex. Codex CLI usually reads its configuration at startup, so the old terminal may still hold the previous environment.

## 4. Manual configuration reference

If you want to verify what CC Switch wrote, you can check the Codex configuration directory.

macOS / Linux:

```bash
ls ~/.codex
```

Windows PowerShell:

```powershell
Get-ChildItem $env:USERPROFILE\.codex
```

`auth.json` example:

```json
{
  "OPENAI_API_KEY": "your Tokeness API key"
}
```

`config.toml` example:

```toml
model_provider = "tokeness"
model = "the model name copied from the Tokeness model marketplace"
disable_response_storage = true

[model_providers.tokeness]
name = "Tokeness"
base_url = "https://n.tokeness.io/v1"
wire_api = "responses"
requires_openai_auth = true
```

Field descriptions:

| Field | Description |
| --- | --- |
| `model_provider` | The currently active provider |
| `model` | The model Codex uses by default |
| `base_url` | Tokeness endpoint address |
| `wire_api` | Codex uses the Responses protocol |
| `requires_openai_auth` | Uses OpenAI-style Bearer key authentication |

If you manage Codex through CC Switch, do not manually edit these two files long-term. The next time you switch providers in CC Switch, your manual changes may be overwritten.

## 5. Verification

Reopen the terminal:

```bash
codex
```

Enter:

```txt
Please reply with a single sentence confirming Codex is now connected to Tokeness.
```

Then check the Tokeness usage logs to confirm:

- A new request appeared.
- The key is the Codex-dedicated key.
- The model name is correct.
- The status code is successful.

## 6. Multi-model configuration

You can create multiple Codex providers in CC Switch, or switch the `model` in the configuration.

| Configuration name | Purpose |
| --- | --- |
| `Tokeness Codex Coding` | Daily code modifications |
| `Tokeness Codex Reasoning` | Complex analysis, solution design |
| `Tokeness Codex Docs` | Document cleanup, bulk rewriting |

After switching, reopen the terminal.

## 7. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `codex` command not found | Reinstall, or restart the terminal |
| Still using the old model | Close the terminal and reopen; check `model_provider` |
| 401 Unauthorized | Check the key in `auth.json` |
| 404 Not Found | Check that `base_url` is `https://n.tokeness.io/v1` |
| Responses-related errors | Check that `wire_api = "responses"` |
| model not found | Re-copy the model name from the Tokeness model marketplace |
| No Tokeness logs | Codex is not using the Tokeness configuration; check whether the provider is enabled |