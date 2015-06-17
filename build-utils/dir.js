var path = require('path');
var _ = require('lodash');

var dir = function(root) {
  return _.partial(path.join, root);
};

module.exports = dir;
