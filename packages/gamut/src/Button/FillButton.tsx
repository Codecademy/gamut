import { createButtonComponent } from './shared';
import { fillButtonVariants, sizeVariants } from './variants';

export const FillButton = createButtonComponent(
  'Fill',
  sizeVariants,
  fillButtonVariants
);
