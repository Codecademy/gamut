import { cool, variance } from '../goober';

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
    48: '4rem',
    64: '5rem',
  },
};

const space = variance.withTheme<typeof theme>().create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

describe('do it', () => {
  it('renders styles', () => {
    expect(space({ margin: 4, theme })).toEqual({ margin: '0.25rem' });
  });
  it('renders larger styles', () => {
    const res = { margin: '0.25rem' };
    expect(space({ margin: [4, 4, 4], theme })).toEqual({
      ...res,
      XS: res,
      SM: res,
    });
  });
});
