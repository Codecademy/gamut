import { matchers } from '@emotion/jest';
import styled from '@emotion/styled';
import React from 'react';
import renderer from 'react-test-renderer';

import { variance } from '../core';

expect.extend(matchers);

describe('Variant integration', () => {
  const { variant } = variance
    .withTheme<{}>()
    .createStatic({ bg: { property: 'background' } });

  const Test = styled.div`
    background: yellow;
  `;

  const Div = styled.div(
    variant({
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
    })
  );

  it('generates pseudo selector styles', () => {
    const renderView = renderer
      .create(
        <Div variant="hi">
          <Test>Hello</Test>
        </Div>
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
        <Div variant="ho">
          <Test>Hello</Test>
        </Div>
      )
      .toJSON();
    expect(renderView).toHaveStyleRule('background', 'blue');
    expect(renderView).toHaveStyleRule('background', 'navy', {
      target: '*',
    });
  });
});

describe('CSS integration', () => {
  const { css } = variance
    .withTheme<{}>()
    .createStatic({ bg: { property: 'background' } });

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
    const renderView = renderer.create(<Div>Hello</Div>).toJSON();
    expect(renderView).toHaveStyleRule('background', 'blue');
    expect(renderView).toHaveStyleRule('background', 'green', {
      target: ':hover',
    });
    expect(renderView).toHaveStyleRule('background', 'navy', {
      target: '*',
    });
  });
});
