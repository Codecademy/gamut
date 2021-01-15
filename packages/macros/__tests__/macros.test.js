'use strict';

const babel = require('@babel/core');

const options = {
  plugins: [require.resolve('babel-plugin-macros')],
};

describe('title.macro', () => {
  test('should transform a js file', () => {
    const inputFile = './example/stories/World/Hello.js';

    const result = babel.transformFileSync(inputFile, options);

    expect(result.code).toMatchSnapshot();
  });

  test('should transform a story file', () => {
    const inputFile = './example/stories/World/Example.stories.js';

    const result = babel.transformFileSync(inputFile, options);

    expect(result.code).toMatchSnapshot();
  });
});
