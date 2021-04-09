import { Theme, useTheme } from '@emotion/react';
import { get } from 'lodash';
import { getContrast } from 'polished';
import React, { useContext, useMemo } from 'react';

import { ColorMode, ProviderProps } from './ColorMode';
import { GamutContext } from './GamutProvider';

export interface BackgroundProps extends ProviderProps {
  bg: keyof Theme['colors'];
  className?: string;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  className,
  bg,
  ...rest
}) => {
  const {
    colorModes: { modes },
  } = useTheme();
  const { staticTokens } = useContext(GamutContext);
  const background = get(staticTokens, ['colors', bg]);
  const accessibleMode = useMemo(() => {
    const { light, dark } = modes;
    const lightText = get(staticTokens, ['colors', light.text]);
    const darkText = get(staticTokens, ['colors', dark.text]);

    const lightModeContrast = getContrast(lightText, background);
    const darkModeContrast = getContrast(darkText, background);
    // Minimum Contrast Requirement is 4.5 for AA (this will not be a perfect metric since there are multiple standards but should meet most of our needs)
    const highestContrastMode =
      lightModeContrast > darkModeContrast ? 'light' : 'dark';

    return highestContrastMode;
  }, [modes, staticTokens, background]);

  return (
    <ColorMode className={className} mode={accessibleMode} bg={bg} {...rest}>
      {children}
    </ColorMode>
  );
};
