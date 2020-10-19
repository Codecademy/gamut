const webpack = require('webpack');
const merge = require('webpack-merge');

const devServerConfig = (options) => {
  const { port = 3808, host = 'localhost', publicPath, ...rest } = options;

  return {
    output: {
      publicPath: publicPath || `http://localhost:${port}/dist/`,
    },

    devServer: {
      port,
      host,
      overlay: true,
      publicPath: publicPath || `http://localhost:${port}/dist/`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers':
          'X-Requested-With, content-type, Authorization',
      },
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
      },
      ...rest,
    },

    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
    ],
  };
};

module.exports = devServerConfig;
