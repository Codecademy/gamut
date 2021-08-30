import React from 'react';
import { coreTheme, GamutProvider } from '@codecademy/gamut-styles/src';
import { ComponentProvider } from '@codecademy/gamut/src';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any, context: any) => {
  // Always give iframes the full provider
  if (process.env.NODE_ENV === 'test') {
    return (
      <GamutProvider useCache={false} useGlobals={false} theme={coreTheme}>
        <ComponentProvider overrides={{}}>{Story()}</ComponentProvider>
      </GamutProvider>
    );
  }

  // Wrap all stories in minimal provider
  return <GamutProvider theme={coreTheme}>{Story()}</GamutProvider>;
};
