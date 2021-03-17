import {
  CacheProvider,
  css,
  EmotionCache,
  Global,
  ThemeProvider,
} from '@emotion/react';
import React, { useRef } from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import { theme, themeCssVariables } from './theme';

export interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  cache?: EmotionCache;
}

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  useGlobals = true,
  useCache = true,
}) => {
  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    useCache && (cache ?? createEmotionCache())
  );

  const globals = useGlobals && (
    <>
      <Typography />
      <Reboot />
      <Global styles={css({ ':root': themeCssVariables })} />
    </>
  );

  if (activeCache.current) {
    return (
      <CacheProvider value={activeCache.current}>
        {globals}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </CacheProvider>
    );
  }

  return (
    <>
      {globals}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};
