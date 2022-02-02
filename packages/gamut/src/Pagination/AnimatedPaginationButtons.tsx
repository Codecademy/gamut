import { createAnimatedFadeButton, wrapWithSlideAnimation } from './animations';
import { PaginationButton } from './PaginationButton';

export const AnimatedFadeButton = createAnimatedFadeButton(PaginationButton);
export const AnimatedSlideButton = wrapWithSlideAnimation(PaginationButton);
