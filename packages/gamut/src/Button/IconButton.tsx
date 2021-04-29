import { GamutIconProps } from '@codecademy/gamut-icons';
import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonColors, createStates, useColorMode } from './shared';
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
        '> svg': {
          width: 24,
          height: 24,
        },
      },
      small: {
        height: 32,
        width: 32,
        '> svg': {
          width: 16,
          height: 16,
        },
      },
    },
  })
);

export type IconButtonProps = SizedButtonProps &
  ComponentProps<typeof ButtonOutline> & {
    children?: never;
    icon: React.ComponentType<GamutIconProps>;
  };

export const IconButton = forwardRef<ButtonBaseElements, IconButtonProps>(
  ({ icon: Icon, size = 'normal', mode, ...props }, ref) => {
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} size={size} {...props} ref={ref}>
        <IconButtonInner mode={currentMode} size={size}>
          {Icon && <Icon aria-hidden />}
        </IconButtonInner>
      </ButtonOutline>
    );
  }
);
