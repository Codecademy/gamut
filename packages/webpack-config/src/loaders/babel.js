const babel = {
  default: {
    test: /\.js?$/,
    loader: 'babel-loader',
    exclude(modulePath) {
      return (
        /node_modules/.test(modulePath) &&
        !/node_modules\/@codecademy/.test(modulePath)
      );
    },
    options: {
      cacheDirectory: true,
      presets: ['codecademy'],
    },
  },
};

module.exports = babel;
