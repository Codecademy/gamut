import { Preview } from '@storybook/react';

import theme from './GamutTheme';

const preview: Preview = {
  parameters: {
    docs: {
      theme: theme,
    },
  },
};

export default preview;
