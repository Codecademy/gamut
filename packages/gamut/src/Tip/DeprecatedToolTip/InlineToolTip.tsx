import * as React from 'react';

import {
  DeprecatedToolTipContainer,
  InfoTipBody,
  TargetContainer,
  TooltipWrapper,
} from '../shared/elements';
import {
  DeprecatedToolTipPlacementComponentProps,
  tooltipDefaultProps,
} from '../shared/types';
import { escapeKeyPressHandler, getAccessibilityProps } from '../shared/utils';

export const InlineToolTip: React.FC<DeprecatedToolTipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = tooltipDefaultProps.widthMode,
}) => {
  const accessibilityProps = getAccessibilityProps({ focusable, id });

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
        <InfoTipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          minWidth={widthMode === 'unlimited' ? 'initial' : '4rem'}
        >
          {children}
        </InfoTipBody>
      </DeprecatedToolTipContainer>
    </TooltipWrapper>
  );
};
