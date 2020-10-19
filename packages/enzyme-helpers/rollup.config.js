import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

// eslint-disable-next-line import/no-default-export
export default {
  input: 'src/main.js',
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
  external: ['react', 'react-dom', 'enzyme', 'enzyme-adapter-react-16'],
  plugins: [resolve(), babel({ exclude: 'node_modules/** ' })],
};
