# Codex CLI

推荐通过 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) 管理 Codex CLI 的 Tokeness 配置。CC Switch 会处理 Codex 的 `auth.json` 和 `config.toml`，比手动维护配置更稳。

## 1. 安装 Codex

Codex 需要 Node.js 环境。先确认本机能正常使用 `node` 和 `npm`，再安装：

```bash
node --version
npm --version
npm install -g @openai/codex
```

如果下载较慢：

```bash
npm install -g @openai/codex --registry=https://registry.npmmirror.com
```

如果你已经能运行 `codex`，可以直接跳到下一步。

## 2. 添加 Tokeness 供应商

1. 打开 CC Switch。
2. 左侧切换到 Codex。
3. 点击右上角 `+`。
4. 如果预设中没有 Tokeness，选择“自定义”。
5. 名称填写 `Tokeness`。
6. API Key 填写 Tokeness API Key。
7. Base URL 填写 `https://n.tokeness.io/v1`。
8. 模型填写 Tokeness 模型广场中的模型名。
9. 保存并启用。

## 3. 自定义配置参考

CC Switch 的 Codex 自定义供应商会写入两个配置文件。平时建议直接在 CC Switch 界面里维护，下面的内容只用于理解它背后改了什么：

`~/.codex/auth.json`

```json
{
  "OPENAI_API_KEY": "你的 Tokeness API Key"
}
```

`~/.codex/config.toml`

```toml
model_provider = "tokeness"
model = "从 Tokeness 模型广场复制的模型名"
disable_response_storage = true

[model_providers.tokeness]
name = "Tokeness"
base_url = "https://n.tokeness.io/v1"
wire_api = "responses"
requires_openai_auth = true
```

优先在 CC Switch 界面中维护这些配置，避免手动编辑后被切换操作覆盖。

## 4. 切换并重启终端

根据 CC Switch 文档，Codex 切换供应商后需要关闭并重新打开终端。

## 5. 验证

```bash
codex
```

启动后输入：

```txt
你好，请简单介绍一下自己
```

如果能正常回复，再到 Tokeness “使用日志”中确认请求记录。
