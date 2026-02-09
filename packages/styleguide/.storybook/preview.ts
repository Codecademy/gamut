import { Preview } from '@storybook/react';

import theme from './theming/GamutTheme';
import { withEmotion } from './theming/GamutThemeProvider';
import { breakpoints, css } from '@codecademy/gamut-styles';
import { DocsContainer } from './components/Elements/DocsContainer';
import { CodeOrSourceMdx, HeadersMdx } from '@storybook/blocks';
import { components as htmlComponents } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Link } from './components/Elements/Markdown';

const WrappedPre = styled(htmlComponents.pre)(
  // gives the source block a white background - pretty fragile but easy to change if needed
  css({
    '.docblock-source, .css-5owncf': { backgroundColor: 'background' },
  })
);

const mdxComponents = {
  ...htmlComponents,
  code: CodeOrSourceMdx,
  pre: WrappedPre,
  ...HeadersMdx,
  a: Link as any,
};

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
      mdxComponents,
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
            'ESLint rules',
            'FAQs',
            'Logical and physical CSS properties',
            'Stories',
            'Brand',
            'Installation',
            'Usage Guide',
            'MCP',
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
  logicalProps: {
    name: 'LogicalProps',
    description: 'Toggle between logical and physical CSS properties',
    defaultValue: 'true',
    toolbar: {
      icon: 'transfer',
      items: [
        { value: 'true', title: 'Logical' },
        { value: 'false', title: 'Physical' },
      ],
      showName: true,
    },
  },
  direction: {
    name: 'Direction',
    description: 'Text direction for the page',
    defaultValue: 'ltr',
    toolbar: {
      items: [
        { value: 'ltr', icon: 'arrowright', title: 'Left-To-Right' },
        { value: 'rtl', icon: 'arrowleft', title: 'Right-To-Left' },
      ],
      showName: true,
    },
  },
};

export const decorators = [withEmotion];

export default preview;
