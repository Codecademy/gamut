import {
  AirPlayButtonInstance,
  AudioGainSliderInstance,
  CaptionButtonInstance,
  CaptionsInstance,
  ControlsGroupInstance,
  ControlsInstance,
  FullscreenButtonInstance,
  GestureInstance,
  GoogleCastButtonInstance,
  IS_SERVER,
  LiveButtonInstance,
  MediaAnnouncerInstance,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  Primitive,
  QualitySliderInstance,
  RadioGroupInstance,
  RadioInstance,
  SeekButtonInstance,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  SpeedSliderInstance,
  ThumbnailInstance,
  TimeInstance,
  TimeSliderInstance,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  VolumeSliderInstance,
  formatSpokenTime,
  formatTime,
  isTrackCaptionKind,
  mediaContext,
  mediaState,
  useMediaState,
  useSliderState,
  watchActiveTextTrack,
} from './chunk-AB3KZNRI.js';
import {
  EventsController,
  composeRefs,
  computed,
  createReactComponent,
  effect,
  isString,
  listenEvent,
  noop,
  scoped,
  signal,
  useReactContext,
  useReactScope,
  useSignal,
  useStateContext,
} from './chunk-KJZMXNFV.js';
import { require_react_dom } from './chunk-FO7RYXPS.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-Xovmcdt1.js
var React = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);
function useMediaContext() {
  return useReactContext(mediaContext);
}
var AirPlayButtonBridge = createReactComponent(AirPlayButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var AirPlayButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(AirPlayButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
AirPlayButton.displayName = 'AirPlayButton';
var PlayButtonBridge = createReactComponent(PlayButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var PlayButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(PlayButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
PlayButton.displayName = 'PlayButton';
var CaptionButtonBridge = createReactComponent(CaptionButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var CaptionButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(CaptionButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
CaptionButton.displayName = 'CaptionButton';
var FullscreenButtonBridge = createReactComponent(FullscreenButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var FullscreenButton = React.forwardRef(
  ({ children, ...props }, forwardRef4) => {
    return React.createElement(FullscreenButtonBridge, { ...props }, (props2) =>
      React.createElement(
        Primitive.button,
        {
          ...props2,
          ref: composeRefs(props2.ref, forwardRef4),
        },
        children
      )
    );
  }
);
FullscreenButton.displayName = 'FullscreenButton';
var MuteButtonBridge = createReactComponent(MuteButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var MuteButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(MuteButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
MuteButton.displayName = 'MuteButton';
var PIPButtonBridge = createReactComponent(PIPButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var PIPButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(PIPButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
PIPButton.displayName = 'PIPButton';
var SeekButtonBridge = createReactComponent(SeekButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var SeekButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(SeekButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
SeekButton.displayName = 'SeekButton';
var LiveButtonBridge = createReactComponent(LiveButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var LiveButton = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(LiveButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
LiveButton.displayName = 'LiveButton';
var sliderCallbacks = [
  'onDragStart',
  'onDragEnd',
  'onDragValueChange',
  'onValueChange',
  'onPointerValueChange',
];
var SliderValueBridge = createReactComponent(SliderValueInstance);
var SliderBridge = createReactComponent(SliderInstance, {
  events: sliderCallbacks,
});
var Root$5 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    SliderBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$5.displayName = 'Slider';
var Thumb = React.forwardRef((props, forwardRef4) =>
  React.createElement(Primitive.div, { ...props, ref: forwardRef4 })
);
Thumb.displayName = 'SliderThumb';
var Track = React.forwardRef((props, forwardRef4) =>
  React.createElement(Primitive.div, { ...props, ref: forwardRef4 })
);
Track.displayName = 'SliderTrack';
var TrackFill = React.forwardRef((props, forwardRef4) =>
  React.createElement(Primitive.div, { ...props, ref: forwardRef4 })
);
TrackFill.displayName = 'SliderTrackFill';
var PreviewBridge = createReactComponent(SliderPreviewInstance);
var Preview = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(PreviewBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Preview.displayName = 'SliderPreview';
var Value = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    SliderValueBridge,
    { ...props },
    (props2, instance) => {
      const $text = useSignal(() => instance.getValueText(), instance);
      return React.createElement(
        Primitive.div,
        { ...props2, ref: forwardRef4 },
        $text,
        children
      );
    }
  );
});
Value.displayName = 'SliderValue';
var Steps = React.forwardRef(({ children, ...props }, forwardRef4) => {
  const $min = useSliderState('min'),
    $max = useSliderState('max'),
    $step = useSliderState('step'),
    steps = ($max - $min) / $step;
  return React.createElement(
    Primitive.div,
    { ...props, ref: forwardRef4 },
    Array.from({ length: Math.floor(steps) + 1 }).map((_, step) =>
      children(step)
    )
  );
});
Steps.displayName = 'SliderSteps';
var slider = Object.freeze({
  __proto__: null,
  Preview,
  Root: Root$5,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
});
var VolumeSliderBridge = createReactComponent(VolumeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/,
});
var Root$4 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    VolumeSliderBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$4.displayName = 'VolumeSlider';
var volumeSlider = Object.freeze({
  __proto__: null,
  Preview,
  Root: Root$4,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
});
function createVTTCue(startTime = 0, endTime = 0, text = '') {
  if (IS_SERVER) {
    return {
      startTime,
      endTime,
      text,
      addEventListener: noop,
      removeEventListener: noop,
      dispatchEvent: noop,
    };
  }
  return new window.VTTCue(startTime, endTime, text);
}
function appendParamsToURL(baseUrl, params) {
  const url = new URL(baseUrl);
  for (const key of Object.keys(params)) {
    url.searchParams.set(key, params[key] + '');
  }
  return url.toString();
}
var ThumbnailBridge = createReactComponent(ThumbnailInstance);
var Root$3 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(ThumbnailBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Root$3.displayName = 'Thumbnail';
var Img = React.forwardRef(({ children, ...props }, forwardRef4) => {
  const { src, img, crossOrigin } = useStateContext(ThumbnailInstance.state),
    $src = useSignal(src),
    $crossOrigin = useSignal(crossOrigin);
  return React.createElement(
    Primitive.img,
    {
      crossOrigin: $crossOrigin,
      ...props,
      src: $src || void 0,
      ref: composeRefs(img.set, forwardRef4),
    },
    children
  );
});
Img.displayName = 'ThumbnailImg';
var thumbnail = Object.freeze({
  __proto__: null,
  Img,
  Root: Root$3,
});
var TimeSliderContext = React.createContext({
  $chapters: signal(null),
});
TimeSliderContext.displayName = 'TimeSliderContext';
var TimeSliderBridge = createReactComponent(TimeSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/,
});
var Root$2 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  const $chapters = React.useMemo(() => signal(null), []);
  return React.createElement(
    TimeSliderContext.Provider,
    { value: { $chapters } },
    React.createElement(
      TimeSliderBridge,
      { ...props, ref: forwardRef4 },
      (props2) => React.createElement(Primitive.div, { ...props2 }, children)
    )
  );
});
Root$2.displayName = 'TimeSlider';
var SliderChaptersBridge = createReactComponent(SliderChaptersInstance);
var Chapters = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    SliderChaptersBridge,
    { ...props },
    (props2, instance) =>
      React.createElement(
        Primitive.div,
        {
          ...props2,
          ref: composeRefs(props2.ref, forwardRef4),
        },
        React.createElement(ChapterTracks, { instance }, children)
      )
  );
});
Chapters.displayName = 'SliderChapters';
function ChapterTracks({ instance, children }) {
  const $cues = useSignal(() => instance.cues, instance),
    refs = React.useRef([]),
    emptyCue = React.useRef(),
    { $chapters } = React.useContext(TimeSliderContext);
  if (!emptyCue.current) {
    emptyCue.current = createVTTCue();
  }
  React.useEffect(() => {
    $chapters.set(instance);
    return () => void $chapters.set(null);
  }, [instance]);
  React.useEffect(() => {
    instance.setRefs(refs.current);
  }, [$cues]);
  return children($cues.length ? $cues : [emptyCue.current], (el) => {
    if (!el) {
      refs.current.length = 0;
      return;
    }
    refs.current.push(el);
  });
}
ChapterTracks.displayName = 'SliderChapterTracks';
var ChapterTitle = React.forwardRef(({ children, ...props }, forwardRef4) => {
  const { $chapters } = React.useContext(TimeSliderContext),
    [title, setTitle] = React.useState();
  React.useEffect(() => {
    return effect(() => {
      const chapters = $chapters(),
        cue =
          (chapters == null ? void 0 : chapters.activePointerCue) ||
          (chapters == null ? void 0 : chapters.activeCue);
      setTitle((cue == null ? void 0 : cue.text) || '');
    });
  }, []);
  return React.createElement(
    Primitive.div,
    { ...props, ref: forwardRef4 },
    title,
    children
  );
});
ChapterTitle.displayName = 'SliderChapterTitle';
var Progress = React.forwardRef((props, forwardRef4) =>
  React.createElement(Primitive.div, { ...props, ref: forwardRef4 })
);
Progress.displayName = 'SliderProgress';
var SliderThumbnailBridge = createReactComponent(SliderThumbnailInstance);
var ThumbnailRoot = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(SliderThumbnailBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      { ...props2, ref: composeRefs(props2.ref, forwardRef4) },
      children
    )
  );
});
ThumbnailRoot.displayName = 'SliderThumbnail';
var Thumbnail = {
  Root: ThumbnailRoot,
  Img,
};
var VideoBridge = createReactComponent(SliderVideoInstance, {
  events: ['onCanPlay', 'onError'],
});
var Video = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(VideoBridge, { ...props }, (props2, instance) =>
    React.createElement(
      VideoProvider,
      {
        ...props2,
        instance,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Video.displayName = 'SliderVideo';
var VideoProvider = React.forwardRef(
  ({ instance, children, ...props }, forwardRef4) => {
    const { canLoad } = useStateContext(mediaState),
      { src, video, crossOrigin } = instance.$state,
      $src = useSignal(src),
      $canLoad = useSignal(canLoad),
      $crossOrigin = useSignal(crossOrigin);
    return React.createElement(
      Primitive.video,
      {
        style: { maxWidth: 'unset' },
        ...props,
        src: $src || void 0,
        muted: true,
        playsInline: true,
        preload: $canLoad ? 'auto' : 'none',
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(video.set, forwardRef4),
      },
      children
    );
  }
);
VideoProvider.displayName = 'SliderVideoProvider';
var timeSlider = Object.freeze({
  __proto__: null,
  ChapterTitle,
  Chapters,
  Preview,
  Progress,
  Root: Root$2,
  Steps,
  Thumb,
  Thumbnail,
  Track,
  TrackFill,
  Value,
  Video,
});
var RadioGroupBridge = createReactComponent(RadioGroupInstance, {
  events: ['onChange'],
});
var Root$1 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    RadioGroupBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$1.displayName = 'RadioGroup';
var ItemBridge$1 = createReactComponent(RadioInstance, {
  events: ['onChange', 'onSelect'],
});
var Item$1 = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(ItemBridge$1, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Item$1.displayName = 'RadioItem';
var radioGroup = Object.freeze({
  __proto__: null,
  Item: Item$1,
  Root: Root$1,
});
var MenuBridge = createReactComponent(MenuInstance, {
  events: ['onOpen', 'onClose'],
  domEventsRegex: /^onMedia/,
});
var Root = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    MenuBridge,
    { ...props, ref: forwardRef4 },
    (props2, instance) =>
      React.createElement(
        Primitive.div,
        {
          ...props2,
          style: {
            display: !instance.isSubmenu ? 'contents' : void 0,
            ...props2.style,
          },
        },
        children
      )
  );
});
Root.displayName = 'Menu';
var ButtonBridge = createReactComponent(MenuButtonInstance, {
  events: ['onSelect'],
});
var Button = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(ButtonBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Button.displayName = 'MenuButton';
var Portal = React.forwardRef(
  ({ container = null, disabled = false, children, ...props }, forwardRef4) => {
    let fullscreen = useMediaState('fullscreen'),
      shouldPortal = disabled === 'fullscreen' ? !fullscreen : !disabled;
    const target = React.useMemo(() => {
      if (IS_SERVER) return null;
      const node = isString(container)
        ? document.querySelector(container)
        : container;
      return node ?? document.body;
    }, [container]);
    return !target || !shouldPortal
      ? children
      : (0, import_react_dom.createPortal)(
          React.createElement(
            Primitive.div,
            {
              ...props,
              style: { display: 'contents', ...props.style },
              ref: forwardRef4,
            },
            children
          ),
          target
        );
  }
);
Portal.displayName = 'MenuPortal';
var ItemsBridge = createReactComponent(MenuItemsInstance);
var Items = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(ItemsBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Items.displayName = 'MenuItems';
var ItemBridge = createReactComponent(MenuItemInstance);
var Item = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(ItemBridge, { ...props }, (props2) =>
    React.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Item.displayName = 'MenuItem';
var menu = Object.freeze({
  __proto__: null,
  Button,
  Content: Items,
  Item,
  Items,
  Portal,
  Radio: Item$1,
  RadioGroup: Root$1,
  Root,
});
var GestureBridge = createReactComponent(GestureInstance, {
  events: ['onWillTrigger', 'onTrigger'],
});
var Gesture = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(
    GestureBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React.createElement(Primitive.div, { ...props2 }, children)
  );
});
Gesture.displayName = 'Gesture';
var TimeBridge = createReactComponent(TimeInstance);
var Time = React.forwardRef(({ children, ...props }, forwardRef4) => {
  return React.createElement(TimeBridge, { ...props }, (props2, instance) =>
    React.createElement(
      TimeText,
      {
        ...props2,
        instance,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Time.displayName = 'Time';
var TimeText = React.forwardRef(
  ({ instance, children, ...props }, forwardRef4) => {
    const { timeText } = instance.$state,
      $timeText = useSignal(timeText);
    return React.createElement(
      Primitive.div,
      { ...props, ref: forwardRef4 },
      $timeText,
      children
    );
  }
);
TimeText.displayName = 'TimeText';
function useMediaPlayer() {
  const context = useMediaContext();
  if (!context) {
    throw Error(
      '[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?'
    );
  }
  return (context == null ? void 0 : context.player) || null;
}
function useAudioOptions() {
  const media = useMediaContext(),
    { audioTracks, audioTrack } = media.$state,
    $audioTracks = useSignal(audioTracks);
  useSignal(audioTrack);
  return React.useMemo(() => {
    const options = $audioTracks.map((track) => ({
      track,
      label: track.label,
      value: getTrackValue$1(track),
      get selected() {
        return audioTrack() === track;
      },
      select(trigger) {
        const index = audioTracks().indexOf(track);
        if (index >= 0) media.remote.changeAudioTrack(index, trigger);
      },
    }));
    Object.defineProperty(options, 'disabled', {
      get() {
        return options.length <= 1;
      },
    });
    Object.defineProperty(options, 'selectedTrack', {
      get() {
        return audioTrack();
      },
    });
    Object.defineProperty(options, 'selectedValue', {
      get() {
        const track = audioTrack();
        return track ? getTrackValue$1(track) : void 0;
      },
    });
    return options;
  }, [$audioTracks]);
}
function getTrackValue$1(track) {
  return track.label.toLowerCase();
}
function useCaptionOptions({ off = true } = {}) {
  const media = useMediaContext(),
    { textTracks, textTrack } = media.$state,
    $textTracks = useSignal(textTracks);
  useSignal(textTrack);
  return React.useMemo(() => {
    const captionTracks = $textTracks.filter(isTrackCaptionKind),
      options = captionTracks.map((track) => ({
        track,
        label: track.label,
        value: getTrackValue(track),
        get selected() {
          return textTrack() === track;
        },
        select(trigger) {
          const index = textTracks().indexOf(track);
          if (index >= 0)
            media.remote.changeTextTrackMode(index, 'showing', trigger);
        },
      }));
    if (off) {
      options.unshift({
        track: null,
        label: isString(off) ? off : 'Off',
        value: 'off',
        get selected() {
          return !textTrack();
        },
        select(trigger) {
          media.remote.toggleCaptions(trigger);
        },
      });
    }
    Object.defineProperty(options, 'disabled', {
      get() {
        return !captionTracks.length;
      },
    });
    Object.defineProperty(options, 'selectedTrack', {
      get() {
        return textTrack();
      },
    });
    Object.defineProperty(options, 'selectedValue', {
      get() {
        const track = textTrack();
        return track ? getTrackValue(track) : 'off';
      },
    });
    return options;
  }, [$textTracks]);
}
function getTrackValue(track) {
  return track.id + ':' + track.kind + '-' + track.label.toLowerCase();
}

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-BUd8DcBH.js
var React2 = __toESM(require_react(), 1);
var MediaAnnouncerBridge = createReactComponent(MediaAnnouncerInstance, {
  events: ['onChange'],
});
var MediaAnnouncer = React2.forwardRef(
  ({ style, children, ...props }, forwardRef4) => {
    return React2.createElement(MediaAnnouncerBridge, { ...props }, (props2) =>
      React2.createElement(
        Primitive.div,
        {
          ...props2,
          style: { display: 'contents', ...style },
          ref: composeRefs(props2.ref, forwardRef4),
        },
        children
      )
    );
  }
);
MediaAnnouncer.displayName = 'MediaAnnouncer';
var ControlsBridge = createReactComponent(ControlsInstance);
var Root$52 = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(ControlsBridge, { ...props }, (props2) =>
    React2.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Root$52.displayName = 'Controls';
var ControlsGroupBridge = createReactComponent(ControlsGroupInstance);
var Group = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(ControlsGroupBridge, { ...props }, (props2) =>
    React2.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Group.displayName = 'ControlsGroup';
var controls = Object.freeze({
  __proto__: null,
  Group,
  Root: Root$52,
});
var TooltipBridge = createReactComponent(TooltipInstance);
function Root$42({ children, ...props }) {
  return React2.createElement(TooltipBridge, { ...props }, children);
}
Root$42.displayName = 'Tooltip';
var TriggerBridge = createReactComponent(TooltipTriggerInstance);
var Trigger = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(TriggerBridge, { ...props }, (props2) =>
    React2.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Trigger.displayName = 'TooltipTrigger';
var ContentBridge = createReactComponent(TooltipContentInstance);
var Content = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(ContentBridge, { ...props }, (props2) =>
    React2.createElement(
      Primitive.div,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef4),
      },
      children
    )
  );
});
Content.displayName = 'TooltipContent';
var tooltip = Object.freeze({
  __proto__: null,
  Content,
  Root: Root$42,
  Trigger,
});
var GoogleCastButtonBridge = createReactComponent(GoogleCastButtonInstance, {
  domEventsRegex: /^onMedia/,
});
var GoogleCastButton = React2.forwardRef(
  ({ children, ...props }, forwardRef4) => {
    return React2.createElement(
      GoogleCastButtonBridge,
      { ...props },
      (props2) =>
        React2.createElement(
          Primitive.button,
          {
            ...props2,
            ref: composeRefs(props2.ref, forwardRef4),
          },
          children
        )
    );
  }
);
GoogleCastButton.displayName = 'GoogleCastButton';
var QualitySliderBridge = createReactComponent(QualitySliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/,
});
var Root$32 = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(
    QualitySliderBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React2.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$32.displayName = 'QualitySlider';
var qualitySlider = Object.freeze({
  __proto__: null,
  Preview,
  Root: Root$32,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
});
var AudioGainSliderBridge = createReactComponent(AudioGainSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/,
});
var Root$22 = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(
    AudioGainSliderBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React2.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$22.displayName = 'AudioGainSlider';
var audioGainSlider = Object.freeze({
  __proto__: null,
  Preview,
  Root: Root$22,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
});
var SpeedSliderBridge = createReactComponent(SpeedSliderInstance, {
  events: sliderCallbacks,
  domEventsRegex: /^onMedia/,
});
var Root$12 = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(
    SpeedSliderBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React2.createElement(Primitive.div, { ...props2 }, children)
  );
});
Root$12.displayName = 'SpeedSlider';
var speedSlider = Object.freeze({
  __proto__: null,
  Preview,
  Root: Root$12,
  Steps,
  Thumb,
  Track,
  TrackFill,
  Value,
});
var Title = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  const $title = useMediaState('title');
  return React2.createElement(
    Primitive.span,
    { ...props, ref: forwardRef4 },
    $title,
    children
  );
});
Title.displayName = 'Title';
function useActiveTextCues(track) {
  const [activeCues, setActiveCues] = React2.useState([]);
  React2.useEffect(() => {
    if (!track) {
      setActiveCues([]);
      return;
    }
    function onCuesChange() {
      if (track) setActiveCues(track.activeCues);
    }
    onCuesChange();
    return listenEvent(track, 'cue-change', onCuesChange);
  }, [track]);
  return activeCues;
}
function useActiveTextTrack(kind) {
  const media = useMediaContext(),
    [track, setTrack] = React2.useState(null);
  React2.useEffect(() => {
    return watchActiveTextTrack(media.textTracks, kind, setTrack);
  }, [kind]);
  return track;
}
function useChapterTitle() {
  var _a;
  const $track = useActiveTextTrack('chapters'),
    $cues = useActiveTextCues($track);
  return ((_a = $cues[0]) == null ? void 0 : _a.text) || '';
}
var ChapterTitle2 = React2.forwardRef(
  ({ defaultText = '', children, ...props }, forwardRef4) => {
    const $chapterTitle = useChapterTitle();
    return React2.createElement(
      Primitive.span,
      { ...props, ref: forwardRef4 },
      $chapterTitle || defaultText,
      children
    );
  }
);
ChapterTitle2.displayName = 'ChapterTitle';
var CaptionsBridge = createReactComponent(CaptionsInstance);
var Captions = React2.forwardRef(({ children, ...props }, forwardRef4) => {
  return React2.createElement(
    CaptionsBridge,
    { ...props, ref: forwardRef4 },
    (props2) => React2.createElement(Primitive.div, { ...props2 }, children)
  );
});
Captions.displayName = 'Captions';
var Root2 = React2.forwardRef(
  ({ size = 96, children, ...props }, forwardRef4) => {
    return React2.createElement(
      'svg',
      {
        width: size,
        height: size,
        fill: 'none',
        viewBox: '0 0 120 120',
        'aria-hidden': 'true',
        'data-part': 'root',
        ...props,
        ref: forwardRef4,
      },
      children
    );
  }
);
var Track2 = React2.forwardRef(({ width = 8, children, ...props }, ref) =>
  React2.createElement(
    'circle',
    {
      cx: '60',
      cy: '60',
      r: '54',
      stroke: 'currentColor',
      strokeWidth: width,
      'data-part': 'track',
      ...props,
      ref,
    },
    children
  )
);
var TrackFill2 = React2.forwardRef(
  ({ width = 8, fillPercent = 50, children, ...props }, ref) =>
    React2.createElement(
      'circle',
      {
        cx: '60',
        cy: '60',
        r: '54',
        stroke: 'currentColor',
        pathLength: '100',
        strokeWidth: width,
        strokeDasharray: 100,
        strokeDashoffset: 100 - fillPercent,
        'data-part': 'track-fill',
        ...props,
        ref,
      },
      children
    )
);
var spinner = Object.freeze({
  __proto__: null,
  Root: Root2,
  Track: Track2,
  TrackFill: TrackFill2,
});
function createSignal(initialValue, deps = []) {
  const scope = useReactScope();
  return React2.useMemo(
    () => scoped(() => signal(initialValue), scope),
    [scope, ...deps]
  );
}
function createComputed(compute, deps = []) {
  const scope = useReactScope();
  return React2.useMemo(
    () => scoped(() => computed(compute), scope),
    [scope, ...deps]
  );
}
function createEffect(compute, deps = []) {
  const scope = useReactScope();
  React2.useEffect(
    () => scoped(() => effect(compute), scope),
    [scope, ...deps]
  );
}
function useScoped(compute) {
  const scope = useReactScope();
  return React2.useMemo(() => scoped(compute, scope), [scope]);
}
function useTextCues(track) {
  const [cues, setCues] = React2.useState([]);
  React2.useEffect(() => {
    if (!track) return;
    function onCuesChange() {
      if (track) setCues([...track.cues]);
    }
    const events = new EventsController(track)
      .add('add-cue', onCuesChange)
      .add('remove-cue', onCuesChange);
    onCuesChange();
    return () => {
      setCues([]);
      events.abort();
    };
  }, [track]);
  return cues;
}
function useChapterOptions() {
  const media = useMediaContext(),
    track = useActiveTextTrack('chapters'),
    cues = useTextCues(track),
    $startTime = useSignal(media.$state.seekableStart),
    $endTime = useSignal(media.$state.seekableEnd);
  useActiveTextCues(track);
  return React2.useMemo(() => {
    const options = track
      ? cues
          .filter(
            (cue) => cue.startTime <= $endTime && cue.endTime >= $startTime
          )
          .map((cue, i) => {
            let currentRef = null,
              stopProgressEffect;
            return {
              cue,
              label: cue.text,
              value: i.toString(),
              startTimeText: formatTime(
                Math.max(0, cue.startTime - $startTime)
              ),
              durationText: formatSpokenTime(
                Math.min($endTime, cue.endTime) -
                  Math.max($startTime, cue.startTime)
              ),
              get selected() {
                return cue === track.activeCues[0];
              },
              setProgressVar(ref) {
                if (!ref || cue !== track.activeCues[0]) {
                  stopProgressEffect == null ? void 0 : stopProgressEffect();
                  stopProgressEffect = void 0;
                  ref == null
                    ? void 0
                    : ref.style.setProperty('--progress', '0%');
                  currentRef = null;
                  return;
                }
                if (currentRef === ref) return;
                currentRef = ref;
                stopProgressEffect == null ? void 0 : stopProgressEffect();
                stopProgressEffect = effect(() => {
                  const { realCurrentTime } = media.$state,
                    time = realCurrentTime(),
                    cueStartTime = Math.max($startTime, cue.startTime),
                    duration = Math.min($endTime, cue.endTime) - cueStartTime,
                    progress =
                      (Math.max(0, time - cueStartTime) / duration) * 100;
                  ref.style.setProperty(
                    '--progress',
                    progress.toFixed(3) + '%'
                  );
                });
              },
              select(trigger) {
                media.remote.seek(cue.startTime - $startTime, trigger);
              },
            };
          })
      : [];
    Object.defineProperty(options, 'selectedValue', {
      get() {
        const index = options.findIndex((option) => option.selected);
        return (index >= 0 ? index : 0).toString();
      },
    });
    return options;
  }, [cues, $startTime, $endTime]);
}

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-CBF7iUqu.js
var React3 = __toESM(require_react(), 1);
var Icon = React3.forwardRef((props, ref) => {
  const { width, height, size = null, paths, ...restProps } = props;
  return React3.createElement('svg', {
    viewBox: '0 0 32 32',
    ...restProps,
    width: width ?? size,
    height: height ?? size,
    fill: 'none',
    'aria-hidden': 'true',
    focusable: 'false',
    xmlns: 'http://www.w3.org/2000/svg',
    ref,
    dangerouslySetInnerHTML: { __html: paths },
  });
});
Icon.displayName = 'VidstackIcon';

export {
  useMediaContext,
  AirPlayButton,
  PlayButton,
  CaptionButton,
  FullscreenButton,
  MuteButton,
  PIPButton,
  SeekButton,
  LiveButton,
  Root$5,
  Thumb,
  Track,
  TrackFill,
  Preview,
  Value,
  Steps,
  slider,
  Root$4,
  volumeSlider,
  appendParamsToURL,
  Root$3,
  Img,
  thumbnail,
  Root$2,
  Chapters,
  ChapterTitle,
  Progress,
  Thumbnail,
  timeSlider,
  Root$1,
  Item$1,
  radioGroup,
  Root,
  Button,
  Portal,
  Items,
  menu,
  Gesture,
  Time,
  useMediaPlayer,
  useAudioOptions,
  useCaptionOptions,
  MediaAnnouncer,
  Root$52,
  Group,
  controls,
  Root$42,
  Trigger,
  Content,
  tooltip,
  GoogleCastButton,
  Root$32,
  qualitySlider,
  Root$22,
  audioGainSlider,
  Root$12,
  speedSlider,
  Title,
  useActiveTextCues,
  useActiveTextTrack,
  useChapterTitle,
  ChapterTitle2,
  Captions,
  Root2,
  Track2,
  TrackFill2,
  spinner,
  createSignal,
  createComputed,
  createEffect,
  useScoped,
  useTextCues,
  useChapterOptions,
  Icon,
};
//# sourceMappingURL=chunk-TKZ77QYK.js.map
