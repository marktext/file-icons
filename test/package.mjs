import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdtemp, mkdir, readdir, readFile, writeFile, copyFile, rename, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const temp = await mkdtemp(path.join(tmpdir(), 'file-icons-consumer-'))
try {
  execFileSync('pnpm', ['pack', '--pack-destination', temp], { cwd: root, stdio: 'inherit' })
  const archive = (await readdir(temp)).find(name => name.endsWith('.tgz'))
  assert.ok(archive, 'pnpm pack creates an archive')
  const scope = path.join(temp, 'node_modules/@marktext')
  await mkdir(scope, { recursive: true })
  execFileSync('tar', ['-xzf', path.join(temp, archive), '-C', scope])
  const packageDir = path.join(scope, 'file-icons')
  await rename(path.join(scope, 'package'), packageDir)
  const manifest = JSON.parse(await readFile(path.join(packageDir, 'package.json'), 'utf8'))
  assert.equal(Object.keys(manifest.dependencies ?? {}).length, 0, 'Consumers need no upstream dependencies')

  await writeFile(path.join(temp, 'package.json'), '{"private":true}')
  await writeFile(path.join(temp, 'consumer.mjs'), `
    import assert from 'node:assert/strict'
    import icons from '@marktext/file-icons'
    import { createRequire } from 'node:module'
    const require = createRequire(import.meta.url)
    assert.equal(icons.matchName('deno.json').icon, 'deno-icon')
    assert.equal(require('@marktext/file-icons').matchName('eslint.config.ts').icon, 'eslint-icon')
    assert.ok(require.resolve('@marktext/file-icons/build/index.css'))
    assert.ok(require.resolve('@marktext/file-icons/build/fonts/file-icons.woff2'))
  `)
  execFileSync(process.execPath, [path.join(temp, 'consumer.mjs')], { stdio: 'inherit' })
  for (const name of ['types.mts', 'types.cts']) {
    await copyFile(path.join(root, 'test', name), path.join(temp, name))
  }
  const config = JSON.parse(await readFile(path.join(root, 'test/tsconfig.json'), 'utf8'))
  config.compilerOptions.types = []
  await writeFile(path.join(temp, 'tsconfig.json'), JSON.stringify(config))
  execFileSync('pnpm', ['exec', 'tsc', '-p', path.join(temp, 'tsconfig.json')], { cwd: root, stdio: 'inherit' })
  console.log('Passed: packed ESM/CommonJS consumers, legacy asset paths, and standalone declarations')
} finally {
  await rm(temp, { recursive: true, force: true })
}
