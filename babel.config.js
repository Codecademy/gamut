module.exports = {
  presets: ['codecademy', '@babel/preset-typescript'],
  ignore: [],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};
