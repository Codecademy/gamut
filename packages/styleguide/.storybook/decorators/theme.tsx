import React from 'react';
import { CacheProvider } from '@emotion/react';

import {
  GamutThemeProvider,
  createEmotionCache,
} from '@codecademy/gamut-styles';

const cache = createEmotionCache({ speedy: false });

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

export const withEmotion = (Story: any) => {
  return process.env.NODE_ENV === 'test' ? (
    <GamutThemeProvider>{Story()}</GamutThemeProvider>
  ) : (
    <CacheProvider value={cache}>
      <GamutThemeProvider>{Story()}</GamutThemeProvider>
    </CacheProvider>
  );
};
