---
title: Models and Billing
description: Tokeness model pricing, billing basis, channel examples, usage logs, and cost control guidance.
---

# Models and Billing

Tokeness uses a prepaid billing model. Each API call is deducted based on actual consumption. Model prices are authoritative in the console, the model marketplace, or a formal quotation.

<figure class="tokeness-shot">
  <div class="tokeness-shot-frame">
    <img class="tokeness-shot-light" src="/images/tokeness-models-light-16x9.png" alt="Tokeness model marketplace">
    <img class="tokeness-shot-dark" src="/images/tokeness-models-dark-16x9.png" alt="Tokeness model marketplace">
  </div>
  <figcaption>Model marketplace</figcaption>
</figure>

## Billing Basis

| Item | Description |
| --- | --- |
| Payment method | Prepaid — top up before calling |
| Deduction method | API call consumption is deducted from the account balance in real time |
| Balance validity | Balance remains valid long-term; specifics are subject to platform policy |
| Price unit | Input and output prices are shown per 1M tokens |
| Exchange rate assumption | Current channel price tables are converted at `1 USD = 7 CNY` |

## Channel Examples

The channel price table includes the following common categories:

| Type | Description |
| --- | --- |
| Official-relay channel | Shown at official API list price or with zero markup |
| Discount channel | Some models such as Claude and GPT have different discount channels |
| Domestic models | Domestic models are shown at the Tokeness channel price based on the official list price |
| Partner | After reaching a monthly volume threshold, discounts can be stacked on top of non-official-relay prices |

::: warning Price changes
Model supplier prices, exchange rates, and channel policies may all change. Public documentation only describes the billing method and does not commit to fixed prices.
:::

## Viewing Consumption

After making calls, you can view the following in the console:

| Page | Purpose |
| --- | --- |
| Overview | View account and call summary |
| Data dashboard | Analyze model call and consumption trends |
| Usage logs | Inspect individual request status, model, and cost |
| Wallet | View balance and top up |

## Cost Control

1. Use a separate API key for each project.
2. Set a smaller quota for development and test environments.
3. Run high-consumption workflows with a small sample first.
4. Review usage logs and the data dashboard regularly.
5. Split keys by client for channel or client projects.