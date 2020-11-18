import { colors } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const StrokeButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = 'light' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border: 2px solid ${modeColors.background};
      border-radius: 3px;
      color: ${modeColors.background};
      padding: 0.75rem 1rem;

      ${StrokeButtonOuter}:hover & {
        background-color: ${modeColors.backgroundEmphasized};
      }

      ${StrokeButtonOuter}:active & {
        background: ${mode === 'light' ? colors.hyper : colors.yellow};
        color: ${modeColors.foreground};
      }

      ${StrokeButtonOuter}:disabled & {
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

export const StrokeButton: React.FC<React.ComponentProps<
  typeof StrokeButtonOuter
>> = ({ children, mode, ...props }) => {
  return (
    <StrokeButtonOuter mode={mode} {...props}>
      <StrokeButtonInner mode={mode}>{children}</StrokeButtonInner>
    </StrokeButtonOuter>
  );
};
