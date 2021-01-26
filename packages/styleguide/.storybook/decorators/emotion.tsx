import React from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';
import { FlexBox } from '@codecademy/gamut/src';

const cache = createEmotionCache();

export const withEmotion = (Story) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{Story()}</ThemeContext.Provider>
  </CacheProvider>
);

export const withContainer = (Story, { parameters: { container } }) => {
  return (
    <FlexBox width="100%" position="relative" {...container}>
      {Story()}
    </FlexBox>
  );
};
