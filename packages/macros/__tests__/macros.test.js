'use strict';

const babel = require('@babel/core');
const path = require('path');

const options = {
  plugins: [require.resolve('babel-plugin-macros')],
};
const resolvePath = (relative) => path.resolve(__dirname, relative);

describe('title.macro', () => {
  test('should transform a js file', () => {
    const inputFile = resolvePath('../example/stories/World/Hello.js');
    const result = babel.transformFileSync(inputFile, options);

    expect(result.code).toMatchSnapshot();
  });

  test('should transform a story file', () => {
    const inputFile = resolvePath(
      '../example/stories/World/Example.stories.js'
    );
    const result = babel.transformFileSync(inputFile, options);

    expect(result.code).toMatchSnapshot();
  });
});
