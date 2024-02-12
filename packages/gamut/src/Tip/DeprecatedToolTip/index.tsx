import { useEffect, useState } from 'react';
import * as React from 'react';

import { FloatingToolTip } from '../shared/FloatingToolTip';
import { InlineToolTip } from '../shared/InlineToolTip';
import { tooltipDefaultProps, ToolTipProps } from '../shared/types';

// This iteration of ToolTip is deprecated, parts of it will be used in the upcoming InfoTip, ToolTip, and PreviewTip components
export const DeprecatedToolTip: React.FC<ToolTipProps> = ({
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
