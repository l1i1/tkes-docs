---
title: 自定义 API 与 Key
description: 在支持自定义 API、Base URL、Provider 或 OpenAI Compatible 的工具中接入 Tokeness。
---

# 自定义 API 与 Key

很多 AI 工具不一定内置 Tokeness，但只要它支持下列任意一种配置，就可以接入：

- OpenAI Compatible
- OpenAI API
- Custom Provider
- Custom API
- Base URL
- API Endpoint
- API Host

Tokeness 使用 OpenAI 兼容接口。接入时通常只需要填三项：

| 配置项 | 填写内容 |
| --- | --- |
| Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | Tokeness 模型广场中的完整模型名 |

如果工具还要求选择协议或 API 格式，优先选择 `OpenAI Compatible`、`OpenAI Chat Completions` 或 `OpenAI Responses`。不要选择 Anthropic、Gemini、Azure OpenAI，除非对应页面明确说明该工具需要这种协议。

## 接入前准备

先在 Tokeness 控制台完成这些操作：

1. 登录 Tokeness。
2. 进入钱包，确认账户余额可用。
3. 进入 API 密钥页面，创建一个专用 Key。
4. 进入模型广场，复制准备使用的模型名。
5. 打开使用日志页面，后面用来确认请求是否进入 Tokeness。

API Key 可以按工具或项目拆分。例如：

| 使用场景 | Key 名称示例 |
| --- | --- |
| Claude Code | `claude-code-local` |
| Codex CLI | `codex-cli-local` |
| OpenCode | `opencode-local` |
| Cursor | `cursor-workspace-name` |
| 线上服务 | `prod-api-server` |

这样后面看日志、限额和轮换 Key 时更容易定位。

## 在工具中怎么填

不同工具的字段名不完全一样，可以按下面对应关系填写。

| 工具字段 | Tokeness 填写方式 |
| --- | --- |
| API Key / Token / Auth Token | Tokeness API Key |
| Base URL / API Base / API Endpoint / Host | `https://n.tokeness.dev/v1` |
| Provider Name / Name | `Tokeness` |
| Model / Model ID | 从模型广场复制完整模型名 |
| API Type / Format / Protocol | `OpenAI Compatible` 或 `OpenAI` |

如果表单里有“获取模型列表”按钮，可以先试一次。获取失败不代表不能用，手动填写模型名即可。

## 环境变量写法

命令行工具和代码项目通常支持环境变量。OpenAI 兼容场景可以这样写：

```bash
OPENAI_API_KEY=你的 Tokeness API Key
OPENAI_BASE_URL=https://n.tokeness.dev/v1
MODEL_NAME=从模型广场复制的模型名
```

有些项目用通用变量名：

```bash
LLM_API_KEY=你的 Tokeness API Key
LLM_BASE_URL=https://n.tokeness.dev/v1
LLM_MODEL_ID=从模型广场复制的模型名
```

Python 代码中常见写法：

```py
from openai import OpenAI

client = OpenAI(
    api_key="你的 Tokeness API Key",
    base_url="https://n.tokeness.dev/v1",
)

response = client.chat.completions.create(
    model="从模型广场复制的模型名",
    messages=[
        {"role": "user", "content": "用一句话说明当前配置是否可用"}
    ],
)

print(response.choices[0].message.content)
```

Node.js 代码中常见写法：

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: 'https://n.tokeness.dev/v1'
})

const completion = await client.chat.completions.create({
  model: process.env.MODEL_NAME!,
  messages: [
    { role: 'user', content: '用一句话说明当前配置是否可用' }
  ]
})

console.log(completion.choices[0]?.message?.content)
```

## cURL 验证

如果不确定问题出在工具还是 Tokeness，可以先用 cURL 测试。

macOS / Linux：

```bash
export TOKENESS_API_KEY="你的 Tokeness API Key"
export TOKENESS_MODEL="从模型广场复制的模型名"

curl https://n.tokeness.dev/v1/chat/completions \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$TOKENESS_MODEL"'",
    "messages": [
      { "role": "user", "content": "返回 ok" }
    ]
  }'
```

Windows PowerShell：

```powershell
$env:TOKENESS_API_KEY = "你的 Tokeness API Key"
$env:TOKENESS_MODEL = "从模型广场复制的模型名"

Invoke-RestMethod `
  -Uri "https://n.tokeness.dev/v1/chat/completions" `
  -Method Post `
  -Headers @{
    Authorization = "Bearer $env:TOKENESS_API_KEY"
    "Content-Type" = "application/json"
  } `
  -Body (@{
    model = $env:TOKENESS_MODEL
    messages = @(
      @{ role = "user"; content = "返回 ok" }
    )
  } | ConvertTo-Json -Depth 5)
```

如果 cURL 能通，工具里不通，优先检查工具的协议选项、模型名和是否需要重启。

## 协议选择

大多数工具接 Tokeness 时选择 OpenAI 兼容协议。

| 场景 | 选择 |
| --- | --- |
| Chat Completions 示例、普通聊天工具 | OpenAI Compatible / Chat Completions |
| Codex CLI 且配置里有 `wire_api` | `responses` |
| Claude Code 通过 CC Switch 接 OpenAI 兼容接口 | 开启 CC Switch 路由模式 |
| 原生 Anthropic SDK | 按 Anthropic API 页面配置，不使用本页通用写法 |

Claude Code 本身偏 Anthropic 协议。通过 CC Switch 接 OpenAI 兼容接口时，要让 CC Switch 负责协议转换；否则 Claude Code 可能把 Anthropic 格式请求直接发到 OpenAI 兼容接口，导致请求失败。

## Base URL 要不要带 `/v1`

Tokeness 的标准 Base URL 是：

```txt
https://n.tokeness.dev/v1
```

大多数工具都应该填写这个地址。

不确定时先填 `https://n.tokeness.dev/v1`。如果报 404，再看工具实际请求的 URL 是否变成了 `/v1/v1/...`。只有工具文档明确写着会自动拼接 `/v1` 时，才按该工具文档处理。

## 模型名

模型名必须从 Tokeness 模型广场复制，不要自己简写。

常见错误：

| 错误写法 | 问题 |
| --- | --- |
| 只写 `gpt-4` | 可能不是 Tokeness 当前可用模型名 |
| 改大小写 | 模型名可能区分大小写 |
| 删除版本号或供应商前缀 | 后端无法匹配模型 |
| 使用工具默认模型 | 默认模型不一定在当前 Key 的分组里可用 |

首次接入先选一个已确认可用的聊天模型。工具跑通后，再切换到更适合编码、长上下文或推理的模型。

## Key 安全

API Key 只在本机、服务器环境变量或工具的安全配置页中使用。不要写进公开仓库、截图、文档、前端代码或聊天记录。

Key 管理可以按下面方式处理：

- 一个工具或项目使用一个独立 Key。
- 给生产环境单独建 Key。
- 离职、换设备或怀疑泄露时立即禁用旧 Key。
- 线上服务不要把 Key 放在浏览器端代码里。
- 给高频工具设置额度，避免误调用造成异常消耗。

## 验证是否成功

一次完整验证包括三步：

1. 工具里能收到模型回复。
2. Tokeness 使用日志出现对应请求。
3. 日志里的模型名、Key、消耗和状态码符合预期。

如果工具显示成功，但 Tokeness 没有日志，通常说明请求没有发到 Tokeness。检查 Base URL、代理、工具供应商是否真的启用。

## 排查表

| 现象 | 处理 |
| --- | --- |
| 401 Unauthorized | 重新复制 API Key，确认没有多空格、没有被禁用 |
| 403 Forbidden | 检查 Key 分组、额度、模型权限或账户状态 |
| 404 Not Found | 检查 Base URL，通常应为 `https://n.tokeness.dev/v1` |
| model not found | 从模型广场重新复制模型名 |
| 请求无日志 | 工具没有走 Tokeness，检查供应商是否启用 |
| `/v1/v1` 相关错误 | 工具自动拼了 `/v1`，按该工具文档处理 Base URL |
| Claude Code 请求失败 | 通过 CC Switch 开启路由模式，确认 API 格式为 OpenAI 兼容 |
| Codex 切换后仍走旧模型 | 关闭当前终端，重新打开后再运行 |
| 自动获取模型失败 | 手动填写模型名，不影响调用 |
