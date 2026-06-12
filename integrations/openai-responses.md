# OpenAI Responses API

Responses API 使用 `POST /v1/responses`。如果你的代码已经基于 OpenAI SDK 的 `responses.create`，把 Base URL 和 API Key 换成 Tokeness 配置。

## 基础配置

```txt
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
Model: 从 Tokeness 模型广场复制的模型名
```

## Node.js

安装 SDK：

```bash
npm install openai
```

创建 `test-tokeness-responses.mjs`：

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'YOUR_TOKENESS_API_KEY',
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.responses.create({
  model: 'YOUR_MODEL_NAME',
  input: '用一句话介绍 Tokeness'
})

console.log(response.output_text)
```

运行：

```bash
node test-tokeness-responses.mjs
```

## Python

安装 SDK：

```bash
pip install openai
```

创建 `test_tokeness_responses.py`：

```py
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_TOKENESS_API_KEY",
    base_url="https://n.tokeness.io/v1",
)

response = client.responses.create(
    model="YOUR_MODEL_NAME",
    input="用一句话介绍 Tokeness",
)

print(response.output_text)
```

## cURL

```bash
curl https://n.tokeness.io/v1/responses \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_NAME",
    "input": "用一句话介绍 Tokeness"
  }'
```

## 消息数组写法

需要区分角色时，把 `input` 写成数组：

```json
{
  "model": "YOUR_MODEL_NAME",
  "input": [
    {
      "role": "developer",
      "content": "回答保持简短。"
    },
    {
      "role": "user",
      "content": "Tokeness 的 Base URL 是什么？"
    }
  ]
}
```

## 排查

| 现象 | 检查 |
| --- | --- |
| 404 | 请求路径是否是 `/v1/responses` |
| 401 | Tokeness API Key 是否完整，是否使用 `Authorization: Bearer` |
| 模型不支持 | 换用模型广场中支持 Responses 或 OpenAI 兼容调用的模型 |
| 没有输出 | 先打印完整 `response`，确认返回结构和错误字段 |
