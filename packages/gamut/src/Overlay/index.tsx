import FocusTrap from 'focus-trap-react';
import React, { useLayoutEffect } from 'react';

import { BodyPortal } from '../BodyPortal';
import { FlexBox } from '../Box';

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
  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <BodyPortal>
      <FlexBox
        data-testid="overlay-content-container"
        position={staticPositioning ? 'static' : 'fixed'}
        justifyContent="center"
        alignItems="center"
        bottom="0"
        left="0"
        right="0"
        top="0"
        className={className}
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
      </FlexBox>
    </BodyPortal>
  );
};
