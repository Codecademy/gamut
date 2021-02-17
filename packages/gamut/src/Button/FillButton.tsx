import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const FillButtonInner = styled(ButtonInner)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light' }: SizedButtonProps) => {
    const modeColors = modeColorGroups[mode];
    return css`
      background-color: ${modeColors.background};
      border-radius: 3px;
      color: ${modeColors.foreground};

      ${FillButtonOuter}:hover & {
        background-color: ${modeColors.backgroundDull};
      }

      ${FillButtonOuter}:active & {
        border-color: ${modeColors.background};
      }

      ${FillButtonOuter}:disabled &,
      ${FillButtonOuter}[aria-disabled='true'] & {
        background: ${modeColors.backgroundMuted};
        color: ${modeColors.foregroundMuted};
      }
    `;
  }
);

const FillButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

export const FillButton: React.FC<
  SizedButtonProps & React.ComponentProps<typeof FillButtonOuter>
> = ({ children, mode, size, ...props }) => {
  return (
    <FillButtonOuter mode={mode} {...props}>
      <FillButtonInner mode={mode} size={size}>
        {children}
      </FillButtonInner>
    </FillButtonOuter>
  );
};
