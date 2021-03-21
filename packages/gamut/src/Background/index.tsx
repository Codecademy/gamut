import { ColorMode, colorModes, colors } from '@codecademy/gamut-styles';
import { useTheme } from '@emotion/react';
import { omit } from 'lodash';
import { getContrast } from 'polished';
import React from 'react';

import { Box } from '../Box';

export const Background: React.FC<{ backgroundColor: keyof typeof colors }> = ({
  children,
  backgroundColor,
}) => {
  const {
    colorModes: { active, modes },
  } = useTheme();
  const { text } = modes[active];
  const contrast = getContrast(text, colors[backgroundColor]);

  if (contrast < 4) {
    return (
      <ColorMode
        mode={
          Object.keys(omit(colorModes, active))[0] as keyof typeof colorModes
        }
      >
        <Box backgroundColor={backgroundColor} textColor="text">
          {children}
        </Box>
      </ColorMode>
    );
  }
  return <Box backgroundColor={backgroundColor}>{children}</Box>;
};
