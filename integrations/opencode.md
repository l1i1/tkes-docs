# OpenCode

OpenCode 可以通过 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) 配置 Tokeness。CC Switch 支持 OpenCode，并提供 OpenAI Compatible 预设。

## 1. 准备 Tokeness

先在 Tokeness 控制台完成：

1. 充值余额。
2. 创建 OpenCode 专用 API Key。
3. 在模型广场复制要使用的模型名。

接口地址：

```txt
https://n.tokeness.io/v1
```

如果你还没确认 OpenCode 本体能正常运行，先把 OpenCode 装好，再回来填 Tokeness 配置。

## 2. 在 CC Switch 添加供应商

1. 打开 CC Switch。
2. 左侧切换到 OpenCode。
3. 点击右上角 `+`。
4. 预设选择 OpenAI Compatible；如果没有该预设，选择“自定义”。
5. 名称填写 `Tokeness`。
6. API Key 填写 Tokeness API Key。
7. Base URL 填写 `https://n.tokeness.io/v1`。
8. 模型填写 Tokeness 模型广场中的模型名。
9. 保存。

CC Switch 支持从 OpenAI 兼容的 `/v1/models` 端点获取模型列表。若自动获取失败，手动填写模型名。

## 3. 切换并重启终端

在供应商卡片上点击“启用”。如果切换后没有立即生效，关闭当前终端并重新打开一次。

## 4. 验证

```bash
opencode
```

启动后输入：

```txt
你好，请简单介绍一下自己
```

如果能正常回复，说明 OpenCode 已通过 CC Switch 使用 Tokeness。调用记录可在 Tokeness “使用日志”中查看。
