import React from 'react';
import ReactDOM from 'react-dom';
import Player from 'video.js/dist/types/player';
import { ControlSettings } from './components/ControlSettings';
import { Videojs as VideoJsStyle } from './styles/Videojs';
import { generatePlayerOptions, initializeEventListeners, initializePlayer } from './utils';

interface VideoJSProps {
  options: any;
  onReady?: (player: any) => void;
}

export const VideoJS: React.FC<VideoJSProps> = ({ options, onReady, ...props }) => {
  const videoRef = React.useRef<HTMLDivElement>(null);
  const playerRef = React.useRef<any>(null);

  const renderCustomSettingsComponent = (player: Player) => {
    const el = document.createElement('div')
    el.className = 'vjs-settings-button'
    const controlBarFullScreen = player?.getChild('controlBar')?.getChild('fullscreenToggle')
    const fullscreenToggle = controlBarFullScreen?.el()
    fullscreenToggle?.insertAdjacentElement('beforebegin', el)
  
    ReactDOM.render(
      <ControlSettings player={player} text='Smith Control Settings' />,
      el
    );
  }

  React.useEffect(() => {
    if (!playerRef.current) {
      const playerOptions = generatePlayerOptions(options)
      const player = playerRef.current = initializePlayer(playerOptions, videoRef, props);
      initializeEventListeners(player, props);
      renderCustomSettingsComponent(player);
    }

    return () => {
      if (playerRef.current && !playerRef.current.isDisposed()) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [options, videoRef]);

  return (
    <>
      <VideoJsStyle />
      <div data-vjs-player style={{ position: 'relative'}}>
        <div ref={videoRef} />
      </div>
    </>
  );
};

export default VideoJS;
