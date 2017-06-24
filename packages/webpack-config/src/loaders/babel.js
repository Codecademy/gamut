const babel = {
  default: {
    test: /\.js?$/,
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      presets: ['codecademy']
    }
  }
};

module.exports = babel;
