const { css, scss } = require('./styles');

const loaders = {
  css,
  scss,
  babel: require('./babel'),
  files: require('./files')
};

module.exports = loaders;
