import { system, useCurrentMode } from '@codecademy/gamut-styles';
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

const { background, foregroundMuted, backgroundEmphasized } = buttonColors;

const TextButtonInner = styled(ButtonInner, config)<SizedButtonProps>(
  system.css({ px: 8 }),
  createStates({
    base: { color: background },
    hover: { backgroundColor: backgroundEmphasized },
    active: { color: background },
    disabled: {
      color: foregroundMuted,
      backgroundColor: 'transparent',
    },
  }),
  buttonSizing
);

export type TextButtonProps = SizedButtonProps & ButtonOutlineProps;

export const TextButton = forwardRef<ButtonBaseElements, TextButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const currentMode = useCurrentMode(mode);
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <TextButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </TextButtonInner>
      </ButtonOutline>
    );
  }
);
