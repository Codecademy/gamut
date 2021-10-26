export interface PrivateListProps {
  scrollable?: boolean;
  spacing?: 'normal' | 'condensed';
  variant?: 'default' | 'table' | 'card';
}

export type PublicListProps<T> = Omit<T, keyof PrivateListProps>;

export type AllListProps<T> = Omit<T, keyof PrivateListProps> &
  PrivateListProps;
