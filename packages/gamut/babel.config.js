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
        '@codecademy/gamut-styles': {
          styled: {
            canonicalImport: ['@emotion/styled', 'default'],
            styledBaseImport: ['@codecademy/gamut-styles', 'styled'],
          },
        },
      },
    ],
  ],
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
