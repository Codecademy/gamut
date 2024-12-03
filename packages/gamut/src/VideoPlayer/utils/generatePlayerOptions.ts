const DEFAULT_PLAYER_OPTIONS = {
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
}

function generatePlayerOptions(options: any) {
  const playerOptions = {
    ...DEFAULT_PLAYER_OPTIONS,
    ...options,
  };

  return playerOptions;
}

export default generatePlayerOptions;
