import { breakpoints, css, timingValues } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useMedia } from 'react-use';

import { Box, BoxProps } from '../Box';
import { focusVisibleStyle } from '../utils';

const drawerVisibleStyle = focusVisibleStyle('-3px');
const DrawerBase = styled(motion(Box))(css(drawerVisibleStyle));

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
  const drawerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMedia(`(min-width: ${breakpoints.sm})`);
  const fullWidth = isDesktop ? `30rem` : '75vw';

  useEffect(() => {
    if (expanded) drawerRef?.current?.focus();
  }, [expanded]);

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
          ref={drawerRef}
          tabIndex={-1}
          transition={{ duration: timingValues.slow / 1000 }}
          {...props}
        >
          <Box
            borderRadius="md"
            height="100%"
            {...{ [alignContentContainer]: 0 }}
            position="absolute"
            maxWidth="100%"
            minWidth={fullWidth}
            overflowY="auto"
            overflowX="hidden"
            p={4}
          >
            {children}
          </Box>
        </DrawerBase>
      ) : null}
    </AnimatePresence>
  );
};
