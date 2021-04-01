import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { getContrast, meetsContrastGuidelines } from 'polished';
import React, { useMemo } from 'react';

import { ColorMode } from './ColorMode';
import { properties } from './props';
import { colors } from './variables';
import { layoutProps, spaceProps } from './variance/props';

const Reset = styled.div(properties.backgroundColor);

export type BackgroundProps = {
  initialBackground: keyof typeof colors;
  className?: string;
};

export const Bg: React.FC<BackgroundProps> = ({
  children,
  className,
  initialBackground,
}) => {
  const {
    colorModes: { active, modes },
  } = useTheme();
  const accessibleMode = useMemo(() => {
    const { light, dark } = modes;

    const lightModeContrast = getContrast(
      light.text,
      colors[initialBackground]
    );
    const darkModeContrast = getContrast(dark.text, colors[initialBackground]);

    // Minimum Contrast Requirement is 4.5 for AA (this will not be a perfect metric since there are multiple standards but should meet most of our needs)
    const highestContrastMode =
      lightModeContrast > darkModeContrast ? 'light' : 'dark';
    const { AA } = meetsContrastGuidelines(
      modes[highestContrastMode].text,
      colors[initialBackground]
    );
    if (!AA) {
      // eslint-disable-next-line no-console
      console.warn(
        `You are using an inaccessible background color ${initialBackground} (${colors[initialBackground]}) for color contrast`
      );
    }
    return highestContrastMode;
  }, [initialBackground, modes]);

  if (accessibleMode === active) {
    return (
      <Reset className={className} backgroundColor={initialBackground}>
        {children}
      </Reset>
    );
  }

  return (
    <ColorMode
      className={className}
      mode={accessibleMode}
      initialBackground={initialBackground}
    >
      {children}
    </ColorMode>
  );
};

export const Background = styled(Bg)(layoutProps, spaceProps);
