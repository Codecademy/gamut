import { Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { createVariables } from './utilities';

type VariableProviderProps = {
  variables: Parameters<typeof createVariables>[0];
};

export const VariableProvider = styled.div<VariableProviderProps>`
  ${({ variables }) => createVariables(variables, 'colors')}
  /** reset the currentColor to the mode specified */
  color: ${({ theme }) => theme.colors.text}
`;

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
