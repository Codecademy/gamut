export type AppHeaderItem =
  | AppHeaderLogo
  | AppHeaderProLogo
  | AppHeaderLink
  | AppHeaderButton
  | AppHeaderPopover;

type AppHeaderBase = {
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderLogo = AppHeaderBase & {
  type: 'logo';
};

export type AppHeaderProLogo = AppHeaderBase & {
  type: 'pro-logo';
};

export type AppHeaderLink = AppHeaderBase & {
  href: string;
  type: 'link';
};

export type AppHeaderButton = AppHeaderBase & {
  href: string;
  type: 'button';
};

export type AppHeaderPopover = AppHeaderBase & {
  popover: HeaderPopoverItem[] | (() => React.ReactNode);
  type: 'popover';
};

export type HeaderPopoverItem = {
  id: string;
  text: string;
  href: string;
  type: 'popover-item';
};
