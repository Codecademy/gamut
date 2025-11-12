import {
  DefaultVideoLayoutProps,
  DefaultVideoLayoutSlots,
} from '@vidstack/react/types/vidstack-react';

import { SeekBackwardsButton } from './SeekBackwards';

/**
 * Custom layout slots for the video player
 *
 * This defines custom slots for the DefaultVideoLayout component and
 * overrides certain default slots with custom components or null values.
 * For more info see: https://vidstack.io/docs/player/components/layouts/default-layout/?styling=default-theme#slots
 */
export const customLayoutSlots:
  | DefaultVideoLayoutSlots
  | DefaultVideoLayoutProps = {
  smallLayout: {
    beforeCaptionButton: <SeekBackwardsButton />,
  },
  largeLayout: {
    afterPlayButton: <SeekBackwardsButton />,
  },
  googleCastButton: null,
  airPlayButton: null,
  downloadButton: null,
};
