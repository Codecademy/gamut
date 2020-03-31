export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
};

export type BannerTypes =
  | 'alert'
  | 'announcement'
  | 'error'
  | 'info'
  | 'success';
