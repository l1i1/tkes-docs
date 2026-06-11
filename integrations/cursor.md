# Cursor

Cursor 如果使用自定义 OpenAI 兼容模型入口，可以通过 Tokeness 接入。

## 配置步骤

1. 打开 Cursor 设置。
2. 找到模型或 OpenAI Compatible Provider 配置。
3. Base URL 填写 `https://n.tokeness.io/v1`。
4. API Key 填写 Tokeness API Key。
5. 模型名从 Tokeness 模型广场复制。
6. 保存后先用一个小文件或短问题测试。

## 注意事项

Cursor 的不同版本对自定义模型支持能力不同。如果当前版本只允许使用内置模型，请改用支持自定义 Base URL 的插件、CLI 或网关工具。

如果你是第一次接入，先用最小额度 Key，确认能正常回复后再换正式 Key。

## 成本控制

Cursor 类 IDE 工具可能会发送项目上下文。建议使用独立 Key，并通过额度限制控制风险。
