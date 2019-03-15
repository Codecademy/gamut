import iconMap from '../Icon/iconMap';

export interface NotificationIconSettings {
  fillColor: string;
  backgroundColor: string;
}

export interface Notification {
  date: string,
  id: string,
  imageUrl?: string,
  iconSettings?: NotificationIconSettings,
  iconSlug?: keyof typeof iconMap;
  link?: string,
  text: string,
  unread?: boolean,
}