import { forwardRef, useState } from 'react';

import { ButtonBaseElements } from '../ButtonBase/ButtonBase';
import { PaginationButton, PaginationButtonProps } from './PaginationButton';
import { wrapWithSlideAnimation } from './utils';

export type EllipsisButtonProps = PaginationButtonProps & {
  'aria-label': string;
  btnDirection: 'back' | 'forward';
};

const ellipsisButtonContents = { ellipsis: '•••', back: '«', forward: '»' };

export const BaseEllipsisButton = forwardRef<
  ButtonBaseElements,
  EllipsisButtonProps
  // eslint-disable-next-line react/prop-types
>(({ btnDirection, showButton, ...props }, ref) => {
  const [contents, setContents] = useState(ellipsisButtonContents.ellipsis);

  return (
    <PaginationButton
      ellipsis
      onMouseEnter={() => setContents(ellipsisButtonContents[btnDirection])}
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
