import { fontFamily } from '@codecademy/gamut-styles';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, modeColorGroups } from './shared';

const CTAButtonInner = styled(ButtonInner)<ButtonProps>(
  ({ mode = 'light', variant = 'primary' }: ButtonProps) => {
    const modeColors = modeColorGroups[mode][variant];

    return css`
      background-color: ${modeColors.background};
      border-radius: 2px;
      box-shadow: -4px 4px 0 0 ${modeColors.shadow};
      color: ${modeColors.foreground};
      font-family: ${fontFamily.accent};
      font-weight: bold;
      padding: 0.75rem 1.25rem;

      ${CTAButtonOuter}:hover & {
        box-shadow: -8px 8px 0 0 ${modeColors.shadow};
      }

      ${CTAButtonOuter}:active & {
        background: ${modeColors.shadow};
        box-shadow: none;
      }

      ${CTAButtonOuter}:disabled &,
      ${CTAButtonOuter}[aria-disabled='true'] & {
        background: ${modeColors.backgroundMuted};
        box-shadow: -4px 4px 0 1px ${modeColors.foregroundMuted};
        color: ${modeColors.foregroundMuted};
      }
    `;
  }
);

const CTAButtonOuter = styled(ButtonOutline)<{ variant?: 'primary' }>`
  padding: 1px 1px 5px 5px;
`;

export const CTAButton: React.FC<
  React.ComponentProps<typeof CTAButtonOuter> & { variant?: never }
> = ({ children, mode, ...props }) => {
  const {
    colorModes: { active },
  } = useTheme();
  return (
    <CTAButtonOuter mode={active} {...props}>
      <CTAButtonInner mode={active}>{children}</CTAButtonInner>
    </CTAButtonOuter>
  );
};
