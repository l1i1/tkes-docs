import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import { llmsManifest } from './llms-manifest.mjs'
import { generateLlmsFullTxt, generateLlmsTxt, generateZhLlmsFullTxt, generateZhLlmsTxt } from './generate-llms.mjs'

const fixedPricePattern = /(?:¥|￥|\$|USD|CNY|RMB)\s*\d|\d+(?:\.\d+)?\s*(?:元|美元|credits?)|\d+(?:\.\d+)?\s*(?:\/|每)\s*(?:1M|百万|million)/i
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

    assert.match(output, /^## Integration Guides$/m)
    assert.match(output, /- \[OpenAI 兼容接入\]\(https:\/\/docs\.tokeness\.io\/zh\/integrations\/openai-compatible\): OpenAI SDK, Node\.js, Python, and cURL examples\./)
    assert.match(output, /- \[Full LLM content\]\(https:\/\/docs\.tokeness\.io\/zh\/llms-full\.txt\): Extended machine-readable facts and key documentation excerpts for LLM ingestion\./)
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
    assert.doesNotMatch(output, fixedPricePattern)
  })
})

describe('generateZhLlmsFullTxt', () => {
  it('renders full-page URLs under the /zh locale', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /^# Tokeness Documentation - Full LLM Context\n/)
    assert.match(output, /^URL: https:\/\/docs\.tokeness\.io\/zh\/about$/m)
    assert.match(output, /^URL: https:\/\/docs\.tokeness\.io\/zh\/guide\/getting-started$/m)
  })

  it('keeps pricing authority dynamic and avoids fixed price literals', () => {
    const output = generateZhLlmsFullTxt()

    assert.match(output, /Current model prices are authoritative in the console, model marketplace, or formal quotation\./)
    assert.doesNotMatch(output, fixedPricePattern)
  })
})
