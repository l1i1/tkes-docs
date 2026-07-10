---
title: Cherry Studio
description: Add Tokeness as a custom provider in Cherry Studio, configure the API address, API key, and model list.
---

# Cherry Studio

Cherry Studio supports custom AI providers. Tokeness connects through the OpenAI-compatible interface — fill in the API address and API key in a custom provider, then add model names manually.

## Connection Details

| Field | Value |
| --- | --- |
| Provider Type | `OpenAI` or a custom OpenAI-compatible provider |
| Provider Name | `Tokeness` |
| API Address / Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model ID | The full model name from the Tokeness model catalog |

Field labels may differ across Cherry Studio versions. As long as the field means API address, API key, or model management, fill it in according to the table above.

## 1. Prepare Tokeness

Prepare the following first:

1. A dedicated API key for Cherry Studio.
2. A confirmed, working model name.
3. Available balance.

Name the key something like:

```txt
cherry-studio-local
```

If you plan to configure multiple assistants or knowledge bases inside Cherry Studio, create separate keys for different use cases.

## 2. Create a Custom Provider

Open Cherry Studio settings and find the model service, Provider, or provider configuration section.

Create a new provider:

```txt
Name: Tokeness
Type: OpenAI
API Address: https://n.tokeness.io/v1
API Key: your Tokeness API key
```

Before saving, if the interface has a Check, Test, or Verify button, click it once. If validation fails, do not continue adding models — check the key and API address first.

## 3. Add Models

Cherry Studio custom providers usually require models to be added manually.

Steps:

1. Open the Tokeness model catalog.
2. Copy the full model name.
3. Return to Cherry Studio model management.
4. Click Add Model.
5. Paste the model name.
6. Save.

Keep the full model name exactly — preserve case, vendor prefix, and version number.

## 4. Set the Default Model

After adding models, select the Tokeness provider and the corresponding model on the Cherry Studio chat page.

For a first test, send:

```txt
Reply with a single sentence confirming the model is now available.
```

Then open the Tokeness usage logs and confirm the request reached Tokeness.

## 5. Multiple Provider Configurations

If you have several use cases, you can create multiple Tokeness providers:

| Provider name | Use case |
| --- | --- |
| `Tokeness Chat` | Everyday chat |
| `Tokeness Coding` | Code-related conversations |
| `Tokeness Low Cost` | Summaries, translations, simple Q&A |
| `Tokeness Test` | Small-quota testing |

These providers can share the same Base URL — only the key and model configuration need to differ.

## 6. Troubleshooting

| Symptom | Action |
| --- | --- |
| Check fails | Verify the API address, key, and balance |
| 401 Unauthorized | Re-copy the API key |
| 404 Not Found | Set the API address to `https://n.tokeness.io/v1` |
| Model list is empty | Add model names manually |
| model not found | Re-copy the model name from the model catalog |
| No Tokeness logs | The current session is not using the Tokeness provider |
| Usage cannot be distinguished | Create a separate key for Cherry Studio |

## External Documentation

- [Cherry Studio Custom Provider](https://docs.cherry-ai.com/docs/en-us/pre-basic/providers/zi-ding-yi-fu-wu-shang)
- [Cherry Studio NewAPI Provider Example](https://docs.cherry-ai.com/docs/en-us/pre-basic/providers/newapi)
