import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { SizedButtonProps } from './shared';
import { TextButton } from './TextButton';

export type IconButtonProps = React.ComponentProps<typeof TextButton> &
  SizedButtonProps & {
    children?: never;
    icon: React.ComponentType<GamutIconProps>;
  };

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 'normal',
  ...props
}) => {
  return (
    <TextButton size={size} {...props}>
      <Icon size={size === 'small' ? 16 : 24} />
    </TextButton>
  );
};
