# VS Code + Claude Code

如果你在 VS Code 中使用 Claude Code 插件或类似 AI 编程插件，需要确认插件支持自定义 API Base URL。

## 配置入口

1. 安装 VS Code。
2. 安装 Claude Code 或对应 AI 编程插件。
3. 打开插件设置。
4. 找到 API Key、Base URL、Model 或 Provider 相关配置。
5. 填入 Tokeness 的 Key 和兼容地址。

如果插件还要求登录某个厂商账号，先确认它支持自定义 Base URL，再决定是否继续接入。

## 字段配置

```txt
API Key: 你的 Tokeness API Key
Base URL: https://n.tokeness.io/v1
Model: 从 Tokeness 模型广场复制
```

## Key 与额度

AI 编程插件可能连续读取上下文、修改文件和重试任务。为 VS Code 插件创建独立 Key，并设置额度上限。

## 排查

| 问题 | 检查 |
| --- | --- |
| 插件无法启动 | Node.js、插件版本、终端环境是否满足要求 |
| 认证失败 | Key 是否正确，是否多复制了空格 |
| 模型报错 | 模型名是否与 Tokeness 模型广场一致 |
| 消耗异常 | 到 Tokeness 使用日志按 Key 查看调用记录 |
