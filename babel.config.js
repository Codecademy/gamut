module.exports = {
  presets: [
    'codecademy',
    '@babel/preset-typescript',
    '@emotion/babel-preset-css-prop',
  ],
  plugins: [
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
