import { useLayoutEffect, useRef, useState } from 'react';
import * as React from 'react';

import { Box, FlexBox } from '../../Box';
import { Popover } from '../../Popover';
import { TargetContainer } from './elements';
import { TipPlacementComponentProps, tooltipDefaultProps } from './types';
import { getPopoverAlignment } from './utils';

export const FloatingTip: React.FC<TipPlacementComponentProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  escapeKeyPressHandler,
  info,
  isTipHidden,
  wrapperRef,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (ref?.current) {
      setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, []);

  const popoverAlignments = getPopoverAlignment({ alignment });

  return (
    <Box position="relative" display="inline-flex" ref={wrapperRef}>
      <TargetContainer ref={ref} onKeyDown={(e) => escapeKeyPressHandler(e)}>
        {children}
      </TargetContainer>
      <Popover
        {...popoverAlignments}
        animation="fade"
        horizontalOffset={offset}
        isOpen={!isTipHidden}
        outline
        role="tooltip"
        variant="secondary"
        skipFocusTrap
        targetRef={ref}
      >
        <FlexBox alignItems="flex-start" flexDirection="column">
          {info}
        </FlexBox>
      </Popover>
    </Box>
  );
};
