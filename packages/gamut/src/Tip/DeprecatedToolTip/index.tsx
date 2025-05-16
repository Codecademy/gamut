import { useEffect, useState } from 'react';
import * as React from 'react';

import { DeprecatedFloatingToolTip } from './DeprecatedFloatingToolTip';
import { DeprecatedInlineToolTip } from './DeprecatedInlineToolTip';
import { deprecatedTooltipDefaultProps, DeprecatedToolTipProps } from './types';

// This iteration of ToolTip is deprecated, parts of it will be used in the upcoming InfoTip, ToolTip, and PreviewTip components

/**
 * @deprecated Use `InfoTip`or `ToolTip` instead.
 */
export const DeprecatedToolTip: React.FC<DeprecatedToolTipProps> = ({
  alignment = deprecatedTooltipDefaultProps.alignment,
  placement = deprecatedTooltipDefaultProps.placement,
  widthMode = deprecatedTooltipDefaultProps.widthMode,
  ...rest
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return placement === 'floating' && loaded ? (
    <DeprecatedFloatingToolTip
      alignment={alignment}
      widthMode={widthMode}
      {...rest}
    />
  ) : (
    <DeprecatedInlineToolTip
      alignment={alignment}
      widthMode={widthMode}
      {...rest}
    />
  );
};
