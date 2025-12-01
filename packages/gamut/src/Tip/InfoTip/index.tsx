import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { getFocusableElements as getFocusableElementsUtil } from '../../utils/focus';
import { extractTextContent } from '../../utils/react';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';
import { ScreenreaderNavigableText } from './elements';
import { InfoTipButton } from './InfoTipButton';

export type InfoTipProps = TipBaseProps & {
  alignment?: TipBaseAlignment;
  emphasis?: 'low' | 'high';
  /**
   * Called when the info tip is clicked - the onClick function is called after the DOM updates and the tip is mounted.
   */
  onClick?: (arg0: { isTipHidden: boolean }) => void;
};

const ARIA_HIDDEN_DELAY_MS = 1000;
const MODAL_SELECTOR = 'dialog[open],[role="dialog"],[role="alertdialog"]';

export const InfoTip: React.FC<InfoTipProps> = ({
  alignment = 'top-right',
  emphasis = 'low',
  info,
  onClick,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const isFloating = placement === 'floating';

  const [isTipHidden, setHideTip] = useState(true);
  const [isAriaHidden, setIsAriaHidden] = useState(false);
  const [shouldAnnounce, setShouldAnnounce] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverContentNodeRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);

  const ariaHiddenTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const announceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getFocusableElements = useCallback(() => {
    return getFocusableElementsUtil(popoverContentNodeRef.current);
  }, []);

  const clearAndSetTimeout = useCallback(
    (
      timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
      callback: () => void,
      delay: number
    ) => {
      clearTimeout(timeoutRef.current ?? undefined);
      timeoutRef.current = setTimeout(() => {
        callback();
        timeoutRef.current = null;
      }, delay);
    },
    []
  );

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

    const ariaHiddenTimeout = ariaHiddenTimeoutRef.current;
    const announceTimeout = announceTimeoutRef.current;

    return () => {
      clearTimeout(ariaHiddenTimeout ?? undefined);
      clearTimeout(announceTimeout ?? undefined);
    };
  }, []);

  const setTipIsHidden = useCallback(
    (nextTipState: boolean) => {
      setHideTip(nextTipState);

      if (!nextTipState && !isFloating) {
        clearAndSetTimeout(
          ariaHiddenTimeoutRef,
          () => setIsAriaHidden(true),
          ARIA_HIDDEN_DELAY_MS
        );
      } else if (nextTipState) {
        if (isAriaHidden) setIsAriaHidden(false);
        setShouldAnnounce(false);
        clearTimeout(ariaHiddenTimeoutRef.current ?? undefined);
        ariaHiddenTimeoutRef.current = null;
      }
    },
    [isAriaHidden, isFloating, clearAndSetTimeout]
  );

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

    if (!currentTipState) {
      clearAndSetTimeout(announceTimeoutRef, () => setShouldAnnounce(true), 0);
    }
  }, [isTipHidden, setTipIsHidden, clearAndSetTimeout]);

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
      if (e.key !== 'Escape') return;

      const openModals = document.querySelectorAll(MODAL_SELECTOR);
      const hasUnrelatedModal = Array.from(openModals).some(
        (modal) => wrapperRef.current && !modal.contains(wrapperRef.current)
      );

      if (hasUnrelatedModal) return;

      e.preventDefault();
      e.stopPropagation();
      setTipIsHidden(true);
      buttonRef.current?.focus();
    };

    document.addEventListener('keydown', handleGlobalEscapeKey, true);

    if (isFloating) {
      const handleTabKeyInPopover = (event: KeyboardEvent) => {
        if (event.key !== 'Tab' || event.shiftKey) return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

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
        document.removeEventListener('keydown', handleGlobalEscapeKey, true);
      };
    }

    return () =>
      document.removeEventListener('keydown', handleGlobalEscapeKey, true);
  }, [isTipHidden, isFloating, setTipIsHidden, getFocusableElements]);

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = useMemo(
    () => ({
      alignment,
      info,
      isTipHidden,
      wrapperRef,
      ...(isFloating && { popoverContentRef }),
      ...rest,
    }),
    [
      alignment,
      info,
      isTipHidden,
      wrapperRef,
      isFloating,
      popoverContentRef,
      rest,
    ]
  );

  const extractedTextContent = useMemo(() => extractTextContent(info), [info]);

  const screenreaderInfo =
    shouldAnnounce && !isTipHidden ? extractedTextContent : '\xa0';

  const screenreaderText = useMemo(
    () => (
      <ScreenreaderNavigableText
        aria-hidden={isAriaHidden}
        aria-live="assertive"
        screenreader
      >
        {screenreaderInfo}
      </ScreenreaderNavigableText>
    ),
    [isAriaHidden, screenreaderInfo]
  );

  const button = useMemo(
    () => (
      <InfoTipButton
        active={!isTipHidden}
        aria-expanded={!isTipHidden}
        emphasis={emphasis}
        ref={buttonRef}
        onClick={clickHandler}
      />
    ),
    [isTipHidden, emphasis, clickHandler]
  );

  /*
   * For floating placement, screenreader text comes before button to maintain
   * correct DOM order despite Portal rendering. See GMT-64 for planned fix.
   */
  return (
    <Tip {...tipProps} type="info">
      {isFloating && alignment.includes('top') ? (
        <>
          {screenreaderText}
          {button}
        </>
      ) : (
        <>
          {button}
          {screenreaderText}
        </>
      )}
    </Tip>
  );
};
