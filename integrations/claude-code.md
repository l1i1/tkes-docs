# Claude Code

Claude Code 可以通过 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) 配置 Tokeness。CC Switch 用于管理 Claude Code、Codex、OpenCode 等工具的供应商配置，并支持在系统托盘切换。

## 1. 准备环境

先确认三件事：

| 项目 | 要求 |
| --- | --- |
| Node.js | 18 LTS 或更高版本 |
| Claude Code | 本机已经能安装并运行 |
| Tokeness | 已登录、已充值、已创建 API Key |

```bash
node --version
npm --version
```

安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
```

如果下载较慢，可临时使用镜像源：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

## 2. 安装 CC Switch

按 CC Switch 官方安装页完成安装：<https://ccswitch.io/zh/docs?section=getting-started>

安装完成后启动 CC Switch，确认系统托盘里能看到图标。

## 3. 添加 Tokeness 供应商

1. 在 CC Switch 左侧选择 Claude Code。
2. 点击右上角 `+` 添加供应商。
3. 如果预设里没有 Tokeness，选择“自定义”。
4. 名称填写 `Tokeness`。
5. API Key 填写 Tokeness 控制台创建的 Key。
6. Base URL 填写 `https://n.tokeness.io/v1`。
7. 模型填写 Tokeness 模型广场中的模型名。

Tokeness 是 OpenAI 兼容接口。若 Claude Code 供应商表单提供 API 格式选项，选择 OpenAI Chat Completions 或 OpenAI Responses，并按 CC Switch 提示开启代理或应用接管。

## 4. 切换并生效

添加完成后，点击 Tokeness 供应商卡片上的“启用”。如果 Claude Code 没有读取新配置，关掉 Claude Code 再重新打开一次。

如果 Claude Code 首次启动时出现官方初始化引导，可以在 CC Switch 的“设置 → 通用”中开启“跳过 Claude Code 初次安装确认”，然后重新启动 Claude Code。

## 5. 验证

```bash
claude
```

启动后输入：

```txt
你好，请简单介绍一下自己
```

如果能正常回复，再到 Tokeness “使用日志”中确认请求记录。
