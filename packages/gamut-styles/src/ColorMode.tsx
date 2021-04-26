import { serializeTokens, StyleProps, variance } from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mapValues } from 'lodash';
import React, { ComponentProps, useMemo } from 'react';

import {
  color,
  flex,
  grid,
  layout,
  positioning,
  space,
} from './variance/props';
import { styledConfig } from './variance/utils';

export type ColorModeProps = {
  mode: keyof Theme['colorModes']['modes'];
  bg?: keyof Theme['colors'];
  className?: string;
};

export const providerProps = variance.compose(
  layout,
  color,
  grid,
  flex,
  positioning,
  space
);

export interface ProviderProps extends StyleProps<typeof providerProps> {
  alwaysSetVariables?: boolean;
}

export interface VariableProviderProps extends ProviderProps {
  variables?: CSSObject;
}

export const VariableProvider = styled(
  'div',
  styledConfig
)<VariableProviderProps>(({ variables }) => variables, providerProps);

export const ColorMode: React.FC<
  ColorModeProps & ComponentProps<typeof VariableProvider>
> = ({ mode, alwaysSetVariables, ...rest }) => {
  const theme = useTheme();
  const {
    colorModes: { modes, active },
    colors,
  } = theme;
  const { variables } = useMemo(
    () =>
      serializeTokens(
        mapValues(modes[mode], (color) => colors[color]),
        'color',
        theme
      ),
    [colors, mode, modes, theme]
  );
  if (active === mode) {
    return (
      <VariableProvider
        {...rest}
        variables={alwaysSetVariables ? variables : undefined}
      />
    );
  }

  return (
    <ThemeProvider theme={{ colorModes: { modes, active: mode } }}>
      <VariableProvider variables={variables} textColor="text" {...rest} />
    </ThemeProvider>
  );
};
