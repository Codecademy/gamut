import { PlayIcon } from '@codecademy/gamut-icons';
import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';

import { Box, FlexBox } from '../../Box';

/*
  16:9 by default, but unlike a padding-top ratio box, a height set by the
  consumer (e.g. `height: 100%` via `className`) wins, so the player and the
  provider's own splash fit the consumer's frame instead of overflowing it.
*/
export const VideoFrame = styled(Box)(
  css({
    aspectRatio: '16 / 9',
  })
);

export const ReactVideoPlayer = styled(ReactPlayer)(
  css({
    padding: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    '& :focus-visible': {
      outlineOffset: '3px',
    },
    'video::-webkit-media-controls-panel': {
      backgroundImage: `linear-gradient(
          transparent 15%,
          ${theme.colors['navy-900']} 55%
        )`,
    },
  })
);

const StyledFlexBox = styled(FlexBox)(
  css({
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    color: 'white',
    width: '100%',
    height: '100%',
    opacity: '0.5',
    bg: 'black',
  })
);

export const OverlayPlayButton = ({ videoTitle }: { videoTitle?: string }) => {
  return (
    <StyledFlexBox
      aria-label={`play video${videoTitle ? `: ${videoTitle}` : ''}`}
      role="button"
    >
      <PlayIcon color="white" minHeight="75px" minWidth="75px" />
    </StyledFlexBox>
  );
};
