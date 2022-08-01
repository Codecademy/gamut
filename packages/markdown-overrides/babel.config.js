module.exports = {
  extends: '../../babel.defaults.js',
  presets: [
    [
      '@nrwl/react/babel',
      {
        runtime: 'automatic',
        useBuiltIns: 'usage',
      },
    ],
  ],
};
