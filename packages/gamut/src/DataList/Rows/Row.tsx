import React, { ReactElement, useCallback } from 'react';

import { ListCol, ListRow } from '../../List';
import { IdentifiableKeys } from '..';
import { ExpandControl, SelectControl } from '../Controls';
import { useControlContext } from '../hooks/useListControls';
import { ColumnConfig } from '../types';

interface DataRow {
  <Row, IdKey extends IdentifiableKeys<Row>, RowIds extends Row[IdKey]>(props: {
    id: RowIds;
    row: Row;
    columns: ColumnConfig<Row>[];
    selected?: boolean;
    expanded?: boolean;
  }): ReactElement<any, any>;
}

export const Row: DataRow = ({ id, columns, row, expanded, selected }) => {
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
            rowId={id}
            selected={selected}
            onSelect={onSelect}
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
};

export const DataRow = React.memo(Row) as DataRow;
