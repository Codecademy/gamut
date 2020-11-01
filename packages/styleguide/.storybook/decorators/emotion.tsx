import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeContext } from '@emotion/react';

import { emotionCache } from '@codecademy/gamut-styles';

export const withEmotion = (Story) => (
  <CacheProvider value={emotionCache}>
    <ThemeContext.Provider value={{}}>
      <Story />
    </ThemeContext.Provider>
  </CacheProvider>
);
