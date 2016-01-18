'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSS_CLIENT_PREFIX = '!css';
var CSS_SERVER_PREFIX = 'css/locals';

var SCSS_OPTIONS = '?-minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap';
var CSS_OPTIONS = '?-minimize&modules&sourceMap';

var SCSS_CLIENT = '' + CSS_CLIENT_PREFIX + SCSS_OPTIONS;
var SCSS_SERVER = '' + CSS_SERVER_PREFIX + SCSS_OPTIONS;

var CSS_CLIENT = '' + CSS_CLIENT_PREFIX + CSS_OPTIONS;
var CSS_SERVER = '' + CSS_SERVER_PREFIX + CSS_OPTIONS;

var loader = exports.loader = function loader(options) {
  return function (opts) {
    return _lodash2.default.extend({}, options, opts);
  };
};

var loaders = {
  babel: loader({
    test: /\.js?$/,
    loader: 'babel?cacheDirectory'
  }),
  css: {
    default: loader({
      test: /\.css?$/,
      loader: 'style' + CSS_CLIENT
    }),
    extracted: loader({
      test: /\.css?$/,
      loader: _extractTextWebpackPlugin2.default.extract('style', CSS_CLIENT)
    }),
    server: loader({
      test: /\.css?$/,
      loader: CSS_SERVER
    })
  },
  scss: {
    default: loader({
      test: /\.scss?$/,
      loader: 'style' + SCSS_CLIENT
    }),
    extracted: loader({
      test: /\.scss?$/,
      loader: _extractTextWebpackPlugin2.default.extract('style', SCSS_CLIENT)
    }),
    server: loader({
      test: /\.scss?$/,
      loader: SCSS_SERVER
    })
  },
  json: loader({
    test: /\.json?$/,
    loader: 'json'
  })
};

exports.default = loaders;
//# sourceMappingURL=loaders.js.map