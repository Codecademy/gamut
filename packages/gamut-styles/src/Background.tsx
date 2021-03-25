import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { getContrast, meetsContrastGuidelines } from 'polished';
import React, { useMemo } from 'react';

import { ColorMode } from './ColorMode';
import { colors } from './variables';

/** This is needed to ensure that the rule for `color` is in the new context */
const Reset = styled.div<{ color: string; reset?: boolean }>`
  background-color: ${({ color }) => color};
  ${({ theme, reset }) => reset && `color: ${theme.colors.text};`}
`;

export const Background: React.FC<{ color: keyof typeof colors }> = ({
  children,
  color,
}) => {
  const {
    colors: themeColors,
    colorModes: { active, modes },
  } = useTheme();
  const accessibleMode = useMemo(() => {
    const { light, dark } = modes;

    const lightModeContrast = getContrast(light.text, colors[color]);
    const darkModeContrast = getContrast(dark.text, colors[color]);

    // Minimum Contrast Requirement is 4.5 for AA (this will not be a perfect metric since there are multiple standards but should meet most of our needs)
    const highestContrastMode =
      lightModeContrast > darkModeContrast ? 'light' : 'dark';
    const { AA } = meetsContrastGuidelines(
      modes[highestContrastMode].text,
      colors[color]
    );
    if (!AA) {
      // eslint-disable-next-line no-console
      console.warn(
        `You are using an inaccessible background color ${color} (${colors[color]}) for color contrast`
      );
    }
    return highestContrastMode;
  }, [color, modes]);

  if (accessibleMode === active) {
    return <Reset color={themeColors[color]}>{children}</Reset>;
  }

  return (
    <ColorMode mode={accessibleMode}>
      <Reset color={themeColors[color]} reset>
        {children}
      </Reset>
    </ColorMode>
  );
};
