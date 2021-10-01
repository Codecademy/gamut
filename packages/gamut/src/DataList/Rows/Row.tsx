import React, { useCallback } from 'react';

import { ListCol, ListRow } from '../../List';
import { IdentifiableKeys } from '..';
import { ExpandControl, SelectControl } from '../Controls';
import { useControlContext } from '../hooks/useListControls';
import { ColumnConfig } from '../types';

interface DataRowProps<
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends IdentifiableKeys<Row>,
  RowIds extends Row[IdKey]
> {
  id: RowIds;
  row: Row;
  columns: Cols;
  selected?: boolean;
  expanded?: boolean;
}

export function Row<
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends IdentifiableKeys<Row>,
  RowIds extends Row[IdKey]
>({
  id,
  columns,
  row,
  selected,
  expanded,
}: DataRowProps<Row, Cols, IdKey, RowIds>) {
  const {
    expandable,
    selectable,
    expandedContent,
    onExpand,
    onSelect,
    prefixId,
  } = useControlContext();

  const renderExpandedContent = useCallback(() => {
    return expandedContent?.({ row, onCollapse: () => onExpand?.(id) });
  }, [onExpand, expandedContent, id, row]);

  return (
    <ListRow expanded={expanded} renderExpanded={renderExpandedContent}>
      {selectable && (
        <ListCol
          display={{ _: 'flex', xs: 'flex' }}
          size="content"
          type="control"
        >
          <SelectControl
            label={`Select ${id}`}
            name={prefixId(id)}
            onSelect={() => onSelect?.({ rowId: id, toggle: selected })}
            selected={selected}
          />
        </ListCol>
      )}
      {columns.map(({ key, render, size, justify, fill, type }) => {
        const colProps = {
          size,
          justify,
          fill,
          type,
          key: `${id}-col-${key}`,
        };

        return (
          <ListCol {...colProps}>{render ? render(row) : row[key]}</ListCol>
        );
      })}
      {expandable && (
        <ListCol size="content" order={[1000, 'initial']}>
          <ExpandControl id={id} expanded={expanded} onExpand={onExpand} />
        </ListCol>
      )}
    </ListRow>
  );
}

export const DataRow = React.memo(Row);
