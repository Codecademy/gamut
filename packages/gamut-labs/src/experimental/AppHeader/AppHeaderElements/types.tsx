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
