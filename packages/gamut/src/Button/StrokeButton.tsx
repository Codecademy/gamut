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
import { buttonSizing, config, useColorMode } from './shared';
import { SizedButtonProps } from './types';

const {
  background,
  foreground,
  backgroundMuted,
  foregroundMuted,
  backgroundEmphasized,
} = buttonColors;

const StrokeButtonInner = styled(ButtonInner, config)<SizedButtonProps>(
  createStates({
    base: { color: background, borderColor: background },
    hover: { backgroundColor: backgroundEmphasized },
    active: { color: foreground, backgroundColor: background },
    disabled: {
      color: foregroundMuted,
      borderColor: backgroundMuted,
      backgroundColor: 'transparent',
    },
  }),
  buttonSizing
);

export type StrokeButtonProps = SizedButtonProps & ButtonOutlineProps;

export const StrokeButton = forwardRef<ButtonBaseElements, StrokeButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <StrokeButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </StrokeButtonInner>
      </ButtonOutline>
    );
  }
);
