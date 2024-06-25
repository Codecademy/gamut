const { KnapsackReactRenderer } = require('@knapsack/renderer-react');
const { configureKnapsack } = require('@knapsack/app');
const { join } = require('path');
// doesn't work
const { version } = require('../package.json');

module.exports = configureKnapsack({
  data: join(__dirname, './data'),
  dist: join(__dirname, './dist'),
  public: join(__dirname, './public'),
  version,
  templateRenderers: [
    new KnapsackReactRenderer({
      babelConfig: {
        presets: [
          [
            '@babel/env',
            {
              modules: false,
              targets: 'defaults',
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          'macros',
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
      },
      webpackConfig: {
        module: {
          rules: [],
        },
      },
      demoWrapperPath: join(__dirname, './meta/DemoWrapper.tsx'),
    }),
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
  cloud: {
    siteId: 'codeacademy-sandbox',
    repoRoot: join(__dirname, '..'),
  },
});
