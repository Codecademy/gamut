const webpack = require('webpack');
const path = require('path');
const babelCodecademyPreset = require('babel-preset-codecademy');
const merge = require('webpack-merge');

const ENV = process.env.NODE_ENV || 'development';

const config = {
  resolve: {
    modules: [
      path.join(__dirname, '../'),
      path.join(__dirname, '../node_modules/@codecademy/'),
    ],
    extensions: ['.js', '.json', '.scss', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules(?!(\/@codecademy))/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: [babelCodecademyPreset],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"' + ENV + '"',
      __DEV__: ENV !== 'production',
    }),
  ],
};

module.exports = defaultConfig => {
  return merge.smart(defaultConfig, config);
};
