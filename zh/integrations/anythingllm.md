---
title: AnythingLLM
description: 在 AnythingLLM 中使用 Generic OpenAI Provider 接入 Tokeness。
---

# AnythingLLM

AnythingLLM 的 `OpenAI (Generic)` Provider 用于连接 OpenAI 兼容接口。Tokeness 可以按这个方式接入。

## 准备

| 项目 | 填写值 |
| --- | --- |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制完整模型名 |

AnythingLLM 有桌面版、Docker 版和云端部署方式。菜单位置可能不同，但配置项基本一致。

## 配置 LLM Provider

1. 打开 AnythingLLM。
2. 进入 Settings。
3. 找到 LLM Preference 或 Model Provider。
4. 选择 `OpenAI (Generic)` 或 `Generic OpenAI`。
5. Base URL 填 `https://n.tokeness.dev/v1`。
6. API Key 填 Tokeness API Key。
7. Model 填 Tokeness 模型广场里的完整模型名。
8. 保存。

字段对应：

| AnythingLLM 字段 | Tokeness 填写方式 |
| --- | --- |
| LLM Provider | `OpenAI (Generic)` |
| Base URL / API Base | `https://n.tokeness.dev/v1` |
| API Key | Tokeness API Key |
| Model | Tokeness 模型名 |

## 工作区模型

AnythingLLM 支持按工作区设置模型。全局 Provider 保存后，还要检查当前 Workspace 是否使用了刚配置的模型。

建议按下面顺序处理：

1. 先在全局设置里保存 Tokeness Provider。
2. 进入 Workspace 设置。
3. 确认 Workspace 使用 Tokeness Provider。
4. 选择或填写 Tokeness 模型名。
5. 保存后重新打开对话。

如果全局能保存，但工作区仍使用旧模型，请检查 Workspace 级别的覆盖设置。

## 知识库与向量模型

AnythingLLM 的聊天模型和向量模型是两类配置。接入聊天模型后，如果要上传文档并做问答，还要配置 embedding。

处理顺序：

1. 先让普通聊天跑通。
2. 再配置 embedding 模型。
3. 上传一个小文档测试检索。
4. 最后再导入较大的知识库。

不要一开始就导入大量文件。这样排查问题会很慢，也容易把聊天模型问题和向量模型问题混在一起。

## 验证

1. 在 AnythingLLM 新建一个测试 Workspace。
2. 发送“只回复 ok”。
3. 打开 Tokeness 使用日志，确认请求进入。
4. 上传一份小文本文件。
5. 问一个文件中能直接找到答案的问题。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 保存 Provider 后聊天仍走旧模型 | 检查 Workspace 是否覆盖了全局模型 |
| 401 | 检查 API Key |
| 404 | Base URL 应为 `https://n.tokeness.dev/v1` |
| model not found | 从 Tokeness 模型广场复制完整模型名 |
| 聊天可用，文档问答不可用 | 单独配置 embedding 模型 |
| 回复很慢 | 先用短问题测试，再检查模型、上下文长度和文档大小 |

## 参考资料

- [AnythingLLM OpenAI Generic LLM](https://docs.anythingllm.com/setup/llm-configuration/cloud/openai-generic)
- [AnythingLLM Configuration](https://docs.anythingllm.com/configuration)

