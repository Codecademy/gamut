import { useEffect, useRef, useState } from 'react';

import { Text } from '../../Typography';
import { WithChildrenProp } from '../../utils';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipCenterAlignment,
  tipDefaultProps,
  TipNewBaseProps,
} from '../shared/types';

export type ToolTipProps = TipNewBaseProps &
  WithChildrenProp & {
    alignment?: TipCenterAlignment;
    /**
     * If true, the tooltip closes immediately when the trigger is clicked or activated via keyboard.
     * Pass `false` via `tipProps` on IconButton to opt out (e.g. copy → copied patterns).
     */
    closeOnClick?: boolean;
    /**
     * Can be used for accessibility - the same id needs to be passed to the `aria-describedby` attribute of the element that the tooltip is describing.
     */
    id?: string;
    zIndex?: number;
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
