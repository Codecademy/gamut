import { useId } from '@reach/auto-id';
import { ComponentProps, useEffect, useRef, useState } from 'react';

import { Anchor, Box } from '../..';
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
  alignment = 'top-right',
  avatar,
  children,
  linkDescription,
  overline,
  placement = tipDefaultProps.placement,
  truncateLines,
  username,
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
    avatar,
    info: linkDescription,
    overline,
    truncateLines,
    username,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="preview" id={descriptionId}>
      <Anchor {...rest} aria-describedby={descriptionId}>
        {avatar || children}
      </Anchor>
    </Tip>
  );
};
