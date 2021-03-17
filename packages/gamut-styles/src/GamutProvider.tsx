import {
  CacheProvider,
  css,
  EmotionCache,
  Global,
  ThemeProvider,
} from '@emotion/react';
import React, { useEffect, useRef } from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import { theme, themeCssVariables } from './theme';

export interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  useAssets?: boolean;
  cache?: EmotionCache;
}

const AssetProvider = React.lazy(() => import('./AssetProvider'));

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  useAssets = false,
  useGlobals = true,
  useCache = true,
}) => {
  const activeCache = useRef<EmotionCache>();

  useEffect(() => {
    if (cache) {
      activeCache.current = cache;
    } else if (useCache) {
      activeCache.current = createEmotionCache();
    }
  }, [useCache, cache]);

  const tree = (
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

  return (
    <>
      {useAssets && <AssetProvider />}
      {activeCache.current ? (
        <CacheProvider value={activeCache.current}>{tree}</CacheProvider>
      ) : (
        tree
      )}
    </>
  );
};
