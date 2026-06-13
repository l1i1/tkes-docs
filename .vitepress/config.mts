import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tokeness Docs',
  description: 'Tokeness OpenAI 兼容 API 接入文档',
  titleTemplate: ':title | Tokeness Docs',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.tokeness.io'
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'keywords', content: 'Tokeness,Tokeness API,OpenAI 兼容接口,AI API,API Key,Claude API,Anthropic API,Responses API,AI 模型网关' }],
    ['meta', { name: 'author', content: 'Tokeness' }],
    ['meta', { property: 'og:site_name', content: 'Tokeness Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:image', content: 'https://docs.tokeness.io/images/tokeness-home-light-16x9.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: 'https://docs.tokeness.io/images/tokeness-home-light-16x9.png' }],
    ['script', { charset: 'UTF-8', id: 'MXA_COLLECT', src: '//mxana.tacool.com/sdk.js' }],
    [
      'script',
      {},
      'window.MXA && window.MXA.init({ id: "c2-DtVtddN1", useHash: true, useErrorLog: true })'
    ]
  ],
  transformHead({ page, title, description }) {
    const path = page
      .replace(/(^|\/)index\.(html|md)$/, '$1')
      .replace(/\.(html|md)$/, '')
    const normalizedPath = path === '/' ? '' : `/${path.replace(/^\/+/, '')}`
    const url = `https://docs.tokeness.io${normalizedPath}`

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Tokeness Docs',
    nav: [
      { text: '开始接入', link: '/guide/getting-started' },
      { text: '接入指南', link: '/integrations/openai-compatible' },
      { text: '计费', link: '/billing/pricing' },
      { text: '控制台', link: 'https://tokeness.cn/dashboard/overview' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '开始接入', link: '/guide/getting-started' },
          { text: '控制台概览', link: '/guide/dashboard' },
          { text: 'API 密钥', link: '/guide/api-keys' },
          { text: '常见问题', link: '/faq' }
        ]
      },
      {
        text: '接入指南',
        items: [
          { text: '自定义 API 与 Key', link: '/integrations/custom-api-key' },
          { text: 'OpenAI 兼容接入', link: '/integrations/openai-compatible' },
          { text: 'OpenAI Responses API', link: '/integrations/openai-responses' },
          { text: 'Anthropic API', link: '/integrations/anthropic-api' },
          { text: 'Cherry Studio', link: '/integrations/cherry-studio' },
          { text: 'Claude Code', link: '/integrations/claude-code' },
          { text: 'VS Code + Claude Code', link: '/integrations/vscode-claude-code' },
          { text: 'Cline', link: '/integrations/cline' },
          { text: 'Dify', link: '/integrations/dify' },
          { text: 'n8n', link: '/integrations/n8n' },
          { text: 'OpenClaw', link: '/integrations/openclaw' },
          { text: 'OpenCode', link: '/integrations/opencode' },
          { text: 'Cursor', link: '/integrations/cursor' },
          { text: 'Codex CLI', link: '/integrations/codex-cli' }
        ]
      },
      {
        text: '计费与合作',
        items: [
          { text: '模型与计费', link: '/billing/pricing' },
          { text: '渠道合作', link: '/partners/channel' }
        ]
      }
    ],
    footer: {
      message: 'OpenAI 兼容接口。模型、额度、日志集中管理。',
      copyright: 'Copyright © 2026 Tokeness'
    },
    search: {
      provider: 'local'
    },
    outline: {
      level: [2, 3],
      label: '本页目录'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    }
  }
})
