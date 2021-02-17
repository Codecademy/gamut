import { spacing } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

export const TextButtonInner = styled(ButtonInner)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light', theme }) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 3px;
      padding-left: ${theme.spacing[8]};
      padding-right: ${theme.spacing[8]};
      color: ${modeColors.background};

      ${TextButtonOuter}:hover & {
        background-color: ${modeColors.backgroundEmphasized};
      }

      ${TextButtonOuter}:active & {
        color: ${modeColors.background};
      }

      ${TextButtonOuter}:disabled &,
      ${TextButtonOuter}[aria-disabled='true'] & {
        background-color: transparent;
        color: ${modeColors.foregroundMuted};
        cursor: not-allowed;
      }
    `;
  }
);

const TextButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

export const TextButton: React.FC<
  SizedButtonProps & React.ComponentProps<typeof TextButtonOuter>
> = ({ children, mode, size, ...props }) => {
  return (
    <TextButtonOuter mode={mode} {...props}>
      <TextButtonInner mode={mode} size={size}>
        {children}
      </TextButtonInner>
    </TextButtonOuter>
  );
};
