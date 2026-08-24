---
title: LibreChat
description: 在 LibreChat 中配置 Tokeness 自定义 OpenAI 兼容端点。
---

# LibreChat

LibreChat 支持自定义 OpenAI 兼容端点。常见做法是在 `librechat.yaml` 中定义端点，在 `.env` 中保存 Key。

## 准备

| 项目 | 填写值 |
| --- | --- |
| API URL / Base URL | `https://n.tokeness.dev/v1` |
| API Key | Tokeness 控制台创建的 Key |
| Models | 从 Tokeness 模型广场复制完整模型名 |

LibreChat 通常用于多人聊天。生产环境不要把 Tokeness Key 写到前端，也不要提交到仓库。

## 文件分工

LibreChat 自定义端点通常涉及三个文件：

| 文件 | 作用 |
| --- | --- |
| `librechat.yaml` | 定义自定义端点、模型列表、显示名称 |
| `.env` | 保存 API Key 等敏感信息 |
| `docker-compose.override.yml` | Docker 部署时挂载 `librechat.yaml` |

如果你不是 Docker 部署，按当前部署方式把 `librechat.yaml` 放到 LibreChat 能读取的位置。

## 配置 .env

在 `.env` 中加入：

```bash
TOKENESS_API_KEY=你的 Tokeness API Key
```

不要把真实 Key 写进 `librechat.yaml`。

## 配置 librechat.yaml

下面是一个最小配置。把模型名换成 Tokeness 模型广场里的完整模型名。

```yaml
version: 1.2.1

endpoints:
  custom:
    - name: "Tokeness"
      apiKey: "${TOKENESS_API_KEY}"
      baseURL: "https://n.tokeness.dev/v1"
      models:
        default:
          - "YOUR_MODEL_NAME"
        fetch: false
      titleConvo: true
      titleModel: "YOUR_MODEL_NAME"
      modelDisplayLabel: "Tokeness"
```

字段说明：

| 字段 | 说明 |
| --- | --- |
| `name` | LibreChat 里显示的端点名称 |
| `apiKey` | 从 `.env` 读取 Tokeness Key |
| `baseURL` | Tokeness OpenAI 兼容 Base URL |
| `models.default` | 在界面中可选择的模型 |
| `models.fetch` | 设为 `false` 时使用手动模型列表 |
| `titleModel` | 用于生成会话标题的模型 |

如果要开放多个模型：

```yaml
models:
  default:
    - "MODEL_A"
    - "MODEL_B"
    - "MODEL_C"
  fetch: false
```

## Docker 挂载配置

如果使用 Docker Compose，可以在 `docker-compose.override.yml` 中挂载配置：

```yaml
services:
  api:
    volumes:
      - ./librechat.yaml:/app/librechat.yaml
```

修改后重启：

```bash
docker compose down
docker compose up -d
```

## 允许用户自己填 Key

如果是团队内部部署，并希望每个用户使用自己的 Tokeness Key，可以把 `apiKey` 改成：

```yaml
apiKey: "user_provided"
```

这种模式下，用户需要在 LibreChat 界面中自行填写 Key。它适合多人共用同一个 LibreChat 实例，但不想让服务端保存统一 Key 的场景。

## 验证

1. 重启 LibreChat。
2. 在模型端点里选择 `Tokeness`。
3. 选择配置中的模型。
4. 发送“只回复 ok”。
5. 打开 Tokeness 使用日志，确认请求进入。

## 常见问题

| 现象 | 处理 |
| --- | --- |
| 看不到 Tokeness 端点 | 检查 `librechat.yaml` 是否挂载成功，重启容器 |
| 401 | 检查 `.env` 中 `TOKENESS_API_KEY` 是否被容器读取 |
| 404 | `baseURL` 应为 `https://n.tokeness.dev/v1` |
| 模型下拉为空 | 设置 `models.fetch: false`，手动填写模型名 |
| 会话标题生成失败 | 检查 `titleModel` 是否为可用模型 |
| 多用户 Key 混用 | 使用 `user_provided`，让用户在界面中填写自己的 Key |

## 参考资料

- [LibreChat Custom Endpoints](https://www.librechat.ai/docs/quick_start/custom_endpoints)
- [LibreChat Custom Endpoint Object Structure](https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/custom_endpoint)

