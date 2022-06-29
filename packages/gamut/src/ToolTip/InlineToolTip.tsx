import React from 'react';

import {
  TargetContainer,
  ToolTipBody,
  ToolTipContainer,
  TooltipWrapper,
} from './elements';
import { tooltipDefaultProps, ToolTipPlacementComponentProps } from './types';
import { escapeKeyPressHandler, getAccessibilityProps } from './utils';

export const InlineToolTip: React.FC<ToolTipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = tooltipDefaultProps.widthMode,
}) => {
  const accessibilityProps = getAccessibilityProps(focusable);

  return (
    <TooltipWrapper>
      <TargetContainer
        aria-labelledby={id}
        onKeyDown={(e) => escapeKeyPressHandler(e)}
        {...accessibilityProps}
      >
        {target}
      </TargetContainer>
      <ToolTipContainer
        as="div"
        alignment={alignment}
        id={id}
        role="tooltip"
        aria-live="polite"
      >
        <ToolTipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          minWidth={widthMode === 'unlimited' ? 'initial' : '4rem'}
          color="currentColor"
        >
          {children}
        </ToolTipBody>
      </ToolTipContainer>
    </TooltipWrapper>
  );
};
