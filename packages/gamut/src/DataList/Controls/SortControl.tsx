import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { css, states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { Anchor } from '../../Anchor';
import { FlexBox } from '../../Box';
import { useListState } from '../hooks/useListState';
import { OnSort, SortDirection, SortOrder } from '../types';

const SortAnchor = styled(Anchor)(
  css({
    color: 'text',
    textAlign: 'left',
    width: '100%',
    alignItems: 'flex-end',
    '&:hover': {
      color: 'text',
    },
    '> div': {
      color: 'text-disabled',
    },
    '&:hover div': {
      color: 'text-secondary',
    },
  })
);

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    active: {
      color: 'text-accent',
    },
  })
);

interface SortControlProps {
  columnKey: string;
  onSort?: OnSort<any>;
  children: string;
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
      aria-label={`sort by ${columnKey}`}
      display="inline-flex"
      variant="interface"
      onClick={() =>
        onSort?.({
          dimension: columnKey,
          value: getNextSortDirection(direction),
        })
      }
    >
      {children}
      <FlexBox column mb={4} ml={8} width={16}>
        <SortIcon
          active={direction === 'asc'}
          aria-hidden={false}
          aria-label="ascending"
          asc
          color="currentColor"
          size={9}
        />
        <SortIcon
          active={direction === 'desc'}
          aria-hidden={false}
          aria-label="descending"
          color="currentColor"
          size={9}
        />
      </FlexBox>
    </SortAnchor>
  );
};
