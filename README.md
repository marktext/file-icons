# File Icons

File icons used in **MarkText** and inspired by [file-icons/atom](https://github.com/file-icons/atom/tree/master).

![](https://github.com/marktext/file-icons/blob/main/preview.png)

#### Installation

```shell
pnpm add @marktext/file-icons
```

#### Usage

```javascript
import fileIcons from '@marktext/file-icons'
import '@marktext/file-icons/build/index.css'

const icon = fileIcons.matchLanguage('javascript')
// iconEle.classList.add(icon.icon)
// icon with color
// iconEle.classList.add(icon.colour[0])
// iconEle.classList.add(icon.colour[1])
```

You can refer more APIs at [atom/icon-tables.js at master · file-icons/atom · GitHub](https://github.com/file-icons/atom/blob/master/lib/icons/icon-tables.js)

CommonJS consumers can use `require('@marktext/file-icons')`. ESM consumers
can use the default import. Both entries include TypeScript declarations and
use the same stylesheet at `@marktext/file-icons/build/index.css`.

```typescript
import fileIcons, { type Icon } from '@marktext/file-icons'

const icon: Icon | null = fileIcons.matchName('deno.json')
if (icon) {
  const classes: string[] = icon.getClass(0, true)
}
```

#### Development

Use Node.js 22.12+ (or 20.19+) and the pnpm version pinned in `package.json`.

```shell
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://localhost:3000/` to view the example in `examples/`. Vite serves
the TypeScript library source directly and reloads changes to code and styles.
The example renders local samples immediately, then optionally loads Prism's
language list; it also works without network access.

```shell
pnpm typecheck      # Check library, example, and Vite config types
pnpm build          # Build ESM, CommonJS, CSS, fonts, and declarations
pnpm build:example  # Build the example into dist/
pnpm preview        # Preview the built example
pnpm test           # Type, build, matching, and font regression checks
pnpm test:package   # Pack and check isolated JS/TS consumers
```

The library lives in `lib/`. Its generated files keep the existing paths:

- `build/index.js`: CommonJS entry.
- `build/index.mjs`: ESM entry.
- `build/index.d.cts` and `build/index.d.mts`: Entry point declarations.
- `build/index.css` and `build/fonts/*.woff2`: Stylesheet and external fonts.

The upstream `file-icons/atom` dependency uses a commit-specific tarball URL in
`package.json`, with its content checksum recorded in `pnpm-lock.yaml`. It is a
build dependency; the published library bundles the matching rules and fonts.
When updating it, run `pnpm install` and `pnpm test` before publishing.

#### Build and Publish

```shell
# Change the version in package.json and run the checks.
pnpm test
# Publish to npm; prepack rebuilds the package and declarations.
pnpm pub
```

#### License

MIT.
