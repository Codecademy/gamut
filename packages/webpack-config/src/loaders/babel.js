const babel = {
  default: {
    test: /\.(j|t)sx?$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
    },
  },
};

module.exports = babel;
