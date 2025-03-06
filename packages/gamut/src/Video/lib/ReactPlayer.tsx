import { PlayIcon } from '@codecademy/gamut-icons';
import { css, theme } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import ReactPlayer from 'react-player';

import { FlexBox } from '../../Box';

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
      role="button"
      aria-label={`play video${videoTitle ? `: ${videoTitle}` : ''}`}
    >
      <PlayIcon minWidth="75px" minHeight="75px" color="white" />
    </StyledFlexBox>
  );
};

/**
 * @remarks ReactPlayer has optional key 'wrapper' that we require for the onReady callback
 */

export type ReactPlayerWithWrapper = ReactPlayer & { wrapper: HTMLElement };
