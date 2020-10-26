import { swatches } from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { VisualTheme } from '../theming/VisualTheme';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const TextButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = VisualTheme.LightMode }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 3px;
      color: ${modeColors.background};
      padding: 0.75rem 1rem;

      ${TextButtonOuter}:hover & {
        background-color: ${mode === VisualTheme.LightMode
          ? swatches.gray[100]
          : swatches.gray[900]};
      }

      ${TextButtonOuter}:active & {
        color: ${modeColors.background};
      }

      ${TextButtonOuter}:disabled & {
        background-color: transparent;
        color: ${mode === VisualTheme.LightMode
          ? swatches.gray[600]
          : swatches.gray[200]};
        cursor: not-allowed;
      }
    `;
  }
);

const TextButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

export const TextButton: React.FC<React.ComponentProps<
  typeof TextButtonOuter
>> = ({ children, mode, ...props }) => {
  return (
    <TextButtonOuter mode={mode} {...props}>
      <TextButtonInner mode={mode}>{children}</TextButtonInner>
    </TextButtonOuter>
  );
};
