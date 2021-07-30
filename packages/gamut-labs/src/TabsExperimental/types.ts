import { ReactElement } from 'react';

import { theme } from '../../../gamut-styles/dist';

export type TabsProps = {
  children: ReactElement<any, any>[];
  className?: string;
  /**
   * Adds a consistent margin top to individual list items in a tab.
   */
  listItemMT?: typeof theme.spacing;
};

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

export type DerivedPanelProps = TabPanelProps & {
  isActiveTab: boolean;
  listItemMT?: typeof theme.spacing;
};

export type TabPanelListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  listItemMT?: typeof theme.spacing;
};

export type TabListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};

export type TabProps = Pick<TabPanelProps, 'title'> & {
  isActiveTab: boolean;
  onClick: () => void;
};
