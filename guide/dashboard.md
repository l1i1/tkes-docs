---
title: Dashboard Overview
description: Tokeness console pages for overview, usage logs, balance, and troubleshooting.
---

# Dashboard Overview

The Tokeness console centralizes API key management, model access, balance, and usage records.

## Common Pages

| Page | Purpose |
| --- | --- |
| Overview | Quick view of account status and recent usage. |
| API Keys | Create, disable, rotate, and limit keys. |
| Model Marketplace | View available models and copy exact model names. |
| Usage Logs | Check request records, errors, and consumption. |
| Wallet or Billing | Review balance and top-up records. |

## When Debugging Requests

1. Confirm the request reached Tokeness in usage logs.
2. Check the API key used by the client.
3. Confirm balance and key quota.
4. Copy the model name again from the console.
5. Verify the client Base URL is `https://n.tokeness.io/v1`.

## Screenshots

<figure class="tokeness-shot">
  <span class="tokeness-shot-frame">
    <img class="tokeness-shot-light" src="/images/tokeness-dashboard-light-16x9.png" alt="Tokeness dashboard overview" />
    <img class="tokeness-shot-dark" src="/images/tokeness-dashboard-dark-16x9.png" alt="Tokeness dashboard overview" />
  </span>
  <figcaption>Use the dashboard and logs together when checking balance, quota, and request status.</figcaption>
</figure>
