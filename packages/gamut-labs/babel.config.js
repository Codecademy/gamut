module.exports = {
  extends: '../../babel.config.js',
  presets: ['@babel/preset-typescript'],
  plugins: ['react-anonymous-display-name'],
  include: ['./src/**/*'],
  ignore: ['__tests__', './**/*.d.ts'],
};
