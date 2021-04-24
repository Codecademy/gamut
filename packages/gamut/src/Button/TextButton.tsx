import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { buttonSizing, modeColorGroups, SizedButtonProps } from './shared';

const TextButtonInner = styled(ButtonInner)<SizedButtonProps>(
  buttonSizing,
  ({ mode = 'light', variant = 'primary', theme }) => {
    const modeColors = modeColorGroups[mode][variant];

    return css`
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
        color: ${modeColors.foregroundMuted};
        background-color: transparent;
      }
    `;
  }
);

const TextButtonOuter = styled(ButtonOutline)();

export type TextButtonProps = SizedButtonProps &
  React.ComponentProps<typeof TextButtonOuter>;

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  mode,
  size,
  variant,
  ...props
}) => {
  return (
    <TextButtonOuter mode={mode} variant={variant} {...props}>
      <TextButtonInner mode={mode} variant={variant} size={size}>
        {children}
      </TextButtonInner>
    </TextButtonOuter>
  );
};
