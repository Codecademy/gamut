export interface PrivateListProps {
  isOl?: boolean;
  rowBreakpoint?: 'xs' | 'sm' | 'md';
  scrollable?: boolean;
  spacing?: 'normal' | 'condensed' | 'compact';
  variant?: 'default' | 'table' | 'card' | 'block' | 'plain';
}

export type PublicListProps<T> = Omit<T, keyof PrivateListProps>;

export type AllListProps<T> = Omit<T, keyof PrivateListProps> &
  PrivateListProps;
