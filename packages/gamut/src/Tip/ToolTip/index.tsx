import { useEffect, useMemo, useRef, useState } from 'react';

import { WithChildrenProp } from '../..';
import { Text } from '../../Typography';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';

export type ToolTipProps = TipBaseProps &
  WithChildrenProp & {
    alignment?: TipCenterAlignment;
    /**
     * Required for accessiblity - the same id needs to be passed to the `aria-describedby` attribute of the element that the tooltip is describing.
     */
    id: string;
    /**
     * If your button has a label that is repeated in the first word of the tooltip, you can set this to `true` to avoid repetition. If your info tip is not a string, you cannot do this.
     */
    hasRepetitiveLabel?: boolean;
    /**
     * If you would like to forgo the aria-describedby attribute set this to `true`. When using this prop, the `aria-label` should always be identical to the `tip`.
     */
    hideAriaToolTip?: boolean;
  };

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-center',
  children,
  info,
  placement = tipDefaultProps.placement,
  id,
  hasRepetitiveLabel,
  hideAriaToolTip,
  ...rest
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const isFloating = placement === 'floating';
  const Tip = loaded && isFloating ? FloatingTip : InlineTip;

  const adjustedInfo = useMemo(() => {
    return hasRepetitiveLabel && typeof info === 'string'
      ? info.split(' ').slice(1).join(' ')
      : info;
  }, [info, hasRepetitiveLabel]);

  // this should only happen if the button has an aria-label that is the same is and ONLY the content of the tooltip

  const shouldRenderAriaTip = useMemo(() => {
    return hideAriaToolTip ? false : adjustedInfo !== '';
  }, [hideAriaToolTip, adjustedInfo]);

  const tipProps = {
    alignment,
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <>
      {shouldRenderAriaTip && (
        <Text screenreader id={id} role="tooltip">
          {adjustedInfo}
        </Text>
      )}
      <Tip {...tipProps} type="tool">
        {children}
      </Tip>
    </>
  );
};
