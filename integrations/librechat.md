---
title: LibreChat
description: Configure a custom OpenAI-compatible endpoint for Tokeness in LibreChat.
---

# LibreChat

LibreChat supports custom OpenAI-compatible endpoints. The common approach is to define the endpoint in `librechat.yaml` and store the key in `.env`.

## Preparation

| Field | Value |
| --- | --- |
| API URL / Base URL | `https://n.tokeness.dev/v1` |
| API Key | A key created in the Tokeness console |
| Models | Full model names copied from the Tokeness model catalog |

LibreChat is typically used for multi-user chat. In production, do not expose the Tokeness key to the frontend and do not commit it to a repository.

## File Responsibilities

A LibreChat custom endpoint typically involves three files:

| File | Purpose |
| --- | --- |
| `librechat.yaml` | Defines the custom endpoint, model list, and display name |
| `.env` | Stores sensitive information such as API keys |
| `docker-compose.override.yml` | Mounts `librechat.yaml` in Docker deployments |

If you are not using Docker, place `librechat.yaml` wherever your deployment can read it.

## Configure .env

Add the following to `.env`:

```bash
TOKENESS_API_KEY=your Tokeness API key
```

Do not put the real key in `librechat.yaml`.

## Configure librechat.yaml

Below is a minimal configuration. Replace the model names with the full model names from the Tokeness model catalog.

```yaml
version: 1.2.1

endpoints:
  custom:
    - name: "Tokeness"
      apiKey: "${TOKENESS_API_KEY}"
      baseURL: "https://n.tokeness.dev/v1"
      models:
        default:
          - "YOUR_MODEL_NAME"
        fetch: false
      titleConvo: true
      titleModel: "YOUR_MODEL_NAME"
      modelDisplayLabel: "Tokeness"
```

Field descriptions:

| Field | Description |
| --- | --- |
| `name` | The endpoint name displayed in LibreChat |
| `apiKey` | Reads the Tokeness key from `.env` |
| `baseURL` | The Tokeness OpenAI-compatible Base URL |
| `models.default` | Models available in the UI |
| `models.fetch` | When set to `false`, uses the manual model list |
| `titleModel` | The model used to generate conversation titles |

To expose multiple models:

```yaml
models:
  default:
    - "MODEL_A"
    - "MODEL_B"
    - "MODEL_C"
  fetch: false
```

## Docker Mount Configuration

If you use Docker Compose, you can mount the configuration in `docker-compose.override.yml`:

```yaml
services:
  api:
    volumes:
      - ./librechat.yaml:/app/librechat.yaml
```

After making changes, restart:

```bash
docker compose down
docker compose up -d
```

## Let Users Provide Their Own Key

For an internal team deployment where each user should use their own Tokeness key, change `apiKey` to:

```yaml
apiKey: "user_provided"
```

In this mode, users enter their own key in the LibreChat UI. It suits scenarios where multiple people share a LibreChat instance but you do not want the server to hold a shared key.

## Verification

1. Restart LibreChat.
2. Select `Tokeness` in the model endpoint selector.
3. Select a configured model.
4. Send "reply with ok only".
5. Open the Tokeness usage logs and confirm a request arrived.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Tokeness endpoint not visible | Check whether `librechat.yaml` was mounted successfully and restart the container |
| 401 | Check that `TOKENESS_API_KEY` in `.env` is being read by the container |
| 404 | `baseURL` should be `https://n.tokeness.dev/v1` |
| Model dropdown is empty | Set `models.fetch: false` and enter model names manually |
| Conversation title generation fails | Check that `titleModel` is an available model |
| Multiple users' keys get mixed up | Use `user_provided` so each user enters their own key in the UI |

## References

- [LibreChat Custom Endpoints](https://www.librechat.ai/docs/quick_start/custom_endpoints)
- [LibreChat Custom Endpoint Object Structure](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/custom_endpoint)