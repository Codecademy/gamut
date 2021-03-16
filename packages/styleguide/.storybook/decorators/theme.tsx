import React from 'react';

import { GamutProvider } from '@codecademy/gamut-styles';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any) => {
  const isBuild = process.env.NODE_ENV !== 'test';
  return (
    <GamutProvider useCache={isBuild} preload={isBuild}>
      {Story()}
    </GamutProvider>
  );
};
