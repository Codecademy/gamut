import { ReactElement } from 'react';

export type TabsProps = {
  activeTabIndex?: number;
  children: ReactElement<any, any>[];
  onChange: () => void;
  className?: string;
};

export type TabPanelProps = {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  isActiveTab?: boolean;
  onTabClick?: () => void;
};

export type TabListProps = Pick<TabsProps, 'children'> & {
  activeTabIndex: number;
  setActiveTab: (index: number) => void;
};

export type TabProps = {
  title: string;
  isActiveTab: boolean;
  disabled?: boolean;
  onClick: () => void;
};
