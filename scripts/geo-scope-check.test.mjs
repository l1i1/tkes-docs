import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawnSync } from 'node:child_process'
import { describe, it } from 'node:test'
import { fileURLToPath } from 'node:url'

const scriptPath = fileURLToPath(new URL('./geo-scope-check.mjs', import.meta.url))
const allowPrefix = 'apps/docs/'
const baselinePaths = [
  'apps/docs/.vitepress/config.mts',
  'apps/newapi-home/README.md'
]
const currentPaths = [...baselinePaths, 'apps/docs/scripts/geo-scope-check.mjs']

const writePathList = (path, paths) => writeFileSync(path, `${paths.join('\n')}\n`, 'utf8')

const createFixture = ({ baselineText, currentText, currentPaths: fixtureCurrentPaths }) => {
  const directory = mkdtempSync(join(tmpdir(), 'tokeness-geo-scope-'))
  const baselinePath = join(directory, 'baseline-paths.txt')
  const currentPath = join(directory, 'current-paths.txt')

  writeFileSync(baselinePath, baselineText ?? `${baselinePaths.join('\n')}\n`, 'utf8')
  if (currentText !== undefined) {
    writeFileSync(currentPath, currentText, 'utf8')
  } else {
    writePathList(currentPath, fixtureCurrentPaths ?? currentPaths)
  }

  return { directory, baselinePath, currentPath }
}

const runCli = ({ baselinePath, currentPath, prefix = allowPrefix }) => spawnSync(
  process.execPath,
  [scriptPath, '--baseline', baselinePath, '--current', currentPath, '--allow-prefix', prefix],
  { encoding: 'utf8' }
)

const withFixture = (fixtureInput, callback) => {
  const fixture = createFixture(fixtureInput)
  try {
    return callback(fixture)
  } finally {
    rmSync(fixture.directory, { recursive: true, force: true })
  }
}

describe('baseline path model', () => {
  it('characterizes only post-baseline paths as changes', () => {
    const baseline = new Set(baselinePaths)
    const postBaselinePaths = currentPaths.filter((path) => !baseline.has(path))

    assert.deepEqual(postBaselinePaths, ['apps/docs/scripts/geo-scope-check.mjs'])
  })

  it('characterizes an empty current list as no post-baseline changes', () => {
    const baseline = new Set(baselinePaths)

    assert.deepEqual([].filter((path) => !baseline.has(path)), [])
  })
})

describe('geo scope CLI', () => {
  it('allows docs-only additions while preserving pre-existing dirty paths', () => {
    withFixture({ currentPaths }, ({ baselinePath, currentPath }) => {
      const result = runCli({ baselinePath, currentPath })

      assert.equal(result.status, 0)
      assert.equal(result.stdout, 'SCOPE_OK\n')
      assert.equal(result.stderr, '')
    })
  })

  it('rejects a new outside path with the stable scope error and no success output', () => {
    withFixture({
      currentPaths: [...baselinePaths, 'apps/newapi-home/new-file.md']
    }, ({ baselinePath, currentPath }) => {
      const result = runCli({ baselinePath, currentPath })

      assert.equal(result.status, 1)
      assert.equal(result.stdout, '')
      assert.equal(result.stderr, 'SCOPE_OUT_OF_ALLOWLIST\n')
    })
  })

  it('rejects malformed path-list input without leaking parser details', () => {
    withFixture({
      baselineText: 'apps/docs/index.md\n\n',
      fixtureCurrentPaths: ['apps/docs/index.md']
    }, ({ baselinePath, currentPath }) => {
      const result = runCli({ baselinePath, currentPath })

      assert.equal(result.status, 2)
      assert.equal(result.stdout, '')
      assert.equal(result.stderr, 'INVALID_PATH_LIST\n')
    })
  })

  it('rejects embedded carriage returns even when CRLF lines are present', () => {
    withFixture({
      baselineText: 'apps/docs/index.md\r\n',
      currentText: 'apps/docs/index.md\r\napps/docs/with\rreturn.md\r\n'
    }, ({ baselinePath, currentPath }) => {
      const result = runCli({ baselinePath, currentPath })

      assert.equal(result.status, 2)
      assert.equal(result.stdout, '')
      assert.equal(result.stderr, 'INVALID_PATH_LIST\n')
    })
  })

  it('rejects a missing path-list input with a stable input error', () => {
    withFixture({ fixtureCurrentPaths: ['apps/docs/index.md'] }, ({ baselinePath, directory }) => {
      const missingCurrentPath = join(directory, 'missing-current-paths.txt')
      const result = runCli({ baselinePath, currentPath: missingCurrentPath })

      assert.equal(result.status, 2)
      assert.equal(result.stdout, '')
      assert.equal(result.stderr, 'INVALID_PATH_LIST\n')
    })
  })

  it('fails closed when a stale baseline misses a newly introduced outside path', () => {
    withFixture({
      baselineText: 'apps/docs/index.md\n',
      fixtureCurrentPaths: ['apps/docs/index.md', 'apps/seo-site/index.html']
    }, ({ baselinePath, currentPath }) => {
      const result = runCli({ baselinePath, currentPath })

      assert.equal(result.status, 1)
      assert.equal(result.stdout, '')
      assert.equal(result.stderr, 'SCOPE_OUT_OF_ALLOWLIST\n')
    })
  })

  it('produces the same result across repeated invocations before fixture cleanup', () => {
    withFixture({ currentPaths }, ({ baselinePath, currentPath }) => {
      const first = runCli({ baselinePath, currentPath })
      const second = runCli({ baselinePath, currentPath })

      assert.equal(first.status, 0)
      assert.equal(second.status, 0)
      assert.equal(first.stdout, second.stdout)
      assert.equal(first.stderr, second.stderr)
      assert.equal(readFileSync(currentPath, 'utf8'), `${currentPaths.join('\n')}\n`)
    })
  })
})
