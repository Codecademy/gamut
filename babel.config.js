module.exports = {
  babelrcRoots: ['*'],
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    'macros',
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
