import * as React from 'react';

import { TargetContainer, TipBody, ToolTipWrapper } from '../shared/elements';
import { escapeKeyPressHandler } from '../shared/utils';
import { ToolTipContainer } from '../ToolTip/elements';
import {
  deprecatedTooltipDefaultProps,
  DeprecatedToolTipPlacementComponentProps,
} from './types';
import { getDeprecatedAccessibilityProps } from './utils';

export const DeprecatedInlineToolTip: React.FC<
  DeprecatedToolTipPlacementComponentProps
> = ({
  alignment = deprecatedTooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = deprecatedTooltipDefaultProps.widthMode,
}) => {
  const accessibilityProps = getDeprecatedAccessibilityProps({ focusable, id });

  /**
   * Note to all - this entire file is being deleted before this ships - I removed the below so that I can test the rest of the code against mono + monolith
   */
  return (
    <ToolTipWrapper>
      <TargetContainer
        onKeyDown={(e) => escapeKeyPressHandler(e)}
        {...accessibilityProps}
      >
        {target}
      </TargetContainer>
      <ToolTipContainer
        alignment={alignment}
        aria-live="polite"
        as="div"
        id={id}
        role="tooltip"
      >
        <TipBody
          alignment={alignment.includes('center') ? 'vertCenter' : 'aligned'}
          color="currentColor"
          minWidth={widthMode === 'unlimited' ? 'initial' : '4rem'}
        >
          {children}
        </TipBody>
      </ToolTipContainer>
    </ToolTipWrapper>
  );
};
