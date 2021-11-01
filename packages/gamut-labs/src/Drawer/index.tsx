import { Box, BoxProps } from '@codecademy/gamut';
import { breakpoints, timingValues } from '@codecademy/gamut-styles';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useMedia } from 'react-use';

const DrawerBase = motion(Box);

export interface DrawerProps extends Omit<BoxProps, 'width'> {
  /**
   * Whether the drawer should be open.
   */
  expanded?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  expanded,
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
          bg="background"
          exit={{ width: 0 }}
          initial={{ width: 0 }}
          overflowX="hidden"
          overflowY="auto"
          position="relative"
          transition={{ duration: timingValues.slow / 1000 }}
          {...props}
        >
          <Box
            height="100%"
            left="0"
            position="absolute"
            maxWidth="100%"
            minWidth={fullWidth}
          >
            {children}
          </Box>
        </DrawerBase>
      ) : null}
    </AnimatePresence>
  );
};
