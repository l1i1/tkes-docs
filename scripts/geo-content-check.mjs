import { readFileSync } from 'node:fs'
import { isAbsolute, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)
const docsRoot = resolve(currentFile, '../..')
const defaultRepositoryRoot = resolve(docsRoot, '../..')
const docsOrigin = 'https://docs.tokeness.ai'
const sourcePathPrefix = 'apps/docs/'
const selectedArticleIds = Array.from({ length: 12 }, (_, index) => String(index + 24))
const directAnswerStatuses = new Set(['present', 'partial', 'missing'])
const semanticCoverageBases = new Set(['human_attested', 'gap_aware'])
const volatilityClasses = new Set([
  'stable_product_fact',
  'protocol_configuration',
  'client_configuration',
  'billing_and_pricing',
  'operational_troubleshooting',
  'risk_and_availability_boundary'
])

class CliError extends Error {
  constructor(code) {
    super(code)
    this.code = code
  }
}

const addError = (errors, code) => errors.add(code)

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

const isNonEmptyStringArray = (value) => Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString)

const isStringArray = (value) => Array.isArray(value) && value.every(isNonEmptyString)

const isSourceReferenceGap = (value) => isRecord(value) && isNonEmptyString(value.claim_id) && (value.reference === null || isNonEmptyString(value.reference)) && isNonEmptyString(value.reason)

const isSafeSourcePath = (path) => {
  if (!isNonEmptyString(path) || path !== path.trim() || path.includes('\0') || path.includes('\r')) return false
  if (path.includes('\\') || path.startsWith('/') || /^[A-Za-z]:/.test(path)) return false
  if (!path.startsWith(sourcePathPrefix) || !path.endsWith('.md')) return false

  const segments = path.split('/')
  if (segments.some((segment) => segment === '' || segment === '.' || segment === '..')) return false
  return !segments.includes('public') && !segments.includes('node_modules') && !segments.includes('.vitepress')
}

const sourcePagePath = (path, repositoryRoot) => {
  if (!isSafeSourcePath(path)) return null
  const absolutePath = resolve(repositoryRoot, path)
  const docsDirectory = resolve(repositoryRoot, 'apps/docs')
  const relativePath = relative(docsDirectory, absolutePath)
  if (relativePath === '' || relativePath.startsWith('..') || isAbsolute(relativePath)) return null
  return absolutePath
}

export const canonicalUrlFor = (path) => {
  if (!isSafeSourcePath(path)) return null
  const route = path
    .slice(sourcePathPrefix.length)
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
  return `${docsOrigin}/${route.replace(/^\/+/, '')}/`
}

const hasConclusionParagraph = (lines) => {
  const headingIndex = lines.findIndex((line) => /^#\s+\S/.test(line.trim()))
  if (headingIndex === -1) return false

  for (const line of lines.slice(headingIndex + 1)) {
    const value = line.trim()
    if (value.length === 0) continue
    if (/^#{1,6}\s/.test(value)) return false
    if (value.startsWith('```') || value.startsWith('|')) continue
    if (value.startsWith('<') || value.startsWith('>') || /^[-*+]\s/.test(value) || /^\d+[.)]\s/.test(value)) continue
    return value.length >= 20
  }

  return false
}

export const hasDirectAnswer = (source) => {
  if (!isNonEmptyString(source)) return false
  const body = source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
  return hasConclusionParagraph(body.split(/\r?\n/))
}

const validateDirectAnswerAssessment = (article, errors) => {
  if (!isRecord(article.direct_answer)) return addError(errors, 'MISSING_DIRECT_ANSWER')

  if (!directAnswerStatuses.has(article.direct_answer.status) || !isNonEmptyString(article.direct_answer.summary)) addError(errors, 'MISSING_DIRECT_ANSWER')
}

const semanticGapFor = (article) => {
  if (!isRecord(article)) return null
  const status = article.direct_answer?.status
  return directAnswerStatuses.has(status) && status !== 'present' ? status : null
}

const hasSemanticGap = (article) => {
  const sourceReferenceGaps = Array.isArray(article.source_reference_gaps) ? article.source_reference_gaps : []
  const blockedClaimIds = Array.isArray(article.blocked_claim_ids) ? article.blocked_claim_ids : []
  return sourceReferenceGaps.length > 0 || blockedClaimIds.length > 0
}

const validateSemanticCoverage = (article, errors) => {
  const coverage = article.semantic_coverage
  if (!isRecord(coverage) || !semanticCoverageBases.has(coverage.basis) || !Array.isArray(coverage.source_page_paths) || coverage.source_page_paths.some((path) => !isNonEmptyString(path))) {
    addError(errors, 'MISSING_SEMANTIC_COVERAGE')
    return
  }

  const expectedBasis = article.direct_answer?.status === 'present' ? 'human_attested' : 'gap_aware'
  if (directAnswerStatuses.has(article.direct_answer?.status) && coverage.basis !== expectedBasis) {
    addError(errors, 'MISSING_SEMANTIC_COVERAGE')
  }

  if (Array.isArray(article.source_pages)) {
    const mappedPaths = article.source_pages.map((page) => page?.local_path)
    if (JSON.stringify(coverage.source_page_paths) !== JSON.stringify(mappedPaths)) {
      addError(errors, 'MISSING_SEMANTIC_COVERAGE')
    }
  }

  if (coverage.basis === 'gap_aware' && !hasSemanticGap(article)) {
    addError(errors, 'MISSING_SEMANTIC_COVERAGE')
  }
}

const validateSourcePage = ({ page, repositoryRoot, locales, zhCanonicals, errors }) => {
  if (!isRecord(page) || !isNonEmptyString(page.local_path)) return addError(errors, 'MISSING_SOURCE_PAGE')

  const absolutePath = sourcePagePath(page.local_path, repositoryRoot)
  const expectedLocale = page.local_path.startsWith(`${sourcePathPrefix}zh/`) ? 'zh' : 'en'
  if (absolutePath === null || page.locale !== expectedLocale) {
    addError(errors, 'MISSING_SOURCE_PAGE')
    return
  }
  locales.add(page.locale)

  const expectedCanonical = canonicalUrlFor(page.local_path)
  if (!isNonEmptyString(page.canonical_url)) {
    addError(errors, 'MISSING_CANONICAL')
  } else if (page.canonical_url !== expectedCanonical) {
    addError(errors, 'UNRESOLVED_CANONICAL')
  }
  if (page.locale === 'zh' && isNonEmptyString(page.canonical_url)) zhCanonicals.add(page.canonical_url)

  let source
  try {
    source = readFileSync(absolutePath, 'utf8')
  } catch {
    addError(errors, 'MISSING_SOURCE_PAGE')
    return
  }
  if (!hasDirectAnswer(source)) addError(errors, 'MISSING_DIRECT_ANSWER')
}

const validateArticle = (article, repositoryRoot, errors) => {
  if (!isRecord(article) || !isNonEmptyString(article.article_id)) {
    addError(errors, 'INVALID_INVENTORY')
    return
  }
  if (!isNonEmptyString(article.question)) addError(errors, 'INVALID_INVENTORY')
  if (!isNonEmptyStringArray(article.claim_ids)) addError(errors, 'INVALID_INVENTORY')
  if (!volatilityClasses.has(article.volatility_class)) addError(errors, 'INVALID_INVENTORY')
  if (!isNonEmptyStringArray(article.limitations)) addError(errors, 'INVALID_INVENTORY')
  if (article.blocked_claim_ids !== undefined && !isStringArray(article.blocked_claim_ids)) addError(errors, 'INVALID_INVENTORY')
  if (article.source_reference_gaps !== undefined && (!Array.isArray(article.source_reference_gaps) || !article.source_reference_gaps.every(isSourceReferenceGap))) addError(errors, 'INVALID_INVENTORY')
  for (const field of ['owner', 'reviewer', 'review_date', 'correction_path']) {
    if (!isNonEmptyString(article[field])) addError(errors, 'INVALID_INVENTORY')
  }
  validateDirectAnswerAssessment(article, errors)
  validateSemanticCoverage(article, errors)

  const locales = new Set()
  const zhCanonicals = new Set()
  if (!Array.isArray(article.source_pages) || article.source_pages.length === 0) {
    addError(errors, 'MISSING_SOURCE_PAGE')
  } else {
    for (const page of article.source_pages) {
      validateSourcePage({ page, repositoryRoot, locales, zhCanonicals, errors })
    }
  }
  if (!locales.has('en') || !locales.has('zh')) addError(errors, 'MISSING_SOURCE_PAGE')

  if (!Array.isArray(article.canonical_urls) || article.canonical_urls.length === 0) {
    addError(errors, 'MISSING_CANONICAL')
  } else {
    for (const canonical of article.canonical_urls) {
      if (!isNonEmptyString(canonical)) {
        addError(errors, 'MISSING_CANONICAL')
      } else if (!canonical.startsWith(`${docsOrigin}/zh/`) || !zhCanonicals.has(canonical)) {
        addError(errors, 'UNRESOLVED_CANONICAL')
      }
    }
  }
}

export const validateInventory = ({ inventory, repositoryRoot = defaultRepositoryRoot }) => {
  const errors = new Set()
  if (!isRecord(inventory)) return { errors: ['INVALID_INVENTORY'] }
  if (inventory.inventory_version !== 1 || inventory.docs_origin !== docsOrigin) addError(errors, 'INVALID_INVENTORY')
  if (JSON.stringify(inventory.selected_article_ids) !== JSON.stringify(selectedArticleIds)) addError(errors, 'INVALID_INVENTORY')
  if (!Array.isArray(inventory.articles) || inventory.articles.length !== selectedArticleIds.length) {
    addError(errors, 'INVALID_INVENTORY')
    return { errors: [...errors] }
  }

  const articleIds = inventory.articles.map((article) => article?.article_id)
  if (JSON.stringify(articleIds) !== JSON.stringify(selectedArticleIds)) addError(errors, 'INVALID_INVENTORY')
  for (const article of inventory.articles) validateArticle(article, repositoryRoot, errors)
  const semanticGaps = inventory.articles
    .map((article) => {
      const status = semanticGapFor(article)
      return status === null ? null : { articleId: article.article_id, status }
    })
    .filter((gap) => gap !== null)
  return { errors: [...errors], semanticGaps }
}

const parseArguments = (argv) => {
  const options = new Map()
  for (let index = 0; index < argv.length; index += 1) {
    const option = argv[index]
    const value = argv[index + 1]
    if (!['--inventory', '--repository-root'].includes(option) || value === undefined || value.startsWith('--')) {
      throw new CliError('INVALID_ARGUMENTS')
    }
    if (options.has(option)) throw new CliError('INVALID_ARGUMENTS')
    options.set(option, value)
    index += 1
  }
  if (!options.has('--inventory')) throw new CliError('INVALID_ARGUMENTS')
  return {
    inventoryPath: options.get('--inventory'),
    repositoryRoot: options.get('--repository-root') ?? defaultRepositoryRoot
  }
}

const readInventory = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'))
  } catch {
    throw new CliError('INVALID_INVENTORY')
  }
}

export const run = (argv, output = process) => {
  try {
    const { inventoryPath, repositoryRoot } = parseArguments(argv)
    const inventory = readInventory(resolve(process.cwd(), inventoryPath))
    const result = validateInventory({
      inventory,
      repositoryRoot: resolve(process.cwd(), repositoryRoot)
    })
    if (result.errors.length > 0) {
      output.stderr.write(`${result.errors.join('\n')}\n`)
      return 1
    }
    output.stdout.write('GEO_CONTENT_STRUCTURE_OK\n')
    for (const gap of result.semanticGaps) output.stdout.write(`GEO_CONTENT_SEMANTIC_GAP article_id=${gap.articleId} status=${gap.status}\n`)
    return 0
  } catch (error) {
    const code = error instanceof CliError ? error.code : 'INVALID_INVENTORY'
    output.stderr.write(`${code}\n`)
    return 2
  }
}

if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  process.exitCode = run(process.argv.slice(2))
}
