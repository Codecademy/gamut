import React from 'react';

import { ListCol, ListRow } from '../../List';
import { ExpandControl, SelectControl } from '../Controls';
import { ColumnConfig } from '../types';

interface DataRowProps<
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends keyof Row,
  RowIds extends Row[IdKey]
> {
  id: RowIds;
  idPrefix: string;
  row: Row;
  columns: Cols;
  onSelect?: (id: RowIds) => void;
  onExpand?: (id: RowIds) => void;
  renderExpanded?: (props: {
    row: Row;
    onCollapse: () => void;
  }) => React.ReactNode;
  selected?: boolean;
  expanded?: boolean;
}

export function DataRow<
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends keyof Row,
  RowIds extends Row[IdKey]
>({
  id,
  idPrefix,
  columns,
  row,
  onSelect,
  selected,
  expanded,
  onExpand,
  renderExpanded,
}: DataRowProps<Row, Cols, IdKey, RowIds>) {
  const expandable = renderExpanded && onExpand;

  const renderExpandedContent =
    expandable &&
    (() => renderExpanded({ row, onCollapse: () => onExpand(id) }));

  return (
    <ListRow expanded={expanded} renderExpanded={renderExpandedContent}>
      {columns.map(({ key, render, size, justify, fill, type }) => {
        const colProps = {
          size,
          justify,
          fill,
          type,
          key: `${id}-col-${key}`,
        };

        if (key === 'select') {
          return (
            <ListCol
              {...colProps}
              display={{ _: 'flex', xs: 'flex' }}
              type="control"
            >
              <SelectControl
                label={`Select ${id}`}
                name={`${idPrefix}-${id}`}
                onSelect={() => onSelect?.(id)}
                selected={selected}
              />
            </ListCol>
          );
        }
        if (key === 'expand') {
          return (
            <ListCol {...colProps} order={[1000, 'initial']}>
              <ExpandControl id={id} expanded={expanded} onExpand={onExpand} />
            </ListCol>
          );
        }

        return (
          <ListCol {...colProps} delimiter={type === 'header' && !expanded}>
            {render ? render(row) : row[key]}
          </ListCol>
        );
      })}
    </ListRow>
  );
}
