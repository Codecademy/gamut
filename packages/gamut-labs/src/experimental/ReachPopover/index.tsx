import React, { useRef } from 'react';
import Popover, { positionDefault } from '@reach/popover';

export type ReachPopoverProps = {
  isOpen?: boolean;
};

export const ReachPopover: React.FC<ReachPopoverProps> = ({ isOpen }) => {
  const ref = useRef(null);

  return (
    <div>
      <p ref={ref}>hello?</p>

      {isOpen && (
        <Popover targetRef={ref} position={positionDefault}>
          <div>
            <p>
              Whoa! Look at me!
              <button type="button">inside</button>
            </p>
          </div>
        </Popover>
      )}
    </div>
  );
};
