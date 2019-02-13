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
});
