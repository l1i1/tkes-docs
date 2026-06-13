---
title: Cline
description: 在 Cline 中使用 OpenAI Compatible Provider 接入 Tokeness 的完整配置步骤。
---

# Cline

Cline 支持 OpenAI Compatible Provider。Tokeness 按 OpenAI 兼容接口接入，配置时填写 Base URL、API Key 和 Model ID。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| API Provider | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model ID | Tokeness 模型广场中的完整模型名 |

如果 Cline 版本中没有 `OpenAI Compatible`，可以选择 `OpenAI`，再填写自定义 Base URL。

## 1. 准备 Tokeness

在 Tokeness 控制台完成：

1. 确认钱包余额可用。
2. 创建 Cline 专用 API Key。
3. 到模型广场复制模型名。
4. 打开使用日志，后面用来确认请求。

Key 名称可以写成：

```txt
cline-local
```

Cline 是编程 Agent，会读取文件、生成代码、重试任务。单独建 Key，后面看消耗和排查问题都更清楚。

## 2. 打开 Cline 设置

在 VS Code 中打开 Cline 面板，进入设置页。常见入口是 Cline 面板右上角的设置按钮。

在 Provider 或 API Provider 下拉框中选择：

```txt
OpenAI Compatible
```

如果界面里只有 OpenAI 选项，检查是否有 Base URL、Custom Base URL 或 API Base 字段。只要能改 Base URL，也可以接入 Tokeness。

## 3. 填写 Tokeness 配置

按下面填写：

```txt
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
Model ID: 从 Tokeness 模型广场复制的模型名
```

注意：

- Base URL 保留 `/v1`。
- Model ID 不要自己简写。
- 如果 Cline 提供 Verify、Test 或 Save 按钮，保存前先验证一次。
- 如果模型列表拉取失败，手动填写 Model ID。

## 4. 验证

在 Cline 中发一个只读任务：

```txt
请读取当前项目结构，但不要修改文件。最后只总结你看到了哪些顶层目录。
```

验证时看三处：

1. Cline 是否能正常回复。
2. Tokeness 使用日志是否出现请求。
3. 日志里的 Key、模型名和状态码是否正确。

第一次测试不要直接让 Cline 大范围改代码。先确认连接、模型和权限都正常，再执行写文件任务。

## 5. 写文件前的设置

Cline 会执行文件读取和修改操作。接入 Tokeness 后，工具权限仍然由 Cline 和 VS Code 控制，Tokeness 只负责模型调用。

写文件前检查：

| 项目 | 处理 |
| --- | --- |
| Key | 使用 Cline 专用 Key |
| 额度 | 给 Key 设置合适额度 |
| 模型 | 选择适合代码任务的模型 |
| 日志 | 开着 Tokeness 使用日志，观察是否重复调用 |
| Git | 开始大改前确认工作区状态 |

## 6. 排查

| 现象 | 处理 |
| --- | --- |
| Verify 失败 | 检查 Base URL、Key、模型名 |
| 401 Unauthorized | 重新复制 API Key，确认没有空格 |
| 404 Not Found | Base URL 应为 `https://n.tokeness.io/v1` |
| model not found | 从 Tokeness 模型广场重新复制 Model ID |
| Cline 有报错但 Tokeness 无日志 | 当前 Provider 没有走 Tokeness |
| 回复正常但工具调用失败 | 换代码能力更强的模型，或缩小任务范围 |
| 消耗偏高 | 降低上下文范围，使用独立 Key 限额 |

## 外部文档

- [Cline OpenAI Compatible Provider](https://docs.cline.bot/provider-config/openai-compatible)
- [Cline OpenAI Provider Custom Base URL](https://docs.cline.bot/provider-config/openai)

