import { AnimatePresence, motion } from 'framer-motion';
import React, { forwardRef, useState } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { PaginationButton, PaginationButtonProps } from './PaginationButton';

export interface EllipsisButtonProps extends PaginationButtonProps {
  'aria-label': string;
  direction: 'back' | 'forward';
}

const animationVariants = {
  shown: {
    width: '40px',
  },
  hidden: {
    width: 0,
    overflow: 'hidden',
  },
};

const ellipsisButtonContents = { ellipsis: '•••', back: '«', forward: '»' };

export const EllipsisButton = forwardRef<
  ButtonBaseElements,
  EllipsisButtonProps
  // eslint-disable-next-line react/prop-types
>(({ direction, showButton, ...props }, ref) => {
  const [contents, setContents] = useState(ellipsisButtonContents.ellipsis);

  return (
    <AnimatePresence>
      {showButton === 'shown' && (
        <>
          <motion.div
            initial={direction === 'forward' ? 'shown' : 'hidden'}
            animate={showButton}
            variants={animationVariants}
            exit="hidden"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <PaginationButton
              onMouseEnter={() =>
                setContents(ellipsisButtonContents[direction])
              }
              onMouseLeave={() => setContents(ellipsisButtonContents.ellipsis)}
              {...props}
              ref={ref}
              showButton={showButton}
            >
              {contents}
            </PaginationButton>
          </motion.div>
          <motion.div
            initial={direction === 'forward' ? 'shown' : 'hidden'}
            animate={showButton}
            variants={animationVariants}
            exit="hidden"
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <PaginationButton {...props} ref={ref} showButton={showButton}>
              2
            </PaginationButton>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});
