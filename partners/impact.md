---
title: Impact Program
description: Tokeness offers 10 million to 5 billion tokens per month of AI API support for open-source projects, public-interest projects, and social enterprises.
---

# Impact Program

Tokeness runs an impact program for open-source projects, public-interest projects, and social enterprises. Selected projects receive `10 million – 5 billion` tokens of AI API support per month for development, operations, knowledge services, content production, automated processing, and public service scenarios.

Impact quota is calculated using `MiMo-V2.5` as the baseline model. Projects may use other models; actual consumption is converted according to the Tokeness platform model price, model permissions, and equivalent quota rules.

## Eligible Projects

| Type | Description |
| --- | --- |
| Open-source projects | Open-source projects in developer tools, infrastructure, educational resources, accessibility technology, public data, AI safety, and similar areas |
| Public-interest projects | Public-interest organizations or initiatives in education, healthcare, environmental protection, disaster response, mental health, rural services, vulnerable group support, and similar fields |
| Social enterprises | Enterprises that solve social problems through commercial means, such as inclusive education, employment for people with disabilities, sustainable consumption, community services, and public-interest technology |

## Quota Tiers

Impact quota is issued monthly. It cannot be cashed out, refunded, or resold. Unused quota does not roll over by default.

| Tier | Monthly baseline quota | Suitable for |
| --- | ---: | --- |
| Starter | 10 million tokens | Early-stage projects with a website homepage, public repository, or project release page |
| Builder | 50 million tokens | Projects with real users, a community, or beneficiaries |
| Growth | 100 million tokens | Projects with stable use cases and quantifiable impact goals |
| Impact | 500 million tokens | Projects serving a large scale with mature operational mechanisms |
| Strategic | 5 billion tokens | High-impact infrastructure, key public-interest platforms, or joint projects |

The `Strategic` tier requires a separate review. Quota must be released in batches — weekly, per key, or per project — and is subject to weekly or monthly review. If a review is not passed, Tokeness may lower the tier, suspend further releases, or adjust the model scope.

## Pre-application Requirements

Before applying, the project must add a Tokeness support statement in a designated public location. Projects that have not added the statement, have placed it in an incorrect location, or cannot be publicly accessed will not enter the quota review process.

The placement location depends on the project's public presence:

| Location | Example |
| --- | --- |
| Public repository | `README.md` in a GitHub, Gitee, CNB, or similar repository |
| Project website | Must be displayed on the homepage; placing it in the homepage footer is recommended |
| No website and no public repository | Bottom of the project release page, end of project updates, end of a blog post, or end of a public account article |

If the project has both a website and a public repository, the homepage footer or the repository `README.md` takes priority. Sponsor pages, partner pages, documentation pages, secondary pages, or temporary announcements cannot replace the homepage footer or repository `README.md`.

Recommended wording for a repository `README.md`:

```md
<p>
  The AI API support for this project is sponsored by
  <a href="https://tokeness.ai">
    Tokeness.ai
  </a>
</p>
```

Wording for a website footer or release page bottom:

```html
The AI API support for this project is sponsored by
<a href="https://tokeness.ai" target="_blank" rel="noopener">
  <img src="https://docs.tokeness.ai/logo.svg" alt="Tokeness" height="24">
  Tokeness.ai
</a>
```

Tokeness will check whether the link is still publicly accessible during both the application review and renewal review. Failure to display the logo, failure to link to `https://tokeness.ai`, or placing the link in an incorrect location will all be treated as not meeting the pre-application requirements.

## Available Capabilities

Selected projects will receive one or more impact-specific API keys. Tokeness will configure the quota, model scope, group, and necessary restriction policies based on the project's use case.

| Capability | Description |
| --- | --- |
| OpenAI-compatible endpoint | Use `https://n.tokeness.dev/v1` to connect most tools that support a custom base URL |
| Multi-model access | `DeepSeek-V4-Flash` is the default quota baseline; other models may be used according to the rules |
| Key and quota control | Split keys by project, environment, or task, and set quota limits |
| Usage logs | Verify requests, models, status, and consumption in the console |
| Data dashboard | Observe model call trends and monthly consumption |

## Typical Scenarios

| Project type | Recommended scenarios |
| --- | --- |
| Open-source projects | Issue classification, PR review assistance, documentation generation, test case generation, multilingual translation, contributor Q&A |
| Public-interest projects | Volunteer training, policy Q&A, beneficiary consultation, material organization, accessibility content rewriting |
| Social enterprises | User support, knowledge base Q&A, educational practice, operations automation, report generation |

High-cost models, image generation, long context, high-concurrency batch processing, and similar scenarios may require a separate explanation of the use case and may be subject to finer model scope and quota limits.

## Application Process

1. Add a Tokeness support statement in the repository `README.md`, the website homepage footer, or — if there is no website and no public repository — at the bottom of the project release page, the end of project updates, the end of a blog post, or the end of a public account article.
2. Prepare a project introduction, public links, use cases, estimated monthly token demand, and impact goals.
3. Send the application materials to <contact@tokeness.ai>. The email subject should be `Impact Program Application - Project Name`.
4. Tokeness reviews the project's authenticity, public acknowledgment link, quota needs, and compliance risks.
5. After approval, the project registers or confirms a Tokeness account.
6. Tokeness issues the impact-specific key and configures the quota, model scope, and usage limits.
7. The project submits a brief monthly usage report. Tokeness decides on renewal, tier upgrade, tier downgrade, or discontinuation based on usage.

## Review Criteria

| Dimension | Weight |
| --- | ---: |
| Public value and social impact | 30% |
| Project authenticity and operational sustainability | 25% |
| Clarity of AI use cases | 20% |
| Reasonableness of quota needs | 15% |
| Openness, transparency, or reusable value | 10% |

Tokeness prioritizes projects that already have real users, beneficiaries, communities, repository records, or public service cases.

## Usage Rules

Impact quota may only be used for the open-source, public-interest, or social value scenarios described in the application.

Prohibited behaviors include:

- Selling, subleasing, or gifting impact quota or API keys.
- Using impact keys for commercial distribution, proxy forwarding, or unrelated projects.
- Illegal activities, infringement, fraud, attacks, risk-control circumvention, or spam content production.
- Malicious consumption, abnormal high concurrency, uncontrolled retries, or calls that clearly deviate from the stated use case.
- Embedding API keys in frontend code, public repositories, screenshots, group chats, or other insecure locations.

In the event of abnormal requests, major risks, upstream policy changes, prolonged lack of feedback, or an invalid public acknowledgment link, Tokeness may suspend, rate-limit, adjust the model scope, stop further quota, or revoke impact eligibility.

## Renewal and Feedback

Impact support is reviewed monthly by default. Projects must maintain the public acknowledgment link and submit monthly feedback:

| Item | Description |
| --- | --- |
| Usage | Main use cases this month, call volume, and model types |
| Impact results | People served, tasks processed, time saved, community contributions, or other measurable outcomes |
| Next month's plan | Estimated quota, model needs, and new use cases |

Projects with sufficient feedback, clear impact, and compliant usage may apply for a tier upgrade. Projects with prolonged inactivity, no feedback, or unclear purpose may have their tier lowered or support discontinued.

## Contact

Application and cooperation inquiries: <contact@tokeness.ai>

Service portal: [tokeness.ai](https://tokeness.ai)