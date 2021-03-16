module.exports = {
  extends: '../../../babel.config.js',
  presets: ['@babel/preset-typescript'],
  plugins: [
    'macros',
    'react-anonymous-display-name',
    [
      '@emotion',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
  ignore: [],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};
