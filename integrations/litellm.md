---
title: LiteLLM
description: Route to the Tokeness OpenAI-compatible API using the LiteLLM SDK or Proxy.
---

# LiteLLM

LiteLLM can be used as a Python SDK or run as an OpenAI-compatible gateway. When connecting to Tokeness, the core is to point `api_base` or `api_base_url` at `https://n.tokeness.io/v1` and use your Tokeness API key.

## Preparation

| Field | Value |
| --- | --- |
| API Base | `https://n.tokeness.io/v1` |
| API Key | A key created in the Tokeness console |
| Model | The full model name copied from the Tokeness model catalog |

If your own code just needs to call Tokeness, using the OpenAI SDK directly is simpler. LiteLLM is better suited when an existing project already depends on it, or when a team wants an additional unified gateway layer internally.

## Python SDK Method

Install:

```bash
pip install litellm
```

Example:

```py
from litellm import completion

response = completion(
    model="openai/YOUR_MODEL_NAME",
    api_key="your Tokeness API key",
    api_base="https://n.tokeness.io/v1",
    messages=[
        {"role": "user", "content": "Reply with ok only"}
    ],
)

print(response["choices"][0]["message"]["content"])
```

Note the `openai/` prefix on the model name. It tells LiteLLM to call the backend through the OpenAI-compatible path. Replace `YOUR_MODEL_NAME` with the full model name from the Tokeness model catalog.

## Environment Variable Method

You can also store the key in an environment variable:

macOS / Linux:

```bash
export OPENAI_API_KEY="your Tokeness API key"
```

Windows PowerShell:

```powershell
$env:OPENAI_API_KEY = "your Tokeness API key"
```

Code:

```py
from litellm import completion

response = completion(
    model="openai/YOUR_MODEL_NAME",
    api_base="https://n.tokeness.io/v1",
    messages=[
        {"role": "user", "content": "Reply with ok only"}
    ],
)
```

## LiteLLM Proxy Method

If you want multiple tools in a team to access a single internal gateway, you can start the LiteLLM Proxy.

Create `config.yaml`:

```yaml
model_list:
  - model_name: tokeness-chat
    litellm_params:
      model: openai/YOUR_MODEL_NAME
      api_base: https://n.tokeness.io/v1
      api_key: os.environ/TOKENESS_API_KEY
```

Start:

```bash
export TOKENESS_API_KEY="your Tokeness API key"
litellm --config config.yaml --port 4000
```

After starting, other OpenAI-compatible clients can connect to:

```txt
http://localhost:4000/v1
```

Client configuration:

| Client field | Value |
| --- | --- |
| Base URL | `http://localhost:4000/v1` |
| API Key | The LiteLLM Proxy access key; for local testing, handle it according to your LiteLLM configuration |
| Model | `tokeness-chat` |

At this point, client requests go to LiteLLM first, and LiteLLM forwards them to Tokeness.

## When You Do Not Need LiteLLM

The following scenarios can connect to Tokeness directly without adding LiteLLM:

| Scenario | Approach |
| --- | --- |
| OpenAI SDK calls | Set `base_url=https://n.tokeness.io/v1` directly |
| Cherry Studio / Cline / Roo Code | Fill in the Tokeness Base URL and key directly |
| Dify / n8n | Configure according to the corresponding integration page |
| Single-user local use | Configure the tool directly — one less layer to debug |

LiteLLM is appropriate for team environments that need centralized rate limiting, centralized logging, unified model aliases, or internal multi-service routing.

## Verification

SDK method:

1. Run the Python example.
2. Confirm the terminal prints `ok`.
3. Open the Tokeness usage logs.

Proxy method:

1. Start the LiteLLM Proxy.
2. Use the OpenAI SDK or cURL to request `http://localhost:4000/v1/chat/completions`.
3. Use `tokeness-chat` as the model name.
4. Confirm the request in the Tokeness usage logs.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| LiteLLM reports an ambiguous provider | Add the `openai/` prefix to the model name |
| 401 | Check the Tokeness key; in Proxy mode, also check the client-to-proxy key |
| 404 | `api_base` should be `https://n.tokeness.io/v1` |
| Client can reach the Proxy but Tokeness has no logs | Check whether the LiteLLM `config.yaml` is actually forwarding to Tokeness |
| Model name changed | Clients should use the alias exposed by LiteLLM, such as `tokeness-chat`; LiteLLM then maps it to the Tokeness model name internally |

## References

- [LiteLLM OpenAI-Compatible Endpoints](https://docs.litellm.ai/docs/providers/openai_compatible)
- [LiteLLM Proxy Getting Started](https://docs.litellm.ai/docs/)