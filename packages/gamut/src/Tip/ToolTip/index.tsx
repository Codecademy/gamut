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

export type NewToolTipProps = TipBaseProps &
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
  };

export const NewToolTip: React.FC<NewToolTipProps> = ({
  alignment = 'top-center',
  children,
  info,
  placement = tipDefaultProps.placement,
  id,
  hasRepetitiveLabel,
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

  const tipProps = {
    alignment,
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <>
      <Text screenreader id={id} role="tooltip">
        {adjustedInfo ?? 'Tooltip content is currently loading...'}
      </Text>
      <Tip {...tipProps} type="tool">
        {children}
      </Tip>
    </>
  );
};
