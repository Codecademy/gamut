import VideoJsPlayer from 'video.js/dist/types/player';
function initializeEventListeners(player: VideoJsPlayer, props: any): void {
  let currentTimeSecond: number = 0;
  let previousTimeSecond: number = 0;
  let startPositionSecond: number = 0;

  player.on('play', (event: EventTarget) => {
    props.onPlay && props.onPlay(event, player, player.currentTime() || 0);
  });

  player.on('pause', (event: EventTarget) => {
    props.onPause && props.onPause(event, player, player.currentTime() || 0);
  });

  player.on('waiting', (event: EventTarget) => {
    props.onWaiting && props.onWaiting(event, player, player.currentTime() || 0);
  });
  
  player.on('playing', (event: EventTarget) => {
    props.onPlaying && props.onPlaying(event, player, player.currentTime() || 0);
  });

  player.on('timeupdate', (event: EventTarget) => {
    let temp = player.currentTime() || 0;
    props.onTimeUpdate && props.onTimeUpdate(event, player, temp);
    previousTimeSecond = currentTimeSecond;
    currentTimeSecond = temp;
    if (previousTimeSecond < currentTimeSecond) {
        startPositionSecond = previousTimeSecond;
        previousTimeSecond = currentTimeSecond;
    }
  });

  player.on('seeking', (event: EventTarget) => {
    player.off('timeupdate', () => { });
    player.one('seeked', () => { });
    props.onSeeking && props.onSeeking(event, player, player.currentTime() || 0);
  });

  player.on('seeked', (event: EventTarget) => {
    const completeTimeSecond = player.currentTime() || 0;
    props.onSeeked && props.onSeeked(event, player, startPositionSecond, completeTimeSecond);
  });

  player.on('ended', (event: EventTarget) => {
    props.onEnded && props.onEnded(event, player);
  });

  player.on('error', (event: MediaError) => {
    props.onError && props.onError(event, player);
  });

  player.on('loadeddata', (event: EventTarget) => {
    props.onLoadedData && props.onLoadedData(event, player);
  });

  player.on('loadedmetadata', (event: EventTarget) => {
    props.onLoadedMetadata && props.onLoadedMetadata(event, player);
  });
}

export default initializeEventListeners;
