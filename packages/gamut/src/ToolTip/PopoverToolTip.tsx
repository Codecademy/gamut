import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, FlexBox } from '../Box';
import { Popover } from '../Popover';
import { tooltipDefaultProps, ToolTipProps } from './types';
import { getPopoverAlignment } from './utils';

export const PopoverToolTip: React.FC<ToolTipProps> = ({
  alignment = tooltipDefaultProps.alignment,
  children,
  focusable,
  id,
  mode = tooltipDefaultProps.mode,
  target,
  widthMode = tooltipDefaultProps.widthMode,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useLayoutEffect(() => {
    if (ref?.current) {
      setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, []);

  const popoverAlignments = getPopoverAlignment({ alignment });

  return (
    <Box
      position="relative"
      display="inline-flex"
      onMouseLeave={() => setIsOpen(false)}
    >
      <Box
        aria-labelledby={id}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        height="min-content"
        onBlur={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onMouseEnter={() => setIsOpen(true)}
        ref={ref}
        role={focusable ? 'button' : undefined}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
        width="min-content"
      >
        {target}
      </Box>
      <Popover
        {...popoverAlignments}
        aria-live="polite"
        horizontalOffset={offset}
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        outline
        role="tooltip"
        size="sml"
        targetRef={ref}
        widthRestricted={widthMode === 'standard'}
        // TO-DO: mode
        // bg={mode === 'light' ? 'white' : 'black'}
        // color={mode === 'light' ? 'text' : 'secondary'}
      >
        <FlexBox alignItems="flex-start" flexDirection="column">
          {children}
        </FlexBox>
      </Popover>
    </Box>
  );
};
