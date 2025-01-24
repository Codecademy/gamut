import {
  DefaultVideoLayoutProps,
  DefaultVideoLayoutSlots,
} from '@vidstack/react/types/vidstack-react';

import { CaptionToggle } from './CaptionToggle';

export const customLayoutSlots:
  | DefaultVideoLayoutSlots
  | DefaultVideoLayoutProps = {
  googleCastButton: null,
  airPlayButton: null,
  pipButton: null,
  settingsMenuStartItems: <CaptionToggle />,
};
