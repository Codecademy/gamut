import { type ReactNode, createContext, useContext } from 'react';
import { css } from 'styled-system/css';
import type { ColorToken } from 'styled-system/tokens';

/* Analog of gamut `Background`: applies a background color token and provides a
 * "current background" context (gamut uses this for `background-current`). Token
 * type-safety on the `bg` prop comes from Panda's generated `ColorToken`. */
const BackgroundContext = createContext<ColorToken | undefined>(undefined);
export const useBackground = () => useContext(BackgroundContext);

export const Background = ({
  bg,
  children,
}: {
  bg: ColorToken;
  children?: ReactNode;
}) => (
  <BackgroundContext.Provider value={bg}>
    <div className={css({ bg, color: 'text' })}>{children}</div>
  </BackgroundContext.Provider>
);
