import { ReactNode, useEffect, useRef, useState } from 'react';

import { FlexBox } from '../../Box';
import { FillButton } from '../../Button';
import { FloatingTip } from '../shared/FloatingTip';
import { InlineTip } from '../shared/InlineTip';
import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';

export interface NewToolTipProps extends TipBaseProps {
  alignment?: TipCenterAlignment;
  children: ReactNode;
  /**
   * Required for accessiblity - the same id needs to be passed to the `aria-describedby` attribute of the element that the tooltip is describing.
   */
  id: string;
}

export const NewToolTip: React.FC<NewToolTipProps> = ({
  alignment = 'top-center',
  children,
  info,
  placement = tipDefaultProps.placement,
  ...rest
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const Tip = loaded && placement === 'floating' ? FloatingTip : InlineTip;

  const tipProps = {
    alignment,
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <Tip {...tipProps} type="tool">
      {children}
    </Tip>
  );
};

const NewTip = () => {
  return (
    <FlexBox center py={64} m={24}>
      <NewToolTip id="fill-id" info="hey">
        <FillButton aria-describedby="fill-id" aria-disabled>
          Click me
        </FillButton>
      </NewToolTip>
    </FlexBox>
  );
};
