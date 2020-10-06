import { createResponsiveStyles } from '..';
import { DefaultBreakpoints } from '../../../core/system/defaultSystem';
import { ResponsiveProp } from '../../../types/props';
import { standardProperty } from '../../standardProperty';

describe(createResponsiveStyles, () => {
  const styleTemplate = {
    display: standardProperty({
      propName: 'display',
      computeValue: (val) => val,
    }),
    height: standardProperty({
      propName: 'height',
      computeValue: (val) => val,
    }),
    width: standardProperty({
      propName: 'width',
      computeValue: (val) => val,
    }),
  };

  type Theme = {};
  type PropShape = {
    height?: ResponsiveProp<DefaultBreakpoints, string>;
    width?: ResponsiveProp<DefaultBreakpoints, string>;
    display?: ResponsiveProp<DefaultBreakpoints, string>;
    theme?: any;
  };

  const propFunction = createResponsiveStyles(styleTemplate);

  it('returns empty object if styles are undefined', () => {
    const outputStyles = propFunction({
      display: undefined,
    });

    expect(outputStyles).toEqual({});
  });

  it('returns primitive prop values on the lowest breakpoint', () => {
    const outputStyles = propFunction({
      display: 'block',
    });

    expect(outputStyles).toEqual({
      display: 'block',
    });
  });

  it('Creates the correct breapoint with object syntax', () => {
    const outputStyles = propFunction({
      display: { xs: 'block' },
    });

    expect(outputStyles).toEqual({
      [DEFAULT_MEDIA_QUERIES['xs']]: {
        display: 'block',
      },
    });
  });

  it('Creates the correct breapoint with array syntax', () => {
    const outputStyles = propFunction({
      display: [, 'block'],
    });

    expect(outputStyles).toEqual({
      [DEFAULT_MEDIA_QUERIES['xs']]: {
        display: 'block',
      },
    });
  });

  it('merges smallest breakpoints with the primitive values on the lowest breakpoint', () => {
    const outputStyles = propFunction({
      display: 'block',
      width: ['5px'],
      height: { base: '5px' },
    });

    expect(outputStyles).toEqual({
      height: '5px',
      width: '5px',
      display: 'block',
    });
  });

  it('merges higher breakpoints with different props', () => {
    const outputStyles = propFunction({
      display: 'block',
      width: [, , , '5px'],
      height: { md: '5px' },
    });

    expect(outputStyles).toEqual({
      display: 'block',
      [DEFAULT_MEDIA_QUERIES['md']]: {
        width: '5px',
        height: '5px',
      },
    });
  });
});
