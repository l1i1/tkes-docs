// allow: SIZE_OK — VitePress locale config keeps en/zh navigation, sidebar, and SEO metadata together.
import { defineConfig } from 'vitepress'

const docsOrigin = 'https://docs.tokeness.io'

const createWebsiteJsonLd = (language: 'en-US' | 'zh-CN') => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Tokeness Docs',
  url: docsOrigin,
  description:
    language === 'zh-CN'
      ? 'Tokeness OpenAI 兼容 API 接入文档'
      : 'Tokeness OpenAI-compatible AI API gateway documentation',
  inLanguage: language
} as const)

const createOrganizationJsonLd = (language: 'en-US' | 'zh-CN') => JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Tokeness',
  url: 'https://tokeness.io',
  logo: `${docsOrigin}/logo.svg`,
  sameAs: [docsOrigin],
  description:
    language === 'zh-CN'
      ? 'Tokeness 是提供 OpenAI 兼容接口、API Key 管理、额度控制和使用日志的 AI API 网关。'
      : 'Tokeness is an AI API gateway with OpenAI-compatible access, API key management, quota control, and usage logs.'
} as const)

const browserLanguageRedirectScript = `(() => {
  const key = 'tokeness-docs-locale'
  const isChinesePath = (path) => path === '/zh' || path === '/zh/' || path.startsWith('/zh/')
  const toChinesePath = (path) => {
    if (isChinesePath(path)) return path === '/zh' ? '/zh/' : path
    return path === '/' ? '/zh/' : '/zh' + path
  }
  const toEnglishPath = (path) => {
    if (path === '/zh' || path === '/zh/') return '/'
    return path.startsWith('/zh/') ? path.slice(3) || '/' : path
  }
  const getStoredLocale = () => {
    try { return localStorage.getItem(key) } catch { return null }
  }
  const setStoredLocale = (locale) => {
    try { localStorage.setItem(key, locale) } catch {}
  }
  const storedLocale = getStoredLocale()
  const browserLocale = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en'
  const targetLocale = storedLocale === 'zh' || storedLocale === 'en' ? storedLocale : browserLocale
  if (!storedLocale) setStoredLocale(targetLocale)
  const targetPath = targetLocale === 'zh' ? toChinesePath(location.pathname) : toEnglishPath(location.pathname)
  if (targetPath !== location.pathname) {
    location.replace(targetPath + location.search + location.hash)
    return
  }
  window.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null
    if (!link) return
    const url = new URL(link.href, location.origin)
    if (url.origin === location.origin) setStoredLocale(isChinesePath(url.pathname) ? 'zh' : 'en')
  }, true)
})()`

const enNav = [
  { text: 'About', link: '/about' },
  { text: 'Getting Started', link: '/guide/getting-started' },
  { text: 'Integrations', link: '/integrations/openai-compatible' },
  { text: 'Billing', link: '/billing/pricing' },
  { text: 'Impact Program', link: '/partners/impact' },
  { text: 'Console', link: 'https://tokeness.io/dashboard/overview' }
] as const

const zhNav = [
  { text: '关于', link: '/zh/about' },
  { text: '开始接入', link: '/zh/guide/getting-started' },
  { text: '接入指南', link: '/zh/integrations/openai-compatible' },
  { text: '计费', link: '/zh/billing/pricing' },
  { text: '公益计划', link: '/zh/partners/impact' },
  { text: '控制台', link: 'https://tokeness.io/dashboard/overview' }
] as const

const enSidebar = [
  {
    text: 'Start',
    items: [
      { text: 'About Tokeness', link: '/about' },
      { text: 'Getting Started', link: '/guide/getting-started' },
      { text: 'Dashboard Overview', link: '/guide/dashboard' },
      { text: 'API Keys', link: '/guide/api-keys' },
      { text: 'FAQ', link: '/faq' }
    ]
  },
  {
    text: 'Integration Guides',
    items: [
      { text: 'Custom API and Key', link: '/integrations/custom-api-key' },
      { text: 'OpenAI Compatible API', link: '/integrations/openai-compatible' },
      { text: 'OpenAI Responses API', link: '/integrations/openai-responses' },
      { text: 'Anthropic API', link: '/integrations/anthropic-api' },
      { text: 'Cherry Studio', link: '/integrations/cherry-studio' },
      { text: 'Claude Code', link: '/integrations/claude-code' },
      { text: 'VS Code + Claude Code', link: '/integrations/vscode-claude-code' },
      { text: 'Cline', link: '/integrations/cline' },
      { text: 'Roo Code', link: '/integrations/roo-code' },
      { text: 'Continue', link: '/integrations/continue' },
      { text: 'Cursor', link: '/integrations/cursor' },
      { text: 'Codex CLI', link: '/integrations/codex-cli' },
      { text: 'Dify', link: '/integrations/dify' },
      { text: 'n8n', link: '/integrations/n8n' },
      { text: 'Open WebUI', link: '/integrations/open-webui' },
      { text: 'AnythingLLM', link: '/integrations/anythingllm' },
      { text: 'LibreChat', link: '/integrations/librechat' },
      { text: 'LiteLLM', link: '/integrations/litellm' },
      { text: 'OpenClaw', link: '/integrations/openclaw' },
      { text: 'OpenCode', link: '/integrations/opencode' }
    ]
  },
  {
    text: 'Billing and Partners',
    items: [
      { text: 'Models and Billing', link: '/billing/pricing' },
      { text: 'Impact Program', link: '/partners/impact' },
      { text: 'Channel Partners', link: '/partners/channel' }
    ]
  }
] as const

const zhSidebar = [
  {
    text: '开始使用',
    items: [
      { text: '关于 Tokeness', link: '/zh/about' },
      { text: '开始接入', link: '/zh/guide/getting-started' },
      { text: '控制台概览', link: '/zh/guide/dashboard' },
      { text: 'API 密钥', link: '/zh/guide/api-keys' },
      { text: '常见问题', link: '/zh/faq' }
    ]
  },
  {
    text: '接入指南',
    items: [
      { text: '自定义 API 与 Key', link: '/zh/integrations/custom-api-key' },
      { text: 'OpenAI 兼容接入', link: '/zh/integrations/openai-compatible' },
      { text: 'OpenAI Responses API', link: '/zh/integrations/openai-responses' },
      { text: 'Anthropic API', link: '/zh/integrations/anthropic-api' },
      { text: 'Cherry Studio', link: '/zh/integrations/cherry-studio' },
      { text: 'Claude Code', link: '/zh/integrations/claude-code' },
      { text: 'VS Code + Claude Code', link: '/zh/integrations/vscode-claude-code' },
      { text: 'Cline', link: '/zh/integrations/cline' },
      { text: 'Roo Code', link: '/zh/integrations/roo-code' },
      { text: 'Continue', link: '/zh/integrations/continue' },
      { text: 'Cursor', link: '/zh/integrations/cursor' },
      { text: 'Codex CLI', link: '/zh/integrations/codex-cli' },
      { text: 'Dify', link: '/zh/integrations/dify' },
      { text: 'n8n', link: '/zh/integrations/n8n' },
      { text: 'Open WebUI', link: '/zh/integrations/open-webui' },
      { text: 'AnythingLLM', link: '/zh/integrations/anythingllm' },
      { text: 'LibreChat', link: '/zh/integrations/librechat' },
      { text: 'LiteLLM', link: '/zh/integrations/litellm' },
      { text: 'OpenClaw', link: '/zh/integrations/openclaw' },
      { text: 'OpenCode', link: '/zh/integrations/opencode' }
    ]
  },
  {
    text: '计费与合作',
    items: [
      { text: '模型与计费', link: '/zh/billing/pricing' },
      { text: '公益智能扶持计划', link: '/zh/partners/impact' },
      { text: '渠道合作', link: '/zh/partners/channel' }
    ]
  }
] as const

const normalizePagePath = (page: string) => {
  const withoutIndex = page.replace(/(^|\/)index\.(html|md)$/, '$1')
  const withoutExtension = withoutIndex.replace(/\.(html|md)$/, '')
  const normalized = withoutExtension === '/' ? '' : withoutExtension.replace(/^\/+/, '')

  return normalized ? `/${normalized}` : '/'
}

const alternatePathFor = (path: string) => {
  if (path === '/zh/') {
    return '/'
  }

  if (path.startsWith('/zh/')) {
    return path.slice(3) || '/'
  }

  return path === '/' ? '/zh/' : `/zh${path}`
}

export default defineConfig({
  title: 'Tokeness Docs',
  titleTemplate: ':title | Tokeness Docs',
  cleanUrls: true,
  lastUpdated: true,
  sitemap: {
    hostname: docsOrigin
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'robots', content: 'index,follow' }],
    ['meta', { name: 'author', content: 'Tokeness' }],
    ['script', {}, browserLanguageRedirectScript],
    ['meta', { property: 'og:site_name', content: 'Tokeness Docs' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${docsOrigin}/images/tokeness-home-light-16x9.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${docsOrigin}/images/tokeness-home-light-16x9.png` }],
    ['script', { charset: 'UTF-8', id: 'MXA_COLLECT', src: '//mxana.tacool.com/sdk.js' }],
    [
      'script',
      {},
      'window.MXA && window.MXA.init({ id: "c2-DtVtddN1", useHash: true, useErrorLog: true })'
    ]
  ],
  transformHead({ page, title, description }) {
    const path = normalizePagePath(page)
    const canonicalUrl = `${docsOrigin}${path === '/' ? '' : path}`
    const alternatePath = alternatePathFor(path)
    const isChinese = path === '/zh/' || path.startsWith('/zh/')

    return [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['link', { rel: 'alternate', hreflang: isChinese ? 'en-US' : 'zh-CN', href: `${docsOrigin}${alternatePath === '/' ? '' : alternatePath}` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: docsOrigin }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:locale', content: isChinese ? 'zh_CN' : 'en_US' }],
      ['meta', { property: 'og:locale:alternate', content: isChinese ? 'en_US' : 'zh_CN' }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }]
    ]
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Tokeness Docs',
    search: {
      provider: 'local'
    }
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      description: 'Tokeness OpenAI-compatible AI API gateway documentation',
      head: [
        ['meta', { name: 'keywords', content: 'Tokeness,Tokeness API,OpenAI-compatible API,AI API,API Key,Claude API,Anthropic API,Responses API,AI model gateway' }],
        ['script', { type: 'application/ld+json' }, createWebsiteJsonLd('en-US')],
        ['script', { type: 'application/ld+json' }, createOrganizationJsonLd('en-US')]
      ],
      themeConfig: {
        nav: enNav,
        sidebar: enSidebar,
        footer: {
          message: 'OpenAI-compatible access with centralized models, quota, and logs.',
          copyright: 'Copyright © 2026 Tokeness'
        },
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'medium',
            timeStyle: 'short'
          }
        }
      }
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: 'Tokeness OpenAI 兼容 API 接入文档',
      head: [
        ['meta', { name: 'keywords', content: 'Tokeness,Tokeness API,OpenAI 兼容接口,AI API,API Key,Claude API,Anthropic API,Responses API,AI 模型网关' }],
        ['script', { type: 'application/ld+json' }, createWebsiteJsonLd('zh-CN')],
        ['script', { type: 'application/ld+json' }, createOrganizationJsonLd('zh-CN')]
      ],
      themeConfig: {
        nav: zhNav,
        sidebar: zhSidebar,
        footer: {
          message: 'OpenAI 兼容接口。模型、额度、日志集中管理。',
          copyright: 'Copyright © 2026 Tokeness'
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
    }
  }
})
