module.exports = {
  presets: [
    require('babel-preset-es2015'),
    require('babel-preset-react'),
    require('babel-preset-stage-0')
  ],
  plugins: [
    require('babel-plugin-transform-decorators-legacy').default,
    require('babel-plugin-transform-es2015-template-literals'),
    require('babel-plugin-transform-es3-member-expression-literals'),
    require('babel-plugin-transform-es3-property-literals'),
    require('babel-plugin-transform-jscript'),
    require('babel-plugin-transform-exponentiation-operator')
  ]
};
