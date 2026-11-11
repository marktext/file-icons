import { readFile, writeFile, unlink } from 'node:fs/promises'

const entry = new URL('../build/index.d.ts', import.meta.url)
const declaration = (await readFile(entry, 'utf8')).replace("import './index.less';\n", '')
await writeFile(new URL('../build/index.d.mts', import.meta.url), declaration)
await writeFile(new URL('../build/index.d.cts', import.meta.url), `import type { FileIcons } from './types.js';
declare const fileIcons: FileIcons;
export = fileIcons;
`)
await unlink(entry)
