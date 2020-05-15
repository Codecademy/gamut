import React from 'react';
import cx from 'classnames';
import { CloseIcon } from '@codecademy/gamut-icons';

import Button from '../Button';
import { CardShell } from '../Card';
import { Overlay, OverlayProps } from '../Overlay';
import styles from './styles.module.scss';

export type ModalProps = Pick<OverlayProps, 'clickOutsideDeactivates'> & {
  children?: React.ReactNode;
  className?: string;
  /**
   * Whether the modal is open or closed
   */
  isOpen: boolean;
  /**
   * A function that, at minimum, sets the state to close the modal
   */
  closeModal?: () => void;
  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideDefaultCloseButton?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  closeModal,
  isOpen,
  clickOutsideDeactivates,
  hideDefaultCloseButton,
}) => {
  return (
    <Overlay
      isOpen={isOpen}
      className={cx(styles.modal, className)}
      clickOutsideDeactivates={clickOutsideDeactivates}
      data-testid="modal"
    >
      <div className={styles.modalContainer}>
        <CardShell className={styles.modalBody}>
          {!hideDefaultCloseButton && (
            <div
              className={styles.closeButtonContainer}
              data-testid="modal-default-close-button"
            >
              <Button
                flat
                theme="brand-dark-blue"
                fitText
                onClick={closeModal && closeModal}
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

export default Modal;
