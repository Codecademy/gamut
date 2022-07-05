import React from 'react';

import { FloatingToolTip } from './FloatingToolTip';
import { InlineToolTip } from './InlineToolTip';
import { tooltipDefaultProps, ToolTipProps } from './types';

export const ToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  placement = tooltipDefaultProps.placement,
  widthMode = tooltipDefaultProps.widthMode,
  ...rest
}) =>
  placement === 'floating' ? (
    <FloatingToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  ) : (
    <InlineToolTip alignment={alignment} widthMode={widthMode} {...rest} />
  );
