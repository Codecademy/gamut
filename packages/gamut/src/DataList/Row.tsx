import { ArrowChevronDownIcon } from '@codecademy/gamut-icons';
import { css, states, transitionConcat } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { Checkbox, IconButton, ListCol, ListRow, Text } from '..';
import { ColumnConfig } from './types';

interface ExpandButtonProps {
  expanded?: boolean;
}

const ExpandButton = styled(IconButton)<ExpandButtonProps>(
  css({
    svg: {
      transition: transitionConcat(['transform'], 'fast', 'linear'),
    },
  }),
  states({
    expanded: {
      svg: {
        transform: 'rotate(180deg)',
      },
    },
  })
);

interface DataRowProps<
  Rows,
  Cols extends ColumnConfig<Rows>[],
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey]
> {
  id: Ids;
  row: Rows;
  columns: Cols;
  onSelect?: (id: Ids) => void;
  onExpand?: (id: Ids) => void;
  renderExpanded: (row: Rows) => React.ReactNode;
  selected: boolean;
  expanded: boolean;
}

export function DataRow<
  Rows,
  Cols extends ColumnConfig<Rows>[],
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey]
>({
  id,
  columns,
  row,
  onSelect,
  selected,
  expanded,
  onExpand,
  renderExpanded,
}: DataRowProps<Rows, Cols, IdKey, Ids>) {
  const expandedContent = (
    <>
      {columns[0].key === 'select' && (
        <ListCol size="content" aria-hidden ghost>
          <Checkbox
            disabled
            spacing="tight"
            label={<Text screenreader>Select Row {id}</Text>}
            name="placeholder"
            htmlFor="placeholder"
            checked={selected}
            onChange={() => onSelect?.(id)}
          />
        </ListCol>
      )}
      <ListCol fill>{renderExpanded?.(row)}</ListCol>
    </>
  );

  return (
    <ListRow expanded={expanded} renderExpanded={expandedContent}>
      {columns.map(({ key, render, ...columnProps }) => {
        const columnKey = `${id}-col-${key}`;
        if (key === 'select') {
          return (
            <ListCol key={columnKey} {...columnProps}>
              <Checkbox
                spacing="tight"
                label={<Text screenreader>Select Row {id}</Text>}
                name={columnKey}
                htmlFor={columnKey}
                checked={selected}
                onChange={() => onSelect?.(id)}
              />
            </ListCol>
          );
        }
        if (key === 'expand') {
          return (
            <ListCol key={columnKey} {...columnProps}>
              <ExpandButton
                ml={8}
                size="small"
                aria-label={`Expand row ${id}`}
                icon={ArrowChevronDownIcon}
                expanded={expanded}
                onClick={() => onExpand?.(id)}
              />
            </ListCol>
          );
        }

        return (
          <ListCol key={`${id}-col-${key}`} {...columnProps}>
            {render ? render(row) : row[key]}
          </ListCol>
        );
      })}
    </ListRow>
  );
}
