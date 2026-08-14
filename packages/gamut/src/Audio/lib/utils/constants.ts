import { MediaKeyShortcuts } from '@vidstack/react';
import { DefaultLayoutTranslations } from '@vidstack/react/types/vidstack';

// Audio has no fullscreen or picture-in-picture, so those shortcuts are omitted.
export const keyboardShortcuts: MediaKeyShortcuts = {
  togglePaused: 'k Space',
  toggleMuted: 'm',
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
  'Caption Styles': 'Caption styles',
  'Text Background': 'Text background',
  'Closed-Captions On': 'Closed-Captions on',
  'Closed-Captions Off': 'Closed-Captions off',
  'Display Background': 'Display background',
  'Keyboard Animations': 'Keyboard animations',
};
