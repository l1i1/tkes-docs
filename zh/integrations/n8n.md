---
title: n8n
description: 在 n8n 中通过 HTTP Request 节点调用 Tokeness Chat Completions 或 Responses API。
---

# n8n

n8n 的 OpenAI 节点主要围绕官方 OpenAI 凭据设计。接入 Tokeness 时，HTTP Request 节点更直接，也更容易排查。先用 HTTP Request 跑通，再根据你的 n8n 版本决定是否封装成凭证或子工作流。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Method | `POST` |
| URL | `https://n.tokeness.dev/v1/chat/completions` |
| Authorization | `Bearer 你的 Tokeness API Key` |
| Content-Type | `application/json` |
| Model | Tokeness 模型广场中的完整模型名 |

## 1. 准备 Tokeness

先准备：

1. n8n 专用 API Key。
2. 一个聊天模型名。
3. 可用余额。

Key 名称可以写成：

```txt
n8n-workflow
```

如果 n8n 里有多个工作流，可以按工作流拆 Key。

## 2. 新建 HTTP Request 节点

在 n8n 工作流中添加 HTTP Request 节点。

填写：

```txt
Method: POST
URL: https://n.tokeness.dev/v1/chat/completions
```

Authentication 可以先选 None，然后手动添加 Header。跑通后再改成 Bearer Auth 或 Header Auth 凭证。

## 3. 配置 Headers

添加两个 Header：

```txt
Authorization: Bearer YOUR_TOKENESS_API_KEY
Content-Type: application/json
```

不要把真实 Key 写进会被导出的 workflow JSON。长期使用时，把 Key 放到 n8n Credentials 或环境变量里。

## 4. 配置 Body

Body 类型选择 JSON，填写：

```json
{
  "model": "YOUR_MODEL_NAME",
  "messages": [
    {
      "role": "user",
      "content": "请用一句话总结：{{$json.text}}"
    }
  ]
}
```

把 `YOUR_MODEL_NAME` 换成 Tokeness 模型广场中的模型名。

如果上游节点没有 `text` 字段，先用固定文本测试：

```json
{
  "model": "YOUR_MODEL_NAME",
  "messages": [
    {
      "role": "user",
      "content": "请只返回 ok"
    }
  ]
}
```

## 5. 从响应中取文本

Chat Completions 返回的文本一般在：

```txt
choices[0].message.content
```

可以在后续 Set、Code 或 IF 节点中读取这个字段。

如果你使用 Responses API，请求地址改成：

```txt
https://n.tokeness.dev/v1/responses
```

Body 示例：

```json
{
  "model": "YOUR_MODEL_NAME",
  "input": "请只返回 ok"
}
```

Responses API 的输出结构与 Chat Completions 不同，后续节点要按实际返回字段取值。

## 6. 使用 Credentials

n8n 的 HTTP Request Credentials 支持 Bearer Auth 和 Header Auth。

Bearer Auth 写法：

```txt
Bearer Token: 你的 Tokeness API Key
```

Header Auth 写法：

```txt
Name: Authorization
Value: Bearer 你的 Tokeness API Key
```

凭证建好后，在 HTTP Request 节点里选择对应 Credentials。这样 workflow 导出时不会直接暴露 Key。

## 7. 工作流建议

| 场景 | 处理 |
| --- | --- |
| 批量处理 | 给工作流单独建 Key，并设置额度 |
| 长文本 | 设置合理 timeout，必要时拆分输入 |
| 重试 | 限制重试次数，避免失败循环消耗余额 |
| 日志 | 不输出完整请求头 |
| 并发 | 控制批量节点并发，避免瞬时消耗过高 |

## 8. 排查

| 现象 | 处理 |
| --- | --- |
| 401 Unauthorized | Authorization Header 格式应为 `Bearer KEY` |
| 404 Not Found | URL 应为 `https://n.tokeness.dev/v1/chat/completions` |
| model not found | 从 Tokeness 模型广场重新复制模型名 |
| JSON parse error | Body 类型选择 JSON，检查引号和逗号 |
| 表达式为空 | 先用固定文本测试，再接上游字段 |
| Tokeness 无日志 | 请求没有发到 Tokeness，检查 URL 和节点是否执行 |
| 工作流重复调用 | 检查循环节点、重试设置和错误分支 |

## 外部文档

- [n8n HTTP Request Credentials](https://docs.n8n.io/integrations/builtin/credentials/httprequest/)
- [n8n OpenAI Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-langchain.openai/)
- [n8n OpenAI Credentials](https://docs.n8n.io/integrations/builtin/credentials/openai/)

