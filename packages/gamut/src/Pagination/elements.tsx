import { states, theme, transitionConcat } from '@codecademy/gamut-styles';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { Box } from '..';
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
    transition: transitionConcat(['opacity', 'font-weight'], 'fast', 'ease-in'),
  },
  [ButtonSelectors.HOVER]: {
    transition: transitionConcat(
      ['font-weight', 'background-color'],
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
  [ButtonSelectors.ACTIVE]: {
    borderColor: 'currentColor',
  },
  [ButtonSelectors.SHADOW]: {
    transition: transitionConcat(
      ['opacity', 'font-weight', 'border-color'],
      'fast',
      'ease-in'
    ),
  },
  '&:hover': {
    transition: transitionConcat(['font-weight', 'color'], 'fast', 'ease-in'),
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

interface ButtonAnimationProps {
  isVisible?: boolean;
}

export const ButtonAnimation: React.FC<ButtonAnimationProps> = ({
  children,
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, width: 'fit-content' }}
          exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
        >
          {children} ?
        </motion.div>
      )}
    </AnimatePresence>
  );
};
