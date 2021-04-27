import { themed } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React, { ComponentProps, forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { ButtonInner } from './ButtonInner';
import { ButtonOutline } from './ButtonOutline';
import {
  buttonColors,
  ButtonProps,
  config,
  createStates,
  useColorMode,
} from './shared';

const {
  background,
  foreground,
  shadow,
  backgroundMuted,
  foregroundMuted,
} = buttonColors;

const CTAButtonInner = styled(ButtonInner, config)<ButtonProps>`
  background-color: ${background};
  border-radius: 2px;
  box-shadow: -4px 4px 0 0 ${shadow};
  color: ${foreground};
  font-family: ${themed('fontFamily.accent')};
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  ${createStates({
    hover: { boxShadow: `-8px 8px 0 0 ${shadow}` },
    active: { backgroundColor: shadow, boxShadow: 'none' },
    disabled: {
      backgroudnColor: backgroundMuted,
      boxShadow: `-4px 4px 0 1px ${foregroundMuted}`,
      color: foregroundMuted,
    },
  })}
`;

export type CTAButtonProps = Omit<
  ComponentProps<typeof ButtonOutline>,
  'padded'
>;

export const CTAButton = forwardRef<ButtonBaseElements, CTAButtonProps>(
  ({ children, mode, ...props }, ref) => {
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} {...props} padded ref={ref}>
        <CTAButtonInner mode={currentMode} {...props}>
          {children}
        </CTAButtonInner>
      </ButtonOutline>
    );
  }
);
