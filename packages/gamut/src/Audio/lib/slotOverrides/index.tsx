import {
  DefaultAudioLayoutProps,
  DefaultAudioLayoutSlots,
} from '@vidstack/react/types/vidstack-react';

import { SeekBackwardsButton } from './SeekBackwards';

/**
 * Custom layout slots for the audio player.
 *
 * The audio layout is a single flat control bar (no small/large variants), so
 * slots are set directly. We inject a "back 10s" button before the caption
 * button and remove cast/airplay/download.
 * For more info see: https://vidstack.io/docs/player/components/layouts/default-layout/?styling=default-theme#slots
 */
export const customAudioLayoutSlots:
  | DefaultAudioLayoutSlots
  | DefaultAudioLayoutProps = {
  beforeCaptionButton: <SeekBackwardsButton />,
  googleCastButton: null,
  airPlayButton: null,
  downloadButton: null,
};
