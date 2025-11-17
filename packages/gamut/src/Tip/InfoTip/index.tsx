import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  const pollTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const ariaHiddenTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const announceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    return () => {
      if (pollTimeoutIdRef.current) clearTimeout(pollTimeoutIdRef.current);
      if (ariaHiddenTimeoutRef.current)
        clearTimeout(ariaHiddenTimeoutRef.current);
      if (announceTimeoutRef.current) clearTimeout(announceTimeoutRef.current);
    };
  }, []);

  /*
   * Clean up pending onClick poll for floating tips with interactive content
   */
  useEffect(() => {
    if (isFloating && isTipHidden && pollTimeoutIdRef.current) {
      clearTimeout(pollTimeoutIdRef.current);
      pollTimeoutIdRef.current = null;
    }
  }, [isTipHidden, isFloating]);

  const setTipIsHidden = useCallback(
    (nextTipState: boolean) => {
      if (!nextTipState) {
        setHideTip(nextTipState);
        if (placement !== 'floating') {
          if (ariaHiddenTimeoutRef.current) {
            clearTimeout(ariaHiddenTimeoutRef.current);
          }
          ariaHiddenTimeoutRef.current = setTimeout(() => {
            setIsAriaHidden(true);
            ariaHiddenTimeoutRef.current = null;
          }, 1000);
        }
      } else {
        if (isAriaHidden) setIsAriaHidden(false);
        setHideTip(nextTipState);
        setShouldAnnounce(false);
        if (ariaHiddenTimeoutRef.current) {
          clearTimeout(ariaHiddenTimeoutRef.current);
          ariaHiddenTimeoutRef.current = null;
        }
      }
    },
    [isAriaHidden, placement]
  );

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      setTipIsHidden(true);
    }
  };

  const handleOutsideClick = useCallback(
    (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        (e.target instanceof HTMLElement
          ? !wrapperRef.current?.contains(e?.target)
          : true)
      ) {
        setTipIsHidden(true);
      }
    },
    [setTipIsHidden]
  );

  const clickHandler = () => {
    const currentTipState = !isTipHidden;
    setTipIsHidden(currentTipState);

    // Clean up previous announce timeout if any
    if (announceTimeoutRef.current) {
      clearTimeout(announceTimeoutRef.current);
      announceTimeoutRef.current = null;
    }

    if (!currentTipState) {
      // Delay slightly to ensure focus has settled back on button before announcing
      announceTimeoutRef.current = setTimeout(() => {
        setShouldAnnounce(true);
        announceTimeoutRef.current = null;
      }, 0);
    }

    /*
     * Handle onClick callback for programmatic focus of interactive elements.
     *
     * For floating tips: Poll until the portal ref is available (up to 20ms) to ensure
     * focusable elements inside the portal are mounted and ready. This prevents calling
     * onClick before the portal content exists in the DOM. Polling is cancelled if the
     * tip is closed during the wait or if max attempts are reached.
     *
     * For inline tips: Call onClick immediately since no portal mounting is required.
     */
    if (onClick) {
      if (isFloating) {
        if (pollTimeoutIdRef.current) {
          clearTimeout(pollTimeoutIdRef.current);
          pollTimeoutIdRef.current = null;
        }

        const pollForRef = (attempts = 0) => {
          if (popoverContentRef.current && !currentTipState) {
            pollTimeoutIdRef.current = null;
            onClick({ isTipHidden: currentTipState });
          } else if (attempts < 20 && !currentTipState) {
            pollTimeoutIdRef.current = setTimeout(
              () => pollForRef(attempts + 1),
              1
            );
          } else {
            pollTimeoutIdRef.current = null;
          }
        };
        pollForRef();
      } else {
        onClick({ isTipHidden: currentTipState });
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [handleOutsideClick]);

  useEffect(() => {
    if (!isTipHidden && placement === 'floating') {
      const handleGlobalEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setTipIsHidden(true);
          buttonRef.current?.focus();
        }
      };

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key !== 'Tab') return;

        const popoverContent = popoverContentRef.current;
        if (!popoverContent) return;

        const focusableElements = popoverContent.querySelectorAll<HTMLElement>(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const { activeElement } = document;

        const isTabbingForwardFromLast =
          !event.shiftKey && activeElement === lastElement;
        const isTabbingBackwardFromFirst =
          event.shiftKey && activeElement === firstElement;

        if (isTabbingForwardFromLast || isTabbingBackwardFromFirst) {
          event.preventDefault();
          buttonRef.current?.focus();
        }
      };

      // Wait for the popover ref to be set before attaching the listener
      let popoverContent: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        popoverContent = popoverContentRef.current;
        if (popoverContent) {
          popoverContent.addEventListener('keydown', handleKeyDown);
        }
      }, 0);

      document.addEventListener('keydown', handleGlobalEscapeKey);

      return () => {
        clearTimeout(timeoutId);
        if (popoverContent) {
          popoverContent.removeEventListener('keydown', handleKeyDown);
        }
        document.removeEventListener('keydown', handleGlobalEscapeKey);
      };
    }
  }, [isTipHidden, placement, setTipIsHidden]);

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    escapeKeyPressHandler,
    info,
    isTipHidden,
    wrapperRef,
    ...(isFloating && { popoverContentRef }),
    ...rest,
  };

  const extractedTextContent = useMemo(() => extractTextContent(info), [info]);

  const screenreaderInfo =
    shouldAnnounce && !isTipHidden ? extractedTextContent : `\xa0`;

  const text = (
    <ScreenreaderNavigableText
      aria-hidden={isAriaHidden}
      aria-live="assertive"
      screenreader
    >
      {screenreaderInfo}
    </ScreenreaderNavigableText>
  );

  const tip = (
    <InfoTipButton
      active={!isTipHidden}
      aria-expanded={!isTipHidden}
      emphasis={emphasis}
      ref={buttonRef}
      onClick={() => clickHandler()}
    />
  );

  /* 
  on floating alignment
  * since Popover uses React.Portal the DOM order is incorrect so the screenreader text needs to be navigable, in the correct DOM order, and never aria-hidden
  * should be fixed in GM-797 
  */

  return (
    <Tip {...tipProps} type="info">
      {isFloating && alignment.includes('top') ? (
        <>
          {text}
          {tip}
        </>
      ) : (
        <>
          {tip}
          {text}
        </>
      )}
    </Tip>
  );
};
