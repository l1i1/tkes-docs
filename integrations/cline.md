# Cline

Cline 支持自定义 OpenAI 兼容 Provider，可用于接入 Tokeness。

## 配置步骤

1. 打开 Cline 设置。
2. Provider 选择 OpenAI Compatible 或 Custom OpenAI。
3. Base URL 填写 `https://n.tokeness.io/v1`。
4. API Key 填写 Tokeness 控制台创建的 Key。
5. Model ID 填写模型广场中的模型名。
6. 保存后发起一次简单任务测试。

首次接入时，先用一句固定问题验证连接。

## Key 与额度

为 Cline 单独创建一个 API Key，并设置额度上限。编程 Agent 可能连续读取、生成和修复文件，消耗通常高于普通聊天。

## 排查

| 问题 | 检查 |
| --- | --- |
| 无法连接 | Base URL 是否包含 `/v1` |
| 模型不可用 | Model ID 是否与模型广场一致 |
| 中途失败 | 使用日志中是否出现余额、限额或上游错误 |
