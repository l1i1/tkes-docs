import { h, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRouter } from 'vitepress'

import './custom.css'

const docsOrigin = 'https://docs.tokeness.ai'

const normalizeRuntimePath = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, '') || '/'

  return normalized === '/zh' ? '/zh/' : normalized
}

const alternatePathFor = (path: string) => {
  if (path === '/zh/') return '/'
  if (path.startsWith('/zh/')) return path.slice(3) || '/'
  return path === '/' ? '/zh/' : `/zh${path}`
}

const syncRuntimeSeoHead = () => {
  const path = normalizeRuntimePath(window.location.pathname)
  const alternatePath = alternatePathFor(path)
  const isChinese = path === '/zh/' || path.startsWith('/zh/')
  const englishPath = isChinese ? alternatePath : path
  const canonicalUrl = `${docsOrigin}${path === '/' ? '' : path}`
  const alternateLinks = [
    { hreflang: isChinese ? 'zh-CN' : 'en-US', path },
    { hreflang: isChinese ? 'en-US' : 'zh-CN', path: alternatePath },
    { hreflang: 'x-default', path: englishPath },
  ]

  document.head
    .querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]')
    .forEach((link) => link.remove())

  const canonical = document.createElement('link')
  canonical.rel = 'canonical'
  canonical.href = canonicalUrl
  document.head.append(canonical)

  for (const { hreflang, path: alternate } of alternateLinks) {
    const link = document.createElement('link')
    link.rel = 'alternate'
    link.hreflang = hreflang
    link.href = `${docsOrigin}${alternate === '/' ? '' : alternate}`
    document.head.append(link)
  }
}

export default {
  extends: DefaultTheme,
  Layout: {
    setup() {
      const router = useRouter()

      router.onAfterRouteChange = syncRuntimeSeoHead
      onMounted(syncRuntimeSeoHead)

      return () => h(DefaultTheme.Layout)
    }
  }
}
