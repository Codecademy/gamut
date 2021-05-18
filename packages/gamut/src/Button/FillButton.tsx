import { useCurrentMode } from '@codecademy/gamut-styles';
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
import { buttonSizing, config } from './shared';
import { SizedButtonProps } from './types';

const {
  background,
  foreground,
  backgroundMuted,
  backgroundDull,
  foregroundMuted,
} = buttonColors;

const FillButtonInner = styled(ButtonInner, config)<SizedButtonProps>(
  createStates({
    base: { color: foreground, backgroundColor: background },
    hover: { backgroundColor: backgroundDull },
    active: { borderColor: background },
    disabled: {
      color: foregroundMuted,
      backgroundColor: backgroundMuted,
    },
  }),
  buttonSizing
);

export type FillButtonProps = SizedButtonProps & ButtonOutlineProps;

export const FillButton = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <FillButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </FillButtonInner>
      </ButtonOutline>
    );
  }
);
