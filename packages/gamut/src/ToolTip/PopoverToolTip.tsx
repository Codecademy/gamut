import React, { useLayoutEffect, useRef, useState } from 'react';

import { Box, FlexBox } from '../Box';
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
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    if (ref?.current) {
      setOffset(-ref.current.clientWidth / 2 + 35);
    }
  }, []);

  return (
    <>
      <Box
        bg="palePink"
        aria-labelledby={id}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        // ToolTips sometimes contain actual <button>s, which cannot be a child of a button.
        // This element still needs tab focus so we must use the `tabIndex=0` hack.
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={focusable ? 0 : undefined}
        ref={ref}
        width="min-content"
        height="min-content"
      >
        <FlexBox center width="100px">
          |
        </FlexBox>
      </Box>
      <Popover
        beak="left"
        isOpen
        outline
        targetRef={ref}
        onRequestClose={() => null}
        role="tooltip"
        aria-live="polite"
        align="left"
        horizontalOffset={offset}
      >
        <FlexBox flexDirection="column" p={16} alignItems="flex-start">
          <Box fontSize={16} mb={8}>
            Nothing clickable here but the container has fallback focus
          </Box>
        </FlexBox>
      </Popover>
    </>
  );
};
