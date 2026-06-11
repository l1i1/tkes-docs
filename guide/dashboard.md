# 控制台概览

Tokeness 控制台用于管理模型、Key、日志和余额。登录后默认进入概览页。

<div class="tokeness-shot-grid">
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-dashboard-light-16x9.png" alt="Tokeness 控制台概览浅色模式">
    <figcaption>控制台概览浅色模式</figcaption>
  </figure>
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-dashboard-dark-16x9.png" alt="Tokeness 控制台概览深色模式">
    <figcaption>控制台概览深色模式</figcaption>
  </figure>
</div>

## 导航结构

控制台当前主要入口如下：

| 分组 | 页面 | 用途 |
| --- | --- | --- |
| 聊天 | 游乐场 | 测试模型返回 |
| 聊天 | 聊天 | 在网页内直接对话 |
| 常规 | 概览 | 查看账户和调用的概览信息 |
| 常规 | 模型广场 | 查看可用模型并复制模型名 |
| 常规 | 数据看板 | 查看模型、调用与消费相关数据 |
| 常规 | API 密钥 | 创建和管理接口调用 Key |
| 常规 | 使用日志 | 排查请求、模型、状态和费用 |
| 个人 | 钱包 | 充值、余额和账务入口 |
| 个人 | 个人资料 | 管理账号信息 |

## 操作顺序

1. 在“钱包”完成充值。
2. 在“API 密钥”为项目创建独立 Key。
3. 在“模型广场”确认需要调用的模型名称。
4. 在客户端或代码中配置 `https://n.tokeness.io/v1`。
5. 在“使用日志”和“数据看板”查看调用是否成功。

## 搜索与排查

顶部搜索可定位功能入口。调用失败时，按下面顺序排查：

| 检查项 | 说明 |
| --- | --- |
| Key | 是否复制完整，是否被禁用或额度耗尽 |
| 余额 | 钱包余额是否足够覆盖本次调用 |
| 模型 | 模型名称是否正确，当前分组是否支持 |
| 请求格式 | 是否使用 OpenAI 兼容格式和正确 Base URL |
| 日志 | 使用日志中是否有状态码、错误原因或上游返回 |
