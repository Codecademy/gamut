import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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
   * Called when the info tip is clicked - intended to be used for programmatic focus in the case of links within the tip.
   */
  onClick?: (arg0: { isTipHidden: boolean }) => void;
};

const ARIA_HIDDEN_DELAY_MS = 1000;
const FOCUSABLE_SELECTOR =
  'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])';

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

  const ariaHiddenTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const announceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getFocusableElements = useCallback(() => {
    const popoverContent = popoverContentNodeRef.current;
    if (!popoverContent) return [];

    return Array.from(
      popoverContent.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    );
  }, []);

  const clearAndSetTimeout = useCallback(
    (
      timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
      callback: () => void,
      delay: number
    ) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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

      // We call onClick when the popover is mounted to make sure the refs are available
      if (node && onClick && !isTipHidden && isFloating) {
        onClick({ isTipHidden: false });
      }
    },
    [onClick, isTipHidden, isFloating]
  );

  useEffect(() => {
    setLoaded(true);

    const ariaHiddenTimeout = ariaHiddenTimeoutRef.current;
    const announceTimeout = announceTimeoutRef.current;

    return () => {
      if (ariaHiddenTimeout) clearTimeout(ariaHiddenTimeout);
      if (announceTimeout) clearTimeout(announceTimeout);
    };
  }, []);

  const setTipIsHidden = useCallback(
    (nextTipState: boolean) => {
      setHideTip(nextTipState);

      if (!nextTipState) {
        if (!isFloating) {
          clearAndSetTimeout(
            ariaHiddenTimeoutRef,
            () => setIsAriaHidden(true),
            ARIA_HIDDEN_DELAY_MS
          );
        }
      } else {
        if (isAriaHidden) setIsAriaHidden(false);
        setShouldAnnounce(false);
        if (ariaHiddenTimeoutRef.current) {
          clearTimeout(ariaHiddenTimeoutRef.current);
          ariaHiddenTimeoutRef.current = null;
        }
      }
    },
    [isAriaHidden, isFloating, clearAndSetTimeout]
  );

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      const wrapper = wrapperRef.current;
      if (
        wrapper &&
        (e.target instanceof HTMLElement ? !wrapper.contains(e.target) : true)
      ) {
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

  const handleButtonKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Tab' && event.shiftKey && !isTipHidden && isFloating) {
        const focusableElements = getFocusableElements();

        if (focusableElements.length > 0) {
          event.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
        }
      }
    },
    [isTipHidden, isFloating, getFocusableElements]
  );

  useLayoutEffect(() => {
    // for inline tips the onClick runs after DOM updates to make sure refs are available
    if (!isFloating && !isTipHidden && onClick) {
      onClick({ isTipHidden: false });
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
      if (e.key === 'Escape') {
        setTipIsHidden(true);
        // We only return focus to the button for floating tips
        if (isFloating) {
          buttonRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalEscapeKey);

    if (isFloating) {
      const handleTabKeyInPopover = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const { activeElement } = document;

        const shouldWrapFocus =
          (!event.shiftKey && activeElement === lastElement) ||
          (event.shiftKey && activeElement === firstElement);

        if (shouldWrapFocus) {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      };

      let popoverContent: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        popoverContent = popoverContentNodeRef.current;
        if (popoverContent) {
          popoverContent.addEventListener('keydown', handleTabKeyInPopover);
        }
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        if (popoverContent) {
          popoverContent.removeEventListener('keydown', handleTabKeyInPopover);
        }
        document.removeEventListener('keydown', handleGlobalEscapeKey);
      };
    }

    return () => document.removeEventListener('keydown', handleGlobalEscapeKey);
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
    shouldAnnounce && !isTipHidden ? extractedTextContent : `\xa0`;

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
        onKeyDown={handleButtonKeyDown}
      />
    ),
    [isTipHidden, emphasis, clickHandler, handleButtonKeyDown]
  );

  /*
   * For floating placement, screenreader text comes before button to maintain
   * correct DOM order despite Portal rendering. See GM-797 for planned fix.
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
