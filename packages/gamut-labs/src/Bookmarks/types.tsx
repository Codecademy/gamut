import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

export enum CrossDeviceBookmarksView {
  DESKTOP = 'desktop',
  MOBILE = 'mobile',
}

export type CrossDeviceBookmarkParts = {
  icon: React.ComponentType<GamutIconProps>;
  buttonAriaLabel: string;
  desktop: () => ReactNode;
  mobile: () => ReactNode;
  onEnable: () => void;
};
