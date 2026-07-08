import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'

import BrowserLanguageRedirect from './BrowserLanguageRedirect.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-top': () => h(BrowserLanguageRedirect)
    })
  }
}
