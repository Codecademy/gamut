import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';

const cache = createEmotionCache({ speedy: false });

export const withEmotion = (Story) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>
      <Story />
    </ThemeContext.Provider>
  </CacheProvider>
);
