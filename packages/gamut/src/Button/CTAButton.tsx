import type { ForwardRefExoticComponent, RefAttributes } from 'react';

import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import type { ButtonBaseProps, ButtonElementProps } from './shared';
import { createButtonComponent } from './shared/styles';
import { ctaButtonVariants } from './shared/variants';

const CTAButtonBase = createButtonComponent<{ variant?: 'primary' }>(
  ctaButtonVariants
);

/** Props for CTAButton. Use this type when wrapping or composing CTAButton. */
export interface CTAButtonProps extends ButtonBaseProps, ButtonElementProps {}

export const CTAButton = CTAButtonBase as unknown as ForwardRefExoticComponent<
  CTAButtonProps & RefAttributes<ButtonBaseElements>
>;
