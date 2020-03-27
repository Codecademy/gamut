import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React from 'react';

import { BodyPortal } from '../BodyPortal';
import styles from './styles.module.scss';

export type ModalProps = {
  children: React.ReactElement<any>;
  className?: string;
  clickOutsideDeactivates?: boolean;
  isOpen?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  className,
  children,
  clickOutsideDeactivates,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <BodyPortal>
      <div className={cx(styles.container, className)}>
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates }}>
          {children}
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};

export default Modal;
