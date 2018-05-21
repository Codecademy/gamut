const { createConfig } = require('../index');

describe('createConfig', () => {
  it('merges custom config', () => {
    const testConfig = createConfig()
      .common({
        context: __dirname,
      })
      .merge({
        entry: 'my-file.js',
      })
      .toConfig();

    expect(testConfig.entry).toEqual('my-file.js');
  });

  it('merges loaders', () => {
    const testConfig = createConfig()
      .common({
        context: __dirname,
      })
      .if(false, config =>
        config.merge({
          notInTheSnapshot: true,
        })
      )
      .mergeLoader({
        test: /\.js?$/,
        loader: 'babel-loader',
        include: [__dirname],
      })
      .toConfig();

    expect(testConfig).toMatchSnapshot();
  });
});
