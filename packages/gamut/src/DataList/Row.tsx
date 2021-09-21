import React from 'react';

import { Checkbox, ListCol, ListRow, Text } from '..';
import { ExpandCol } from './Columns/ExpandCol';
import { SelectCol } from './Columns/SelectCol';
import { ColumnConfig } from './types';

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
            <SelectCol
              key={columnKey}
              id={id}
              onSelect={onSelect}
              selected={selected}
            />
          );
        }
        if (key === 'expand') {
          return (
            <ExpandCol
              key={columnKey}
              id={id}
              expanded={expanded}
              onExpand={onExpand}
            />
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
