module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    'macros',
    'react-anonymous-display-name',
    [
      '@emotion',
      {
        sourceMap: true,
        autoLabel: 'dev-only',
        labelFormat: '[local]',
      },
    ],
  ],
  ignore: [],
};
