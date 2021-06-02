import { serializeTokens, StyleProps, variance } from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { isArray, isObject, isString, mapValues } from 'lodash';
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
>(({ variables }) => variables, providerProps);

export const ColorMode = forwardRef<
  HTMLDivElement,
  ColorModeProps & ComponentProps<typeof VariableProvider>
>(({ mode, alwaysSetVariables, bg, ...rest }, ref) => {
  const theme = useTheme();
  const { modes, mode: active, colors } = theme;
  const isCurrentMode = active === mode;

  const modeVars = useMemo(
    () =>
      serializeTokens(
        mapValues(modes[mode], (color) => colors[color]),
        'color',
        theme
      ).variables,
    [colors, mode, modes, theme]
  );
  const contextVars = useMemo(() => {
    if (bg && typeof bg === 'string') {
      return serializeTokens(
        { backgroundCurrent: theme.colors[bg as Colors] },
        'color',
        theme
      ).variables;
    }
    return {};
  }, [bg, theme]);

  const variables = useMemo(() => {
    if (!isCurrentMode || alwaysSetVariables) {
      return { ...modeVars, ...contextVars };
    }
    return contextVars;
  }, [isCurrentMode, contextVars, modeVars, alwaysSetVariables]);

  if (isCurrentMode) {
    return (
      <VariableProvider {...rest} bg={bg} ref={ref} variables={variables} />
    );
  }

  return (
    <ThemeProvider theme={{ mode }}>
      <VariableProvider
        variables={variables}
        textColor="text"
        bg={bg}
        {...rest}
        ref={ref}
      />
    </ThemeProvider>
  );
});
