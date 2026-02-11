import { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  createButtonComponent,
  InlineIconButton,
  InlineIconButtonProps,
  sizeVariants,
  textButtonVariants,
} from './shared';

const TextButtonBase = createButtonComponent(textButtonVariants, sizeVariants);

export type TextButtonProps = InlineIconButtonProps<typeof TextButtonBase>;

export const TextButton = forwardRef<
  ButtonBaseElements | null,
  TextButtonProps
>(({ ...props }, ref) => {
  return <InlineIconButton button={TextButtonBase} {...props} ref={ref} />;
});
