export type AppHeaderTab = {
	id: string;
	image?: string;
  icon?: string;
  text?: string;
	type: "tab";
}

export type AppHeaderItem =
	AppHeaderTab
	| AppHeaderLink
	| AppHeaderButton
	| AppHeaderPopover;



export type AppHeaderLink = AppHeaderTab & {
	href: string;
	onClick: () => void;
	type: "link";
}

export type AppHeaderButton = AppHeaderTab & {
  onClick: () => void;
	type: "button";
}

export type HeaderPopoverItem = {
  id: string;
	text: string;
  href: string;
	type: "popover-item";
};


export type AppHeaderPopover = AppHeaderButton & {
  popover: HeaderPopoverItem[] | (() => React.ReactNode);
	type: "popover";
}

