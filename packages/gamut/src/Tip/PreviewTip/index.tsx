import { useId } from '@reach/auto-id';
import { ComponentProps, useEffect, useMemo, useRef, useState } from 'react';

import { Anchor, Text } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  PreviewTipContent,
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';
import { getPreviewDescription } from './utils';

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
  const description = useMemo(
    () => getPreviewDescription({ linkDescription, overline, username }),
    [linkDescription, overline, username]
  );
  const tipProps = {
    alignment,
    avatar,
    info: linkDescription,
    placement,
    overline,
    truncateLines,
    username,
    wrapperRef,
  };

  return (
    <Tip {...tipProps} type="preview">
      <Text aria-hidden screenreader id={descriptionId}>
        {`${description}`}
      </Text>

      <Anchor
        {...rest}
        aria-label={avatar ? `Profile Preview:` : `Link Preview:`}
        aria-describedby={descriptionId}
        display={avatar && rest?.display === undefined ? 'flex' : rest?.display}
      >
        {avatar || children}
      </Anchor>
    </Tip>
  );
};
