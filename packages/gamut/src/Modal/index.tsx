import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React from 'react';

import { BodyPortal } from '../BodyPortal';
import styles from './index.module.scss';

export type ModalClassNames = {
  container?: string;
  inside?: string;
};

export type ModalProps = {
  classNames?: ModalClassNames;
  clickOutsideDeactivates?: boolean;
  isOpen?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  classNames = {},
  children,
  clickOutsideDeactivates,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <BodyPortal>
      <div className={cx(styles.container, classNames.container)}>
        <FocusTrap focusTrapOptions={{ clickOutsideDeactivates }}>
          <div className={cx(styles.inside, classNames.inside)}>{children}</div>
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};

export default Modal;
