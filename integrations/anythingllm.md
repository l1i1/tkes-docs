---
title: AnythingLLM
description: Connect AnythingLLM to Tokeness using the Generic OpenAI provider.
---

# AnythingLLM

AnythingLLM's `OpenAI (Generic)` provider is designed for OpenAI-compatible interfaces. Tokeness can be connected this way.

## Preparation

| Field | Value |
| --- | --- |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | A key created in the Tokeness console |
| Model | The full model name copied from the Tokeness model catalog |

AnythingLLM comes in desktop, Docker, and cloud versions. Menu locations may differ, but the configuration fields are essentially the same.

## Configure the LLM Provider

1. Open AnythingLLM.
2. Go to Settings.
3. Find LLM Preference or Model Provider.
4. Select `OpenAI (Generic)` or `Generic OpenAI`.
5. Set the Base URL to `https://n.tokeness.dev/v1`.
6. Enter your Tokeness API key.
7. Enter the full model name from the Tokeness model catalog.
8. Save.

Field mapping:

| AnythingLLM field | Tokeness value |
| --- | --- |
| LLM Provider | `OpenAI (Generic)` |
| Base URL / API Base | `https://n.tokeness.dev/v1` |
| API Key | Your Tokeness API key |
| Model | A Tokeness model name |

## Workspace Models

AnythingLLM supports per-workspace model settings. After saving the global provider, check whether the current workspace is actually using the model you just configured.

Recommended order:

1. Save the Tokeness provider in global settings first.
2. Open the workspace settings.
3. Confirm the workspace uses the Tokeness provider.
4. Select or enter the Tokeness model name.
5. Save and reopen the chat.

If the global save succeeds but the workspace still uses the old model, check the workspace-level override settings.

## Knowledge Base and Embedding Model

AnythingLLM treats chat models and vector models as two separate configuration categories. After connecting a chat model, if you want to upload documents and do Q&A, you also need to configure embedding.

Recommended order:

1. Get standard chat working first.
2. Then configure the embedding model.
3. Upload a small document and test retrieval.
4. Only after that, import a larger knowledge base.

Do not import a large number of files right away. It makes troubleshooting slow and makes it hard to distinguish chat model issues from vector model issues.

## Verification

1. Create a test workspace in AnythingLLM.
2. Send "reply with ok only".
3. Open the Tokeness usage logs and confirm a request arrived.
4. Upload a small text file.
5. Ask a question whose answer can be found directly in the file.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Chat still uses the old model after saving the provider | Check whether the workspace overrides the global model |
| 401 | Check the API key |
| 404 | The Base URL should be `https://n.tokeness.dev/v1` |
| model not found | Copy the full model name from the Tokeness model catalog |
| Chat works but document Q&A does not | Configure the embedding model separately |
| Responses are very slow | Test with a short question first, then check the model, context length, and document size |

## References

- [AnythingLLM OpenAI Generic LLM](https://docs.anythingllm.com/setup/llm-configuration/cloud/openai-generic)
- [AnythingLLM Configuration](https://docs.anythingllm.com/configuration)