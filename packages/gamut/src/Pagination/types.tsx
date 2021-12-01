import { filterType } from 'util/types';

export type PaginationProps = {
  filters?: {
    [key: string]: filterType;
  };
  updateFilters?: (key: string, value: filterType) => void;
  total?: number;
  pageCount?: number;
  perPage?: number;
  dataLoading?: boolean;
  pageFilter?: string;
};

export type ClickableNumberProps = {
  value: number;
  shouldRender?: boolean;
  isCurrent?: boolean;
  updateFilters: (key: string, value: filterType) => void;
};

export type PageTotalProps = {
  total?: number;
  pageMax?: number;
  initial: number;
};
