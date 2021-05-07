import { Box, FillButton, StrokeButton } from '@codecademy/gamut';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useRef, useState } from 'react';

import { Popover } from '../Popover';
import { DropdownItem, DropdownList } from './DropdownList';

export type DropdownButtonProps = {
  buttonType: 'fill' | 'stroke';
  dropdownItems: DropdownItem[];
  align?: 'left' | 'right';
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
  buttonType,
  children,
  align = 'left',
  dropdownItems,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (event: React.MouseEvent) => {
    setIsOpen(!isOpen);
  };

  let clickTarget: React.ReactNode;
  switch (buttonType) {
    case 'fill':
      clickTarget = <FillButton onClick={handleClick}>{children}</FillButton>;
      break;
    case 'stroke':
      clickTarget = (
        <StrokeButton onClick={handleClick}>{children}</StrokeButton>
      );
      break;
  }

  return (
    <>
      <Box display="inline-block" ref={targetRef}>
        {clickTarget}
      </Box>
      <AnimatePresence>
        {isOpen && (
          <Popover
            targetRef={targetRef}
            isOpen={isOpen}
            align={align}
            verticalOffset={12}
            outline
          >
            <motion.div
              style={{ overflow: 'hidden' }}
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              transition={{ duration: 0.175 }}
              exit={{ height: 0 }}
            >
              <DropdownList dropdownItems={dropdownItems} />
            </motion.div>
          </Popover>
        )}
      </AnimatePresence>
    </>
  );
};
