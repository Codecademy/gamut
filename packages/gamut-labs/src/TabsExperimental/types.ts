import { ReactElement } from 'react';

export type TabsProps = {
  children: ReactElement<any, any>[];
  className?: string;
  /**
   * Adds a consistent margin top to individual list items in a tab.
   */
  listItemMT?: number;
};

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export type DerivedPanelProps = TabPanelProps & {
  isActiveTab: boolean;
  listItemMT?: number;
};

export type TabPanelListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  listItemMT?: number;
};

export type TabListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};

export type TabProps = Pick<TabPanelProps, 'title'> & {
  isActiveTab: boolean;
  onClick: () => void;
};
