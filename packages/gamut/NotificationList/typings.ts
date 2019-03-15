import iconMap from '../Icon/iconMap';

export type NotificationIconSettings = {
  fillColor?: string;
  backgroundColor?: string;
}

export type Notification = {
  date: string,
  id: string,
  iconSettings?: NotificationIconSettings,
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string,
  link?: string,
  text: string,
  unread?: boolean,
}

export type NotificationImage = {
  iconSettings?: NotificationIconSettings;
  iconSlug?: keyof typeof iconMap;
  imageUrl?: string;
}