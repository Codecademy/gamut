import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { ButtonBaseElements as ButtonBaseElementsValue } from '../ButtonBase/ButtonBase';
import type { PaginationButtonProps } from './PaginationButton';
import { PaginationButton } from './PaginationButton';
import { wrapWithSlideAnimation } from './utils';

/** Props for EllipsisButton. Use when wrapping or composing EllipsisButton. */
export interface EllipsisButtonProps extends PaginationButtonProps {
  'aria-label': string;
  buttonDirection: 'back' | 'forward';
}

const ellipsisButtonContents = { ellipsis: '•••', back: '«', forward: '»' };

const BaseEllipsisButtonComponent = forwardRef<
  ButtonBaseElementsValue,
  EllipsisButtonProps
>(({ buttonDirection, showButton, ...props }, ref) => {
  const [contents, setContents] = useState(ellipsisButtonContents.ellipsis);

  return (
    <PaginationButton
      ellipsis
      onMouseEnter={() => setContents(ellipsisButtonContents[buttonDirection])}
      onMouseLeave={() => setContents(ellipsisButtonContents.ellipsis)}
      {...props}
      ref={ref}
      showButton={showButton}
    >
      {contents}
    </PaginationButton>
  );
});

export const BaseEllipsisButton =
  BaseEllipsisButtonComponent as unknown as ForwardRefExoticComponent<
    EllipsisButtonProps & RefAttributes<ButtonBaseElementsValue>
  >;

export const EllipsisButton = wrapWithSlideAnimation(BaseEllipsisButton);
