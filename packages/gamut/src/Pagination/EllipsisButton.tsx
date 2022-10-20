import { forwardRef, useState } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { PaginationButton, PaginationButtonProps } from './PaginationButton';
import { wrapWithSlideAnimation } from './utils';

export interface EllipsisButtonProps extends PaginationButtonProps {
  'aria-label': string;
  direction: 'back' | 'forward';
}

const ellipsisButtonContents = { ellipsis: '•••', back: '«', forward: '»' };

export const BaseEllipsisButton = forwardRef<
  ButtonBaseElements,
  EllipsisButtonProps
  // eslint-disable-next-line react/prop-types
>(({ direction, showButton, ...props }, ref) => {
  const [contents, setContents] = useState(ellipsisButtonContents.ellipsis);

  return (
    <PaginationButton
      ellipsis
      onMouseEnter={() => setContents(ellipsisButtonContents[direction])}
      onMouseLeave={() => setContents(ellipsisButtonContents.ellipsis)}
      {...props}
      ref={ref}
      showButton={showButton}
    >
      {contents}
    </PaginationButton>
  );
});

export const EllipsisButton = wrapWithSlideAnimation(BaseEllipsisButton);
