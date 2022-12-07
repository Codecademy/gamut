import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor } from '../..';
import { FlexBox } from '../../Box';
import { OnSort, SortDirection, SortOrder } from '..';
import { useListState } from '../hooks/useListState';

const SortAnchor = styled(Anchor)(
  css({
    textAlign: 'left',
    width: '100%',
    alignItems: 'flex-end',
    '&:hover': {
      color: 'text',
    },
    '> div': {
      color: 'navy-300',
    },
    '&:hover div': {
      color: 'text-disabled',
    },
  })
);

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    active: {
      color: 'text',
    },
  })
);

interface SortControlProps {
  columnKey: string;
  onSort?: OnSort<any>;
}

const defaultSortOrder = ['asc', 'desc', 'none'] as SortOrder;

const getNextSortDirection = (dir: SortDirection) => {
  const currentIdx = defaultSortOrder.indexOf(dir);
  const nextIdx =
    currentIdx === defaultSortOrder.length - 1 ? 0 : currentIdx + 1;
  return defaultSortOrder[nextIdx];
};

export const SortControl: React.FC<SortControlProps> = ({
  children,
  columnKey,
  onSort,
}) => {
  const direction = useListState().query?.sort?.[columnKey] ?? 'none';

  return (
    <SortAnchor
      variant="interface"
      onClick={() =>
        onSort?.({
          dimension: columnKey,
          value: getNextSortDirection(direction),
        })
      }
      display="inline-flex"
      aria-label={`sort by ${columnKey}`}
      color="text"
    >
      {children}
      <FlexBox column width={16} ml={8} mb={4}>
        <SortIcon
          asc
          active={direction === 'asc'}
          size={9}
          aria-label="ascending"
          color="currentColor"
        />
        <SortIcon
          size={9}
          active={direction === 'desc'}
          aria-label="descending"
          color="currentColor"
        />
      </FlexBox>
    </SortAnchor>
  );
};
