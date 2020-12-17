import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const StrokeButtonInner = styled(ButtonInner)<SizedButtonProps>(
  ({ mode = 'light', size }: SizedButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border: 2px solid ${modeColors.background};
      border-radius: 3px;
      color: ${modeColors.background};
      ${buttonSizing(size)}

      ${StrokeButtonOuter}:hover & {
        background-color: ${modeColors.backgroundEmphasized};
      }

      ${StrokeButtonOuter}:active & {
        background: ${mode === 'light' ? colors.hyper : colors.yellow};
        color: ${modeColors.foreground};
      }

      ${StrokeButtonOuter}:disabled &,
      ${StrokeButtonOuter}[aria-disabled='true'] & {
        background-color: transparent;
        border-color: ${modeColors.backgroundMuted};
        color: ${modeColors.foregroundMuted};
        cursor: not-allowed;
      }
    `;
  }
);

const StrokeButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

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
