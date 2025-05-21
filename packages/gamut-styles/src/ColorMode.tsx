import {
  serializeTokens,
  StyleProps,
  ThemeProps,
  variance,
} from '@codecademy/variance';
import { CSSObject, Theme, ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import mapValues from 'lodash/mapValues';
import pick from 'lodash/pick';
import {
  ComponentProps,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { theme as GamutTheme } from '.';
import {
  background,
  border,
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
  mode: ColorModes | 'system';
  bg?: Colors;
};

export const providerProps = variance.compose(
  layout,
  color,
  grid,
  flex,
  positioning,
  space,
  border,
  background
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

interface BackgroundCurrentContextInterface {
  'background-current'?: keyof typeof GamutTheme.colors;
}

const BackgroundCurrentContext =
  createContext<BackgroundCurrentContextInterface>({
    'background-current': undefined,
  });

export function useColorModes(): [
  ColorModes,
  ColorModeShape,
  ColorModeConfig,
  (color: Colors) => string
] {
  const bgCurrent = useContext(BackgroundCurrentContext);
  const { mode, modes, _getColorValue: getColorValue } = useTheme() || {};
  const modesCopy = { ...modes };

  if (
    bgCurrent['background-current'] &&
    modesCopy[mode]['background-current'] !== bgCurrent['background-current']
  ) {
    /* sets the color to the copy of our modes object, and casts the type as the default color values for background-current.
    we could potentially alter the Merge type utility function from createTheme, but since 'background-current' is the only exception to the type-merging rule  and this is the only place we override, this seems to be a more straightforward + lower-risk solution.
    */

    modesCopy[mode]['background-current'] = bgCurrent['background-current'] as
      | 'white'
      | 'navy-800';
  }

  return [mode, modesCopy?.[mode], modes, getColorValue];
}

export function useCurrentMode(mode?: ColorModes) {
  const [activeMode] = useColorModes();
  return mode ?? activeMode;
}

export function usePrefersDarkMode() {
  const [prefersDarkMode, setPrefersDarkMode] = useState(false);

  useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setPrefersDarkMode(event.matches);
    }

    if (window && 'matchMedia' in window) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');

      if (mq && 'addEventListener' in mq) {
        setPrefersDarkMode(mq.matches);
        mq.addEventListener('change', onChange);

        return () => mq.removeEventListener('change', onChange);
      }
    }
  }, []);

  return prefersDarkMode;
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

export const ColorMode = forwardRef<
  HTMLDivElement,
  Omit<ComponentProps<typeof VariableProvider>, 'bg'> & ColorModeProps
>(({ mode: preference, alwaysSetVariables, bg, ...rest }, ref) => {
  // checks if the user has set 'system' as their color mode preference
  // then sets the color mode
  const prefersDarkMode = usePrefersDarkMode();
  const mode =
    preference === 'system' ? (prefersDarkMode ? 'dark' : 'light') : preference;

  const theme = useTheme();
  const { modes, mode: active, colors } = theme;
  const contextBg = bg ? 'background-current' : undefined;
  // This makes sure the background-current context is always set to the correct color + not the semantic color name.
  const currentParentBg = useContext(BackgroundCurrentContext);

  const bgCurrent =
    bg === 'background-current'
      ? currentParentBg['background-current']
        ? currentParentBg['background-current']
        : modes[active]['background-current']
      : bg;

  /** Serialize color variables for the current mode
   * 1. If all variables are required add all mode variables to the current context
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
    const vars = alwaysSetVariables
      ? variables
      : pick(variables, ['--color-background-current']);

    return (
      <BackgroundCurrentContext.Provider
        value={{ 'background-current': bgCurrent }}
      >
        <VariableProvider {...rest} bg={contextBg} ref={ref} variables={vars} />
      </BackgroundCurrentContext.Provider>
    );
  }

  return (
    <ThemeProvider theme={{ mode }}>
      <VariableProvider
        {...rest}
        bg={contextBg}
        ref={ref}
        variables={variables}
      />
    </ThemeProvider>
  );
});
