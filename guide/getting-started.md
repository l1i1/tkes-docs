---
title: 开始接入
description: Tokeness API 最小接入流程：登录、充值、创建 API Key、复制模型名并完成一次测试请求。
---

# 开始接入

按这一页完成一次最小 API 调用。顺序是：登录、充值、创建 API Key、复制模型名、发起测试请求。

## 开始前

开始前先确认：

| 项目 | 检查内容 |
| --- | --- |
| Tokeness 账户 | 已注册并登录 tokeness.io |
| 余额 | 先充值一小笔测试余额 |
| 模型名 | 从模型广场复制一个可用模型名 |
| 测试方式 | 任选一种：客户端、Node.js、Python 或 cURL |

如果你准备直接用代码测试：

| 语言 | 需要安装什么 |
| --- | --- |
| Node.js | `npm install openai` |
| Python | `pip install openai` |

## 1. 登录 Tokeness

打开 [tokeness.io](https://tokeness.io)，点击右上角“登录”。已登录时会直接进入控制台。

<figure class="tokeness-shot">
  <div class="tokeness-shot-frame">
    <img class="tokeness-shot-light" src="/images/tokeness-dashboard-light-16x9.png" alt="Tokeness 控制台">
    <img class="tokeness-shot-dark" src="/images/tokeness-dashboard-dark-16x9.png" alt="Tokeness 控制台">
  </div>
  <figcaption>登录后控制台</figcaption>
</figure>

首次使用请先注册账号。邮箱用于登录、找回密码和接收通知。

## 2. 充值余额

进入控制台后，打开“钱包”页面充值。Tokeness 采用先充值后调用的模式，API 调用会从余额中扣减。

充值前检查：

| 项目 | 检查内容 |
| --- | --- |
| 充值账户 | 确认已登录需要使用 API 的 Tokeness 账户 |
| 充值金额 | 小额测试通过后再按业务规模充值 |
| 支付弹窗 | 浏览器拦截弹窗时，需要允许 Tokeness 打开支付页面 |

## 3. 创建 API Key

在左侧导航进入“API 密钥”，创建一个新的 Key。

按项目拆分 Key：

| 场景 | 配置方式 |
| --- | --- |
| 开发测试 | 单独 Key，小额度，便于停用 |
| 生产服务 | 单独 Key，设置清晰的额度和模型范围 |
| 客户项目 | 每个客户或项目一个 Key，方便追踪消耗 |

创建后请立即保存 Key。出于安全考虑，文档不会展示真实 Key 页面截图，也不要把 Key 发给不可信人员。

## 4. 复制模型名并配置 Base URL

打开“模型广场”，复制要使用的模型名。模型名需要完整复制，大小写、连字符和版本号都要保留。

接口地址：

常用配置如下：

```txt
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
Model ID: 从模型广场复制的模型名
```

如果某些客户端把字段拆成“Base URL / Endpoint / 服务地址”，都优先填 `https://n.tokeness.io/v1`。

```txt
https://n.tokeness.io/v1
```

## 5. 发起测试调用

下面是 Node.js 的最小示例。先创建 `test-tokeness.mjs`，把 `YOUR_TOKENESS_API_KEY` 和 `YOUR_MODEL_NAME` 换成自己的值。

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: 'YOUR_TOKENESS_API_KEY',
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.chat.completions.create({
  model: 'YOUR_MODEL_NAME',
  messages: [{ role: 'user', content: '用一句话介绍 Tokeness' }]
})

console.log(response.choices[0]?.message?.content)
```

运行：

```bash
npm install openai
node test-tokeness.mjs
```

如果调用失败，优先检查四件事：Key 是否复制完整、账户余额是否充足、模型名是否和模型广场一致、Base URL 是否是 `https://n.tokeness.io/v1`。
