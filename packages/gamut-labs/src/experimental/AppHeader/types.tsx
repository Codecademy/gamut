export type AppHeaderItem =
  | AppHeaderLogo
  | AppHeaderProLogo
  | AppHeaderLink
  | AppHeaderTextButton
  | AppHeaderFillButton
  | AppHeaderPopover
  | AppHeaderRenderPopover;

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

export type AppHeaderTextButton = AppHeaderBase & {
  href: string;
  type: 'text-button';
};

export type AppHeaderFillButton = AppHeaderBase & {
  href: string;
  type: 'fill-button';
};

export type AppHeaderPopover = AppHeaderBase & {
  popover: HeaderPopoverItem[];
  type: 'popover';
};

export type AppHeaderRenderPopover = AppHeaderBase & {
  popover: () => React.ReactNode;
  type: 'render-popover';
};

export type HeaderPopoverItem = {
  id: string;
  text: string;
  href: string;
  type: 'popover-item';
};
