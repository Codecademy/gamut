import {
  ClosedCaptionDisabledIcon,
  ClosedCaptionIcon,
  FullscreenIcon,
  GearIcon,
  ListIcon,
  MiniAccessibilityIcon,
  MiniCloseCaptioningIcon,
  MiniLiveVideoIcon,
  MinimizeIcon,
  PauseIcon,
  PipExitIcon,
  PipIcon,
  PlayIcon,
  RefreshIcon,
  VolumeControlFullIcon,
  VolumeControlMediumIcon,
  VolumeControlMuteIcon,
} from '@codecademy/gamut-icons';
import {
  DefaultLayoutIcon,
  DefaultLayoutIcons,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';

const IconWrapper = (Icon: DefaultLayoutIcon) => (props: any) =>
  <Icon {...props} height={20} width={20} />;

export const customIcons: DefaultLayoutIcons = {
  ...defaultLayoutIcons,
  PlayButton: {
    Play: PlayIcon as DefaultLayoutIcon,
    Pause: PauseIcon as DefaultLayoutIcon,
    Replay: RefreshIcon as DefaultLayoutIcon,
  },
  MuteButton: {
    Mute: IconWrapper(VolumeControlMuteIcon as DefaultLayoutIcon),
    VolumeHigh: IconWrapper(VolumeControlFullIcon as DefaultLayoutIcon),
    VolumeLow: IconWrapper(VolumeControlMediumIcon as DefaultLayoutIcon),
  },
  CaptionButton: {
    Off: IconWrapper(ClosedCaptionDisabledIcon as DefaultLayoutIcon),
    On: IconWrapper(ClosedCaptionIcon as DefaultLayoutIcon),
  },
  PIPButton: {
    Enter: IconWrapper(PipIcon as DefaultLayoutIcon),
    Exit: IconWrapper(PipExitIcon as DefaultLayoutIcon),
  },
  Menu: {
    ...defaultLayoutIcons.Menu,
    Accessibility: MiniAccessibilityIcon as DefaultLayoutIcon,
    Playback: MiniLiveVideoIcon as DefaultLayoutIcon,
    Captions: MiniCloseCaptioningIcon as DefaultLayoutIcon,
    Chapters: ListIcon as DefaultLayoutIcon,
    Settings: GearIcon as DefaultLayoutIcon,
  },
  FullscreenButton: {
    Enter: FullscreenIcon as DefaultLayoutIcon,
    Exit: MinimizeIcon as DefaultLayoutIcon,
  },
};
