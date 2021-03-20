import React from 'react';

import { GamutProvider } from '@codecademy/gamut-styles';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any) => {
  // Always give iframes the full provider
  if (process.env.NODE_ENV === 'test') {
    return (
      <GamutProvider useCache={false} useGlobals={false}>
        {Story()}
      </GamutProvider>
    );
  }

  // Wrap all stories in minimal provider
  return <GamutProvider>{Story()}</GamutProvider>;
};
