import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, Colors } from '@codecademy/gamut-styles';
import * as React from 'react';

import { IconButton } from '../Button';
import { Drawer } from '../Drawer';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';

export interface FlyoutProps {
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
   * Which direction of the screen this flies out from.
   */
  openFrom?: 'left' | 'right';

  /**
   * Contents for a top-left h2.
   */
  title: React.ReactNode;
  bg?: Colors;
}

export const Flyout: React.FC<FlyoutProps> = ({
  children,
  closeLabel,
  expanded,
  openFrom = 'left',
  onClose,
  title,
  bg = 'background',
}) => {
  return (
    <Overlay
      clickOutsideCloses
      escapeCloses
      isOpen={expanded}
      onRequestClose={onClose}
      shroud
    >
      <Background bg={bg}>
        <Drawer
          bottom={0}
          display="flex"
          expanded={expanded}
          flexDirection={openFrom === 'left' ? 'row' : 'row-reverse'}
          position="fixed"
          top={0}
          {...{ [openFrom]: 0 }}
        >
          <Text
            as="h2"
            fontSize={22}
            mb={8}
            ml={16}
            mt={24}
            mr={40}
            maxWidth="100%"
          >
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
        </Drawer>
      </Background>
    </Overlay>
  );
};
