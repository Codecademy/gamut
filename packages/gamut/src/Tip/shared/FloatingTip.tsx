import { CheckerDense } from '@codecademy/gamut-patterns';
import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useMeasure } from 'react-use';

import { Box, FlexBox } from '../../Box';
import { PreviewTipContents } from '../PreviewTip/elements';
import { FloatingTipBody, TargetContainer } from './elements';
import { narrowWidth } from './styles';
import { TipWrapperProps } from './types';
import { getAlignmentWidths, getPopoverAlignment, runWithDelay } from './utils';

type FocusOrMouseEvent =
  | React.FocusEvent<HTMLDivElement, Element>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

export const FloatingTip: React.FC<TipWrapperProps> = ({
  alignment,
  avatar,
  children,
  escapeKeyPressHandler,
  info,
  isTipHidden,
  loading,
  narrow,
  overline,
  truncateLines,
  type,
  username,
  wrapperRef,
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
  const dims = getAlignmentWidths({ avatar, alignment, type });

  const handleShowHideAction = ({ type }: FocusOrMouseEvent) => {
    if (type === 'focus' && !isOpen) {
      runWithDelay(() => {
        setIsOpen(true);
        setIsFocused(true);
      });
    }
    if (type === 'blur' && isOpen) {
      setIsOpen(false);
      setIsFocused(false);
    }
    if (type === 'mouseenter' && !isOpen) {
      runWithDelay(() => setIsOpen(true));
    }
    if (type === 'mouseleave' && isOpen && !isFocused) {
      setIsOpen(false);
    }
  };

  const isHoverType = type === 'tool' || type === 'preview';
  const isPreviewType = type === 'preview';

  const toolOnlyEventFunc = isHoverType
    ? (e: FocusOrMouseEvent) => handleShowHideAction(e)
    : undefined;

  const contents = isPreviewType ? (
    <>
      <PreviewTipContents
        avatar={avatar}
        info={info}
        loading={loading}
        overline={overline}
        truncateLines={truncateLines}
        username={username}
      />
    </>
  ) : (
    info
  );

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
      <FloatingTipBody
        {...popoverAlignments}
        animation="fade"
        dims={dims}
        horizontalOffset={offset}
        isOpen={isHoverType ? isOpen : !isTipHidden}
        outline
        pattern={isPreviewType ? CheckerDense : undefined}
        skipFocusTrap
        targetRef={ref}
        variant="secondary"
        widthRestricted={false}
      >
        <FlexBox
          alignItems={isHoverType ? undefined : 'flex-start'}
          flexDirection="column"
          ref={childRef}
          width={narrow ? narrowWidth : undefined}
        >
          {contents}
        </FlexBox>
      </FloatingTipBody>
    </Box>
  );
};
