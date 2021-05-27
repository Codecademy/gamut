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

const textVariant = (variant: 'primary' | 'secondary' | 'danger') =>
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
    transition: ` ${timing.fast} background-color, ${timing.fast} box-shadow,
    ${timing.fast} color`,
    borderColor: 'transparent',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      bg: 'button-hover-bg',
    },
  },
  variants: {
    primary: textVariant('primary'),
    secondary: textVariant('secondary'),
    danger: textVariant('danger'),
  },
});

const TextButtonInner = styled(ButtonBase, config)<SizedButtonProps>(
  buttonVariants,
  buttonSizing,
  system.css({
    display: 'inline-block',
    fontWeight: 'title',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    "&:disabled, &[aria-disabled='true']": {
      textColor: 'button-disabled-text',
      cursor: 'not-allowed',
      userSelect: 'none',
    },
  })
);

export type TextButtonProps = SizedButtonProps & ButtonOutlineProps;

export const TextButton = forwardRef<ButtonBaseElements, TextButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <TextButtonInner
        mode={currentMode}
        variant={variant}
        {...props}
        size={size}
        ref={ref}
      >
        {children}
      </TextButtonInner>
    );
  }
);
