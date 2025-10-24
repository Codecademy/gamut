import { Preview } from '@storybook/react';

import theme from './theming/GamutTheme';
import { withEmotion } from './theming/GamutThemeProvider';
import { breakpoints } from '@codecademy/gamut-styles';
import { DocsContainer } from './components/Elements/DocsContainer';

const preview: Preview = {
  parameters: {
    backgrounds: {
      disable: true,
    },
    deepControls: { enabled: true },
    docs: {
      container: DocsContainer,
      theme: theme,
      toc: { headingSelector: 'h1, h2, h3' },
    },
    options: {
      storySort: {
        method: 'configure',
        includeNames: true,
        order: [
          'Gamut',
          'Meta',
          [
            'About',
            'Best Practices',
            'Contributing',
            'FAQs',
            'Stories',
            'Style Guide',
          ],
          'Foundations',
          'Layouts',
          'Typography',
          'Atoms',
          'Molecules',
          'Organisms',
          'UX Writing',
          [
            'About',
            'DIY UX writing in 8 steps',
            'Accessibility guidelines',
            'Component guidelines',
            [
              'About',
              'Alerts',
              'Alternative text',
              'Buttons',
              'Confirmation dialogs',
              'Error messages',
              'Notifications',
              'Toasts',
              'Tooltips',
            ],
          ],
          '*',
        ],
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
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'core',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'core', title: 'Core' },
        { value: 'admin', title: 'Admin' },
        { value: 'lxStudio', title: 'LX Studio' },
        { value: 'percipio', title: 'Percipio' },
        { value: 'platform', title: 'Learning Platform' },
      ],
      showName: true,
    },
  },
};

export const decorators = [withEmotion];

export default preview;
