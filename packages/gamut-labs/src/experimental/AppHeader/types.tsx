import {
  AppHeaderItem,
} from './AppHeaderElements/types';

export type FormattedAppHeaderItems = {
  left: AppHeaderItem[];
  right: AppHeaderItem[];
};

export type FormattedMobileAppHeaderItems = FormattedAppHeaderItems & {
  mainMenu: AppHeaderItem[];
};
