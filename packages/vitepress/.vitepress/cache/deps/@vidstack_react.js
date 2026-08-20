'use client';
import {
  AirPlayButton,
  CaptionButton,
  Captions,
  ChapterTitle2 as ChapterTitle,
  FullscreenButton,
  Gesture,
  GoogleCastButton,
  Icon,
  LiveButton,
  MediaAnnouncer,
  MuteButton,
  PIPButton,
  PlayButton,
  SeekButton,
  Time,
  Title,
  audioGainSlider,
  controls,
  createSignal,
  menu,
  qualitySlider,
  radioGroup,
  slider,
  speedSlider,
  spinner,
  thumbnail,
  timeSlider,
  tooltip,
  useActiveTextCues,
  useActiveTextTrack,
  useAudioOptions,
  useCaptionOptions,
  useChapterOptions,
  useChapterTitle,
  useMediaContext as useMediaContext2,
  useMediaPlayer,
  useScoped,
  useTextCues,
  volumeSlider,
} from './chunk-TKZ77QYK.js';
import {
  ARIAKeyShortcuts,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  AirPlayButtonInstance,
  AudioGainSliderInstance,
  AudioProviderLoader,
  AudioTrackList,
  CaptionButtonInstance,
  CaptionsInstance,
  ControlsGroupInstance,
  ControlsInstance,
  DASHProviderLoader,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  FullscreenButtonInstance,
  FullscreenController,
  GestureInstance,
  GoogleCastButtonInstance,
  HLSProviderLoader,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  List,
  LiveButtonInstance,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaAnnouncerInstance,
  MediaControls,
  MediaPlayerInstance,
  MediaProviderInstance,
  MediaRemoteControl,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MenuPortalInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  PosterInstance,
  Primitive,
  QualitySliderInstance,
  RadioGroupController,
  RadioGroupInstance,
  RadioInstance,
  ScreenOrientationController,
  SeekButtonInstance,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  SpeedSliderInstance,
  TextRenderers,
  TextTrack,
  TextTrackList,
  TextTrackSymbol,
  ThumbnailInstance,
  ThumbnailsLoader,
  TimeInstance,
  TimeRange,
  TimeSliderInstance,
  ToggleButtonInstance,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  VolumeSliderInstance,
  YouTubeProviderLoader,
  boundTime,
  canChangeVolume,
  canFullscreen,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  findActiveCue,
  formatSpokenTime,
  formatTime,
  getDownloadFile,
  getTimeRangesEnd,
  getTimeRangesStart,
  isAudioProvider,
  isAudioSrc,
  isCueActive,
  isDASHProvider,
  isDASHSrc,
  isGoogleCastProvider,
  isHLSProvider,
  isHLSSrc,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isMediaStream,
  isRemotionProvider,
  isTrackCaptionKind,
  isVideoProvider,
  isVideoQualitySrc,
  isVideoSrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaContext,
  mediaState,
  menuContext,
  normalizeTimeIntervals,
  parseJSONCaptionsFile,
  sliderState,
  softResetMediaState,
  sortVideoQualities,
  updateSliderPreviewPlacement,
  updateTimeIntervals,
  useMediaContext,
  useMediaState,
  useMediaStore,
  useSliderState,
  useSliderStore,
  watchActiveTextTrack,
  watchCueTextChange,
} from './chunk-AB3KZNRI.js';
import {
  Component,
  DOMEvent,
  EventsController,
  appendTriggerEvent,
  composeRefs,
  createReactComponent,
  effect,
  findTriggerEvent,
  hasProvidedContext,
  hasTriggerEvent,
  isKeyboardClick,
  isKeyboardEvent,
  isPointerEvent,
  isString,
  method,
  prop,
  signal,
  useContext,
  useReactScope,
  useSignal,
  useSignalRecord,
  useStateContext,
  walkTriggerEventChain,
} from './chunk-KJZMXNFV.js';
import './chunk-Y4QXJQIJ.js';
import { require_react_dom } from './chunk-FO7RYXPS.js';
import { require_react } from './chunk-QBXGYTN6.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __toESM,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/vidstack.js
var React2 = __toESM(require_react());

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-C4TlCb-3.js
var React = __toESM(require_react(), 1);
var DEFAULT_PLAYBACK_RATES = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
var _media,
  _menu,
  _controller,
  _SpeedRadioGroup_instances,
  watchValue_fn,
  watchHintText_fn,
  watchControllerDisabled_fn,
  getValue_fn,
  onValueChange_fn;
var SpeedRadioGroup = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _SpeedRadioGroup_instances);
    __privateAdd(this, _media);
    __privateAdd(this, _menu);
    __privateAdd(this, _controller);
    __privateSet(this, _controller, new RadioGroupController());
    __privateGet(this, _controller).onValueChange = __privateMethod(
      this,
      _SpeedRadioGroup_instances,
      onValueChange_fn
    ).bind(this);
  }
  get value() {
    return __privateGet(this, _controller).value;
  }
  get disabled() {
    const { rates } = this.$props,
      { canSetPlaybackRate } = __privateGet(this, _media).$state;
    return !canSetPlaybackRate() || rates().length === 0;
  }
  onSetup() {
    __privateSet(this, _media, useMediaContext());
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _menu, useContext(menuContext));
    }
  }
  onConnect(el) {
    effect(
      __privateMethod(this, _SpeedRadioGroup_instances, watchValue_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SpeedRadioGroup_instances, watchHintText_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(
        this,
        _SpeedRadioGroup_instances,
        watchControllerDisabled_fn
      ).bind(this)
    );
  }
  getOptions() {
    const { rates, normalLabel } = this.$props;
    return rates().map((rate) => ({
      label: rate === 1 ? normalLabel : rate + '×',
      value: rate.toString(),
    }));
  }
};
_media = new WeakMap();
_menu = new WeakMap();
_controller = new WeakMap();
_SpeedRadioGroup_instances = new WeakSet();
watchValue_fn = function () {
  __privateGet(this, _controller).value = __privateMethod(
    this,
    _SpeedRadioGroup_instances,
    getValue_fn
  ).call(this);
};
watchHintText_fn = function () {
  var _a;
  const { normalLabel } = this.$props,
    { playbackRate } = __privateGet(this, _media).$state,
    rate = playbackRate();
  (_a = __privateGet(this, _menu)) == null
    ? void 0
    : _a.hint.set(rate === 1 ? normalLabel() : rate + '×');
};
watchControllerDisabled_fn = function () {
  var _a;
  (_a = __privateGet(this, _menu)) == null ? void 0 : _a.disable(this.disabled);
};
getValue_fn = function () {
  const { playbackRate } = __privateGet(this, _media).$state;
  return playbackRate().toString();
};
onValueChange_fn = function (value, trigger) {
  if (this.disabled) return;
  const rate = +value;
  __privateGet(this, _media).remote.changePlaybackRate(rate, trigger);
  this.dispatch('change', { detail: rate, trigger });
};
__publicField(SpeedRadioGroup, 'props', {
  normalLabel: 'Normal',
  rates: DEFAULT_PLAYBACK_RATES,
});
var speedradiogroup__proto = SpeedRadioGroup.prototype;
prop(speedradiogroup__proto, 'value');
prop(speedradiogroup__proto, 'disabled');
method(speedradiogroup__proto, 'getOptions');
function useMediaRemote(target) {
  const media = useMediaContext2(),
    remote = React.useRef();
  if (!remote.current) {
    remote.current = new MediaRemoteControl();
  }
  React.useEffect(() => {
    const ref = target && 'current' in target ? target.current : target,
      isPlayerRef = ref instanceof MediaPlayerInstance,
      player = isPlayerRef ? ref : media == null ? void 0 : media.player;
    remote.current.setPlayer(player ?? null);
    remote.current.setTarget(ref ?? null);
  }, [media, target && 'current' in target ? target.current : target]);
  return remote.current;
}
function useVideoQualityOptions({ auto = true, sort = 'descending' } = {}) {
  const media = useMediaContext2(),
    { qualities, quality, autoQuality, canSetQuality } = media.$state,
    $qualities = useSignal(qualities);
  useSignal(quality);
  useSignal(autoQuality);
  useSignal(canSetQuality);
  return React.useMemo(() => {
    const sortedQualities = sortVideoQualities(
        $qualities,
        sort === 'descending'
      ),
      options = sortedQualities.map((q) => {
        return {
          quality: q,
          label: q.height + 'p',
          value: getQualityValue(q),
          bitrateText:
            q.bitrate && q.bitrate > 0
              ? `${(q.bitrate / 1e6).toFixed(2)} Mbps`
              : null,
          get selected() {
            return q === quality();
          },
          get autoSelected() {
            return autoQuality();
          },
          select(trigger) {
            const index = qualities().indexOf(q);
            if (index >= 0) media.remote.changeQuality(index, trigger);
          },
        };
      });
    if (auto) {
      options.unshift({
        quality: null,
        label: isString(auto) ? auto : 'Auto',
        value: 'auto',
        bitrateText: null,
        get selected() {
          return autoQuality();
        },
        get autoSelected() {
          return autoQuality();
        },
        select(trigger) {
          media.remote.requestAutoQuality(trigger);
        },
      });
    }
    Object.defineProperty(options, 'disabled', {
      get() {
        return !canSetQuality() || $qualities.length <= 1;
      },
    });
    Object.defineProperty(options, 'selectedQuality', {
      get() {
        return quality();
      },
    });
    Object.defineProperty(options, 'selectedValue', {
      get() {
        const $quality = quality();
        return !autoQuality() && $quality ? getQualityValue($quality) : 'auto';
      },
    });
    return options;
  }, [$qualities, sort]);
}
function getQualityValue(quality) {
  return quality.height + '_' + quality.bitrate;
}
function usePlaybackRateOptions({
  rates = DEFAULT_PLAYBACK_RATES,
  normalLabel = 'Normal',
} = {}) {
  const media = useMediaContext2(),
    { playbackRate, canSetPlaybackRate } = media.$state;
  useSignal(playbackRate);
  useSignal(canSetPlaybackRate);
  return React.useMemo(() => {
    const options = rates.map((opt) => {
      const label =
          typeof opt === 'number'
            ? opt === 1 && normalLabel
              ? normalLabel
              : opt + 'x'
            : opt.label,
        rate = typeof opt === 'number' ? opt : opt.rate;
      return {
        label,
        value: rate.toString(),
        rate,
        get selected() {
          return playbackRate() === rate;
        },
        select(trigger) {
          media.remote.changePlaybackRate(rate, trigger);
        },
      };
    });
    Object.defineProperty(options, 'disabled', {
      get() {
        return !canSetPlaybackRate() || !options.length;
      },
    });
    Object.defineProperty(options, 'selectedValue', {
      get() {
        return playbackRate().toString();
      },
    });
    return options;
  }, [rates]);
}

// ../../node_modules/@vidstack/react/dev/vidstack.js
var import_react_dom = __toESM(require_react_dom());
var _instance, _track, _typeRE, _LibASSTextRenderer_instances, freeTrack_fn;
var LibASSTextRenderer = class {
  constructor(loader, config) {
    __privateAdd(this, _LibASSTextRenderer_instances);
    __publicField(this, 'priority', 1);
    __privateAdd(this, _instance, null);
    __privateAdd(this, _track, null);
    __privateAdd(this, _typeRE, /(ssa|ass)$/);
    this.loader = loader;
    this.config = config;
  }
  canRender(track, video) {
    return (
      !!video &&
      !!track.src &&
      ((isString(track.type) && __privateGet(this, _typeRE).test(track.type)) ||
        __privateGet(this, _typeRE).test(track.src))
    );
  }
  attach(video) {
    if (!video) return;
    this.loader().then(async (mod) => {
      var _a;
      __privateSet(
        this,
        _instance,
        new mod.default({
          ...this.config,
          video,
          subUrl:
            ((_a = __privateGet(this, _track)) == null ? void 0 : _a.src) || '',
        })
      );
      new EventsController(__privateGet(this, _instance))
        .add('ready', () => {
          var _a2;
          const canvas =
            (_a2 = __privateGet(this, _instance)) == null
              ? void 0
              : _a2._canvas;
          if (canvas) canvas.style.pointerEvents = 'none';
        })
        .add('error', (event) => {
          if (!__privateGet(this, _track)) return;
          __privateGet(this, _track)[TextTrackSymbol.readyState] = 3;
          __privateGet(this, _track).dispatchEvent(
            new DOMEvent('error', {
              trigger: event,
              detail: event.error,
            })
          );
        });
    });
  }
  changeTrack(track) {
    var _a;
    if (!track || track.readyState === 3) {
      __privateMethod(this, _LibASSTextRenderer_instances, freeTrack_fn).call(
        this
      );
    } else if (__privateGet(this, _track) !== track) {
      (_a = __privateGet(this, _instance)) == null
        ? void 0
        : _a.setTrackByUrl(track.src);
      __privateSet(this, _track, track);
    }
  }
  detach() {
    __privateMethod(this, _LibASSTextRenderer_instances, freeTrack_fn).call(
      this
    );
  }
};
_instance = new WeakMap();
_track = new WeakMap();
_typeRE = new WeakMap();
_LibASSTextRenderer_instances = new WeakSet();
freeTrack_fn = function () {
  var _a;
  (_a = __privateGet(this, _instance)) == null ? void 0 : _a.freeTrack();
  __privateSet(this, _track, null);
};
var DEFAULT_AUDIO_GAINS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4];
var _media2,
  _menu2,
  _controller2,
  _AudioGainRadioGroup_instances,
  watchValue_fn2,
  watchHintText_fn2,
  watchControllerDisabled_fn2,
  getValue_fn2,
  onValueChange_fn2;
var AudioGainRadioGroup = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _AudioGainRadioGroup_instances);
    __privateAdd(this, _media2);
    __privateAdd(this, _menu2);
    __privateAdd(this, _controller2);
    __privateSet(this, _controller2, new RadioGroupController());
    __privateGet(this, _controller2).onValueChange = __privateMethod(
      this,
      _AudioGainRadioGroup_instances,
      onValueChange_fn2
    ).bind(this);
  }
  get value() {
    return __privateGet(this, _controller2).value;
  }
  get disabled() {
    const { gains } = this.$props,
      { canSetAudioGain } = __privateGet(this, _media2).$state;
    return !canSetAudioGain() || gains().length === 0;
  }
  onSetup() {
    __privateSet(this, _media2, useMediaContext());
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _menu2, useContext(menuContext));
    }
  }
  onConnect(el) {
    effect(
      __privateMethod(
        this,
        _AudioGainRadioGroup_instances,
        watchValue_fn2
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _AudioGainRadioGroup_instances,
        watchHintText_fn2
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _AudioGainRadioGroup_instances,
        watchControllerDisabled_fn2
      ).bind(this)
    );
  }
  getOptions() {
    const { gains, normalLabel } = this.$props;
    return gains().map((gain) => ({
      label:
        gain === 1 || gain === null ? normalLabel : String(gain * 100) + '%',
      value: gain.toString(),
    }));
  }
};
_media2 = new WeakMap();
_menu2 = new WeakMap();
_controller2 = new WeakMap();
_AudioGainRadioGroup_instances = new WeakSet();
watchValue_fn2 = function () {
  __privateGet(this, _controller2).value = __privateMethod(
    this,
    _AudioGainRadioGroup_instances,
    getValue_fn2
  ).call(this);
};
watchHintText_fn2 = function () {
  var _a;
  const { normalLabel } = this.$props,
    { audioGain } = __privateGet(this, _media2).$state,
    gain = audioGain();
  (_a = __privateGet(this, _menu2)) == null
    ? void 0
    : _a.hint.set(
        gain === 1 || gain == null ? normalLabel() : String(gain * 100) + '%'
      );
};
watchControllerDisabled_fn2 = function () {
  var _a;
  (_a = __privateGet(this, _menu2)) == null
    ? void 0
    : _a.disable(this.disabled);
};
getValue_fn2 = function () {
  var _a;
  const { audioGain } = __privateGet(this, _media2).$state;
  return ((_a = audioGain()) == null ? void 0 : _a.toString()) ?? '1';
};
onValueChange_fn2 = function (value, trigger) {
  if (this.disabled) return;
  const gain = +value;
  __privateGet(this, _media2).remote.changeAudioGain(gain, trigger);
  this.dispatch('change', { detail: gain, trigger });
};
__publicField(AudioGainRadioGroup, 'props', {
  normalLabel: 'Disabled',
  gains: DEFAULT_AUDIO_GAINS,
});
var audiogainradiogroup__proto = AudioGainRadioGroup.prototype;
prop(audiogainradiogroup__proto, 'value');
prop(audiogainradiogroup__proto, 'disabled');
method(audiogainradiogroup__proto, 'getOptions');
var playerCallbacks = [
  'onAbort',
  'onAudioTrackChange',
  'onAudioTracksChange',
  'onAutoPlay',
  'onAutoPlayChange',
  'onAutoPlayFail',
  'onCanLoad',
  'onCanPlay',
  'onCanPlayThrough',
  'onControlsChange',
  'onDestroy',
  'onDurationChange',
  'onEmptied',
  'onEnd',
  'onEnded',
  'onError',
  'onFindMediaPlayer',
  'onFullscreenChange',
  'onFullscreenError',
  'onLiveChange',
  'onLiveEdgeChange',
  'onLoadedData',
  'onLoadedMetadata',
  'onLoadStart',
  'onLoopChange',
  'onOrientationChange',
  'onPause',
  'onPictureInPictureChange',
  'onPictureInPictureError',
  'onPlay',
  'onPlayFail',
  'onPlaying',
  'onPlaysInlineChange',
  'onPosterChange',
  'onProgress',
  'onProviderChange',
  'onProviderLoaderChange',
  'onProviderSetup',
  'onQualitiesChange',
  'onQualityChange',
  'onRateChange',
  'onReplay',
  'onSeeked',
  'onSeeking',
  'onSourceChange',
  'onSourceChange',
  'onStalled',
  'onStarted',
  'onStreamTypeChange',
  'onSuspend',
  'onTextTrackChange',
  'onTextTracksChange',
  'onTimeUpdate',
  'onTitleChange',
  'onVdsLog',
  'onVideoPresentationChange',
  'onVolumeChange',
  'onWaiting',
];
var MediaPlayerBridge = createReactComponent(MediaPlayerInstance, {
  events: playerCallbacks,
  eventsRegex: /^onHls/,
  domEventsRegex: /^onMedia/,
});
var MediaPlayer = React2.forwardRef(
  ({ aspectRatio, children, ...props }, forwardRef2) => {
    return React2.createElement(
      MediaPlayerBridge,
      {
        ...props,
        src: props.src,
        ref: forwardRef2,
        style: {
          aspectRatio,
          ...props.style,
        },
      },
      (props2) => React2.createElement(Primitive.div, { ...props2 }, children)
    );
  }
);
MediaPlayer.displayName = 'MediaPlayer';
var MediaProviderBridge = createReactComponent(MediaProviderInstance);
var MediaProvider = React2.forwardRef(
  (
    { loaders = [], children, iframeProps, mediaProps, ...props },
    forwardRef2
  ) => {
    const reactLoaders = React2.useMemo(
      () => loaders.map((Loader) => new Loader()),
      loaders
    );
    return React2.createElement(
      MediaProviderBridge,
      { ...props, loaders: reactLoaders, ref: forwardRef2 },
      (props2, instance) =>
        React2.createElement(
          'div',
          { ...props2 },
          React2.createElement(MediaOutlet, {
            provider: instance,
            mediaProps,
            iframeProps,
          }),
          children
        )
    );
  }
);
MediaProvider.displayName = 'MediaProvider';
function MediaOutlet({ provider, mediaProps, iframeProps }) {
  const {
      sources,
      crossOrigin,
      poster,
      remotePlaybackInfo,
      nativeControls,
      viewType,
    } = useStateContext(mediaState),
    { loader } = provider.$state,
    { $provider: $$provider, $providerSetup: $$providerSetup } =
      useMediaContext2(),
    $sources = useSignal(sources),
    $nativeControls = useSignal(nativeControls),
    $crossOrigin = useSignal(crossOrigin),
    $poster = useSignal(poster),
    $loader = useSignal(loader),
    $provider = useSignal($$provider),
    $providerSetup = useSignal($$providerSetup),
    $remoteInfo = useSignal(remotePlaybackInfo),
    $mediaType = $loader == null ? void 0 : $loader.mediaType(),
    $viewType = useSignal(viewType),
    isAudioView = $viewType === 'audio',
    isYouTubeEmbed = ($loader == null ? void 0 : $loader.name) === 'youtube',
    isVimeoEmbed = ($loader == null ? void 0 : $loader.name) === 'vimeo',
    isEmbed = isYouTubeEmbed || isVimeoEmbed,
    isRemotion = ($loader == null ? void 0 : $loader.name) === 'remotion',
    isGoogleCast = ($loader == null ? void 0 : $loader.name) === 'google-cast',
    [googleCastIconPaths, setGoogleCastIconPaths] = React2.useState(''),
    [hasMounted, setHasMounted] = React2.useState(false);
  React2.useEffect(() => {
    if (!isGoogleCast || googleCastIconPaths) return;
    import('./vidstack-CH225ns1-MWRUKSJ3.js')
      .then(function (n) {
        return n.chromecast;
      })
      .then((mod) => {
        setGoogleCastIconPaths(mod.default);
      });
  }, [isGoogleCast]);
  React2.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (isGoogleCast) {
    return React2.createElement(
      'div',
      {
        className: 'vds-google-cast',
        ref: (el) => {
          provider.load(el);
        },
      },
      React2.createElement(Icon, { paths: googleCastIconPaths }),
      ($remoteInfo == null ? void 0 : $remoteInfo.deviceName)
        ? React2.createElement(
            'span',
            { className: 'vds-google-cast-info' },
            'Google Cast on',
            ' ',
            React2.createElement(
              'span',
              { className: 'vds-google-cast-device-name' },
              $remoteInfo.deviceName
            )
          )
        : null
    );
  }
  if (isRemotion) {
    return React2.createElement(
      'div',
      { 'data-remotion-canvas': true },
      React2.createElement(
        'div',
        {
          'data-remotion-container': true,
          ref: (el) => {
            provider.load(el);
          },
        },
        isRemotionProvider($provider) && $providerSetup
          ? React2.createElement($provider.render)
          : null
      )
    );
  }
  return isEmbed
    ? React2.createElement(
        React2.Fragment,
        null,
        React2.createElement('iframe', {
          ...iframeProps,
          className:
            ((iframeProps == null ? void 0 : iframeProps.className)
              ? `${iframeProps.className} `
              : '') + isYouTubeEmbed
              ? 'vds-youtube'
              : 'vds-vimeo',
          suppressHydrationWarning: true,
          tabIndex: !$nativeControls ? -1 : void 0,
          'aria-hidden': 'true',
          'data-no-controls': !$nativeControls ? '' : void 0,
          ref(el) {
            provider.load(el);
          },
        }),
        !$nativeControls && !isAudioView
          ? React2.createElement('div', { className: 'vds-blocker' })
          : null
      )
    : $mediaType
    ? React2.createElement($mediaType === 'audio' ? 'audio' : 'video', {
        ...mediaProps,
        controls: $nativeControls ? true : null,
        crossOrigin: typeof $crossOrigin === 'boolean' ? '' : $crossOrigin,
        poster:
          $mediaType === 'video' && $nativeControls && $poster ? $poster : null,
        suppressHydrationWarning: true,
        children: !hasMounted
          ? $sources.map(({ src, type }) =>
              isString(src)
                ? React2.createElement('source', {
                    src,
                    type: type !== '?' ? type : void 0,
                    key: src,
                  })
                : null
            )
          : null,
        ref(el) {
          provider.load(el);
        },
      })
    : null;
}
MediaOutlet.displayName = 'MediaOutlet';
function createTextTrack(init) {
  const media = useMediaContext2(),
    track = React2.useMemo(() => new TextTrack(init), Object.values(init));
  React2.useEffect(() => {
    media.textTracks.add(track);
    return () => void media.textTracks.remove(track);
  }, [track]);
  return track;
}
function Track({ lang, ...props }) {
  createTextTrack({ language: lang, ...props });
  return null;
}
Track.displayName = 'Track';
var ToggleButtonBridge = createReactComponent(ToggleButtonInstance);
var ToggleButton = React2.forwardRef(({ children, ...props }, forwardRef2) => {
  return React2.createElement(ToggleButtonBridge, { ...props }, (props2) =>
    React2.createElement(
      Primitive.button,
      {
        ...props2,
        ref: composeRefs(props2.ref, forwardRef2),
      },
      children
    )
  );
});
ToggleButton.displayName = 'ToggleButton';
var PosterBridge = createReactComponent(PosterInstance);
var Poster = React2.forwardRef(({ children, ...props }, forwardRef2) => {
  return React2.createElement(
    PosterBridge,
    {
      src:
        props.asChild && React2.isValidElement(children)
          ? children.props.src
          : void 0,
      ...props,
    },
    (props2, instance) =>
      React2.createElement(
        PosterImg,
        {
          ...props2,
          instance,
          ref: composeRefs(props2.ref, forwardRef2),
        },
        children
      )
  );
});
Poster.displayName = 'Poster';
var PosterImg = React2.forwardRef(
  ({ instance, children, ...props }, forwardRef2) => {
    const { src, img, alt, crossOrigin, hidden } = instance.$state,
      $src = useSignal(src),
      $alt = useSignal(alt),
      $crossOrigin = useSignal(crossOrigin),
      $hidden = useSignal(hidden);
    return React2.createElement(
      Primitive.img,
      {
        ...props,
        src: $src || void 0,
        alt: $alt || void 0,
        crossOrigin: $crossOrigin || void 0,
        ref: composeRefs(img.set, forwardRef2),
        style: { display: $hidden ? 'none' : void 0 },
      },
      children
    );
  }
);
PosterImg.displayName = 'PosterImg';
var Root = React2.forwardRef(({ children, ...props }, forwardRef2) => {
  return React2.createElement(
    Primitive.div,
    {
      translate: 'yes',
      'aria-live': 'off',
      'aria-atomic': 'true',
      ...props,
      ref: forwardRef2,
    },
    children
  );
});
Root.displayName = 'Caption';
var Text = React2.forwardRef((props, forwardRef2) => {
  const textTrack = useMediaState('textTrack'),
    [activeCue, setActiveCue] = React2.useState();
  React2.useEffect(() => {
    if (!textTrack) return;
    function onCueChange() {
      setActiveCue(textTrack == null ? void 0 : textTrack.activeCues[0]);
    }
    textTrack.addEventListener('cue-change', onCueChange);
    return () => {
      textTrack.removeEventListener('cue-change', onCueChange);
      setActiveCue(void 0);
    };
  }, [textTrack]);
  return React2.createElement(Primitive.span, {
    ...props,
    'data-part': 'cue',
    dangerouslySetInnerHTML: {
      __html: (activeCue == null ? void 0 : activeCue.text) || '',
    },
    ref: forwardRef2,
  });
});
Text.displayName = 'CaptionText';
var caption = Object.freeze({
  __proto__: null,
  Root,
  Text,
});
function useState2(ctor, prop2, ref) {
  const initialValue = React2.useMemo(
    () => ctor.state.record[prop2],
    [ctor, prop2]
  );
  return useSignal(ref.current ? ref.current.$state[prop2] : initialValue);
}
var storesCache = /* @__PURE__ */ new Map();
function useStore(ctor, ref) {
  const initialStore = React2.useMemo(() => {
    let store = storesCache.get(ctor);
    if (!store) {
      store = new Proxy(ctor.state.record, {
        get: (_, prop2) => () => ctor.state.record[prop2],
      });
      storesCache.set(ctor, store);
    }
    return store;
  }, [ctor]);
  return useSignalRecord(ref.current ? ref.current.$state : initialStore);
}
function useMediaProvider() {
  const [provider, setProvider] = React2.useState(null),
    context = useMediaContext2();
  if (!context) {
    throw Error(
      '[vidstack] no media context was found - was this called outside of `<MediaPlayer>`?'
    );
  }
  React2.useEffect(() => {
    if (!context) return;
    return effect(() => {
      setProvider(context.$provider());
    });
  }, []);
  return provider;
}
function useThumbnails(src, crossOrigin = null) {
  const scope = useReactScope(),
    $src = createSignal(src),
    $crossOrigin = createSignal(crossOrigin),
    loader = useScoped(() => ThumbnailsLoader.create($src, $crossOrigin));
  if (!scope) {
    console.warn(
      `[vidstack] \`useThumbnails\` must be called inside a child component of \`<MediaPlayer>\``
    );
  }
  React2.useEffect(() => {
    $src.set(src);
  }, [src]);
  React2.useEffect(() => {
    $crossOrigin.set(crossOrigin);
  }, [crossOrigin]);
  return useSignal(loader.$images);
}
function useActiveThumbnail(thumbnails, time) {
  return React2.useMemo(() => {
    let activeIndex = -1;
    for (let i = thumbnails.length - 1; i >= 0; i--) {
      const image = thumbnails[i];
      if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
        activeIndex = i;
        break;
      }
    }
    return thumbnails[activeIndex] || null;
  }, [thumbnails, time]);
}
function useSliderPreview({
  clamp = false,
  offset = 0,
  orientation = 'horizontal',
} = {}) {
  const [rootRef, setRootRef] = React2.useState(null),
    [previewRef, setPreviewRef] = React2.useState(null),
    [pointerValue, setPointerValue] = React2.useState(0),
    [isVisible, setIsVisible] = React2.useState(false);
  React2.useEffect(() => {
    if (!rootRef) return;
    const dragging = signal(false);
    function updatePointerValue(event) {
      if (!rootRef) return;
      setPointerValue(getPointerValue(rootRef, event, orientation));
    }
    return effect(() => {
      if (!dragging()) {
        new EventsController(rootRef)
          .add('pointerenter', () => {
            setIsVisible(true);
            previewRef == null
              ? void 0
              : previewRef.setAttribute('data-visible', '');
          })
          .add('pointerdown', (event) => {
            dragging.set(true);
            updatePointerValue(event);
          })
          .add('pointerleave', () => {
            setIsVisible(false);
            previewRef == null
              ? void 0
              : previewRef.removeAttribute('data-visible');
          })
          .add('pointermove', updatePointerValue);
      }
      previewRef == null
        ? void 0
        : previewRef.setAttribute('data-dragging', '');
      new EventsController(document)
        .add('pointerup', (event) => {
          dragging.set(false);
          previewRef == null
            ? void 0
            : previewRef.removeAttribute('data-dragging');
          updatePointerValue(event);
        })
        .add('pointermove', updatePointerValue)
        .add('touchmove', (e) => e.preventDefault(), { passive: false });
    });
  }, [rootRef]);
  React2.useEffect(() => {
    if (previewRef) {
      previewRef.style.setProperty('--slider-pointer', pointerValue + '%');
    }
  }, [previewRef, pointerValue]);
  React2.useEffect(() => {
    if (!previewRef) return;
    const update = () => {
      updateSliderPreviewPlacement(previewRef, {
        offset,
        clamp,
        orientation,
      });
    };
    update();
    const resize = new ResizeObserver(update);
    resize.observe(previewRef);
    return () => resize.disconnect();
  }, [previewRef, clamp, offset, orientation]);
  return {
    previewRootRef: setRootRef,
    previewRef: setPreviewRef,
    previewValue: pointerValue,
    isPreviewVisible: isVisible,
  };
}
function getPointerValue(root, event, orientation) {
  let thumbPositionRate,
    rect = root.getBoundingClientRect();
  if (orientation === 'vertical') {
    const { bottom: trackBottom, height: trackHeight } = rect;
    thumbPositionRate = (trackBottom - event.clientY) / trackHeight;
  } else {
    const { left: trackLeft, width: trackWidth } = rect;
    thumbPositionRate = (event.clientX - trackLeft) / trackWidth;
  }
  return round(Math.max(0, Math.min(100, 100 * thumbPositionRate)));
}
function round(num) {
  return Number(num.toFixed(3));
}
function useAudioGainOptions({
  gains = DEFAULT_AUDIO_GAINS,
  disabledLabel = 'disabled',
} = {}) {
  const media = useMediaContext2(),
    { audioGain, canSetAudioGain } = media.$state;
  useSignal(audioGain);
  useSignal(canSetAudioGain);
  return React2.useMemo(() => {
    const options = gains.map((opt) => {
      const label =
          typeof opt === 'number'
            ? opt === 1 && disabledLabel
              ? disabledLabel
              : opt * 100 + '%'
            : opt.label,
        gain = typeof opt === 'number' ? opt : opt.gain;
      return {
        label,
        value: gain.toString(),
        gain,
        get selected() {
          return audioGain() === gain;
        },
        select(trigger) {
          media.remote.changeAudioGain(gain, trigger);
        },
      };
    });
    Object.defineProperty(options, 'disabled', {
      get() {
        return !canSetAudioGain() || !options.length;
      },
    });
    Object.defineProperty(options, 'selectedValue', {
      get() {
        var _a;
        return (_a = audioGain()) == null ? void 0 : _a.toString();
      },
    });
    return options;
  }, [gains]);
}
export {
  ARIAKeyShortcuts,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  AirPlayButton,
  AirPlayButtonInstance,
  audioGainSlider as AudioGainSlider,
  AudioGainSliderInstance,
  AudioProviderLoader,
  AudioTrackList,
  caption as Caption,
  CaptionButton,
  CaptionButtonInstance,
  Captions,
  CaptionsInstance,
  ChapterTitle,
  controls as Controls,
  ControlsGroupInstance,
  ControlsInstance,
  DASHProviderLoader,
  DASH_VIDEO_EXTENSIONS,
  DASH_VIDEO_TYPES,
  DEFAULT_AUDIO_GAINS,
  DEFAULT_PLAYBACK_RATES,
  FullscreenButton,
  FullscreenButtonInstance,
  FullscreenController,
  Gesture,
  GestureInstance,
  GoogleCastButton,
  GoogleCastButtonInstance,
  HLSProviderLoader,
  HLS_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  Icon,
  LibASSTextRenderer,
  List,
  LiveButton,
  LiveButtonInstance,
  LocalMediaStorage,
  Logger,
  MEDIA_KEY_SHORTCUTS,
  MediaAnnouncer,
  MediaAnnouncerInstance,
  MediaControls,
  MediaPlayer,
  MediaPlayerInstance,
  MediaProvider,
  MediaProviderInstance,
  MediaRemoteControl,
  menu as Menu,
  MenuButtonInstance,
  MenuInstance,
  MenuItemInstance,
  MenuItemsInstance,
  MenuPortalInstance,
  MuteButton,
  MuteButtonInstance,
  PIPButton,
  PIPButtonInstance,
  PlayButton,
  PlayButtonInstance,
  Poster,
  PosterInstance,
  qualitySlider as QualitySlider,
  QualitySliderInstance,
  radioGroup as RadioGroup,
  RadioGroupInstance,
  RadioInstance,
  ScreenOrientationController,
  SeekButton,
  SeekButtonInstance,
  slider as Slider,
  SliderChaptersInstance,
  SliderInstance,
  SliderPreviewInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  speedSlider as SpeedSlider,
  SpeedSliderInstance,
  spinner as Spinner,
  TextRenderers,
  TextTrack,
  TextTrackList,
  thumbnail as Thumbnail,
  ThumbnailInstance,
  Time,
  TimeInstance,
  TimeRange,
  timeSlider as TimeSlider,
  TimeSliderInstance,
  Title,
  ToggleButton,
  ToggleButtonInstance,
  tooltip as Tooltip,
  TooltipContentInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  Track,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  VideoProviderLoader,
  VideoQualityList,
  VimeoProviderLoader,
  volumeSlider as VolumeSlider,
  VolumeSliderInstance,
  YouTubeProviderLoader,
  appendTriggerEvent,
  boundTime,
  canChangeVolume,
  canFullscreen,
  canGoogleCastSrc,
  canOrientScreen,
  canPlayHLSNatively,
  canRotateScreen,
  canUsePictureInPicture,
  canUseVideoPresentation,
  createTextTrack,
  findActiveCue,
  findTriggerEvent,
  formatSpokenTime,
  formatTime,
  getDownloadFile,
  getTimeRangesEnd,
  getTimeRangesStart,
  hasTriggerEvent,
  isAudioProvider,
  isAudioSrc,
  isCueActive,
  isDASHProvider,
  isDASHSrc,
  isGoogleCastProvider,
  isHLSProvider,
  isHLSSrc,
  isHTMLAudioElement,
  isHTMLIFrameElement,
  isHTMLMediaElement,
  isHTMLVideoElement,
  isKeyboardClick,
  isKeyboardEvent,
  isMediaStream,
  isPointerEvent,
  isTrackCaptionKind,
  isVideoProvider,
  isVideoQualitySrc,
  isVideoSrc,
  isVimeoProvider,
  isYouTubeProvider,
  mediaContext,
  mediaState,
  normalizeTimeIntervals,
  parseJSONCaptionsFile,
  sliderState,
  softResetMediaState,
  sortVideoQualities,
  updateTimeIntervals,
  useActiveTextCues,
  useActiveTextTrack,
  useActiveThumbnail,
  useAudioGainOptions,
  useAudioOptions,
  useCaptionOptions,
  useChapterOptions,
  useChapterTitle,
  useMediaContext2 as useMediaContext,
  useMediaPlayer,
  useMediaProvider,
  useMediaRemote,
  useMediaState,
  useMediaStore,
  usePlaybackRateOptions,
  useSliderPreview,
  useSliderState,
  useSliderStore,
  useState2 as useState,
  useStore,
  useTextCues,
  useThumbnails,
  useVideoQualityOptions,
  walkTriggerEventChain,
  watchActiveTextTrack,
  watchCueTextChange,
};
//# sourceMappingURL=@vidstack_react.js.map
