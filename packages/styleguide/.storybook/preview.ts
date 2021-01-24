import 'focus-visible/dist/focus-visible.min.js';

import './decorators/wrapper';
import { withEmotion } from './decorators/emotion';
import { Page } from './components';
import { colors } from '@codecademy/gamut-styles/src';
import { theme } from './theme';
import { breakpoints } from '@codecademy/gamut-styles';

export const parameters = {
  viewMode: 'docs',
  options: {
    showPanel: true,
    panelPosition: 'right',
    selectedPanel: 'addon-controls',
    storySort: {
      order: [
        'Gamut',
        'Foundations',
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
      { name: 'light', value: colors.white },
      { name: 'dark', value: colors.navy },
    ],
  },
  viewport: {
    defaultViewport: 'responsive',
    viewports: {
      xs: {
        name: 'XS',
        styles: {
          width: breakpoints.xs,
          height: '900px',
        },
        type: 'mobile',
      },
      sm: {
        name: 'SM',
        styles: {
          width: breakpoints.sm,
          height: '1024px',
        },
        type: 'tablet',
      },
      md: {
        name: 'MD',
        styles: {
          width: breakpoints.md,
          height: '768px',
        },
        type: 'desktop',
      },
      lg: {
        name: 'LG',
        styles: {
          width: breakpoints.lg,
          height: '900px',
        },
        type: 'desktp',
      },
      xl: {
        name: 'XL',
        styles: {
          width: breakpoints.xl,
          height: '900px',
        },
        type: 'desktp',
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
