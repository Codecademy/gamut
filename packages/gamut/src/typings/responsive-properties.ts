export type OptionalShape<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
};

export type RequiredShape<T> = {
  xs: T;
  sm?: T;
  md?: T;
  lg?: T;
};

export type ResponsiveProperty<T> = T | RequiredShape<T>;

export type OptionalResponsiveProperty<T> = T | OptionalShape<T>;
