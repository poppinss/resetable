/*
 * resetable
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'

import pkg from './package.json'

export default [
  {
    input: 'src/index.js',

    output: [
      { file: 'dist/resetable.umd.js', format: 'umd', name: 'Resetable' },
    ],

    plugins: [
      buble({
        exclude: ['node_modules/**'],
      }),
      uglify({}, minify),
    ],
  },
  {
    input: 'src/index.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      buble({
        exclude: ['node_modules/**'],
      }),
    ],
  },
]
