import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcssUrl from 'postcss-url'
import postcss from 'rollup-plugin-postcss'
import pluginTerser from 'rollup-plugin-terser'
import packageJson from './package.json'
import path from 'path'

// postcss-url options
const options = {
  url: 'copy',
  // base path to search assets from
  basePath: path.resolve(__dirname, 'node_modules/file-icons'),
  // dir to copy assets
  assetsPath: path.resolve(__dirname, 'build/'),
  // using hash names for assets (generates from asset content)
  useHash: false
}

const isProduction = process.env.BUILD === 'production'

console.log(isProduction)

export default {
  input: 'lib/index.js',
  output: [
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: false
    }
  ],

  plugins: [
    postcss({
      plugins: [postcssUrl(options)],
      minimize: isProduction,
      modules: false,
      use: {
        less: { javascriptEnabled: true }
      },
      extract: true
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
    isProduction && pluginTerser.terser()
  ],
}