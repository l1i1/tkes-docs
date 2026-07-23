import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

import { hasDirectAnswer, validateInventory } from './geo-content-check.mjs'

const scriptPath = fileURLToPath(new URL('./geo-content-check.mjs', import.meta.url))
const scriptDir = dirname(scriptPath)
const repositoryRoot = resolve(scriptDir, '../../..')
const selectedArticleIds = Array.from({ length: 12 }, (_, index) => String(index + 24))
const sourcePagePairs = [
  ['apps/docs/billing/pricing.md', 'apps/docs/zh/billing/pricing.md'],
  ['apps/docs/faq.md', 'apps/docs/zh/faq.md'],
  ['apps/docs/guide/api-keys.md', 'apps/docs/zh/guide/api-keys.md'],
  ['apps/docs/guide/dashboard.md', 'apps/docs/zh/guide/dashboard.md'],
  ['apps/docs/guide/getting-started.md', 'apps/docs/zh/guide/getting-started.md'],
  ['apps/docs/integrations/anthropic-api.md', 'apps/docs/zh/integrations/anthropic-api.md'],
  ['apps/docs/integrations/openai-compatible.md', 'apps/docs/zh/integrations/openai-compatible.md'],
  ['apps/docs/integrations/claude-code.md', 'apps/docs/zh/integrations/claude-code.md'],
  ['apps/docs/integrations/cursor.md', 'apps/docs/zh/integrations/cursor.md'],
  ['apps/docs/integrations/codex-cli.md', 'apps/docs/zh/integrations/codex-cli.md'],
  ['apps/docs/integrations/custom-api-key.md', 'apps/docs/zh/integrations/custom-api-key.md'],
  ['apps/docs/integrations/dify.md', 'apps/docs/zh/integrations/dify.md']
]

const makeInventory = () => ({
  inventory_version: 1,
  docs_origin: 'https://docs.tokeness.io',
  selected_article_ids: selectedArticleIds,
  articles: sourcePagePairs.map(([englishPath, chinesePath], index) => {
    const articleId = selectedArticleIds[index]
    const englishRoute = englishPath.slice('apps/docs/'.length).replace(/\.md$/, '')
    const chineseRoute = chinesePath.slice('apps/docs/'.length).replace(/\.md$/, '')
    const sourcePages = [
      { locale: 'en', local_path: englishPath, canonical_url: `https://docs.tokeness.io/${englishRoute}/` },
      { locale: 'zh', local_path: chinesePath, canonical_url: `https://docs.tokeness.io/${chineseRoute}/` }
    ]
    const isGapAware = articleId === '27'
    return {
      article_id: articleId,
      question: `How does Tokeness documentation describe integration topic ${articleId}?`,
      claim_ids: [`CLAIM_${articleId}`],
      volatility_class: 'stable_product_fact',
      limitations: ['Documentation scope is limited to the recorded configuration.'],
      owner: 'docs',
      reviewer: 'docs-reviewer',
      review_date: '2026-07-18',
      correction_path: 'Update the source page and rerun the validator.',
      direct_answer: {
        status: isGapAware ? 'missing' : 'present',
        summary: isGapAware ? 'The direct answer remains a documented gap.' : 'The source page contains a direct answer.'
      },
      semantic_coverage: {
        basis: isGapAware ? 'gap_aware' : 'human_attested',
        source_page_paths: [englishPath, chinesePath]
      },
      ...(isGapAware ? { blocked_claim_ids: [`CLAIM_${articleId}`] } : {}),
      source_pages: sourcePages,
      canonical_urls: [`https://docs.tokeness.io/${chineseRoute}/`]
    }
  })
})

const cloneInventory = () => structuredClone(makeInventory())

const articleById = (inventory, articleId = '24') => {
  const article = inventory.articles.find((entry) => entry.article_id === articleId)
  assert.ok(article, `article ${articleId} must exist in the inventory fixture`)
  return article
}

const runCli = (inventory, { root = repositoryRoot, rawInventory } = {}) => {
  const directory = mkdtempSync(join(tmpdir(), 'tokeness-geo-content-'))
  const fixturePath = join(directory, 'question-inventory.json')
  writeFileSync(fixturePath, rawInventory ?? JSON.stringify(inventory, null, 2), 'utf8')

  try {
    return spawnSync(
      process.execPath,
      [scriptPath, '--inventory', fixturePath, '--repository-root', root],
      { cwd: repositoryRoot, encoding: 'utf8' }
    )
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
}

const runRawCli = (args) => spawnSync(
  process.execPath,
  [scriptPath, ...args],
  { cwd: repositoryRoot, encoding: 'utf8' }
)

describe('question inventory baseline', () => {
  it('keeps the selected GEO article IDs exactly 24 through 35', () => {
    const inventory = makeInventory()

    assert.deepEqual(inventory.selected_article_ids, selectedArticleIds)
    assert.deepEqual(
      inventory.articles.map((article) => article.article_id),
      selectedArticleIds
    )
  })

  it('records both locale source pages and Chinese canonicals for every selected article', () => {
    const inventory = makeInventory()

    for (const article of inventory.articles) {
      assert.deepEqual([...new Set(article.source_pages.map((page) => page.locale))].sort(), ['en', 'zh'])
      assert.ok(article.canonical_urls.length > 0)
      assert.ok(article.canonical_urls.every((url) => url.startsWith('https://docs.tokeness.io/zh/')))
    }
  })

  it('characterizes direct-answer detection as a conclusion paragraph after the H1', () => {
    assert.equal(hasDirectAnswer('# Page\n\nA direct answer appears here.'), true)
    assert.equal(hasDirectAnswer('# Page\n\n## Details\n\nMore text.'), false)
    assert.equal(
      hasDirectAnswer('# Page\n\n## Details\n\nThis is a long paragraph that must not count as the conclusion.'),
      false
    )
    assert.equal(hasDirectAnswer('# Page\n\n```txt\nnot a paragraph\n```'), false)
    assert.equal(
      hasDirectAnswer('# Page\n\n> This blockquote is metadata and must not count as a direct answer.'),
      false
    )
  })
})

describe('geo content CLI contract', () => {
  it('accepts the current inventory after FAQ pages gain an H1 conclusion', () => {
    const result = runCli(makeInventory())

    assert.equal(result.status, 0)
    assert.match(result.stdout, /^GEO_CONTENT_STRUCTURE_OK\n/)
    assert.equal(result.stderr, '')
  })

  it('keeps Article 27 visibly gap-aware and missing while structural validation succeeds', () => {
    const inventory = makeInventory()
    const article = articleById(inventory, '27')
    assert.equal(article.direct_answer.status, 'missing')
    assert.equal(article.semantic_coverage.basis, 'gap_aware')

    const result = runCli(inventory)

    assert.equal(result.status, 0)
    assert.match(result.stdout, /GEO_CONTENT_STRUCTURE_OK\n/)
    assert.match(result.stdout, /GEO_CONTENT_SEMANTIC_GAP article_id=27 status=missing\n/)
    assert.equal(result.stderr, '')
  })

  it('rejects a missing source mapping with MISSING_SOURCE_PAGE and no success output', () => {
    const inventory = cloneInventory()
    articleById(inventory).source_pages = []

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SOURCE_PAGE\n/)
    assert.doesNotMatch(result.stderr, /GEO_CONTENT_STRUCTURE_OK/)
  })

  it('rejects a stale source path with MISSING_SOURCE_PAGE', () => {
    const inventory = cloneInventory()
    articleById(inventory).source_pages[0].local_path = 'apps/docs/faq-stale.md'

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SOURCE_PAGE\n/)
  })

  it('rejects a missing page canonical with MISSING_CANONICAL', () => {
    const inventory = cloneInventory()
    delete articleById(inventory).source_pages[0].canonical_url

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_CANONICAL\n/)
  })

  it('rejects a canonical that cannot resolve to the mapped page', () => {
    const inventory = cloneInventory()
    articleById(inventory).source_pages[0].canonical_url = 'https://docs.tokeness.io/zh/faq-other/'

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /UNRESOLVED_CANONICAL\n/)
  })

  it('rejects an inventory without a direct-answer assessment', () => {
    const inventory = cloneInventory()
    delete articleById(inventory).direct_answer

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_DIRECT_ANSWER\n/)
  })

  it('rejects an inventory without semantic coverage attestation', () => {
    const inventory = cloneInventory()
    delete articleById(inventory).semantic_coverage

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SEMANTIC_COVERAGE\n/)
  })

  it('rejects stale semantic coverage when every direct answer is marked missing', () => {
    const inventory = cloneInventory()
    for (const article of inventory.articles) article.direct_answer.status = 'missing'

    const result = runCli(inventory)

    assert.equal(result.status, 1, 'all-missing assessments must not pass as complete coverage')
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SEMANTIC_COVERAGE\n/)
  })

  it('rejects an unrelated existing source mapping without a matching semantic attestation', () => {
    const inventory = cloneInventory()
    const article = articleById(inventory)
    article.source_pages = [
      { locale: 'en', local_path: 'apps/docs/guide/api-keys.md', canonical_url: 'https://docs.tokeness.io/guide/api-keys/' },
      { locale: 'zh', local_path: 'apps/docs/zh/guide/api-keys.md', canonical_url: 'https://docs.tokeness.io/zh/guide/api-keys/' }
    ]
    article.canonical_urls = ['https://docs.tokeness.io/zh/guide/api-keys/']

    const result = runCli(inventory)

    assert.equal(result.status, 1, 'existing files do not prove question-to-source relevance')
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SEMANTIC_COVERAGE\n/)
  })

  it('rejects malformed JSON with INVALID_INVENTORY', () => {
    const result = runCli(undefined, { rawInventory: '{"articles":' })

    assert.equal(result.status, 2)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /^INVALID_INVENTORY\n/)
  })

  it('rejects malformed nested inventory records with INVALID_INVENTORY', () => {
    const inventory = cloneInventory()
    articleById(inventory).claim_ids = ['CLAIM_GATEWAY', null]
    articleById(inventory).source_reference_gaps = [{ claim_id: 'CLAIM_GATEWAY', reference: 42, reason: 'bad reference type' }]

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /^INVALID_INVENTORY\n/)
  })

  it('rejects malformed CLI input with INVALID_ARGUMENTS', () => {
    const result = runRawCli(['--inventory', join(repositoryRoot, 'missing-inventory.json'), '--unexpected', 'value'])

    assert.equal(result.status, 2)
    assert.equal(result.stdout, '')
    assert.equal(result.stderr, 'INVALID_ARGUMENTS\n')
  })

  it('rejects a generated-output path as a source page', () => {
    const inventory = cloneInventory()
    articleById(inventory).source_pages[0].local_path = 'apps/docs/public/zh/faq.md'

    const result = runCli(inventory)

    assert.equal(result.status, 1)
    assert.equal(result.stdout, '')
    assert.match(result.stderr, /MISSING_SOURCE_PAGE\n/)
  })

  it('returns deterministic validation errors without changing the fixture input', () => {
    const inventory = cloneInventory()
    articleById(inventory).source_pages = []
    const serialized = JSON.stringify(inventory, null, 2)
    const result = validateInventory({ inventory, repositoryRoot })

    assert.deepEqual(result.errors, ['MISSING_SEMANTIC_COVERAGE', 'MISSING_SOURCE_PAGE', 'UNRESOLVED_CANONICAL'])
    assert.equal(JSON.stringify(inventory, null, 2), serialized)
  })
})
