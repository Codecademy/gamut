import { createDirectionalStyleTemplate } from '..';

describe(createDirectionalStyleTemplate, () => {
  it('creates a property function', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const templatedStyles = styleTemplate({ margin: '10px' });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
    });
  });

  it('accepts a custom transform function', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => `${(val as number) * 2}px`,
    });

    const templatedStyles = styleTemplate({ margin: 5 });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
    });
  });

  it('does not template base when no configuration is given', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const leftStyles = styleTemplate({ marginLeft: '10px' });
    expect(leftStyles).toEqual({ marginLeft: '10px' });

    const YStyles = styleTemplate({ marginY: '10px' });
    expect(YStyles).toEqual({ marginTop: '10px', marginBottom: '10px' });
  });

  describe('directional overrides', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const directionalOverrides = {
      xAxis: [
        { margin: '10px', marginX: '5px' },
        {
          marginTop: '10px',
          marginRight: '5px',
          marginBottom: '10px',
          marginLeft: '5px',
        },
      ],
      yAxis: [
        { margin: '10px', marginY: '5px' },
        {
          marginTop: '5px',
          marginRight: '10px',
          marginBottom: '5px',
          marginLeft: '10px',
        },
      ],
      top: [
        {
          margin: '10px',
          marginY: '15px',
          marginTop: '20px',
        },
        {
          marginTop: '20px',
          marginRight: '10px',
          marginBottom: '15px',
          marginLeft: '10px',
        },
      ],
      bottom: [
        {
          margin: '10px',
          marginY: '15px',
          marginBottom: '20px',
        },
        {
          marginTop: '15px',
          marginRight: '10px',
          marginBottom: '20px',
          marginLeft: '10px',
        },
      ],
      left: [
        {
          margin: '10px',
          marginX: '15px',
          marginLeft: '20px',
        },
        {
          marginTop: '10px',
          marginRight: '15px',
          marginBottom: '10px',
          marginLeft: '20px',
        },
      ],
      right: [
        {
          margin: '10px',
          marginX: '15px',
          marginRight: '20px',
        },
        {
          marginTop: '10px',
          marginRight: '20px',
          marginBottom: '10px',
          marginLeft: '15px',
        },
      ],
    };

    Object.keys(directionalOverrides).forEach((key) => {
      const [props, expected] = directionalOverrides[
        key as keyof typeof directionalOverrides
      ];

      it(`overrides the ${key} propeties when configured`, () => {
        expect(styleTemplate(props)).toEqual(expected);
      });
    });
  });

  it('looks up literal map scale values when configured', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: { sm: '10px' },
    });

    const themeValues = styleTemplate({ marginTop: 'sm' });
    expect(themeValues).toEqual({ marginTop: '10px' });
  });

  it('if literal map scale values cannot be found it returns the the original value', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: { sm: '10px' },
    });

    const themeValues = styleTemplate({ marginTop: 'notSm' });
    expect(themeValues).toEqual({ marginTop: 'notSm' });
  });

  it('returns the original value if array scale values are provided', () => {
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: ['10px', '20px'],
    });

    const themeValues = styleTemplate({ marginTop: 'sms' });
    expect(themeValues).toEqual({ marginTop: 'sms' });
  });

  it('looks up theme map scale values when configured with a theme scale', () => {
    const theme = { spacing: { sm: '10px', md: '20px' } };
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ marginTop: 'sm', theme });
    expect(themeValues).toEqual({ marginTop: '10px' });
  });

  it('if theme map scale values cannot be found it returns the the original value, when configured with a theme scale', () => {
    const theme = { spacing: { sm: '10px', md: '20px' } };
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ marginTop: 'sms', theme });
    expect(themeValues).toEqual({ marginTop: 'sms' });
  });

  it('returns the original value if array scale values are provided', () => {
    const theme = { spacing: [10, 20] };
    const styleTemplate = createDirectionalStyleTemplate({
      propName: 'margin',
      computeValue: (val) => val,
      scale: 'spacing',
    });

    const themeValues = styleTemplate({ marginTop: 'sms', theme });
    expect(themeValues).toEqual({ marginTop: 'sms' });
  });
});
