---
title: Models and Billing
description: Tokeness prepaid billing model, model price authority, usage logs, and cost control guidance.
---

# Models and Billing

Tokeness uses a prepaid billing model. Requests are deducted by actual usage according to the current model price policy.

## Price Authority

Current model prices are authoritative in the Tokeness console model marketplace or in a formal quotation. Documentation does not publish fixed price numbers because model availability and upstream costs can change.

## Cost Control

- Use separate API keys for different projects.
- Set quota limits for prototypes and shared tools.
- Review usage logs after integration tests.
- Copy model names from the marketplace to avoid routing errors.

## Billing Checklist

| Symptom | Check |
| --- | --- |
| Insufficient balance | Account balance and key quota. |
| Unexpected cost | Usage logs, model name, and request volume. |
| Model not available | Current model marketplace and key group settings. |
| Tool retries too often | Client retry configuration and error logs. |
