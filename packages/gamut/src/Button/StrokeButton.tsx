import {
  system,
  timing,
  useCurrentMode,
  variant,
} from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBase, ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonOutlineProps } from './ButtonOutline';
import { buttonSizing, config } from './shared';
import { SizedButtonProps } from './types';

const strokeVariant = (variant: 'primary' | 'secondary' | 'danger') =>
  ({
    textColor: `button-${variant}-default`,
    '&:hover': {
      textColor: `button-${variant}-hover`,
    },
    '&:focus-visible': {
      boxShadow: `outline-${variant}`,
    },
  } as const);

const buttonVariants = variant({
  base: {
    border: 2,
    borderRadius: '4px',
    transition: `${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color`,
    borderColor: 'currentColor',
    '&:focus': {
      outline: 'none',
    },
  },
  variants: {
    primary: strokeVariant('primary'),
    secondary: strokeVariant('secondary'),
    danger: strokeVariant('danger'),
  },
});

const StrokeButtonInner = styled(ButtonBase, config)<SizedButtonProps>(
  buttonVariants,
  buttonSizing,
  system.css({
    display: 'inline-block',
    fontWeight: 'title',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    "&:disabled, &[aria-disabled='true']": {
      textColor: 'button-disabled-text',
      borderColor: 'button-disabled-bg',
      cursor: 'not-allowed',
      userSelect: 'none',
    },
  })
);

export type StrokeButtonProps = SizedButtonProps & ButtonOutlineProps;

export const StrokeButton = forwardRef<ButtonBaseElements, StrokeButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <StrokeButtonInner
        mode={currentMode}
        variant={variant}
        {...props}
        size={size}
      >
        {children}
      </StrokeButtonInner>
    );
  }
);
