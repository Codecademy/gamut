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
    <PaginationButton
      onMouseEnter={() => setContents(ellipsisButtonContents[direction])}
      onMouseLeave={() => setContents(ellipsisButtonContents.ellipsis)}
      {...props}
      ref={ref}
      showButton={showButton}
    >
      {contents}
    </PaginationButton>
  );
});
