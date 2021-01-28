import React, { ComponentProps, ReactNode } from 'react';
import { CacheProvider, ThemeContext } from '@emotion/react';

import { theme, createEmotionCache } from '@codecademy/gamut-styles';
import { StoryFn } from '@storybook/addons';

import { FlexBox } from '@codecademy/gamut/src';

const cache = createEmotionCache();

export const withContainer = (
  Story: StoryFn<ReactNode>,
  {
    parameters: { container },
  }: { parameters: { container: ComponentProps<typeof FlexBox> } }
) => {
  return (
    <FlexBox width="100%" position="relative" {...container}>
      {Story()}
    </FlexBox>
  );
};

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */
export const withEmotion = (Story: StoryFn<ReactNode>) => (
  <CacheProvider value={cache}>
    <ThemeContext.Provider value={theme}>{Story()}</ThemeContext.Provider>
  </CacheProvider>
);
