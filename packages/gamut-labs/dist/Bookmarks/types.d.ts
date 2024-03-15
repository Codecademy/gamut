import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';
export declare enum CrossDeviceBookmarksView {
    DESKTOP = "desktop",
    MOBILE = "mobile"
}
export declare type CrossDeviceBookmarkParts = {
    icon: React.ComponentType<GamutIconProps>;
    buttonAriaLabel: string;
    desktop: () => ReactNode;
    mobile: () => ReactNode;
    onEnable: () => void;
};
