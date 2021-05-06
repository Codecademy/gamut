import { Column, ColumnProps, Video } from '@codecademy/gamut';
import styled from '@emotion/styled';
import { omit } from 'lodash';
import React from 'react';

import { MediaProps } from './PageHero';

const Image = styled.img`
  width: 100%;
`;

const RightColumn = styled(Column)`
  align-items: center;
`;

export type PageHeroMediaProps = {
  media: MediaProps;
  size: Extract<ColumnProps['size'], number>;
};

export const PageHeroMedia: React.FC<PageHeroMediaProps> = ({
  media,
  size,
}) => {
  switch (media.type) {
    case 'image':
      return (
        <RightColumn
          size={size}
          ml={{ _: 0, sm: 16 }}
          display={{ _: 'none', sm: 'grid' }}
        >
          <Image src={media.src} alt={media.alt} />
        </RightColumn>
      );
    case 'video':
      const videoArgs = omit(media, 'type');
      return (
        <RightColumn size={{ _: 12, sm: size }}>
          <Video {...videoArgs} />
        </RightColumn>
      );
  }
};
