import { iconMap } from '../deprecated/Icon/iconMap';

export type NotificationIconSettings = {
  backgroundColor?: string;
  color?: string;
};

export type Notification = {
  campaign: string;
  cta?: string;
  date: string;
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  id: string;
  imageUrl?: string;
  link?: string;
  text: string;
  unread?: boolean;
};
