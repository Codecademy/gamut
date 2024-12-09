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
        'Meta',
        'UX Writing',
        [
          'About',
          'UI copy checklist',
          'Accessibility guidelines',
          'Component guidelines',
          [
            'About',
            'Alerts',
            'Bell notification',
            'Buttons and links',
            'Confirmation dialogs',
            'Error messages',
            'Toasts',
            'Tooltips',
          ],
        ],
        'Brand Labs',
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
    disable: true,
    grid: {
      disable: true,
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
  previewTabs: { 'storybook/docs/panel': { index: -1 } },
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

export const decorators = [withEmotion, withDesign];
