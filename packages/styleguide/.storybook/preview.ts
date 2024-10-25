import { Preview } from '@storybook/react';

import theme from './GamutTheme';
import { withEmotion } from './theming/GamutThemeProvider';

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
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
