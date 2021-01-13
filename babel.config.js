module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
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
