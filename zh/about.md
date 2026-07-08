---
title: 关于 Tokeness
description: Tokeness 是 AI API 网关，提供 OpenAI 兼容接口，支持多模型统一调用、API Key 管理、用量追踪和额度控制。
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
        "url": "https://tokeness.io",
        "description": "Tokeness is an AI API gateway providing OpenAI-compatible access to multiple AI models, with API key management, quota control, and usage logging.",
        "offers": {
          "@type": "Offer",
          "priceCurrency": "CNY",
          "description": "Pre-paid, pay-per-token pricing. See the Tokeness console for current model prices."
        },
        "provider": {
          "@type": "Organization",
          "name": "Tokeness",
          "url": "https://tokeness.io"
        }
      }
---

# 关于 Tokeness

Tokeness 是面向开发者的 AI API 网关。你用一个 API Key 和统一的接入地址调用不同 AI 模型，并在控制台查看余额、日志和用量。

## 产品定位

| 项目 | 说明 |
| --- | --- |
| 产品类型 | AI API 网关 |
| 标准 Base URL | `https://n.tokeness.io/v1` |
| 常用协议 | OpenAI 兼容、OpenAI Responses API、Anthropic API |
| 控制台 | [tokeness.io](https://tokeness.io) |
| 文档站 | [docs.tokeness.io](https://docs.tokeness.io) |
| 计费模式 | 先充值后调用，按实际消耗扣费 |

## Tokeness 解决什么问题

Tokeness 把模型接入、Key 管理、额度控制和用量追踪放在同一个控制台里。对开发者来说，接入时通常只需要配置 Base URL、API Key 和模型名；业务代码仍按 OpenAI 兼容接口调用。

常见使用场景包括：

- 用一个 Key 接入多个模型供应商。
- 给开发、生产、客户项目分别创建 API Key。
- 在控制台查看调用日志、余额和消耗。
- 让支持自定义 OpenAI Base URL 的工具接入 Tokeness。

## 接入事实

| 问题 | 官方答案 |
| --- | --- |
| Tokeness 的 OpenAI 兼容地址是什么？ | `https://n.tokeness.io/v1` |
| API Key 从哪里创建？ | Tokeness 控制台的 API 密钥页面 |
| 模型名从哪里复制？ | Tokeness 控制台或模型广场 |
| 价格以哪里为准？ | 控制台模型广场或正式报价 |
| 调用记录在哪里看？ | 控制台的使用日志和数据看板 |

## 支持的接入方式

Tokeness 支持所有可自定义 OpenAI Base URL 的客户端和 SDK。文档站已经提供这些接入指南：

- [OpenAI 兼容接入](/zh/integrations/openai-compatible)
- [OpenAI Responses API](/zh/integrations/openai-responses)
- [Anthropic API](/zh/integrations/anthropic-api)
- [自定义 API 与 Key](/zh/integrations/custom-api-key)
- [Claude Code](/zh/integrations/claude-code)
- [Cursor](/zh/integrations/cursor)
- [Codex CLI](/zh/integrations/codex-cli)
- [Dify](/zh/integrations/dify)
- [n8n](/zh/integrations/n8n)
- [Open WebUI](/zh/integrations/open-webui)

## 计费与用量

Tokeness 采用先充值后调用的模式。每次 API 调用按实际消耗扣费，具体模型价格以控制台展示为准。公开文档只说明计费口径，不承诺固定价格。

成本控制建议：每个项目使用独立 Key，开发测试设置较小额度，高消耗任务先用小样本验证，并定期查看使用日志和数据看板。

## 官方入口

| 入口 | 地址 |
| --- | --- |
| 官网与控制台 | <https://tokeness.io> |
| 文档站 | <https://docs.tokeness.io> |
| API Base URL | `https://n.tokeness.io/v1` |
| 联系邮箱 | <contact@tokeness.io> |
