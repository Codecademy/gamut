import { swatches } from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';

import { VisualTheme } from '../theming/VisualTheme';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const FillButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = VisualTheme.LightMode }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];

    return css`
      background-color: ${modeColors.background};
      border-radius: 3px;
      color: ${modeColors.foreground};
      padding: 0.75rem 1rem;

      ${FillButtonOuter}:hover & {
        background-color: ${swatches.hyper['400']};
      }

      ${FillButtonOuter}:disabled & {
        background: ${modeColors.backgroundMuted};
        color: ${modeColors.foregroundMuted};
        cursor: not-allowed;
      }
    `;
  }
);

const FillButtonOuter = styled(ButtonOutline)`
  padding: 1px;
`;

export const FillButton: React.FC<React.ComponentProps<
  typeof FillButtonOuter
>> = ({ children, mode, ...props }) => {
  return (
    <FillButtonOuter mode={mode} {...props}>
      <FillButtonInner mode={mode}>{children}</FillButtonInner>
    </FillButtonOuter>
  );
};
