import { system, theme, timing } from '@codecademy/gamut-styles';
import {
  CSSObject,
  serializeTokens,
  StyleProps,
  ThemeProps,
  variance,
} from '@codecademy/variance';
import { css, Theme } from '@emotion/react';
import styled from '@emotion/styled';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { config, modeColorGroups } from './shared';
import { ButtonProps } from './types';

export const { tokens: buttonColors } = serializeTokens(
  modeColorGroups.dark.primary,
  'button',
  theme
);

/** This is a temporary tagged template for button hover / active states while they still are multiple elements */

export const createStates = ({
  base,
  hover,
  active,
  disabled,
}: Record<'base' | 'hover' | 'active' | 'disabled', CSSObject>) => css`
  ${base}
  ${ButtonOutline}:hover & {
    ${hover}
  }
  ${ButtonOutline}:active & {
    ${active}
  }
  ${ButtonOutline}:disabled &,
  ${ButtonOutline}[aria-disabled='true'] & {
    ${disabled}
  }
`;

const setTokens = ({
  mode = 'light',
  variant = 'primary',
  theme,
}: ThemeProps<ButtonProps>) =>
  serializeTokens(modeColorGroups[mode][variant], 'button', theme).variables;

const outlinePadding = system.variant({
  prop: 'padded',
  defaultVariant: 'small',
  variants: {
    small: { padding: '1px' },
    medium: { padding: '1px 1px 5px 5px' },
  },
});

const buttonProps = variance.compose(
  system.layout,
  system.positioning,
  system.margin
);

export interface ButtonOutlineProps
  extends ButtonProps,
    StyleProps<typeof outlinePadding>,
    StyleProps<typeof buttonProps> {
  mode?: Theme['colorModes']['active'];
  as?: never;
}

export const ButtonOutline = styled('button', config)<ButtonOutlineProps>(
  setTokens,
  system.css({
    display: 'inline-block',
    margin: '-1px',
    textAlign: 'center',
    transition: `${timing.fast} box-shadow`,
    borderRadius: '4px',
    boxShadow: '0 0 0 0 transparent',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    "&:disabled, &[aria-disabled='true']": {
      cursor: 'not-allowed',
      userSelect: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
    '&:focus-visible': {
      boxShadow: `0 0 0 2px ${buttonColors?.background}`,
    },
  }),
  outlinePadding,
  buttonProps
).withComponent(ButtonBase);
