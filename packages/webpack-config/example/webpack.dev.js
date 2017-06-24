
const { createConfig } = require('../src');

module.exports = createConfig()
  .common({
    context: __dirname
  })
  .dev()
  .devServer({
    port: 4102
  })
  .toConfig();
