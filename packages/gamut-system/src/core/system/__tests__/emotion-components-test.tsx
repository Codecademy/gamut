import { matchers } from '@emotion/jest';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import render from 'react-test-renderer';

import { DEFAULT_MEDIA_QUERIES } from '../../../styleTemplates/createResponsiveStyleTemplate/constants';
import { HandlerProps } from '../../../types/config';
import { system } from '..';

expect.extend(matchers);

describe('Styled components integration', () => {
  describe('base components', () => {
    const { variant, typography } = system.create({});
    const textVariants = variant({
      primary: { fontSize: '1rem', textColor: 'blue' },
      secondary: { fontSize: '0.85rem' },
    });
    const MyComponent = styled.div<
      HandlerProps<typeof typography> & HandlerProps<typeof textVariants>
    >`
      ${textVariants}
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
      const noOverride = render
        .create(<MyComponent variant="primary" />)
        .toJSON();

      expect(noOverride).toHaveStyleRule('font-size', '1rem');
      expect(noOverride).toHaveStyleRule('color', 'blue');

      const withOverride = render
        .create(<MyComponent variant="primary" fontSize="50rem" />)
        .toJSON();

      expect(withOverride).toHaveStyleRule('font-size', '50rem');
      expect(withOverride).toHaveStyleRule('color', 'blue');
    });
  });
  describe('themed components', () => {
    const theme = { fontSizes: { xs: '1rem', md: '2rem' } } as const;
    type ThemeShape = typeof theme;
    const Theme = ({ children }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    );

    const { variant, typography } = system.withTheme<ThemeShape>().create({
      typography: { fontSize: { propName: 'fontSize', scale: 'fontSizes' } },
    });

    const textVariants = variant({
      primary: { fontSize: 'xs', textColor: 'blue' },
      secondary: { fontSize: 'md' },
    });

    const MyComponent = styled.div<
      HandlerProps<typeof typography> & HandlerProps<typeof textVariants>
    >`
      ${textVariants}
      ${typography}
    `;

    it('creates a basic style rule on an emotion with a theme look up', () => {
      const view = render
        .create(
          <Theme>
            <MyComponent fontSize="xs" />
          </Theme>
        )
        .toJSON();

      expect(view).toHaveStyleRule('font-size', theme.fontSizes.xs);
    });

    it('adds breakpoints when configured', () => {
      const view = render
        .create(
          <Theme>
            <MyComponent fontSize={['xs', 'md']} />
          </Theme>
        )
        .toJSON();

      expect(view).toHaveStyleRule('font-size', theme.fontSizes.xs);
      expect(view).toHaveStyleRule('font-size', theme.fontSizes.md, {
        media: DEFAULT_MEDIA_QUERIES.xs.replace('@media ', ''),
      });
    });

    it('last function used overwrites earlier styles', () => {
      const noOverride = render
        .create(
          <Theme>
            <MyComponent variant="primary" />
          </Theme>
        )
        .toJSON();

      expect(noOverride).toHaveStyleRule('font-size', theme.fontSizes.xs);
      expect(noOverride).toHaveStyleRule('color', 'blue');

      const withOverride = render
        .create(
          <Theme>
            <MyComponent variant="primary" fontSize="md" />
          </Theme>
        )
        .toJSON();

      expect(withOverride).toHaveStyleRule('font-size', theme.fontSizes.md);
      expect(withOverride).toHaveStyleRule('color', 'blue');
    });

    it('returns the original value if no theme exists', () => {
      const view = render.create(<MyComponent fontSize="xs" />).toJSON();

      expect(view).toHaveStyleRule('font-size', 'xs');
    });
  });
});
