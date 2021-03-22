import { ColorMode, colorModes, colors } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { omit } from 'lodash';
import { getContrast } from 'polished';
import React, { useMemo } from 'react';

import { Box } from '../Box';

export const Background: React.FC<{ color: keyof typeof colors }> = ({
  children,
  color,
}) => {
  const {
    colorModes: { active, modes },
  } = useTheme();
  const { text } = modes[active];
  const accessibleMode = useMemo(() => {
    const contrast = getContrast(text, colors[color]);

    // Minimum Contrast Requirement (this will not be a perfect metric since there are multiple standards)
    if (contrast < 4) {
      return Object.keys(
        omit(colorModes, active)
      )[0] as keyof typeof colorModes;
    }
    return active;
  }, [color, active, text]);

  const content = (
    <Box backgroundColor={color} textColor="text">
      {children}
    </Box>
  );

  if (accessibleMode === active) {
    return content;
  }

  return <ColorMode mode={accessibleMode}>{content}</ColorMode>;
};
