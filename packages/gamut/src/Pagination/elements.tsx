import { states, transitionConcat } from '@codecademy/gamut-styles';

import { createButtonComponent, templateVariants } from '../Button/shared';
import { ButtonSelectors } from '../ButtonBase/ButtonBase';

const paginationBaseStyles = {
  borderColor: 'transparent',
  color: 'text',
  fontSize: 16,
  height: 40,
  width: 40,
  py: 4,
  px: 16,
  [ButtonSelectors.OUTLINE]: { borderColor: 'text' },
  [ButtonSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
} as const;

const paginationTextVariant = templateVariants(['secondary'], () => ({
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
  [ButtonSelectors.SHADOW_ACTIVE]: { bg: 'background-selected', opacity: 1 },
  [ButtonSelectors.SHADOW_HOVER]: { bg: 'background-selected', opacity: 1 },
  [ButtonSelectors.HOVER]: {
    fontWeight: 'title',
    bg: 'selected',
    opacity: 1,
  },
}));

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
    borderColor: 'currentColor',
  },
}));

export const paginationTextButtonStates = states({
  selected: {
    fontWeight: 'title',
    color: 'text',
    bg: 'background-selected',
  },
});

export const paginationStrokeButtonStates = states({
  selected: {
    fontWeight: 'title',
    color: 'text',
    borderColor: 'currentColor',
  },
});

export const PaginationTextButton = createButtonComponent(
  paginationTextButtonStates,
  paginationTextVariant
);

export const PaginationStrokeButton = createButtonComponent(
  paginationStrokeButtonStates,
  paginationStrokeVariant
);
