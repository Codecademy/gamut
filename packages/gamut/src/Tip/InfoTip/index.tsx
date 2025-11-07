import {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

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
  const [isTipHidden, setHideTip] = useState(true);
  const [isAriaHidden, setIsAriaHidden] = useState(false);
  const [shouldAnnounce, setShouldAnnounce] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const setTipIsHidden = useCallback(
    (nextTipState: boolean) => {
      if (!nextTipState) {
        setHideTip(nextTipState);
        if (placement !== 'floating') {
          // on inline component - stops text from being able to be navigated through, instead user can nav through visible text
          setTimeout(() => {
            setIsAriaHidden(true);
          }, 1000);
        }
      } else {
        if (isAriaHidden) setIsAriaHidden(false);
        setHideTip(nextTipState);
        setShouldAnnounce(false);
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

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      wrapperRef.current &&
      (e.target instanceof HTMLElement
        ? !wrapperRef.current?.contains(e?.target)
        : true)
    ) {
      setTipIsHidden(true);
    }
  };

  const clickHandler = () => {
    const currentTipState = !isTipHidden;
    setTipIsHidden(currentTipState);
    if (!currentTipState) {
      // Delay slightly to ensure focus has settled back on button before announcing
      setTimeout(() => {
        setShouldAnnounce(true);
      }, 0);
    }
    // we want to call the onClick handler after the tip has mounted
    // For floating placement, wait a bit longer to ensure refs are set
    if (onClick) {
      const delay = placement === 'floating' ? 10 : 0;
      setTimeout(() => onClick({ isTipHidden: currentTipState }), delay);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

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

  const isFloating = placement === 'floating';

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    escapeKeyPressHandler,
    info,
    isTipHidden,
    popoverContentRef,
    wrapperRef,
    ...rest,
  };

  // Helper function to recursively extract text content from React elements
  // Converts everything to plain text for screenreader announcements
  const extractTextContent = (children: React.ReactNode): string => {
    if (!children) return '';

    if (typeof children === 'string' || typeof children === 'number') {
      return String(children);
    }

    if (Array.isArray(children)) {
      return children.map((child) => extractTextContent(child)).join(' ');
    }

    if (isValidElement(children)) {
      const props = children.props as Record<string, unknown>;
      if (props.children) {
        return extractTextContent(props.children as React.ReactNode);
      }
    }

    return '';
  };

  const screenreaderInfo =
    shouldAnnounce && !isTipHidden ? extractTextContent(info) : `\xa0`;

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

  /* on floating alignment
  since Popover uses React.Portal the DOM order is incorrect so the screenreader text needs to be navigable, in the correct DOM order, and never aria-hidden
  should be fixed in GM-797 */

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
