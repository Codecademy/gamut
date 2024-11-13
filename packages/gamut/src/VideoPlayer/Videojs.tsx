import React from 'react';
import videojs from 'video.js';

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
}

export const VideoJS: React.FC<VideoJSProps> = ({ options, onReady }) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');

      videoElement.classList.add(
        'vjs-big-play-centered',
        'vjs-default-skin',
        'vjs-theme-city'
      );
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          width: '100%',
          aspectratio: '16:9',
          controls: true,
          fill: true,
          responsive: true,
          techOrder: ['html5'],
          playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0],
          html5: {
            preloadTextTracks: false,
          },
          playsinline: true,
          controlBar: {
            pictureInPictureToggle: false,
            fullscreenToggle: true,
            skipButtons: {
              backward: 10,
            },
            volumePanel: { inline: false },
            children: [
              'playToggle',
              'skipBackward',
              'currentTimeDisplay',
              'timeDivider',
              'durationDisplay',
              'progressControl',
              'customControlSpacer',
              'playbackRateMenuButton',
              'chaptersButton',
              'descriptionsButton',
              'subsCapsButton',
              'audioTrackButton',
              'volumePanel',
              'fullscreenToggle',
            ],
          },
        },
        () => {
          videojs.log('player is ready', player);
          onReady?.(player);
        }
      ));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay || false);
      player.src(options.sources || []);
    }
  }, [options, videoRef, onReady]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
