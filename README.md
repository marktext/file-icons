# File Icons

file icons used in MarkText and inspired by file-icons/atom.

![](/Users/ransixi/Documents/file-icons/assets/0429e810f5bcbd89261bc697397295c9159354f0.png)

#### Install

```shell
yarn add @marktext/file-icons
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

#### Development

```shell
yarn dev
```

And open browser at `http://127.0.0.1:3000/`

#### Build and Publish

```shell
// Build to the build folder
yarn build
// Publish to npm
yarn pub
```

#### License

MIT.
