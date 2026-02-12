import { useLayoutEffect, useRef } from 'react';
import {
  Background,
  corePalette,
  ColorModes,
  GamutProvider,
  coreTheme,
  adminTheme,
  lxStudioTheme,
  percipioTheme,
  platformTheme,
} from '@codecademy/gamut-styles/src';
import { Theme } from '@emotion/react';

/**
 * Story functions must be called as a regular function to avoid full-remounts
 * See: https://github.com/storybookjs/storybook/issues/12255
 */

const themeBackground: Record<ColorModes, 'white' | 'navy'> = {
  light: 'white',
  dark: 'navy',
};

const themeMap = {
  core: coreTheme,
  admin: adminTheme,
  lxStudio: lxStudioTheme,
  percipio: percipioTheme,
  platform: platformTheme,
} as const;

type GlobalsContext = {
  globals: {
    colorMode: 'light' | 'dark';
    theme: keyof typeof themeMap;
    logicalProps: 'true' | 'false';
    direction: 'ltr' | 'rtl';
  };
};

export const withEmotion = (Story: any, context: GlobalsContext) => {
  const colorMode = context.globals.colorMode ?? 'light';
  const selectedTheme = context.globals.theme;
  const useLogicalProperties = context.globals.logicalProps !== 'false';
  const direction = context.globals.direction ?? 'ltr';
  const background = corePalette[themeBackground[colorMode]];
  const storyRef = useRef<HTMLDivElement>(null);
  const currentTheme = themeMap[selectedTheme];

  useLayoutEffect(() => {
    const storyEl = storyRef.current?.closest(
      '.docs-story'
    ) as HTMLDivElement | null;
    if (storyEl) storyEl.style.backgroundColor = background;
  }, [storyRef.current, context.globals.colorMode]);

  // Always give iframes the full provider
  if (process.env.NODE_ENV === 'test') {
    return (
      <GamutProvider
        useCache={false}
        useGlobals={false}
        useLogicalProperties={useLogicalProperties}
        theme={currentTheme as unknown as Theme}
      >
        <Background
          alwaysSetVariables
          bg={themeBackground[colorMode]}
          ref={storyRef}
        >
          <div dir={direction}>{Story()}</div>
        </Background>
      </GamutProvider>
    );
  }

  // Wrap all stories in minimal provider
  return (
    <GamutProvider
      useLogicalProperties={useLogicalProperties}
      theme={currentTheme as unknown as Theme}
    >
      <Background
        alwaysSetVariables
        bg={themeBackground[colorMode]}
        ref={storyRef}
      >
        <div dir={direction}>{Story()}</div>
      </Background>
    </GamutProvider>
  );
};
