import React from 'react';

import { GamutThemeProvider } from '@codecademy/gamut-styles';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any, parameters) => {
  // Always give iframes the full provider
  if (parameters.viewMode === 'canvas') {
    return <GamutThemeProvider useAssets>{Story()}</GamutThemeProvider>;
  }

  // Wrap all stories in minimal provider
  return (
    <GamutThemeProvider useCache={false} useGlobals={false}>
      {Story()}
    </GamutThemeProvider>
  );
};
