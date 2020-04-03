export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
};

export enum BannerTypes {
  Alert = 'alert',
  Announcement = 'announcement',
  Error = 'error',
  Info = 'info',
  Success = 'success',
}
