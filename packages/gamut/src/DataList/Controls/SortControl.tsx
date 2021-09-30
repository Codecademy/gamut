import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Anchor } from '../..';
import { FlexBox } from '../../Box';
import { Query, QueryValues, SortDirection } from '..';

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
  justify?: 'left' | 'right';
  columnKey: string;
  direction: SortDirection;
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: QueryValues<any>
  ) => void;
}

const SORT_DIRECTIONS = ['asc', 'desc', 'none'] as const;

const getNextSortDirection = (dir: SortDirection) => {
  const currentIdx = SORT_DIRECTIONS.indexOf(dir);
  const nextIdx =
    currentIdx === SORT_DIRECTIONS.length - 1 ? 0 : currentIdx + 1;
  return SORT_DIRECTIONS[nextIdx];
};

export const SortControl: React.FC<SortControlProps> = ({
  justify = 'left',
  columnKey,
  direction,
  onQuery,
  children,
}) => {
  return (
    <Anchor
      variant="interface"
      onClick={() =>
        onQuery('sort', columnKey, getNextSortDirection(direction))
      }
      display="inline-flex"
    >
      <FlexBox inline textAlign={justify} mr={8}>
        {children}
      </FlexBox>
      <FlexBox inline column width={16}>
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
