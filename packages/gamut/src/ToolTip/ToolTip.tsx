import React from 'react';

import { InlineToolTip } from './InlineToolTip';
import { PopoverToolTip } from './PopoverToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  widthMode = tooltipDefaultProps.widthMode,
  isPopover,
  ...rest
}) => {
  if (isPopover)
    return (
      <PopoverToolTip alignment={alignment} widthMode={widthMode} {...rest} />
    );
  return (
    <InlineToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  );
};
