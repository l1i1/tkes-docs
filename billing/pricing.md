# 模型与计费

Tokeness 采用先充值后调用的模式。每次 API 调用按实际消耗扣费。模型价格以控制台、模型广场或正式报价为准。

<figure class="tokeness-shot">
  <div class="tokeness-shot-frame">
    <img class="tokeness-shot-light" src="/images/tokeness-models-light-16x9.png" alt="Tokeness 模型广场">
    <img class="tokeness-shot-dark" src="/images/tokeness-models-dark-16x9.png" alt="Tokeness 模型广场">
  </div>
  <figcaption>模型广场</figcaption>
</figure>

## 计费口径

| 项目 | 说明 |
| --- | --- |
| 充值方式 | 先充值后调用 |
| 扣费方式 | API 调用消耗实时从账户余额扣除 |
| 余额有效期 | 余额长期有效，具体以平台政策为准 |
| 价格单位 | 按每 1M tokens 的输入和输出价格展示 |
| 汇率假设 | 现有渠道报价表按 `1 USD = 7 CNY` 折算 |

## 渠道示例

渠道报价表包含的常见栏目：

| 类型 | 说明 |
| --- | --- |
| 官转渠道 | 按官方 API 原价或 0 加价口径展示 |
| 折扣渠道 | Claude、GPT 等部分模型存在不同折扣渠道 |
| 国内模型 | 国内模型按官方原价基础上的 Tokeness 渠道价展示 |
| 合作伙伴 | 达到月流水区间后，可在非官转价格基础上叠加折扣 |

::: warning 价格变动
模型供应商价格、汇率和渠道政策都可能变化。公开文档只说明计费方式，不承诺固定价格。
:::

## 查看消耗

调用后可以在控制台查看：

| 页面 | 用途 |
| --- | --- |
| 概览 | 查看账户和调用概况 |
| 数据看板 | 分析模型调用和消耗趋势 |
| 使用日志 | 排查单次请求状态、模型和费用 |
| 钱包 | 查看余额与充值 |

## 成本控制

1. 每个项目使用独立 API Key。
2. 开发测试环境设置较小额度。
3. 高消耗工作流先用小样本跑通。
4. 定期查看使用日志和数据看板。
5. 渠道或客户项目按客户拆分 Key。
