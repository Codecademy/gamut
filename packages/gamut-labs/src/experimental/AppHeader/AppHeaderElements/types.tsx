type AppHeaderBaseItem = {
  dataTestId?: string;
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderLogoItem = AppHeaderBaseItem & {
  href: string;
  pro: boolean;
  trackingTarget: string;
  type: 'logo';
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
