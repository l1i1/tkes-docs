---
title: Open WebUI
description: Use Tokeness through the OpenAI-compatible interface in Open WebUI.
---

# Open WebUI

Open WebUI can connect to external model services through OpenAI-compatible configuration. When self-hosting Open WebUI, you can set the Tokeness Base URL and API key via environment variables or the admin panel.

## Preparation

| Field | Value |
| --- | --- |
| OpenAI API Base URL | `https://n.tokeness.io/v1` |
| OpenAI API Key | A key created in the Tokeness console |
| Model | The full model name copied from the Tokeness model catalog |

If your Open WebUI has been running for a while, some environment variables may have already been persisted to the database. When later changes do not take effect, update them in the admin panel or follow Open WebUI's persistent configuration guide.

## Docker Environment Variable Method

For single-machine testing, start like this:

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OPENAI_API_BASE_URL=https://n.tokeness.io/v1 \
  -e OPENAI_API_KEY=your Tokeness API key \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
```

If you use `docker compose`, you can write:

```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      OPENAI_API_BASE_URL: https://n.tokeness.io/v1
      OPENAI_API_KEY: ${TOKENESS_API_KEY}
    volumes:
      - open-webui:/app/backend/data

volumes:
  open-webui:
```

Put the key in a `.env` file:

```bash
TOKENESS_API_KEY=your Tokeness API key
```

## Admin Panel Method

If Open WebUI is already running, you can configure it in the admin panel:

1. Log in to Open WebUI.
2. Open the Admin Panel.
3. Find the Connections or Models settings.
4. Locate the OpenAI API configuration.
5. Set the Base URL to `https://n.tokeness.io/v1`.
6. Enter your Tokeness API key.
7. Save and refresh the page.

Menu names may differ across versions. As long as the field means OpenAI Base URL and OpenAI API Key, fill in the values above.

## Set the Default Model

If you want new users to see a specific model by default, set:

```bash
DEFAULT_MODELS=YOUR_MODEL_NAME
```

Replace `YOUR_MODEL_NAME` with the full model name from the Tokeness model catalog.

For multiple models, separate with commas:

```bash
DEFAULT_MODELS=model-a,model-b
```

## RAG and Embedding

Open WebUI's knowledge base, RAG, voice, and image features may have separate configuration items. Get standard chat working first, then configure these.

Common embedding fields:

```bash
RAG_OPENAI_API_BASE_URL=https://n.tokeness.io/v1
RAG_OPENAI_API_KEY=your Tokeness API key
```

The embedding model name must be a vector model available in Tokeness. Do not put a chat model in the vector model field.

## Verification

1. Open Open WebUI.
2. Select a model from Tokeness.
3. Send "reply with ok only".
4. Open the Tokeness usage logs and confirm a request arrived.
5. If you configured a knowledge base, upload a small text file and test retrieval.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Environment variable changes do not take effect | Open WebUI may have persisted the config — update it in the admin panel or handle PersistentConfig |
| Model list is empty | Enter the Tokeness model name manually |
| 401 | Check `OPENAI_API_KEY` |
| 404 | Check that `OPENAI_API_BASE_URL` is `https://n.tokeness.io/v1` |
| Chat works but knowledge base does not | Check the embedding model and RAG-related configuration separately |
| Requests fail inside the Docker container | Enter the container and check network, DNS, and proxy settings |

## References

- [Open WebUI OpenAI-Compatible Provider](https://docs.openwebui.com/getting-started/quick-start/connect-a-provider/starting-with-openai-compatible/)
- [Open WebUI Environment Variables](https://docs.openwebui.com/reference/env-configuration/)