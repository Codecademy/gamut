import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Box, FlexBox } from '../..';
import { Query, SortDirection } from '..';

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    disabled: {
      color: 'background-hover',
    },
  })
);

interface SortControlProps {
  columnKey: string | symbol | number;
  direction: SortDirection;
  onQuery: (
    type: keyof Query<any>,
    dimension: keyof any,
    value: Query<any>[keyof Query<any>][string]
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
  columnKey,
  direction,
  onQuery,
  children,
}) => {
  return (
    <FlexBox
      onClick={() =>
        onQuery('sort', columnKey, getNextSortDirection(direction))
      }
    >
      {children}
      <FlexBox column height={24} width={16} center>
        <SortIcon asc size={9} disabled={direction !== 'asc'} />
        <SortIcon size={9} disabled={direction !== 'desc'} />
      </FlexBox>
    </FlexBox>
  );
};
