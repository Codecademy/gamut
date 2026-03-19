import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import type { IconComponentType } from '../utils';
import type { ButtonBaseProps, ButtonElementProps } from './shared';
import {
  createButtonComponent,
  fillButtonVariants,
  InlineIconButton,
  sizeVariants,
} from './shared';

const FillButtonBase = createButtonComponent(sizeVariants, fillButtonVariants);

/** Props for FillButton. Use this type when wrapping or composing FillButton. */
export interface FillButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    Partial<IconComponentType> {
  iconPosition?: 'right' | 'left';
}

const FillButtonComponent = forwardRef<ButtonBaseElements, FillButtonProps>(
  ({ ...props }, ref) => {
    return <InlineIconButton button={FillButtonBase} {...props} ref={ref} />;
  }
);

export const FillButton =
  FillButtonComponent as unknown as ForwardRefExoticComponent<
    FillButtonProps & RefAttributes<ButtonBaseElements>
  >;
