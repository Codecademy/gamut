import { fontFamily, fontWeight } from '@codecademy/gamut-styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const CTAButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = 'light' }) => {
    const modeColors = modeColorGroups[mode];

    return css`
      border-radius: 2px;
      padding: 0.75rem 1.25rem;
      font-family: ${fontFamily.accent};
      font-weight: ${fontWeight.title};
      color: ${modeColors.foreground};
      background-color: ${modeColors.background};
      box-shadow: -4px 4px 0 0 ${modeColors.shadow};

      ${CTAButtonOuter}:hover & {
        box-shadow: -8px 8px 0 0 ${modeColors.shadow};
      }

      ${CTAButtonOuter}:active & {
        background-color: ${modeColors.shadow};
        box-shadow: none;
      }

      ${CTAButtonOuter}:disabled &,
      ${CTAButtonOuter}[aria-disabled='true'] & {
        color: ${modeColors.foregroundMuted};
        background-color: ${modeColors.backgroundMuted};
        box-shadow: -4px 4px 0 1px ${modeColors.foregroundMuted};
      }
    `;
  }
);

const CTAButtonOuter = styled(ButtonOutline)`
  padding: 1px 1px 5px 5px;
`;

export const CTAButton: React.FC<
  React.ComponentProps<typeof CTAButtonOuter>
> = ({ children, mode, ...props }) => {
  return (
    <CTAButtonOuter mode={mode} {...props}>
      <CTAButtonInner mode={mode}>{children}</CTAButtonInner>
    </CTAButtonOuter>
  );
};
