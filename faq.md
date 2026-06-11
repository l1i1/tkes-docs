# 常见问题

## Tokeness 是什么？

Tokeness 是一站式 AI API 接口服务。一个 Key 可以按配置调用多个模型供应商，统一管理路由、额度、消费和日志。

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

如果你刚开始接入，先复制一个最常用的模型名，再回到教程里替换示例中的 `YOUR_MODEL_NAME`。

## 能不能共用一个 Key？

技术上可以，但不建议。开发、生产、客户项目、自动化任务最好拆成不同 Key，方便限额和排查。

## 支持哪些工具？

只要工具支持 OpenAI 兼容 Base URL，通常都可以接入。本文档提供 Cherry Studio、Claude Code、VS Code Claude Code 插件、Cline、Dify、n8n、OpenClaw、OpenCode、Cursor、Codex CLI 的配置参考。

## Claude Code 安装后命令不存在怎么办？

先确认 Node.js 和 npm 已安装，并重启终端。如果是在 Windows 上使用 Claude Code，优先使用 PowerShell、WSL2 或工具官方推荐的 shell 环境。

## 连接 AI 编程工具时报 401 怎么办？

检查工具配置中的 API Key、Base URL、模型名和协议类型。OpenAI 兼容接入通常使用 `https://n.tokeness.io/v1`，并在请求头中使用 `Authorization: Bearer <API Key>`。

## 渠道分销如何结算？

当前渠道材料显示采用先付费模式，合作伙伴预先充值至平台账户，客户产生的 API 调用消耗实时从账户余额中扣除。具体政策以商务确认为准。
