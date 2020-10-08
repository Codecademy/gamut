import { createResponsiveStyleTemplate } from '..';
import { DEFAULT_MEDIA_QUERIES } from '../constants';
import { createStandardStyleTemplate } from '../../createStandardStyleTemplate';
import { ResponsiveProp } from '../../../types/system';

describe(createResponsiveStyleTemplate, () => {
  const styleTemplates = {
    display: createStandardStyleTemplate({
      propName: 'display',
      computeValue: (val) => val,
    }),
    height: createStandardStyleTemplate({
      propName: 'height',
      computeValue: (val) => val,
    }),
    width: createStandardStyleTemplate({
      propName: 'width',
      computeValue: (val) => val,
    }),
  };

  type PropShape = {
    height?: ResponsiveProp<string>;
    width?: ResponsiveProp<string>;
    display?: ResponsiveProp<string>;
    theme?: any;
  };

  const propFunction = createResponsiveStyleTemplate<PropShape>({
    propNames: ['display', 'width', 'height'],
    styleTemplates,
  });

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
