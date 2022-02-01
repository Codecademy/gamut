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
  showButton?: 'shown' | 'hidden';
}

const animationVariants = {
  shown: {
    width: 'initial',
    display: 'flex',
    overflow: 'hidden',
  },
  hidden: {
    width: 0,
    overflow: 'hidden',
  },
};

export const SlideAnimation: React.FC<ButtonAnimationProps> = ({
  children,
  showButton,
}) => {
  return (
    <AnimatePresence>
      {showButton === 'shown' && (
        <motion.div
          initial="hidden"
          animate={showButton}
          variants={animationVariants}
          exit="hidden"
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface SlideAnimationProps {
  direction?: 'back' | 'forward';
  WrappedComponent: React.Component;
  showButton?: 'hidden' | 'shown';
}

type WrappedComponentProps<
  WrappedComponent
> = React.ComponentProps<WrappedComponent>;

const wrapWithSlideAnimation = ({
  direction,
  WrappedComponent,
  showButton,
}: SlideAnimationProps) => {
  return (props: WrappedComponentProps<WrappedComponent>) => (
    <AnimatePresence>
      {showButton === 'shown' && (
        <motion.div
          initial={direction === 'forward' ? 'shown' : 'hidden'}
          animate={showButton}
          variants={animationVariants}
          exit="hidden"
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          <Component {...props} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
