import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { llmsManifest } from './llms-manifest.mjs'

const currentFile = fileURLToPath(import.meta.url)
const currentDir = dirname(currentFile)
const docsRoot = dirname(currentDir)

const absoluteUrl = (site, path) => `${site.docsUrl}${path}`

const renderLink = (site, link) => `- [${link.label}](${absoluteUrl(site, link.path)}): ${link.description}`

const compactBlankLines = (content) => `${content.trim()}\n`

const withPathPrefix = (sections, prefix) => sections.map((section) => ({
  ...section,
  links: section.links.map((link) => ({
    ...link,
    path: `${prefix}${link.path}`
  }))
}))

const renderLlmsTxt = (site, sections) => {
  const lines = [
    `# ${site.title}`,
    '',
    `> ${site.description}`,
    '>',
    `> Base URL: ${site.apiBaseUrl}`,
    `> Console: ${site.consoleUrl}`,
    `> Docs: ${site.docsUrl}`,
    '>',
    `> ${site.generatedHeader}`
  ]

  for (const section of sections) {
    lines.push('', `## ${section.heading}`, '')
    lines.push(...section.links.map((link) => renderLink(site, link)))
  }

  return compactBlankLines(lines.join('\n'))
}

export const generateLlmsTxt = (manifest = llmsManifest) => renderLlmsTxt(manifest.site, manifest.englishSections)

export const generateZhLlmsTxt = (manifest = llmsManifest) => renderLlmsTxt(manifest.site, withPathPrefix(manifest.sections, '/zh'))

const renderFullPage = (site, page) => [
  '---',
  '',
  `## Page: ${page.title}`,
  '',
  `URL: ${absoluteUrl(site, page.path)}`,
  '',
  page.body.trim()
].join('\n')

export const generateLlmsFullTxt = (manifest = llmsManifest) => {
  const { site, fullPages } = manifest
  const header = [
    `# ${site.fullTitle}`,
    '',
    `Source: ${site.docsUrl}`,
    `Canonical console: ${site.consoleUrl}`,
    `Canonical API Base URL: ${site.apiBaseUrl}`,
    '',
    site.generatedHeader,
    '',
    'This file is a compact, machine-readable source of Tokeness facts for AI crawlers and answer engines. It mirrors the official docs and avoids fixed model prices because current prices are shown in the Tokeness console.'
  ]

  return compactBlankLines([header.join('\n'), ...fullPages.map((page) => renderFullPage(site, page))].join('\n\n'))
}

export const generateZhLlmsFullTxt = (manifest = llmsManifest) => {
  const zhManifest = {
    ...manifest,
    fullPages: manifest.fullPages.map((page) => ({
      ...page,
      path: `/zh${page.path}`
    }))
  }

  return generateLlmsFullTxt(zhManifest)
}

const writeGeneratedFiles = async () => {
  await mkdir(join(docsRoot, 'public', 'zh'), { recursive: true })

  await Promise.all([
    writeFile(join(docsRoot, 'public', 'llms.txt'), generateLlmsTxt(llmsManifest)),
    writeFile(join(docsRoot, 'public', 'llms-full.txt'), generateLlmsFullTxt(llmsManifest)),
    writeFile(join(docsRoot, 'public', 'zh', 'llms.txt'), generateZhLlmsTxt(llmsManifest)),
    writeFile(join(docsRoot, 'public', 'zh', 'llms-full.txt'), generateZhLlmsFullTxt(llmsManifest))
  ])
}

if (process.argv[1] === currentFile) {
  await writeGeneratedFiles()
}
