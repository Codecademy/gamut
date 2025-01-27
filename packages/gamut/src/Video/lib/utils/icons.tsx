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

const IconWrapper = (Icon: DefaultLayoutIcon) => (props: any) =>
  <Icon {...props} width={18} height={18} />;

export const customIcons: DefaultLayoutIcons = {
  ...defaultLayoutIcons,
  PlayButton: {
    Play: IconWrapper(PlayIcon as DefaultLayoutIcon),
    Pause: IconWrapper(PauseIcon as DefaultLayoutIcon),
    Replay: IconWrapper(RefreshIcon as DefaultLayoutIcon),
  },
  Menu: {
    ...defaultLayoutIcons.Menu,
    Chapters: IconWrapper(ListIcon as DefaultLayoutIcon),
    Settings: IconWrapper(GearIcon as DefaultLayoutIcon),
  },
  FullscreenButton: {
    Enter: IconWrapper(FullscreenIcon as DefaultLayoutIcon),
    Exit: IconWrapper(MinimizeIcon as DefaultLayoutIcon),
  },
};
