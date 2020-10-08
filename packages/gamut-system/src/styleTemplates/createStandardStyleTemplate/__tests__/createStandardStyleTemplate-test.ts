import { createStandardStyleTemplate } from '..';

describe(createStandardStyleTemplate, () => {
  it('creates a property function', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      computeValue: (val) => val,
    });

    const templatedStyles = styleTemplate({ display: 'block' });
    expect(templatedStyles).toEqual({ display: 'block' });
  });

  it('accepts a custom transform function', () => {
    const doubleMargin = createStandardStyleTemplate({
      propName: 'margin',
      computeValue: (val) => `${(val as number) * 2}px`,
    });

    const templatedStyles = doubleMargin({ margin: 4 });
    expect(templatedStyles).toEqual({ margin: '8px' });
  });

  it('does not return a rule if not given a a value', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      computeValue: (val) => val,
    });

    const templatedStyles = styleTemplate({ display: undefined });
    expect(templatedStyles).toBe(undefined);

    const emptyPropsStyles = styleTemplate({});
    expect(emptyPropsStyles).toBe(undefined);
  });

  it('returns a rule if prop value is falsy', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const falsyValueStyles = styleTemplate({ margin: 0 });
    expect(falsyValueStyles).toEqual({ margin: 0 });
  });
});
