import React, { useRef } from 'react';

import { Box } from '../Box';
import { Popover } from '../Popover';
import { ToolTipProps } from '.';

export type ToolTipAlignment =
  | 'bottom-center'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-center'
  | 'top-left'
  | 'top-right';

export const PopoverToolTip: React.FC<ToolTipProps> = ({
  focusable,
  id,

  target,
}) => {
  const activeElRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Box
        aria-labelledby={id}
        role={focusable ? 'button' : undefined}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
        ref={activeElRef}
      >
        {target}
      </Box>
      <Popover
        beak="left"
        isOpen
        outline
        targetRef={activeElRef}
        onRequestClose={() => null}
        role="tooltip"
        aria-live="polite"
      >
        <Box fontSize={16} mb={8}>
          Nothing clickable here but the container has fallback focus
        </Box>
      </Popover>
    </>
  );
};
