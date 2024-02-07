import { createButtonComponent } from './shared';
import { sizeVariants, strokeButtonVariants } from './variants';

export const StrokeButton = createButtonComponent(
  sizeVariants,
  strokeButtonVariants
);
