import React, { ReactElement, useCallback } from 'react';

import { Text } from '../..';
import { ListCol, ListRow } from '../../List';
import { Shimmer } from '../../Loading/Shimmer';
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
    loading?: boolean;
  }): ReactElement<any, any>;
}

export const Row: DataRow = ({
  id,
  columns,
  row,
  expanded = false,
  selected = false,
  loading = false,
}) => {
  const {
    expandable,
    selectable,
    expandedContent,
    onExpand,
    onSelect,
    prefixId,
  } = useControlContext();

  const renderExpandedContent = useCallback(() => {
    return expandedContent?.({
      row,
      onCollapse: () => onExpand({ rowId: id, toggle: true }),
    });
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
            disabled={loading}
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
          key: prefixId(`${id}-col-${key}`),
        };

        if (loading) {
          return (
            <ListCol {...colProps}>
              <Shimmer
                minHeight={24}
                height="calc(100% - 1rem)"
                width="calc(100% - 0.5rem)"
              />
            </ListCol>
          );
        }

        return (
          <ListCol {...colProps}>
            {render ? (
              render(row)
            ) : typeof row[key] === 'string' ? (
              <Text
                truncate="ellipsis"
                truncateLines={1}
                textAlign={justify ?? 'left'}
              >
                {row[key]}
              </Text>
            ) : (
              row[key]
            )}
          </ListCol>
        );
      })}
      {expandable && (
        <ListCol size="content" order={[1000, 'initial']}>
          <ExpandControl
            id={id}
            expanded={expanded}
            onExpand={onExpand}
            disabled={loading}
          />
        </ListCol>
      )}
    </ListRow>
  );
};

export const DataRow = React.memo(Row) as DataRow;
