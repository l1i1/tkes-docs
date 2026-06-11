# Cherry Studio

Cherry Studio 支持自定义 OpenAI 兼容服务商，可直接接入 Tokeness。

## 配置步骤

1. 打开 Cherry Studio 设置。
2. 新建或编辑 OpenAI 兼容供应商。
3. 填写服务地址和 API Key。
4. Base URL 优先填写 `https://n.tokeness.io/v1`。
5. 添加或同步 Tokeness 支持的模型。
6. 选择模型发起一次测试对话。

## 推荐配置

```txt
Provider: Tokeness
API Host: https://n.tokeness.io/v1
API Base URL: https://n.tokeness.io/v1
API Key: 你的 Tokeness API Key
```

不同版本的 Cherry Studio 字段名称可能略有差异。如果只提供一个地址字段，优先填写 `https://n.tokeness.io/v1`。如果模型列表拉不出来，先手动复制模型名再测试。

## 多分组建议

如果你为不同折扣、模型或客户创建了不同 Key，建议在 Cherry Studio 中分别创建多个供应商配置，例如：

| 供应商名称 | 用途 |
| --- | --- |
| Tokeness Default | 日常通用模型 |
| Tokeness Claude | Claude 系列专用 |
| Tokeness Test | 小额度测试 |
