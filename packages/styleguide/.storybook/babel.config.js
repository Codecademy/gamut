module.exports = {
  extends: '../../../babel.config.js',
  presets: ['@babel/preset-typescript'],
  plugins: ['macros'],
  ignore: [],
  env: {
    test: {
      plugins: ['require-context-hook'],
    },
  },
};
