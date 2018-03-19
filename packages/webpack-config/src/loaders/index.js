const { css, scss } = require('./styles');
const babel = require('./babel');
const files = require('./files');

const loaders = {
  css,
  scss,
  babel,
  files,
};

module.exports = loaders;
