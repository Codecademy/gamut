import { states, transitionConcat } from '@codecademy/gamut-styles';

import { templateVariants } from '../Button/shared';
import { ButtonSelectors } from '../ButtonBase/ButtonBase';

const paginationBaseStyles = {
  color: 'text',
  fontSize: 16,
  height: 40,
  mx: 4,
  width: 40,
  [ButtonSelectors.OUTLINE]: { borderColor: 'text' },
  [ButtonSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
} as const;

export const paginationTextVariant = templateVariants(['secondary'], () => ({
  ...paginationBaseStyles,
  borderColor: 'transparent',
  [ButtonSelectors.ACTIVE]: {
    fontWeight: 'title',
    color: 'text',
    bg: 'background-selected',
  },
  [ButtonSelectors.SHADOW]: {
    transition: transitionConcat(['opacity', 'font-weight'], 'fast', 'ease-in'),
  },
  [ButtonSelectors.SHADOW_ACTIVE]: { opacity: 0 },
  [ButtonSelectors.SHADOW_HOVER]: { opacity: 0 },
  [ButtonSelectors.HOVER]: {
    fontWeight: 'title',
    bg: 'background-selected',
  },
}));

export const paginationTextButtonStates = states({
  selected: {
    fontWeight: 'title',
    color: 'text',
    bg: 'background-selected',
  },
});

export const paginationStrokeVariant = templateVariants(['secondary'], () => ({
  ...paginationBaseStyles,
  [ButtonSelectors.ACTIVE]: {
    fontWeight: 'title',
    color: 'text',
    borderColor: 'currentColor',
  },
  [ButtonSelectors.SHADOW]: {
    transition: transitionConcat(
      ['opacity', 'font-weight', 'border-color'],
      'slow',
      'ease-in'
    ),
  },
  [ButtonSelectors.SHADOW_HOVER]: {
    opacity: 0,
  },
  [ButtonSelectors.SHADOW_ACTIVE]: {
    opacity: 0,
  },
  [ButtonSelectors.HOVER]: {
    fontWeight: 'title',
    color: 'primary',
  },
}));

export const paginationStrokeButtonStates = states({
  selected: {
    fontWeight: 'title',
    color: 'text',
    borderColor: 'currentColor',
  },
});
