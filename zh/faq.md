---
title: 常见问题
description: Tokeness Base URL、鉴权失败、余额不足、模型名、API Key 和工具接入常见问题。
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
            "name": "Tokeness 是什么？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness 是 AI API 网关。你用一个 API Key 调用不同模型，并在控制台查看余额、日志和用量。"
            }
          },
          {
            "@type": "Question",
            "name": "Base URL 应该填什么？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "OpenAI 兼容接入统一填写 https://n.tokeness.io/v1。不要自己删掉 /v1。"
            }
          },
          {
            "@type": "Question",
            "name": "为什么调用提示鉴权失败？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "常见原因包括 Key 复制不完整、请求头没有使用 Bearer、Key 被停用、环境变量未生效。"
            }
          },
          {
            "@type": "Question",
            "name": "为什么提示余额不足？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness 采用预充值模式。请检查钱包余额，以及当前 API Key 是否设置了额度上限。"
            }
          },
          {
            "@type": "Question",
            "name": "模型名从哪里复制？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "从 Tokeness 控制台或模型广场复制。模型名需要保持大小写、连字符和版本号一致。"
            }
          },
          {
            "@type": "Question",
            "name": "能不能共用一个 Key？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "技术上可以。开发、生产、客户项目、自动化任务使用不同 Key，便于限额和排查。"
            }
          },
          {
            "@type": "Question",
            "name": "支持哪些工具？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "支持自定义 OpenAI 兼容 Base URL 的工具，可以按本文档接入。本文档提供 Cherry Studio、Claude Code、VS Code Claude Code 插件、Cline、Roo Code、Continue、Cursor、Codex CLI、Dify、n8n、Open WebUI、AnythingLLM、LibreChat、LiteLLM、OpenClaw、OpenCode 的配置参考。"
            }
          },
          {
            "@type": "Question",
            "name": "Claude Code 安装后命令不存在怎么办？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "先确认 Node.js 和 npm 已安装，并重启终端。如果是在 Windows 上使用 Claude Code，使用 PowerShell、WSL2 或工具官方推荐的 shell 环境。"
            }
          },
          {
            "@type": "Question",
            "name": "连接 AI 编程工具时报 401 怎么办？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "检查工具配置中的 API Key、Base URL、模型名和协议类型。OpenAI 兼容接入使用 https://n.tokeness.io/v1，请求头使用 Authorization: Bearer <API Key>。"
            }
          },
          {
            "@type": "Question",
            "name": "代码示例里的 YOUR_MODEL_NAME 是什么？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "它不是固定模型名。请到模型广场复制实际模型名后替换。"
            }
          },
          {
            "@type": "Question",
            "name": "Tokeness 支持哪些 AI 模型？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness 支持多种主流模型。可用模型名称以 Tokeness 控制台或模型广场为准。"
            }
          },
          {
            "@type": "Question",
            "name": "Tokeness 和直接调用 OpenAI 有什么区别？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tokeness 是兼容 OpenAI API 格式的网关，允许用同一套代码接入多种模型，并集中管理 API Key、额度和使用日志。"
            }
          },
          {
            "@type": "Question",
            "name": "如何在 Claude Code 中使用 Tokeness？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Claude Code 原生使用 Anthropic 协议。Tokeness 通用接口是 OpenAI 兼容协议，建议通过 CC Switch 添加 Tokeness 供应商并开启路由模式。Base URL 填 https://n.tokeness.io/v1。"
            }
          },
          {
            "@type": "Question",
            "name": "充值支持哪些方式？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "充值方式以控制台钱包页面展示为准。进入控制台后打开钱包，即可查看当前可用的充值渠道、余额和充值记录。"
            }
          }
        ]
      }
---

# 常见问题

## Tokeness 是什么？

Tokeness 是 AI API 网关。你用一个 API Key 调用不同模型，并在控制台查看余额、日志和用量。

## Base URL 应该填什么？

所有接入页统一填写：

```txt
https://n.tokeness.io/v1
```

如果某个客户端把字段拆成 Base URL、Endpoint、Host 或 Service URL，请优先把这个完整地址填到支持完整路径的字段里。不要自己删掉 `/v1`。

## 为什么调用提示鉴权失败？

常见原因包括 Key 复制不完整、请求头没有使用 `Bearer`、Key 被停用、环境变量未生效。

## 为什么提示余额不足？

Tokeness 采用预充值模式。请检查钱包余额，以及当前 API Key 是否设置了额度上限。

## 模型名从哪里复制？

从 Tokeness 控制台或模型广场复制。模型名需要保持大小写、连字符和版本号一致。

第一次接入时，先复制一个可用模型名，再回到教程里替换 `YOUR_MODEL_NAME`。

## 能不能共用一个 Key？

技术上可以。开发、生产、客户项目、自动化任务使用不同 Key，便于限额和排查。

## 支持哪些工具？

支持自定义 OpenAI 兼容 Base URL 的工具，可以按本文档接入。本文档提供 Cherry Studio、Claude Code、VS Code Claude Code 插件、Cline、Roo Code、Continue、Cursor、Codex CLI、Dify、n8n、Open WebUI、AnythingLLM、LibreChat、LiteLLM、OpenClaw、OpenCode 的配置参考。

## Claude Code 安装后命令不存在怎么办？

先确认 Node.js 和 npm 已安装，并重启终端。如果是在 Windows 上使用 Claude Code，使用 PowerShell、WSL2 或工具官方推荐的 shell 环境。

## 连接 AI 编程工具时报 401 怎么办？

检查工具配置中的 API Key、Base URL、模型名和协议类型。OpenAI 兼容接入使用 `https://n.tokeness.io/v1`，请求头使用 `Authorization: Bearer <API Key>`。

## 代码示例里的 `YOUR_MODEL_NAME` 是什么？

它不是固定模型名。请到模型广场复制实际模型名后替换。

## Tokeness 支持哪些 AI 模型？

Tokeness 支持多种主流模型。可用模型名称以 Tokeness 控制台或模型广场为准。使用前先从模型广场复制完整模型名，不要使用其他平台或工具里的默认模型名代替。

## Tokeness 和直接调用 OpenAI 有什么区别？

Tokeness 是兼容 OpenAI API 格式的网关。接入 OpenAI 兼容工具时，通常只需要替换 `base_url` 和 `api_key`，业务代码仍按 OpenAI 兼容格式调用。Tokeness 还提供集中 Key 管理、额度控制、使用日志和多模型接入。

## 如何在 Claude Code 中使用 Tokeness？

Claude Code 原生使用 Anthropic 协议。Tokeness 通用接口是 OpenAI 兼容协议，所以建议通过 CC Switch 添加 Tokeness 供应商，并开启路由模式完成协议转换。详见 [Claude Code 接入指南](/zh/integrations/claude-code)。

## 充值支持哪些方式？

充值方式以控制台“钱包”页面展示为准。进入控制台后打开“钱包”，即可查看当前可用的充值渠道、余额和充值记录。
