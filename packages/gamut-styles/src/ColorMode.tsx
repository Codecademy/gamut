import { Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { createVariables } from './utilities';

export const VariableProvider = styled.div<{
  variables: Parameters<typeof createVariables>[0];
}>(({ variables }) => createVariables(variables));

export const ColorMode: React.FC<{
  mode: keyof Theme['colorModes']['modes'];
}> = ({ mode, children }) => {
  const { colorModes } = useTheme();

  return (
    <ThemeProvider theme={{ colorModes: { ...colorModes, active: mode } }}>
      <VariableProvider variables={colorModes.modes[mode]}>
        {children}
      </VariableProvider>
    </ThemeProvider>
  );
};
