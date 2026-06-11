# Dify

Dify 可通过 OpenAI 兼容模型供应商接入 Tokeness，用于工作流、聊天应用和内部 AI 工具。

## 添加模型供应商

1. 进入 Dify 的模型供应商设置。
2. 选择 OpenAI Compatible 或自定义 OpenAI 接口。
3. API Endpoint 填写 `https://n.tokeness.io/v1`。
4. API Key 填写 Tokeness API Key。
5. 添加需要使用的模型名称。

首次接入时，先用一个空白聊天应用测试，再接入工作流。

## 应用级配置

| 场景 | 配置方式 |
| --- | --- |
| 内部应用 | 一个 Dify 工作区使用独立 Key |
| 客户应用 | 每个客户独立 Key，便于核算 |
| 工作流测试 | 使用小额度 Key 先跑通流程 |
| 生产上线 | 到使用日志确认模型、延迟和消耗情况 |

## 注意事项

Dify 中的模型能力配置会影响应用行为，例如上下文长度、函数调用和多模态能力。请以 Tokeness 模型广场和实际测试结果为准。
