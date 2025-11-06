import { useCallback, useEffect, useRef, useState } from 'react';

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
    if (onClick) setTimeout(() => onClick({ isTipHidden: currentTipState }), 0);
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

      const handleFocusOut = (event: FocusEvent) => {
        console.log('in handleFocusOut');
        const popoverContent = popoverContentRef.current;
        const button = buttonRef.current;
        const wrapper = wrapperRef.current;

        const { relatedTarget } = event;

        console.log('relatedTarget', relatedTarget);
        if (relatedTarget instanceof Node) {
          // If focus is moving back to the button or wrapper, allow it
          const movingToButton =
            button?.contains(relatedTarget) || wrapper?.contains(relatedTarget);
          if (movingToButton) {
            console.log('focus moving to button or wrapper');
            return;
          }

          // If focus is staying within the popover content, allow it
          if (popoverContent?.contains(relatedTarget)) {
            console.log('focus staying within popover content');
            return;
          }
        }

        // Return focus to button to maintain logical tab order
        setTimeout(() => {
          console.log('in setTimeout');
          buttonRef.current?.focus();
        }, 300);
      };

      // Wait for the popover ref to be set before attaching the listener
      let popoverContent: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        popoverContent = popoverContentRef.current;
        if (popoverContent) {
          popoverContent.addEventListener('focusout', handleFocusOut);
        }
      }, 0);

      document.addEventListener('keydown', handleGlobalEscapeKey);

      return () => {
        clearTimeout(timeoutId);
        if (popoverContent) {
          popoverContent.removeEventListener('focusout', handleFocusOut);
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

  const text = (
    <ScreenreaderNavigableText
      aria-hidden={isAriaHidden}
      aria-live="assertive"
      screenreader
    >
      {shouldAnnounce && !isTipHidden ? info : `\xa0`}
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
