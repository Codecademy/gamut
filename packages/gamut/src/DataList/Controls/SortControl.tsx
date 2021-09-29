import { ArrowChevronDownFilledIcon } from '@codecademy/gamut-icons';
import { states } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { FlexBox } from '../../Box';
import { ButtonBase } from '../../ButtonBase';
import { Query, QueryValues, SortDirection } from '..';

const SortIcon = styled(ArrowChevronDownFilledIcon)(
  states({
    asc: {
      transform: 'rotate(180deg)',
    },
    disabled: {
      color: 'background-disabled',
    },
  })
);

interface SortControlProps {
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
  columnKey,
  direction,
  onQuery,
  children,
}) => {
  return (
    <ButtonBase
      onClick={() =>
        onQuery('sort', columnKey, getNextSortDirection(direction))
      }
    >
      <FlexBox alignItems="center" gap={4}>
        {children}
        <FlexBox column width={16}>
          <SortIcon
            asc
            size={9}
            disabled={direction !== 'asc'}
            aria-label="ascending"
          />
          <SortIcon
            size={9}
            disabled={direction !== 'desc'}
            aria-label="descending"
          />
        </FlexBox>
      </FlexBox>
    </ButtonBase>
  );
};
