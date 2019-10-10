/// <reference types="react" />
import { NotificationIconSettings } from './typings';
import iconMap from '../Icon/iconMap';
declare type NotificationImage = {
    iconSettings?: NotificationIconSettings;
    iconSlug?: keyof typeof iconMap;
    imageUrl?: string;
};
declare const NotificationIcon: (props: NotificationImage) => JSX.Element;
export default NotificationIcon;
