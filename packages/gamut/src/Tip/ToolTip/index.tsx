import { useEffect, useRef, useState } from 'react';

import { Text } from '../../Typography';
import { WithChildrenProp } from '../../utils';
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
     * Can be used for accessibility - the same id needs to be passed to the `aria-describedby` attribute of the element that the tooltip is describing.
     */
    id?: string;
  };

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-center',
  children,
  info,
  placement = tipDefaultProps.placement,
  id,
  ...rest
}) => {
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
    <>
      {isFloating && (
        <Text aria-hidden id={id} role="tooltip" screenreader>
          {info}
        </Text>
      )}
      <Tip {...tipProps} id={!isFloating ? id : undefined} type="tool">
        {children}
      </Tip>
    </>
  );
};
