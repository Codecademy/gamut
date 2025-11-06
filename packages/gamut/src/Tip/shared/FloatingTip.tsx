import { useCallback, useLayoutEffect, useRef, useState } from 'react';
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
  onRequestClose,
  overline,
  popoverContentRef,
  truncateLines,
  type,
  username,
  wrapperRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Use refs to store timeouts to prevent race conditions
  const hoverDelayRef = useRef<NodeJS.Timeout | undefined>();
  const focusDelayRef = useRef<NodeJS.Timeout | undefined>();

  const commonPopoverProps = getPopoverAlignmentAndPattern({ alignment, type });
  const dims = getAlignmentStyles({ avatar, alignment, type });
  const isHorizontalCenter = dims === 'horizontalCenter';
  const [childRef, { width: tipWidth }] = useMeasure<HTMLDivElement>();

  const [offset, setOffset] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    if (ref?.current?.clientWidth) {
      if (type === 'info' || type === 'preview')
        setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, [alignment, tipWidth, type]);

  // Clear timeouts on unmount
  useLayoutEffect(() => {
    return () => {
      if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current);
      if (focusDelayRef.current) clearTimeout(focusDelayRef.current);
    };
  }, []);

  const handleShowHideAction = useCallback(
    ({ type }: FocusOrMouseEvent) => {
      if (type === 'focus' && !isOpen) {
        if (hoverDelayRef.current) {
          clearTimeout(hoverDelayRef.current);
          hoverDelayRef.current = undefined;
        }

        focusDelayRef.current = runWithDelay(() => {
          setIsOpen(true);
          setIsFocused(true);
        });
      }

      if (type === 'blur') {
        if (focusDelayRef.current) {
          clearTimeout(focusDelayRef.current);
          focusDelayRef.current = undefined;
        }
        if (isOpen) {
          setIsOpen(false);
          setIsFocused(false);
        }
      }

      if (type === 'mouseenter' && !isOpen && !isFocused) {
        if (focusDelayRef.current) {
          clearTimeout(focusDelayRef.current);
          focusDelayRef.current = undefined;
        }

        hoverDelayRef.current = runWithDelay(() => setIsOpen(true));
      }

      if (type === 'mouseleave') {
        if (hoverDelayRef.current) {
          clearTimeout(hoverDelayRef.current);
          hoverDelayRef.current = undefined;
        }
        if (isOpen && !isFocused) {
          setIsOpen(false);
        }
      }
    },
    [isOpen, isFocused]
  );

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

  const isPopoverOpen = isHoverType ? isOpen : !isTipHidden;

  // When type is 'info', skip focus trap entirely since we're handling focus management ourselves
  // This allows focus to leave freely, and custom logic in InfoTip will catch when focus leaves
  // and return it to the button
  const popoverFocusProps =
    type === 'info'
      ? ({ skipFocusTrap: true, onRequestClose: undefined } as const)
      : ({ skipFocusTrap: undefined, onRequestClose } as const);

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
        {...popoverFocusProps}
        animation="fade"
        dims={dims}
        horizontalOffset={offset}
        isOpen={isPopoverOpen}
        outline
        popoverContainerRef={popoverContentRef}
        targetRef={ref}
        variant="secondary"
        widthRestricted={false}
      >
        <FloatingTipTextWrapper
          horizNarrow={narrow && isHorizontalCenter}
          isHoverType={isHoverType}
          narrow={narrow && !isHorizontalCenter}
          ref={childRef}
        >
          {contents}
        </FloatingTipTextWrapper>
      </FloatingTipBody>
    </Box>
  );
};
