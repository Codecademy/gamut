type AppHeaderBaseItem = {
  dataTestId?: string;
  id: string;
  text?: string;
};

export type AppHeaderLinkItem = AppHeaderBaseItem & {
  href: string;
  trackingTarget: string;
  type: 'link';
};

export type AppHeaderDropdownItem = AppHeaderBaseItem & {
  popover: AppHeaderLinkItem[];
  trackingTarget: string;
  type: 'dropdown';
};
