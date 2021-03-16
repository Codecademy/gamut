import { Column, ColumnSizes, Video } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import React from 'react';

import { MediaProps } from './PageHero';

const Image = styled.img`
  width: 100%;
`;

const RightColumn = styled(Column)<{ hideOnMobile?: boolean }>`
  align-items: center;
  margin-left: 0;
  ${({ hideOnMobile }) => hideOnMobile && 'display: none;'}

  ${mediaQueries.sm} {
    margin-left: 1rem;
    ${({ hideOnMobile }) => hideOnMobile && 'display: grid;'}
  }
`;

export type PageHeroMediaProps = {
  media: MediaProps;
  size: ColumnSizes;
};

export const PageHeroMedia: React.FC<PageHeroMediaProps> = ({
  media,
  size,
}) => {
  switch (media.type) {
    case 'image':
      return (
        <RightColumn size={size} hideOnMobile>
          <Image src={media.src} alt={media.alt} />
        </RightColumn>
      );
    case 'video':
      const videoArgs = omit(media, 'type');
      return (
        <RightColumn size={{ xs: 12, sm: size }}>
          <Video {...videoArgs} />
        </RightColumn>
      );
  }
};
