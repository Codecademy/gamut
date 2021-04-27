import { system } from '@codecademy/gamut-styles';
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

const CTAButtonInner = styled(ButtonInner, config)<ButtonProps>(
  system.css({
    borderRadius: '2px',
    fontFamily: 'accent',
    fontWeight: 'title',
    py: 12,
    px: 24,
  }),
  createStates({
    base: {
      color: foreground,
      boxShadow: `-4px 4px 0 0 ${shadow}`,
      backgroundColor: background,
    },
    hover: { boxShadow: `-8px 8px 0 0 ${shadow}` },
    active: { backgroundColor: shadow, boxShadow: 'none' },
    disabled: {
      backgroudnColor: backgroundMuted,
      boxShadow: `-4px 4px 0 1px ${foregroundMuted}`,
      color: foregroundMuted,
    },
  })
);

export type CTAButtonProps = Omit<
  ComponentProps<typeof ButtonOutline>,
  'padded'
>;

export const CTAButton = forwardRef<ButtonBaseElements, CTAButtonProps>(
  ({ children, mode, variant, ...props }, ref) => {
    const currentMode = useColorMode(mode);
    return (
      <ButtonOutline mode={currentMode} {...props} padded="medium" ref={ref}>
        <CTAButtonInner mode={currentMode} variant={variant}>
          {children}
        </CTAButtonInner>
      </ButtonOutline>
    );
  }
);
