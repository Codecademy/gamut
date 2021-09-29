import { Box } from '@codecademy/gamut';
import { breakpoints, system, timingValues } from '@codecademy/gamut-styles';
import { StyleProps, variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useMedia } from 'react-use';

const drawerProps = variance.compose(system.positioning);

const DrawerBase = styled(motion.custom(Box))(drawerProps);

export interface DrawerProps extends StyleProps<typeof drawerProps> {
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
          transition={{ duration: timingValues.slow / 1000 }}
          {...props}
        >
          <Box left="0" position="absolute" width={fullWidth}>
            {children}
          </Box>
        </DrawerBase>
      ) : null}
    </AnimatePresence>
  );
};
