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

const TextButtonInner = styled(ButtonInner, config)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light', variant = 'primary', theme }) => {
    const modeColors = modeColorGroups[mode][variant];

    return css`
      padding-left: ${theme.spacing[8]};
      padding-right: ${theme.spacing[8]};
      color: ${modeColors.background};

      ${ButtonOutline}:hover & {
        background-color: ${modeColors.backgroundEmphasized};
      }

      ${ButtonOutline}:active & {
        color: ${modeColors.background};
      }

      ${ButtonOutline}:disabled &,
      ${ButtonOutline}[aria-disabled='true'] & {
        color: ${modeColors.foregroundMuted};
        background-color: transparent;
      }
    `;
  }
);

export type TextButtonProps = SizedButtonProps & ButtonOutlineProps;

export const TextButton = forwardRef<ButtonBaseElements, TextButtonProps>(
  ({ children, mode, size, variant, ...props }, ref) => {
    const {
      colorModes: { active },
    } = useTheme();
    const currentMode = mode ?? active;
    return (
      <ButtonOutline mode={currentMode} variant={variant} {...props} ref={ref}>
        <TextButtonInner mode={currentMode} variant={variant} size={size}>
          {children}
        </TextButtonInner>
      </ButtonOutline>
    );
  }
);
