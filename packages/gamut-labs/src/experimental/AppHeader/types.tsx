export type AppHeaderItem =
  | AppHeaderTab
  | AppHeaderLink
  | AppHeaderButton
  | AppHeaderPopover;

type AppHeaderBase = {
  id: string;
  image?: string;
  icon?: string;
  text?: string;
};

export type AppHeaderTab = AppHeaderBase & {
  type: 'tab';
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
