import React from 'react';
import cx from 'classnames';
import { CloseIcon } from '@codecademy/gamut-icons';

import { Button } from '../Button';
import { CardShell } from '../Card';
import { Overlay, OverlayProps } from '../Overlay';
import styles from './styles.module.scss';

export type ModalOverlayProps = Partial<
  Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses' | 'className'>
>;

export type ModalProps = {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the Modal is open or closed
   */
  isOpen: boolean;

  /**
   * A function that is called when the Modal expects to be closed
   * Triggered automatically by the Overlay component in certain situations
   */
  onRequestClose: () => void;

  /**
   * See Overlay component for prop definitions
   * @description ModalOverlayProps
   */
  overlayProps?: ModalOverlayProps;

  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideDefaultCloseButton?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  onRequestClose,
  overlayProps,
  isOpen,
  hideDefaultCloseButton,
}) => {
  return (
    <Overlay
      isOpen={isOpen}
      {...overlayProps}
      className={cx(styles.modal, overlayProps?.className)}
      onRequestClose={onRequestClose}
      data-testid="modal"
    >
      <div>
        <CardShell
          className={cx(styles.modalBody, className)}
          aria-hidden="false"
          role="dialog"
          tabIndex={0}
        >
          {!hideDefaultCloseButton && (
            <div
              className={styles.closeButtonContainer}
              data-testid="modal-default-close-button"
            >
              <Button
                flat
                theme="brand-dark-blue"
                fitText
                onClick={onRequestClose}
                className={styles.closeButton}
              >
                <CloseIcon
                  width={22}
                  height={22}
                  className={styles.closeIcon}
                />
              </Button>
            </div>
          )}
          {children}
        </CardShell>
      </div>
    </Overlay>
  );
};
