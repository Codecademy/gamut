import { memo, ReactElement, ReactNode, useCallback } from 'react';

import { Text } from '../..';
import { ListCol, ListRow } from '../../List';
import { ColProps } from '../../List/elements';
import { Shimmer } from '../../Loading/Shimmer';
import { ExpandControl, SelectControl } from '../Controls';
import { useControlContext } from '../hooks/useListControls';
import { ColumnConfig, IdentifiableKeys } from '../types';

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

export const Row: DataRow = ({
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

  console.log('hi', expandedContent);

  const listRowProps = expandedContent
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
            <>
              {render ? (
                render(row)
              ) : typeof row[key] === 'string' ? (
                <Text
                  truncate="ellipsis"
                  truncateLines={1}
                  textAlign={justify ?? 'left'}
                >
                  {row[key] as ReactNode}
                </Text>
              ) : (
                row[key]
              )}
            </>
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

export const DataRow = memo(Row) as DataRow;
