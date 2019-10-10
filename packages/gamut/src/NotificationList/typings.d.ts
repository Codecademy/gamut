import iconMap from '../Icon/iconMap';
export declare type NotificationIconSettings = {
    backgroundColor?: string;
    color?: string;
};
export declare type Notification = {
    date: string;
    id: string;
    iconSettings?: NotificationIconSettings;
    iconSlug?: keyof typeof iconMap;
    imageUrl?: string;
    link?: string;
    text: string;
    unread?: boolean;
};
