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
  useAssets?: boolean;
  cache?: EmotionCache;
}

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  useAssets = false,
  useGlobals = true,
  useCache = true,
}) => {
  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    useCache && (cache ?? createEmotionCache())
  );

  let tree = (
    <ThemeProvider theme={theme}>
      {useGlobals && (
        <>
          <Global styles={css({ ':root': themeCssVariables })} />
          <Reboot />
          <Typography />
        </>
      )}
      {children}
    </ThemeProvider>
  );

  if (activeCache.current) {
    return <CacheProvider value={activeCache.current}>{tree}</CacheProvider>;
  }

  return tree;
};
