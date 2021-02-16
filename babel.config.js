module.exports = {
  presets: [
    require('./packages/babel-preset-codecademy'),
    '@babel/preset-typescript',
  ],
  plugins: ['react-anonymous-display-name'],
  ignore: [],
};
