import { Video } from '@codecademy/gamut';
import { breakpoints } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

const Grid = styled.div`
  display: grid;
  gap: 32px;

  // there must be a mathematical explanation for why ~12:5 is the correct ratio for
  // the column widths but I do not know what it is. Regardless, the effect is that
  // all three videos will maintain a 16:9 aspect ratio with an even gap between them.
  grid-template: 1fr 1fr / 12fr 5fr;

  @media only screen and (max-width: ${breakpoints.lg}) {
    gap: 24px;
  }
  @media only screen and (max-width: ${breakpoints.md}) {
    gap: 16px;
  }
  @media only screen and (max-width: ${breakpoints.sm}) {
    grid-template: 1fr / 1fr;
    gap: 8px;
  }
`;

const GridVideo = styled(Video)`
  @media only screen and (min-width: ${breakpoints.sm}) {
    &:first-of-type {
      grid-row: 1 / span 2;
    }
  }
`;

export type PageVideo = {
  url: string;
  title: string;
  placeholderImage?: string;
};

export type PageVideoGalleryProps = {
  /**
   * Array of {url, title, placeholderImage}
   */
  videos?: PageVideo[];
  testId?: string;
};

export const PageVideoGallery: React.FC<PageVideoGalleryProps> = ({
  videos = [],
  testId,
}) => (
  <Grid data-testid={testId}>
    {videos.map((video) => (
      <GridVideo
        key={video.url}
        videoUrl={video.url}
        videoTitle={video.title}
        placeholderImage={video.placeholderImage || true}
      />
    ))}
  </Grid>
);
