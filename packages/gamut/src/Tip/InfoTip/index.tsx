import { useEffect, useRef, useState } from 'react';

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const setTipIsHidden = (nextTipState: boolean) => {
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
    }
  };

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
    // we want to call the onClick handler after the tip has mounted
    if (onClick) setTimeout(() => onClick({ isTipHidden: currentTipState }), 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const isFloating = placement === 'floating';

  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    escapeKeyPressHandler,
    info,
    isTipHidden,
    wrapperRef,
    ...rest,
  };

  const text = (
    <ScreenreaderNavigableText
      aria-hidden={isAriaHidden}
      aria-live="assertive"
      inlineScreenreader
    >
      {!isTipHidden ? info : `\xa0`}
    </ScreenreaderNavigableText>
  );

  const button = (
    <InfoTipButton
      aria-expanded={!isTipHidden}
      active={!isTipHidden}
      emphasis={emphasis}
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
          {button}
        </>
      ) : (
        <>
          {button}
          {text}
        </>
      )}
    </Tip>
  );
};
