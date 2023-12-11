import { StreakIcon } from '../Icon/icons/StreakIcon';
import { createButtonComponent } from './shared';
import { fillButtonVariants, sizeVariants } from './variants';

export const FillButton = createButtonComponent(
  'Fill',
  sizeVariants,
  fillButtonVariants
);
const Cta = () => (
  <FillButton variant="primary" icon={StreakIcon}>
    Click Me
  </FillButton>
);
