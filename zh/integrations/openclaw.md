---
title: OpenClaw
description: 在 OpenClaw 中添加 Tokeness 模型提供商，配置 OpenAI Compatible、Base URL、API Key 和模型名。
---

# OpenClaw

OpenClaw 支持添加模型提供商。接入 Tokeness 时，按 OpenAI Compatible 供应商配置即可。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider Name | `Tokeness` |
| API Type | `OpenAI Compatible` 或 `OpenAI` |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制 |

## 1. 准备 Tokeness

先在 Tokeness 控制台完成：

1. 确认余额可用。
2. 创建 OpenClaw 专用 API Key。
3. 复制要使用的模型名。
4. 打开使用日志页面。

Key 名称可以写成：

```txt
openclaw-local
```

## 2. 打开 OpenClaw 模型设置

进入 OpenClaw 管理页面，找到模型、Config、Models、Provider 或 Model Provider 相关设置。不同版本的入口名称可能不同，但需要添加的是“模型提供商”。

如果 OpenClaw 提供初始化向导，也可以在向导中选择自定义模型供应商。

## 3. 添加 Tokeness Provider

新建一个 Provider：

```txt
Name: Tokeness
API Type: OpenAI Compatible
Base URL: https://n.tokeness.dev/v1
API Key: 你的 Tokeness API Key
Model: 从 Tokeness 模型广场复制的模型名
```

如果 OpenClaw 区分 Chat Model、Reasoning Model、Small Model，可以先全部填写同一个已验证可用的模型。确认跑通后，再按任务类型拆分。

如果 OpenClaw 支持从 `/v1/models` 获取模型列表，可以尝试自动拉取。失败时手动填写模型名。

## 4. 保存并启用

保存 Provider 后，确认当前 Agent 或默认模型已经切到 Tokeness。

需要检查两处：

1. Provider 已保存。
2. 当前 Agent 实际使用的模型配置已选择 Tokeness。

有些工具保存 Provider 后不会自动切换默认模型，需要再到 Agent 配置里选一次。

## 5. 验证

在 OpenClaw 中发起一个短任务：

```txt
请只回复一句话，说明当前 OpenClaw 已经接入 Tokeness。
```

然后打开 Tokeness 使用日志：

- 有新请求，说明请求已进入 Tokeness。
- 模型名正确，说明配置生效。
- 状态码成功，说明 Key、余额和模型权限正常。

## 6. 多模型配置

OpenClaw 常见场景可以拆成多套模型：

| 配置 | 用途 |
| --- | --- |
| Main Model | 主要对话、任务规划 |
| Coding Model | 代码修改、项目分析 |
| Fast Model | 简单回复、标题、摘要 |
| Reasoning Model | 复杂推理、长任务 |

每个模型都可以使用同一个 Tokeness Base URL，只需要模型名不同。

## 7. Key 与额度

OpenClaw 常用于长任务和自动化操作，适合单独设置 Key 和额度。

Key 管理可以按下面方式处理：

- 给 OpenClaw 单独建 Key。
- 第一次接入先设置较小额度。
- 跑长任务前确认模型价格。
- 定期看使用日志，确认是否有异常重试。
- 不要把 OpenClaw 配置目录上传到公开仓库。

## 8. 排查

| 现象 | 处理 |
| --- | --- |
| 401 Unauthorized | API Key 错误、禁用或复制时带了空格 |
| 403 Forbidden | Key 分组、额度、模型权限或账户状态异常 |
| 404 Not Found | Base URL 应填写 `https://n.tokeness.dev/v1` |
| model not found | 从模型广场重新复制模型名 |
| 保存后仍走旧模型 | Provider 保存后，还要在 Agent 默认模型里切换 |
| Tokeness 无日志 | OpenClaw 当前 Agent 没有使用 Tokeness Provider |
| 自动拉模型失败 | 手动填写模型名 |
| 长任务中断 | 检查模型上下文、工具调用、余额和超时设置 |
