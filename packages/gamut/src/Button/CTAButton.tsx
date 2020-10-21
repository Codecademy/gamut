import {
  colors,
  fontFamily,
  fontSize,
  swatches,
} from '@codecademy/gamut-styles';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import React from 'react';

import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const CTAButtonInner = styled.span<ButtonProps>(
  ({ mode = 'light' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode];
    const shadow = mode === 'light' ? colors.black : colors.white;

    return css`
      background-color: ${modeColors.background};
      border-radius: 2px;
      box-shadow: -3px 5px 0 1px ${shadow};
      color: ${modeColors.foreground};
      display: block;
      font-family: ${fontFamily.accent};
      font-size: ${fontSize.text.md};
      font-weight: bold;
      padding: 0.75rem 1.25rem;
      transition: 150ms box-shadow;

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
        cursor: not-allowed;
      }

      ${CTAButtonOuter}:hover & {
        box-shadow: -6px 8px 0 1px ${shadow};
      }
    `;
  }
);

const CTAButtonOuter = styled(ButtonOutline)`
  padding: 1px 1px 7px 5px;
`;

// Todo: how to compose?
export const CTAButton: React.FC<React.ComponentProps<
  typeof CTAButtonOuter
>> = ({ children, ...props }) => {
  return (
    <CTAButtonOuter {...props}>
      <CTAButtonInner>{children}</CTAButtonInner>
    </CTAButtonOuter>
  );
};
