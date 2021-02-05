import { Box } from '@codecademy/gamut';
import styled from '@emotion/styled';
import React from 'react';

const AvatarImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

export type AppHeaderAvatarProps = {
  imageUrl: string;
};

export const AppHeaderAvatar: React.FC<AppHeaderAvatarProps> = ({
  imageUrl,
}) => {
  return (
    <Box borderRadius="100%" overflow="hidden">
      <AvatarImage
        alt="My Account dropdown toggle"
        data-testid="avatar"
        src={imageUrl}
      />
    </Box>
  );
};
