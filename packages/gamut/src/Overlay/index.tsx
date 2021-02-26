import FocusTrap from 'focus-trap-react';
import React, { useCallback, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';

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
   * Whether to allow outside clicks in the overlay. No effect unless clickOutsideCloses is false. Check before using this prop, as it can have accessiblity implications.
   */
  allowOutsideClick?: boolean;
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
  allowOutsideClick,
  escapeCloses = true,
  staticPositioning = false,
  onRequestClose,
  isOpen,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const overlayContents = overlayRef.current?.firstChild;
      if (!overlayContents?.contains(e.target as HTMLElement)) {
        clickOutsideCloses && onRequestClose();
      }
    },
    [clickOutsideCloses, onRequestClose]
  );

  useIsomorphicLayoutEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isOpen ? 'hidden' : 'visible';
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document?.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <BodyPortal>
      <FocusTrap
        focusTrapOptions={{
          allowOutsideClick,
          escapeDeactivates: escapeCloses,
          onDeactivate: onRequestClose,
        }}
      >
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
          ref={overlayRef}
        >
          {children}
        </FlexBox>
      </FocusTrap>
    </BodyPortal>
  );
};
