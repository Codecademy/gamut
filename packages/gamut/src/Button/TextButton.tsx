import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';

import type { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import type { IconComponentType } from '../utils';
import type { ButtonBaseProps, ButtonElementProps } from './shared';
import {
  createButtonComponent,
  InlineIconButton,
  sizeVariants,
  textButtonVariants,
} from './shared';

const TextButtonBase = createButtonComponent(textButtonVariants, sizeVariants);

/** Props for TextButton. Use this type when wrapping or composing TextButton. */
export interface TextButtonProps
  extends ButtonBaseProps,
    ButtonElementProps,
    Partial<IconComponentType> {
  iconPosition?: 'right' | 'left';
}

const TextButtonComponent = forwardRef<ButtonBaseElements, TextButtonProps>(
  ({ ...props }, ref) => {
    return <InlineIconButton button={TextButtonBase} {...props} ref={ref} />;
  }
);

export const TextButton =
  TextButtonComponent as unknown as ForwardRefExoticComponent<
    TextButtonProps & RefAttributes<ButtonBaseElements>
  >;
