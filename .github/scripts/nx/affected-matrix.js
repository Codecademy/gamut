const affectedMatrix = require('../../../libs/nx/affected-matrix/src/index.js');

module.exports = async ({ core }) => {
  return await affectedMatrix({ core });
};
