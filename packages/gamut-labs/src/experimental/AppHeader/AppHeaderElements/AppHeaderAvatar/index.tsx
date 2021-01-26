import styled from '@emotion/styled';
import React from 'react';

const AvatarContainer = styled.div`
  overflow: hidden;
  line-height: 0;
  border-radius: 100%;
  width: 2.5rem;
  height: 2.5rem;
`;

const AvatarImage = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

export type AppHeaderAvatarProps = {
  imageUrl?: string;
};

export const AppHeaderAvatar: React.FC<AppHeaderAvatarProps> = ({
  imageUrl,
}) => {
  return (
    <AvatarContainer>
      <AvatarImage
        alt="Avatar"
        data-testid="avatar"
        aria-label="my account dropdown toggle"
        src={imageUrl}
      />
    </AvatarContainer>
  );
};
