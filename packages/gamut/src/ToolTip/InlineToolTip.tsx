import * as React from 'react';
import { useRef } from 'react';

import {
  TargetContainer,
  ToolTipBody,
  ToolTipContainer,
  TooltipWrapper,
} from './elements';
import { tooltipDefaultProps, ToolTipPlacementComponentProps } from './types';
import { getAccessibilityProps } from './utils';

export const InlineToolTip: React.FC<ToolTipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  target,
  widthMode = tooltipDefaultProps.widthMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [escapePressed, setEscapePressed] = React.useState(false);
  const accessibilityProps = getAccessibilityProps({ focusable, id });

  const handleShowHideAction = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.type === 'mouseenter') {
      ref?.current?.focus();
      setEscapePressed(false);
    }

    if (e.type === 'mouseleave') {
      ref?.current?.blur();
      setEscapePressed(false);
    }
  };

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      ref?.current?.blur();
      console.log('escape pressed');

      setEscapePressed(true);
    }
  };

  return (
    <TooltipWrapper>
      <TargetContainer
        ref={ref}
        onMouseEnter={(e) => handleShowHideAction(e)}
        onMouseLeave={(e) => handleShowHideAction(e)}
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
        hidden={escapePressed}
      >
        <ToolTipBody
          alignment={alignment.includes('center') ? 'centered' : 'aligned'}
          color="currentColor"
          minWidth={widthMode === 'unlimited' ? 'initial' : '4rem'}
        >
          {children}
        </ToolTipBody>
      </ToolTipContainer>
    </TooltipWrapper>
  );
};
