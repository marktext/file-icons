const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { pathToFileURL } = require('node:url')
const packageJson = require('../package.json')

const root = path.resolve(__dirname, '..')
const files = [
  ['deno.json', 'deno-icon'],
  ['deno.jsonc', 'deno-icon'],
  ['main.gdshader', 'godot-icon'],
  ['eslint.config.js', 'eslint-icon'],
  ['eslint.config.mjs', 'eslint-icon'],
  ['eslint.config.ts', 'eslint-icon'],
  ['requirements-base.txt', 'pypi-icon'],
  ['.clang-format-ignore', 'llvm-icon'],
  ['main.scriptSuite', 'code-icon'],
  ['index.js', 'js-icon'],
  ['README.md', 'book-icon'],
  ['test.py', 'python-icon'],
  ['document.pdf', 'icon-file-pdf'],
  ['document.txt', 'icon-file-text']
]
const languages = [
  ['javascript', 'js-icon'],
  ['typescript', 'ts-icon'],
  ['python', 'python-icon'],
  ['markdown', 'markdown-icon'],
  ['rust', 'rust-icon'],
  ['shellscript', 'terminal-icon'],
  ['tsx', 'tsx-icon']
]

async function main () {
  const commonjs = require(path.resolve(root, packageJson.main))
  const esm = await import(pathToFileURL(path.resolve(root, packageJson.module)).href)
  const cssPath = path.resolve(root, 'build/index.css')
  const css = fs.readFileSync(cssPath, 'utf8')

  assert.deepEqual(Object.keys(esm), ['default'], 'ESM provides a default export')
  for (const icons of [commonjs, esm.default]) {
    for (const [method, fixtures] of [['matchName', files], ['matchLanguage', languages]]) {
      for (const [input, expected] of fixtures) {
        const icon = icons[method](input)
        assert.equal(icon?.icon, expected, `${method}(${input})`)
        assert.ok(css.includes(`.${icon.icon}:`), `CSS includes ${icon.icon}`)
        assert.equal(icon.getClass(), expected)
        assert.deepEqual(icon.getClass(0, true), [expected, icon.colour[0]])
      }
    }
    assert.equal(icons.matchName('unknown.file-icons-test-extension'), null)
    assert.equal(icons.matchLanguage('unknown-file-icons-test-language'), null)
  }

  const fontUrls = [...css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)].map(match => match[1])
  assert.equal(new Set(fontUrls).size, 5, 'CSS references all five fonts')
  for (const url of fontUrls) {
    const font = fs.readFileSync(path.resolve(path.dirname(cssPath), url))
    assert.equal(font.toString('ascii', 0, 4), 'wOF2', `${url} is a WOFF2 font`)
  }
  for (const icon of ['calendar', 'youtube', 'jira', 'adobe-cc']) {
    assert.ok(css.includes(`.${icon}-icon:`), `CSS includes new ${icon} icon`)
  }
  console.log('Passed: CommonJS/ESM matching, CSS classes, and five WOFF2 fonts')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
