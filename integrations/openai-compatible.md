# OpenAI 兼容接入

Tokeness 提供 OpenAI 兼容接口。大多数支持自定义 OpenAI Base URL 的 SDK、Chat 客户端和自动化工具都可以接入。

## 基础配置

```txt
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
```

## 先安装 SDK

如果你用代码调用，先安装对应 SDK：

```bash
npm install openai
```

```bash
pip install openai
```

## Node.js

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENESS_API_KEY,
  baseURL: 'https://n.tokeness.io/v1'
})

const completion = await client.chat.completions.create({
  model: process.env.TOKENESS_MODEL || '你的模型名',
  messages: [
    { role: 'system', content: 'You are a concise assistant.' },
    { role: 'user', content: 'Say hello from Tokeness.' }
  ]
})

console.log(completion.choices[0]?.message?.content)
```

## Python

```py
from openai import OpenAI

client = OpenAI(
    api_key="YOUR_TOKENESS_API_KEY",
    base_url="https://n.tokeness.io/v1",
)

response = client.chat.completions.create(
    model="YOUR_MODEL_NAME",
    messages=[
        {"role": "user", "content": "Say hello from Tokeness."}
    ],
)

print(response.choices[0].message.content)
```

## cURL

```bash
curl https://n.tokeness.io/v1/chat/completions \
  -H "Authorization: Bearer $TOKENESS_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "YOUR_MODEL_NAME",
    "messages": [
      { "role": "user", "content": "Say hello from Tokeness." }
    ]
  }'
```

## 模型名称

模型名称以控制台“模型广场”或后台返回为准。复制模型名时保留大小写、连字符和版本号。

如果你刚开始接入，先复制一个最常用的模型名，再回到教程里替换 `YOUR_MODEL_NAME`。

<div class="tokeness-shot-grid">
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-openai-light-16x9.png" alt="Tokeness OpenAI 兼容接入浅色模式">
    <figcaption>OpenAI 兼容接入浅色模式</figcaption>
  </figure>
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-openai-dark-16x9.png" alt="Tokeness OpenAI 兼容接入深色模式">
    <figcaption>OpenAI 兼容接入深色模式</figcaption>
  </figure>
</div>

## 常见错误

| 现象 | 可能原因 |
| --- | --- |
| 401 或鉴权失败 | Key 错误、Key 被禁用、请求头缺少 `Bearer` |
| 余额不足 | 钱包余额不足或 Key 额度耗尽 |
| 模型不存在 | 模型名拼写错误，或当前分组不支持该模型 |
| 请求格式错误 | 使用了非 OpenAI 兼容格式，或 Base URL 少了 `/v1` |
