import { system, timing } from '@codecademy/gamut-styles';
import { serializeTokens, StyleProps, ThemeProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { ComponentProps } from 'react';

import { ButtonBase } from '../ButtonBase/ButtonBase';
import { buttonColors, ButtonProps, config, modeColorGroups } from './shared';

export type ButtonOutlineProps = ComponentProps<typeof ButtonOutline>;

const setTokens = ({
  mode = 'light',
  variant = 'primary',
  theme,
}: ThemeProps<ButtonProps>) =>
  serializeTokens(modeColorGroups[mode][variant], 'button', theme!).variables;

const outlinePadding = system.variant({
  prop: 'padded',
  defaultVariant: 'small',
  variants: {
    small: { padding: '1px' },
    medium: { padding: '1px 1px 5px 5px' },
  },
});

export const ButtonOutline = styled('button', config)<
  ButtonProps & StyleProps<typeof outlinePadding>
>(
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
  outlinePadding
).withComponent(ButtonBase);
