import { createButtonComponent } from './shared/styles';
import { ctaButtonVariants } from './shared/variants';

export const CTAButton = createButtonComponent<{ variant?: 'primary' }>(
  ctaButtonVariants
);
