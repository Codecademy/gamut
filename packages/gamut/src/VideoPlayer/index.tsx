import cx from 'classnames';
import * as React from 'react';
import { useState } from 'react';
import { Videojs as VideoJSStyle } from './styles/Videojs';

import { useIsMounted } from '../utils';
// eslint-disable-next-line gamut/no-css-standalone
import styles from './styles/index.module.scss';
import VideoJS from './Videojs';

type VideoPlayerProps = {
  videoUrl: string;
};

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
}) => {
  const [loading, setLoading] = useState(true);
  const isMounted = useIsMounted();
  const playerRef = React.useRef<any>(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: videoUrl,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
    setLoading(false);
  };

  return (
    <>
      <VideoJSStyle />
      <div
        className={cx(styles.videoWrapper, loading && styles.loading)}
      >
        {isMounted ? (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        ) : null}
      </div>
    </>
  );
};
