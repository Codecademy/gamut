import {
  serializeTokens,
  StyleProps,
  ThemeProps,
  variance,
} from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mapValues } from 'lodash';
import React, { ComponentProps, forwardRef, useMemo } from 'react';

import {
  color,
  css,
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

export const modeColorProps = ({
  theme,
  mode,
}: ThemeProps<{ mode?: ColorModes }>) => {
  if (!theme || !mode || mode === theme?.mode) return {};
  const { colors } = theme;
  return serializeTokens(
    mapValues(theme?.modes[mode], (color) => colors[color]),
    'color',
    theme
  ).variables;
};

export function useColorModes(): [
  ColorModes,
  ColorModeShape,
  ColorModeConfig,
  (color: Colors) => string
] {
  const { mode, modes, _getColorValue: getColorValue } = useTheme() || {};
  return [mode, modes?.[mode], modes, getColorValue];
}

export function useCurrentMode(mode?: ColorModes) {
  const [activeMode] = useColorModes();
  return mode ?? activeMode;
}

export const VariableProvider = styled('div', styledConfig)<
  StyleProps<typeof providerProps> & {
    variables?: CSSObject;
    alwaysSetVariables?: boolean;
  }
>(({ variables }) => variables, css({ textColor: 'text' }), providerProps);

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
      <VariableProvider variables={variables} {...rest} ref={ref} />
    </ThemeProvider>
  );
});
