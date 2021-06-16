import { createButtonComponent } from './shared';
import { fillButtonVariants, sizeVariants } from './variants';

export const FillButton = createButtonComponent(
  sizeVariants,
  fillButtonVariants
);
