import { type ReactNode, createContext, useContext } from 'react';

import { Box } from './Box';

/* Per the ColorMode/theming skills, STATIC color-mode context lives in
 * <Background>, not <ColorMode>. <Background bg="<palette token>"> paints a
 * fixed-palette surface (card/hero/band) and switches light/dark to whichever
 * gives the best contrast with body text — establishing its OWN color-mode
 * context for descendants and exposing `background-current`. <ColorMode> is only
 * for the ambient/global mode (light/dark/system). */

// raw palette tokens (NOT semantic aliases like `background`/`text`) are the only
// valid <Background bg> values.
export type PaletteToken = 'navy' | 'black' | 'blue' | 'white' | 'gray-200';

// which palette surfaces read as "dark" → dark mode context for contrast.
const DARK_SURFACES = new Set<PaletteToken>(['navy', 'black', 'blue']);

type BackgroundContextValue = {
  current?: PaletteToken;
  mode: 'light' | 'dark';
};
const BackgroundContext = createContext<BackgroundContextValue>({
  mode: 'light',
});
export const useBackground = () => useContext(BackgroundContext);

export const Background = ({
  bg,
  children,
}: {
  bg: PaletteToken;
  children?: ReactNode;
}) => {
  // contrast-based mode selection (gamut computes this from the palette value;
  // simplified here to a dark-surface set).
  const mode = DARK_SURFACES.has(bg) ? 'dark' : 'light';
  return (
    <BackgroundContext.Provider value={{ current: bg, mode }}>
      {/* data-color-mode = the contrast-selected mode → descendants get readable
          semantic colors. `bg` is the RAW palette color (the background-current). */}
      <Box data-color-mode={mode} bg={bg} color="text">
        {children}
      </Box>
    </BackgroundContext.Provider>
  );
};
