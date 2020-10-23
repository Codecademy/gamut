import { colors, fontFamily, swatches } from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const CTAButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = 'light' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];
    const shadow = mode === 'light' ? colors.black : colors.white;

    return css`
      background-color: ${modeColors.background};
      border-radius: 2px;
      box-shadow: -3px 5px 0 1px ${shadow};
      color: ${modeColors.foreground};
      font-family: ${fontFamily.accent};
      font-weight: bold;
      padding: 0.75rem 1.25rem;

      ${CTAButtonOuter}:hover & {
        box-shadow: -6px 8px 0 1px ${shadow};
      }

      ${CTAButtonOuter}:active & {
        background: ${shadow};
        box-shadow: none;
      }

      ${CTAButtonOuter}:disabled & {
        background: ${mode === 'light'
          ? swatches.gray[200]
          : swatches.gray[600]};
        box-shadow: -3px 5px 0 1px
          ${mode === 'light' ? swatches.gray[600] : swatches.gray[200]};
        color: ${mode === 'light' ? swatches.gray[600] : swatches.gray[200]};
      }
    `;
  }
);

const CTAButtonOuter = styled(ButtonOutline)`
  padding: 1px 1px 7px 5px;
`;

export const CTAButton: React.FC<React.ComponentProps<
  typeof CTAButtonOuter
>> = ({ children, mode, ...props }) => {
  return (
    <CTAButtonOuter mode={mode} {...props}>
      <CTAButtonInner mode={mode}>{children}</CTAButtonInner>
    </CTAButtonOuter>
  );
};
