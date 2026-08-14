import { useCurrentMode } from '@codecademy/gamut-styles';
import { DefaultAudioLayout } from '@vidstack/react/player/layouts/default';
import { DefaultLayoutTranslations } from '@vidstack/react/types/vidstack';

import { customAudioLayoutSlots } from './slotOverrides';
import { defaultTranslations } from './utils/constants';
import { customIcons } from './utils/icons';

export type AudioLayoutProps = {
  controls?: boolean;
  translations?: Partial<DefaultLayoutTranslations>;
};

/**
 * AudioLayout component
 *
 * Renders the audio player's control bar using Vidstack's DefaultAudioLayout with
 * Gamut icons, custom slots, and token-driven theming. Audio has no poster,
 * thumbnails, fullscreen or picture-in-picture (unlike VideoLayout).
 * For more info see: https://vidstack.io/docs/player/components/layouts/default-layout
 */
export const AudioLayout: React.FC<AudioLayoutProps> = ({
  controls,
  translations = {},
}) => {
  const mode = useCurrentMode();

  return (
    <DefaultAudioLayout
      colorScheme={mode}
      hidden={!controls}
      icons={customIcons}
      noAudioGain
      noModal
      slots={customAudioLayoutSlots}
      translations={{
        ...defaultTranslations,
        ...translations,
      }}
    />
  );
};
