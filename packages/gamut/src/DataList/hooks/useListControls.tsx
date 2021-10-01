import { kebabCase } from 'lodash';
import { createContext, useCallback, useContext, useMemo } from 'react';

import {
  ColumnConfig,
  DataListControls,
  ExpandRow,
  IdentifiableKeys,
  OnFilter,
  OnSort,
  RowChange,
} from '..';

export function useListControls<
  Row,
  IdKey extends IdentifiableKeys<Row>,
  Cols extends ColumnConfig<Row>[]
>({
  idKey,
  id,
  onQueryChange,
  onRowExpand,
  onRowSelect,
  expandedContent,
}: DataListControls<Row, IdKey, Cols>) {
  const expandable = !!onRowExpand && !!expandedContent;
  const selectable = !!onRowSelect;

  const prefixId = useCallback(
    <T extends keyof any>(affix: T) => `${id}-${kebabCase(`${affix}`)}`,
    [id]
  );

  const onSelect: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowSelect?.({
        type: 'select',
        payload,
      });
    },
    [onRowSelect]
  );

  const onSelectAll: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowSelect?.({
        type: 'select-all',
        payload,
      });
    },
    [onRowSelect]
  );

  const onExpand: RowChange<Row[IdKey]> = useCallback(
    (payload) => {
      onRowExpand?.({
        type: 'expand',
        payload,
      });
    },
    [onRowExpand]
  );

  const onSort: OnSort<Row> = useCallback(
    (payload) => {
      onQueryChange?.({
        type: 'sort',
        payload,
      });
    },
    [onQueryChange]
  );

  const onFilter: OnFilter<Row> = useCallback(
    (payload) => {
      onQueryChange?.({
        type: 'filter',
        payload,
      });
    },
    [onQueryChange]
  );

  return useMemo(
    () => ({
      idKey,
      prefixId,
      onSelectAll,
      onSelect,
      onExpand,
      onFilter,
      onSort,
      expandedContent,
      expandable,
      selectable,
    }),
    [
      idKey,
      prefixId,
      onSelectAll,
      onSelect,
      onExpand,
      onFilter,
      onSort,
      expandedContent,
      expandable,
      selectable,
    ]
  );
}

interface Controls {
  idKey: any;
  expandedContent?: ExpandRow<any>;
  prefixId: <T extends keyof any>(affix: T) => string;
  onFilter: OnFilter<any>;
  onSort: OnSort<any>;
  onSelect: RowChange<any>;
  onSelectAll: RowChange<any>;
  onExpand: RowChange<any>;
  expandable: boolean;
  selectable: boolean;
}

export const ListControlContext = createContext<Controls>({} as Controls);

export const useControlContext = () => {
  return useContext(ListControlContext);
};
