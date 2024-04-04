import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useMeasure } from 'react-use'; // or just 'react-use-measure'

import { Box, FlexBox } from '../../Box';
import { Popover } from '../../Popover';
import { TargetContainer } from './elements';
import { narrowWidth } from './styles';
import { TipPlacementComponentProps } from './types';
import { getPopoverAlignment } from './utils';

type FocusOrMouseEvent =
  | React.FocusEvent<HTMLDivElement, Element>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

export const FloatingTip: React.FC<TipPlacementComponentProps> = ({
  alignment,
  children,
  escapeKeyPressHandler,
  info,
  isTipHidden,
  wrapperRef,
  type,
  narrow,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [childRef, { width: tipWidth }] = useMeasure<HTMLDivElement>();

  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    const isCentered = alignment.includes('center');

    if (ref?.current) {
      if (!isCentered) {
        setOffset(-ref.current.clientWidth / 2 + 32);
      } else {
        const trueTw = tipWidth + 16;
        const targetWidth = ref?.current.clientWidth;
        const diffOs = (trueTw - targetWidth) / 2;
        setOffset(diffOs);
      }
    }
  }, [alignment, tipWidth]);

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
        onFocus={toolOnlyEventFunc}
        onBlur={toolOnlyEventFunc}
        onMouseEnter={toolOnlyEventFunc}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
        ref={ref}
      >
        {children}
      </TargetContainer>
      <Popover
        {...popoverAlignments}
        animation="fade"
        horizontalOffset={offset}
        isOpen={isToolType ? isOpen : !isTipHidden}
        outline
        skipFocusTrap
        targetRef={ref}
        variant="secondary"
      >
        <FlexBox
          alignItems={isToolType ? undefined : 'flex-start'}
          flexDirection="column"
          ref={childRef}
          width={narrow ? narrowWidth : '100%'}
        >
          {info}
        </FlexBox>
      </Popover>
    </Box>
  );
};
