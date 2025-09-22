import { CSSObject } from '@codecademy/variance';
import {
  CacheProvider,
  EmotionCache,
  Theme,
  ThemeProvider,
} from '@emotion/react';
import { useContext, useRef } from 'react';
import * as React from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import { Variables } from './globals/Variables';
import { coreTheme } from './themes/core';

export interface GamutProviderProps {
  children?: React.ReactNode;
  useGlobals?: boolean;
  useCache?: boolean;
  theme: Theme;
  variables?: Record<string, CSSObject>;
  /**
   * Pass a cache to the provider to override the default cache
   */
  cache?: EmotionCache;
  /**
   * Pass a nonce to the cache to prevent CSP errors
   */
  nonce?: string;
}

export const GamutContext = React.createContext<{
  hasGlobals?: boolean;
  hasCache?: boolean;
}>({
  hasGlobals: false,
  hasCache: false,
});

GamutContext.displayName = 'GamutContext';

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  theme = coreTheme,
  variables,
  useGlobals = true,
  useCache = true,
  nonce,
}) => {
  const { hasGlobals, hasCache } = useContext(GamutContext);
  const shouldCreateCache = useCache && !hasCache;
  const shouldInsertGlobals = useGlobals && !hasGlobals;

  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    shouldCreateCache && (cache ?? createEmotionCache(nonce ? { nonce } : {}))
  );

  const contextValue = {
    hasGlobals: shouldInsertGlobals,
    hasCache: shouldCreateCache,
  };

  const globals = shouldInsertGlobals && (
    <>
      <Typography theme={theme} />
      <Reboot theme={theme} />
      <Variables variables={theme._variables} />
      {variables && <Variables variables={variables} />}
    </>
  );

  if (activeCache.current) {
    return (
      <GamutContext.Provider value={contextValue}>
        <CacheProvider value={activeCache.current}>
          {globals}
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
      </GamutContext.Provider>
    );
  }

  return (
    <GamutContext.Provider value={contextValue}>
      {globals}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </GamutContext.Provider>
  );
};
