import { CSSObject } from '@codecademy/variance';
import {
  CacheProvider,
  EmotionCache,
  Theme,
  ThemeProvider,
} from '@emotion/react';
import { MotionConfig } from 'framer-motion';
import { setNonce } from 'get-nonce';
import { useContext, useEffect, useRef } from 'react';
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
  nonce?: string;
}>({
  hasGlobals: false,
  hasCache: false,
});

GamutContext.displayName = 'GamutContext';

/**
 * Returns the CSP nonce passed to GamutProvider, if any.
 */
export const useNonce = (): string | undefined =>
  useContext(GamutContext).nonce;

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

  // Feed nonce to get-nonce singleton so react-style-singleton (e.g. via react-aria-components) can set it on injected style tags for CSP
  useEffect(() => {
    if (nonce) {
      setNonce(nonce);
    }
  }, [nonce]);

  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    shouldCreateCache && (cache ?? createEmotionCache(nonce ? { nonce } : {}))
  );

  const contextValue = {
    hasGlobals: shouldInsertGlobals,
    hasCache: shouldCreateCache,
    nonce,
  };

  const globals = shouldInsertGlobals && (
    <>
      <Typography theme={theme} />
      <Reboot theme={theme} />
      <Variables variables={theme._variables} />
      {variables && <Variables variables={variables} />}
    </>
  );

  const content = (
    <ThemeProvider theme={theme}>
      {nonce ? (
        <MotionConfig nonce={nonce}>{children}</MotionConfig>
      ) : (
        children
      )}
    </ThemeProvider>
  );

  if (activeCache.current) {
    return (
      <GamutContext.Provider value={contextValue}>
        <CacheProvider value={activeCache.current}>
          {globals}
          {content}
        </CacheProvider>
      </GamutContext.Provider>
    );
  }

  return (
    <GamutContext.Provider value={contextValue}>
      {globals}
      {content}
    </GamutContext.Provider>
  );
};
