import React, { useLayoutEffect, useRef } from 'react';
import {
  Background,
  corePalette,
  coreTheme,
  ColorModes,
  GamutProvider,
} from '@codecademy/gamut-styles/src';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

const themeBackground: Record<ColorModes, 'white' | 'navy'> = {
  light: 'white',
  dark: 'navy',
};

type GlobalsContext = {
  globals: {
    colorMode: 'light' | 'dark';
  };
};

export const withEmotion = (Story: any, context: GlobalsContext) => {
  const colorMode = context.globals.colorMode;
  const background = corePalette[themeBackground[colorMode]];
  const storyRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const storyEl = storyRef.current?.closest(
      '.docs-story'
    ) as HTMLDivElement | null;
    if (storyEl) storyEl.style.backgroundColor = background;
  }, [storyRef.current, context.globals.colorMode]);

  // Always give iframes the full provider
  if (process.env.NODE_ENV === 'test') {
    return (
      <GamutProvider useCache={false} useGlobals={false} theme={coreTheme}>
        <Background bg={themeBackground[colorMode]} ref={storyRef}>
          {Story()}
        </Background>
      </GamutProvider>
    );
  }

  // Wrap all stories in minimal provider
  return (
    <GamutProvider theme={coreTheme}>
      <Background bg={themeBackground[colorMode]} ref={storyRef}>
        {Story()}
      </Background>
    </GamutProvider>
  );
};
