import { Column, Video } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import React from 'react';

import { MediaProps } from './PageHero';

const RightColumn = styled(Column)`
  margin-left: 1rem;

  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

const VideoColumn = styled(Column)`
  margin-left: 1rem;
`;

const Image = styled.img`
  width: 100%;
`;

const StyledVideo = styled(Video)`
  align-self: center;
`;

export const PageHeroMedia: React.FC<MediaProps> = (media) => {
  if (media.type === 'image') {
    return (
      <RightColumn size={3}>
        <Image src={media.src} alt={media.alt} />
      </RightColumn>
    );
  } else if (media && media.type === 'video') {
    const videoArgs = omit(media, 'type');
    return (
      <VideoColumn size={{ xs: 12, sm: 7 }}>
        <StyledVideo {...videoArgs} />
      </VideoColumn>
    );
  } else return null;
};
