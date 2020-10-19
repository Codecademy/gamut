module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: [
    'react-anonymous-display-name',
    [
      'emotion',
      {
        sourceMap: true,
        autoLabel: process.env.NODE_ENV !== 'production',
        labelFormat: '[local]',
        cssPropOptimization: true,
      },
    ],
  ],
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
