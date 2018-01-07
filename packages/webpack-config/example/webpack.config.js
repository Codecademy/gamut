
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const { createConfig } = require('../src');

module.exports = createConfig()
  .common({
    context: __dirname
  })
  .optimize()
  .extract()
  .merge({
    plugins: [
      new CommonsChunkPlugin({
        name: 'runtime'
      })
    ]
  })
  .toConfig();
