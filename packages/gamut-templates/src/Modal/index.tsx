import React, { useState } from 'react';
import cx from 'classnames';
import { Overlay, ButtonBase, CardShell } from '@codecademy/gamut';
import { CloseIcon } from '@codecademy/gamut-icons';
import styles from './styles.module.scss';

export type ModalProps = {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  open?: boolean;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  onClose,
  open,
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Overlay isOpen={isOpen} className={cx(styles.modal, className)}>
      <div className={styles.modalContainer}>
        <CardShell className={styles.modalBody}>
          <div className={styles.closeButtonContainer}>
            <ButtonBase onClick={closeModal} className={styles.closeButton}>
              <CloseIcon
                color="#323233"
                width={22}
                height={22}
                className={styles.closeIcon}
              />
            </ButtonBase>
          </div>
          {children}
        </CardShell>
      </div>
    </Overlay>
  );
};

export default Modal;
