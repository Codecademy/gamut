import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const TextButtonInner = styled(ButtonInner)<SizedButtonProps>(
  ({ mode = 'light', size }: SizedButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 3px;
      color: ${modeColors.background};
      ${buttonSizing(size)}

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
  React.ComponentProps<typeof TextButtonOuter> & SizedButtonProps
> = ({ children, mode, size, ...props }) => {
  return (
    <TextButtonOuter mode={mode} {...props}>
      <TextButtonInner mode={mode} size={size}>
        {children}
      </TextButtonInner>
    </TextButtonOuter>
  );
};
