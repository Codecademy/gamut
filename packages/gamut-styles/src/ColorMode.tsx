import { serializeTokens, StyleProps, variance } from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mapValues } from 'lodash';
import React, { ComponentProps, forwardRef, useMemo } from 'react';

import {
  color,
  flex,
  grid,
  layout,
  positioning,
  space,
} from './variance/props';
import { styledConfig } from './variance/utils';

export type Colors = keyof Theme['colors'];
export type ColorModeConfig = Theme['modes'];
export type ColorModes = keyof ColorModeConfig;
export type ColorModeShape = ColorModeConfig[ColorModes];
export type ColorAlias = keyof ColorModeShape;

export type ColorModeProps = {
  mode: ColorModes;
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

export function useColorMode(): [ColorModes, ColorModeShape, ColorModeConfig] {
  const { mode, modes } = useTheme() || {};
  return [mode, modes[mode], modes];
}

export function useCurrentMode(mode?: ColorModes) {
  const [activeMode] = useColorMode();
  return mode ?? activeMode;
}

export const VariableProvider = styled('div', styledConfig)<
  StyleProps<typeof providerProps> & {
    variables?: CSSObject;
    alwaysSetVariables?: boolean;
  }
>(({ variables }) => variables, providerProps);

export const ColorMode = forwardRef<
  HTMLDivElement,
  ColorModeProps & ComponentProps<typeof VariableProvider>
>(({ mode, alwaysSetVariables, ...rest }, ref) => {
  const theme = useTheme();
  const { modes, mode: active, colors } = theme;
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
        ref={ref}
        variables={alwaysSetVariables ? variables : undefined}
      />
    );
  }

  return (
    <ThemeProvider theme={{ mode }}>
      <VariableProvider
        variables={variables}
        textColor="text"
        {...rest}
        ref={ref}
      />
    </ThemeProvider>
  );
});
