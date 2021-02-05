import { Video } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import React from 'react';

import { CTA, Description, Title } from '.';
import { BaseProps } from './types';

const Grid = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  gap: 8px;

  ${mediaQueries.sm} {
    // there must be a mathematical explanation for why ~12:5 is the correct ratio for
    // the column widths but I do not know what it is. Regardless, the effect is that
    // all three videos will maintain a 16:9 aspect ratio with an even gap between them.
    grid-template: 1fr 1fr / 12fr 5fr;

    gap: 16px;
  }
  ${mediaQueries.md} {
    gap: 24px;
  }
  ${mediaQueries.lg} {
    gap: 32px;
  }
`;

const GridVideo = styled(Video)`
  ${mediaQueries.sm} {
    &:first-of-type {
      grid-row: 1 / span 2;
    }
  }
`;

const StyledDesc = styled(Description)`
  margin-bottom: 2rem;
`;

export type PageVideo = {
  url: string;
  title: string;
  placeholderImage?: string;
};

export type PageVideoGalleryProps = BaseProps & {
  videos: PageVideo[];
};

export const PageVideoGallery: React.FC<PageVideoGalleryProps> = ({
  videos,
  title,
  desc,
  onAnchorClick,
  cta,
  testId,
}) => (
  <div>
    {title && <Title isPageHeading>{title}</Title>}
    {desc && <StyledDesc text={desc} onAnchorClick={onAnchorClick} />}
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
    {cta && (
      <CTA href={cta.href} onCtaButtonClick={cta.onClick}>
        {cta.text}
      </CTA>
    )}
  </div>
);
