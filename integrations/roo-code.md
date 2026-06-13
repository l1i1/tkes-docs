---
title: Roo Code
description: 在 Roo Code 中选择 OpenAI Compatible Provider 接入 Tokeness。
---

# Roo Code

Roo Code 是 VS Code 里的代码助手。它支持 `OpenAI Compatible` Provider，可以填写自定义 Base URL、API Key 和 Model ID。

## 准备

先在 Tokeness 控制台准备：

| 项目 | 填写值 |
| --- | --- |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model ID | 从 Tokeness 模型广场复制完整模型名 |

Roo Code 对工具调用依赖较强。用于编码任务时，优先选 Tokeness 中确认支持 OpenAI 工具调用的模型。

## 新增 Provider

在 VS Code 中按下面配置：

1. 打开 Roo Code。
2. 进入设置。
3. 找到 API Provider。
4. 选择 `OpenAI Compatible`。
5. 在 Base URL 中填 `https://n.tokeness.io/v1`。
6. 在 API Key 中填 Tokeness API Key。
7. 在 Model 中填写从 Tokeness 模型广场复制的模型名。
8. 保存配置。

字段对应关系：

| Roo Code 字段 | Tokeness 填写方式 |
| --- | --- |
| API Provider | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness API Key |
| Model / Model ID | Tokeness 模型名 |

## 模型配置

如果 Roo Code 要求填写模型上下文或输出长度，可以先用保守值：

| 配置项 | 说明 |
| --- | --- |
| Context Window | 按 Tokeness 模型广场显示的上下文填写；不确定时先使用较小值 |
| Max Output Tokens | 首次测试可以填 2048 或 4096 |
| Image Support | 只有模型明确支持图片输入时再开启 |
| Computer Use | 只有当前模型和环境都支持时再开启 |

不要一次打开所有高级能力。先让聊天和简单文件修改跑通，再逐步打开更复杂的能力。

## 验证

按下面顺序测试：

1. 新建一个临时文件。
2. 让 Roo Code 解释一小段代码。
3. 再让它修改这个临时文件。
4. 在每一步后检查 Tokeness 使用日志。

如果 Tokeness 日志里没有请求，说明 Roo Code 当前没有走 Tokeness Provider。回到设置页检查 Provider 是否保存成功。

## 工具调用说明

Roo Code 使用 OpenAI 原生工具调用格式。模型如果不支持工具调用，可能能回答普通问题，但无法稳定完成读文件、改文件、执行命令等任务。

遇到工具调用问题时，先做两个判断：

1. 同一个模型用普通 Chat Completions 是否能返回内容。
2. 该模型是否支持 OpenAI 兼容的 tool calls。

如果第一项成功、第二项失败，就换支持工具调用的模型，不要继续改 Base URL 或 Key。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| Invalid API Key | 重新复制 Key，确认没有换行、空格或中文引号 |
| Model Not Found | 从 Tokeness 模型广场重新复制完整模型名 |
| Connection Error | 检查 Base URL 是否为 `https://n.tokeness.io/v1` |
| 普通聊天能用，文件操作失败 | 换支持工具调用的模型 |
| 输出中断 | 降低任务规模，或调高 Max Output Tokens |

## 参考资料

- [Roo Code OpenAI Compatible Provider](https://docs.roocode.com/providers/openai-compatible)

