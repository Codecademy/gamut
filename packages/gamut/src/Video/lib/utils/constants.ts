import { MediaKeyShortcuts } from '@vidstack/react';
import { DefaultLayoutTranslations } from '@vidstack/react/types/vidstack';

export const keyboardShortcuts: MediaKeyShortcuts = {
  togglePaused: 'k Space',
  toggleMuted: 'm',
  toggleFullscreen: 'f',
  togglePictureInPicture: 'i',
  toggleCaptions: 'c',
  seekBackward: 'j J ArrowLeft',
  seekForward: 'l L ArrowRight',
  volumeUp: 'ArrowUp',
  volumeDown: 'ArrowDown',
  speedUp: '>',
  slowDown: '<',
};

export const defaultTranslations: Partial<DefaultLayoutTranslations> = {
  'Seek Backward': 'Back 10 seconds',
  'Enter PiP': 'Enter picture-in-picture',
  'Exit PiP': 'Exit picture-in-picture',
  'Enter Fullscreen': 'Enter fullscreen',
  'Exit Fullscreen': 'Exit fullscreen',
  'Caption Styles': 'Caption styles',
  'Text Background': 'Text background',
  'Closed-Captions On': 'Closed-Captions on',
  'Closed-Captions Off': 'Closed-Captions off',
  'Display Background': 'Display background',
  'Keyboard Animations': 'Keyboard animations',
};
