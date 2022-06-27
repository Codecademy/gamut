import React from 'react';

import { InlineToolTip } from './InlineToolTip';
import { PopoverToolTip } from './PopoverToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  placement = tooltipDefaultProps.placement,
  widthMode = tooltipDefaultProps.widthMode,
  ...rest
}) => {
  if (placement === 'floating')
    return (
      <PopoverToolTip alignment={alignment} widthMode={widthMode} {...rest} />
    );
  return (
    <InlineToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  );
};
