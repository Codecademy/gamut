import {
  ComponentProps,
  FocusEvent,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Anchor, Text } from '../..';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  PreviewTipContent,
  TipBaseAlignment,
  TipBaseProps,
  tipDefaultProps,
} from '../shared/types';
import { PreviewTipAnchor } from './elements';
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
  loading,
  overline,
  placement = tipDefaultProps.placement,
  truncateLines,
  username,
  ...rest
}) => {
  const descriptionId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onFocus = (event: FocusEvent<HTMLAnchorElement>) => {
    // Will read text in case user is focused on the link as it loads in content
    setIsLive(true);
    rest?.onFocus?.(event);
  };

  const onBlur = (event: FocusEvent<HTMLAnchorElement>) => {
    setIsLive(false);
    rest?.onBlur?.(event);
  };

  const isFloating = placement === 'floating';
  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const description = useMemo(() => {
    const text = getPreviewDescription({ linkDescription, overline, username });
    return loading ? 'Preview content is loading ' : text;
  }, [loading, linkDescription, overline, username]);

  const tipProps = {
    alignment,
    avatar,
    info: linkDescription,
    loading,
    placement,
    overline,
    truncateLines,
    username,
    wrapperRef,
  };

  return (
    <Tip {...tipProps} type="preview">
      <PreviewTipAnchor
        {...rest}
        aria-describedby={descriptionId}
        display={avatar && rest?.display === undefined ? 'flex' : rest?.display}
        tipType={avatar ? 'avatar' : 'anchor'}
        onBlur={onBlur}
        onFocus={onFocus}
      >
        {avatar || children}
      </PreviewTipAnchor>

      <Text aria-hidden={!isLive} aria-live="polite" screenreader>
        <div id={descriptionId}>{description}</div>
      </Text>
    </Tip>
  );
};
