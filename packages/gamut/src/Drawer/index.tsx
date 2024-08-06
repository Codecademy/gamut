import { breakpoints, timingValues } from '@codecademy/gamut-styles';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { useMedia } from 'react-use';

import { Box, BoxProps } from '../Box';

const DrawerBase = motion(Box);

export interface DrawerProps extends Omit<BoxProps, 'width'> {
  /**
   * Whether the drawer should be open.
   */
  expanded?: boolean;

  /**
   * Which edge of the drawer content container is aligned to during the animation.
   */
  alignContentContainer?: 'left' | 'right';
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  expanded,
  alignContentContainer = 'right',
  ...props
}) => {
  const isDesktop = useMedia(`(min-width: ${breakpoints.sm})`);
  const fullWidth = isDesktop ? `30rem` : '75vw';

  return (
    <AnimatePresence>
      {expanded ? (
        <DrawerBase
          animate={{ width: fullWidth }}
          aria-expanded={expanded}
          bg="background-current"
          exit={{ width: 0 }}
          initial={{ width: 0 }}
          overflow="clip"
          position="relative"
          transition={{ duration: timingValues.slow / 1000 }}
          {...props}
        >
          <Box
            borderRadius="medium"
            height="100%"
            {...{ [alignContentContainer]: 0 }}
            position="absolute"
            maxWidth="100%"
            minWidth={fullWidth}
            overflowY="auto"
            overflowX="hidden"
          >
            {children}
          </Box>
        </DrawerBase>
      ) : null}
    </AnimatePresence>
  );
};
