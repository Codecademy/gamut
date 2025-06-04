import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import { Background, Colors } from '@codecademy/gamut-styles';
import * as React from 'react';

import { FlexBox } from '../Box';
import { IconButton } from '../Button';
import { Drawer } from '../Drawer';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { WithChildrenProp } from '../utils';

export interface FlyoutProps extends WithChildrenProp {
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
   * Contents for a top-left h1.
   */
  title: React.ReactNode;
  bg?: Colors;
}

export const Flyout: React.FC<FlyoutProps> = ({
  bg = 'background',
  children,
  closeLabel = 'Close',
  expanded,
  openFrom = 'left',
  onClose,
  title,
}) => {
  return (
    <Overlay
      clickOutsideCloses
      escapeCloses
      isOpen={expanded}
      shroud
      onRequestClose={onClose}
    >
      <Background bg={bg}>
        <Drawer
          alignContentContainer={openFrom === 'left' ? 'right' : 'left'}
          bottom={0}
          display="flex"
          expanded={expanded}
          flexDirection={openFrom === 'left' ? 'row' : 'row-reverse'}
          position="fixed"
          top={0}
          {...{ [openFrom]: 0 }}
        >
          <FlexBox
            alignItems="center"
            justifyContent="space-between"
            maxWidth="100%"
            mb={8}
            ml={16}
            mt={24}
          >
            <Text as="h1" fontSize={22}>
              {title}
            </Text>
            <IconButton
              aria-label="Close"
              icon={MiniDeleteIcon}
              mx={16}
              tip={closeLabel}
              tipProps={{
                alignment: 'bottom-center',
                placement: 'floating',
              }}
              onClick={onClose}
            />
          </FlexBox>
          {children}
        </Drawer>
      </Background>
    </Overlay>
  );
};
