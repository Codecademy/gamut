import { Preview } from '@storybook/react';

import theme from './theming/GamutTheme';
import { withEmotion } from './theming/GamutThemeProvider';
import { breakpoints } from '@codecademy/gamut-styles';
import { DocsContainer } from './components/DocsContainer';

const preview: Preview = {
  parameters: {
    docs: {
      container: DocsContainer,
      theme: theme,
    },
    backgrounds: {
      disable: true,
    },
    viewport: {
      defaultViewport: 'responsive',
      viewports: {
        responsive: {
          name: 'Responsive',
          type: 'desktop',
        },
        xs: {
          name: `XS - ${breakpoints.xs}`,
          styles: {
            width: breakpoints.xs,
            height: '900px',
          },
          type: 'mobile',
        },
        sm: {
          name: `SM - ${breakpoints.sm}`,
          styles: {
            width: breakpoints.sm,
            height: '1024px',
          },
          type: 'tablet',
        },
        md: {
          name: `MD - ${breakpoints.md}`,
          styles: {
            width: breakpoints.md,
            height: '768px',
          },
          type: 'desktop',
        },
        lg: {
          name: `LG - ${breakpoints.lg}`,
          styles: {
            width: breakpoints.lg,
            height: '900px',
          },
          type: 'desktop',
        },
        xl: {
          name: `XL - ${breakpoints.xl}`,
          styles: {
            width: breakpoints.xl,
            height: '900px',
          },
          type: 'desktop',
        },
      },
    },
  },
};

export const globalTypes = {
  colorMode: {
    name: ' ColorMode',
    description: 'Global color mode for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // Array of plain string values or MenuItem shape (see below)
      items: [
        { value: 'light', icon: 'circlehollow', title: 'light' },
        { value: 'dark', icon: 'circle', title: 'dark' },
      ],
      // Property that specifies if the name of the item will be displayed
      showName: true,
    },
  },
};

export const decorators = [withEmotion];

export default preview;
