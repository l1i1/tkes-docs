---
title: Claude Code
description: Configure Claude Code with Tokeness through CC Switch — API key, Base URL, model name, and routing mode.
---

# Claude Code

Claude Code uses the Anthropic protocol natively. Tokeness exposes a general OpenAI-compatible endpoint, so when connecting Claude Code to Tokeness you manage the provider through [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) and enable routing mode.

This page follows a "fresh machine, from scratch" workflow. If you already have Claude Code and CC Switch installed, you can start from "Add the Tokeness provider".

## Connection details

| Field | Value |
| --- | --- |
| Provider Name | `Tokeness` |
| API Format | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | Copied from the Tokeness model marketplace |

When Claude Code talks directly to an OpenAI-compatible endpoint, make sure CC Switch has taken over and completed the protocol conversion. Without routing, Claude Code may send Anthropic Messages requests to the OpenAI-compatible endpoint, causing 400, 404, or tool-calling errors.

## 1. Prepare Tokeness

First, in the Tokeness console:

1. Open the wallet and confirm the balance is available.
2. Go to the API keys page and create a key dedicated to Claude Code.
3. Go to the model marketplace and copy a model name suited for coding tasks.
4. Open the usage logs page — you will use it later to verify that requests reach Tokeness.

You can name the key:

```txt
claude-code-local
```

Do not commit the key to a project repository, and do not screenshot the full key.

## 2. Install Claude Code

Confirm Node.js is available on your machine:

```bash
node --version
npm --version
```

Install Claude Code:

```bash
npm install -g @anthropic-ai/claude-code
```

If npm downloads are slow:

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

Confirm the command is available:

```bash
claude --version
```

If the system reports that `claude` cannot be found, close the current terminal, reopen it, and try again.

## 3. Install CC Switch

Open the CC Switch documentation and install it:

<https://ccswitch.io/zh/docs?section=getting-started>

After installation, launch CC Switch. On Windows and macOS you will usually see an icon in the system tray or menu bar.

If CC Switch reports that it cannot find Claude Code, first confirm that `claude --version` works in a regular terminal.

## 4. Add the Tokeness provider

1. Open CC Switch.
2. Select `Claude Code` on the left.
3. Click the `+` button in the top right to add a provider.
4. If Tokeness is not in the presets, choose a custom provider.
5. Set the name to `Tokeness`.
6. Set the API format to `OpenAI Compatible` or `OpenAI`.
7. Enter your Tokeness API key.
8. Set the Base URL to `https://n.tokeness.io/v1`.
9. Enter the full model name from the Tokeness model marketplace.
10. Save.

If the interface offers a "fetch model list" button, you can try it once. If the fetch fails, fill in the model name manually.

## 5. Enable routing mode

This is the step to pay close attention to for Claude Code.

In CC Switch's Claude Code settings, find the toggle related to routing, proxy, or local forwarding, and enable it. The wording may differ across CC Switch versions, but the meaning is the same: Claude Code requests go through CC Switch first, and CC Switch then forwards them to the custom provider.

Once enabled, CC Switch converts Claude Code's requests into the format the target provider can accept. For Tokeness, choose the OpenAI-compatible format.

If routing mode is not enabled, common symptoms are:

| Symptom | Cause |
| --- | --- |
| Claude Code starts but requests fail | Request format was not converted |
| No usage logs in Tokeness | Requests did not reach Tokeness |
| 404 returned | Request path is not an OpenAI-compatible path |
| Tool calls fail | Anthropic and OpenAI tool-calling formats were not converted |

## 6. Enable and restart Claude Code

Enable the Tokeness provider in CC Switch. Then close the current Claude Code process and reopen the terminal.

Run:

```bash
claude
```

If this is your first time running Claude Code, the official initialization guide may appear. Follow the CC Switch documentation to complete initialization; if CC Switch offers a "skip first-run confirmation" option, you can enable it and then restart.

## 7. Verification

In Claude Code, enter:

```txt
Hello. Please reply with a single sentence confirming you are ready to work.
```

After success, check Tokeness:

1. Open the usage logs.
2. Find the request you just made.
3. Confirm the key, model name, status code, and usage are correct.

If Claude Code replies but there is no log entry, the current request did not go through Tokeness.

## 8. Common switching patterns

If you have multiple Tokeness keys or multiple models, you can create several providers in CC Switch:

| Name | Purpose |
| --- | --- |
| `Tokeness Coding` | Daily coding |
| `Tokeness Reasoning` | Complex reasoning |
| `Tokeness Low Cost` | Bulk document edits, simple tasks |

After switching providers, reopen the terminal before running `claude` again, so the old process does not keep using the old configuration.

## 9. Troubleshooting

| Symptom | Fix |
| --- | --- |
| `claude` command not found | Reinstall Claude Code, or restart the terminal |
| CC Switch cannot find Claude Code | Confirm `claude --version` works |
| 401 Unauthorized | Re-copy the Tokeness API key |
| 404 Not Found | Set Base URL to `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the model marketplace |
| No Tokeness logs | Confirm the Tokeness provider is enabled and CC Switch routing mode is on |
| Slow responses | Switch models, or check the current model load and network |
| Tool call errors | Confirm requests go through CC Switch routing; complex tool calls require full protocol conversion |