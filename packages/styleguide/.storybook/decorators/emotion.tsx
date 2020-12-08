import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';

const cache = createEmotionCache();

export const wrapDocs = (Component) => (props) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>
      <Component {...props} />
    </ThemeContext.Provider>
  </CacheProvider>
);

export const withEmotion = (Story) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>
      <Story />
    </ThemeContext.Provider>
  </CacheProvider>
);
