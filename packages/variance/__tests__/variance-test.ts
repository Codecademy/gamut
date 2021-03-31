import { variance } from '../src/core';
import { parseSize } from '../src/transforms/parseSize';
import { theme } from './__fixtures__/theme';

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
        typeof space['propNames'],
        ('margin' | 'padding')[]
      > = true;

      expect(propNamesRestricted);

      expect(space.propNames.sort()).toEqual(['padding', 'margin'].sort());
    });
    it('renders styles', () => {
      expect(space({ margin: 4, theme })).toEqual({ margin: '0.25rem' });
    });
    it('renders media query arrays styles', () => {
      const sizes = [4, 8, 16, 24, 32, 48] as const;
      const rem = (val: number) => `${val / 16}rem`;
      expect(space({ margin: sizes, theme })).toEqual({
        margin: rem(sizes[0]),
        XS: {
          margin: rem(sizes[1]),
        },
        SM: {
          margin: rem(sizes[2]),
        },
        MD: {
          margin: rem(sizes[3]),
        },
        LG: {
          margin: rem(sizes[4]),
        },
        XL: {
          margin: rem(sizes[5]),
        },
      });
    });
    it('renders media query arrays styles', () => {
      const sizes = [4, 8, 16, 24, 32, 48] as const;
      const rem = (val: number) => `${val / 16}rem`;

      expect(space({ margin: sizes, padding: sizes, theme })).toEqual({
        margin: rem(sizes[0]),
        padding: rem(sizes[0]),
        XS: {
          margin: rem(sizes[1]),
          padding: rem(sizes[1]),
        },
        SM: {
          margin: rem(sizes[2]),
          padding: rem(sizes[2]),
        },
        MD: {
          margin: rem(sizes[3]),
          padding: rem(sizes[3]),
        },
        LG: {
          margin: rem(sizes[4]),
          padding: rem(sizes[4]),
        },
        XL: {
          margin: rem(sizes[5]),
          padding: rem(sizes[5]),
        },
      });
    });
    it('renders media map arrays styles', () => {
      const sizes = { _: 4, xs: 8, sm: 16, md: 24, lg: 32, xl: 48 } as const;
      const rem = (val: number) => `${val / 16}rem`;

      expect(space({ margin: sizes, theme })).toEqual({
        margin: rem(sizes._),
        XS: {
          margin: rem(sizes.xs),
        },
        SM: {
          margin: rem(sizes.sm),
        },
        MD: {
          margin: rem(sizes.md),
        },
        LG: {
          margin: rem(sizes.lg),
        },
        XL: {
          margin: rem(sizes.xl),
        },
      });
    });
    it('renders media map arrays styles', () => {
      const sizes = { _: 4, xs: 8, sm: 16, md: 24, lg: 32, xl: 48 } as const;
      const rem = (val: number) => `${val / 16}rem`;

      expect(space({ margin: sizes, padding: sizes, theme })).toEqual({
        margin: rem(sizes._),
        padding: rem(sizes._),
        XS: {
          margin: rem(sizes.xs),
          padding: rem(sizes.xs),
        },
        SM: {
          margin: rem(sizes.sm),
          padding: rem(sizes.sm),
        },
        MD: {
          margin: rem(sizes.md),
          padding: rem(sizes.md),
        },
        LG: {
          margin: rem(sizes.lg),
          padding: rem(sizes.lg),
        },
        XL: {
          margin: rem(sizes.xl),
          padding: rem(sizes.xl),
        },
      });
    });
    it('transforms props', () => {
      const res = { height: '1.5rem' };
      expect(layout({ height: '24px', theme })).toEqual(res);
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
    width: { property: 'width', transform: parseSize },
    height: { property: 'height', transform: parseSize },
    margin: {
      property: 'margin',
      scale: theme.spacing,
      transform: marginTransform,
    },
    padding: { property: 'padding', scale: theme.spacing },
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
      '&:hover': {
        width: ['50%', '25%'],
      },
    });

    expect(returnedFn({ theme })).toEqual({
      width: '100%',
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
    width: { property: 'width', transform: parseSize },
    height: { property: 'height', transform: parseSize },
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
      },
    });

    expect(myVariant({ theme, variant: 'cool' })).toEqual({
      width: '100%',
      XS: { width: '200%' },
    });
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
});
