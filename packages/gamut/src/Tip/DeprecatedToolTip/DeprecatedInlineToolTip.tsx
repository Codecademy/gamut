import * as React from 'react';

import {
  TargetContainer,
  ToolTipBody,
  TooltipWrapper,
} from '../shared/elements';
import { escapeKeyPressHandler } from '../shared/utils';
import { DeprecatedToolTipContainer } from './elements';
import {
  deprecatedTooltipDefaultProps,
  DeprecatedToolTipPlacementComponentProps,
} from './types';
import { getDeprecatedAccessibilityProps } from './utils';

export const DeprecatedInlineToolTip: React.FC<DeprecatedToolTipPlacementComponentProps> = ({
  alignment = deprecatedTooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = deprecatedTooltipDefaultProps.widthMode,
}) => {
  const accessibilityProps = getDeprecatedAccessibilityProps({ focusable, id });

  return (
    <TooltipWrapper>
      <TargetContainer
        onKeyDown={(e) => escapeKeyPressHandler(e)}
        {...accessibilityProps}
      >
        {target}
      </TargetContainer>
      <DeprecatedToolTipContainer
        alignment={alignment}
        aria-live="polite"
        as="div"
        id={id}
        role="tooltip"
      >
        <ToolTipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          minWidth={widthMode === 'unlimited' ? 'initial' : '4rem'}
        >
          {children}
        </ToolTipBody>
      </DeprecatedToolTipContainer>
    </TooltipWrapper>
  );
};
