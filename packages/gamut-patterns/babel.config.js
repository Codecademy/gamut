module.exports = {
  extends: '../../babel.defaults.js',
  presets: [
    [
      '@babel/env',
      {
        modules: process.env.NODE_ENV === 'test' ? 'commonjs' : false,
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
};
