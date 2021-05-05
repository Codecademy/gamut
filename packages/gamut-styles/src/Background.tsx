import { getContrast } from 'polished';
import React, { ComponentProps, forwardRef, useCallback, useMemo } from 'react';

import { ColorAlias, ColorMode, ColorModeShape } from './ColorMode';
import { getColorValue } from './theme';

export interface BackgroundProps
  extends Omit<
    ComponentProps<typeof ColorMode>,
    'mode' | 'alwaysSetVariables' | 'bg'
  > {
  bg: Colors;
}

const isColorAlias = (
  mode: ColorModeShape,
  color: keyof Theme['colors']
): color is ColorAlias => {
  return Object.keys(mode).includes(color);
};

export const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  ({ children, className, bg, ...rest }, ref) => {
    const {
      colorModes: { active, modes },
    } = useTheme();

    /** If a color alias was used then look up the true color key from the active mode */
    const trueColor = useMemo(() => {
      const activeMode = modes[active];
      if (isColorAlias(activeMode, bg)) {
        return activeMode[bg];
      }
      return bg;
    }, [bg, active, modes]);

    /** Determine the most accessible mode for the color picked */
    const accessibleMode = useMemo(() => {
      const { light, dark } = modes;

      const background = getColorValue(trueColor);

      const lightText = getColorValue(light.text);
      const darkText = getColorValue(dark.text);

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
    }, [modes, trueColor]);

    return (
      <ColorMode
        className={className}
        mode={accessibleMode}
        bg={bg}
        {...rest}
        ref={ref}
      >
        {children}
      </ColorMode>
    );
  }
);
