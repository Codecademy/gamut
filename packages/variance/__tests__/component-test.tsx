import { matchers } from '@emotion/jest';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import renderer from 'react-test-renderer';

import { variance } from '../src/core';
import { theme } from './__fixtures__/theme';

expect.extend(matchers);

const space = variance.create({
  margin: { property: 'margin', scale: 'spacing' },
  padding: { property: 'padding', scale: 'spacing' },
});

const layout = variance.create({
  width: {
    property: 'width',
    transform: (val) =>
      `${typeof val === 'string' ? parseInt(val, 10) : val / 16}rem`,
  },
  height: {
    property: 'height',
    transform: (val) =>
      `${typeof val === 'string' ? parseInt(val, 10) : val / 16}rem`,
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
    const Test = styled.div(variance.compose(layout, space));
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
describe('static styles', () => {
  describe('Variant integration', () => {
    const variant = variance.createVariant({
      bg: { property: 'background' },
    });

    const Test = styled.div`
      background: yellow;
    `;

    const Div = styled.div(
      variant({
        variants: {
          hi: {
            bg: 'blue',
            '&:hover': {
              bg: 'green',
            },
          },
          ho: {
            bg: 'blue',
            [`> *`]: {
              bg: 'navy',
            },
          },
        },
      })
    );

    it('generates pseudo selector styles', () => {
      const renderView = renderer
        .create(
          <ThemeProvider theme={theme}>
            <Div variant="hi">
              <Test>Hello</Test>
            </Div>
          </ThemeProvider>
        )
        .toJSON();
      expect(renderView).toHaveStyleRule('background', 'blue');
      expect(renderView).toHaveStyleRule('background', 'green', {
        target: ':hover',
      });
    });

    it('generates selector styles', () => {
      const renderView = renderer
        .create(
          <ThemeProvider theme={theme}>
            <Div variant="ho">
              <Test>Hello</Test>
            </Div>
          </ThemeProvider>
        )
        .toJSON();
      expect(renderView).toHaveStyleRule('background', 'blue');
      expect(renderView).toHaveStyleRule('background', 'navy', {
        target: '*',
      });
    });
  });

  describe('CSS integration', () => {
    const css = variance.createCss({
      bg: { property: 'background' },
    });

    const Div = styled.div(
      css({
        bg: 'blue',
        '&:hover': {
          bg: 'green',
        },
        '> *': {
          bg: 'navy',
        },
      })
    );

    it('generates pseudo selector styles', () => {
      const renderView = renderer
        .create(
          <ThemeProvider theme={theme}>
            <Div>Hello</Div>
          </ThemeProvider>
        )
        .toJSON();
      expect(renderView).toHaveStyleRule('background', 'blue');
      expect(renderView).toHaveStyleRule('background', 'green', {
        target: ':hover',
      });
      expect(renderView).toHaveStyleRule('background', 'navy', {
        target: '*',
      });
    });

    it('merges selector styles', () => {
      const Div = styled.div(
        css({ '&:hover': { color: 'green' } }),
        css({ '&:hover': { background: 'orange' } })
      );
      const renderView = renderer
        .create(
          <ThemeProvider theme={theme}>
            <Div>Hello</Div>
          </ThemeProvider>
        )
        .toJSON();

      expect(renderView).toHaveStyleRule('background', 'orange', {
        target: ':hover',
      });
      expect(renderView).toHaveStyleRule('color', 'green', {
        target: ':hover',
      });
    });
  });
});
