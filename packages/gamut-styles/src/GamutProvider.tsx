import {
  CacheProvider,
  css,
  CSSObject,
  EmotionCache,
  Global,
  Theme,
  ThemeProvider,
} from '@emotion/react';
import React, { useContext, useRef } from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import {
  staticTokens as baseStaticTokens,
  theme as baseTheme,
  variables as baseVariables,
} from './theme';

export interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  theme?: Theme;
  variables?: CSSObject;
  staticTokens?: Record<string, string | CSSObject>;
  cache?: EmotionCache;
}

export const GamutContext = React.createContext<{
  hasGlobals?: boolean;
  hasCache?: boolean;
  staticTokens: GamutProviderProps['staticTokens'];
}>({
  hasGlobals: false,
  hasCache: false,
  staticTokens: {},
});

GamutContext.displayName = 'GamutContext';

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  theme = baseTheme,
  variables = baseVariables,
  staticTokens = baseStaticTokens,
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

  const { root = {}, colorMode = {} } = variables as Record<string, CSSObject>;

  const contextValue = {
    hasGlobals: shouldInsertGlobals,
    hasCache: shouldCreateCache,
    staticTokens,
  };

  const globals = shouldInsertGlobals && (
    <>
      <Typography />
      <Reboot />
      <Global styles={css({ ':root': root })} />
      <Global styles={css({ ':root': colorMode })} />
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
