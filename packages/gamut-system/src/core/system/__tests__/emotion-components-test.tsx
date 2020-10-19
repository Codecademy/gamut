import React from 'react';
import { system } from '@codecademy/gamut-system/src/core/system';
import render from 'react-test-renderer';
import styled from '@emotion/styled';
import { matchers } from 'jest-emotion';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';

expect.extend(matchers);

const { typography } = system({});

describe('Styled components integration', () => {
  const MyComponent = styled.div`
    ${typography}
  `;

  it('creates a basic style rule on an emotion component', () => {
    const view = render.create(<MyComponent fontSize="1rem" />).toJSON();

    expect(view).toHaveStyleRule('font-size', '1rem');
  });

  it('adds breakpoints when configured', () => {
    const view = render
      .create(<MyComponent fontSize={['1rem', '2rem']} />)
      .toJSON();

    expect(view).toHaveStyleRule('font-size', '1rem');
    expect(view).toHaveStyleRule('font-size', '2rem', {
      media: DEFAULT_MEDIA_QUERIES.xs.replace('@media ', ''),
    });
  });
});
