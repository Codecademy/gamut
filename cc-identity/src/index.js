var _ = require('lodash');
var base = require('./colors/base');
var lp = require('./colors/lp');

var output = {
  color: _.extend({}, base, lp)
};

module.exports = output;
