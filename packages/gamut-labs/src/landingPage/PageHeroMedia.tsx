import { Column, Video } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import React from 'react';

import { MediaProps } from './PageHero';

const RightColumn = styled(Column)`
  margin-left: 1rem;
  align-content: center;

  @media only screen and (max-width: ${breakpoints.sm}) {
    display: none;
  }
`;

const Image = styled.img`
  align-self: center;
  width: 100%;
`;

const StyledVideo = styled(Video)`
  align-self: center;
`;

export type PageHeroMediaProps = {
  media: MediaProps;
};

export const PageHeroMedia: React.FC<PageHeroMediaProps> = ({ media }) => {
  switch (media.type) {
    case 'image':
      return (
        <RightColumn size={3}>
          <Image src={media.src} alt={media.alt} />
        </RightColumn>
      );
    case 'video':
      const videoArgs = omit(media, 'type');
      return (
        <RightColumn size={5}>
          <StyledVideo {...videoArgs} />
        </RightColumn>
      );
  }
};
