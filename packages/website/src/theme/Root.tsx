import { GamutProvider, theme } from '@codecademy/gamut-styles';
import React from 'react';

/**
 * Docusaurus renders whatever this exports around the entire app, including
 * during SSR. Every live code block and every static example on the site
 * runs inside real Gamut theme context because of this wrapper.
 */
export default function Root({ children }: { children: React.ReactNode }) {
  return <GamutProvider theme={theme}>{children}</GamutProvider>;
}
