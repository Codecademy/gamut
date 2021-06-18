import {
  serializeTokens,
  StyleProps,
  ThemeProps,
  variance,
} from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mapValues, pick } from 'lodash';
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
import { styledOptions } from './variance/utils';

export type Colors = keyof Theme['colors'];
export type ColorModeConfig = Theme['modes'];
export type ColorModes = keyof ColorModeConfig;
export type ColorModeShape = ColorModeConfig[ColorModes];
export type ColorAlias = keyof ColorModeShape;

export type ColorModeProps = {
  mode: ColorModes;
  bg?: Colors;
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

export const VariableProvider = styled(
  'div',
  styledOptions(['variables', 'alwaysSetVariables'])
)<
  StyleProps<typeof providerProps> & {
    variables?: CSSObject;
    alwaysSetVariables?: boolean;
  }
>(({ variables }) => variables, css({ textColor: 'text' }), providerProps);

const currentBg = '--color-background-current';
export const ColorMode = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof VariableProvider>, 'bg'> & ColorModeProps
>(({ mode, alwaysSetVariables, bg, ...rest }, ref) => {
  const theme = useTheme();
  const { modes, mode: active, colors } = theme;

  /** Serialize color variables for the current mode
   * 1. If all variables are requried add all mode variables to the current context
   * 2. If the user has specified a background color - set that color to the current-bg
   * 3. If not
   */
  const { variables } = useMemo(() => {
    return serializeTokens(
      mapValues(modes[mode], (color, key) => {
        if (key === 'background-current' && typeof bg !== 'undefined') {
          return colors[bg];
        }
        return colors[color];
      }),
      'color',
      theme
    );
  }, [colors, mode, modes, theme, bg]);

  if (active === mode) {
    const vars = alwaysSetVariables ? variables : pick(variables, [currentBg]);
    return <VariableProvider {...rest} variables={vars} ref={ref} />;
  }

  return (
    <ThemeProvider theme={{ mode }}>
      <VariableProvider {...rest} variables={variables} bg={bg} ref={ref} />
    </ThemeProvider>
  );
});
