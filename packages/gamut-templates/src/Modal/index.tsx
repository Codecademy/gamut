import React, { useState, ReactHTML } from 'react';
import cx from 'classnames';
import {
  Modal as ModalPrimitive,
  ButtonBase,
  CardShell,
} from '@codecademy/gamut';
import { CloseIcon } from '@codecademy/gamut-icons';
import styles from './styles.module.scss';

export type ModalProps = {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
  modalOpener?: keyof ReactHTML | React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  onClose,
  modalOpener,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <>
      <template onClick={() => setIsOpen(true)}>{modalOpener}</template>
      <ModalPrimitive isOpen={isOpen} className={cx(styles.modal, className)}>
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
      </ModalPrimitive>
    </>
  );
};

export default Modal;
