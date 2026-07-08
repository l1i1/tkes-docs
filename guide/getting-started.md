---
title: Getting Started
description: "Minimum Tokeness onboarding flow: sign in, top up, create an API key, copy a model name, and make one test call."
---

# Getting Started

This guide walks through the minimum Tokeness setup for an OpenAI-compatible request.

## 1. Sign In

Open <https://tokeness.io> and sign in to the console.

## 2. Top Up

Add a small test balance before the first request. Tokeness is prepaid and deducts cost by actual usage.

## 3. Create an API Key

Create an API key from the console API key page. Use separate keys for development, production, and customer projects.

## 4. Copy a Model Name

Copy the exact model name from the model marketplace or console. Model IDs are case-sensitive and should not be guessed.

## 5. Configure Your Client

```txt
Base URL: https://n.tokeness.io/v1
API Key: your Tokeness API key
Model ID: model name copied from Tokeness
```

## 6. Make a Test Request

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENESS_API_KEY,
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.chat.completions.create({
  model: 'YOUR_MODEL_NAME',
  messages: [{ role: 'user', content: 'Say hello from Tokeness.' }]
})

console.log(response.choices[0]?.message?.content)
```

## Troubleshooting Checklist

- Base URL is exactly `https://n.tokeness.io/v1`.
- API key is complete and enabled.
- Account balance and API key quota are sufficient.
- Model name matches the Tokeness console.
- Client is configured as OpenAI-compatible or custom OpenAI provider.
