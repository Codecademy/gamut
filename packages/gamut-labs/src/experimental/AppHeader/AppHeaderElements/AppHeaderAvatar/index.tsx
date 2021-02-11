import { Box } from '@codecademy/gamut';
import React from 'react';

export type AppHeaderAvatarProps = {
  imageUrl: string;
  avatarSize?: number;
};
export const AppHeaderAvatar: React.FC<AppHeaderAvatarProps> = ({
  imageUrl,
  avatarSize = 40,
}) => {
  return (
    <Box borderRadius="100%" overflow="hidden">
      <img
        alt="My Account menu toggle"
        data-testid="avatar"
        width={avatarSize}
        height={avatarSize}
        src={imageUrl}
      />
    </Box>
  );
};
