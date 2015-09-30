import _ from 'lodash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

let SCSSDefaults = '!css?-minimize&sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass?sourceMap';
let CSSDefaults = '!css?-minimize&modules&sourceMap';

let loader = function(options) {
  return (opts) => _.extend({}, options, opts);
};

let loaders = {
  babel: loader({
    test: /\.js?$/,
    loader: 'babel',
    query: {
      loose: true,
      cacheDirectory: true,
      optional: [
        'es7.objectRestSpread'
      ]
    }
  }),
  css: {
    default: loader({
      test: /\.css?$/,
      loader: `style${CSSDefaults}`
    }),
    extracted: loader({
      test: /\.css?$/,
      loader: ExtractTextPlugin.extract('style', CSSDefaults)
    })
  },
  scss: {
    default: loader({
      test: /\.scss?$/,
      loader: `style${SCSSDefaults}`
    }),
    extracted: loader({
      test: /\.scss?$/,
      loader: ExtractTextPlugin.extract('style', SCSSDefaults)
    })
  },
  json: loader({
    test: /\.json?$/,
    loader: 'json'
  })
};

export default loaders;
