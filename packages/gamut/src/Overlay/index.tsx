import React, { useCallback } from 'react';
import { FocusOn } from 'react-focus-on';

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
};

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
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

  return (
    <BodyPortal>
      <FlexBox
        data-testid="overlay-content-container"
        position="fixed"
        justifyContent="center"
        alignItems="center"
        bottom="0"
        left="0"
        right="0"
        top="0"
        className={className}
      >
        <FocusOn
          enabled={isOpen}
          onClickOutside={handleOutsideClick}
          onEscapeKey={handleEscapeKey}
        >
          {children}
        </FocusOn>
      </FlexBox>
    </BodyPortal>
  );
};
