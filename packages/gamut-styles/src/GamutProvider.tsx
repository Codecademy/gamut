import {
  CacheProvider,
  css,
  EmotionCache,
  Global,
  ThemeProvider,
} from '@emotion/react';
import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';

import { createEmotionCache } from './cache';
import { FONT_ASSET_PATH, Fonts, WEB_FONTS } from './globals/Fonts';
import { theme, themeCssVariables } from './theme';

export const createFontLinks = () => {
  const links: React.ReactNode[] = [];
  WEB_FONTS.forEach(({ filePath, extensions, rel }) =>
    extensions.forEach((ext) =>
      links.push(
        <link
          key={`${filePath}-${ext}`}
          rel={ext === 'woff2' ? rel : 'prefetch'}
          href={`${FONT_ASSET_PATH}${filePath}.${ext}`}
          crossOrigin="anonymous"
          as="font"
          type={`font/${ext}`}
        />
      )
    )
  );
  return links;
};

interface GamutProviderProps {
  useGlobals?: boolean;
  useCache?: boolean;
  preload?: boolean;
  cache?: EmotionCache;
}

export const GamutProvider: React.FC<GamutProviderProps> = ({
  children,
  cache,
  useGlobals = true,
  useCache = true,
  preload = true,
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
          <Fonts />
        </>
      )}
      {children}
    </ThemeProvider>
  );

  return (
    <>
      {preload && <Helmet>{createFontLinks()}</Helmet>}
      {activeCache.current ? (
        <CacheProvider value={activeCache.current}>{tree}</CacheProvider>
      ) : (
        tree
      )}
    </>
  );
};
