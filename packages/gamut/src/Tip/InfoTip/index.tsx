import { ReactNode, useEffect, useRef, useState } from 'react';

import { Text } from '../../Typography';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import { ToolTipBaseAlignment, tooltipDefaultProps } from '../shared/types';
import { InfoTipButton } from './InfoTipButton';

export interface InfoTipProps {
  alignment?: ToolTipBaseAlignment;
  emphasis?: 'low' | 'high';
  info: string | ReactNode;
  placement?: 'floating' | 'inline';
  /**
   * Called when the info tip is clicked - intended to be used for programmatic focus in the case of links within the tip.
   */
  onClick?: (arg0: { isTipHidden: boolean }) => void;
}

export const InfoTip: React.FC<InfoTipProps> = ({
  emphasis = 'low',
  info,
  onClick,
  placement = tooltipDefaultProps.placement,
  ...rest
}) => {
  const [isTipHidden, setHideTip] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

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
    // we want to call the onClick handler after the tip has mounted
    if (onClick) setTimeout(() => onClick({ isTipHidden: currentTipState }), 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  const Tip = placement === 'floating' && loaded ? FloatingTip : InlineTip;

  const tipProps = {
    escapeKeyPressHandler,
    info,
    isTipHidden,
    wrapperRef,
    ...rest,
  };

  return (
    <>
      <Text screenreader role="status">
        {!isTipHidden ? info : 'Show information'}
      </Text>
      <Tip {...tipProps}>
        <InfoTipButton
          active={!isTipHidden}
          emphasis={emphasis}
          onClick={() => clickHandler()}
        />
      </Tip>
    </>
  );
};
