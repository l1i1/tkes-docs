---
title: VS Code + Claude Code
description: 在 VS Code 中使用 Claude Code、Cline 或支持自定义 Base URL 的插件接入 Tokeness。
---

# VS Code + Claude Code

VS Code 里常见的 AI 编程接入方式有三种：

| 方式 | 适用页面 |
| --- | --- |
| 在 VS Code 终端里运行 Claude Code | 参考 Claude Code 页面 |
| 使用 Cline 插件 | 参考 Cline 页面 |
| 使用其他支持自定义 Base URL 的插件 | 按本页通用字段配置 |

Tokeness 的通用接入方式是 OpenAI 兼容接口：

```txt
https://n.tokeness.dev/v1
```

## 1. 在 VS Code 终端里运行 Claude Code

如果你只是把 VS Code 当终端使用，配置方式和普通 Claude Code 一样：

1. 安装 Claude Code。
2. 安装 CC Switch。
3. 在 CC Switch 中为 Claude Code 添加 Tokeness 供应商。
4. 开启路由模式。
5. 在 VS Code 终端里运行 `claude`。

这类场景不要在 VS Code 插件设置里重复填 Key。Claude Code 会读取自己的配置。

详见：[Claude Code](/zh/integrations/claude-code)

## 2. 使用 Cline 插件

Cline 是 VS Code 插件，支持 OpenAI Compatible Provider。

字段填写：

```txt
Provider: OpenAI Compatible
Base URL: https://n.tokeness.dev/v1
API Key: 你的 Tokeness API Key
Model ID: 从 Tokeness 模型广场复制
```

详见：[Cline](/zh/integrations/cline)

## 3. 使用其他 VS Code AI 插件

只要插件提供这些字段，就可以尝试接入 Tokeness：

| 插件字段 | Tokeness 填写内容 |
| --- | --- |
| API Provider | OpenAI Compatible / OpenAI |
| API Key | Tokeness API Key |
| Base URL / API Base / Endpoint | `https://n.tokeness.dev/v1` |
| Model / Model ID | Tokeness 模型广场中的完整模型名 |

如果插件只支持某一家厂商登录，不支持自定义 Base URL，则不能直接接入 Tokeness。

## 4. Claude Code LLM Gateway 说明

Claude Code 官方支持通过 `ANTHROPIC_BASE_URL` 接入 LLM Gateway，但这个方式要求网关暴露 Anthropic Messages 格式。

Tokeness 文档中的 Claude Code 接入默认走 CC Switch 路由模式，因为它能把 Claude Code 请求转到 OpenAI 兼容供应商。只有在你明确使用 Anthropic Messages 兼容接口时，才按 Anthropic API 页面处理。

相关页面：

- [Claude Code](/zh/integrations/claude-code)
- [Anthropic API](/zh/integrations/anthropic-api)

## 5. Key 与额度

VS Code 插件通常会读取项目上下文，消耗比普通聊天更高。

处理方式：

- 给 VS Code 插件单独创建 Key。
- 给 Key 设置额度。
- 首次使用先跑只读任务。
- 大范围修改前确认 Git 工作区状态。
- 使用日志中按 Key 查看调用记录。

## 6. 验证

在插件或 Claude Code 中输入：

```txt
请只回复一句话，说明当前 VS Code 接入已经可用。
```

然后检查 Tokeness 使用日志：

1. 有新请求。
2. Key 是 VS Code 或插件专用 Key。
3. 模型名正确。
4. 状态码成功。

## 7. 排查

| 现象 | 处理 |
| --- | --- |
| 插件不显示 Base URL | 该插件可能不支持自定义 API |
| 认证失败 | 检查 Key、空格、是否启用 |
| 404 Not Found | Base URL 填 `https://n.tokeness.dev/v1` |
| model not found | 从模型广场重新复制模型名 |
| Claude Code 无日志 | 检查 CC Switch 是否启用 Tokeness 和路由模式 |
| 插件能聊天但不能改代码 | 换代码能力更强的模型，或改用 Cline/Claude Code |
| 消耗异常 | 限制上下文范围，检查是否有循环任务 |

## 外部文档

- [Claude Code LLM Gateway](https://docs.anthropic.com/en/docs/claude-code/llm-gateway)
- [Claude Code Settings](https://docs.anthropic.com/zh-CN/docs/claude-code/settings)
- [Cline OpenAI Compatible Provider](https://docs.cline.bot/provider-config/openai-compatible)

