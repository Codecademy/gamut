import React from 'react';

import { PopoverToolTip } from './PopoverToolTip';
import { StaticToolTip } from './StaticToolTip';
import { ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = 'top-right',
  mode = 'light',
  widthMode = 'standard',
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
    <StaticToolTip
      alignment={alignment}
      mode={mode}
      widthMode={widthMode}
      {...rest}
    />
  );
};
