<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vitepress'

const localePreferenceKey = 'tokeness-docs-locale'
const router = useRouter()

router.onBeforeRouteChange = (href) => {
  if (href === '/' || (!href.startsWith('/zh/') && !href.startsWith('/zh'))) {
    localStorage.setItem(localePreferenceKey, 'en')
    return
  }

  if (href === '/zh/' || href.startsWith('/zh/')) {
    localStorage.setItem(localePreferenceKey, 'zh')
  }
}

onMounted(() => {
  if (window.location.pathname !== '/') {
    return
  }

  const storedLocale = localStorage.getItem(localePreferenceKey)
  if (storedLocale === 'zh') {
    window.location.replace('/zh/')
    return
  }

  if (storedLocale === 'en') {
    return
  }

  const browserLanguage = navigator.language.toLowerCase()
  if (browserLanguage.startsWith('zh')) {
    localStorage.setItem(localePreferenceKey, 'zh')
    window.location.replace('/zh/')
  }
})
</script>

<template></template>
