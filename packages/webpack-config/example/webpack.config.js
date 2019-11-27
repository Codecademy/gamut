const { createConfig } = require('../src');

module.exports = createConfig()
  .common({
    context: __dirname,
    env: 'production',
  })
  .babel()
  .cssExtracted()
  .merge({
    optimization: {
      runtimeChunk: {
        name: 'runtime',
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /node_modules/,
            name: 'vendor',
            chunks: 'initial',
          },
        },
      },
    },
  })
  .toConfig();
