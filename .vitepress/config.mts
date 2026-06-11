import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tokeness Docs',
  description: 'Tokeness 一站式 AI API 接口文档',
  lang: 'zh-CN',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.tokeness.io'
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { property: 'og:site_name', content: 'Tokeness Docs' }],
    ['meta', { property: 'og:title', content: 'Tokeness Docs' }],
    ['meta', { property: 'og:description', content: '一个 Key 对接所有模型，OpenAI 兼容协议，统一路由、额度和账单。' }],
    ['meta', { property: 'og:url', content: 'https://docs.tokeness.io' }]
  ],
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Tokeness Docs',
    nav: [
      { text: '快速上手', link: '/guide/getting-started' },
      { text: '接入指南', link: '/integrations/openai-compatible' },
      { text: '计费', link: '/billing/pricing' },
      { text: '控制台', link: 'https://tokeness.cn/dashboard/overview' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '快速上手', link: '/guide/getting-started' },
          { text: '控制台概览', link: '/guide/dashboard' },
          { text: 'API 密钥', link: '/guide/api-keys' },
          { text: '常见问题', link: '/faq' }
        ]
      },
      {
        text: '接入指南',
        items: [
          { text: 'OpenAI 兼容接入', link: '/integrations/openai-compatible' },
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
      message: '一个 Key，所有模型。接得快，花得清楚。',
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
