import _ from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const CSS_CLIENT_PREFIX = '!css';
const CSS_SERVER_PREFIX = 'css/locals';

const SCSS_OPTIONS = '?-minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap';
const CSS_OPTIONS = '?-minimize&sourceMap';

const SCSS_CLIENT = `${CSS_CLIENT_PREFIX}${SCSS_OPTIONS}`;
const SCSS_SERVER = `${CSS_SERVER_PREFIX}${SCSS_OPTIONS}`;

const CSS_CLIENT = `${CSS_CLIENT_PREFIX}${CSS_OPTIONS}`;
const CSS_SERVER = `${CSS_SERVER_PREFIX}${CSS_OPTIONS}`;

export let loader = function(options) {
  return (opts) => _.extend({}, options, opts);
};

let loaders = {
  babel: loader({
    test: /\.js?$/,
    loader: 'babel?cacheDirectory'
  }),
  css: {
    default: loader({
      test: /\.css?$/,
      loader: `style${CSS_CLIENT}`
    }),
    extracted: loader({
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('style', CSS_CLIENT)
    }),
    server: loader({
      test: /\.css?$/,
      loader: CSS_SERVER
    })
  },
  scss: {
    default: loader({
      test: /\.scss?$/,
      loader: `style${SCSS_CLIENT}`
    }),
    extracted: loader({
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract('style', SCSS_CLIENT)
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

export default loaders;
