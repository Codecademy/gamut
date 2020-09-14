import { directionalProperty } from '..';

describe(directionalProperty, () => {
  it('creates a property function', () => {
    const propFunction = directionalProperty('margin', (val) => val as string);

    const templatedStyles = propFunction({ margin: '10px' });
    expect(templatedStyles).toEqual([
      'margin-top: 10px;',
      'margin-right: 10px;',
      'margin-bottom: 10px;',
      'margin-left: 10px;',
    ]);
  });

  it('accepts a custom transform function', () => {
    const propFunction = directionalProperty(
      'margin',
      (val) => `${(val as number) * 2}px`
    );

    const templatedStyles = propFunction({ margin: 5 });
    expect(templatedStyles).toEqual([
      'margin-top: 10px;',
      'margin-right: 10px;',
      'margin-bottom: 10px;',
      'margin-left: 10px;',
    ]);
  });

  it('overrides the base property along each axis', () => {
    const propFunction = directionalProperty('margin', (val) => val as string);

    const xOverride = propFunction({ margin: '10px', marginX: '5px' });
    expect(xOverride).toEqual([
      `margin-top: 10px;`,
      `margin-right: 5px;`,
      `margin-bottom: 10px;`,
      `margin-left: 5px;`,
    ]);

    const yOverride = propFunction({ margin: '10px', marginY: '5px' });
    expect(yOverride).toEqual([
      `margin-top: 5px;`,
      `margin-right: 10px;`,
      `margin-bottom: 5px;`,
      `margin-left: 10px;`,
    ]);
  });

  it('overrides the base and axis properties when given a specific direction', () => {
    const propFunction = directionalProperty('margin', (val) => val as string);

    const topOverride = propFunction({
      margin: '10px',
      marginY: '15px',
      marginTop: '20px',
    });
    expect(topOverride).toEqual([
      `margin-top: 20px;`,
      `margin-right: 10px;`,
      `margin-bottom: 15px;`,
      `margin-left: 10px;`,
    ]);

    const bottomOverride = propFunction({
      margin: '10px',
      marginY: '15px',
      marginBottom: '20px',
    });
    expect(bottomOverride).toEqual([
      `margin-top: 15px;`,
      `margin-right: 10px;`,
      `margin-bottom: 20px;`,
      `margin-left: 10px;`,
    ]);

    const leftOverride = propFunction({
      margin: '10px',
      marginX: '15px',
      marginLeft: '20px',
    });
    expect(leftOverride).toEqual([
      `margin-top: 10px;`,
      `margin-right: 15px;`,
      `margin-bottom: 10px;`,
      `margin-left: 20px;`,
    ]);

    const rightOverride = propFunction({
      margin: '10px',
      marginX: '15px',
      marginRight: '20px',
    });
    expect(rightOverride).toEqual([
      `margin-top: 10px;`,
      `margin-right: 20px;`,
      `margin-bottom: 10px;`,
      `margin-left: 15px;`,
    ]);
  });

  it('does not template base when no configuration is given', () => {
    const propFunction = directionalProperty('margin', (val) => val as string);

    const leftStyles = propFunction({ marginLeft: '10px' });
    expect(leftStyles).toEqual(['margin-left: 10px;']);

    const YStyles = propFunction({ marginY: '10px' });
    expect(YStyles).toEqual([`margin-top: 10px;`, `margin-bottom: 10px;`]);
  });
});
