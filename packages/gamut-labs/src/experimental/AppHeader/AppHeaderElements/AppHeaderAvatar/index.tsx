import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

export type AppHeaderAvatarProps = {
  imageUrl: string;
  avatarSize?: number;
};

const Avatar = styled.img(
  css({
    alignSelf: 'center',
    borderRadius: '100%',
    border: '2px solid',
    borderColor: 'secondary',
  })
);
export const AppHeaderAvatar: React.FC<AppHeaderAvatarProps> = ({
  imageUrl,
  avatarSize = 40,
}) => {
  return (
    <Avatar
      alt="My Account menu toggle"
      data-testid="avatar"
      width={avatarSize}
      height={avatarSize}
      src={imageUrl}
    />
  );
};
