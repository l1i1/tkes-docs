---
title: API 密钥
description: Tokeness API Key 创建、命名、额度、轮换和环境变量配置说明。
---

# API 密钥

API Key 是 Tokeness 的调用凭证。每个 Key 需要有明确用途，避免多个项目共用同一个 Key。

<figure class="tokeness-shot">
  <div class="tokeness-shot-frame">
    <img class="tokeness-shot-light" src="/images/tokeness-api-keys-light-16x9.png" alt="Tokeness API 密钥页">
    <img class="tokeness-shot-dark" src="/images/tokeness-api-keys-dark-16x9.png" alt="Tokeness API 密钥页">
  </div>
  <figcaption>API 密钥页</figcaption>
</figure>

## 创建 Key

1. 登录 [tokeness.io](https://tokeness.io)。
2. 打开控制台左侧“API 密钥”。
3. 点击创建或添加密钥。
4. 填写名称、额度、分组或模型范围。
5. 创建后立即保存密钥。

还没接入正式业务时，可以先创建两个 Key：

| 场景 | 配置方式 |
| --- | --- |
| 测试 | 小额度，方便试错 |
| 正式 | 独立 Key，避免和测试混用 |

::: warning 安全提醒
API Key 属于敏感凭证。不要把 Key 写入前端代码、公开仓库、截图、工单图片或群聊消息。
:::

## 列表字段

API 密钥页会展示每个 Key 的主要管理信息：

| 字段 | 说明 |
| --- | --- |
| 名称 | Key 的用途名称，例如开发、生产或某个客户 |
| 状态 | Key 是否启用 |
| API 密钥 | 掩码后的 Key，可用于确认是否选对凭证 |
| 额度 | 当前 Key 的额度限制 |
| 分组 | Key 所属模型或计费分组 |
| 模型 | 当前 Key 可用模型范围 |
| IP 限制 | 是否限制调用来源 IP |
| 创建时间 | Key 创建时间 |
| 最后使用时间 | 最近一次调用时间 |
| 过期 | Key 的过期策略 |

## 命名规则

| 场景 | Key 名称示例 |
| --- | --- |
| 本地开发 | `dev-local` |
| 生产服务 | `prod-api-gateway` |
| 客户项目 | `client-acme-prod` |
| 自动化任务 | `n8n-workflows` |

## 额度策略

开发和测试 Key 设置较小额度。生产 Key 按业务体量设置上限。每个项目、工具或客户项目使用独立 Key，便于隔离权限范围、额度限制和用量排查。额度限制作用于对应 Key；具体可配置项以 API 密钥页面实际展示为准。

## 轮换 Key

当 Key 泄露、成员离职、项目交接或环境迁移时，应创建新 Key 并替换旧配置。确认新 Key 生效后，再停用旧 Key。

## 环境变量

服务端项目使用环境变量保存：

```bash
TOKENESS_API_KEY=sk-...
TOKENESS_BASE_URL=https://n.tokeness.io/v1
```

不要把 `.env` 文件提交到 Git 仓库。
