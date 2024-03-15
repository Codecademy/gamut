import React from 'react';
import { CrossDeviceItemId, CrossDeviceStateProps } from '../GlobalHeader/types';
import { AppHeaderNotificationSettings, NotificationsRendererProps } from './types';
declare type HeaderNotificationProps = CrossDeviceStateProps & {
    settings: AppHeaderNotificationSettings | undefined;
    Renderer: React.ComponentType<NotificationsRendererProps>;
};
export declare const useHeaderNotifications: ({ settings, Renderer, openCrossDeviceItemId, setOpenCrossDeviceItemId, }: HeaderNotificationProps) => null[] | readonly [{
    readonly id: CrossDeviceItemId.NOTIFICATIONS;
    readonly type: "render-element";
    readonly renderElement: () => JSX.Element;
}, JSX.Element];
export {};
