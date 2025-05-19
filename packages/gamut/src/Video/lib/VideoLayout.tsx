import { useCurrentMode } from '@codecademy/gamut-styles';
import { DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import {
  DefaultLayoutTranslations,
  ThumbnailSrc,
} from '@vidstack/react/types/vidstack';

import { customLayoutSlots } from './slotOverrides';
import { defaultTranslations } from './utils/constants';
import { customIcons } from './utils/icons';

export type VideoLayoutProps = {
  controls?: boolean;
  thumbnails?: ThumbnailSrc;
  translations?: Partial<DefaultLayoutTranslations>;
};

/**
 * VideoLayout component
 *
 * This component is responsible for rendering the layout of the video player.
 * It uses the DefaultVideoLayout component from the vidstack library and applies
 * custom icons, slots, and other configurations.
 * For more info see: https://vidstack.io/docs/player/components/layouts/default-layout
 */
export const VideoLayout: React.FC<VideoLayoutProps> = ({
  controls,
  thumbnails,
  translations = {},
}) => {
  const mode = useCurrentMode();

  return (
    <DefaultVideoLayout
      colorScheme={mode}
      hidden={!controls}
      icons={customIcons}
      noAudioGain
      noModal
      slots={customLayoutSlots}
      thumbnails={thumbnails}
      translations={{
        ...defaultTranslations,
        ...translations,
      }}
    />
  );
};
