import 'focus-visible/dist/focus-visible.min.js';

import './decorators/wrapper';
import { withEmotion } from './decorators/theme';
import { Page } from './components';
import { colors } from '@codecademy/gamut-styles/src';
import { theme } from './theme';
import { breakpoints } from '@codecademy/gamut-styles';

export const parameters = {
  viewMode: 'docs',
  options: {
    showPanel: true,
    selectedPanel: 'addon-controls',
    storySort: {
      order: [
        'Gamut',
        'Foundations',
        ['About', 'Theme', 'System', 'Design Guidelines', 'Legacy'],
        'Typography',
        'Layouts',
        'Atoms',
        'Molecules',
        'Organisms',
        'Brand',
        'Meta',
        'Deprecated',
      ],
      // Fallback ordering
      method: 'alphabetical',
      locales: 'en-US',
    },
  },
  // Addon Options
  docs: {
    theme,
    components: {
      wrapper: Page,
    },
  },
  backgrounds: {
    grid: {
      cellSize: 20,
      opacity: 0.5,
      cellAmount: 5,
    },
    values: [
      { name: 'White', value: colors.white },
      { name: 'Navy', value: colors.navy },
      { name: 'Beige', value: colors.beige },
    ],
  },
  viewport: {
    defaultViewport: 'responsive',
    viewports: {
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
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
};

export const decorators = [withEmotion];
