import { CloseIcon } from '@codecademy/gamut-icons';
import cx from 'classnames';
import React from 'react';

import { ButtonDeprecated } from '../ButtonDeprecated';
import { CardShell } from '../Card';
import { Overlay, OverlayProps } from '../Overlay';
import styles from './styles.module.scss';

export type ModalDeprecatedOverlayProps = Partial<
  Pick<OverlayProps, 'clickOutsideCloses' | 'escapeCloses' | 'className'>
>;

export type ModalDeprecatedProps = {
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
  overlayProps?: ModalDeprecatedOverlayProps;

  /**
   * Whether to hide the default close button and pass your own through children
   */
  hideDefaultCloseButton?: boolean;
};

export const ModalDeprecated: React.FC<ModalDeprecatedProps> = ({
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
      <CardShell
        className={cx(styles.modalBody, className)}
        aria-hidden="false"
        aria-modal="true"
        role="dialog"
      >
        {!hideDefaultCloseButton && (
          <div
            className={styles.closeButtonContainer}
            data-testid="modal-default-close-button"
          >
            <ButtonDeprecated
              flat
              theme="brand-dark-blue"
              fitText
              onClick={onRequestClose}
              className={styles.closeButton}
            >
              <CloseIcon width={22} height={22} className={styles.closeIcon} />
            </ButtonDeprecated>
          </div>
        )}
        {children}
      </CardShell>
    </Overlay>
  );
};
