import {
  isValidElement,
  memo,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';

import { Text } from '../../..';
import { ListCol, ListRow } from '../../../List';
import { ColProps } from '../../../List/elements';
import { useListContext } from '../../../List/ListProvider';
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

  const { variant, listType } = useListContext();
  const dataTablePadding = listType === 'table' && variant === 'table';

  const listColProps = { dataTablePadding, showOverflow };

  const controlIndices = useMemo(() => {
    const controlIndices = new Map<number, number>();
    let controlCount = 0;

    columns.forEach((column, index) => {
      if (column.type === 'control') {
        controlIndices.set(index, controlCount);
        controlCount += 1;
      }
    });

    return controlIndices;
  }, [columns]);

  const renderExpandedContent = useCallback(() => {
    return expandedContent?.({
      row,
      onCollapse: () => onExpand({ rowId: id, toggle: true }),
    });
  }, [onExpand, expandedContent, id, row]);

  const listRowProps = expandable
    ? {
        expanded,
        renderExpanded: renderExpandedContent,
      }
    : {};

  return (
    <ListRow as="tr" {...listRowProps}>
      {selectable && (
        <ListCol
          {...listColProps}
          display={{ _: 'flex', c_sm: 'flex' }}
          size="content"
          type="select"
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
      {columns.map(({ key, render, size, justify, fill, type }, index) => {
        let colConfig: {} = {
          gridColumn: undefined,
          gridRow: undefined,
        };
        const newKey = prefixId(`${id}-col-${String(key)}`);
        const colProps = {
          ...listColProps,
          size,
          justify,
          fill,
          type,
        };

        if (type === 'control') {
          const controlIndex = controlIndices.get(index) ?? 0;

          /**
           * Grid equation for filling columns 2-3, row by row:
           *   Column: 2 + (controlIndex % 2) gives us alternating 2, 3, 2, 3...
           *   Row: When selectable, first control fills row 1 (before selected), then continues from row 2
           *        When not selectable: starts at row 1
           */
          const gridCol = 2 + (controlIndex % 2);
          let gridRow;

          if (selectable) {
            gridRow =
              controlIndex === 0 ? 1 : 2 + Math.floor((controlIndex - 1) / 2);
          } else {
            gridRow = 1 + Math.floor(controlIndex / 2);
          }

          colConfig = {
            gridColumn: { _: 'auto', c_base: gridCol, c_sm: 'auto' },
            gridRow,
            type: 'tableControl',
          };
        }

        if (loading) {
          return (
            <ListCol {...colProps} key={newKey}>
              <Shimmer
                height="calc(100% - 1rem)"
                minHeight={24}
                width="calc(100% - 0.5rem)"
              />
            </ListCol>
          );
        }

        return (
          <ListCol {...colProps} key={newKey} {...colConfig}>
            {render ? (
              render(row)
            ) : typeof row[key] === 'string' || typeof row[key] === 'number' ? (
              <Text
                textAlign={justify ?? 'left'}
                truncate="ellipsis"
                truncateLines={1}
              >
                {row[key] as string}
              </Text>
            ) : isValidElement(row[key]) ? (
              (row[key] as ReactElement)
            ) : !row[key] ? (
              ''
            ) : (
              'Invalid data type'
            )}
          </ListCol>
        );
      })}
      {expandable && (
        <ListCol
          {...listColProps}
          order={{ _: 1000, c_sm: 'initial' }}
          type="expandControl"
        >
          <ExpandControl
            disabled={loading}
            expanded={expanded}
            id={id}
            onExpand={onExpand}
          />
        </ListCol>
      )}
    </ListRow>
  );
};

export const DataRow = memo(TableRow) as DataRow;
