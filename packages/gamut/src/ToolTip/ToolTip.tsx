import React from 'react';

import { FloatingToolTip } from './FloatingToolTip';
import { InlineToolTip } from './InlineToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  placement = tooltipDefaultProps.placement,
  focusable = tooltipDefaultProps.focusable,
  widthMode = tooltipDefaultProps.widthMode,
  ...rest
}) => {
  if (placement === 'floating')
    return (
      <FloatingToolTip
        alignment={alignment}
        focusable={focusable}
        widthMode={widthMode}
        {...rest}
      />
    );
  return (
    <InlineToolTip
      alignment={alignment}
      focusable={focusable}
      widthMode={widthMode}
      {...rest}
    />
  );
};
