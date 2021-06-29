import { AnimatePresence, motion, MotionProps, Variants } from 'framer-motion';
import React from 'react';

import { SearchPaneContents } from './SearchPaneContents';

const AnimatedPopoverVariants: Variants = {
  enter: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const animatedPopoverProps: MotionProps = {
  initial: 'exit',
  animate: 'enter',
  exit: 'exit',
  variants: AnimatedPopoverVariants,
};

export type SearchPaneProps = {
  isSearchVisible: boolean;
  onSearch: (query: string) => void;
  onTrackingClick: (target: string) => void;
  toggleSearch: () => void;
};

export const SearchPane: React.FC<SearchPaneProps> = ({
  isSearchVisible,
  onSearch,
  onTrackingClick,
  toggleSearch,
}) => {
  return isSearchVisible ? (
    <AnimatePresence>
      <motion.div key="search" {...animatedPopoverProps}>
        <SearchPaneContents
          onSearch={onSearch}
          onTrackingClick={onTrackingClick}
          toggleSearch={toggleSearch}
        />
      </motion.div>
    </AnimatePresence>
  ) : null;
};
