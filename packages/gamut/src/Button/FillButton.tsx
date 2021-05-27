import {
  system,
  timing,
  useCurrentMode,
  variant,
} from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBase, ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonOutlineProps } from './ButtonOutline';
import { buttonSizing, config } from './shared';
import { SizedButtonProps } from './types';

const buttonProps = variance.compose(
  system.layout,
  system.positioning,
  system.margin
);

const fillVariant = (variant: 'primary' | 'secondary' | 'danger') =>
  ({
    bg: `button-${variant}-default`,
    '&:active': {
      borderColor: `button-${variant}-default`,
    },
    '&:hover': {
      bg: `button-${variant}-hover`,
    },
    '&:focus-visible': {
      boxShadow: `outline-${variant}`,
    },
  } as const);

const buttonVariants = variant({
  base: {},
  variants: {
    primary: fillVariant('primary'),
    secondary: fillVariant('secondary'),
    danger: fillVariant('danger'),
  },
});

const FillButtonInner = styled(ButtonBase, config)<SizedButtonProps>(
  buttonSizing,
  buttonVariants,
  system.css({
    border: 2,
    borderRadius: '4px',
    borderColor: 'transparent',
    display: 'inline-block',
    fontWeight: 'title',
    textAlign: 'center',
    transition: ` ${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color`,
    whiteSpace: 'nowrap',
    textColor: 'background-base',
    "&:disabled, &[aria-disabled='true']": {
      bg: 'button-disabled-bg',
      textColor: 'button-disabled-text',
      cursor: 'not-allowed',
      userSelect: 'none',
    },
    '&:focus': {
      outline: 'none',
    },
  }),
  buttonProps
);

export type FillButtonProps = SizedButtonProps & ButtonOutlineProps;

export const FillButton = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <FillButtonInner
        mode={currentMode}
        variant={variant}
        size={size}
        ref={ref}
        {...props}
      >
        {children}
      </FillButtonInner>
    );
  }
);
