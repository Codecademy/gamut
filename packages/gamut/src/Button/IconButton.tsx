import { GamutIconProps } from '@codecademy/gamut-icons';
import React from 'react';

import { TextButton } from './TextButton';

export type IconButtonProps = {
  children: never;
  icon: React.ComponentType<GamutIconProps>;
};

// Todo: how to compose?
export const IconButton: React.FC<
  IconButtonProps & React.ComponentProps<typeof TextButton>
> = ({ icon: Icon, ...props }) => {
  return (
    <TextButton {...props}>
      <Icon size={24} />
    </TextButton>
  );
};
