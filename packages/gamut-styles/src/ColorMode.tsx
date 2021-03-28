import { compose, HandlerProps } from '@codecademy/gamut-system';
import { Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { properties } from './props';
import { createVariables } from './utilities';
import { colors } from './variables';

export type ColorModeProps = {
  mode: keyof Theme['colorModes']['modes'];
  initialBackground?: keyof typeof colors;
  className?: string;
};

const colorProps = compose(properties.backgroundColor, properties.textColor);

export interface VariableProviderProps extends HandlerProps<typeof colorProps> {
  variables: Parameters<typeof createVariables>[0];
}

export const VariableProvider = styled.div<VariableProviderProps>(
  compose(properties.backgroundColor, properties.textColor),
  ({ variables }) => createVariables(variables, 'colors')
);

export const ColorMode: React.FC<ColorModeProps> = ({
  mode,
  initialBackground,
  children,
  className,
}) => {
  const { colorModes } = useTheme();

  return (
    <ThemeProvider theme={{ colorModes: { ...colorModes, active: mode } }}>
      <VariableProvider
        variables={colorModes.modes[mode]}
        backgroundColor={initialBackground}
        textColor="text"
        className={className}
      >
        {children}
      </VariableProvider>
    </ThemeProvider>
  );
};
