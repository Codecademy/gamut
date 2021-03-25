import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import { meetsContrastGuidelines } from 'polished';
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
  const { text } = modes[active];
  const accessibleMode = useMemo(() => {
    const { AA } = meetsContrastGuidelines(text, colors[color]);

    // Minimum Contrast Requirement is 4.5 for AA (this will not be a perfect metric since there are multiple standards but should meet most of our needss)
    if (!AA) {
      return Object.keys(omit(modes, active))[0] as keyof typeof modes;
    }
    return active;
  }, [color, active, modes, text]);

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
