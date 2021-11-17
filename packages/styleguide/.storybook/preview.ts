import 'focus-visible/dist/focus-visible.min.js';
import { withDesign } from 'storybook-addon-designs';

import { withEmotion } from './decorators/theme';
import { DocsPage, DocsContainer } from './components';
import { breakpoints } from '@codecademy/gamut-styles/src';
import { theme } from './theme';

export const parameters = {
  viewMode: 'docs',
  options: {
    showPanel: true,
    selectedPanel: 'addon-controls',
    storySort: {
      order: [
        'Gamut',
        'Foundations',
        ['About', 'Theme', 'System', 'ColorMode', 'Colors', 'Layout'],
        'Typography',
        ['About', 'Text', 'Anchor'],
        'Layouts',
        ['About', 'Box', 'LayoutGrid', 'ContentContainer'],
        'Atoms',
        'Molecules',
        'Organisms',
        'Brand',
        'Writing',
        [
          'About',
          'Voice',
          'Style',
          'Word List',
          'Writing for Accessibility',
          'UX Writing',
          [
            'About',
            'Writing Useful UI Copy',
            'Writing for Components',
            [
              'About',
              'Alerts',
              'Buttons and Links',
              'Confirmation Dialogs',
              'Error Messages',
              'Tooltips',
            ],
          ],
        ],
        'Meta',
        'Deprecated',
      ],
      // Fallback ordering
      method: 'alphabetical',
      locales: 'en-US',
    },
  },
  taxonomy: {
    root: 'gamut',
    indexPage: 'about',
  },
  // Addon Options
  docs: {
    theme,
    container: DocsContainer,
    components: {
      wrapper: DocsPage,
    },
  },
  backgrounds: {
    grid: {
      cellSize: 16,
      opacity: 0.5,
      cellAmount: 5,
    },
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
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  actions: { argTypesRegex: '^on.*' },
  controls: { expanded: true },
  layout: 'fullscreen',
};

export const decorators = [withEmotion, withDesign];
