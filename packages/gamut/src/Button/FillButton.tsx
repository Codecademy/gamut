import { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  createButtonComponent,
  fillButtonVariants,
  InlineIconButton,
  InlineIconButtonProps,
  sizeVariants,
} from './shared';

const FillButtonBase = createButtonComponent(sizeVariants, fillButtonVariants);

export type FillButtonProps = InlineIconButtonProps<typeof FillButtonBase>;

export const FillButton = forwardRef<
  ButtonBaseElements | null,
  FillButtonProps
>(({ ...props }, ref) => {
  return <InlineIconButton button={FillButtonBase} {...props} ref={ref} />;
});
