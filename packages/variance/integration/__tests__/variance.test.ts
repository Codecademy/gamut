import { Theme } from '@emotion/react';

import { variance } from '../../src/core';
import { createScale } from '../../src/scales/createScale';
import { transformSize } from '../../src/transforms/transformSize';
import { theme } from '../__fixtures__/theme';

const space = variance.create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

const layout = variance.create({
  width: {
    property: 'width',
    transform: (val: string) => `${parseInt(val, 10) / 16}rem`,
  },
  height: {
    property: 'height',
    transform: (val: string) => `${parseInt(val, 10) / 16}rem`,
  },
});

type Assert<X, Y> = X extends Y ? true : false;

describe('style props', () => {
  describe('parsers', () => {
    it('has the correct config', () => {
      const propNamesRestricted: Assert<
        (typeof space)['propNames'],
        ('margin' | 'padding')[]
      > = true;

      expect(propNamesRestricted);

      expect(space.propNames.sort()).toEqual(['padding', 'margin'].sort());
    });

    describe('media query styles', () => {
      it.each([
        ['no media query base value', [4], { _: 4 }],
        [
          'all media queries',
          [4, 8, 16, 24, 32, 48],
          { _: 4, xs: 8, sm: 16, md: 24, lg: 32, xl: 48 },
        ],
        ['only XS', [, 4], { xs: 4 }],
        ['SM and MD', [, , 16, 0], { sm: 16, md: 0 }],
        [
          'only MD with undefined keys',
          [, , , 0],
          { md: 0, _: undefined, sm: undefined },
        ],
      ] as const)(
        `Equivalent Syntax %s -  %o === %o`,
        (_, arraySyntax, objectSyntax) => {
          const arrayOutput = space({ margin: arraySyntax, theme });
          const objectOutput = space({ margin: objectSyntax, theme });

          expect(arrayOutput).toEqual(objectOutput);
          expect(arrayOutput).toMatchSnapshot();
        }
      );
    });
    describe('transforms', () => {
      describe('literal values', () => {
        const shapes = variance.create({
          shape: {
            property: 'height',
            properties: ['width', 'height'],
            transform: (val: number, property) => {
              if (Math.sqrt(val) % 1 === 0) return `calc(100% - ${val}px)`;
              if (val % 2 > 0 && property === 'width') return val * 2;
              return val;
            },
          },
        });
        const perfectSquare = {
          height: 'calc(100% - 4px)',
          width: 'calc(100% - 4px)',
        };
        const oddRectangle = { height: 5, width: 10 };
        const evenSquare = { height: 6, width: 6 };
        const allTogether = {
          ...perfectSquare,
          XS: oddRectangle,
          SM: evenSquare,
        };

        it.each([
          ['perfect square', 4, perfectSquare],
          ['odd rectangle', 5, oddRectangle],
          ['even square', 6, evenSquare],
          ['array medias', [4, 5, 6], allTogether],
          ['array medias', { _: 4, xs: 5, sm: 6 }, allTogether],
          [
            'functional',
            ({ spacing }: Theme) => spacing[0],
            { height: 0, width: 0 },
          ],
        ] as const)('transforms to %s - (%p)', (_, dimension, output) => {
          expect(shapes({ theme, shape: dimension })).toEqual(output);
        });
      });
      describe('scale values', () => {
        const padding = variance.create({
          p: {
            property: 'padding',
            scale: { 4: 4, 8: 8 },
            transform: (val: number) => `${val / 16}rem`,
          },
        });

        it.each([
          ['scale value', 4, { padding: '0.25rem' }],
          ['scale value', 8, { padding: '0.5rem' }],
          [
            'scale value (array)',
            [4, 8],
            { padding: '0.25rem', XS: { padding: '0.5rem' } },
          ],
          [
            'scale value (object)',
            { _: 4, xs: 8 },
            { padding: '0.25rem', XS: { padding: '0.5rem' } },
          ],
          ['global value', 'initial', { padding: 'initial' }],
          [
            'global value (array)',
            [4, 'initial'],
            { padding: '0.25rem', XS: { padding: 'initial' } },
          ],
          ['numeric override', 5 as any, { padding: 5 }],
        ] as const)('transforms to %s - %p', (_, p, output) => {
          expect(padding({ theme, p })).toEqual(output);
        });
      });
    });

    it('transforms props', () => {
      const res = { height: '1.5rem' };
      expect(layout({ height: '24px', theme })).toEqual(res);
    });
    it('transforms scalar values only if scale is present', () => {
      const doubleSpace = variance.create({
        p: {
          property: 'padding',
          scale: 'spacing',
          transform: (val: number) => `calc(${val} * 2)`,
        },
      });

      expect(doubleSpace({ theme, p: 16 })).toEqual({
        padding: 'calc(1rem * 2)',
      });

      expect(doubleSpace({ theme, p: 'initial' })).toEqual({
        padding: 'initial',
      });
    });
    it('transforms array scale values always', () => {
      const doubleSpace = variance.create({
        p: {
          property: 'padding',
          scale: createScale<number>(),
          transform: (val: number) => val * 2,
        },
      });

      expect(doubleSpace({ theme, p: 16 })).toEqual({
        padding: 32,
      });
    });
  });
  describe('compose', () => {
    it('combines multiple parsers into one parser', () => {
      const composed = variance.compose(layout, space);

      expect(
        composed({
          height: '24px',
          padding: [4, 16],
          theme,
        })
      ).toEqual({
        height: '1.5rem',
        padding: '0.25rem',
        XS: {
          padding: '1rem',
        },
      });
    });
  });
});

describe('css', () => {
  const marginTransform = jest.fn();

  const css = variance.createCss({
    width: { property: 'width', transform: transformSize },
    height: { property: 'height', transform: transformSize },
    margin: {
      property: 'margin',
      scale: theme.spacing,
      transform: marginTransform,
    },
    padding: { property: 'padding', scale: theme.spacing },
    boxShadow: {
      property: 'boxShadow',
    },
  });

  beforeEach(() => {
    jest.resetAllMocks();
    marginTransform.mockImplementation((val) => val);
  });

  it('creates a CSS Function', () => {
    expect(css).toBeDefined();
  });
  it('produces css', () => {
    const returnedFn = css({ margin: 4, width: '100%', height: '50' });

    expect(returnedFn({ theme })).toEqual({
      margin: '0.25rem',
      width: '100%',
      height: '50px',
    });
  });
  it('works with media queries', () => {
    const returnedFn = css({
      width: ['100%', '200%'],
      height: '50',
    });

    expect(returnedFn({ theme })).toEqual({
      width: '100%',
      XS: { width: '200%' },
      height: '50px',
    });
  });
  it('allows selectors', () => {
    const returnedFn = css({
      width: ['100%', '200%'],
      '&:hover': {
        width: '50%',
      },
    });

    expect(returnedFn({ theme })).toEqual({
      width: '100%',
      XS: { width: '200%' },
      '&:hover': {
        width: '50%',
      },
    });
  });
  it('allows selectors with media queries', () => {
    const returnedFn = css({
      width: ['100%', '200%'],
      boxShadow: ({ colors }) => `0px 0px 0px 0px ${colors.black}`,
      '&:hover': {
        width: ['50%', '25%'],
      },
    });

    expect(returnedFn({ theme })).toEqual({
      width: '100%',
      boxShadow: '0px 0px 0px 0px var(--color-black)',
      XS: { width: '200%' },
      '&:hover': {
        width: '50%',
        XS: { width: '25%' },
      },
    });
  });

  it('allows static valid CSS to pass through', () => {
    const returnedFn = css({
      display: 'grid',
      width: ['100%', '200%'],
    });

    expect(returnedFn({ theme })).toEqual({
      display: 'grid',
      width: '100%',
      XS: { width: '200%' },
    });
  });

  it('allows static valid CSS to pass through within selectors', () => {
    const returnedFn = css({
      display: 'grid',
      '&:hover': {
        display: 'none',
      },
    });

    expect(returnedFn({ theme })).toEqual({
      display: 'grid',
      '&:hover': { display: 'none' },
    });
  });

  it('caches the response', () => {
    const returnedFn = css({
      margin: 4,
    });

    expect(marginTransform).toHaveBeenCalledTimes(0);

    returnedFn({ theme });

    expect(marginTransform).toHaveBeenCalledTimes(1);

    returnedFn({ theme });

    expect(marginTransform).toHaveBeenCalledTimes(1);
  });
});

describe('variants', () => {
  const marginTransform = jest.fn();

  const variant = variance.createVariant({
    width: { property: 'width', transform: transformSize },
    height: { property: 'height', transform: transformSize },
    margin: {
      property: 'margin',
      scale: 'spacing',
      transform: marginTransform,
    },
    padding: { property: 'padding', scale: 'spacing' },
  });

  beforeEach(() => {
    jest.resetAllMocks();
    marginTransform.mockImplementation((val) => val);
  });

  it('creates a variant function', () => {
    const myVariant = variant({
      variants: {
        cool: {
          margin: 4,
          width: ['100%', '200%'],
        },
      },
    });

    expect(myVariant({ theme, variant: 'cool' })).toEqual({
      width: '100%',
      margin: '0.25rem',
      XS: { width: '200%' },
    });
  });
  it('has a default variant', () => {
    const myVariant = variant({
      defaultVariant: 'cool',
      variants: {
        cool: {
          width: ['100%', '200%'],
        },
        beans: {
          height: 16,
        },
      },
    });

    expect(myVariant({ theme })).toEqual({
      width: '100%',
      XS: { width: '200%' },
    });

    expect(myVariant({ theme, variant: 'beans' })).toEqual({ height: '16px' });
  });
  it('has a customized key', () => {
    const myVariant = variant({
      prop: 'sweet',
      variants: {
        cool: {
          width: '100%',
        },
      },
    });

    expect(myVariant({ theme, sweet: 'cool' })).toEqual({
      width: '100%',
    });
  });
  it('allows variant props with selectors', () => {
    const myVariant = variant({
      prop: 'sweet',
      variants: {
        cool: {
          width: '100%',
          '&:hover': {
            width: '50%',
          },
        },
      },
    });

    expect(myVariant({ theme, sweet: 'cool' })).toEqual({
      width: '100%',
      '&:hover': {
        width: '50%',
      },
    });
  });

  it('allows variant props with selectors with media queries', () => {
    const myVariant = variant({
      prop: 'sweet',
      variants: {
        cool: {
          width: '100%',
          '&:hover': {
            width: ['50%', '25%'],
          },
        },
        story: {
          margin: 0,
        },
      },
    });

    expect(myVariant({ theme, sweet: 'cool' })).toEqual({
      width: '100%',
      '&:hover': {
        width: '50%',
        XS: {
          width: '25%',
        },
      },
    });
  });
  it('caches the variant once called', () => {
    const myVariant = variant({
      variants: {
        cool: {
          margin: 4,
        },
      },
    });
    myVariant({ theme });

    expect(marginTransform).toHaveBeenCalledTimes(0);

    myVariant({ theme, variant: 'cool' });

    expect(marginTransform).toHaveBeenCalledTimes(1);

    myVariant({ theme, variant: 'cool' });

    expect(marginTransform).toHaveBeenCalledTimes(1);
  });
  it('caches each variant individually', () => {
    const myVariant = variant({
      variants: {
        cool: {
          margin: 4,
        },
        beans: {
          margin: 8,
        },
        world: {
          margin: 16,
        },
      },
    });

    expect(marginTransform).toHaveBeenCalledTimes(0);

    myVariant({ theme, variant: 'cool' });

    expect(marginTransform).toHaveBeenCalledTimes(1);

    myVariant({ theme, variant: 'cool' });
    myVariant({ theme, variant: 'beans' });

    expect(marginTransform).toHaveBeenCalledTimes(2);

    myVariant({ theme, variant: 'cool' });
    myVariant({ theme, variant: 'beans' });
    myVariant({ theme, variant: 'world' });

    expect(marginTransform).toHaveBeenCalledTimes(3);

    myVariant({ theme, variant: 'cool' });
    myVariant({ theme, variant: 'beans' });
    myVariant({ theme, variant: 'world' });

    expect(marginTransform).toHaveBeenCalledTimes(3);
  });
  it('takes base style css object', () => {
    const baseVariants = variant({
      base: {
        margin: 4,
        padding: [, 8],
        '&:hover': {
          padding: [, 32],
        },
      },
      variants: {
        big: {
          padding: 16,
          margin: [, 8],
          '&:hover': {
            margin: [, 16],
          },
        },
        small: {
          padding: [, 16],
        },
      },
    });

    expect(baseVariants({ variant: 'big', theme })).toEqual({
      margin: '0.25rem',
      padding: '1rem',
      XS: {
        padding: '0.5rem',
        margin: '0.5rem',
      },
      '&:hover': {
        XS: {
          padding: '2rem',
          margin: '1rem',
        },
      },
    });

    expect(baseVariants({ variant: 'small', theme })).toEqual({
      margin: '0.25rem',
      XS: {
        padding: '1rem',
      },
      '&:hover': {
        XS: {
          padding: '2rem',
        },
      },
    });
  });
});

describe('logical properties', () => {
  const getPropertyMode = (useLogicalProperties: boolean) =>
    useLogicalProperties ? 'logical' : 'physical';

  it('uses logical properties when useLogicalProperties is true (default)', () => {
    const parser = variance.create({
      marginLeft: {
        property: {
          physical: 'marginLeft',
          logical: 'marginInlineStart',
        },
        resolveProperty: getPropertyMode,
      },
    });

    const result = parser({
      marginLeft: '10px',
      theme: { ...theme, useLogicalProperties: true },
    });

    expect(result).toEqual({ marginInlineStart: '10px' });
  });

  it('uses physical properties when useLogicalProperties is false', () => {
    const parser = variance.create({
      marginLeft: {
        property: {
          physical: 'marginLeft',
          logical: 'marginInlineStart',
        },
        resolveProperty: getPropertyMode,
      },
    });

    const result = parser({
      marginLeft: '10px',
      theme: { ...theme, useLogicalProperties: false },
    });

    expect(result).toEqual({ marginLeft: '10px' });
  });

  it('defaults to logical properties when useLogicalProperties is not set', () => {
    const parser = variance.create({
      width: {
        property: {
          physical: 'width',
          logical: 'inlineSize',
        },
        resolveProperty: getPropertyMode,
      },
    });

    const result = parser({
      width: '100px',
      theme,
    });

    expect(result).toEqual({ inlineSize: '100px' });
  });

  it('handles directional properties array with resolveProperty', () => {
    const parser = variance.create({
      mx: {
        property: 'margin',
        properties: {
          physical: ['marginLeft', 'marginRight'],
          logical: ['marginInlineStart', 'marginInlineEnd'],
        },
        resolveProperty: getPropertyMode,
      },
    });

    const logicalResult = parser({
      mx: '20px',
      theme: { ...theme, useLogicalProperties: true },
    });

    expect(logicalResult).toEqual({
      marginInlineStart: '20px',
      marginInlineEnd: '20px',
    });

    const physicalResult = parser({
      mx: '20px',
      theme: { ...theme, useLogicalProperties: false },
    });

    expect(physicalResult).toEqual({
      marginLeft: '20px',
      marginRight: '20px',
    });
  });
});

describe('states', () => {
  const marginTransform = jest.fn();

  const states = variance.createStates({
    width: { property: 'width', transform: transformSize },
    height: { property: 'height', transform: transformSize },
    margin: {
      property: 'margin',
      scale: 'spacing',
      transform: marginTransform,
    },
    padding: { property: 'padding', scale: 'spacing' },
  });

  beforeEach(() => {
    jest.resetAllMocks();
    marginTransform.mockImplementation((val) => val);
  });

  it('creates a state variant function', () => {
    const myStates = states({
      cool: {
        margin: 4,
        width: ['100%', '200%'],
      },
      beans: {
        border: '1px solid blue',
      },
    });

    expect(myStates({ theme, cool: true })).toEqual({
      width: '100%',
      margin: '0.25rem',
      XS: { width: '200%' },
    });

    expect(myStates({ theme, cool: true, beans: true })).toEqual({
      width: '100%',
      margin: '0.25rem',
      border: '1px solid blue',
      XS: { width: '200%' },
    });
  });
  it('progressively overrides based on the order of the enabled', () => {
    const myStates = states({
      cool: {
        margin: 4,
      },
      beans: {
        margin: 8,
      },
      dude: {
        margin: 16,
      },
    });

    expect(myStates({ theme, cool: true })).toEqual({
      margin: '0.25rem',
    });

    expect(myStates({ theme, cool: true, beans: true })).toEqual({
      margin: '0.5rem',
    });

    expect(myStates({ theme, cool: true, beans: true, dude: true })).toEqual({
      margin: '1rem',
    });
  });
});
