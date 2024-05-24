import { GamutIconProps } from '@codecademy/gamut-icons';

export interface WithChildrenProp {
  children?: React.ReactNode | React.ReactNode[];
}

export type IconComponentType = { icon: React.ComponentType<GamutIconProps> };
