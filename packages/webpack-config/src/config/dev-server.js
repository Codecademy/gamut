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

      serve: {
        port,
        devMiddleware: {
          publicPath: publicPath || `http://localhost:${port}/dist/`,
          headers: { 'Access-Control-Allow-Origin': '*' },
          stats: {
            chunkGroups: true,
          },
        },
        hotClient: {
          hot: true,
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
