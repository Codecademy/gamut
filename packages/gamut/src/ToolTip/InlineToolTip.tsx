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

  const action = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.type === 'mouseenter') {
      ref?.current?.focus();
      setEscapePressed(false);
      return;
    }

    ref?.current?.blur();
  };

  const escapeKeyPressHandler = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Escape') {
      setEscapePressed(true);
      ref?.current?.blur();
    }
  };

  return (
    <TooltipWrapper>
      <TargetContainer
        ref={ref}
        onMouseEnter={(e) => action(e)}
        onMouseLeave={(e) => action(e)}
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
