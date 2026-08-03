import { type ReactNode, createContext, useContext } from 'react';

import { Box } from './Box';

/* Per the ColorMode/theming skills, STATIC color-mode context lives in
 * <Background>, not <ColorMode>. <Background bg="<palette token>"> paints a
 * fixed-palette surface and switches light/dark to whichever gives the best
 * contrast with body text — establishing its OWN color-mode context for
 * descendants and exposing `background-current`. */

// real Gamut Core palette tokens (NOT semantic aliases) valid for <Background bg>.
export type PaletteToken =
  | 'navy-800'
  | 'beige'
  | 'white'
  | 'hyper-500'
  | 'yellow-0';

// palette surfaces that read as "dark" → dark mode context for contrast.
const DARK_SURFACES = new Set<PaletteToken>(['navy-800', 'hyper-500']);

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
  const mode = DARK_SURFACES.has(bg) ? 'dark' : 'light';
  return (
    <BackgroundContext.Provider value={{ current: bg, mode }}>
      {/* data-color-mode = contrast-selected mode → descendants get readable
          semantic colors. `bg` is the RAW palette color (background-current). */}
      <Box data-color-mode={mode} bg={bg} color="text">
        {children}
      </Box>
    </BackgroundContext.Provider>
  );
};
