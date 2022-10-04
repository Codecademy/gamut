import { getContrast } from 'polished';
import React, { ComponentProps, forwardRef, useCallback, useMemo } from 'react';

import {
  ColorAlias,
  ColorMode,
  ColorModes,
  ColorModeShape,
  Colors,
  useColorModes,
} from './ColorMode';

export interface BackgroundProps
  extends Omit<
    ComponentProps<typeof ColorMode>,
    'mode' | 'alwaysSetVariables' | 'bg'
  > {
  bg: Colors;
}

const isColorAlias = (
  mode: ColorModeShape,
  color: Colors
): color is ColorAlias => {
  return Object.keys(mode).includes(color);
};

export const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  ({ bg, ...rest }, ref) => {
    const [active, activeColors, modes, getColorValue] = useColorModes();

    /** If a color alias was used then look up the true color key from the active mode */
    const trueColor = useMemo(() => {
      if (isColorAlias(activeColors, bg)) {
        return activeColors[bg];
      }
      return bg;
    }, [bg, activeColors]);

    const getTextContrast = useCallback(
      (foreground: Colors) => {
        return getContrast(getColorValue(foreground), getColorValue(trueColor));
      },
      [trueColor, getColorValue]
    );

    /**
     * This compares the contrast of the selected background color
     * and each color modes body text and returns the mode that has
     * the highest contrast standard. This is not perfect as it is
     * probable that certain color modes will never be reachable if
     * there are more than 2 color modes.
     *
     * This does not guarantee a level of A/AA/AA compliance.
     */

    const accessibleMode = useMemo(() => {
      const { [active]: activeMode, ...otherModes } = modes;
      const possibleModes = Object.entries(otherModes);

      /**
       * Reduce all remaining modes to the mode key with the highest contrast
       * value.
       *
       * TODO: Add a tiebreaker.  This could possibly have other dimensions as
       * it will likelyfail to return a mode outside of the lighest and
       * darkest versions.
       */
      const [highestContrastMode] = possibleModes.reduce<[ColorModes, number]>(
        (
          [prevMode, prevContrast],
          [mode, { text }]: [ColorModes, ColorModeShape]
        ) => {
          const contrast = getTextContrast(text);
          // Keep the higher contrast mode.
          return contrast > prevContrast
            ? [mode, contrast]
            : [prevMode, prevContrast];
        },
        [active, getTextContrast(activeMode.text)]
      );

      return highestContrastMode;
    }, [modes, active, getTextContrast]);

    return <ColorMode {...rest} mode={accessibleMode} bg={bg} ref={ref} />;
  }
);
