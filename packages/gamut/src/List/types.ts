import { ListProps } from './List';

export interface PrivateListProps {
  listType?: ListProps['as'];
  rowBreakpoint?: 'xs' | 'sm' | 'md';
  scrollable?: boolean;
  spacing?: 'normal' | 'condensed' | 'compact';
  variant?: 'default' | 'table' | 'card' | 'block' | 'plain';
}

export type PublicListProps<T> = Omit<T, keyof PrivateListProps>;

export type AllListProps<T> = Omit<T, keyof PrivateListProps> &
  PrivateListProps;
