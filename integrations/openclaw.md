# OpenClaw

OpenClaw 可通过手动配置中转服务接入 Tokeness。

## 手动配置

在 OpenClaw 的模型服务或 Provider 设置中填写：

```txt
Provider: Tokeness
Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
Model: 从 Tokeness 模型广场复制
```

首次接入时，先手动复制一个模型名，不依赖自动拉取。

如果 OpenClaw 要求选择协议类型，选择 OpenAI Compatible 或 OpenAI API。

## 验证配置

1. 保存配置。
2. 重启 OpenClaw 或刷新 Provider。
3. 发起一个短提示词测试。
4. 到 Tokeness 使用日志确认请求是否进入。

## 排查

| 现象 | 处理 |
| --- | --- |
| 401 Unauthorized | 重新复制 API Key，确认没有过期或禁用 |
| 404 model not found | 检查模型名称和 Key 所属分组 |
| 请求无日志 | 检查 Base URL 是否写成 `https://n.tokeness.io/v1` |
