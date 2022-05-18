import React from 'react';

import { PopoverProps } from './ControlledPopover';
import { Popover } from './Popover';

export type ToolTip2Props = {
  //
} & Pick<PopoverProps, 'children'>;

export const ToolTip2: React.FC<ToolTip2Props> = ({ children }) => {
  return (
    <Popover
      render={() => (
        <div>
          <div>123</div>
          <div>12341234512341234</div>
          <div>567</div>
        </div>
      )}
      width="auto"
      height="auto"
      position={'right-end'}
      useBeak
    >
      {children}
    </Popover>
  );
};

// Features:
// Beak
// Pattern background
// outline
// colormode
// focus trap
export const Popover2: React.FC = () => {
  return (
    <Popover render={() => <div>hey there</div>} width="auto" height="auto">
      <button>TARGET</button>
    </Popover>
  );
};
