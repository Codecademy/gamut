import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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
  emphasis?: 'low' | 'high';
};

const FOCUSABLE_SELECTOR =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';
const MODAL_SELECTOR = 'dialog[open],[role="dialog"],[role="alertdialog"]';

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = 'top-right',
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
    const content = contentNodeRef.current;
    if (!content) return [];

    return Array.from(
      content.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
  }, []);

  const contentRef = useCallback((node: HTMLDivElement | null) => {
    contentNodeRef.current = node;
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (
        wrapper &&
        (e.target instanceof HTMLElement ? !wrapper.contains(e.target) : true)
      ) {
        setHideTip(true);
      }
    },
    []
  );

  const clickHandler = useCallback(() => {
    setHideTip(!isTipHidden);
  }, [isTipHidden]);

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
        if (focusableElements.length === 0) return;

        const lastElement = focusableElements[focusableElements.length - 1];
        const { activeElement } = document;

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
        emphasis={emphasis}
        ref={buttonRef}
        onClick={clickHandler}
      />
    </Tip>
  );
};
