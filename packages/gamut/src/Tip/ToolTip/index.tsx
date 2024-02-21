import { useEffect, useRef, useState } from 'react';

import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';

export interface ToolTipProps extends TipBaseProps {
  alignment?: TipCenterAlignment;
  id: string;
}

export const NewToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-center',
  children,
  info,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const Tip = loaded && placement === 'floating' ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="tool">
      {children}
    </Tip>
  );
};
