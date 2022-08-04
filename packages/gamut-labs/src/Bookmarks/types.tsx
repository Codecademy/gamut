import { GamutIconProps } from '@codecademy/gamut-icons';
import { ReactNode } from 'react';

export type CrossDeviceBookmarkParts = {
  icon: React.ComponentType<GamutIconProps>;
  buttonAriaLabel: string;
  desktop: () => ReactNode;
  mobile: () => ReactNode;
};
