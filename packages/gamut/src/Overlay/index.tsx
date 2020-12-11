import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React from 'react';
import { useLockBodyScroll } from 'react-use';

import { BodyPortal } from '../BodyPortal';
import styles from './styles.module.scss';

export type OverlayProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether clicking on the screen outside of the container should close the Overlay.
   */
  clickOutsideCloses?: boolean;
  /**
   * Whether clicking the escape key should close the Overlay.
   */
  escapeCloses?: boolean;
  /**
   * Called when the Overlay requests to be closed,
   * this could be due to clicking outside of the overlay, or by clicking the escape key.
   */
  onRequestClose: () => void;
  /**
   * Whether the overlay is rendered.
   */
  isOpen?: boolean;
  /**
   * Whether to use static positioning on the overlay. Defaults to false since by default Overlay's position is fixed.
   * @default false
   */
  staticPositioning?: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
  clickOutsideCloses = true,
  escapeCloses = true,
  staticPositioning = false,
  onRequestClose,
  isOpen,
}) => {
  useLockBodyScroll(isOpen);

  if (!isOpen) return null;

  return (
    <BodyPortal>
      <div
        className={cx(
          staticPositioning && styles.staticPositioning,
          styles.container,
          className
        )}
      >
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: clickOutsideCloses,
            escapeDeactivates: escapeCloses,
            onDeactivate: onRequestClose,
          }}
        >
          {children}
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};
