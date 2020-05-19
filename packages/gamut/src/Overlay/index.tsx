import cx from 'classnames';
import FocusTrap from 'focus-trap-react';
import React, { useRef, useEffect, useState } from 'react';

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
  const [trapActive, setTrapActive] = useState(false);
  const containerEl = useRef<HTMLDivElement>(null);

  const findFallbackFocusElement = () => {
    const fallbackFocusEl = containerEl.current?.querySelector(
      '[tabindex^="-"]'
    );

    if (!fallbackFocusEl) {
      throw new Error(
        'Expected at least one focusable element. Add an element with a negative tabindex to set a fallback.'
      );
    }

    return fallbackFocusEl as HTMLElement;
  };

  /**
   * Wait until the initial render is done to activate the focus trap
   * This ensures the children are rendered when we try to find the fallback focus element
   */
  useEffect(() => {
    if (isOpen) {
      setTrapActive(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <BodyPortal>
      <div className={cx(styles.container, className)} ref={containerEl}>
        <FocusTrap
          active={trapActive}
          focusTrapOptions={{
            clickOutsideDeactivates: clickOutsideCloses,
            escapeDeactivates: escapeCloses,
            onDeactivate: onRequestClose,
            fallbackFocus: findFallbackFocusElement,
          }}
        >
          {children}
        </FocusTrap>
      </div>
    </BodyPortal>
  );
};

export default Overlay;
