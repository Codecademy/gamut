import React from 'react';

import { ListCol, ListRow } from '../../List';
import { ExpandControl, SelectControl } from '../Controls';
import { ColumnConfig } from '../types';

interface DataRowProps<
  Rows,
  Cols extends ColumnConfig<Rows>[],
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey]
> {
  id: Ids;
  idPrefix: string;
  row: Rows;
  columns: Cols;
  onSelect?: (id: Ids) => void;
  onExpand?: (id: Ids) => void;
  renderExpanded?: (props: {
    row: Rows;
    onCollapse: () => void;
  }) => React.ReactNode;
  selected?: boolean;
  expanded?: boolean;
}

export function DataRow<
  Rows,
  Cols extends ColumnConfig<Rows>[],
  IdKey extends keyof Rows,
  Ids extends Rows[IdKey]
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
}: DataRowProps<Rows, Cols, IdKey, Ids>) {
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
            <ListCol {...colProps} display={{ _: 'flex', xs: 'flex' }}>
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
          <ListCol {...colProps}>{render ? render(row) : row[key]}</ListCol>
        );
      })}
    </ListRow>
  );
}
