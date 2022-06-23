import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    if (ref?.current) {
      setOffset(-ref.current.clientWidth / 2 + 32);
    }
  }, []);

  const popoverAlignments = getPopoverAlignment({ alignment });

  const handleShowAction = (
    event: FocusEvent | MouseEvent,
    action: 'open' | 'close',
    actionType: 'mouse' | 'keyboard'
  ) => {
    if (actionType === 'keyboard' && event.currentTarget === event.target) {
      console.log(isOpen, isFocused);
      if (action === 'open' && !isOpen) {
        console.log('hi');
        setIsOpen(true);
        setIsFocused(true);
      }
    }
  };

  const handleHideAction = (
    event: FocusEvent | MouseEvent,
    action: 'open' | 'close',
    actionType: 'mouse' | 'keyboard'
  ) => {
    // if (actionType === 'keyboard' && event.currentTarget === event.target) {
    //   if (action === 'close' && isOpen && isFocused) {
    //     setIsOpen(false);
    //     setIsFocused(false);
    //     console.log('close');
    //   }
    // }
    if (
      event.currentTarget === event.target ||
      !event?.currentTarget?.contains(event.relatedTarget)
    ) {
      console.log('unfocused self');
      if (action === 'close' && isOpen) {
        setIsOpen(false);
        setIsFocused(false);
        console.log('close');
      }
    } else {
      console.log('unfocused child', event.target);
    }
  };

  return (
    <Box
      position="relative"
      display="inline-flex"
      // onMouseLeave={() => handleShowHideAction('close', 'mouse')}
    >
      <Box
        aria-labelledby={id}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            (event.target as HTMLElement).blur();
          }
        }}
        height="min-content"
        onFocus={(e) => {
          handleShowAction(e, 'open', 'keyboard');
        }}
        // onBlur={(e) => {
        //   handleHideAction(e, 'close', 'keyboard');
        // }}
        // onMouseEnter={() => handleShowHideAction('open', 'mouse')}
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
