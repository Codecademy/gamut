import React, { forwardRef, useState } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { PaginationButton, PaginationButtonProps } from './PaginationButton';

export interface EllipsisButtonProps extends PaginationButtonProps {
  'aria-label': string;
  direction: 'back' | 'forward';
}

const ellipsisButtonContents = { ellipsis: '•••', back: '«', forward: '»' };

export const EllipsisButton = forwardRef<
  ButtonBaseElements,
  EllipsisButtonProps
  // eslint-disable-next-line react/prop-types
>(({ direction, ...props }, ref) => {
  const [contents, setContents] = useState(ellipsisButtonContents.ellipsis);

  return (
    <PaginationButton
      onMouseEnter={() => setContents(ellipsisButtonContents[direction])}
      onMouseLeave={() => setContents(ellipsisButtonContents.ellipsis)}
      {...props}
      ref={ref}
    >
      {contents}
    </PaginationButton>
  );
});
