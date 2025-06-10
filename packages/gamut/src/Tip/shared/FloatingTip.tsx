import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';
import { useMeasure } from 'react-use';

import { Box } from '../../Box';
import { PreviewTipContents } from '../PreviewTip/elements';
import {
  FloatingTipBody,
  FloatingTipTextWrapper,
  TargetContainer,
} from './elements';
import {
  getAlignmentStyles,
  getPopoverAlignmentAndPattern,
} from './styles/composeVariantsUtils';
import { TipWrapperProps } from './types';
import { runWithDelay } from './utils';

type FocusOrMouseEvent =
  | React.FocusEvent<HTMLDivElement, Element>
  | React.MouseEvent<HTMLDivElement, MouseEvent>;

export const FloatingTip: React.FC<TipWrapperProps> = ({
  alignment,
  avatar,
  children,
  escapeKeyPressHandler,
  inheritDims,
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

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const commonPopoverProps = getPopoverAlignmentAndPattern({ alignment, type });
  const dims = getAlignmentStyles({ avatar, alignment, type });
  const [childRef, { width: tipWidth }] = useMeasure<HTMLDivElement>();

  const [offset, setOffset] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (ref?.current?.clientWidth) {
      if (type === 'info' || type === 'preview')
        setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, [alignment, tipWidth, type]);

  let hoverDelay: NodeJS.Timeout | undefined;
  let focusDelay: NodeJS.Timeout | undefined;

  const handleShowHideAction = ({ type }: FocusOrMouseEvent) => {
    if (type === 'focus' && !isOpen) {
      focusDelay = runWithDelay(() => {
        setIsOpen(true);
        setIsFocused(true);
      });
    }
    if (type === 'blur') {
      if (focusDelay) clearTimeout(focusDelay);
      if (isOpen) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    if (type === 'mouseenter' && !isOpen) {
      hoverDelay = runWithDelay(() => setIsOpen(true));
    }
    if (type === 'mouseleave') {
      if (hoverDelay) clearTimeout(hoverDelay);
      if (isOpen && !isFocused) {
        setIsOpen(false);
      }
    }
  };

  const isHoverType = type === 'tool' || type === 'preview';
  const isPreviewType = type === 'preview';

  const toolOnlyEventFunc = isHoverType
    ? (e: FocusOrMouseEvent) => handleShowHideAction(e)
    : undefined;

  const contents = isPreviewType ? (
    <PreviewTipContents
      avatar={avatar}
      info={info}
      loading={loading}
      overline={overline}
      truncateLines={truncateLines}
      username={username}
    />
  ) : (
    info
  );

  return (
    <Box
      display="inline-flex"
      height={inheritDims ? 'inherit' : undefined}
      position="relative"
      ref={wrapperRef}
      width={inheritDims ? 'inherit' : undefined}
      onMouseLeave={toolOnlyEventFunc}
    >
      <TargetContainer
        height={inheritDims ? 'inherit' : undefined}
        ref={ref}
        width={inheritDims ? 'inherit' : undefined}
        onBlur={toolOnlyEventFunc}
        onFocus={toolOnlyEventFunc}
        onKeyDown={
          escapeKeyPressHandler ? (e) => escapeKeyPressHandler(e) : undefined
        }
        onMouseDown={(e) => e.preventDefault()}
        onMouseEnter={toolOnlyEventFunc}
      >
        {children}
      </TargetContainer>
      <FloatingTipBody
        {...commonPopoverProps}
        animation="fade"
        dims={dims}
        horizontalOffset={offset}
        isOpen={isHoverType ? isOpen : !isTipHidden}
        outline
        skipFocusTrap
        targetRef={ref}
        variant="secondary"
        widthRestricted={false}
      >
        <FloatingTipTextWrapper
          isHoverType={isHoverType}
          narrow={narrow}
          ref={childRef}
        >
          {contents}
        </FloatingTipTextWrapper>
      </FloatingTipBody>
    </Box>
  );
};
