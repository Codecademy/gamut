import * as React from 'react';
import { useEffect, useRef } from 'react';

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
  const [isOpenFromMouse, setIsOpenFromMouse] = React.useState(false);
  const accessibilityProps = getAccessibilityProps({ focusable, id });

  useEffect(() => {
    if (isOpenFromMouse) {
      const closeOnEsc = ({ key }: { key: string }) => {
        if (key === 'Escape') {
          setEscapePressed(true);
        }
      };
      document.addEventListener('keydown', closeOnEsc);

      return () => {
        setEscapePressed(false);
        document.removeEventListener('keydown', closeOnEsc);
      };
    }
  }, [isOpenFromMouse]);

  const handleShowHideAction = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.type === 'mouseenter') {
      setIsOpenFromMouse(true);
    }

    if (e.type === 'mouseleave') {
      setIsOpenFromMouse(false);
    }
  };

  return (
    <TooltipWrapper>
      <TargetContainer
        ref={ref}
        onClick={() => setEscapePressed(false)}
        onMouseEnter={(e) => handleShowHideAction(e)}
        onMouseLeave={(e) => handleShowHideAction(e)}
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
