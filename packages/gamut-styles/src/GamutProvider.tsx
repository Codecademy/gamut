import {
  CacheProvider,
  css,
  CSSObject,
  EmotionCache,
  Global,
  Theme,
  ThemeProvider,
} from '@emotion/react';
import React, { useContext, useMemo, useRef } from 'react';

import { createEmotionCache } from './cache';
import { Reboot, Typography } from './globals';
import { theme, themeCssVariables } from './theme';
import { createVariables } from './utilities';

export interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  mode?: keyof Theme['colorModes']['modes'];
  cache?: EmotionCache;
}

export const GamutContext = React.createContext({
  hasGlobals: false,
  hasCache: false,
});

GamutContext.displayName = 'GamutContext';

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  mode = 'light',
  useGlobals = true,
  useCache = true,
}) => {
  const { hasGlobals, hasCache } = useContext(GamutContext);
  const shouldCreateCache = useCache && !hasCache;
  const shouldInsertGlobals = useGlobals && !hasGlobals;
  const rootVariables = useMemo(() => {
    const vars: CSSObject = {
      ...themeCssVariables,
      ...createVariables(theme.colorModes.modes[mode], 'colors'),
    };
    return vars;
  }, [mode]);

  // Do not initialize a new cache if one has been provided as props
  const activeCache = useRef<EmotionCache | false>(
    shouldCreateCache && (cache ?? createEmotionCache())
  );

  const globals = shouldInsertGlobals && (
    <>
      <Typography />
      <Reboot />
      <Global styles={css({ ':root': rootVariables })} />
    </>
  );

  if (activeCache.current) {
    return (
      <GamutContext.Provider
        value={{
          hasGlobals: shouldInsertGlobals,
          hasCache: shouldCreateCache,
        }}
      >
        <CacheProvider value={activeCache.current}>
          {globals}
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
      </GamutContext.Provider>
    );
  }

  return (
    <GamutContext.Provider
      value={{
        hasGlobals: shouldInsertGlobals,
        hasCache: shouldCreateCache,
      }}
    >
      {globals}
      <ThemeProvider
        theme={{ ...theme, colorModes: { ...theme.colorModes, active: mode } }}
      >
        {children}
      </ThemeProvider>
    </GamutContext.Provider>
  );
};
