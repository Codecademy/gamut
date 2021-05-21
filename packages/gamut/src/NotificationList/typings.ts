export type NotificationIconSettings = {
  backgroundColor?: string;
  color?: string;
};

export type Notification = {
  date: string;
  id: string;
  iconSettings?: NotificationIconSettings;
  iconSlug?: string;
  imageUrl?: string;
  link?: string;
  text: string;
  type?: string;
  unread?: boolean;
  campaign: string;
};
