module.exports = {
  extends: './packages/babel-preset-codecademy/index.js',
  presets: ['@babel/preset-typescript'],
  plugins: ['macros', 'react-anonymous-display-name'],
  ignore: [],
};
