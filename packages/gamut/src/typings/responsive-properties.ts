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
