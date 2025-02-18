import { spacing } from '@codecademy/gamut-styles';

export type HeaderItem<T> = {
  component: React.ComponentType<T>;
  props: T;
  id: string;
  margin?: keyof typeof spacing;
};

export type FloatingHeaderItems = JSX.Element[];

export type FormattedHeaderItems = {
  left: HeaderItem<any>[];
  right: HeaderItem<any>[];
};

export type HeaderProps = {
  items: FormattedHeaderItems;
  floatingItems: FloatingHeaderItems;
};
