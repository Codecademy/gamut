import { CloseIcon } from '@codecademy/gamut-icons';
import React from 'react';

import {
  StyledCloseButton,
  StyledCloseButtonWrapper,
  StyledModalBody,
  StyledModalContainer,
} from './styles';
import { ModalProps } from './types';

export const Modal = ({
  children,
  className,
  onRequestClose,
  overlayProps,
  isOpen,
  hideDefaultCloseButton,
  ariaLabel,
}: ModalProps) => {
  return (
    <StyledModalContainer
      isOpen={isOpen}
      {...overlayProps}
      className={overlayProps?.className}
      onRequestClose={onRequestClose}
      data-testid="modal"
    >
      <StyledModalBody
        className={className}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
        aria-label={ariaLabel}
      >
        {!hideDefaultCloseButton && (
          <StyledCloseButtonWrapper>
            <StyledCloseButton
              data-testid="modal-default-close-button"
              onClick={onRequestClose}
              icon={CloseIcon}
            />
          </StyledCloseButtonWrapper>
        )}
        {children}
      </StyledModalBody>
    </StyledModalContainer>
  );
};
