---
title: Custom API and Key
description: Connect Tokeness in tools that support custom API, Base URL, Provider, or OpenAI Compatible configuration.
---

# Custom API and Key

Many AI tools do not have Tokeness built in, but as long as the tool supports any of the following options, you can connect:

- OpenAI Compatible
- OpenAI API
- Custom Provider
- Custom API
- Base URL
- API Endpoint
- API Host

Tokeness uses an OpenAI-compatible endpoint. Connecting usually requires only three fields:

| Field | Value |
| --- | --- |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | The full model name from the Tokeness model marketplace |

If the tool also asks you to choose a protocol or API format, prefer `OpenAI Compatible`, `OpenAI Chat Completions`, or `OpenAI Responses`. Do not select Anthropic, Gemini, or Azure OpenAI unless the corresponding integration page explicitly states that the tool requires that protocol.

## Before you connect

Complete these steps in the Tokeness console first:

1. Log in to Tokeness.
2. Open the wallet and confirm the account balance is available.
3. Go to the API keys page and create a dedicated key.
4. Go to the model marketplace and copy the model name you plan to use.
5. Open the usage logs page — you will use it later to confirm requests reach Tokeness.

API keys can be split by tool or project. For example:

| Use case | Example key name |
| --- | --- |
| Claude Code | `claude-code-local` |
| Codex CLI | `codex-cli-local` |
| OpenCode | `opencode-local` |
| Cursor | `cursor-workspace-name` |
| Production service | `prod-api-server` |

This makes it easier to locate keys later when reviewing logs, setting quotas, or rotating keys.

## How to fill in the tool

Field names vary across tools. Use the mapping below.

| Tool field | Tokeness value |
| --- | --- |
| API Key / Token / Auth Token | Tokeness API key |
| Base URL / API Base / API Endpoint / Host | `https://n.tokeness.io/v1` |
| Provider Name / Name | `Tokeness` |
| Model / Model ID | Full model name copied from the model marketplace |
| API Type / Format / Protocol | `OpenAI Compatible` or `OpenAI` |

If the form has a "fetch model list" button, try it once. A failed fetch does not mean the connection will not work — you can fill in the model name manually.

## Environment variables

Command-line tools and code projects often support environment variables. For OpenAI-compatible scenarios:

```bash
OPENAI_API_KEY=your Tokeness API key
OPENAI_BASE_URL=https://n.tokeness.io/v1
MODEL_NAME=model name copied from the model marketplace
```

Some projects use generic variable names:

```bash
LLM_API_KEY=your Tokeness API key
LLM_BASE_URL=https://n.tokeness.io/v1
LLM_MODEL_ID=model name copied from the model marketplace
```

Common Python pattern:

```py
from openai import OpenAI

client = OpenAI(
    api_key="your Tokeness API key",
    base_url="https://n.tokeness.io/v1",
)

response = client.chat.completions.create(
    model="model name copied from the model marketplace",
    messages=[
        {"role": "user", "content": "Reply with one sentence to confirm the configuration works."}
    ],
)

print(response.choices[0].message.content)
```

Common Node.js pattern:

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://n.tokeness.io/v1'
})

const completion = await client.chat.completions.create({
  model: process.env.MODEL_NAME!,
  messages: [
    { role: 'user', content: 'Reply with one sentence to confirm the configuration works.' }
  ]
})

console.log(completion.choices[0]?.message?.content)
```

## cURL verification

If you are unsure whether the problem is in the tool or in Tokeness, test with cURL first.

macOS / Linux:

```bash
export TOKENESS_API_KEY="your Tokeness API key"
export TOKENESS_MODEL="model name copied from the model marketplace"

curl https://n.tokeness.io/v1/chat/completions \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$TOKENESS_MODEL"'",
    "messages": [
      { "role": "user", "content": "Return ok" }
    ]
  }'
```

Windows PowerShell:

```powershell
$env:TOKENESS_API_KEY = "your Tokeness API key"
$env:TOKENESS_MODEL = "model name copied from the model marketplace"

Invoke-RestMethod `
  -Uri "https://n.tokeness.io/v1/chat/completions" `
  -Method Post `
  -Headers @{
    Authorization = "Bearer $env:TOKENESS_API_KEY"
    "Content-Type" = "application/json"
  } `
  -Body (@{
    model = $env:TOKENESS_MODEL
    messages = @(
      @{ role = "user"; content = "Return ok" }
    )
  } | ConvertTo-Json -Depth 5)
```

If cURL works but the tool does not, check the tool's protocol option, model name, and whether it needs a restart.

## Protocol selection

Most tools connect to Tokeness using the OpenAI-compatible protocol.

| Scenario | Choose |
| --- | --- |
| Chat Completions examples, general chat tools | OpenAI Compatible / Chat Completions |
| Codex CLI with `wire_api` in config | `responses` |
| Claude Code via CC Switch to an OpenAI-compatible endpoint | Enable CC Switch routing mode |
| Native Anthropic SDK | Follow the Anthropic API page; do not use the generic setup on this page |

Claude Code natively uses the Anthropic protocol. When connecting through CC Switch to an OpenAI-compatible endpoint, let CC Switch handle the protocol conversion. Otherwise Claude Code may send Anthropic-format requests directly to the OpenAI-compatible endpoint, causing request failures.

## Should the Base URL include `/v1`

The standard Tokeness Base URL is:

```txt
https://n.tokeness.io/v1
```

Most tools should use this address.

When in doubt, start with `https://n.tokeness.io/v1`. If you get a 404, check whether the tool's actual request URL became `/v1/v1/...`. Only when the tool's documentation explicitly states it auto-appends `/v1` should you follow that tool's instructions.

## Model names

Model names must be copied from the Tokeness model marketplace — do not abbreviate them yourself.

Common mistakes:

| Wrong approach | Problem |
| --- | --- |
| Writing only `gpt-4` | May not be a currently available Tokeness model name |
| Changing the casing | Model names may be case-sensitive |
| Removing the version number or vendor prefix | The backend cannot match the model |
| Using the tool's default model | The default model may not be available in the current key's group |

For your first connection, pick a confirmed-available chat model. Once the tool works, switch to a model better suited for coding, long context, or reasoning.

## Key security

Use API keys only in local environments, server environment variables, or the tool's secure configuration page. Do not put them in public repositories, screenshots, documentation, front-end code, or chat logs.

Key management best practices:

- Use a separate key for each tool or project.
- Create a dedicated key for production environments.
- Immediately disable old keys when someone leaves, devices change, or a leak is suspected.
- Do not place keys in browser-side code for online services.
- Set quotas for high-frequency tools to avoid unexpected consumption from accidental calls.

## Verifying success

A complete verification has three steps:

1. The tool returns a model reply.
2. The Tokeness usage logs show the corresponding request.
3. The model name, key, usage, and status code in the logs match expectations.

If the tool shows success but Tokeness has no log entry, the request likely did not reach Tokeness. Check the Base URL, any proxy settings, and whether the tool's provider is actually enabled.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| 401 Unauthorized | Re-copy the API key; confirm there are no extra spaces and the key is not disabled |
| 403 Forbidden | Check the key group, quota, model permissions, or account status |
| 404 Not Found | Check the Base URL; it should usually be `https://n.tokeness.io/v1` |
| model not found | Re-copy the model name from the model marketplace |
| No request logs | The tool is not routing through Tokeness; check whether the provider is enabled |
| `/v1/v1` related errors | The tool auto-appended `/v1`; follow that tool's documentation for the Base URL |
| Claude Code request failures | Enable routing mode via CC Switch and confirm the API format is OpenAI Compatible |
| Codex still uses the old model after switching | Close the current terminal, reopen it, then run again |
| Auto-fetch models failed | Fill in the model name manually; it does not affect calls |