---
title: API Keys
description: Tokeness API key management, project separation, quota control, and safe key handling.
---

# API Keys

Tokeness API keys authenticate OpenAI-compatible requests and can be separated by project, environment, or customer.

## Recommended Key Layout

| Scenario | Recommendation |
| --- | --- |
| Local development | Use a dedicated development key with a small quota. |
| Production service | Use a separate production key and rotate it through deployment secrets. |
| Customer project | Create one key per customer or workload when usage needs separate tracking. |
| Temporary test | Delete the key after the test completes. |

## Quota Control

Set quota limits on keys that should not consume the full account balance. This is useful for prototypes, customer-specific workloads, and tools shared across a team.

## Safe Handling

- Never commit real API keys to Git.
- Store keys in environment variables or secret managers.
- Rotate a key if it is pasted into chat, logs, or public issue trackers.
- Use different keys for different environments.

## Basic Environment Variable

```bash
export TOKENESS_API_KEY="your-tokeness-api-key"
```

Use the key with the standard Base URL:

```txt
https://n.tokeness.io/v1
```
