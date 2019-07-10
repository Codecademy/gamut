const { createConfig } = require('../index');

describe('createConfig', () => {
  it('merges custom config', () => {
    const testConfig = createConfig()
      .common({
        context: './',
      })
      .merge({
        entry: 'my-file.js',
      })
      .toConfig();

    expect(testConfig.entry).toEqual('my-file.js');
  });

  it('allows overriding minimizer', () => {
    const testConfig = createConfig()
      .common({
        env: 'production',
        context: './',
        minimizer: 'cool',
      })
      .merge({
        entry: 'my-file.js',
      })
      .toConfig();

    expect(testConfig.optimization.minimizer).toEqual('cool');
  });
});
