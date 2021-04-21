import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const FillButtonInner = styled(ButtonInner)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light', variant = 'primary' }: SizedButtonProps) => {
    const modeColors = modeColorGroups[mode][variant];
    return css`
      color: ${modeColors.foreground};
      background-color: ${modeColors.background};

      ${FillButtonOuter}:hover & {
        background-color: ${modeColors.backgroundDull};
      }

      ${FillButtonOuter}:active & {
        border-color: ${modeColors.background};
      }

      ${FillButtonOuter}:disabled &,
      ${FillButtonOuter}[aria-disabled='true'] & {
        color: ${modeColors.foregroundMuted};
        background-color: ${modeColors.backgroundMuted};
      }
    `;
  }
);

const FillButtonOuter = styled(ButtonOutline)();

export const FillButton: React.FC<
  SizedButtonProps & React.ComponentProps<typeof FillButtonOuter>
> = ({ children, mode, size, variant, ...props }) => {
  const {
    colorModes: { active },
  } = useTheme();
  const currentMode = mode ?? active;
  return (
    <FillButtonOuter mode={currentMode} variant={variant} {...props}>
      <FillButtonInner mode={currentMode} variant={variant} size={size}>
        {children}
      </FillButtonInner>
    </FillButtonOuter>
  );
};
