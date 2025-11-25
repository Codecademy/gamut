import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
  /**
   * Called when the info tip is clicked - the onClick function is called after the DOM updates and the tip is mounted.
   */
  onClick?: (arg0: { isTipHidden: boolean }) => void;
};

const MODAL_SELECTOR = 'dialog[open],[role="dialog"],[role="alertdialog"]';

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = 'top-right',
  ariaLabel,
  emphasis = 'low',
  info,
  onClick,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const isFloating = placement === 'floating';

  const [isTipHidden, setHideTip] = useState(true);
  const [loaded, setLoaded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverContentNodeRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  const getFocusableElements = useCallback(() => {
    return getFocusableElementsUtil(popoverContentNodeRef.current);
  }, []);

  const popoverContentRef = useCallback(
    (node: HTMLDivElement | null) => {
      popoverContentNodeRef.current = node;

      if (node && !isTipHidden && isFloating) {
        onClick?.({ isTipHidden: false });
      }
    },
    [onClick, isTipHidden, isFloating]
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  const setTipIsHidden = useCallback((nextTipState: boolean) => {
    setHideTip(nextTipState);
  }, []);

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      const isOutside =
        wrapper &&
        (!(e.target instanceof HTMLElement) || !wrapper.contains(e.target));

      if (isOutside) {
        setTipIsHidden(true);
      }
    },
    [setTipIsHidden]
  );

  const clickHandler = useCallback(() => {
    const currentTipState = !isTipHidden;
    setTipIsHidden(currentTipState);
  }, [isTipHidden, setTipIsHidden]);

  useLayoutEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (!isFloating) {
      onClick?.({ isTipHidden });
    } else if (isTipHidden) {
      onClick?.({ isTipHidden: true });
    }
  }, [isTipHidden, isFloating, onClick]);

  useEffect(() => {
    if (isTipHidden) return;

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isTipHidden, handleOutsideClick]);

  useEffect(() => {
    if (isTipHidden) return;

    const handleGlobalEscapeKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || document.querySelector(MODAL_SELECTOR)) return;

      e.preventDefault();
      setTipIsHidden(true);
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
          if (activeElement === popoverContentNodeRef.current) {
            event.preventDefault();
            buttonRef.current?.focus();
          }
          return;
        }

        const lastElement = focusableElements[focusableElements.length - 1];

        // Only wrap forward: if on last element, wrap to button
        if (document.activeElement === lastElement) {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      };

      let popoverContent: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        popoverContent = popoverContentNodeRef.current;
        popoverContent?.addEventListener('keydown', handleTabKeyInPopover);
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        popoverContent?.removeEventListener('keydown', handleTabKeyInPopover);
        document.removeEventListener('keydown', handleGlobalEscapeKey);
      };
    }

    return () => document.removeEventListener('keydown', handleGlobalEscapeKey);
  }, [isTipHidden, isFloating, getFocusableElements, setTipIsHidden]);

  useEffect(() => {
    if (isTipHidden) return;

    const timeoutId = setTimeout(() => {
      popoverContentNodeRef.current?.focus();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isTipHidden]);

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = useMemo(
    () => ({
      alignment,
      info,
      isTipHidden,
      contentRef: popoverContentRef,
      wrapperRef,
      ...rest,
    }),
    [alignment, info, isTipHidden, popoverContentRef, wrapperRef, rest]
  );

  return (
    <Tip {...tipProps} type="info">
      <InfoTipButton
        active={!isTipHidden}
        aria-expanded={!isTipHidden}
        aria-label={ariaLabel}
        aria-roledescription="More information button"
        emphasis={emphasis}
        ref={buttonRef}
        onClick={clickHandler}
      />
    </Tip>
  );
};
