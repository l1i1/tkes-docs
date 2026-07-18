---
title: Claude Code
description: 通过 CC Switch 为 Claude Code 配置 Tokeness API Key、Base URL、模型名和路由模式。
---

# Claude Code

Claude Code 原生使用 Anthropic 协议。Tokeness 的通用接口是 OpenAI 兼容协议，所以用 Claude Code 接入 Tokeness 时，通过 [CC Switch](https://ccswitch.io/zh/docs?section=getting-started) 管理供应商，并开启路由模式。

支持的配置边界是：在 CC Switch 中添加 Tokeness 自定义供应商，选择 `OpenAI Compatible`/`OpenAI`，填写 `https://n.tokeness.io/v1`、Tokeness API Key 和模型广场中的模型名称，再由 CC Switch 完成协议转换。Claude Code 的 Anthropic 原生请求不会在未转换时直接变成 OpenAI 兼容请求；转换后也不要假设所有 Anthropic 功能、工具调用或模型身份都能被保留或证明。

这一页按“新机器从零接入”的流程写。如果你已经装好 Claude Code 和 CC Switch，可以直接从“添加 Tokeness 供应商”开始。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider Name | `Tokeness` |
| API Format | `OpenAI Compatible` |
| Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制 |

Claude Code 直接走 OpenAI 兼容接口时，必须确认 CC Switch 已经接管并完成协议转换。没有路由转换时，Claude Code 可能把 Anthropic Messages 请求发到 OpenAI 兼容接口，导致 400、404 或工具调用异常。

## 1. 准备 Tokeness

先在 Tokeness 控制台完成：

1. 进入钱包，确认余额可用。
2. 进入 API 密钥页面，创建一个 Claude Code 专用 Key。
3. 进入模型广场，复制一个适合编码任务的模型名。
4. 打开使用日志页面，后面验证请求是否进入 Tokeness。

Key 名称可以写成：

```txt
claude-code-local
```

不要把 Key 写进项目仓库，也不要截图完整 Key。

## 2. 安装 Claude Code

确认本机有 Node.js：

```bash
node --version
npm --version
```

安装 Claude Code：

```bash
npm install -g @anthropic-ai/claude-code
```

如果 npm 下载较慢：

```bash
npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com
```

确认命令可用：

```bash
claude --version
```

如果系统提示找不到 `claude`，关闭当前终端并重新打开，再执行一次。

## 3. 安装 CC Switch

打开 CC Switch 文档并安装：

<https://ccswitch.io/zh/docs?section=getting-started>

安装完成后启动 CC Switch。Windows 和 macOS 通常会在系统托盘或菜单栏看到图标。

如果 CC Switch 提示找不到 Claude Code，先确认 `claude --version` 在普通终端里可用。

## 4. 添加 Tokeness 供应商

1. 打开 CC Switch。
2. 左侧选择 `Claude Code`。
3. 点击右上角 `+` 添加供应商。
4. 如果预设里没有 Tokeness，选择自定义供应商。
5. 名称填写 `Tokeness`。
6. API 格式选择 `OpenAI Compatible` 或 `OpenAI`。
7. API Key 填写 Tokeness API Key。
8. Base URL 填写 `https://n.tokeness.io/v1`。
9. 模型填写 Tokeness 模型广场里的完整模型名。
10. 保存。

如果界面提供“获取模型列表”，可以试一次。拉取失败时，手动填写模型名即可。

## 5. 开启路由模式

Claude Code 需要重点检查这一项。

在 CC Switch 的 Claude Code 设置里，找到路由、代理或本地转发相关开关，并开启。不同版本的 CC Switch 文案可能略有差异，含义是让 Claude Code 请求先进入 CC Switch，再由 CC Switch 转发到自定义供应商。

开启后，CC Switch 会把 Claude Code 的请求转换成目标供应商能接收的格式。Tokeness 这里选择 OpenAI 兼容格式。

如果没有开启路由模式，常见表现是：

| 现象 | 原因 |
| --- | --- |
| Claude Code 启动正常但请求失败 | 请求格式没有转换 |
| Tokeness 没有使用日志 | 请求没有发到 Tokeness |
| 返回 404 | 请求路径不是 OpenAI 兼容路径 |
| 工具调用失败 | Anthropic 与 OpenAI 工具调用格式没有转换 |

## 6. 启用并重启 Claude Code

在 CC Switch 中启用 Tokeness 供应商。然后关闭当前 Claude Code 进程，重新打开终端。

运行：

```bash
claude
```

如果是第一次运行 Claude Code，可能会出现官方初始化引导。按 CC Switch 文档完成初始化；如果 CC Switch 提供“跳过首次确认”选项，也可以开启后再重启。

## 7. 验证

在 Claude Code 里输入：

```txt
你好。请只回复一句话，说明你已经可以工作。
```

成功后检查 Tokeness：

1. 打开使用日志。
2. 找到刚才的请求。
3. 确认 Key、模型名、状态码和消耗正常。

如果 Claude Code 有回复，但日志里没有记录，说明当前请求没有走 Tokeness。

## 8. 常用切换方式

如果你有多个 Tokeness Key 或多个模型，可以在 CC Switch 里建多个供应商：

| 名称 | 用途 |
| --- | --- |
| `Tokeness Coding` | 日常编码 |
| `Tokeness Reasoning` | 复杂推理 |
| `Tokeness Low Cost` | 批量改文档、简单任务 |

切换供应商后，重新打开终端再运行 `claude`，避免旧进程继续使用旧配置。

## 9. 排查

| 现象 | 处理 |
| --- | --- |
| `claude` 命令不存在 | 重新安装 Claude Code，或重启终端 |
| CC Switch 找不到 Claude Code | 确认 `claude --version` 可用 |
| 401 Unauthorized | 重新复制 Tokeness API Key |
| 404 Not Found | Base URL 填 `https://n.tokeness.io/v1` |
| model not found | 从模型广场重新复制模型名 |
| Tokeness 无日志 | 确认 Tokeness 供应商已启用，并开启 CC Switch 路由模式 |
| 回复很慢 | 换模型，或检查当前模型负载和网络 |
| 工具调用报错 | 确认走 CC Switch 路由；复杂工具调用需要协议转换完整 |
