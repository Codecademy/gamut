import React from 'react';

import { InlineToolTip } from './InlineToolTip';
import { PopoverToolTip } from './PopoverToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  mode = tooltipDefaultProps.mode,
  widthMode = tooltipDefaultProps.widthMode,
  isPopover,
  ...rest
}) => {
  if (isPopover)
    return (
      <PopoverToolTip
        alignment={alignment}
        mode={mode}
        widthMode={widthMode}
        {...rest}
      />
    );
  return (
    <InlineToolTip
      alignment={alignment}
      mode={mode}
      widthMode={widthMode}
      {...rest}
    />
  );
};
