import { Box, IconButton, Overlay, Text } from '@codecademy/gamut';
import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { variant } from '@codecademy/gamut-styles';
import { StyleProps } from '@codecademy/variance';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

export const transitionDuration = 0.35;

const drawerOpenVariants = variant({
  defaultVariant: 'left',
  prop: 'openFrom',
  variants: {
    left: {
      right: 'auto',
      left: 0,
    },
    right: {
      right: 0,
      left: 'auto',
    },
  },
});

interface FlyoutStyleProps extends StyleProps<typeof drawerOpenVariants> {}

const DrawerBase = styled(motion.custom(Box))<FlyoutStyleProps>(
  drawerOpenVariants
);

const openWidth = 30;

export interface FlyoutProps extends StyleProps<typeof drawerOpenVariants> {
  /**
   * Accessibility label for the close button.
   */
  closeLabel: string;

  /**
   * Whether the flyout should be open.
   */
  expanded?: boolean;

  /**
   * Called by the Flyout to close itself.
   */
  onClose: () => void;

  /**
   * Contents for a top-left h2.
   */
  title: React.ReactNode;
}

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  closeLabel,
  expanded,
  openFrom = 'left',
  onClose,
  title,
}) => {
  const initialX = openFrom === 'left' ? -1000 : 1000;

  return (
    <Overlay
      clickOutsideCloses
      escapeCloses
      isOpen={expanded}
      onRequestClose={onClose}
      shroud
    >
      <AnimatePresence>
        {expanded ? (
          <DrawerBase
            aria-expanded={expanded}
            initial={{ x: initialX }}
            bg="background"
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ duration: transitionDuration }}
            width={{ _: '75%', sm: `${openWidth}rem` }}
            maxWidth={`${openWidth}rem`}
            openFrom={openFrom}
            position="fixed"
            bottom="0"
            top="0"
            overflowY="auto"
            overflowX="hidden"
          >
            <Text as="h2" fontSize={22} mb={8} ml={16} mt={24}>
              {title}
            </Text>
            <IconButton
              aria-label={closeLabel}
              icon={MiniDeleteIcon}
              onClick={onClose}
              position="absolute"
              top="1rem"
              right="0.5rem"
            />
            {children}
          </DrawerBase>
        ) : null}
      </AnimatePresence>
    </Overlay>
  );
};
