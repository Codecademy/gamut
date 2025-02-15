import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, FlexBox } from '../../Box';
import { Popover } from '../../Popover';
import { TargetContainer } from '../shared/elements';
import { escapeKeyPressHandler, getPopoverAlignment } from '../shared/utils';
import {
  deprecatedTooltipDefaultProps,
  DeprecatedToolTipPlacementComponentProps,
} from './types';
import { getDeprecatedAccessibilityProps } from './utils';

export const DeprecatedFloatingToolTip: React.FC<
  DeprecatedToolTipPlacementComponentProps
> = ({
  alignment = deprecatedTooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = deprecatedTooltipDefaultProps.widthMode,
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

  const accessibilityProps = getDeprecatedAccessibilityProps({
    focusable,
    id,
    isOpenPopoverToolTip: isOpen,
  });

  const popoverAlignments = getPopoverAlignment({ alignment });

  const handleShowHideAction = ({
    type,
  }:
    | React.FocusEvent<HTMLDivElement, Element>
    | React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        animation="fade"
        aria-live="polite"
        horizontalOffset={offset}
        isOpen={isOpen}
        outline
        role="tooltip"
        variant="secondary"
        skipFocusTrap
        targetRef={ref}
        widthRestricted={widthMode === 'standard'}
      >
        <FlexBox id={id} alignItems="flex-start" flexDirection="column">
          {children}
        </FlexBox>
      </Popover>
    </Box>
  );
};
