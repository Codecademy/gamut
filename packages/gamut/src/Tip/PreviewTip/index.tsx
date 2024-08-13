import { useId } from '@reach/auto-id';
import { ComponentProps, ReactNode, useEffect, useRef, useState } from 'react';

import { Anchor } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  PreviewTipContent,
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';

export type PreviewTipProps = ComponentProps<typeof Anchor> &
  Pick<TipBaseProps, 'placement'> &
  PreviewTipContent & {
    alignment?: TipBaseAlignment;
    linkDescription: string;
  };

export const PreviewTip: React.FC<PreviewTipProps> = ({
  avatar,
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
    avatar,
    overline,
    title,
    alignment,
    info: linkDescription,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="preview" id={descriptionId}>
      <Anchor {...rest} aria-describedby={descriptionId} />
    </Tip>
  );
};
