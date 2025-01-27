import {
  FullscreenIcon,
  GearIcon,
  ListIcon,
  MinimizeIcon,
  PauseIcon,
  PlayIcon,
  RefreshIcon,
} from '@codecademy/gamut-icons';
import {
  DefaultLayoutIcon,
  DefaultLayoutIcons,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

export const customIcons: DefaultLayoutIcons = {
  ...defaultLayoutIcons,
  PlayButton: {
    Play: PlayIcon as DefaultLayoutIcon,
    Pause: PauseIcon as DefaultLayoutIcon,
    Replay: RefreshIcon as DefaultLayoutIcon,
  },
  Menu: {
    ...defaultLayoutIcons.Menu,
    Chapters: ListIcon as DefaultLayoutIcon,
    Settings: GearIcon as DefaultLayoutIcon,
  },
  FullscreenButton: {
    Enter: FullscreenIcon as DefaultLayoutIcon,
    Exit: MinimizeIcon as DefaultLayoutIcon,
  },
};
