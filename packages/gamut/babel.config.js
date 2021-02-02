module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
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
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
