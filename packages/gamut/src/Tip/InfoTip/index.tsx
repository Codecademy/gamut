import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { getFocusableElements as getFocusableElementsUtil } from '../../utils/focus';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';
import { InfoTipButton } from './InfoTipButton';

export type InfoTipProps = TipBaseProps & {
  alignment?: TipBaseAlignment;
  ariaLabel?: string;
  emphasis?: 'low' | 'high';
};

const MODAL_SELECTOR = 'dialog[open],[role="dialog"],[role="alertdialog"]';

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = 'top-right',
  ariaLabel,
  emphasis = 'low',
  info,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const isFloating = placement === 'floating';

  const [isTipHidden, setHideTip] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentNodeRef = useRef<HTMLDivElement | null>(null);

  const getFocusableElements = useCallback(() => {
    return getFocusableElementsUtil(contentNodeRef.current);
  }, []);

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    contentNodeRef.current = node;
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleOutsideClick = useCallback((e: MouseEvent) => {
    const wrapper = wrapperRef.current;
    if (
      wrapper &&
      (e.target instanceof HTMLElement ? !wrapper.contains(e.target) : true)
    ) {
      setHideTip(true);
    }
  }, []);

  const clickHandler = useCallback(() => {
    setHideTip((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isTipHidden) return;

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isTipHidden, handleOutsideClick]);

  useEffect(() => {
    if (isTipHidden) return;

    const handleGlobalEscapeKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      const hasModal = document.querySelector(MODAL_SELECTOR);
      if (hasModal) return;

      e.preventDefault();
      setHideTip(true);
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', handleGlobalEscapeKey);

    if (isFloating) {
      const handleTabKeyInPopover = (event: KeyboardEvent) => {
        if (event.key !== 'Tab' || event.shiftKey) return;

        const focusableElements = getFocusableElements();
        const { activeElement } = document;

        // If no focusable elements and popover itself has focus, wrap to button
        if (focusableElements.length === 0) {
          if (activeElement === contentNodeRef.current) {
            event.preventDefault();
            buttonRef.current?.focus();
          }
          return;
        }

        const lastElement = focusableElements[focusableElements.length - 1];

        // Only wrap forward: if on last element, wrap to button
        if (activeElement === lastElement) {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      };

      let content: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        content = contentNodeRef.current;
        if (content) {
          content.addEventListener('keydown', handleTabKeyInPopover);
        }
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        if (content) {
          content.removeEventListener('keydown', handleTabKeyInPopover);
        }
        document.removeEventListener('keydown', handleGlobalEscapeKey);
      };
    }

    return () => document.removeEventListener('keydown', handleGlobalEscapeKey);
  }, [isTipHidden, isFloating, getFocusableElements]);

  useEffect(() => {
    if (isTipHidden) return;

    const timeoutId = setTimeout(() => {
      contentNodeRef.current?.focus();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isTipHidden]);

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = useMemo(
    () => ({
      alignment,
      info,
      isTipHidden,
      contentRef,
      wrapperRef,
      ...rest,
    }),
    [alignment, info, isTipHidden, contentRef, wrapperRef, rest]
  );

  return (
    <Tip {...tipProps} type="info">
      <InfoTipButton
        active={!isTipHidden}
        aria-expanded={!isTipHidden}
        aria-label={ariaLabel}
        emphasis={emphasis}
        ref={buttonRef}
        onClick={clickHandler}
      />
    </Tip>
  );
};
