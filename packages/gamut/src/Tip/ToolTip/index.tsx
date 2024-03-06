import { useEffect, useRef, useState } from 'react';

import { WithChildrenProp } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';

export type NewToolTipProps = TipBaseProps &
  WithChildrenProp & {
    alignment?: TipCenterAlignment;
    /**
     * Required for accessiblity - the same id needs to be passed to the `aria-labelledby` attribute of the element that the tooltip is describing.
     */
    id: string;
  };

export const NewToolTip: React.FC<NewToolTipProps> = ({
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
