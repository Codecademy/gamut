import { matchers } from '@emotion/jest';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import renderer from 'react-test-renderer';

import { variance } from '../core';

expect.extend(matchers);

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
const testVariance = variance.withTheme(theme);

const space = testVariance.create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

const layout = testVariance.create({
  width: {
    property: 'width',
    transform: (val: string) => `${parseInt(val, 10) / 16}rem`,
  },
  height: {
    property: 'height',
    transform: (val: string) => `${parseInt(val, 10) / 16}rem`,
  },
});

describe('style props', () => {
  it('adds style props to components', () => {
    const Test = styled.div(space);
    const renderView = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Test margin={[4, 8, 16]} padding={{ _: 0 }}>
            Hello
          </Test>
        </ThemeProvider>
      )
      .toJSON();
    expect(renderView).toHaveStyleRule('margin', '0.25rem');

    expect(renderView).toHaveStyleRule('margin', '0.5rem', {
      target: 'XS',
    });

    expect(renderView).toHaveStyleRule('margin', '1rem', {
      target: 'SM',
    });
  });
  it('transforms style props', () => {
    const Test = styled.div(layout);
    const renderView = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Test width="48px">Hello</Test>
        </ThemeProvider>
      )
      .toJSON();
    expect(renderView).toHaveStyleRule('width', '3rem');
  });
  it('composes props', () => {
    const Test = styled.div(testVariance.compose(layout, space));
    const renderView = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Test margin={[16, 32]} width={['24px', '32px']}>
            Hello
          </Test>
        </ThemeProvider>
      )
      .toJSON();
    expect(renderView).toHaveStyleRule('width', '1.5rem');
    expect(renderView).toHaveStyleRule('margin', '1rem');

    expect(renderView).toHaveStyleRule('width', '2rem', {
      target: 'XS',
    });
    expect(renderView).toHaveStyleRule('margin', '2rem', {
      target: 'XS',
    });
  });
});
