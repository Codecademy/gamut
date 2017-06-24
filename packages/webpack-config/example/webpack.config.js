
const { createConfig } = require('../src');

module.exports = createConfig()
  .common({
    context: __dirname
  })
  .dev()
  .extract()
  .toConfig();
