import { createButtonComponent } from './shared';
import { ctaButtonVariants } from './variants';

export const CTAButton = createButtonComponent<{ variant?: 'primary' }>(
  'CTA',
  ctaButtonVariants
);
