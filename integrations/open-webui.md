---
title: Open WebUI
description: 在 Open WebUI 中使用 Tokeness OpenAI 兼容接口。
---

# Open WebUI

Open WebUI 可以通过 OpenAI 兼容配置连接外部模型服务。自托管 Open WebUI 时，可以用环境变量或管理后台填写 Tokeness 的 Base URL 和 API Key。

## 准备

| 项目 | 填写值 |
| --- | --- |
| OpenAI API Base URL | `https://n.tokeness.io/v1` |
| OpenAI API Key | Tokeness 控制台创建的 Key |
| Model | 从 Tokeness 模型广场复制完整模型名 |

如果你的 Open WebUI 已经运行过一段时间，部分环境变量可能已经被持久化到数据库。后面修改后不生效时，需要到管理后台里改，或按 Open WebUI 的持久化配置说明处理。

## Docker 环境变量方式

单机测试可以这样启动：

```bash
docker run -d \
  --name open-webui \
  -p 3000:8080 \
  -e OPENAI_API_BASE_URL=https://n.tokeness.io/v1 \
  -e OPENAI_API_KEY=你的 Tokeness API Key \
  -v open-webui:/app/backend/data \
  ghcr.io/open-webui/open-webui:main
```

如果使用 `docker compose`，可以写成：

```yaml
services:
  open-webui:
    image: ghcr.io/open-webui/open-webui:main
    ports:
      - "3000:8080"
    environment:
      OPENAI_API_BASE_URL: https://n.tokeness.io/v1
      OPENAI_API_KEY: ${TOKENESS_API_KEY}
    volumes:
      - open-webui:/app/backend/data

volumes:
  open-webui:
```

`.env` 文件中放 Key：

```bash
TOKENESS_API_KEY=你的 Tokeness API Key
```

## 管理后台方式

如果 Open WebUI 已经启动，可以在管理后台中配置：

1. 登录 Open WebUI。
2. 进入 Admin Panel。
3. 找到 Connections 或 Models 相关设置。
4. 找到 OpenAI API 配置。
5. Base URL 填 `https://n.tokeness.io/v1`。
6. API Key 填 Tokeness API Key。
7. 保存后刷新页面。

不同版本的菜单名称可能不同。只要字段含义是 OpenAI Base URL 和 OpenAI API Key，就按上面的值填写。

## 设置默认模型

如果希望新用户打开后默认看到某个模型，可以设置：

```bash
DEFAULT_MODELS=YOUR_MODEL_NAME
```

把 `YOUR_MODEL_NAME` 换成 Tokeness 模型广场里的完整模型名。

如果多个模型用逗号分隔：

```bash
DEFAULT_MODELS=model-a,model-b
```

## RAG 和 Embedding

Open WebUI 的知识库、RAG、语音和图片相关功能可能有独立配置项。普通聊天跑通后，再配置这些功能。

Embedding 常见字段：

```bash
RAG_OPENAI_API_BASE_URL=https://n.tokeness.io/v1
RAG_OPENAI_API_KEY=你的 Tokeness API Key
```

Embedding 的模型名要使用 Tokeness 中可用的向量模型。不要把聊天模型填到向量模型位置。

## 验证

1. 打开 Open WebUI。
2. 选择 Tokeness 中的模型。
3. 发送“只回复 ok”。
4. 打开 Tokeness 使用日志，确认有请求进入。
5. 如果配置了知识库，再上传一个小文本文件测试检索。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 修改环境变量后不生效 | Open WebUI 可能已持久化配置，到管理后台修改，或处理 PersistentConfig |
| 模型列表为空 | 手动填写 Tokeness 模型名 |
| 401 | 检查 `OPENAI_API_KEY` |
| 404 | 检查 `OPENAI_API_BASE_URL` 是否为 `https://n.tokeness.io/v1` |
| 聊天可用，知识库不可用 | 单独检查 embedding 模型和 RAG 相关配置 |
| Docker 容器内请求失败 | 进入容器检查网络、DNS 和代理配置 |

## 参考资料

- [Open WebUI OpenAI-Compatible Provider](https://docs.openwebui.com/getting-started/quick-start/connect-a-provider/starting-with-openai-compatible/)
- [Open WebUI 环境变量配置](https://docs.openwebui.com/reference/env-configuration/)
