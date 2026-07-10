---
title: Cline
description: Complete steps to connect Cline to Tokeness using an OpenAI Compatible provider.
---

# Cline

Cline supports an OpenAI Compatible provider. Tokeness connects via the OpenAI-compatible endpoint — during configuration you fill in the Base URL, API Key, and Model ID.

## Connection details

| Field | Value |
| --- | --- |
| API Provider | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model ID | Full model name from the Tokeness model marketplace |

If your Cline version does not offer `OpenAI Compatible`, choose `OpenAI` and then fill in a custom Base URL.

## 1. Prepare Tokeness

In the Tokeness console:

1. Confirm the wallet balance is available.
2. Create an API key dedicated to Cline.
3. Go to the model marketplace and copy a model name.
4. Open the usage logs — you will use them later to confirm requests.

You can name the key:

```txt
cline-local
```

Cline is a coding agent: it reads files, generates code, and retries tasks. Creating a separate key makes it easier to track consumption and troubleshoot issues later.

## 2. Open Cline settings

In VS Code, open the Cline panel and go to the settings page. The common entry point is the settings button in the top right of the Cline panel.

In the Provider or API Provider dropdown, select:

```txt
OpenAI Compatible
```

If the interface only shows an OpenAI option, check whether there is a Base URL, Custom Base URL, or API Base field. As long as you can change the Base URL, you can connect to Tokeness.

## 3. Fill in the Tokeness configuration

Enter the following:

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model ID: the model name copied from the Tokeness model marketplace
```

Notes:

- Keep the `/v1` suffix in the Base URL.
- Do not abbreviate the Model ID yourself.
- If Cline offers a Verify, Test, or Save button, verify once before saving.
- If the model list fetch fails, fill in the Model ID manually.

## 4. Verification

Send a read-only task in Cline:

```txt
Please read the current project structure, but do not modify any files. Summarize the top-level directories you see.
```

Check three things during verification:

1. Cline can reply normally.
2. A request appears in the Tokeness usage logs.
3. The key, model name, and status code in the logs are correct.

Do not let Cline make large-scale code changes on the first test. First confirm the connection, model, and permissions are all working, then proceed with file-writing tasks.

## 5. Settings before writing files

Cline performs file reads and modifications. After connecting to Tokeness, tool permissions are still controlled by Cline and VS Code — Tokeness only handles the model calls.

Check the following before writing files:

| Item | Action |
| --- | --- |
| Key | Use a Cline-dedicated key |
| Quota | Set an appropriate quota on the key |
| Model | Choose a model suited for coding tasks |
| Logs | Keep Tokeness usage logs open and watch for repeated calls |
| Git | Confirm the working tree status before large changes |

## 6. Troubleshooting

| Symptom | Fix |
| --- | --- |
| Verify failed | Check the Base URL, key, and model name |
| 401 Unauthorized | Re-copy the API key and confirm there are no spaces |
| 404 Not Found | Base URL should be `https://n.tokeness.io/v1` |
| model not found | Re-copy the Model ID from the Tokeness model marketplace |
| Cline reports errors but no Tokeness logs | The current provider is not routing through Tokeness |
| Replies work but tool calls fail | Switch to a model with stronger coding ability, or narrow the task scope |
| High consumption | Reduce the context range and use a separate key with a quota |

## External docs

- [Cline OpenAI Compatible Provider](https://docs.cline.bot/provider-config/openai-compatible)
- [Cline OpenAI Provider Custom Base URL](https://docs.cline.bot/provider-config/openai)