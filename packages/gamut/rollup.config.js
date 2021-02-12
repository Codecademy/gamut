// rollup.config.js
import json from '@rollup/plugin-json';
import url from '@rollup/plugin-url';
import autoExternal from 'rollup-plugin-auto-external';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss'];

export default {
  input: './src/index.tsx',

  output: [
    {
      name: 'gamut',
      sourcemap: true,
      file: './dist/index-cjs.js',
      format: 'cjs',
    },
    {
      name: 'gamut',
      sourcemap: true,
      file: './dist/index-es.js',
      format: 'es',
    },
  ],

  plugins: [
    autoExternal(),
    postcss({
      extract: true,
      modules: true,
      use: ['sass'],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions,
    }),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions,
    }),
    commonjs(),
    url(),
    json(),
  ],

  external: ['react', 'react-dom', '@codecademy/*'],
};
