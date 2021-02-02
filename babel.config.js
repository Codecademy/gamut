module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    'macros',
    'react-anonymous-display-name',
    [
      '@emotion',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
      },
    ],
  ],
  ignore: [],
};
