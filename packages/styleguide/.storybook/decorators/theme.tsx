import React from 'react';

import { GamutProvider } from '@codecademy/gamut-styles';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any, parameters) => {
  // Always give iframes the full provider
  if (parameters.viewMode === 'canvas') {
    return <GamutProvider>{Story()}</GamutProvider>;
  }

  // Wrap tested stories always
  if (process.env.NODE_ENV === 'test') {
    <GamutProvider useCache={false} preload={false}>
      {Story()}
    </GamutProvider>;
  }

  // Docs mode stories do not need this
  return Story();
};
