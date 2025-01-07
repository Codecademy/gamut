import { ViewIcon, ViewOffIcon } from '@codecademy/gamut-icons';
import { useColorModes } from '@codecademy/gamut-styles';
import { useMediaRemote } from '@vidstack/react';
import { DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { ThumbnailSrc } from '@vidstack/react/types/vidstack';

import { IconButton } from '../../Button';
import { customLayoutSlots } from './slots';
import { customIcons } from './utils';

export type VideoLayoutProps = {
    controls?: boolean;
    thumbnails?: ThumbnailSrc;
    adActive: boolean;
    setAdActive: (active: boolean) => void;
  };
  
export const VideoLayout: React.FC<VideoLayoutProps> = ({
    controls = false,
    thumbnails,
    adActive,
    setAdActive,
}) => {
    const playerRemote = useMediaRemote();
    const [mode] = useColorModes();

    return (
        <DefaultVideoLayout
            colorScheme={mode}
            hidden={controls}
            icons={customIcons}
            // smallLayoutWhen={false}
            playbackRates={[0.5, 1, 1.5, 2]}
            thumbnails={thumbnails}
            slots={{
                ...customLayoutSlots,
                beforeSettingsMenu: (
                    <IconButton 
                        mode='dark'
                        icon={adActive ? ViewIcon : ViewOffIcon}
                        tip='Audio Description'
                        onClick={() => {
                            if (adActive) {
                                playerRemote.pause();
                            } else {
                                playerRemote.play();
                            }
                            setAdActive(!adActive)
                        }}
                    />
                )
            }}  
        />
    )
}