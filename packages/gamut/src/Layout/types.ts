export type ColumnSizes = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type OffsetColumnSizes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type GapTypes = 'rowGap' | 'columnGap';

export type GapSizes = 'sm' | 'md' | 'lg' | 'xl';

export type ResponsiveProperty<T> =
  | T
  | {
      xs: T;
      sm?: T;
      md?: T;
      lg?: T;
    };

export type OptionalResponsiveProperty<T> =
  | T
  | {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
    };

export type ContainerElementProps = {
  className?: string;
  testId?: string;
};
