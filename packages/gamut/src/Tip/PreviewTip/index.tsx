import { useId } from '@reach/auto-id';
import { ComponentProps, useEffect, useRef, useState } from 'react';

import { Anchor } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';

export type PreviewTipProps = ComponentProps<typeof Anchor> &
  TipBaseProps & {
    alignment?: TipCenterAlignment;
  };

export const PreviewTip: React.FC<PreviewTipProps> = ({
  alignment = 'top-center',
  info,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const descriptionId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const isFloating = placement === 'floating';
  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="tool" id={descriptionId}>
      <Anchor {...rest} aria-describedby={descriptionId} />
    </Tip>
  );
};
