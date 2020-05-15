import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React from 'react';

import { BodyPortal } from '../BodyPortal';
import styles from './styles.module.scss';

export type OverlayProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether clicking on the screen outside of the container should close the Overlay
   */
  clickOutsideDeactivates?: boolean;
  /**
   * Whether clicking the escape key should close the Overlay
   */
  escapeDeactivates?: boolean;
  /**
   * Called when the Overlay automatically requests to be closed,
   * this could be due to clicking outside of the overlay with the `clickOutsideDeactivates` option enabled, or by clicking the escape key
   */
  onRequestDeactivate?: () => void;
  isOpen?: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
  clickOutsideDeactivates,
  escapeDeactivates = true,
  onRequestDeactivate,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <BodyPortal>
      <div className={cx(styles.container, className)}>
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates,
            escapeDeactivates,
            onDeactivate: onRequestDeactivate,
          }}
        >
          {children}
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};

export default Overlay;
