import { useEffect, useMemo, useRef, useState } from 'react';

import { Text } from '../../Typography';
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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [clickNum, setClickNum] = useState(0);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      setHideTip(true);
    }
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (
      wrapperRef.current &&
      (e.target instanceof HTMLElement
        ? !wrapperRef.current?.contains(e?.target)
        : true)
    ) {
      setHideTip(true);
    }
  };

  const clickHandler = () => {
    const currentTipState = !isTipHidden;
    setHideTip(currentTipState);
    if (currentTipState) setClickNum(clickNum + 1);
    // we want to call the onClick handler after the tip has mounted
    if (onClick) setTimeout(() => onClick({ isTipHidden: currentTipState }), 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const screenReaderText = useMemo(() => {
    // Voiceover won't read duplicated on subsequent mounts - this is a workaround to make Voiceover think "new" text is being added every mount.
    const text = clickNum % 2 === 0 ? info : `${info}\u00A0`;

    return !isTipHidden ? text : '';
  }, [clickNum, info, isTipHidden]);

  const Tip = loaded && placement === 'floating' ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    escapeKeyPressHandler,
    info,
    isTipHidden,
    wrapperRef,
    ...rest,
  };

  return (
    <>
      <Text screenreader aria-live="assertive">
        {screenReaderText}
      </Text>
      <Tip {...tipProps} type="info">
        <InfoTipButton
          active={!isTipHidden}
          emphasis={emphasis}
          onClick={() => clickHandler()}
        />
      </Tip>
    </>
  );
};
