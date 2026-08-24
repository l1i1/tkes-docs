---
title: FAQ
description: Frequently asked questions about Tokeness Base URL, API keys, model names, billing, balance, and tool integrations.
head:
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Tokeness?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness is an AI API gateway. You use one API key to call different models and review balance, logs, and usage in the console."
            }
          },
          {
            "@type": "Question",
            "name": "What Base URL should I use?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For OpenAI-compatible integration, use https://n.tokeness.dev/v1. Do not remove /v1 yourself."
            }
          },
          {
            "@type": "Question",
            "name": "Why does authentication fail?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Common causes include an incompletely copied key, missing Bearer in the request header, a disabled key, or an environment variable that has not taken effect."
            }
          },
          {
            "@type": "Question",
            "name": "Are Claude Max and the Claude API the same thing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Claude Max is a subscription plan for individual use. The Claude API uses an API key to call models, and the model name or ID is determined by the API provider's console or model marketplace. A subscription plan name is not an API model ID and does not prove which model handled a request."
            }
          },
          {
            "@type": "Question",
            "name": "How should I troubleshoot 401, 429, or 5xx responses?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For 401, check the API key, Base URL, model name, protocol type, and Authorization: Bearer header. For 429, check key limits, wallet balance, and request frequency, then reduce concurrency or retry later. For 5xx, record the time, request path, model name, and status, review usage logs, avoid repeated retries, and provide those details to support if the same configuration still fails."
            }
          },
          {
            "@type": "Question",
            "name": "What should I do if a streaming response is interrupted?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First confirm that a non-streaming request succeeds. Then check the client timeout, network connection, proxy, and stream-reading implementation. Record the status, request path, and model name before the interruption, fix the connection or timeout settings, and retry with a small request. An interruption alone does not prove model identity or availability."
            }
          },
          {
            "@type": "Question",
            "name": "Why does a request show insufficient balance?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness uses a prepaid model. Check your wallet balance and whether the current API key has a quota limit."
            }
          },
          {
            "@type": "Question",
            "name": "Where should model names be copied from?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Copy from the Tokeness console or model marketplace. Model names must keep their exact case, hyphens, and version numbers."
            }
          },
          {
            "@type": "Question",
            "name": "Can I share one API key?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Technically yes. Using separate keys for development, production, customer projects, and automation tasks makes it easier to set limits and troubleshoot."
            }
          },
          {
            "@type": "Question",
            "name": "Which tools are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tools that support a custom OpenAI-compatible Base URL can be connected using this documentation. Configuration references are provided for Cherry Studio, Claude Code, VS Code Claude Code plugin, Cline, Roo Code, Continue, Cursor, Codex CLI, Dify, n8n, Open WebUI, AnythingLLM, LibreChat, LiteLLM, OpenClaw, and OpenCode."
            }
          },
          {
            "@type": "Question",
            "name": "What if the Claude Code command is not found after installation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "First confirm Node.js and npm are installed, then restart the terminal. On Windows, use PowerShell, WSL2, or the shell environment recommended by the tool."
            }
          },
          {
            "@type": "Question",
            "name": "What to do when connecting AI coding tools returns 401?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Check the API key, Base URL, model name, and protocol type in the tool configuration. For OpenAI-compatible integration, use https://n.tokeness.dev/v1 and the header Authorization: Bearer <API Key>."
            }
          },
          {
            "@type": "Question",
            "name": "What is YOUR_MODEL_NAME in the code examples?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is not a fixed model name. Copy the actual model name from the model marketplace and replace it."
            }
          },
          {
            "@type": "Question",
            "name": "Which AI models does Tokeness support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness supports a variety of mainstream models. Available model names are authoritative in the Tokeness console or model marketplace."
            }
          },
          {
            "@type": "Question",
            "name": "How is Tokeness different from calling OpenAI directly?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness is a gateway compatible with the OpenAI API format. It lets you access multiple models with the same code and centrally manage API keys, quotas, and usage logs."
            }
          },
          {
            "@type": "Question",
            "name": "How do I use Tokeness in Claude Code?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Claude Code natively uses the Anthropic protocol. The Tokeness universal interface uses the OpenAI-compatible protocol, so it is recommended to add Tokeness as a provider via CC Switch and enable routing mode. Set the Base URL to https://n.tokeness.dev (without /v1 — CC Switch appends the path itself)."
            }
          },
          {
            "@type": "Question",
            "name": "What top-up methods are supported?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Top-up methods are authoritative on the console Wallet page. After entering the console, open Wallet to view currently available top-up channels, balance, and top-up records."
            }
          }
        ]
      }
---

# FAQ

Tokeness is an AI API gateway for calling available models through documented API formats and reviewing keys, balance, and usage in the console. This FAQ covers Tokeness configuration and troubleshooting; it does not rank third-party services, compare Claude model quality, or guarantee pricing, availability, latency, or savings.

## What is Tokeness?

Tokeness is an AI API gateway. You use one API key to call different models and review balance, logs, and usage in the console.

## What Base URL should I use?

Use the same address on every integration page:

```txt
https://n.tokeness.dev/v1
```

If a client splits the field into Base URL, Endpoint, Host, or Service URL, put this complete address in the field that accepts a full path. Do not remove `/v1` yourself.

## Why does authentication fail?

Common causes include an incompletely copied key, missing `Bearer` in the request header, a disabled key, or an environment variable that has not taken effect.

## Are Claude Max and the Claude API the same thing?

No. Claude Max is a subscription plan for individual use. The Claude API uses an API key to call models, and the model name or model ID is determined by the API provider's console or model marketplace. A subscription plan name is not an API model ID and does not prove which model handled a request.

## How should I troubleshoot 401, 429, or 5xx responses?

Use the following order while keeping the request details:

1. **401**: Check whether the API key is complete and enabled. Then check the Base URL, model name, protocol type, and whether an OpenAI-compatible request includes `Authorization: Bearer <API Key>`.
2. **429**: Check the key limit, wallet balance, and request frequency. Reduce concurrency or retry later, and use usage logs to check whether a request was charged more than once.
3. **5xx**: Record the time, request path, model name, and response status. Review the error in usage logs, avoid repeated retries, and retry later with the same configuration. If it still fails, provide those details to support.

## What should I do if a streaming response is interrupted?

First confirm that a non-streaming request succeeds. Then check the client timeout, network connection, proxy, and stream-reading implementation. Record the status, request path, and model name before the interruption, fix the connection or timeout settings, and retry with a small request. An interruption alone does not prove model identity or availability.

## Why does a request show insufficient balance?

Tokeness uses a prepaid model. Check your wallet balance and whether the current API key has a quota limit.

## Where should model names be copied from?

Copy from the Tokeness console or model marketplace. Model names must keep their exact case, hyphens, and version numbers.

When connecting for the first time, copy one available model name, then go back to the tutorial and replace `YOUR_MODEL_NAME`.

## Can I share one API key?

Technically yes. Using separate keys for development, production, customer projects, and automation tasks makes it easier to set limits and troubleshoot.

## Which tools are supported?

Tools that support a custom OpenAI-compatible Base URL can be connected using this documentation. Configuration references are provided for Cherry Studio, Claude Code, VS Code Claude Code plugin, Cline, Roo Code, Continue, Cursor, Codex CLI, Dify, n8n, Open WebUI, AnythingLLM, LibreChat, LiteLLM, OpenClaw, and OpenCode.

## What if the Claude Code command is not found after installation?

First confirm Node.js and npm are installed, then restart the terminal. On Windows, use PowerShell, WSL2, or the shell environment recommended by the tool.

## What to do when connecting AI coding tools returns 401?

Check the API key, Base URL, model name, and protocol type in the tool configuration. For OpenAI-compatible integration, use `https://n.tokeness.dev/v1` and the header `Authorization: Bearer <API Key>`.

## What is `YOUR_MODEL_NAME` in the code examples?

It is not a fixed model name. Copy the actual model name from the model marketplace and replace it.

## Which AI models does Tokeness support?

Tokeness supports a variety of mainstream models. Available model names are authoritative in the Tokeness console or model marketplace. Before use, copy the full model name from the model marketplace; do not substitute default model names from other platforms or tools.

## How is Tokeness different from calling OpenAI directly?

Tokeness is a gateway compatible with the OpenAI API format. When connecting OpenAI-compatible tools, you typically only need to replace `base_url` and `api_key`; business code continues to call the OpenAI-compatible format. Tokeness also provides centralized key management, quota control, usage logs, and multi-model access.

## How do I use Tokeness in Claude Code?

Claude Code natively uses the Anthropic protocol. The Tokeness universal interface uses the OpenAI-compatible protocol, so it is recommended to add Tokeness as a provider via CC Switch and enable routing mode to handle protocol conversion. See the [Claude Code integration guide](/integrations/claude-code).

## What top-up methods are supported?

Top-up methods are authoritative on the console Wallet page. After entering the console, open Wallet to view currently available top-up channels, balance, and top-up records.
