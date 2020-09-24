import { directionalProperty } from '..';

describe(directionalProperty, () => {
  it('creates a property function', () => {
    const propFunction = directionalProperty({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const templatedStyles = propFunction({ margin: '10px' });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
    });
  });

  it('accepts a custom transform function', () => {
    const propFunction = directionalProperty({
      propName: 'margin',
      computeValue: (val) => `${(val as number) * 2}px`,
    });

    const templatedStyles = propFunction({ margin: 5 });
    expect(templatedStyles).toEqual({
      marginTop: '10px',
      marginRight: '10px',
      marginBottom: '10px',
      marginLeft: '10px',
    });
  });

  it('overrides the base property along each axis', () => {
    const propFunction = directionalProperty({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const xOverride = propFunction({ margin: '10px', marginX: '5px' });
    expect(xOverride).toEqual({
      marginTop: '10px',
      marginRight: '5px',
      marginBottom: '10px',
      marginLeft: '5px',
    });

    const yOverride = propFunction({ margin: '10px', marginY: '5px' });
    expect(yOverride).toEqual({
      marginTop: '5px',
      marginRight: '10px',
      marginBottom: '5px',
      marginLeft: '10px',
    });
  });

  it('overrides the base and axis properties when given a specific direction', () => {
    const propFunction = directionalProperty({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const topOverride = propFunction({
      margin: '10px',
      marginY: '15px',
      marginTop: '20px',
    });
    expect(topOverride).toEqual({
      marginTop: '20px',
      marginRight: '10px',
      marginBottom: '15px',
      marginLeft: '10px',
    });

    const bottomOverride = propFunction({
      margin: '10px',
      marginY: '15px',
      marginBottom: '20px',
    });
    expect(bottomOverride).toEqual({
      marginTop: '15px',
      marginRight: '10px',
      marginBottom: '20px',
      marginLeft: '10px',
    });

    const leftOverride = propFunction({
      margin: '10px',
      marginX: '15px',
      marginLeft: '20px',
    });
    expect(leftOverride).toEqual({
      marginTop: '10px',
      marginRight: '15px',
      marginBottom: '10px',
      marginLeft: '20px',
    });

    const rightOverride = propFunction({
      margin: '10px',
      marginX: '15px',
      marginRight: '20px',
    });
    expect(rightOverride).toEqual({
      marginTop: '10px',
      marginRight: '20px',
      marginBottom: '10px',
      marginLeft: '15px',
    });
  });

  it('does not template base when no configuration is given', () => {
    const propFunction = directionalProperty({
      propName: 'margin',
      computeValue: (val) => val,
    });

    const leftStyles = propFunction({ marginLeft: '10px' });
    expect(leftStyles).toEqual({ marginLeft: '10px' });

    const YStyles = propFunction({ marginY: '10px' });
    expect(YStyles).toEqual({ marginTop: '10px', marginBottom: '10px' });
  });
});
