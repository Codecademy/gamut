import { forwardRef } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import {
  createButtonComponent,
  InlineIconButton,
  InlineIconButtonProps,
  sizeVariants,
  strokeButtonVariants,
} from './shared';

const StrokeButtonBase = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);

export type StrokeButtonProps = InlineIconButtonProps<typeof StrokeButtonBase>;

export const StrokeButton = forwardRef<
  ButtonBaseElements | null,
  StrokeButtonProps
>(({ ...props }, ref) => {
  return <InlineIconButton button={StrokeButtonBase} {...props} ref={ref} />;
});
