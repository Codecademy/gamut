import { Box, Video } from '@codecademy/gamut';
import { mediaQueries } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import * as React from 'react';

import { CTA } from './CTA';
import { Description } from './Description';
import { Title } from './Title';
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
    {(title || desc) && (
      <Box mb={32}>
        {title && <Title>{title}</Title>}
        {desc && <Description text={desc} onAnchorClick={onAnchorClick} />}
      </Box>
    )}
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
      <Box mt={32}>
        <CTA href={cta.href} onClick={cta.onClick} buttonType={cta.buttonType}>
          {cta.text}
        </CTA>
      </Box>
    )}
  </div>
);
