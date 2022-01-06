import { states, theme, transitionConcat } from '@codecademy/gamut-styles';

import { templateVariants } from '../Button/shared';
import { ButtonSelectors } from '../ButtonBase/ButtonBase';

const paginationBaseStyles = {
  color: 'text',
  fontSize: 16,
  height: 40,
  mx: 4,
  width: 40,
  [ButtonSelectors.ACTIVE]: {
    fontWeight: 'title',
    color: 'text',
  },
  [ButtonSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
  [ButtonSelectors.OUTLINE]: { borderColor: 'text' },
  [ButtonSelectors.SHADOW_ACTIVE]: { opacity: 0 },
  [ButtonSelectors.SHADOW_HOVER]: { opacity: 0 },
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
    transition: transitionConcat(['opacity', 'font-weight'], 'slow', 'ease-in'),
  },
  [ButtonSelectors.HOVER]: {
    transition: transitionConcat(
      ['font-weight', 'background-color'],
      'slow',
      'ease-in'
    ),

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
    borderColor: 'currentColor',
  },
  [ButtonSelectors.SHADOW]: {
    transition: transitionConcat(
      ['opacity', 'font-weight', 'border-color'],
      'slow',
      'ease-in'
    ),
  },
  '&:hover': {
    transition: transitionConcat(['font-weight', 'color'], 'slow', 'ease-in'),
    fontWeight: 'title',
    // some styles in Reboot.tsx override this for the navigation variant. tl;dr - don't do this <3 web-plat
    color: `${theme.colors.primary} !important`,
  },
}));

export const paginationStrokeButtonStates = states({
  selected: {
    fontWeight: 'title',
    color: 'text',
    borderColor: 'currentColor',
  },
});
