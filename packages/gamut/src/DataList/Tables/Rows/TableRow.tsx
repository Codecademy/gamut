import {
  isValidElement,
  memo,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';

import { Box, Text } from '../../..';
import { ListCol, ListRow } from '../../../List';
import { ColProps } from '../../../List/elements';
import { Shimmer } from '../../../Loading/Shimmer';
import { ExpandControl, SelectControl } from '../../Controls';
import { useControlContext } from '../../hooks/useListControls';
import { ColumnConfig, IdentifiableKeys } from '../../types';

export type MarshaledColProps = Partial<Pick<ColProps, 'showOverflow'>>;

interface DataRow {
  <Row, IdKey extends IdentifiableKeys<Row>, RowIds extends Row[IdKey]>(
    props: {
      id: RowIds;
      row: Row;
      columns: ColumnConfig<Row>[];
      selected?: boolean;
      expanded?: boolean;
      loading?: boolean;
    } & MarshaledColProps
  ): ReactElement<any, any>;
}

export const TableRow: DataRow = ({
  id,
  columns,
  row,
  expanded = false,
  selected = false,
  loading = false,
  showOverflow,
}) => {
  const {
    expandable,
    selectable,
    expandedContent,
    onExpand,
    onSelect,
    prefixId,
  } = useControlContext();

  const listColProps = { showOverflow };

  const renderExpandedContent = useCallback(() => {
    return expandedContent?.({
      row,
      onCollapse: () => onExpand({ rowId: id, toggle: true }),
    });
  }, [onExpand, expandedContent, id, row]);

  const numberOfColumns = useMemo(() => {
    return columns.length;
  }, [columns]);

  const listRowProps = expandable
    ? {
        expanded,
        renderExpanded: renderExpandedContent,
      }
    : {};

  return (
    <ListRow
      as="tr"
      numOfColumns={numberOfColumns}
      selectable={selectable}
      {...listRowProps}
    >
      {selectable && (
        <ListCol
          {...listColProps}
          display={{ _: 'flex', xs: 'flex' }}
          size="content"
          type="control"
        >
          <SelectControl
            disabled={loading}
            label={`Select ${id}`}
            name={prefixId(String(id))}
            rowId={String(id)}
            selected={selected}
            onSelect={onSelect}
          />
        </ListCol>
      )}
      {columns.map(({ key, render, size, justify, fill, type }) => {
        const newKey = prefixId(`${id}-col-${String(key)}`);
        const colProps = {
          ...listColProps,
          size,
          justify,
          fill,
          type,
        };

        if (loading) {
          return (
            <ListCol {...colProps} key={newKey}>
              <Shimmer
                minHeight={24}
                height="calc(100% - 1rem)"
                width="calc(100% - 0.5rem)"
              />
            </ListCol>
          );
        }

        return (
          <ListCol {...colProps} key={newKey}>
            {!row ? (
              ''
            ) : render ? (
              render(row)
            ) : typeof row[key] === 'string' || typeof row[key] === 'number' ? (
              <Text
                truncate="ellipsis"
                truncateLines={1}
                textAlign={justify ?? 'left'}
              >
                {row[key]}
              </Text>
            ) : isValidElement(row[key]) ? (
              row[key]
            ) : (
              'Data type error'
            )}
          </ListCol>
        );
      })}
      {expandable && (
        <ListCol {...listColProps} size="content" order={[1000, 'initial']}>
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

export const DataRow = memo(TableRow) as DataRow;
