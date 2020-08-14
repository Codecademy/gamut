import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import { useLockBodyScroll, usePrevious } from 'react-use';
import React, { useState, useEffect } from 'react';

import { BodyPortal } from '../BodyPortal';
import styles from './styles.module.scss';

export type OverlayProps = {
  children: React.ReactElement<any>;
  className?: string;
  /**
   * Whether clicking on the screen outside of the container should close the Overlay
   */
  clickOutsideCloses?: boolean;
  /**
   * Whether clicking the escape key should close the Overlay
   */
  escapeCloses?: boolean;
  /**
   * Called when the Overlay requests to be closed,
   * this could be due to clicking outside of the overlay, or by clicking the escape key
   */
  onRequestClose: () => void;
  isOpen?: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
  clickOutsideCloses = true,
  escapeCloses = true,
  onRequestClose,
  isOpen,
}) => {
  const [trapActive, setTrapActive] = useState(isOpen);
  const wasOpen = usePrevious(isOpen);

  const onDeactivateFocusTrap = () => {
    setTrapActive(false);
  };

  useLockBodyScroll(trapActive);

  useEffect(() => {
    // FocusTrap callbacks triggered deactivate
    if (wasOpen && isOpen && !trapActive) {
      onRequestClose();
    }
    // Parent component set isOpen to true
    if (!wasOpen && isOpen && !trapActive) {
      setTrapActive(true);
    }
    // Parent component set isOpen to false
    if (wasOpen && !isOpen && trapActive) {
      setTrapActive(false);
    }
  }, [isOpen, onRequestClose, trapActive, wasOpen]);

  if (!trapActive) return null;

  return (
    <BodyPortal>
      <div className={cx(styles.container, className)}>
        <FocusTrap
          focusTrapOptions={{
            clickOutsideDeactivates: clickOutsideCloses,
            escapeDeactivates: escapeCloses,
            onDeactivate: onDeactivateFocusTrap,
          }}
        >
          {children}
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};
