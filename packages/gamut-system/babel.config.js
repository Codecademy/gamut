module.exports = {
  extends: '../../babel.config.js',
  presets: ['@babel/preset-typescript'],
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
