const configs = {
  common: require('./common'),
  server: require('./server'),
  dev: require('./dev'),
  devServer: require('./dev-server'),
  optimize: require('./optimize'),
  extract: require('./extract'),
  babel: require('./babel')
};

module.exports = configs;
