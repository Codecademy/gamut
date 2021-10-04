import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Anchor } from '../..';
import { FlexBox } from '../../Box';
import { OnSort, SortDirection, SortOrder } from '..';
import { useListState } from '../hooks/useListState';

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    active: {
      color: 'primary',
    },
    disabled: {
      color: 'background-disabled',
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
  columnKey,
  onSort,
}) => {
  const direction = useListState().query?.sort?.[columnKey] ?? 'none';

  return (
    <Anchor
      variant="interface"
      onClick={() =>
        onSort?.({
          dimension: columnKey,
          value: getNextSortDirection(direction),
        })
      }
      display="inline-flex"
      aria-label={`sort by ${columnKey}`}
    >
      <FlexBox inline column width={16} center>
        <SortIcon
          asc
          active={direction === 'asc'}
          size={10}
          disabled={direction !== 'asc'}
          aria-label="ascending"
        />
        <SortIcon
          size={10}
          active={direction === 'desc'}
          disabled={direction !== 'desc'}
          aria-label="descending"
        />
      </FlexBox>
    </Anchor>
  );
};
