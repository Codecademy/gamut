import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef } from 'react';
import * as React from 'react';

import { BaseEllipsisButton } from './EllipsisButton';
import { PaginationButton } from './PaginationButton';

type PaginationUtils = {
  chapterSize: number;
  currentPage: number;
  shownPageArray: number[];
  totalPages: number;
};

export const shouldPagesChange = ({
  chapterSize,
  currentPage,
  shownPageArray,
  totalPages,
}: PaginationUtils) =>
  currentPage < shownPageArray[0] ||
  (currentPage || totalPages) > shownPageArray[chapterSize - 1] ||
  shownPageArray[0] === 0;

export const getBackPageNumber = ({
  shownPageArray,
  chapterSize,
}: Omit<PaginationUtils, 'totalPages' | 'currentPage'>) =>
  shownPageArray[0] - chapterSize < 1 ? 1 : shownPageArray[0] - chapterSize;

export const getForwardPageNumber = ({
  chapterSize,
  totalPages,
  shownPageArray,
}: Omit<PaginationUtils, 'currentPage'>) =>
  shownPageArray[0] + chapterSize >= totalPages
    ? totalPages
    : shownPageArray[0] + chapterSize;

export const getMinWidth = ({
  chapterSize,
}: Pick<PaginationUtils, 'chapterSize'>) => `${chapterSize * 3 + 18}rem`;

const slideAnimationVariants = {
  shown: {
    width: 'initial',
    overflow: 'hidden',
    transitionEnd: { overflow: 'visible' },
  },
  hidden: {
    width: 0,
    overflow: 'hidden',
    transitionEnd: { overflow: 'visible' },
  },
};

export const wrapWithSlideAnimation = (
  WrappedComponent: typeof BaseEllipsisButton | typeof PaginationButton
) => {
  return (props: React.ComponentProps<typeof BaseEllipsisButton>) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
      // stops the initial mount of the forward buttons from animating in
      isFirstRender.current = false;
    }, []);

    return (
      <AnimatePresence>
        {props.showButton === 'shown' && (
          <motion.div
            animate={props.showButton}
            exit="hidden"
            initial={
              props.direction === 'forward' && isFirstRender.current
                ? 'shown'
                : 'hidden'
            }
            transition={{ duration: 0.3 }}
            variants={slideAnimationVariants}
          >
            <WrappedComponent {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    );
  };
};

const fadeAnimationVariants = {
  shown: {
    opacity: 1,
    cursor: 'pointer',
    visibility: 'visible' as const,
  },
  hidden: {
    opacity: 0,
    cursor: 'default',
    visibility: 'hidden' as const,
    transitionEnd: { visibility: 'hidden' as const },
  },
};

export const createAnimatedFadeButton = (
  WrappedComponent: typeof PaginationButton
) => {
  const AnimatedButton = motion.create(WrappedComponent);
  return (props: React.ComponentProps<typeof AnimatedButton>) => (
    <AnimatedButton
      animate={props.showButton}
      aria-label={
        props.showButton === 'hidden' ? undefined : props['aria-label']
      }
      disabled={props.showButton === 'hidden'}
      initial={false}
      transition={{
        duration: 0.3,
        ease: [0.04, 0.62, 0.23, 0.98],
      }}
      variants={fadeAnimationVariants}
      {...props}
    />
  );
};
