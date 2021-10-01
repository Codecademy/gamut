import React, { useCallback } from 'react';

import { ListCol, ListRow } from '../../List';
import { IdentifiableKeys } from '..';
import { ExpandControl, SelectControl } from '../Controls';
import { ColumnConfig } from '../types';

interface DataRowProps<
  Row,
  Cols extends ColumnConfig<Row>[],
  IdKey extends IdentifiableKeys<Row>,
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
  IdKey extends IdentifiableKeys<Row>,
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
  const renderExpandedContent = useCallback(() => {
    return renderExpanded?.({ row, onCollapse: () => onExpand?.(id) });
  }, [onExpand, renderExpanded, id, row]);

  return (
    <ListRow expanded={expanded} renderExpanded={renderExpandedContent}>
      {onSelect && (
        <ListCol
          display={{ _: 'flex', xs: 'flex' }}
          size="content"
          type="control"
        >
          <SelectControl
            label={`Select ${id}`}
            name={`${idPrefix}-${id}`}
            onSelect={() => onSelect?.(id)}
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
      {onExpand && (
        <ListCol size="content" order={[1000, 'initial']}>
          <ExpandControl id={id} expanded={expanded} onExpand={onExpand} />
        </ListCol>
      )}
    </ListRow>
  );
}
