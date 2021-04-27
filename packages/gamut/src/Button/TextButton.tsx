import { system } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline, ButtonOutlineProps } from './ButtonOutline';
import {
  buttonColors,
  buttonSizing,
  config,
  createStates,
  SizedButtonProps,
  useColorMode,
} from './shared';

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
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <TextButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </TextButtonInner>
      </ButtonOutline>
    );
  }
);
