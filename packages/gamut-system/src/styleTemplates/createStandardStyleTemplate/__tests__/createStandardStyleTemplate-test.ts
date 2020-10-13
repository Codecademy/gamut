import { createStandardStyleTemplate } from '..';

describe(createStandardStyleTemplate, () => {
  it('creates a property function', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      transformValue: (val) => val,
    });

    const templatedStyles = styleTemplate({ display: 'block' });
    expect(templatedStyles).toEqual({ display: 'block' });
  });

  it('accepts a custom transform function', () => {
    const doubleMargin = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => `${(val as number) * 2}px`,
    });

    const templatedStyles = doubleMargin({ margin: 4 });
    expect(templatedStyles).toEqual({ margin: '8px' });
  });

  it('does not return a rule if not given a a value', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'display',
      transformValue: (val) => val,
    });

    const templatedStyles = styleTemplate({ display: undefined });
    expect(templatedStyles).toBe(undefined);

    const emptyPropsStyles = styleTemplate({});
    expect(emptyPropsStyles).toBe(undefined);
  });

  it('returns a rule if prop value is falsy', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
    });

    const falsyValueStyles = styleTemplate({ margin: 0 });
    expect(falsyValueStyles).toEqual({ margin: 0 });
  });

  it('looks up literal map scale values when configured', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: {
        sm: '10px',
      },
    });

    const themeValues = styleTemplate({ margin: 'sm' });
    expect(themeValues).toEqual({ margin: '10px' });
  });

  it('if literal map scale values cannot be found it returns the the original value', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: {
        sm: '10px',
      },
    });

    const themeValues = styleTemplate({ margin: 'notSm' });
    expect(themeValues).toEqual({ margin: 'notSm' });
  });

  it('returns the original value if array scale values are provided', () => {
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: [10, 20],
    });

    const themeValues = styleTemplate({ margin: 'sms' });
    expect(themeValues).toEqual({ margin: 'sms' });
  });

  it('looks up theme map scale values when configured with a theme scale', () => {
    const theme = { spacing: { sm: '10px', md: '20px' } };
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ margin: 'sm', theme });
    expect(themeValues).toEqual({ margin: '10px' });
  });

  it('if theme map scale values cannot be found it returns the the original value, when configured with a theme scale', () => {
    const theme = { spacing: { sm: '10px', md: '20px' } };
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ margin: 'sms', theme });
    expect(themeValues).toEqual({ margin: 'sms' });
  });

  it('returns the original value if array scale values are provided', () => {
    const theme = { spacing: [10, 20] };
    const styleTemplate = createStandardStyleTemplate({
      propName: 'margin',
      transformValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ margin: 'sms', theme });
    expect(themeValues).toEqual({ margin: 'sms' });
  });

  it('can have a property used instead of propName', () => {
    const theme = { spacing: [10, 20] };
    const styleTemplate = createStandardStyleTemplate({
      propName: 'textColor',
      property: 'color',
      transformValue: (val) => val,
    });

    const themeValues = styleTemplate({ textColor: 'green', theme });
    expect(themeValues).toEqual({ color: 'green' });
  });
});
