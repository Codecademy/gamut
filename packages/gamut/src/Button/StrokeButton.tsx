import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import type { IconComponentType } from '../utils';
import type { ButtonBaseProps, ButtonElementProps } from './shared';
import {
  createButtonComponent,
  InlineIconButton,
  sizeVariants,
  strokeButtonVariants,
} from './shared';

const StrokeButtonBase = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

/** Props for StrokeButton. Use this type when wrapping or composing StrokeButton. */
export interface StrokeButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    Partial<IconComponentType> {
  iconPosition?: 'right' | 'left';
}

const StrokeButtonComponent = forwardRef<ButtonBaseElements, StrokeButtonProps>(
  ({ ...props }, ref) => {
    return <InlineIconButton button={StrokeButtonBase} {...props} ref={ref} />;
  }
);

export const StrokeButton =
  StrokeButtonComponent as unknown as ForwardRefExoticComponent<
    StrokeButtonProps & RefAttributes<ButtonBaseElements>
  >;
