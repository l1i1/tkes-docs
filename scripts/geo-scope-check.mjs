import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const currentFile = fileURLToPath(import.meta.url)

class CliError extends Error {
  constructor(code) {
    super(code)
    this.code = code
  }
}

const invalidInput = () => {
  throw new CliError('INVALID_PATH_LIST')
}

const isRelativePath = (path) => {
  if (path.length === 0 || path.trim() !== path || path.includes('\0') || path.includes('\r')) return false
  if (path.startsWith('/') || /^[A-Za-z]:/.test(path) || path.includes('\\')) return false

  const segments = path.split('/')
  return !segments.some((segment) => segment === '' || segment === '.' || segment === '..')
}

export const parsePathList = (text) => {
  if (text.includes('\0') || text.includes('\r') && !text.includes('\r\n')) invalidInput()

  const normalizedText = text.replaceAll('\r\n', '\n')
  const body = normalizedText.endsWith('\n') ? normalizedText.slice(0, -1) : normalizedText
  if (body.length === 0) return []

  const paths = body.split('\n')
  if (!paths.every(isRelativePath)) invalidInput()
  return paths
}

export const readPathList = (path) => {
  try {
    return parsePathList(readFileSync(path, 'utf8'))
  } catch (error) {
    if (error instanceof CliError) throw error
    invalidInput()
  }
}

export const findPostBaselinePaths = ({ baselinePaths, currentPaths }) => {
  const baseline = new Set(baselinePaths)
  return [...new Set(currentPaths)].filter((path) => !baseline.has(path))
}

export const validateScope = ({ baselinePaths, currentPaths, allowPrefix }) => {
  if (!allowPrefix.endsWith('/') || !isRelativePath(allowPrefix.slice(0, -1))) invalidInput()

  const postBaselinePaths = findPostBaselinePaths({ baselinePaths, currentPaths })
  const outOfAllowlistPaths = postBaselinePaths.filter((path) => !path.startsWith(allowPrefix))

  return { postBaselinePaths, outOfAllowlistPaths }
}

const parseArguments = (argv) => {
  const options = new Map()
  for (let index = 0; index < argv.length; index += 1) {
    const option = argv[index]
    const value = argv[index + 1]
    if (!['--baseline', '--current', '--allow-prefix'].includes(option) || value === undefined || value.startsWith('--')) {
      invalidInput()
    }
    if (options.has(option)) invalidInput()
    options.set(option, value)
    index += 1
  }

  if (options.size !== 3) invalidInput()
  return {
    baselinePath: options.get('--baseline'),
    currentPath: options.get('--current'),
    allowPrefix: options.get('--allow-prefix')
  }
}

export const run = (argv, output = process) => {
  try {
    const { baselinePath, currentPath, allowPrefix } = parseArguments(argv)
    const result = validateScope({
      baselinePaths: readPathList(baselinePath),
      currentPaths: readPathList(currentPath),
      allowPrefix
    })

    if (result.outOfAllowlistPaths.length > 0) {
      output.stderr.write('SCOPE_OUT_OF_ALLOWLIST\n')
      return 1
    }

    output.stdout.write('SCOPE_OK\n')
    return 0
  } catch (error) {
    const code = error instanceof CliError ? error.code : 'INVALID_PATH_LIST'
    output.stderr.write(`${code}\n`)
    return 2
  }
}

if (process.argv[1] && resolve(process.argv[1]) === currentFile) {
  process.exitCode = run(process.argv.slice(2))
}
