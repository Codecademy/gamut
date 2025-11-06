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
  const previousFocusRef = useRef<HTMLElement | null>(null);
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

      // Helper function to check if an element is within our component
      const isWithinComponent = (element: Node | null): boolean => {
        if (!element) return false;
        const popoverContent = popoverContentRef.current;
        const button = buttonRef.current;
        const wrapper = wrapperRef.current;
        if (!popoverContent || !button) return false;
        return (
          button.contains(element) ||
          wrapper?.contains(element) ||
          popoverContent.contains(element)
        );
      };

      // Helper function to return focus to button
      const returnFocusToButton = () => {
        if (isTipHidden) return;
        const currentButton = buttonRef.current;
        if (
          currentButton?.isConnected &&
          currentButton instanceof HTMLElement &&
          !currentButton.hasAttribute('disabled') &&
          currentButton.tabIndex !== -1
        ) {
          currentButton.focus();
        }
      };

      // Intercept Tab key presses when focus is in the popover
      // This catches Tab before focus moves, allowing us to redirect it
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || isTipHidden) return;

        const { activeElement } = document;
        if (!activeElement) return;

        // Check if focus is currently within the popover content (not the button)
        const popoverContent = popoverContentRef.current;
        if (
          popoverContent?.contains(activeElement) &&
          activeElement !== buttonRef.current
        ) {
          // Focus is in the popover content - we'll check after Tab processes
          // where focus ends up and redirect if needed
          // Use a microtask to check immediately after Tab key processing
          queueMicrotask(() => {
            if (isTipHidden) return;
            const newActiveElement = document.activeElement;
            if (
              newActiveElement &&
              !isWithinComponent(newActiveElement) &&
              newActiveElement !== buttonRef.current
            ) {
              // Focus moved outside - return to button immediately
              returnFocusToButton();
            }
          });
        }
      };

      // Use focusin on document to catch when focus moves anywhere
      // This catches focus changes earlier than focusout
      const handleFocusIn = (event: FocusEvent) => {
        if (isTipHidden) return;
        const { target } = event;

        // Check if the previous focus was within our component
        const wasPreviousFocusInComponent = previousFocusRef.current
          ? isWithinComponent(previousFocusRef.current)
          : false;

        // Update previous focus for next time
        if (target instanceof HTMLElement) {
          previousFocusRef.current = target;
        }

        // Only act if previous focus was in our component and new focus is outside
        if (
          wasPreviousFocusInComponent &&
          target &&
          !isWithinComponent(target as Node)
        ) {
          // Check if the target is actually focusable (not just any element)
          const targetElement = target as HTMLElement;
          if (
            targetElement &&
            (targetElement.tabIndex >= 0 ||
              targetElement instanceof HTMLAnchorElement ||
              targetElement instanceof HTMLButtonElement ||
              targetElement instanceof HTMLInputElement ||
              targetElement instanceof HTMLSelectElement ||
              targetElement instanceof HTMLTextAreaElement ||
              (targetElement instanceof HTMLElement &&
                targetElement.isContentEditable))
          ) {
            // Focus moved outside - return to button immediately
            returnFocusToButton();
          }
        }
      };

      // Also handle focusout on the popover content as a backup
      const handleFocusOut = (event: FocusEvent) => {
        const popoverContent = popoverContentRef.current;
        const button = buttonRef.current;
        const { relatedTarget } = event;

        if (!popoverContent || !button || isTipHidden) return;

        // If relatedTarget is null (common with portals or when tabbing to browser UI),
        // check activeElement after focus settles
        if (!relatedTarget) {
          setTimeout(() => {
            if (isTipHidden) return;
            const { activeElement } = document;
            if (activeElement && !isWithinComponent(activeElement)) {
              returnFocusToButton();
            }
          }, 0);
          return;
        }

        // Type guard: relatedTarget must be a Node to use contains
        if (!(relatedTarget instanceof Node)) {
          return;
        }

        // If focus is staying within our component, allow it
        if (isWithinComponent(relatedTarget)) {
          return;
        }

        // Focus is leaving the popover - return to button
        returnFocusToButton();
      };

      // Wait for popover ref to be set before attaching listeners
      let popoverContent: HTMLDivElement | null = null;
      const timeoutId = setTimeout(() => {
        popoverContent = popoverContentRef.current;
        if (popoverContent) {
          // Use capture phase to catch focusout events early
          popoverContent.addEventListener('focusout', handleFocusOut, true);
        }
      }, 0);

      // Use capture phase on document to catch focusin events early
      document.addEventListener('focusin', handleFocusIn, true);
      document.addEventListener('keydown', handleGlobalEscapeKey);
      document.addEventListener('keydown', handleTabKey, true);

      return () => {
        clearTimeout(timeoutId);
        if (popoverContent) {
          popoverContent.removeEventListener('focusout', handleFocusOut, true);
        }
        document.removeEventListener('focusin', handleFocusIn, true);
        document.removeEventListener('keydown', handleGlobalEscapeKey);
        document.removeEventListener('keydown', handleTabKey, true);
      };
    }
  }, [isTipHidden, placement, setTipIsHidden]);

  const isFloating = placement === 'floating';

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    buttonRef,
    escapeKeyPressHandler,
    info,
    isTipHidden,
    onRequestClose:
      placement === 'floating' ? () => setTipIsHidden(true) : undefined,
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
