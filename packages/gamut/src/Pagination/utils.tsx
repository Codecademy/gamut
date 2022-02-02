import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

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
}: Omit<PaginationUtils, 'totalPages'>) =>
  currentPage < shownPageArray[0] ||
  currentPage > shownPageArray[chapterSize - 1] ||
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

const slideAnimationVariants = {
  shown: {
    width: 'initial',
  },
  hidden: {
    width: 0,
    overflow: 'hidden',
  },
};

type WrappedComponentProps<
  WrappedComponentProps extends typeof BaseEllipsisButton
> = React.ComponentProps<WrappedComponentProps>;

export const wrapWithSlideAnimation = (
  WrappedComponent: typeof BaseEllipsisButton
) => {
  return (props: WrappedComponentProps<typeof WrappedComponent>) => {
    const isFirstRender = useRef(true);

    useEffect(() => {
      // stops the initial mount of the forwarf buttons from animating in
      isFirstRender.current = false;
    }, []);

    return (
      <AnimatePresence>
        {props.showButton === 'shown' && (
          <motion.div
            animate={props.showButton}
            initial={
              props.direction === 'forward' && isFirstRender
                ? 'shown'
                : 'hidden'
            }
            variants={slideAnimationVariants}
            exit="hidden"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
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
  },
  hidden: {
    opacity: 0,
    cursor: 'default',
  },
};

export const createAnimatedFadeButton = (
  WrappedComponent: typeof PaginationButton
) => {
  const AnimatedButton = motion(WrappedComponent);
  return (props: WrappedComponentProps<typeof WrappedComponent>) => (
    <AnimatedButton
      {...props}
      animate={props.showButton}
      initial={false}
      variants={fadeAnimationVariants}
      disabled={props.showButton === 'hidden'}
      transitionStart={{ visibility: 'visible' }}
      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
      transitionEnd={{ visibility: 'hidden' }}
    />
  );
};
