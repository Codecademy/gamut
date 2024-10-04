import { PlayIcon } from '@codecademy/gamut-icons';
import { css } from '@codecademy/gamut-styles';
import styled from '@emotion/styled';
import { useState } from 'react';
import * as React from 'react';
import ReactPlayer from 'react-player';

import { Box, FlexBox } from '../Box';
import { useIsMounted } from '../utils';

const ReactVideoPlayer = styled(ReactPlayer)(
  css({
    width: '100% !important',
    height: '100% !important',
    position: 'absolute',
    top: 0,
    left: 0,
    border: 'none',
    padding: 0,
    '&:focus-visible': {
      outlineOffset: '3px',
    },
  })
);

const OverlayPlayButton = ({ videoTitle }: { videoTitle?: string }) => {
  return (
    <FlexBox
      role="button"
      aria-label={`play video${videoTitle ? `: ${videoTitle}` : ''}`}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      color="white"
      width="100%"
      height="100%"
      opacity="0.5"
    >
      <PlayIcon
        width="15%"
        height="26.7%"
        minWidth="75px"
        minHeight="75px"
        color="white"
      />
    </FlexBox>
  );
};

/**
 * @remarks ReactPlayer has optional key 'wrapper' that we require for the onReady callback
 */

export type ReactPlayerWithWrapper = ReactPlayer & { wrapper: HTMLElement };

export type VideoProps = {
  videoUrl: string;
  videoTitle?: string;
  placeholderImage?: string | boolean;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  onReady?: (player: ReactPlayerWithWrapper) => void;
  onPlay?: () => void;
};

export const Video: React.FC<VideoProps> = ({
  videoUrl,
  videoTitle,
  placeholderImage,
  autoplay,
  controls,
  loop,
  muted,
  className,
  onReady,
  onPlay,
}) => {
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();
  return (
    <Box
      position="relative"
      width="100%"
      pt={'56.25%' as any}
      borderRadius="md"
      overflow="hidden"
      // bg={loading ? 'blue-1100'}
    >
      {isMounted ? (
        <ReactVideoPlayer
          className={className}
          url={videoUrl}
          light={placeholderImage}
          title={videoTitle}
          playing={autoplay}
          controls={controls === undefined ? true : controls}
          loop={loop}
          muted={muted}
          playIcon={<OverlayPlayButton videoTitle={videoTitle} />}
          onReady={(player: ReactPlayerWithWrapper) => {
            onReady?.(player);
            setLoading(false);
          }}
          onPlay={onPlay}
        />
      ) : null}
    </Box>
  );
};
