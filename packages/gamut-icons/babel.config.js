module.exports = {
  extends: '../../babel.defaults.js',
  presets: [
    [
      '@babel/env',
      {
        modules: 'commonjs',
        targets: 'defaults',
      },
    ],
    [
      '@babel/react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      '@emotion/babel-plugin',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
      },
    ],
  ],
};
