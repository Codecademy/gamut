module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    [
      '@emotion',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
      },
    ],
  ],
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
