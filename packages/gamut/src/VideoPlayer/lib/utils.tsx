import { PauseIcon, PlayIcon, RefreshIcon } from '@codecademy/gamut-icons';
import { defaultLayoutIcons, DefaultPlayButtonIcons } from '@vidstack/react/player/layouts/default';

export const customIcons = {
    ...defaultLayoutIcons,
    PlayButton: { 
        Play: PlayIcon as DefaultPlayButtonIcons['Play'],
        Pause: PauseIcon as DefaultPlayButtonIcons['Pause'],
        Replay: RefreshIcon as DefaultPlayButtonIcons['Replay']
    }
} 