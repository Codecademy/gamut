import { iconMap } from '../deprecated/Icon/iconMap';

export type NotificationIconSettings = {
  backgroundColor?: string;
  color?: string;
};

export type Notification = {
  date: string;
  id: string;
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
  link?: string;
  text: string;
  unread?: boolean;
  campaign: string;
};
