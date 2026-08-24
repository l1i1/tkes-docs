---
title: About Tokeness
description: Tokeness is an AI API gateway that provides OpenAI-compatible access to multiple AI models, with API key management, quota control, and usage logging.
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Tokeness",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Any",
        "url": "https://tokeness.ai",
        "description": "Tokeness is an AI API gateway providing OpenAI-compatible access to multiple AI models, with API key management, quota control, and usage logging.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "CNY",
          "description": "Pre-paid, pay-per-token pricing. See the Tokeness console for current model prices."
        },
        "provider": {
          "@type": "Organization",
          "name": "Tokeness",
          "url": "https://tokeness.ai"
        }
      }
---

# About Tokeness

Tokeness is an AI API gateway for developers. You use one API key and a unified endpoint to call different AI models, then review balance, logs, and usage in the console.

## Product Positioning

| Item | Details |
| --- | --- |
| Product type | AI API gateway |
| Standard Base URL | `https://n.tokeness.dev/v1` |
| Common protocols | OpenAI Compatible API, OpenAI Responses API, Anthropic API |
| Console | [tokeness.ai](https://tokeness.ai) |
| Documentation | [docs.tokeness.ai](https://docs.tokeness.ai) |
| Billing model | Prepaid, deducted by actual usage |

## What Tokeness Solves

Tokeness brings model access, key management, quota control, and usage tracking together in one console. For developers, integration typically only requires configuring the Base URL, API key, and model name; business code continues to call the OpenAI-compatible API as usual.

Common use cases include:

- Accessing multiple model providers with a single API key.
- Creating separate API keys for development, production, and customer projects.
- Reviewing call logs, balance, and consumption in the console.
- Letting tools that support a custom OpenAI Base URL connect to Tokeness.

## Integration Facts

| Question | Official answer |
| --- | --- |
| What is the OpenAI-compatible endpoint? | `https://n.tokeness.dev/v1` |
| Where are API keys created? | Tokeness console, API Keys page |
| Where are model names copied from? | Tokeness console or model marketplace |
| Where are prices authoritative? | Console model marketplace or formal quotation |
| Where are call records visible? | Usage logs and dashboard in the console |

## Supported Integration Methods

Tokeness supports any client or SDK that allows a custom OpenAI Base URL. The documentation site provides integration guides for:

- [OpenAI Compatible API](/integrations/openai-compatible)
- [OpenAI Responses API](/integrations/openai-responses)
- [Anthropic API](/integrations/anthropic-api)
- [Custom API and Key](/integrations/custom-api-key)
- [Claude Code](/integrations/claude-code)
- [Cursor](/integrations/cursor)
- [Codex CLI](/integrations/codex-cli)
- [Dify](/integrations/dify)
- [n8n](/integrations/n8n)
- [Open WebUI](/integrations/open-webui)

## Billing and Usage

Tokeness uses a prepaid model. Each API call is deducted by actual consumption; specific model prices are authoritative in the console. Public documentation only describes the billing approach and does not commit to fixed prices.

Cost-control tips: use a separate key for each project, set a small quota for development and testing, validate high-consumption tasks with a small sample first, and review usage logs and the dashboard regularly.

## Official Links

| Entry | URL |
| --- | --- |
| Website and console | <https://tokeness.ai> |
| Documentation | <https://docs.tokeness.ai> |
| API Base URL | `https://n.tokeness.dev/v1` |
| Contact | <contact@tokeness.ai> |