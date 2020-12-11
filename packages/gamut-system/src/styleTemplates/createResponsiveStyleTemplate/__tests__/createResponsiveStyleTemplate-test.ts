import { ResponsiveProp } from '../../../types/config';
import { createStandardStyleTemplate } from '../../createStandardStyleTemplate';
import { createResponsiveStyleTemplate } from '..';
import { DEFAULT_MEDIA_QUERIES } from '../constants';

describe(createResponsiveStyleTemplate, () => {
  const styleTemplates = {
    display: createStandardStyleTemplate({
      propName: 'display',
      transformValue: (val) => val,
    }),
    height: createStandardStyleTemplate({
      propName: 'height',
      transformValue: (val) => val,
    }),
    width: createStandardStyleTemplate({
      propName: 'width',
      transformValue: (val) => val,
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
