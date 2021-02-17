import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const StrokeButtonInner = styled(ButtonInner)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light' }) => {
    const modeColors = modeColorGroups[mode];

    return css`
      color: ${modeColors.background};
      border-color: ${modeColors.background};

      ${StrokeButtonOuter}:hover & {
        background-color: ${modeColors.backgroundEmphasized};
      }

      ${StrokeButtonOuter}:active & {
        color: ${modeColors.foreground};
        background-color: ${modeColors.background};
      }

      ${StrokeButtonOuter}:disabled &,
      ${StrokeButtonOuter}[aria-disabled='true'] & {
        color: ${modeColors.foregroundMuted};
        border-color: ${modeColors.backgroundMuted};
        background-color: transparent;
      }
    `;
  }
);

const StrokeButtonOuter = styled(ButtonOutline)();

export const StrokeButton: React.FC<
  SizedButtonProps & React.ComponentProps<typeof StrokeButtonOuter>
> = ({ children, mode, size, ...props }) => {
  return (
    <StrokeButtonOuter mode={mode} {...props}>
      <StrokeButtonInner mode={mode} size={size}>
        {children}
      </StrokeButtonInner>
    </StrokeButtonOuter>
  );
};
