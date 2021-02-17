import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

export type IconButtonProps = SizedButtonProps & {
  children?: never;
  icon: React.ComponentType<GamutIconProps>;
};

export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, size, ...props }) => (
  <TextButton size={size} {...props}>
    <Icon size={size === 'normal' ? 24 : 12} />
  </TextButton>
);
