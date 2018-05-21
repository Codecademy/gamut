const { createConfig } = require('../src');

module.exports = createConfig()
  .common({
    context: __dirname,
    env: 'development',
  })
  .css()
  .devServer({
    port: 4102,
  })
  .toConfig();
