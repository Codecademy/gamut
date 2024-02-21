import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, FlexBox } from '../../Box';
import { Popover } from '../../Popover';
import { TargetContainer } from './elements';
import { TipPlacementComponentProps } from './types';
import { getPopoverAlignment } from './utils';

type FocusOrMouseEvent =
  | React.FocusEvent<HTMLDivElement, Element>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

export const FloatingTip: React.FC<TipPlacementComponentProps> = ({
  alignment,
  children,
  escapeKeyPressHandler,
  id,
  info,
  isTipHidden,
  wrapperRef,
  type,
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

  const popoverAlignments = getPopoverAlignment({ alignment });

  const handleShowHideAction = ({ type }: FocusOrMouseEvent) => {
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

  const isToolType = type === 'tool';
  const toolOnlyEventFunc = isToolType
    ? (e: FocusOrMouseEvent) => handleShowHideAction(e)
    : undefined;

  return (
    <Box
      position="relative"
      display="inline-flex"
      ref={wrapperRef}
      onMouseLeave={toolOnlyEventFunc}
    >
      <TargetContainer
        ref={ref}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
        onFocus={toolOnlyEventFunc}
        onBlur={toolOnlyEventFunc}
        onMouseEnter={toolOnlyEventFunc}
      >
        {children}
      </TargetContainer>
      <Popover
        {...popoverAlignments}
        animation="fade"
        dims={isToolType ? 'toolTip' : 'infoTip'}
        horizontalOffset={offset}
        isOpen={isToolType ? isOpen : !isTipHidden}
        outline
        skipFocusTrap
        targetRef={ref}
        variant="secondary"
      >
        <FlexBox
          alignItems="flex-start"
          id={id}
          flexDirection="column"
          role={isToolType ? 'tooltip' : 'infotip'}
        >
          {info}
        </FlexBox>
      </Popover>
    </Box>
  );
};
