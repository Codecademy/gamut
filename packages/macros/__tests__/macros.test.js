'use strict';

const babel = require('@babel/core');

const options = {
  plugins: [require.resolve('babel-plugin-macros')],
};

describe('title.macro', () => {
  test('should transform', () => {
    const inputFile = './example/stories/World/Hello.js';

    const result = babel.transformFileSync(inputFile, options);

    expect(result.code).toMatchSnapshot();
  });
});
