import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline, ButtonOutlineProps } from './ButtonOutline';
import {
  buttonSizing,
  config,
  modeColorGroups,
  SizedButtonProps,
} from './shared';

const FillButtonInner = styled(ButtonInner, config)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light', variant = 'primary' }) => {
    const modeColors = modeColorGroups[mode][variant];
    return css`
      color: ${modeColors.foreground};
      background-color: ${modeColors.background};

      ${ButtonOutline}:hover & {
        background-color: ${modeColors.backgroundDull};
      }

      ${ButtonOutline}:active & {
        border-color: ${modeColors.background};
      }

      ${ButtonOutline}:disabled &,
      ${ButtonOutline}[aria-disabled='true'] & {
        color: ${modeColors.foregroundMuted};
        background-color: ${modeColors.backgroundMuted};
      }
    `;
  }
);

export type FillButtonProps = SizedButtonProps & ButtonOutlineProps;

export const FillButton = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const {
      colorModes: { active },
    } = useTheme();
    const currentMode = mode ?? active;
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <FillButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </FillButtonInner>
      </ButtonOutline>
    );
  }
);
