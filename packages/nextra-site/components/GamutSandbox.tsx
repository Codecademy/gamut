'use client';

import { coreTheme, GamutProvider } from '@codecademy/gamut-styles';
import type { ReactNode } from 'react';

/**
 * Live component examples render inside this so they get Gamut's theme
 * context (colors, tokens) without the docs site inheriting Gamut's
 * global Reboot/Typography resets (`useGlobals` stays off).
 */
export const GamutSandbox = ({ children }: { children: ReactNode }) => (
  <GamutProvider theme={coreTheme} useGlobals={false} useCache>
    {children}
  </GamutProvider>
);
