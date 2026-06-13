---
title: Cherry Studio
description: 在 Cherry Studio 中添加 Tokeness 自定义服务商，配置 API 地址、API Key 和模型列表。
---

# Cherry Studio

Cherry Studio 支持自定义 AI Provider。Tokeness 按 OpenAI 兼容接口接入，在自定义服务商中填写 API 地址、API Key，再手动添加模型名。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider Type | `OpenAI` 或自定义 OpenAI 兼容服务商 |
| Provider Name | `Tokeness` |
| API Address / Base URL | `https://n.tokeness.io/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model ID | Tokeness 模型广场中的完整模型名 |

不同版本的 Cherry Studio 字段名可能不同。只要字段含义是 API 地址、API Key、模型管理，就按上表填写。

## 1. 准备 Tokeness

先准备：

1. 一个 Cherry Studio 专用 API Key。
2. 一个已确认可用的模型名。
3. 可用余额。

Key 名称可以写成：

```txt
cherry-studio-local
```

如果你会在 Cherry Studio 里配置多个助手或知识库，可以为不同用途建立多个 Key。

## 2. 新建自定义服务商

进入 Cherry Studio 设置，找到模型服务、Provider 或服务商配置。

新建服务商：

```txt
Name: Tokeness
Type: OpenAI
API Address: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
```

保存前，如果界面有 Check、Test 或验证按钮，先点一次。验证失败时不要继续添加模型，先检查 Key 和 API 地址。

## 3. 添加模型

Cherry Studio 的自定义 Provider 通常需要手动添加模型。

操作方式：

1. 打开 Tokeness 模型广场。
2. 复制完整模型名。
3. 回到 Cherry Studio 的模型管理。
4. 点击添加模型。
5. 粘贴模型名。
6. 保存。

模型名要完整保留大小写、供应商前缀和版本号。

## 4. 设置默认模型

添加模型后，在 Cherry Studio 的对话页面选择 Tokeness Provider 和对应模型。

首次测试输入：

```txt
请只回复一句话，说明当前模型已经可用。
```

然后打开 Tokeness 使用日志，确认请求进入 Tokeness。

## 5. 多服务商配置

如果你有多种使用场景，可以创建多个 Tokeness Provider：

| 供应商名称 | 用途 |
| --- | --- |
| `Tokeness Chat` | 日常聊天 |
| `Tokeness Coding` | 代码相关对话 |
| `Tokeness Low Cost` | 摘要、翻译、简单问答 |
| `Tokeness Test` | 小额度测试 |

这些 Provider 可以使用同一个 Base URL，只需要 Key 和模型配置不同。

## 6. 排查

| 现象 | 处理 |
| --- | --- |
| Check 失败 | 检查 API 地址、Key、余额 |
| 401 Unauthorized | 重新复制 API Key |
| 404 Not Found | API 地址填写 `https://n.tokeness.io/v1` |
| 模型列表为空 | 手动添加模型名 |
| model not found | 从模型广场重新复制模型名 |
| Tokeness 无日志 | 当前会话没有选中 Tokeness Provider |
| 消耗无法区分 | 为 Cherry Studio 单独建 Key |

## 外部文档

- [Cherry Studio Custom Provider](https://docs.cherry-ai.com/docs/en-us/pre-basic/providers/zi-ding-yi-fu-wu-shang)
- [Cherry Studio NewAPI Provider 示例](https://docs.cherry-ai.com/docs/en-us/pre-basic/providers/newapi)

