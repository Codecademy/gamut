const webpack = require('webpack');

const optimizeConfig = () => {
  return {
    devtool: false,

    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true
      }),
      new webpack.optimize.UglifyJsPlugin()
    ]
  };
};

module.exports = optimizeConfig;
