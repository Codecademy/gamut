const eslintReduce = require('../index');
const Linter = require('eslint').Linter;

const fixtures = {
  basic: require('../fixtures/basic-config'),
};

describe('eslint reduce config', () => {
  it('expands extended eslint configs', () => {
    const baseConfig = {
      extends: 'eslint:recommended',
    };
    const result = eslintReduce(baseConfig);
    expect(result.rules['comma-dangle']).toEqual('off');
  });

  it("doesn't override user config", () => {
    const baseConfig = Object.assign(
      {},
      {
        extends: 'eslint:recommended',
      },
      fixtures.basic
    );
    const result = eslintReduce(baseConfig);
    expect(result.rules['comma-dangle']).toEqual(
      expect.arrayContaining(fixtures.basic.rules['comma-dangle'])
    );
  });

  it('expands relative paths', () => {
    const baseConfig = {
      extends: './fixtures/basic-config',
    };
    const result = eslintReduce(baseConfig);
    expect(result.rules['comma-dangle']).toEqual(
      expect.arrayContaining(fixtures.basic.rules['comma-dangle'])
    );
  });

  it('expands relative paths', () => {
    const baseConfig = {
      extends: './fixtures/basic-config',
    };
    const result = eslintReduce(baseConfig);
    expect(result.rules['comma-dangle']).toEqual(
      expect.arrayContaining(fixtures.basic.rules['comma-dangle'])
    );
  });
});
