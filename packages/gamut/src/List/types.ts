export interface ListProps {
  spacing: 'normal' | 'condensed';
  variant: 'slat' | 'table' | 'bar';
}

export interface ListRowProps extends ListProps {}

export interface ListColProps extends ListProps {}
