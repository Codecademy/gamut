export type BannerCTA = {
  href?: string;
  text: string;
  onClick: () => void;
  disabled?: boolean;
};

export enum BannerTypes {
  Alert = 'alert',
  Announcement = 'announcement',
  Error = 'error',
  Info = 'info',
  Success = 'success',
}
