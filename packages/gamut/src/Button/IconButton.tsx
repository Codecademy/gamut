import { GamutIconProps } from '@codecademy/gamut-icons';
import { css, timing, useCurrentMode, variant } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBase, ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonOutlineProps } from './ButtonOutline';
import { SizedButtonProps } from './types';

const createVariantStyles = (variant: 'primary' | 'secondary' | 'danger') =>
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
    primary: createVariantStyles('primary'),
    secondary: createVariantStyles('secondary'),
    danger: createVariantStyles('danger'),
  },
});
const IconButtonInner = styled(ButtonBase)<SizedButtonProps>(
  variant({
    prop: 'size',
    variants: {
      normal: {
        height: 40,
        width: 40,
      },
      small: {
        height: 32,
        width: 32,
      },
    },
  }),
  buttonVariants,
  css({
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

export interface IconButtonProps extends SizedButtonProps, ButtonOutlineProps {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
}

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ icon: Icon, size = 'normal', mode, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <IconButtonInner mode={currentMode} size={size} {...props} ref={ref}>
        {Icon && (
          <Icon
            width="calc(100% - 14px)"
            height="calc(100% - 14px)"
            aria-hidden
          />
        )}
      </IconButtonInner>
    );
  }
);
