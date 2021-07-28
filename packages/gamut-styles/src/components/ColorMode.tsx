import {
  CSSObject,
  serializeTokens,
  StyleProps,
  variance,
} from '@codecademy/variance';
import { ThemeProvider, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { mapValues, pick } from 'lodash';
import React, { ComponentProps, forwardRef, useMemo } from 'react';

import { ColorModes, Colors } from '../types';
import {
  color,
  css,
  flex,
  grid,
  layout,
  positioning,
  space,
  states,
} from '../variance/props';
import { styledOptions } from '../variance/utils';

export interface ColorModeProps
  extends ComponentProps<typeof VariableProvider> {
  mode: ColorModes;
  bg?: Colors;
  resetVars?: boolean;
}

export const providerProps = variance.compose(
  layout,
  color,
  grid,
  flex,
  positioning,
  space
);

interface ProviderProps extends Omit<StyleProps<typeof providerProps>, 'bg'> {
  variables?: CSSObject;
  resetBg?: boolean;
}

export const VariableProvider = styled(
  'div',
  styledOptions(['variables', 'resetVars'])
)<ProviderProps>(
  ({ variables }) => variables,
  css({ textColor: 'text' }),
  states({
    resetBg: {
      bg: 'background-current',
    },
  }),
  providerProps
);

export const ColorMode = forwardRef<HTMLDivElement, ColorModeProps>(
  ({ mode, resetVars, bg, ...rest }, ref) => {
    const theme = useTheme();
    const { modes, mode: active, colors } = theme;
    const forwardedProps = {
      ...rest,
      ref,
      resetBg: !!bg,
    };

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
      const vars = resetVars
        ? variables
        : pick(variables, ['--color-background-current']);

      return <VariableProvider {...forwardedProps} variables={vars} />;
    }

    return (
      <ThemeProvider theme={{ mode }}>
        <VariableProvider {...forwardedProps} variables={variables} />
      </ThemeProvider>
    );
  }
);
