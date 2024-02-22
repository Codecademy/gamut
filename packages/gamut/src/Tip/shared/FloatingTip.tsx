import { get } from 'lodash';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useMeasure } from 'react-use'; // or just 'react-use-measure'

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
  wrapperRef,
  type,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [childRef, { width: tipWidth }] = useMeasure<HTMLDivElement>();

  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isCentered = alignment.includes('center');

  useLayoutEffect(() => {
    // CASS - HERE - We need to get the width of the tooltip ref to calculate the offset for center alignment
    if (ref?.current && !isCentered) {
      setOffset(-ref.current.clientWidth / 2 + 32);
    } else if (isCentered && ref?.current) {
      const tw = tipWidth + 16;
      const cw = ref?.current.clientWidth + 4;
      const diffOs = (tw - cw) / 2;
      setOffset(diffOs);
    }
  }, [isCentered, tipWidth]);

  const popoverAlignments = getPopoverAlignment({ alignment, type });

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
        horizontalOffset={offset}
        // isOpen={isToolType ? isOpen : !isTipHidden}
        isOpen
        outline
        skipFocusTrap
        targetRef={ref}
        variant="secondary"
      >
        <FlexBox
          alignItems="flex-start"
          flexDirection="column"
          id={id}
          ref={childRef}
          role={isToolType ? 'tooltip' : 'infotip'}
          width="100%"
          bg="paleBlue"
        >
          {info}
        </FlexBox>
      </Popover>
    </Box>
  );
};
