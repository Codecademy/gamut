import React, { useCallback } from 'react';

import { BodyPortal } from '../BodyPortal';
import { FlexBox } from '../Box';
import { FocusTrap } from '../FocusTrap';

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
  /** Whether the overlay renders inset to its container or creates a portal to the end of the body */
  inset?: boolean;
};

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
  inset = false,
  clickOutsideCloses = true,
  escapeCloses = true,
  onRequestClose,
  isOpen,
}) => {
  const handleOutsideClick = useCallback(() => {
    clickOutsideCloses && onRequestClose();
  }, [clickOutsideCloses, onRequestClose]);

  const handleEscapeKey = useCallback(() => {
    escapeCloses && onRequestClose();
  }, [escapeCloses, onRequestClose]);

  if (!isOpen) return null;

  const content = (
    <FlexBox
      data-testid="overlay-content-container"
      position={inset ? 'absolute' : 'fixed'}
      justifyContent="center"
      alignItems="center"
      inset={0}
      className={className}
    >
      <FocusTrap
        active={!inset}
        onClickOutside={handleOutsideClick}
        onEscapeKey={handleEscapeKey}
      >
        {children}
      </FocusTrap>
    </FlexBox>
  );

  if (inset) return content;

  return <BodyPortal>{content}</BodyPortal>;
};
