import { AppHeaderItem } from './AppHeaderElements/types';
export declare type FormattedAppHeaderItems = {
    left: AppHeaderItem[];
    right: AppHeaderItem[];
};
export declare type FormattedMobileAppHeaderItems = FormattedAppHeaderItems & {
    mainMenu: AppHeaderItem[];
};
