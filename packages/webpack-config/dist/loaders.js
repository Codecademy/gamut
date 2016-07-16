'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var CSS_CLIENT_PREFIX = 'css';
var CSS_SERVER_PREFIX = 'css/locals';

// Only use debuggable class names in dev
var DEV_CSS_MODULE_IDENT = '&localIdentName=[name]__[local]___[hash:base64:5]';
var CSS_MODULE_IDENT = process.env.NODE_ENV === 'production' ? '' : DEV_CSS_MODULE_IDENT;

var SCSS_OPTIONS = '?-minimize&sourceMap&modules&importLoaders=1' + CSS_MODULE_IDENT + '!postcss-loader!sass?sourceMap';
var CSS_OPTIONS = '?-minimize&sourceMap!postcss-loader';

var SCSS_CLIENT = '' + CSS_CLIENT_PREFIX + SCSS_OPTIONS;
var SCSS_SERVER = '' + CSS_SERVER_PREFIX + SCSS_OPTIONS;

var CSS_CLIENT = '' + CSS_CLIENT_PREFIX + CSS_OPTIONS;
var CSS_SERVER = '' + CSS_SERVER_PREFIX + CSS_OPTIONS;

var loader = exports.loader = function loader(options) {
  return function (opts) {
    return _extends({}, options, opts);
  };
};

var loaders = {
  babel: loader({
    test: /\.js?$/,
    loader: 'babel?cacheDirectory'
  }),
  css: {
    'default': loader({
      test: /\.css?$/,
      loader: 'style' + CSS_CLIENT
    }),
    extracted: loader({
      test: /\.css?$/,
      loader: _extractTextWebpackPlugin2['default'].extract({
        notExtractLoader: 'style',
        extract: CSS_CLIENT
      })
    }),
    server: loader({
      test: /\.css?$/,
      loader: CSS_SERVER
    })
  },
  scss: {
    'default': loader({
      test: /\.scss?$/,
      loader: 'style' + SCSS_CLIENT
    }),
    extracted: loader({
      test: /\.scss?$/,
      loader: _extractTextWebpackPlugin2['default'].extract({
        notExtractLoader: 'style',
        extract: SCSS_CLIENT
      })
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

exports['default'] = loaders;
//# sourceMappingURL=loaders.js.map