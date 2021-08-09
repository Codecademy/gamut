import React, { ComponentProps } from 'react';

import { MiniDeleteIcon } from '../../../gamut-icons/dist';
import { Box } from '../Box';
import { IconButton } from '../Button';
import { Overlay, OverlayProps } from '../Overlay';
import { Text } from '../Typography';
import { ModalContainer } from './elements';

export type ModalOverlayProps = Pick<
  OverlayProps,
  'isOpen' | 'onRequestClose' | 'clickOutsideCloses' | 'escapeCloses'
>;

export interface ModalProps extends ModalOverlayProps {
  className?: string;
  size?: ComponentProps<typeof ModalContainer>['size'];
  title: React.ReactNode;
  children: React.ReactNode;
  /**
   * Whether to hide the default close button and pass your own through children
   */
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title,
  className,
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
            variant="secondary"
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
