import React, { useState } from 'react';
import cx from 'classnames';
import { Modal, ButtonBase, CardShell } from '@codecademy/gamut';
import { CloseIcon } from '@codecademy/gamut-icons';
import styles from './styles.module.scss';

export type DismissableModalProps = {
  children?: React.ReactNode;
  className?: string;
};

export const DismissableModal: React.FC<DismissableModalProps> = ({
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal isOpen={isOpen} className={cx(styles.modal, className)}>
      <div className={styles.modalContainer}>
        <CardShell className={styles.modalBody}>
          <div className={styles.closeButtonContainer}>
            <ButtonBase
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
            >
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
    </Modal>
  );
};

export default DismissableModal;
