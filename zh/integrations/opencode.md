---
title: OpenCode
description: 通过 CC Switch 或 OpenAI Compatible 配置为 OpenCode 接入 Tokeness。
---

# OpenCode

OpenCode 支持多模型和自定义供应商。接入 Tokeness 时选择 OpenAI Compatible，并填写 Tokeness 的 Base URL、API Key 和模型名。

通过 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) 管理 OpenCode 配置时，Claude Code、Codex、OpenCode 可以在同一个工具里切换供应商。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider | `OpenAI Compatible` 或自定义 |
| Name | `Tokeness` |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制 |

## 1. 准备 Tokeness

在 Tokeness 控制台完成：

1. 确认钱包余额可用。
2. 创建 OpenCode 专用 API Key。
3. 在模型广场复制模型名。
4. 打开使用日志，后面验证请求。

Key 名称可以写成：

```txt
opencode-local
```

## 2. 安装 OpenCode

按 OpenCode 官方方式安装。常见安装命令：

```bash
curl -fsSL https://opencode.ai/install | bash
```

安装完成后确认命令可用：

```bash
opencode --version
```

如果系统提示找不到命令，关闭终端重新打开，或检查安装脚本提示的 PATH 配置。

## 3. 通过 CC Switch 配置

1. 打开 CC Switch。
2. 左侧切换到 `OpenCode`。
3. 点击右上角 `+`。
4. 预设选择 `OpenAI Compatible`。如果没有该预设，选择自定义。
5. 名称填写 `Tokeness`。
6. API Key 填写 Tokeness API Key。
7. Base URL 填写 `https://n.tokeness.dev/v1`。
8. 模型填写 Tokeness 模型广场中的完整模型名。
9. 保存并启用。

如果界面支持测试连接，保存后点一次测试。测试失败时，优先检查 Key、Base URL 和模型名。

## 4. 手动填写时的对应关系

如果不用 CC Switch，在 OpenCode 自己的 Provider 设置里按下面关系填写：

| OpenCode 字段 | Tokeness 填写内容 |
| --- | --- |
| Provider Type | OpenAI Compatible |
| API Key | Tokeness API Key |
| Base URL / Endpoint | `https://n.tokeness.dev/v1` |
| Model | Tokeness 模型名 |

不要选 Anthropic Provider。Tokeness 通用接口按 OpenAI 兼容格式接入。

## 5. 启动并验证

关闭当前终端，重新打开后运行：

```bash
opencode
```

输入：

```txt
请只回复一句话，说明 OpenCode 已经接入 Tokeness。
```

然后到 Tokeness 使用日志确认请求记录。

## 6. 模型切换

OpenCode 适合同时配置多个模型。可以按用途拆分：

| 配置 | 用途 |
| --- | --- |
| 编码模型 | 写代码、改 bug、生成测试 |
| 推理模型 | 复杂问题分析、架构设计 |
| 低成本模型 | 文档整理、批量重命名、简单问答 |

切换模型后，如果 OpenCode 没有立即生效，退出 OpenCode 后重新进入。

## 7. 排查

| 现象 | 处理 |
| --- | --- |
| OpenCode 找不到供应商 | 确认 CC Switch 已保存并启用 Tokeness |
| 401 Unauthorized | 重新复制 API Key |
| 404 Not Found | Base URL 填 `https://n.tokeness.dev/v1` |
| model not found | 从模型广场重新复制模型名 |
| 自动拉模型列表失败 | 手动填写模型名 |
| Tokeness 无日志 | OpenCode 没有走 Tokeness 供应商，检查当前启用配置 |
| 切换后仍是旧模型 | 退出 OpenCode，重新打开终端 |
