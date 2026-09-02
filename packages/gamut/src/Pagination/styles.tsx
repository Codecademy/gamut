import { states, theme, transitionConcat } from '@codecademy/gamut-styles';

import { templateVariants } from '../Button/shared/styles';
import { InteractiveSelectors } from '../ButtonBase/ButtonBase';

const paginationBaseStyles = {
  color: 'text',
  fontSize: 16,
  height: 40,
  mx: 4,
  width: 40,
  [InteractiveSelectors.ACTIVE]: {
    fontWeight: 'title',
    color: 'text',
  },
  [InteractiveSelectors.DISABLED]: {
    color: 'text-disabled',
    bg: 'transparent',
  },
  [InteractiveSelectors.OUTLINE]: { borderColor: 'border-primary' },
  [InteractiveSelectors.SHADOW_ACTIVE]: { opacity: 0 },
  [InteractiveSelectors.SHADOW_HOVER]: { opacity: 0 },
} as const;

export const paginationTextVariant = templateVariants(['secondary'], () => ({
  ...paginationBaseStyles,
  borderColor: 'transparent',
  [InteractiveSelectors.ACTIVE]: {
    fontWeight: 'title',
    color: 'text',
    bg: 'background-selected',
  },
  [InteractiveSelectors.SHADOW]: {
    transition: transitionConcat(['opacity'], 'fast', 'ease-in'),
  },
  [InteractiveSelectors.HOVER]: {
    transition: transitionConcat(
      ['background-color', 'font-weight'],
      'fast',
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
  [InteractiveSelectors.ACTIVE]: {
    borderColor: 'currentColor',
  },
  [InteractiveSelectors.SHADOW]: {
    transition: transitionConcat(
      ['opacity', 'border-color'],
      'fast',
      'ease-in'
    ),
  },
  '&:hover': {
    transition: transitionConcat(['color', 'font-weight'], 'fast', 'ease-in'),
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
  ellipsis: {
    fontWeight: 'title',
  },
});

export const hideOnMobile = {
  _: 'none',
  sm: 'inline-flex',
};
