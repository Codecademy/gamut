const babel = {
  default: {
    test: /\.js?$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
};

module.exports = babel;
