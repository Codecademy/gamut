module.exports = {
  extends: '../../babel.defaults.js',
  presets: ['codecademy', '@babel/preset-typescript'],
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
  include: ['./src/**/*'],
};
