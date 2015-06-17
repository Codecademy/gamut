var _ = require('lodash');
var base = require('./colors/base');
var lp = require('./colors/lp');
var schemes = require('./colors/schemes');

var output = {
  color: _.extend({}, base, lp, schemes)
};

module.exports = output;
