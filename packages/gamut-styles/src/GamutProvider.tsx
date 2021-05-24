import { CSSObject } from '@codecademy/variance';
import {
  CacheProvider,
  EmotionCache,
  Theme,
  ThemeProvider,
} from '@emotion/react';
import React, { useContext, useRef } from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import { Variables } from './globals/Variables';
import { coreTheme } from './themes/core';

export interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  theme: Theme;
  variables?: Record<string, CSSObject>;
  cache?: EmotionCache;
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
}) => {
  const { hasGlobals, hasCache } = useContext(GamutContext);
  const shouldCreateCache = useCache && !hasCache;
  const shouldInsertGlobals = useGlobals && !hasGlobals;

  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    shouldCreateCache && (cache ?? createEmotionCache())
  );

  const contextValue = {
    hasGlobals: shouldInsertGlobals,
    hasCache: shouldCreateCache,
  };

  const globals = shouldInsertGlobals && (
    <>
      <Typography />
      <Reboot />
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
