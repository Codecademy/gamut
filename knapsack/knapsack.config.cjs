const { KnapsackReactRenderer } = require('@knapsack/renderer-react');
const { configureKnapsack } = require('@knapsack/app');
const { join } = require('path');
const { configs } = require('@codecademy/webpack-config');
const { version } = require('../package.json');

module.exports = configureKnapsack({
  data: join(__dirname, './data'),
  dist: join(__dirname, './dist'),
  public: join(__dirname, './public'),
  version,
  templateRenderers: [
    new KnapsackReactRenderer({
      webpackConfig: {
        module: {
          rules: [
            // ...configs.css().module.rules,
            // {
            //   test: /\.mjs$/,
            //   include: /node_modules/,
            //   type: 'javascript/auto',
            // },
            {
              test: /\.(js|jsx|mjs|ts|tsx)$/,
              include: [join(__dirname, './src')],
              loader: 'babel-loader',
              options: {
                presets: [
                  [
                    '@babel/preset-react',
                    {
                      runtime: 'automatic',
                    },
                    'preset-react-jsx-transform',
                  ],
                ],
              },
            },
          ],
        },
      },
      demoWrapperPath: join(__dirname, './meta/DemoWrapper.tsx'),
    }),
  ],
  plugins: [],
  cloud: {
    siteId: 'codeacademy-sandbox',
    repoRoot: join(__dirname, '..'),
  },
});
