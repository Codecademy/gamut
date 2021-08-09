import { MiniDeleteIcon } from '@codecademy/gamut-icons';
import React, { ComponentProps } from 'react';

import { Box } from '../Box';
import { IconButton } from '../Button';
import { Overlay } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer } from './elements';
import { ModalBaseProps } from './types';

export interface ModalProps extends ModalBaseProps {
  size?: ComponentProps<typeof ModalContainer>['size'];
  /**
   * Whether to hide the default close button and pass your own through children
   */
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  className,
  size = 'fluid',
  onRequestClose,
  showCloseButton = true,
  ...rest
}) => {
  return (
    <Overlay
      shroud
      onRequestClose={onRequestClose}
      data-testid="modal"
      {...rest}
    >
      <ModalContainer
        className={className}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
        layout="standard"
        size={size}
      >
        {title && (
          <Text as="h2" fontSize={20} lineHeight="base" gridArea="title">
            {title}
          </Text>
        )}
        {showCloseButton && (
          <IconButton
            aria-label="Close Dialog"
            size="small"
            alignSelf="start"
            icon={MiniDeleteIcon}
            onClick={onRequestClose}
            gridArea="close"
          />
        )}
        <Box gridArea="content">{children}</Box>
      </ModalContainer>
    </Overlay>
  );
};
