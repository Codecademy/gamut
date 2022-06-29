import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, FlexBox } from '../Box';
import { Popover } from '../Popover';
import { TargetContainer } from './elements';
import { tooltipDefaultProps, ToolTipPlacementComponentProps } from './types';
import {
  escapeKeyPressHandler,
  getAccessibilityProps,
  getPopoverAlignment,
} from './utils';

export const FloatingToolTip: React.FC<ToolTipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = tooltipDefaultProps.widthMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    if (ref?.current) {
      setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, []);

  const accessibilityProps = getAccessibilityProps(focusable);
  const popoverAlignments = getPopoverAlignment({ alignment });

  const handleShowHideAction = (
    e:
      | React.FocusEvent<HTMLDivElement, Element>
      | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const { type } = e;

    if (type === 'focus' && !isOpen) {
      setIsOpen(true);
      setIsFocused(true);
    }
    if (type === 'blur' && isOpen) {
      setIsOpen(false);
      setIsFocused(false);
    }
    if (type === 'mouseenter' && !isOpen) {
      setIsOpen(true);
    }
    if (type === 'mouseleave' && isOpen && !isFocused) {
      setIsOpen(false);
    }
  };

  return (
    <Box
      position="relative"
      display="inline-flex"
      onMouseLeave={(e) => handleShowHideAction(e)}
    >
      <TargetContainer
        aria-labelledby={id}
        onKeyDown={(e) => escapeKeyPressHandler(e)}
        onFocus={(e) => {
          handleShowHideAction(e);
        }}
        onBlur={(e) => {
          handleShowHideAction(e);
        }}
        onMouseEnter={(e) => handleShowHideAction(e)}
        ref={ref}
        {...accessibilityProps}
      >
        {target}
      </TargetContainer>
      <Popover
        {...popoverAlignments}
        aria-live="polite"
        horizontalOffset={offset}
        isOpen={isOpen}
        skipFocusTrap
        outline
        role="tooltip"
        size="sml"
        targetRef={ref}
        widthRestricted={widthMode === 'standard'}
      >
        <FlexBox alignItems="flex-start" flexDirection="column">
          {children}
        </FlexBox>
      </Popover>
    </Box>
  );
};