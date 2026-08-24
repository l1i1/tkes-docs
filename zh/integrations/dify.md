---
title: Dify
description: 在 Dify 中通过 OpenAI-API-compatible 插件或自定义模型供应商接入 Tokeness。
---

# Dify

Dify 可以通过模型供应商接入外部模型。接入 Tokeness 时，使用 Dify 的 OpenAI-API-compatible 插件或 OpenAI 兼容模型供应商，填写 Tokeness 的 API Endpoint、API Key 和模型名。

## 接入信息

| 项目 | 填写内容 |
| --- | --- |
| Provider | OpenAI-API-compatible |
| API Endpoint / Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Model Name | Tokeness 模型广场中的完整模型名 |

如果你的 Dify 版本已经内置 OpenAI Compatible Provider，直接使用内置入口。没有内置入口时，安装 Marketplace 里的 OpenAI-API-compatible 插件。

## 1. 准备 Tokeness

先准备：

1. Dify 专用 API Key。
2. 一个聊天模型名。
3. 如果要做 RAG，再准备一个 embedding 模型名。
4. 可用余额。

Key 名称可以写成：

```txt
dify-workspace
```

生产环境和测试环境分开建 Key。

## 2. 安装或打开模型供应商

在 Dify 工作区中进入：

```txt
Settings -> Model Provider
```

如果能看到 OpenAI-API-compatible 或 OpenAI Compatible，直接进入配置。

如果看不到：

1. 打开 Dify Marketplace。
2. 搜索 `OpenAI-API-compatible`。
3. 安装 `langgenius/openai_api_compatible` 插件。
4. 回到模型供应商设置页。

## 3. 添加 Tokeness LLM

在 OpenAI-API-compatible Provider 中添加模型。

填写：

```txt
API Endpoint: https://n.tokeness.dev/v1
API Key: 你的 Tokeness API Key
Model Name: 从 Tokeness 模型广场复制的模型名
```

模型类型选择 LLM 或 Chat Model。上下文长度、最大输出、函数调用、多模态等能力按 Tokeness 模型广场和实际测试结果填写。

如果 Dify 要求填写 Completion mode，普通对话应用优先使用 Chat Completion。

## 4. 添加 Embedding 模型

如果 Dify 应用要使用知识库，需要额外添加 embedding 模型。

填写方式与聊天模型一致：

```txt
API Endpoint: https://n.tokeness.dev/v1
API Key: 你的 Tokeness API Key
Model Name: 从 Tokeness 模型广场复制的 embedding 模型名
```

注意：

- 聊天模型和 embedding 模型不是同一个东西。
- 知识库索引建立后，更换 embedding 模型可能需要重建索引。
- 如果只做聊天应用，可以先不配置 embedding。

## 5. 在应用中选择模型

进入 Dify 应用的编排页面，在模型选择处选中 Tokeness Provider 下的模型。

首次测试：

1. 新建一个空白聊天应用。
2. 选择 Tokeness 模型。
3. 输入一句短问题。
4. 到 Tokeness 使用日志确认请求。

工作流应用中，每个 LLM 节点都要检查是否选中了 Tokeness 模型。

## 6. 自托管 Dify 注意事项

自托管 Dify 时，Dify 容器需要能访问 `https://n.tokeness.dev/v1`。

如果验证失败：

| 检查项 | 说明 |
| --- | --- |
| 容器网络 | Dify API/worker 容器能否访问外网 |
| 代理 | 服务器是否需要配置 HTTP/HTTPS 代理 |
| 证书 | 是否有自签证书或公司网关拦截 |
| Endpoint | 不要写成本机浏览器能访问但容器不能访问的地址 |

可以进入 Dify 容器里用 cURL 测试 Tokeness 接口。

## 7. 排查

| 现象 | 处理 |
| --- | --- |
| Credential validation failed | 检查 Endpoint、Key、容器网络 |
| 401 Unauthorized | API Key 错误或已禁用 |
| 404 Not Found | API Endpoint 填 `https://n.tokeness.dev/v1` |
| model not found | 模型名从 Tokeness 模型广场重新复制 |
| 应用里找不到模型 | 模型添加后未保存，或没有在应用节点中选择 |
| 知识库无法索引 | 检查 embedding 模型是否配置正确 |
| Tokeness 无日志 | Dify 当前应用没有使用 Tokeness 模型 |

## 外部文档

- [Dify Model Providers](https://docs.dify.ai/en/use-dify/workspace/model-providers)
- [Dify OpenAI-API-compatible Marketplace 插件](https://marketplace.dify.ai/plugin/langgenius/openai_api_compatible)

