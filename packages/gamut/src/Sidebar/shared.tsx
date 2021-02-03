export type SidebarBaseProps = {
  children: React.ReactNode;
  expanded?: boolean;
  openWidth?: number;
  openFrom?: 'left' | 'right';
  testId?: string;
};

export type SidebarWrapperProps = {
  openWidth: number;
};
