export type SidebarWidthProps = {
  openWidth?: number;
};

export type SidebarComponentSideProps = {
  openFrom?: 'left' | 'right';
};

export type SidebarBaseProps = SidebarWidthProps &
  SidebarComponentSideProps & {
    children: React.ReactNode;
    expanded?: boolean;
    testId?: string;
  };

export type SidebarWrapperProps = SidebarWidthProps & SidebarComponentSideProps;

export const transitionDuration = 0.35;
