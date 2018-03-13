const Linter = require('eslint').Linter;

const config = require('../dist/index.json');

describe('eslint config codecademy', () => {
  it('outputs a valid config', () => {
    const linter = new Linter();
    const codeSample = `
      console.log('hello world');
    `;
    const results = linter.verify(codeSample, config);
    console.log(config);
    expect(results).toEqual(true);
  });
});
