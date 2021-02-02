import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';

const testSetting =
  process.env.NODE_ENV === 'test'
    ? {
        container: undefined,
      }
    : undefined;

const cache = createEmotionCache(testSetting);

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */
export const withEmotion = (Story: any) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{Story()}</ThemeContext.Provider>
  </CacheProvider>
);
