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
> = ({ icon: Icon, size, ...props }) => {
  return (
    <TextButton size={size === 'normal' ? 'normal-condensed' : size} {...props}>
      <Icon
        size={size === 'small' ? 14 : 24}
        style={{ padding: size === 'small' ? '1px' : 0 }}
      />
    </TextButton>
  );
};
