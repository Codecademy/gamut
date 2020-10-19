import React from 'react';
import { system } from '@codecademy/gamut-system/src/core/system';
import render from 'react-test-renderer';
import styled from '@emotion/styled';
import { matchers } from 'jest-emotion';
import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { HandlerProps } from '../../../types/config';

expect.extend(matchers);

const { variant, typography } = system({});

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

  it('last function used overwrites earlier styles', () => {
    const textVariants = variant({
      primary: { fontSize: '1rem', textColor: 'blue' },
      secondary: { fontSize: '0.85rem' },
    });

    const MyVariant = styled.div<
      HandlerProps<typeof typography> & HandlerProps<typeof textVariants>
    >`
      ${textVariants}
      ${typography}
    `;

    const noOverride = render.create(<MyVariant variant="primary" />).toJSON();

    expect(noOverride).toHaveStyleRule('font-size', '1rem');
    expect(noOverride).toHaveStyleRule('color', 'blue');

    const withOverride = render
      .create(<MyVariant variant="primary" fontSize="50rem" />)
      .toJSON();

    expect(withOverride).toHaveStyleRule('font-size', '50rem');
    expect(withOverride).toHaveStyleRule('color', 'blue');
  });
});
