import { testConfig } from '../__fixtures__/testConfig';
import { orderPropNames } from '../propNames';

describe('orderPropNames', () => {
  it('orders shorthand properties before longhand', () => {
    const result = orderPropNames({
      test2: {
        property: 'marginLeft',
      },
      test: {
        property: 'margin',
      },
    });

    expect(result).toEqual(['test', 'test2']);
  });

  it('orders higher precendence longhand properties before lower precendence', () => {
    const result = orderPropNames({
      test2: {
        property: 'border',
      },
      test: {
        property: 'borderTop',
      },
    });

    expect(result).toEqual(['test2', 'test']);
  });
  it('orders higher precendence longhand properties before many lower precedence props', () => {
    const result = orderPropNames({
      test2: {
        property: 'border',
      },
      test: {
        property: 'borderBottom',
      },
      test3: {
        property: 'borderTop',
      },
    });

    expect(result).toEqual(['test2', 'test3', 'test']);
  });
  it('orders non-shorthand properties by length of properties responsible', () => {
    const result = orderPropNames({
      marginX: {
        property: 'margin',
        properties: ['marginLeft', 'marginRight'],
      },
      marginY: {
        property: 'margin',
        properties: ['marginTop', 'marginBottom'],
      },
      margin: {
        property: 'margin',
        properties: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
      },
    });

    expect(result).toEqual(['margin', 'marginX', 'marginY']);
  });
  it('orders non-shorthand properties by length of properties responsible', () => {
    const result = orderPropNames({
      marginX: {
        property: 'margin',
        properties: ['marginLeft', 'marginRight'],
      },
      marginY: {
        property: 'margin',
        properties: ['marginTop', 'marginBottom'],
      },
      margin: {
        property: 'margin',
        properties: ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'],
      },
      marginLeft: {
        property: 'marginLeft',
      },
    });

    expect(result).toEqual(['margin', 'marginX', 'marginY', 'marginLeft']);
  });
  it('orders all props', () => {
    const result = orderPropNames(testConfig);

    expect(result).toEqual([
      'border',
      'borderX',
      'borderY',
      'borderTop',
      'borderBottom',
      'borderLeft',
      'borderRight',
      'borderWidth',
      'borderWidthX',
      'borderWidthY',
      'borderStyle',
      'borderStyleX',
      'borderStyleY',
      'borderColor',
      'borderColorX',
      'borderColorY',
      'flex',
      'm',
      'mx',
      'my',
      'p',
      'px',
      'py',
      // end shorthands
      'textColor',
      'bg',
      'borderColorLeft',
      'borderColorRight',
      'borderColorTop',
      'borderColorBottom',
      'borderRadius',
      'borderRadiusLeft',
      'borderRadiusTop',
      'borderRadiusBottom',
      'borderRadiusRight',
      'flexBasis',
      'pt',
      'pb',
      'pr',
      'pl',
      'mt',
      'mb',
      'mr',
      'ml',
    ]);
  });
});
