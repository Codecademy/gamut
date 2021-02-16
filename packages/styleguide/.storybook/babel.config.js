module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  plugins: ['macros', 'react-anonymous-display-name'],
  ignore: [],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};
