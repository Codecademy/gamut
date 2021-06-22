import { ReactElement } from 'react';

export type TabsProps = {
  activeTabIndex?: number;
  children: ReactElement<any, any>[];
  onChange?: () => void;
  className?: string;
  tabSize?: number;
};

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  onTabClick?: () => void;
  tabDisabled?: boolean;
};

export type DerivedPanelProps = Pick<
  TabPanelProps,
  'className' | 'children'
> & {
  index: number;
};

export type TabPanelListProps = Pick<TabsProps, 'children'>;

export type TabListProps = Pick<TabsProps, 'children' | 'tabSize'> & {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
};

export type DerivedTabProps = Pick<
  TabPanelProps,
  'title' | 'onTabClick' | 'tabDisabled'
> &
  Pick<TabsProps, 'tabSize'> & {
    index: number;
    setActiveTabIndex: (index: number) => void;
    activeTabIndex: number;
  };

export type TabProps = Pick<TabPanelProps, 'title'> &
  Pick<TabsProps, 'tabSize'> & {
    isActiveTab: boolean;
    disabled?: boolean;
    onClick: () => void;
  };
