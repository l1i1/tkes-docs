---
title: Cursor
description: 在 Cursor 中通过 OpenAI API Key 和 Override OpenAI Base URL 接入 Tokeness。
---

# Cursor

Cursor 的自定义模型入口在不同版本中会有差异。能看到 OpenAI API Key、Override OpenAI Base URL、Add Custom Model 这类设置时，可以按 OpenAI 兼容方式接入 Tokeness。

如果当前版本没有这些入口，或者第三方模型在 Agent 工具调用中表现不稳定，改用 Cline、Claude Code、Codex CLI 或 OpenCode。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| OpenAI API Key | Tokeness 控制台创建的 Key |
| Override OpenAI Base URL | `https://n.tokeness.dev/v1` |
| Custom Model Name | Tokeness 模型广场中的完整模型名 |

Cursor 这里字段名可能仍然写着 OpenAI。开启 Base URL 覆盖后，请求会发往你填写的地址。

## 1. 准备 Tokeness

先准备：

1. Cursor 专用 API Key。
2. 一个适合代码任务的模型名。
3. 可用余额。

Key 名称可以写成：

```txt
cursor-local
```

## 2. 打开 Cursor 模型设置

在 Cursor 中进入：

```txt
Settings -> Models
```

找到 API Keys、OpenAI API Key 或类似区域。

## 3. 填写 API Key 和 Base URL

1. 开启 OpenAI API Key。
2. 粘贴 Tokeness API Key。
3. 开启 `Override OpenAI Base URL`。
4. Base URL 填写 `https://n.tokeness.dev/v1`。
5. 保存或确认。

如果 Cursor 弹出确认窗口，确认它会把 OpenAI 请求发到自定义 Base URL 后再继续。

## 4. 添加自定义模型

在 Models 页面找到 Add Custom Model。

填写从 Tokeness 模型广场复制的模型名。添加后，关闭不需要的默认模型，避免测试时选错。

首次测试时使用短提示：

```txt
请只回复一句话，说明当前 Cursor 已经接入 Tokeness。
```

然后到 Tokeness 使用日志确认请求。

## 5. 使用范围

Cursor 的自定义 Base URL 通常适合：

| 场景 | 说明 |
| --- | --- |
| 普通聊天 | 先从短问题验证 |
| 单文件问答 | 控制上下文范围 |
| 小范围代码解释 | 观察模型是否能稳定回复 |

对于大范围 Agent 编辑、复杂工具调用和多文件修改，不同第三方模型的兼容性可能不同。先用小任务验证，再扩大范围。

## 6. 排查

| 现象 | 处理 |
| --- | --- |
| 找不到 Override OpenAI Base URL | 当前 Cursor 版本可能不支持该入口 |
| 401 Unauthorized | 重新复制 Tokeness API Key |
| 404 Not Found | Base URL 填 `https://n.tokeness.dev/v1` |
| model not found | 自定义模型名从模型广场重新复制 |
| Tokeness 无日志 | 当前模型没有走自定义 OpenAI 配置 |
| 聊天可用但 Agent 报错 | 该模型与 Cursor 工具调用不完全兼容，换模型或换工具 |
| 仍然走默认模型 | 关闭默认模型或在聊天侧边栏手动选择自定义模型 |

## 外部文档

- [OpenRouter Cursor Integration](https://openrouter.ai/docs/cookbook/coding-agents/cursor-integration)
- [SambaNova Cursor Integration](https://docs.sambanova.ai/docs/en/integrations/cursor)
- [LiteLLM Cursor Integration](https://docs.litellm.ai/docs/tutorials/cursor_integration)

