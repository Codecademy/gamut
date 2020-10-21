import { fontSize, swatches } from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonOutline } from './ButtonOutline';

import { ButtonProps, modeColorGroups } from './shared';

const FillButtonInner = styled.span<ButtonProps>(
  ({ mode = 'light' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      background-color: ${modeColors.background};
      border-radius: 3px;
      color: ${modeColors.foreground};
      display: inline-block;
      font-size: ${fontSize.text.md};
      padding: 0.75rem 1rem;

      ${FillButtonOuter}:hover & {
        background-color: #5533ff; // (asking in #gamut-team)
      }

      ${FillButtonOuter}:disabled & {
        background: ${mode === 'light'
          ? swatches.gray[200]
          : swatches.gray[600]};
        color: ${mode === 'light' ? swatches.gray[600] : swatches.gray[200]};
        cursor: not-allowed;
      }
    `;
  }
);

const FillButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

// Todo: how to compose?
export const FillButton: React.FC<React.ComponentProps<
  typeof FillButtonOuter
>> = ({ children, ...props }) => {
  return (
    <FillButtonOuter {...props}>
      <FillButtonInner>{children}</FillButtonInner>
    </FillButtonOuter>
  );
};
