import { standardProperty } from '..';

describe(standardProperty, () => {
  it('creates a property function', () => {
    const propFunction = standardProperty('display', (val) => val as string);

    const templatedStyles = propFunction({ display: 'block' });
    expect(templatedStyles).toEqual('display: block;');
  });
  it('accepts a custom transform function', () => {
    const doubleMargin = standardProperty(
      'margin',
      (val) => `${(val as number) * 2}px`
    );

    const templatedStyles = doubleMargin({ margin: 4 });
    expect(templatedStyles).toEqual('margin: 8px;');
  });
  it('does not return a rule if not given a a value', () => {
    const propFunction = standardProperty('display', (val) => val as string);

    const templatedStyles = propFunction({ display: undefined });
    expect(templatedStyles).toEqual('');

    const emptyPropsStyles = propFunction({});
    expect(emptyPropsStyles).toEqual('');
  });
  it('returns a rule if prop value is falsy', () => {
    const propFunction = standardProperty('margin', (val) => val as string);

    const falsyValueStyles = propFunction({ margin: 0 });
    expect(falsyValueStyles).toEqual('margin: 0;');
  });
});
