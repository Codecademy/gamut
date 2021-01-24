import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';

const cache = createEmotionCache();

// Story musted be called as a regular function avoid full-remounts
export const withEmotion = (Story: any) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{Story()}</ThemeContext.Provider>
  </CacheProvider>
);
