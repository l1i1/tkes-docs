import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Tokeness Docs',
  description: 'Tokeness OpenAI 兼容 API 接入文档',
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
    ['meta', { property: 'og:description', content: 'Tokeness OpenAI 兼容接口、API Key、额度和日志说明。' }],
    ['meta', { property: 'og:url', content: 'https://docs.tokeness.io' }]
  ],
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
