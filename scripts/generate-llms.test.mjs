import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import { llmsManifest } from './llms-manifest.mjs'
import { generateLlmsFullTxt, generateLlmsTxt, generateZhLlmsFullTxt, generateZhLlmsTxt } from './generate-llms.mjs'

const fixedPricePattern = /(?:[$¥￥]\s*\d+(?:\.\d+)?|(?:USD|CNY|RMB)\s*\d+(?:\.\d+)?|\d+(?:\.\d+)?\s*(?:USD|CNY|RMB)\b|\d+(?:\.\d+)?\s*(?:美元|元|人民币)|\d+(?:\.\d+)?\s*(?:USD|CNY|RMB)\s*=\s*\d+(?:\.\d+)?\s*(?:USD|CNY|RMB)\b|\d+(?:\.\d+)?\s*(?:元|人民币)\s*\/\s*(?:人民币|元)|\d+(?:\.\d+)?\s*credits?)/i
const docsRoot = dirname(dirname(fileURLToPath(import.meta.url)))

const sourcePathFor = (path) => {
  if (path === '/llms-full.txt') {
    return join(docsRoot, 'public', 'llms-full.txt')
  }

  if (path === '/zh/llms-full.txt') {
    return join(docsRoot, 'public', 'zh', 'llms-full.txt')
  }

  return join(docsRoot, `${path.slice(1)}.md`)
}

describe('generateLlmsTxt', () => {
  it('renders canonical metadata when manifest is provided', () => {
    const output = generateLlmsTxt()

    assert.match(output, /^# Tokeness Docs\n/)
    assert.match(output, /> Base URL: https:\/\/n\.tokeness\.io\/v1/)
    assert.match(output, /> Console: https:\/\/tokeness\.io/)
    assert.match(output, /> Docs: https:\/\/docs\.tokeness\.io/)
  })

  it('renders section headings and markdown links from the controlled manifest', () => {
    const output = generateLlmsTxt()

    assert.match(output, /^## Integration Guides$/m)
    assert.match(output, /- \[OpenAI-Compatible API\]\(https:\/\/docs\.tokeness\.io\/integrations\/openai-compatible\): OpenAI SDK, Node\.js, Python, and cURL examples\./)
    assert.match(output, /- \[OpenCode\]\(https:\/\/docs\.tokeness\.io\/integrations\/opencode\): OpenCode configuration\./)
  })

  it('includes the llms-full pointer and no fixed price literals', () => {
    const output = generateLlmsTxt()

    assert.match(output, /- \[Full LLM content\]\(https:\/\/docs\.tokeness\.io\/llms-full\.txt\): Extended machine-readable facts and key documentation excerpts for LLM ingestion\./)
    assert.doesNotMatch(output, fixedPricePattern)
  })

  it('references existing docs files from every manifest link', () => {
    for (const section of llmsManifest.englishSections) {
      for (const link of section.links) {
        assert.equal(existsSync(sourcePathFor(link.path)), true, `${link.path} should resolve`)
      }
    }
  })
})

describe('generateZhLlmsTxt', () => {
  it('renders Chinese links under the /zh locale', () => {
    const output = generateZhLlmsTxt()

    assert.match(output, /^## 接入指南$/m)
    assert.match(output, /- \[OpenAI 兼容接入\]\(https:\/\/docs\.tokeness\.io\/zh\/integrations\/openai-compatible\): OpenAI SDK、Node\.js、Python 和 cURL 示例。/)
    assert.match(output, /- \[完整 LLM 内容\]\(https:\/\/docs\.tokeness\.io\/zh\/llms-full\.txt\): 面向 LLM 摄取的扩展机器可读事实和关键文档摘录。/)
    assert.doesNotMatch(output, fixedPricePattern)
  })

  it('references existing Chinese docs files from every generated locale link', () => {
    for (const section of llmsManifest.sections) {
      for (const link of section.links) {
        const zhPath = `/zh${link.path}`
        assert.equal(existsSync(sourcePathFor(zhPath)), true, `${zhPath} should resolve`)
      }
    }
  })

  it('references an existing Chinese canonical page for every zh full page', () => {
    for (const page of llmsManifest.zhFullPages) {
      const zhPath = `/zh${page.path}`
      assert.equal(existsSync(sourcePathFor(zhPath)), true, `${zhPath} should resolve`)
    }
  })

  it('renders Chinese site description, not English reuse', () => {
    const output = generateZhLlmsTxt()

    assert.doesNotMatch(output, /^> Tokeness is an AI API gateway\./m, 'zh site description must not be English reuse')
    assert.match(output, /^> .*[\u4e00-\u9fff]/m, 'zh site description must contain Chinese characters')
  })

  it('renders Chinese section descriptions, not English reuse', () => {
    const output = generateZhLlmsTxt()

    const descriptions = output
      .split('\n')
      .filter((l) => l.startsWith('- ['))
      .map((l) => {
        const m = l.match(/\): (.+)$/)
        return m ? m[1] : ''
      })
      .filter(Boolean)

    assert.ok(descriptions.length > 0, 'should have section descriptions')
    for (const desc of descriptions) {
      assert.match(desc, /[\u4e00-\u9fff]/, `section description must be Chinese, got: "${desc}"`)
    }
  })
})

describe('generateLlmsFullTxt', () => {
  it('renders page headings and canonical base URL', () => {
    const output = generateLlmsFullTxt()

    assert.match(output, /^# Tokeness Documentation - Full LLM Context\n/)
    assert.match(output, /^## Page: About Tokeness$/m)
    assert.match(output, /^## Page: Getting Started$/m)
    assert.match(output, /Canonical API Base URL: https:\/\/n\.tokeness\.io\/v1/)
  })

  it('separates full pages with markdown horizontal rules', () => {
    const output = generateLlmsFullTxt()
    const separators = output.match(/^---$/gm)

    assert.equal(separators?.length, llmsManifest.fullPages.length)
  })

  it('keeps pricing authority dynamic and avoids fixed price literals', () => {
    const output = generateLlmsFullTxt()

    assert.match(output, /Current model prices are authoritative in the console, model marketplace, or formal quotation\./)
  })

  it('mirrors stable troubleshooting facts in English output', () => {
    const output = generateLlmsFullTxt()

    assert.match(output, /Claude Max.*subscription.*Claude API.*API key.*model ID/)
    assert.match(output, /401.*API Key.*Base URL.*model name.*protocol/)
    assert.match(output, /429.*quota.*wallet balance.*request rate/)
    assert.match(output, /5xx.*usage logs.*avoid repeated retries/)
    assert.match(output, /streaming response is interrupted/)
    assert.match(output, /client timeout.*network connection.*retry/)
  })
  it('recognizes prohibited static price forms in both directions', () => {
    for (const literal of ['$1', '¥1', 'USD 1', 'CNY 1', 'RMB 1', ' usd   1 ', '1 USD = 7 CNY', '1美元', '1 元/人民币']) {
      assert.match(literal, fixedPricePattern, `static price literal should be rejected: ${literal}`)
    }

    for (const safeText of ['HTTP 401', '1. 创建 API Key', '1M tokens', '当前价格以控制台为准', '价格可能变化']) {
      assert.doesNotMatch(safeText, fixedPricePattern, `safe text should remain allowed: ${safeText}`)
    }
  })

  it('detects a mutated exchange-rate literal for the intended price reason', () => {
    const mutatedOutput = `${generateLlmsFullTxt()}\n1 USD = 7 CNY`

    assert.match(mutatedOutput, fixedPricePattern, 'exchange-rate mutation must be rejected as a fixed price')
  })
})

describe('generateZhLlmsFullTxt', () => {
  it('renders full-page URLs under the /zh locale', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /^# Tokeness 文档 - 完整 LLM 上下文\n/)
    assert.match(output, /^URL: https:\/\/docs\.tokeness\.io\/zh\/about$/m)
    assert.match(output, /^URL: https:\/\/docs\.tokeness\.io\/zh\/guide\/getting-started$/m)
  })

  it('keeps pricing authority dynamic and avoids fixed price literals', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /当前模型价格以控制台、模型市场或正式报价为准。/)
    assert.doesNotMatch(output, fixedPricePattern)
  })

  it('renders Chinese page bodies, not English body reuse', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /[\u4e00-\u9fff]/, 'zh full pages must contain Chinese body text')
    assert.doesNotMatch(output, /This file is a compact, machine-readable source of Tokeness facts for AI crawlers/)
    assert.doesNotMatch(output, /Tokeness is an AI API gateway for developers\./)
    assert.doesNotMatch(output, /Minimum onboarding flow: sign in, top up/)
  })

  it('renders Chinese full-page titles and header, not English reuse', () => {
    const output = generateZhLlmsFullTxt()

    assert.doesNotMatch(output, /^# Tokeness Documentation - Full LLM Context$/m, 'zh full title must not be English reuse')
    assert.match(output, /^# .*[\u4e00-\u9fff]/m, 'zh full title must contain Chinese')
    const pageTitleLines = output.split('\n').filter((l) => l.startsWith('## Page: '))
    assert.ok(pageTitleLines.length > 0, 'should have page titles')
    for (const line of pageTitleLines) {
      const title = line.replace('## Page: ', '')
      assert.match(title, /[\u4e00-\u9fff]/, `page title must be Chinese, got: "${title}"`)
    }
  })

  it('mirrors the stable Chinese troubleshooting and integration facts', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /Claude Max.*订阅.*Claude API.*API 密钥.*模型 ID/)
    assert.match(output, /401.*检查.*(?:API Key|API 密钥).*Base URL.*模型名称.*协议/)
    assert.match(output, /429.*额度.*余额.*请求频率/)
    assert.match(output, /5xx.*用量日志.*避免连续重试/)
    assert.match(output, /流式响应中断/)
    assert.match(output, /检查客户端超时.*网络连接.*重试/)
    assert.match(output, /输入.*输出.*缓存.*重试/)
    assert.match(output, /比较日期和来源/)
    assert.match(output, /状态码.*错误原因.*模型.*费用/)
    assert.match(output, /每个项目.*独立 API Key.*额度限制/)
    assert.match(output, /OpenAI 兼容.*chat\/completions.*不代表 Anthropic API 的所有字段/)
    assert.match(output, /Claude Code.*CC Switch.*路由模式.*协议转换/)
    assert.doesNotMatch(output, /保证模型身份|(?<!不能)仅凭返回内容证明模型身份|所有 Anthropic 功能都可用/)
  })

  it('distinguishes Anthropic authentication and version headers', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /x-api-key 是认证请求头，anthropic-version 是 API 版本请求头/)
    assert.doesNotMatch(output, /x-api-key 和 anthropic-version 是认证请求头/)
  })

  it('rejects fixed-price literals and English/protocol overclaims in Chinese output', () => {
    const output = generateZhLlmsFullTxt()

    assert.doesNotMatch(output, fixedPricePattern)
    assert.doesNotMatch(output, /Tokeness is an AI API gateway|Minimum onboarding flow: sign in, top up/)
    assert.doesNotMatch(output, /所有 Anthropic 功能都可用|保证模型身份|(?<!不能)仅凭返回内容证明模型身份/)
  })
})
