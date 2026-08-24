---
title: n8n
description: Call Tokeness Chat Completions or Responses API from n8n using the HTTP Request node.
---

# n8n

The n8n OpenAI node is designed primarily around official OpenAI credentials. When connecting to Tokeness, the HTTP Request node is more straightforward and easier to debug. Get it working with HTTP Request first, then decide whether to wrap it into a credential or sub-workflow depending on your n8n version.

## Connection Details

| Field | Value |
| --- | --- |
| Method | `POST` |
| URL | `https://n.tokeness.dev/v1/chat/completions` |
| Authorization | `Bearer your Tokeness API key` |
| Content-Type | `application/json` |
| Model | The full model name from the Tokeness model catalog |

## 1. Prepare Tokeness

Prepare the following first:

1. A dedicated API key for n8n.
2. A chat model name.
3. Available balance.

Name the key something like:

```txt
n8n-workflow
```

If you have multiple workflows in n8n, you can split keys by workflow.

## 2. Create an HTTP Request Node

Add an HTTP Request node to your n8n workflow.

Fill in:

```txt
Method: POST
URL: https://n.tokeness.dev/v1/chat/completions
```

You can leave Authentication set to None for now and add the header manually. Once it works, switch to Bearer Auth or Header Auth credentials.

## 3. Configure Headers

Add two headers:

```txt
Authorization: Bearer YOUR_TOKENESS_API_KEY
Content-Type: application/json
```

Do not put the real key directly into a workflow JSON that will be exported. For long-term use, store the key in n8n Credentials or an environment variable.

## 4. Configure the Body

Set the body type to JSON and fill in:

```json
{
  "model": "YOUR_MODEL_NAME",
  "messages": [
    {
      "role": "user",
      "content": "Summarize in one sentence: {{$json.text}}"
    }
  ]
}
```

Replace `YOUR_MODEL_NAME` with the model name from the Tokeness model catalog.

If the upstream node does not have a `text` field, test with a fixed string first:

```json
{
  "model": "YOUR_MODEL_NAME",
  "messages": [
    {
      "role": "user",
      "content": "Reply with ok only"
    }
  ]
}
```

## 5. Extract Text from the Response

The text returned by Chat Completions is typically at:

```txt
choices[0].message.content
```

You can read this field in a subsequent Set, Code, or IF node.

If you use the Responses API, change the URL to:

```txt
https://n.tokeness.dev/v1/responses
```

Example body:

```json
{
  "model": "YOUR_MODEL_NAME",
  "input": "Reply with ok only"
}
```

The output structure of the Responses API differs from Chat Completions, so downstream nodes must read the actual returned fields.

## 6. Use Credentials

n8n HTTP Request credentials support Bearer Auth and Header Auth.

Bearer Auth:

```txt
Bearer Token: your Tokeness API key
```

Header Auth:

```txt
Name: Authorization
Value: Bearer your Tokeness API key
```

After creating the credential, select it in the HTTP Request node. This way the key is not exposed when the workflow is exported.

## 7. Workflow Tips

| Scenario | Recommendation |
| --- | --- |
| Batch processing | Create a dedicated key for the workflow and set a quota |
| Long text | Set a reasonable timeout and split the input if needed |
| Retries | Limit retry count to avoid burning balance in a failure loop |
| Logging | Do not log full request headers |
| Concurrency | Control batch node concurrency to avoid sudden cost spikes |

## 8. Troubleshooting

| Symptom | Action |
| --- | --- |
| 401 Unauthorized | The Authorization header should be `Bearer KEY` |
| 404 Not Found | The URL should be `https://n.tokeness.dev/v1/chat/completions` |
| model not found | Re-copy the model name from the Tokeness model catalog |
| JSON parse error | Set the body type to JSON and check quotes and commas |
| Expression is empty | Test with fixed text first, then connect upstream fields |
| No Tokeness logs | The request did not reach Tokeness — check the URL and whether the node executed |
| Workflow calls repeatedly | Check loop nodes, retry settings, and error branches |

## External Documentation

- [n8n HTTP Request Credentials](https://docs.n8n.io/integrations/builtin/credentials/httprequest/)
- [n8n OpenAI Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/)
- [n8n OpenAI Credentials](https://docs.n8n.io/integrations/builtin/credentials/openai/)