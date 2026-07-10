---
title: Dify
description: Connect Dify to Tokeness through the OpenAI-API-compatible plugin or a custom model provider.
---

# Dify

Dify can connect to external models through model providers. To integrate Tokeness, use Dify's OpenAI-API-compatible plugin or OpenAI-compatible model provider, and fill in the Tokeness API endpoint, API key, and model name.

## Connection Details

| Field | Value |
| --- | --- |
| Provider | OpenAI-API-compatible |
| API Endpoint / Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model Name | The full model name from the Tokeness model catalog |

If your Dify version already has a built-in OpenAI Compatible provider, use it directly. If there is no built-in entry, install the OpenAI-API-compatible plugin from the Marketplace.

## 1. Prepare Tokeness

Prepare the following first:

1. A dedicated API key for Dify.
2. A chat model name.
3. If you plan to use RAG, also prepare an embedding model name.
4. Available balance.

Name the key something like:

```txt
dify-workspace
```

Create separate keys for production and test environments.

## 2. Install or Open the Model Provider

In the Dify workspace, navigate to:

```txt
Settings -> Model Provider
```

If you see OpenAI-API-compatible or OpenAI Compatible, open its configuration directly.

If you do not see it:

1. Open the Dify Marketplace.
2. Search for `OpenAI-API-compatible`.
3. Install the `langgenius/openai_api_compatible` plugin.
4. Return to the model provider settings page.

## 3. Add a Tokeness LLM

Add a model under the OpenAI-API-compatible provider.

Fill in:

```txt
API Endpoint: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model Name: the model name copied from the Tokeness model catalog
```

Select LLM or Chat Model as the model type. Fill in context length, max output, function calling, and multimodal capabilities according to the Tokeness model catalog and your own test results.

If Dify asks for a Completion mode, prefer Chat Completion for standard chat applications.

## 4. Add an Embedding Model

If your Dify application uses a knowledge base, you also need to add an embedding model.

Fill in the same way as the chat model:

```txt
API Endpoint: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model Name: the embedding model name copied from the Tokeness model catalog
```

Notes:

- Chat models and embedding models are not the same thing.
- After a knowledge base index is built, changing the embedding model may require rebuilding the index.
- If you are only building a chat application, you can skip embedding configuration for now.

## 5. Select a Model in Your Application

Open the orchestration page of your Dify application and select the model under the Tokeness provider in the model selector.

First test:

1. Create a new blank chat application.
2. Select the Tokeness model.
3. Enter a short question.
4. Check the Tokeness usage logs to confirm the request.

In workflow applications, verify that every LLM node has a Tokeness model selected.

## 6. Self-Hosted Dify Notes

When self-hosting Dify, the Dify container must be able to reach `https://n.tokeness.io/v1`.

If validation fails:

| Check | Details |
| --- | --- |
| Container network | Can the Dify API/worker container reach the internet? |
| Proxy | Does the server require an HTTP/HTTPS proxy? |
| Certificates | Are there self-signed certificates or a corporate gateway intercepting traffic? |
| Endpoint | Do not use an address that your browser can reach but the container cannot |

You can enter the Dify container and test the Tokeness endpoint with cURL.

## 7. Troubleshooting

| Symptom | Action |
| --- | --- |
| Credential validation failed | Check the endpoint, key, and container network |
| 401 Unauthorized | The API key is wrong or has been disabled |
| 404 Not Found | Set the API endpoint to `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the Tokeness model catalog |
| Model not found in the app | The model was not saved after adding, or was not selected in the app node |
| Knowledge base cannot index | Check whether the embedding model is configured correctly |
| No Tokeness logs | The current Dify application is not using a Tokeness model |

## External Documentation

- [Dify Model Providers](https://docs.dify.ai/en/use-dify/workspace/model-providers)
- [Dify OpenAI-API-compatible Marketplace Plugin](https://marketplace.dify.ai/plugin/langgenius/openai_api_compatible)