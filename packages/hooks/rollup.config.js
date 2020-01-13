import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-ts';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/hooks.js',
      format: 'cjs',
    },
    {
      file: 'dist/hooks.esm.js',
      format: 'esm',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [resolve(), typescript()],
};
