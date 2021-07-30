import { createButtonComponent } from './shared';
import { sizeVariants, textButtonVariants } from './variants';

export const TextButton = createButtonComponent(
  textButtonVariants,
  sizeVariants
);
