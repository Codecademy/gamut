const { createConfig } = require('../index');
const webpack = require('webpack');

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
  it('merges loaders without mergeLoader', () => {
    const testConfig = createConfig()
      .common({
        context: __dirname,
      })
      .merge({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', 'codecademy'],
                  plugins: ['@babel/plugin-transform-runtime'],
                },
              },
            },
          ],
        },
      })
      .merge({
        module: {
          rules: [
            {
              test: /\.js$/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['codecademy'],
                },
              },
            },
          ],
        },
      })
      .toConfig();
    console.log(JSON.stringify(testConfig.module.rules, null, 2));
    expect(testConfig).toMatchSnapshot();
  });
});
