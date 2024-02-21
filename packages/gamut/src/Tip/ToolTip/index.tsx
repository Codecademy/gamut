import { useEffect, useRef, useState } from 'react';

import {
  TipBaseProps,
  TipCenterAlignment,
  tipDefaultProps,
} from '../shared/types';
import { getTip } from '../shared/utils';

export interface ToolTipProps extends TipBaseProps {
  alignment?: TipCenterAlignment;
  id: string;
}

export const NewToolTip: React.FC<ToolTipProps> = ({
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

  const Tip = getTip({ placement, loaded });

  const tipProps = {
    info,
    wrapperRef,
    ...rest,
  };

  return (
    <>
      <Tip {...tipProps} alignment={alignment} type="tool">
        {children}
      </Tip>
    </>
  );
};
