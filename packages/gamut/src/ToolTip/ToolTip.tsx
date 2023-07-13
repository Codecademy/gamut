import { useEffect, useState } from 'react';
import * as React from 'react';

import { FloatingToolTip } from './FloatingToolTip';
import { InlineToolTip } from './InlineToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  placement = tooltipDefaultProps.placement,
  widthMode = tooltipDefaultProps.widthMode,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return placement === 'floating' && loaded ? (
    <FloatingToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  ) : (
    <InlineToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  );
};
