import { ReactElement } from 'react';

export type TabsProps = {
  children: ReactElement<any, any>[];
  className?: string;
};

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export type DerivedPanelProps = Pick<
  TabPanelProps,
  'className' | 'children'
> & {
  index: number;
};

export type TabPanelListProps = Pick<TabsProps, 'children'>;

export type TabListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};

export type TabProps = Pick<TabPanelProps, 'title'> & {
  isActiveTab: boolean;
  onClick: () => void;
};
