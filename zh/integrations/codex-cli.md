---
title: Codex CLI
description: 通过 CC Switch 或手动配置为 Codex CLI 接入 Tokeness Responses API。
---

# Codex CLI

Codex CLI 可以使用自定义模型供应商。Tokeness 按 OpenAI Responses 协议接入，Base URL 统一填写：

```txt
https://n.tokeness.io/v1
```

如果你使用 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started)，它会帮你写入 Codex 的 `auth.json` 和 `config.toml`。如果需要手动核对配置，本页也给出文件示例。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider Name | `Tokeness` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制 |
| Wire API | `responses` |

## 1. 准备 Tokeness

先准备三项：

1. Tokeness API Key。
2. Tokeness 模型名。
3. 可用余额。

给 Codex 单独建一个 Key：

```txt
codex-cli-local
```

后续如果发现 Codex 消耗异常，可以只停用这个 Key，不影响其他工具。

## 2. 安装 Codex CLI

确认 Node.js 可用：

```bash
node --version
npm --version
```

安装：

```bash
npm install -g @openai/codex
```

如果 npm 下载较慢：

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

确认命令可用：

```bash
codex --version
```

## 3. 通过 CC Switch 配置

1. 打开 CC Switch。
2. 左侧切换到 `Codex`。
3. 点击右上角 `+`。
4. 如果没有 Tokeness 预设，选择自定义供应商。
5. 名称填写 `Tokeness`。
6. API Key 填写 Tokeness API Key。
7. Base URL 填写 `https://n.tokeness.io/v1`。
8. 模型填写 Tokeness 模型广场中的完整模型名。
9. API 类型或 Wire API 选择 `responses`。
10. 保存并启用。

切换后关闭当前终端，重新打开一个终端再运行 Codex。Codex CLI 通常在启动时读取配置，旧终端里可能还保留旧环境。

## 4. 手动配置参考

如果你想核对 CC Switch 写入的结果，可以查看 Codex 配置目录。

macOS / Linux：

```bash
ls ~/.codex
```

Windows PowerShell：

```powershell
Get-ChildItem $env:USERPROFILE\.codex
```

`auth.json` 示例：

```json
{
  "OPENAI_API_KEY": "你的 Tokeness API Key"
}
```

`config.toml` 示例：

```toml
model_provider = "tokeness"
model = "从 Tokeness 模型广场复制的模型名"
disable_response_storage = true

[model_providers.tokeness]
name = "Tokeness"
base_url = "https://n.tokeness.io/v1"
wire_api = "responses"
requires_openai_auth = true
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `model_provider` | 当前启用的供应商 |
| `model` | Codex 默认使用的模型 |
| `base_url` | Tokeness 接口地址 |
| `wire_api` | Codex 使用 Responses 协议 |
| `requires_openai_auth` | 使用 OpenAI 风格 Bearer Key 鉴权 |

如果你用 CC Switch 管理 Codex，不要长期手动改这两个文件。下次在 CC Switch 切换供应商时，手动改动可能会被覆盖。

## 5. 验证

重新打开终端：

```bash
codex
```

输入：

```txt
请只回复一句话，说明当前 Codex 已经接入 Tokeness。
```

然后到 Tokeness 使用日志确认：

- 是否出现一条新请求。
- Key 是否是 Codex 专用 Key。
- 模型名是否正确。
- 状态码是否成功。

## 6. 多模型配置

可以在 CC Switch 中创建多个 Codex 供应商，或在配置中切换 `model`。

| 配置名称 | 用途 |
| --- | --- |
| `Tokeness Codex Coding` | 日常代码修改 |
| `Tokeness Codex Reasoning` | 复杂分析、方案设计 |
| `Tokeness Codex Docs` | 文档整理、批量改写 |

切换后重新打开终端。

## 7. 排查

| 现象 | 处理 |
| --- | --- |
| `codex` 命令不存在 | 重新安装，或重启终端 |
| 仍然使用旧模型 | 关闭终端重新打开；检查 `model_provider` |
| 401 Unauthorized | 检查 `auth.json` 中的 Key |
| 404 Not Found | 检查 `base_url` 是否为 `https://n.tokeness.io/v1` |
| Responses 相关报错 | 检查 `wire_api = "responses"` |
| model not found | 从 Tokeness 模型广场重新复制模型名 |
| Tokeness 无日志 | 当前 Codex 没有走 Tokeness 配置，检查供应商是否启用 |
