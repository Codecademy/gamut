import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

export type IconButtonProps = SizedButtonProps & {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
};

const ICON_SIZES = {
  small: 12,
  normal: 24,
} as const;

export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, ...props }) => (
  <TextButton {...props}>
    <Icon size={ICON_SIZES[props.size || 'normal']} />
  </TextButton>
);
