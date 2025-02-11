import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useCallback } from 'react';
import * as React from 'react';

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
  /** Whether the overlay renders inline to its container or creates a portal to the end of the body */
  inline?: boolean;
  /** Whether the overlay has a transparent or a shrouded background with slight opacity */
  shroud?: boolean;
  /** Whether the overlay allows scroll */
  allowScroll?: boolean;
};

const OverlayContainer = styled(FlexBox)(
  states({
    shroud: {
      bg: 'shadow-secondary',
    },
    inline: {
      position: 'absolute',
    },
  })
);

export const Overlay: React.FC<OverlayProps> = ({
  className,
  children,
  shroud = false,
  inline = false,
  clickOutsideCloses = true,
  escapeCloses = true,
  onRequestClose,
  isOpen,
  allowScroll = false,
}) => {
  const handleOutsideClick = useCallback(() => {
    if (clickOutsideCloses) {
      onRequestClose();
    }
  }, [clickOutsideCloses, onRequestClose]);

  const handleEscapeKey = useCallback(() => {
    if (escapeCloses) {
      onRequestClose();
    }
  }, [escapeCloses, onRequestClose]);

  if (!isOpen) return null;

  const content = (
    <OverlayContainer
      position="fixed"
      data-testid="overlay-content-container"
      center
      inset={0}
      className={className}
      inline={inline}
      shroud={shroud}
    >
      <FocusTrap
        active={!inline}
        onClickOutside={handleOutsideClick}
        onEscapeKey={handleEscapeKey}
        allowPageInteraction={allowScroll}
      >
        {children}
      </FocusTrap>
    </OverlayContainer>
  );

  if (inline) return content;

  return <BodyPortal>{content}</BodyPortal>;
};
