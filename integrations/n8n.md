# n8n

n8n 可通过 HTTP Request 节点或 OpenAI 兼容凭证接入 Tokeness，用于自动化工作流。

## HTTP Request 节点

请求地址：

```txt
POST https://n.tokeness.io/v1/chat/completions
```

Headers：

```txt
Authorization: Bearer YOUR_TOKENESS_API_KEY
Content-Type: application/json
```

Body：

```json
{
  "model": "YOUR_MODEL_NAME",
  "messages": [
    {
      "role": "user",
      "content": "Summarize this workflow result."
    }
  ]
}
```

## 凭证管理

不要把 Tokeness API Key 写死在节点正文里。建议使用 n8n Credentials 或环境变量统一管理。

如果你是第一次接入，先用一个最短的 HTTP Request 节点确认能返回结果，再逐步加上重试和后续步骤。

## 工作流建议

| 项目 | 建议 |
| --- | --- |
| 重试 | 对网络波动设置有限重试 |
| 超时 | 为长文本任务设置合理超时 |
| 日志 | 不要在日志中输出完整 API Key |
| 成本 | 高并发工作流使用独立 Key 和额度限制 |
