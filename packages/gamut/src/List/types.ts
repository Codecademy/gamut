export interface PrivateListProps {
  scrollable?: boolean;
  spacing?: 'normal' | 'condensed' | 'compact';
  variant?: 'default' | 'table' | 'card' | 'block' | 'plain';
  rowBreakpoint?: 'xs' | 'sm' | 'md';
}

export type PublicListProps<T> = Omit<T, keyof PrivateListProps>;

export type AllListProps<T> = Omit<T, keyof PrivateListProps> &
  PrivateListProps;
