---
layout: home

hero:
  name: Tokeness Docs
  text: 一个 Key，所有模型
  tagline: 面向开发者和渠道伙伴的 Tokeness 接入文档。统一模型入口、统一额度控制、统一消费记录，兼容 OpenAI API 格式。
  image:
    src: /logo.svg
    alt: Tokeness
  actions:
    - theme: brand
      text: 快速上手
      link: /guide/getting-started
    - theme: alt
      text: OpenAI 兼容接入
      link: /integrations/openai-compatible

features:
  - title: OpenAI 兼容
    details: 现有 OpenAI SDK、Chat 客户端和自动化工具可以按兼容模式接入，减少迁移成本。
  - title: Key 与额度控制
    details: 为项目创建独立 API Key，限制可用模型、分组和额度，便于开发、测试、生产分开管理。
  - title: 模型与路由
    details: 聚合 OpenAI、Claude、Gemini、DeepSeek、Qwen 等模型供应商，按场景选择通用或专用线路。
  - title: 消费可追溯
    details: 控制台提供概览、数据看板、使用日志和钱包入口，帮助定位调用、余额和消耗。
---

<div class="tokeness-note-grid">
  <div class="tokeness-note">
    <strong>服务入口</strong>
    官网与控制台：<a href="https://tokeness.cn">tokeness.cn</a><br>
    文档域名：<a href="https://docs.tokeness.io">docs.tokeness.io</a>
  </div>
  <div class="tokeness-note">
    <strong>推荐路径</strong>
    先看快速上手，再选一个接入页。最短路径是：注册登录、充值、创建 API Key、填入 Base URL、发起一次测试调用。
  </div>
</div>

<div class="tokeness-shot-grid">
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-home-light-16x9.png" alt="Tokeness 首页浅色模式">
    <figcaption>首页浅色模式</figcaption>
  </figure>
  <figure class="tokeness-shot-card">
    <img class="tokeness-shot" src="/images/tokeness-home-dark-16x9.png" alt="Tokeness 首页深色模式">
    <figcaption>首页深色模式</figcaption>
  </figure>
</div>
