import { GamutIconProps } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import {
  buttonColors,
  ButtonOutline,
  ButtonOutlineProps,
  createStates,
} from './ButtonOutline';
import { useColorMode } from './shared';
import { SizedButtonProps } from './types';

const { background, backgroundMuted, backgroundEmphasized } = buttonColors;

const IconButtonInner = styled(ButtonInner)<SizedButtonProps>(
  createStates({
    base: { color: background },
    hover: { backgroundColor: backgroundEmphasized },
    active: { color: background },
    disabled: {
      color: backgroundMuted,
      backgroundColor: 'transparent',
    },
  }),
  system.variant({
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
  })
);

export interface IconButtonProps extends SizedButtonProps, ButtonOutlineProps {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
}

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ icon: Icon, size = 'normal', mode, ...props }, ref) => {
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} size={size} {...props} ref={ref}>
        <IconButtonInner mode={currentMode} size={size}>
          {Icon && (
            <Icon
              width="calc(100% - 14px)"
              height="calc(100% - 14px)"
              aria-hidden
            />
          )}
        </IconButtonInner>
      </ButtonOutline>
    );
  }
);
