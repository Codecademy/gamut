module.exports = {
  extends: '../../babel.config.js',
  presets: ['@babel/preset-typescript'],
  include: ['./src/**/*'],
  ignore: ['./**/*.d.ts'],
};
