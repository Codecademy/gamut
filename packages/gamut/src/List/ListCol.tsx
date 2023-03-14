import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { ComponentProps, forwardRef } from 'react';

import { ColEl } from './elements';
import { useListContext } from './ListProvider';
import { PublicListProps } from './types';

const StickyWrapper = styled.div(
  css({
    '&:before': {
      content: '""',
      position: 'absolute',
      bg: 'background',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bg: 'inherit',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: -1,
    },
    position: 'sticky',
    left: 0,
    zIndex: 1,
    bg: 'inherit',
    '&:not(:first-of-type)': {
      left: { xs: 16 },
      overflow: 'visible',
    },
    '&:not(:first-of-type):before': {
      display: { _: 'none', xs: 'block' },
      content: '""',
      bg: 'inherit',
      left: -16,
      height: 1,
      width: 16,
      position: 'absolute',
    },
  })
);
export interface ListColProps
  extends PublicListProps<ComponentProps<typeof ColEl>> {}

export const ListCol = forwardRef<HTMLDivElement, ListColProps>(
  ({ type, ...rest }, ref) => {
    const { scrollable, ...activeVariants } = useListContext();
    const sticky = type === 'header' && scrollable;

    const col = (
      <ColEl
        {...activeVariants}
        {...rest}
        delimiter={sticky && activeVariants.variant === 'table'}
        type={type}
        sticky={sticky}
        ref={ref}
      />
    );
    if (sticky) {
      return <StickyWrapper>{col}</StickyWrapper>;
    }
    return <>{col}</>;
  }
);
