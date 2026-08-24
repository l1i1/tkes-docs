---
title: OpenClaw
description: Add Tokeness as a model provider in OpenClaw, configure OpenAI Compatible, Base URL, API key, and model name.
---

# OpenClaw

OpenClaw supports adding model providers. To connect to Tokeness, configure it as an OpenAI Compatible provider.

## Connection Details

| Field | Value |
| --- | --- |
| Provider Name | `Tokeness` |
| API Type | `OpenAI Compatible` or `OpenAI` |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | A key created in the Tokeness console |
| Model | Copied from the Tokeness model catalog |

## 1. Prepare Tokeness

Complete the following in the Tokeness console first:

1. Confirm your balance is available.
2. Create a dedicated API key for OpenClaw.
3. Copy the model name you want to use.
4. Open the usage logs page.

Name the key something like:

```txt
openclaw-local
```

## 2. Open OpenClaw Model Settings

Open the OpenClaw admin page and find the model, Config, Models, Provider, or Model Provider settings. The entry point name may differ across versions, but what you need to add is a "model provider."

If OpenClaw offers a setup wizard, you can also choose a custom model provider in the wizard.

## 3. Add the Tokeness Provider

Create a new provider:

```txt
Name: Tokeness
API Type: OpenAI Compatible
Base URL: https://n.tokeness.dev/v1
API Key: your Tokeness API key
Model: the model name copied from the Tokeness model catalog
```

If OpenClaw distinguishes between Chat Model, Reasoning Model, and Small Model, you can fill them all with the same verified model first. Once it works, split them by task type.

If OpenClaw supports fetching a model list from `/v1/models`, you can try auto-fetch. If it fails, enter the model name manually.

## 4. Save and Enable

After saving the provider, confirm that the current agent or default model has been switched to Tokeness.

Check two things:

1. The provider has been saved.
2. The model configuration the current agent actually uses has Tokeness selected.

Some tools do not automatically switch the default model after saving a provider — you need to select it again in the agent configuration.

## 5. Verification

Start a short task in OpenClaw:

```txt
Reply with a single sentence confirming OpenClaw is now connected to Tokeness.
```

Then open the Tokeness usage logs:

- A new request means the request reached Tokeness.
- The correct model name means the configuration took effect.
- A successful status code means the key, balance, and model permissions are fine.

## 6. Multi-Model Configuration

Common OpenClaw scenarios can be split into multiple model sets:

| Configuration | Use case |
| --- | --- |
| Main Model | Primary conversation, task planning |
| Coding Model | Code changes, project analysis |
| Fast Model | Simple replies, titles, summaries |
| Reasoning Model | Complex reasoning, long tasks |

Each model can use the same Tokeness Base URL — only the model name needs to differ.

## 7. Keys and Quota

OpenClaw is often used for long tasks and automation, so it is well suited to a dedicated key and quota.

Key management recommendations:

- Create a dedicated key for OpenClaw.
- Set a smaller quota for the first connection.
- Confirm the model price before running long tasks.
- Check usage logs regularly for abnormal retries.
- Do not upload the OpenClaw configuration directory to a public repository.

## 8. Troubleshooting

| Symptom | Action |
| --- | --- |
| 401 Unauthorized | The API key is wrong, disabled, or copied with extra spaces |
| 403 Forbidden | Check the key group, quota, model permissions, or account status |
| 404 Not Found | The Base URL should be `https://n.tokeness.dev/v1` |
| model not found | Re-copy the model name from the model catalog |
| Still uses the old model after saving | After saving the provider, also switch the model in the agent default settings |
| No Tokeness logs | The current OpenClaw agent is not using the Tokeness provider |
| Auto-fetch model list failed | Enter the model name manually |
| Long task interrupted | Check the model context, tool calls, balance, and timeout settings |