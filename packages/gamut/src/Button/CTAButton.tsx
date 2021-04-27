import { fontFamily } from '@codecademy/gamut-styles';
import { css, useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import { ButtonProps, config, modeColorGroups } from './shared';

const CTAButtonInner = styled(
  ButtonInner,
  config
)<ButtonProps>(({ mode = 'light', variant = 'primary' }) => {
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
});

const CTAButtonOuter = styled(ButtonOutline)<{ variant?: 'primary' }>`
  padding: 1px 1px 5px 5px;
`;

export type CTAButtonProps = ComponentProps<typeof CTAButtonOuter>;

export const CTAButton = forwardRef<ButtonBaseElements, CTAButtonProps>(
  ({ children, mode, ...props }, ref) => {
    const {
      colorModes: { active },
    } = useTheme();
    const currentMode = mode ?? active;

    return (
      <CTAButtonOuter mode={currentMode} {...props} ref={ref}>
        <CTAButtonInner mode={currentMode} {...props}>
          {children}
        </CTAButtonInner>
      </CTAButtonOuter>
    );
  }
);
