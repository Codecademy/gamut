import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';

const cache = createEmotionCache({ speedy: false, container: undefined });

export const Emotion = ({ children }) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  </CacheProvider>
);
