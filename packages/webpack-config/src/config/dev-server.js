const webpack = require('webpack');
const merge = require('webpack-merge');
const babelConfig = require('./babel');

const devServerConfig = options => {
  const { port = 3808, publicPath } = options;

  return merge.smart(
    {
      output: {
        publicPath: publicPath || `http://localhost:${port}/dist/`,
      },

      devServer: {
        port,
        overlay: true,
        publicPath: publicPath || `http://localhost:${port}/dist/`,
        headers: { 'Access-Control-Allow-Origin': '*' },
        stats: {
          assets: false,
          colors: true,
          version: false,
          hash: false,
          timings: true,
          chunks: false,
          chunkModules: false,
        },
      },

      plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
      ],
    },
    babelConfig({
      options: {
        plugins: [['react-hot-loader/babel']],
      },
    })
  );
};

module.exports = devServerConfig;
