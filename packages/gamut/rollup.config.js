import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import postcss from 'rollup-plugin-postcss';
import ignoreImport from 'rollup-plugin-ignore-import';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/bundle.js',
      format: 'cjs',
    },
    {
      file: 'dist/bundle.esm.js',
      format: 'esm',
    },
  ],
  // external: ['react', 'react-dom'],
  plugins: [
    resolve({ extensions }),
    ignoreImport({}),
    babel({ extensions }),
    postcss({
      modules: true,
      extract: true,
    }),
  ],
};
