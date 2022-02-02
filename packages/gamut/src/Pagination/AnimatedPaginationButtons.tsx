import { PaginationButton } from './PaginationButton';
import { createAnimatedFadeButton, wrapWithSlideAnimation } from './utils';

export const AnimatedFadeButton = createAnimatedFadeButton(PaginationButton);
export const AnimatedSlideButton = wrapWithSlideAnimation(PaginationButton);
