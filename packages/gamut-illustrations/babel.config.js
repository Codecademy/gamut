module.exports = {
  extends: '../../babel.defaults.js',
  presets: [
    [
      '@nrwl/react/babel',
      {
        runtime: 'automatic',
        useBuiltIns: 'usage',
        importSource: '@emotion/react',
      },
    ],
  ],
  plugins: [
    [
      '@emotion/babel-plugin',
      {
        sourceMap: true,
        autoLabel: 'always',
        labelFormat: '[local]',
      },
    ],
  ],
};
