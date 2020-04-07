export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export enum BannerTypes {
  Notice = 'notice',
  Announcement = 'announcement',
  Error = 'error',
  Info = 'info',
  Success = 'success',
}
