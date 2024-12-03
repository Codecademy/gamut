import videojs from 'video.js';
import VideoJsPlayer from 'video.js/dist/types/player';

function initializePlayer(playerOptions: any, videoRef: React.RefObject<HTMLDivElement>, props: any): VideoJsPlayer {
  const videoElement = document.createElement('video-js');
  videoRef.current?.appendChild(videoElement);

  const player = videojs(
    videoElement,
    playerOptions,
    () => {
      props?.onReady?.(player);
    }
  );

  // Initialization of src and poster if exists
  const videoSrc = playerOptions.src;
  const videoPoster = playerOptions.poster;
  videoSrc && player.src(videoSrc);
  videoPoster && player.poster(videoPoster);

  return player;
}

export default initializePlayer;
