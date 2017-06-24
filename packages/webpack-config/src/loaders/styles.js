const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

// Only use debuggable class names in dev
const DEV_CSS_MODULE_IDENT = '[name]__[local]___[hash:base64:5]';
const CSS_MODULE_IDENT = (process.env.NODE_ENV === 'production') ? '' : DEV_CSS_MODULE_IDENT;
const SOURCEMAPS = !(process.env.NODE_ENV === 'production');

const cssFilePattern = /\.css?$/;
const cssLoaderDefaults = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    sourceMap: SOURCEMAPS,
    localIdentName: CSS_MODULE_IDENT
  }
};

const postCssLoaderDefaults = {
  loader: 'postcss-loader',
  options: {
    sourceMap: SOURCEMAPS,
    plugins: () => [
      require('autoprefixer')()
    ]
  }
};

const scssFilePattern = /\.scss?$/;
const scssLoaderDefaults = {
  loader: 'sass-loader',
  options: {
    sourceMap: SOURCEMAPS
  }
};


const css = {
  default: {
    test: cssFilePattern,
    use: [
      {
        loader: 'style-loader'
      },
      merge(cssLoaderDefaults),
      merge(postCssLoaderDefaults)
    ]
  },
  extracted: {
    test: cssFilePattern,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        merge(cssLoaderDefaults),
        merge(postCssLoaderDefaults)
      ]
    })
  },
  server: {
    test: cssFilePattern,
    use: [
      merge(cssLoaderDefaults, {
        loader: 'css-loader/locals'
      })
    ]
  }
};

const scss = {
  default: {
    test: scssFilePattern,
    use: [
      {
        loader: 'style-loader'
      },
      merge(cssLoaderDefaults, {
        options: {
          modules: true
        }
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults)
    ]
  },
  extracted: {
    test: scssFilePattern,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        merge(cssLoaderDefaults, {
          options: {
            modules: true
          }
        }),
        merge(postCssLoaderDefaults),
        merge(scssLoaderDefaults)
      ]
    })
  },
  server: {
    test: scssFilePattern,
    use: [
      merge(cssLoaderDefaults, {
        loader: 'css-loader/locals',
        options: {
          modules: true
        }
      }),
      merge(postCssLoaderDefaults),
      merge(scssLoaderDefaults)
    ]
  }
};

module.exports = {
  css,
  scss
};
