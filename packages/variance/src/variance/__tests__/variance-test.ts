import { parseSize } from '@codecademy/gamut-system/src/transforms';

import { variance } from '../core';

const theme = {
  breakpoints: {
    xs: 'XS',
    sm: 'SM',
    md: 'MD',
    lg: 'LG',
    xl: 'XL',
  },
  spacing: {
    0: 0,
    4: '0.25rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    24: '1.5rem',
    32: '2rem',
    48: '3rem',
    64: '4rem',
  },
};
const testVariance = variance.withTheme<typeof theme>();

const space = testVariance.create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

const layout = testVariance.create({
  width: { property: 'width', transform: parseSize },
  height: { property: 'height', transform: parseSize },
});

type Assert<X, Y> = X extends Y ? true : false;

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
    const sizes = { base: 4, xs: 8, sm: 16, md: 24, lg: 32, xl: 48 } as const;
    const rem = (val: number) => `${val / 16}rem`;

    expect(space({ margin: sizes, theme })).toEqual({
      margin: rem(sizes['base']),
      XS: {
        margin: rem(sizes['xs']),
      },
      SM: {
        margin: rem(sizes['sm']),
      },
      MD: {
        margin: rem(sizes['md']),
      },
      LG: {
        margin: rem(sizes['lg']),
      },
      XL: {
        margin: rem(sizes['xl']),
      },
    });
  });
  it('renders media map arrays styles', () => {
    const sizes = { base: 4, xs: 8, sm: 16, md: 24, lg: 32, xl: 48 } as const;
    const rem = (val: number) => `${val / 16}rem`;

    expect(space({ margin: sizes, padding: sizes, theme })).toEqual({
      margin: rem(sizes['base']),
      padding: rem(sizes['base']),
      XS: {
        margin: rem(sizes['xs']),
        padding: rem(sizes['xs']),
      },
      SM: {
        margin: rem(sizes['sm']),
        padding: rem(sizes['sm']),
      },
      MD: {
        margin: rem(sizes['md']),
        padding: rem(sizes['md']),
      },
      LG: {
        margin: rem(sizes['lg']),
        padding: rem(sizes['lg']),
      },
      XL: {
        margin: rem(sizes['xl']),
        padding: rem(sizes['xl']),
      },
    });
  });
  it('transforms props', () => {
    const res = { height: '50px' };
    expect(layout({ height: '50', theme })).toEqual(res);
  });
  it('composes multiple parses', () => {
    const composed = testVariance.compose(layout, space);

    expect(composed({ height: '50', padding: [4, 16], theme })).toEqual({
      height: '50px',
      padding: '0.25rem',
      XS: {
        padding: '1rem',
      },
    });
  });
});

describe('css', () => {
  const css = testVariance.createCss({
    width: { property: 'width', transform: parseSize },
    height: { property: 'height', transform: parseSize },
  });

  it('creates a CSS Function', () => {
    expect(css).toBeDefined();
  });
  it('produces css', () => {
    const returnedFn = css({ width: '100%', height: '50' });

    expect(returnedFn({ theme })).toEqual({ width: '100%', height: '50px' });
  });
  it('works with media queries', () => {
    const returnedFn = css({ width: ['100%', '200%'], height: '50' });

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
        width: '150%',
      },
    });

    expect(returnedFn({ theme })).toEqual({
      width: '100%',
      XS: { width: '200%' },
      '&:hover': {
        width: '150%',
      },
    });
  });
  it('allows selectors', () => {
    const returnedFn = css({
      '&:hover': {
        width: ['100%', '200%'],
      },
    });

    expect(returnedFn({ theme })).toEqual({
      '&:hover': {
        width: '100%',
        XS: { width: '200%' },
      },
    });
  });
});

describe('variants', () => {
  const variant = testVariance.createVariant({
    width: { property: 'width', transform: parseSize },
    height: { property: 'height', transform: parseSize },
  });

  it('Creates a variant', () => {
    const myVariant = variant({
      cool: {
        width: ['100%', '200%'],
        '&:hover': {
          width: '150%',
        },
      },
    });

    expect(myVariant({ theme, variant: 'cool' })).toEqual({
      width: '100%',
      XS: { width: '200%' },
      '&:hover': {
        width: '150%',
      },
    });
  });
  it('has a default variant', () => {
    const myVariant = variant(
      {
        cool: {
          width: ['100%', '200%'],
          '&:hover': {
            width: '150%',
          },
        },
      },
      {
        defaultVariant: 'cool',
      }
    );

    expect(myVariant({ theme, variant: 'cool' })).toEqual({
      width: '100%',
      XS: { width: '200%' },
      '&:hover': {
        width: '150%',
      },
    });
  });
});
