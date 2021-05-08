import { system } from '@codecademy/gamut-styles';
import { variance } from '@codecademy/variance';
import styled from '@emotion/styled';
import React, {
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

import { BodyPortal } from '../BodyPortal';
import { FocusTrap } from '../FocusTrap';
import { getTransform, isInView } from './utils';

export interface TargetRef
  extends Pick<
    HTMLDivElement,
    | 'getBoundingClientRect'
    | 'contains'
    | 'offsetHeight'
    | 'offsetWidth'
    | 'offsetTop'
    | 'offsetLeft'
  > {}
export interface PopoverProps {
  className?: string;
  /**
   * Which vertical edge of the source component to align against.
   */
  alignment?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Align to the inside edge of the target div */
  inside?: boolean;
  /** Whether the popover renders inside the current DOM context or escapes with a portal */
  inline?: boolean;
  /**
   * Number of pixels to offset the popover vertically from the source component.
   */
  y?: number;
  /**
   * Number of pixels to offset the popover horizontally from the source component.
   */
  x?: number;
  /**
   * Whether the popover is rendered.
   */
  isOpen: boolean;
  /**
   * Called when the Popover requests to be closed,
   * this could be due to clicking outside of the popover, or by clicking the escape key.
   */
  onRequestClose?: () => void;
  /**
   * The target element around which the popover will be positioned.
   */
  targetRef: RefObject<TargetRef>;
}

export const PopoverContainer = styled.div(
  variance.compose(
    system.positioning,
    variance.create({
      transform: {
        property: 'transform',
      },
    })
  )
);

export const Popover: React.FC<PopoverProps> = ({
  alignment = 'bottom-left',
  y = 20,
  x = 0,
  inside = false,
  inline = false,
  isOpen,
  onRequestClose,
  targetRef,
  ...rest
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [boundingRect, setBoundRect] = useState<DOMRect>();
  const [targetRect, setTargetRect] = useState<DOMRect>();
  const { width: winW, height: winH } = useWindowSize();
  const { x: winX, y: winY } = useWindowScroll();
  const [yAlign, xAlign] = alignment.split('-') as [
    'top' | 'bottom',
    'left' | 'right'
  ];
  const { top: t, height: h, left: l, width: w } =
    (inline ? targetRect : boundingRect) ?? ({} as DOMRect);

  const popoverPosition = useMemo(() => {
    if (!t && !h && !l && !w) return {};
    const positions = {
      top: Math.round(t - y),
      bottom: Math.round(t + h + y),
      right: Math.round(l + w + x),
      left: Math.round(l - x),
    };

    return {
      top: positions[yAlign],
      left: positions[xAlign],
    };
  }, [t, h, l, w, x, y, xAlign, yAlign]);

  /** transform o */
  const transform = useMemo(() => {
    return getTransform(xAlign, yAlign, inside);
  }, [xAlign, yAlign, inside]);

  useLayoutEffect(() => {
    const target = targetRef?.current;
    if (!target) return;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = target;
    const scrollX = inline ? 0 : window.scrollX;

    setBoundRect(target?.getBoundingClientRect());
    setTargetRect({
      width: offsetWidth,
      height: offsetHeight,
      left: scrollX + offsetLeft,
      top: offsetTop,
    } as DOMRect);
  }, [
    targetRef,
    alignment,
    inside,
    inline,
    x,
    y,
    xAlign,
    yAlign,
    winW,
    winH,
    winX,
    winY,
  ]);

  useLayoutEffect(() => {
    boundingRect && !isInView(boundingRect) && onRequestClose?.();
  }, [boundingRect, onRequestClose]);

  /**
   * Allows targetRef to be or contain a button that toggles the popover open and closed.
   * Without this check it would toggle closed then back open immediately.
   */
  const handleClickOutside = useCallback(
    (e) => !targetRef.current?.contains(e.target as Node) && onRequestClose?.(),
    [onRequestClose, targetRef]
  );

  if (!isOpen || !targetRef) return null;

  const content = (
    <FocusTrap
      allowPageInteraction
      onClickOutside={handleClickOutside}
      onEscapeKey={onRequestClose}
    >
      <PopoverContainer
        ref={popoverRef}
        tabIndex={-1}
        transform={transform}
        position={inline ? 'absolute' : 'fixed'}
        data-testid="popover-content-container"
        {...popoverPosition}
        {...rest}
      />
    </FocusTrap>
  );
  if (inline) return content;

  return <BodyPortal>{content}</BodyPortal>;
};
