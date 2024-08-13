import { useId } from '@reach/auto-id';
import { ComponentProps, useEffect, useRef, useState } from 'react';

import { Anchor } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  PreviewTipText,
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';

export type PreviewTipProps = ComponentProps<typeof Anchor> &
  Pick<TipBaseProps, 'placement'> &
  PreviewTipText & {
    alignment?: TipBaseAlignment;
    linkDescription: string;
  };

export const PreviewTip: React.FC<PreviewTipProps> = ({
  alignment = 'top-right',
  linkDescription,
  overline,
  title,
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
    info: linkDescription,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="preview" id={descriptionId}>
      {title}
      {overline}
      <Anchor {...rest} aria-describedby={descriptionId} />
    </Tip>
  );
};
