const babel = {
  default: {
    test: /\.js?$/,
    loader: 'babel-loader',
    options: {
      ignore: ['node_modules'],
      cacheDirectory: true,
    },
  },
};

module.exports = babel;
