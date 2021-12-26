import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'


export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: false,
    }
  ],

  plugins: [
    postcss({
      minimize: false,
      modules: false,
      use: {
        less: { javascriptEnabled: true }
      },
      extract: true
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    nodeResolve(),
  ],
}