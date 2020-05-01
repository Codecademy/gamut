export type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type OffsetColumnSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type GapSizes = 'sm' | 'md' | 'lg' | 'xl';

export type ContainerElementProps = {
  /** Class name to add the to root node */
  className?: string;
  /** test id prop to be placed as `data-testid` */
  testId?: string;
};
