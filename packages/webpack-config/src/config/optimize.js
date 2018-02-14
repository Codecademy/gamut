const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const optimizeConfig = (options = {}) => {
  const { uglify = {} } = options;

  return {
    devtool: false,

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.NamedChunksPlugin(),
      new webpack.NamedModulesPlugin(),
      new UglifyJsPlugin(uglify)
    ]
  };
};

module.exports = optimizeConfig;
