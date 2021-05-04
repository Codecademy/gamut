import { Theme, useTheme } from '@emotion/react';
import { getContrast } from 'polished';
import React, { ComponentProps, forwardRef, useMemo } from 'react';

import { ColorMode } from './ColorMode';
import { getColorValue } from './theme';

export interface BackgroundProps
  extends Omit<
    ComponentProps<typeof ColorMode>,
    'mode' | 'alwaysSetVariables'
  > {
  bg?: Exclude<
    keyof Theme['colors'],
    keyof Theme['colorModes']['modes'][keyof Theme['colorModes']['modes']]
  >;
  className?: string;
  children: React.ReactNode;
}

export const Background = forwardRef<HTMLDivElement, BackgroundProps>(
  ({ children, className, bg, ...rest }, ref) => {
    const {
      colorModes: { active, modes },
    } = useTheme();

    const accessibleMode = useMemo(() => {
      if (!bg) return;
      const background = getColorValue(bg);
      const { light, dark } = modes;
      const lightText = getColorValue(light.text);
      const darkText = getColorValue(dark.text);

      const lightModeContrast = getContrast(lightText, background);
      const darkModeContrast = getContrast(darkText, background);
      // Minimum Contrast Requirement is 4.5 for AA (this will not be a perfect metric since there are multiple standards but should meet most of our needs)
      const highestContrastMode =
        lightModeContrast > darkModeContrast ? 'light' : 'dark';

      return highestContrastMode;
    }, [modes, bg]);

    return (
      <ColorMode
        className={className}
        mode={accessibleMode ?? active}
        bg={bg ?? 'background'}
        {...rest}
        ref={ref}
      >
        {children}
      </ColorMode>
    );
  }
);
