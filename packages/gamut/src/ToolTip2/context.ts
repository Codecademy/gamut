import React, { useContext } from 'react';

interface PopoverContextValue {
  /** Allows content that's within a popover to trigger a close of said popover if they want */
  closeContainingPopover: () => void;
}

export const PopoverContext = React.createContext<PopoverContextValue>({
  closeContainingPopover: () => null,
});

export const usePopoverContext = () => useContext(PopoverContext);
