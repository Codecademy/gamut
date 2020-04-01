import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React from 'react';

import { BodyPortal } from '../BodyPortal';
import styles from './styles.module.scss';

export type OverlayProps = {
  children: React.ReactElement<any>;
  className?: string;
  clickOutsideDeactivates?: boolean;
  isOpen?: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
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

export default Overlay;
