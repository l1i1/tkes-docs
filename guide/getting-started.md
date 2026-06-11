# 快速上手

本页只做一件事：帮你跑通 Tokeness 的第一条 API 调用。你只需要按顺序完成注册、充值、创建 API Key、配置客户端或代码。

## 开始前

如果你还没准备好本机环境，先确认下面三件事：

| 项目 | 你需要做什么 |
| --- | --- |
| Tokeness 账户 | 注册并登录 tokeness.cn |
| 余额 | 先充值一小笔测试余额 |
| 客户端 | 准备一个要接入的工具，或者先用 Node.js / Python 代码测试 |

如果你准备直接用代码测试：

| 语言 | 需要安装什么 |
| --- | --- |
| Node.js | `npm install openai` |
| Python | `pip install openai` |

## 1. 注册并登录

打开 [tokeness.cn](https://tokeness.cn)，点击右上角“登录”。真实登录页路径为 `https://tokeness.cn/sign-in`。

<div class="tokeness-shot-grid">
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-login-light-16x9.png" alt="Tokeness 登录页浅色模式">
    <figcaption>登录页浅色模式</figcaption>
  </figure>
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-login-dark-16x9.png" alt="Tokeness 登录页深色模式">
    <figcaption>登录页深色模式</figcaption>
  </figure>
</div>

登录页支持账号密码和 Passkey。首次使用请点击“注册”，使用常用邮箱创建账户，便于后续找回密码和接收支持信息。

## 2. 充值余额

进入控制台后，打开“钱包”页面完成充值。Tokeness 当前采用先付费模式：账户内有余额后，API 调用会按实际消耗实时扣减。

充值前建议确认：

| 项目 | 建议 |
| --- | --- |
| 充值账户 | 确认已登录需要使用 API 的 Tokeness 账户 |
| 充值金额 | 小额测试通过后再按业务规模充值 |
| 支付弹窗 | 浏览器拦截弹窗时，需要允许 Tokeness 打开支付页面 |

## 3. 创建 API Key

在左侧导航进入“API 密钥”，创建一个新的 Key。

建议按项目拆分 Key：

| 场景 | 建议配置 |
| --- | --- |
| 开发测试 | 单独 Key，小额度，便于快速停用 |
| 生产服务 | 单独 Key，设置清晰的额度和模型范围 |
| 客户项目 | 每个客户或项目一个 Key，方便追踪消耗 |

创建后请立即保存 Key。出于安全考虑，文档不会展示真实 Key 页面截图，也不要把 Key 发给不可信人员。

## 4. 配置 Base URL

Tokeness 基于 New API 架构，所有接入页统一使用这个地址：

常用配置如下：

```txt
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
```

如果某些客户端把字段拆成“Base URL / Endpoint / 服务地址”，都优先填 `https://n.tokeness.io/v1`。

```txt
https://n.tokeness.io/v1
```

## 5. 发起测试调用

使用 OpenAI SDK 时，将 `baseURL` 指向 Tokeness：

```ts
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.TOKENESS_API_KEY,
  baseURL: 'https://n.tokeness.io/v1'
})

const response = await client.chat.completions.create({
  model: process.env.TOKENESS_MODEL || '你的模型名',
  messages: [{ role: 'user', content: '用一句话介绍 Tokeness' }]
})

console.log(response.choices[0]?.message?.content)
```

如果调用失败，优先检查四件事：Key 是否复制完整、账户余额是否充足、模型名是否和模型广场一致、Base URL 是否还是 `https://n.tokeness.io/v1`。
