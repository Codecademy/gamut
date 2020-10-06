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
});
