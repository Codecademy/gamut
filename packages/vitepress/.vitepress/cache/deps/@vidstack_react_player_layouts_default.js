'use client';
import {
  AirPlayButton,
  Button,
  CaptionButton,
  Captions,
  ChapterTitle,
  ChapterTitle2,
  Chapters,
  Content,
  FullscreenButton,
  Gesture,
  GoogleCastButton,
  Group,
  Icon,
  Img,
  Item$1,
  Items,
  LiveButton,
  MediaAnnouncer,
  MuteButton,
  PIPButton,
  PlayButton,
  Portal,
  Preview,
  Progress,
  Root,
  Root$1,
  Root$12,
  Root$2,
  Root$22,
  Root$3,
  Root$32,
  Root$4,
  Root$42,
  Root$5,
  Root$52,
  Root2,
  SeekButton,
  Steps,
  Thumb,
  Thumbnail,
  Time,
  Title,
  Track,
  Track2,
  TrackFill,
  TrackFill2,
  Trigger,
  Value,
  appendParamsToURL,
  createComputed,
  createEffect,
  createSignal,
  useActiveTextTrack,
  useAudioOptions,
  useCaptionOptions,
  useChapterOptions,
  useChapterTitle,
  useMediaContext as useMediaContext2,
  useMediaPlayer,
  useScoped,
} from './chunk-TKZ77QYK.js';
import {
  IS_SERVER,
  Primitive,
  getDownloadFile,
  isRemotionSrc,
  isTrackCaptionKind,
  mediaContext,
  sortVideoQualities,
  useMediaContext,
  useMediaState,
} from './chunk-AB3KZNRI.js';
import {
  EventsController,
  Icon$0,
  Icon$104,
  Icon$105,
  Icon$11,
  Icon$13,
  Icon$16,
  Icon$19,
  Icon$22,
  Icon$24,
  Icon$26,
  Icon$27,
  Icon$31,
  Icon$33,
  Icon$34,
  Icon$35,
  Icon$39,
  Icon$40,
  Icon$5,
  Icon$53,
  Icon$54,
  Icon$56,
  Icon$59,
  Icon$60,
  Icon$61,
  Icon$62,
  Icon$63,
  Icon$74,
  Icon$77,
  Icon$8,
  Icon$81,
  Icon$88,
  animationFrameThrottle,
  camelToKebabCase,
  composeRefs,
  effect,
  isArray,
  isBoolean,
  isKeyboardClick,
  isString,
  isUndefined,
  keysOf,
  listenEvent,
  onDispose,
  scoped,
  signal,
  toggleClass,
  uppercaseFirstChar,
  useContext,
  useSignal,
} from './chunk-KJZMXNFV.js';
import './chunk-Y4QXJQIJ.js';
import { require_react_dom } from './chunk-FO7RYXPS.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-2toTdReN.js
var React2 = __toESM(require_react(), 1);

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-Dt0488Rh.js
var React = __toESM(require_react(), 1);
function useResizeObserver(el, callback) {
  React.useEffect(() => {
    if (!el) return;
    callback();
    const observer = new ResizeObserver(animationFrameThrottle(callback));
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, callback]);
}
function useTransitionActive(el) {
  const [isActive, setIsActive] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const events = new EventsController(el)
      .add('transitionstart', () => setIsActive(true))
      .add('transitionend', () => setIsActive(false));
    return () => events.abort();
  }, [el]);
  return isActive;
}
function useMouseEnter(el) {
  const [isMouseEnter, setIsMouseEnter] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const events = new EventsController(el)
      .add('mouseenter', () => setIsMouseEnter(true))
      .add('mouseleave', () => setIsMouseEnter(false));
    return () => events.abort();
  }, [el]);
  return isMouseEnter;
}
function useFocusIn(el) {
  const [isFocusIn, setIsFocusIn] = React.useState(false);
  React.useEffect(() => {
    if (!el) return;
    const events = new EventsController(el)
      .add('focusin', () => setIsFocusIn(true))
      .add('focusout', () => setIsFocusIn(false));
    return () => events.abort();
  }, [el]);
  return isFocusIn;
}
function useActive(el) {
  const isMouseEnter = useMouseEnter(el),
    isFocusIn = useFocusIn(el),
    prevMouseEnter = React.useRef(false);
  if (prevMouseEnter.current && !isMouseEnter) return false;
  prevMouseEnter.current = isMouseEnter;
  return isMouseEnter || isFocusIn;
}
function useColorSchemePreference() {
  const [colorScheme, setColorScheme] = React.useState('dark');
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)');
    function onChange() {
      setColorScheme(media.matches ? 'light' : 'dark');
    }
    onChange();
    return listenEvent(media, 'change', onChange);
  }, []);
  return colorScheme;
}
function useLayoutName(name) {
  const player = useMediaPlayer();
  React.useEffect(() => {
    if (!player) return;
    return effect(() => {
      const el = player.$el;
      el == null ? void 0 : el.setAttribute('data-layout', name);
      return () => (el == null ? void 0 : el.removeAttribute('data-layout'));
    });
  }, [player]);
}

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-2toTdReN.js
var import_react_dom = __toESM(require_react_dom(), 1);

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-CaBvbWDV.js
var RemotionThumbnail = signal(null);
var RemotionSliderThumbnail = signal(null);
var RemotionPoster = signal(null);

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-2toTdReN.js
var DefaultLayoutContext = React2.createContext({});
DefaultLayoutContext.displayName = 'DefaultLayoutContext';
function useDefaultLayoutContext() {
  return React2.useContext(DefaultLayoutContext);
}
function useDefaultLayoutWord(word) {
  const { translations } = useDefaultLayoutContext();
  return i18n(translations, word);
}
function i18n(translations, word) {
  return (translations == null ? void 0 : translations[word]) ?? word;
}
function useColorSchemeClass(colorScheme) {
  const systemColorPreference = useColorSchemePreference();
  if (colorScheme === 'default') {
    return null;
  } else if (colorScheme === 'system') {
    return systemColorPreference;
  } else {
    return colorScheme;
  }
}
function createDefaultMediaLayout({ type, smLayoutWhen, renderLayout }) {
  const Layout = React2.forwardRef(
    (
      {
        children,
        className,
        disableTimeSlider = false,
        hideQualityBitrate = false,
        icons,
        colorScheme = 'system',
        download = null,
        menuContainer = null,
        menuGroup = 'bottom',
        noAudioGain = false,
        audioGains = { min: 0, max: 300, step: 25 },
        noGestures = false,
        noKeyboardAnimations = false,
        noModal = false,
        noScrubGesture,
        playbackRates = { min: 0, max: 2, step: 0.25 },
        seekStep = 10,
        showMenuDelay,
        showTooltipDelay = 700,
        sliderChaptersMinWidth = 325,
        slots,
        smallLayoutWhen = smLayoutWhen,
        thumbnails = null,
        translations,
        ...props
      },
      forwardRef2
    ) => {
      const media = useMediaContext2(),
        $load = useSignal(media.$props.load),
        $canLoad = useMediaState('canLoad'),
        $viewType = useMediaState('viewType'),
        $streamType = useMediaState('streamType'),
        $smallWhen = createComputed(() => {
          return isBoolean(smallLayoutWhen)
            ? smallLayoutWhen
            : smallLayoutWhen(media.player.state);
        }, [smallLayoutWhen]),
        userPrefersAnnouncements = createSignal(true),
        userPrefersKeyboardAnimations = createSignal(true),
        isMatch = $viewType === type,
        isSmallLayout = $smallWhen(),
        isForcedLayout = isBoolean(smallLayoutWhen),
        isLoadLayout = $load === 'play' && !$canLoad,
        canRender = $canLoad || isForcedLayout || isLoadLayout,
        colorSchemeClass = useColorSchemeClass(colorScheme),
        layoutEl = createSignal(null);
      useSignal($smallWhen);
      return React2.createElement(
        'div',
        {
          ...props,
          className:
            `vds-${type}-layout` +
            (colorSchemeClass ? ` ${colorSchemeClass}` : '') +
            (className ? ` ${className}` : ''),
          'data-match': isMatch ? '' : null,
          'data-sm': isSmallLayout ? '' : null,
          'data-lg': !isSmallLayout ? '' : null,
          'data-size': isSmallLayout ? 'sm' : 'lg',
          'data-no-scrub-gesture': noScrubGesture ? '' : null,
          ref: composeRefs(layoutEl.set, forwardRef2),
        },
        canRender && isMatch
          ? React2.createElement(
              DefaultLayoutContext.Provider,
              {
                value: {
                  disableTimeSlider,
                  hideQualityBitrate,
                  icons,
                  colorScheme,
                  download,
                  isSmallLayout,
                  menuContainer,
                  menuGroup,
                  noAudioGain,
                  audioGains,
                  layoutEl,
                  noGestures,
                  noKeyboardAnimations,
                  noModal,
                  noScrubGesture,
                  showMenuDelay,
                  showTooltipDelay,
                  sliderChaptersMinWidth,
                  slots,
                  seekStep,
                  playbackRates,
                  thumbnails,
                  translations,
                  userPrefersAnnouncements,
                  userPrefersKeyboardAnimations,
                },
              },
              renderLayout({
                streamType: $streamType,
                isSmallLayout,
                isLoadLayout,
              }),
              children
            )
          : null
      );
    }
  );
  Layout.displayName = 'DefaultMediaLayout';
  return Layout;
}
function useDefaultAudioLayoutSlots() {
  return React2.useContext(DefaultLayoutContext).slots;
}
function useDefaultVideoLayoutSlots() {
  return React2.useContext(DefaultLayoutContext).slots;
}
function slot(slots, name, defaultValue) {
  const slot2 = slots == null ? void 0 : slots[name],
    capitalizedName = uppercaseFirstChar(name);
  return React2.createElement(
    React2.Fragment,
    null,
    slots == null ? void 0 : slots[`before${capitalizedName}`],
    isUndefined(slot2) ? defaultValue : slot2,
    slots == null ? void 0 : slots[`after${capitalizedName}`]
  );
}
function DefaultAnnouncer() {
  const { userPrefersAnnouncements, translations } = useDefaultLayoutContext(),
    $userPrefersAnnouncements = useSignal(userPrefersAnnouncements);
  if (!$userPrefersAnnouncements) return null;
  return React2.createElement(MediaAnnouncer, { translations });
}
DefaultAnnouncer.displayName = 'DefaultAnnouncer';
function DefaultTooltip({ content, placement, children }) {
  const { showTooltipDelay } = useDefaultLayoutContext();
  return React2.createElement(
    Root$42,
    { showDelay: showTooltipDelay },
    React2.createElement(Trigger, { asChild: true }, children),
    React2.createElement(
      Content,
      { className: 'vds-tooltip-content', placement },
      content
    )
  );
}
DefaultTooltip.displayName = 'DefaultTooltip';
function DefaultPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    playText = useDefaultLayoutWord('Play'),
    pauseText = useDefaultLayoutWord('Pause'),
    $paused = useMediaState('paused'),
    $ended = useMediaState('ended');
  return React2.createElement(
    DefaultTooltip,
    { content: $paused ? playText : pauseText, placement: tooltip },
    React2.createElement(
      PlayButton,
      { className: 'vds-play-button vds-button', 'aria-label': playText },
      $ended
        ? React2.createElement(Icons.PlayButton.Replay, {
            className: 'vds-icon',
          })
        : $paused
        ? React2.createElement(Icons.PlayButton.Play, { className: 'vds-icon' })
        : React2.createElement(Icons.PlayButton.Pause, {
            className: 'vds-icon',
          })
    )
  );
}
DefaultPlayButton.displayName = 'DefaultPlayButton';
var DefaultMuteButton = React2.forwardRef(({ tooltip }, forwardRef2) => {
  const { icons: Icons } = useDefaultLayoutContext(),
    muteText = useDefaultLayoutWord('Mute'),
    unmuteText = useDefaultLayoutWord('Unmute'),
    $muted = useMediaState('muted'),
    $volume = useMediaState('volume');
  return React2.createElement(
    DefaultTooltip,
    { content: $muted ? unmuteText : muteText, placement: tooltip },
    React2.createElement(
      MuteButton,
      {
        className: 'vds-mute-button vds-button',
        'aria-label': muteText,
        ref: forwardRef2,
      },
      $muted || $volume == 0
        ? React2.createElement(Icons.MuteButton.Mute, { className: 'vds-icon' })
        : $volume < 0.5
        ? React2.createElement(Icons.MuteButton.VolumeLow, {
            className: 'vds-icon',
          })
        : React2.createElement(Icons.MuteButton.VolumeHigh, {
            className: 'vds-icon',
          })
    )
  );
});
DefaultMuteButton.displayName = 'DefaultMuteButton';
function DefaultCaptionButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    captionsText = useDefaultLayoutWord('Captions'),
    onText = useDefaultLayoutWord('Closed-Captions On'),
    offText = useDefaultLayoutWord('Closed-Captions Off'),
    $track = useMediaState('textTrack'),
    isOn = $track && isTrackCaptionKind($track);
  return React2.createElement(
    DefaultTooltip,
    { content: isOn ? onText : offText, placement: tooltip },
    React2.createElement(
      CaptionButton,
      {
        className: 'vds-caption-button vds-button',
        'aria-label': captionsText,
      },
      isOn
        ? React2.createElement(Icons.CaptionButton.On, {
            className: 'vds-icon',
          })
        : React2.createElement(Icons.CaptionButton.Off, {
            className: 'vds-icon',
          })
    )
  );
}
DefaultCaptionButton.displayName = 'DefaultCaptionButton';
function DefaultPIPButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    pipText = useDefaultLayoutWord('PiP'),
    enterText = useDefaultLayoutWord('Enter PiP'),
    exitText = useDefaultLayoutWord('Exit PiP'),
    $pip = useMediaState('pictureInPicture');
  return React2.createElement(
    DefaultTooltip,
    { content: $pip ? exitText : enterText, placement: tooltip },
    React2.createElement(
      PIPButton,
      { className: 'vds-pip-button vds-button', 'aria-label': pipText },
      $pip
        ? React2.createElement(Icons.PIPButton.Exit, { className: 'vds-icon' })
        : React2.createElement(Icons.PIPButton.Enter, { className: 'vds-icon' })
    )
  );
}
DefaultPIPButton.displayName = 'DefaultPIPButton';
function DefaultFullscreenButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    fullscreenText = useDefaultLayoutWord('Fullscreen'),
    enterText = useDefaultLayoutWord('Enter Fullscreen'),
    exitText = useDefaultLayoutWord('Exit Fullscreen'),
    $fullscreen = useMediaState('fullscreen');
  return React2.createElement(
    DefaultTooltip,
    { content: $fullscreen ? exitText : enterText, placement: tooltip },
    React2.createElement(
      FullscreenButton,
      {
        className: 'vds-fullscreen-button vds-button',
        'aria-label': fullscreenText,
      },
      $fullscreen
        ? React2.createElement(Icons.FullscreenButton.Exit, {
            className: 'vds-icon',
          })
        : React2.createElement(Icons.FullscreenButton.Enter, {
            className: 'vds-icon',
          })
    )
  );
}
DefaultFullscreenButton.displayName = 'DefaultFullscreenButton';
function DefaultSeekButton({ backward, tooltip }) {
  const { icons: Icons, seekStep } = useDefaultLayoutContext(),
    seekForwardText = useDefaultLayoutWord('Seek Forward'),
    seekBackwardText = useDefaultLayoutWord('Seek Backward'),
    seconds = (backward ? -1 : 1) * seekStep,
    label = seconds >= 0 ? seekForwardText : seekBackwardText;
  return React2.createElement(
    DefaultTooltip,
    { content: label, placement: tooltip },
    React2.createElement(
      SeekButton,
      { className: 'vds-seek-button vds-button', seconds, 'aria-label': label },
      seconds >= 0
        ? React2.createElement(Icons.SeekButton.Forward, {
            className: 'vds-icon',
          })
        : React2.createElement(Icons.SeekButton.Backward, {
            className: 'vds-icon',
          })
    )
  );
}
DefaultSeekButton.displayName = 'DefaultSeekButton';
function DefaultAirPlayButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    airPlayText = useDefaultLayoutWord('AirPlay'),
    $state = useMediaState('remotePlaybackState'),
    stateText = useDefaultLayoutWord(uppercaseFirstChar($state)),
    label = `${airPlayText} ${stateText}`,
    Icon2 =
      ($state === 'connecting'
        ? Icons.AirPlayButton.Connecting
        : $state === 'connected'
        ? Icons.AirPlayButton.Connected
        : null) ?? Icons.AirPlayButton.Default;
  return React2.createElement(
    DefaultTooltip,
    { content: airPlayText, placement: tooltip },
    React2.createElement(
      AirPlayButton,
      { className: 'vds-airplay-button vds-button', 'aria-label': label },
      React2.createElement(Icon2, { className: 'vds-icon' })
    )
  );
}
DefaultAirPlayButton.displayName = 'DefaultAirPlayButton';
function DefaultGoogleCastButton({ tooltip }) {
  const { icons: Icons } = useDefaultLayoutContext(),
    googleCastText = useDefaultLayoutWord('Google Cast'),
    $state = useMediaState('remotePlaybackState'),
    stateText = useDefaultLayoutWord(uppercaseFirstChar($state)),
    label = `${googleCastText} ${stateText}`,
    Icon2 =
      ($state === 'connecting'
        ? Icons.GoogleCastButton.Connecting
        : $state === 'connected'
        ? Icons.GoogleCastButton.Connected
        : null) ?? Icons.GoogleCastButton.Default;
  return React2.createElement(
    DefaultTooltip,
    { content: googleCastText, placement: tooltip },
    React2.createElement(
      GoogleCastButton,
      { className: 'vds-google-cast-button vds-button', 'aria-label': label },
      React2.createElement(Icon2, { className: 'vds-icon' })
    )
  );
}
DefaultGoogleCastButton.displayName = 'DefaultGoogleCastButton';
function DefaultLiveButton() {
  const $live = useMediaState('live'),
    label = useDefaultLayoutWord('Skip To Live'),
    liveText = useDefaultLayoutWord('LIVE');
  return $live
    ? React2.createElement(
        LiveButton,
        { className: 'vds-live-button', 'aria-label': label },
        React2.createElement(
          'span',
          { className: 'vds-live-button-text' },
          liveText
        )
      )
    : null;
}
DefaultLiveButton.displayName = 'DefaultLiveButton';
function DefaultDownloadButton() {
  const { download, icons: Icons } = useDefaultLayoutContext(),
    $src = useMediaState('source'),
    $title = useMediaState('title'),
    file = getDownloadFile({
      title: $title,
      src: $src,
      download,
    }),
    downloadText = useDefaultLayoutWord('Download');
  return isString(file == null ? void 0 : file.url)
    ? React2.createElement(
        DefaultTooltip,
        { content: downloadText, placement: 'top' },
        React2.createElement(
          'a',
          {
            role: 'button',
            className: 'vds-download-button vds-button',
            'aria-label': downloadText,
            href: appendParamsToURL(file.url, { download: file.name }),
            download: file.name,
            target: '_blank',
          },
          Icons.DownloadButton
            ? React2.createElement(Icons.DownloadButton.Default, {
                className: 'vds-icon',
              })
            : null
        )
      )
    : null;
}
DefaultDownloadButton.displayName = 'DefaultDownloadButton';
function DefaultCaptions() {
  const exampleText = useDefaultLayoutWord('Captions look like this');
  return React2.createElement(Captions, {
    className: 'vds-captions',
    exampleText,
  });
}
DefaultCaptions.displayName = 'DefaultCaptions';
function DefaultControlsSpacer() {
  return React2.createElement('div', { className: 'vds-controls-spacer' });
}
DefaultControlsSpacer.displayName = 'DefaultControlsSpacer';
function useParentDialogEl() {
  const { layoutEl } = useDefaultLayoutContext(),
    $layoutEl = useSignal(layoutEl);
  return React2.useMemo(
    () => ($layoutEl == null ? void 0 : $layoutEl.closest('dialog')),
    [$layoutEl]
  );
}
function DefaultChaptersMenu({ tooltip, placement, portalClass = '' }) {
  const {
      showMenuDelay,
      noModal,
      isSmallLayout,
      icons: Icons,
      menuGroup,
      menuContainer,
      colorScheme,
    } = useDefaultLayoutContext(),
    chaptersText = useDefaultLayoutWord('Chapters'),
    options = useChapterOptions(),
    disabled = !options.length,
    { thumbnails } = useDefaultLayoutContext(),
    $src = useMediaState('currentSrc'),
    $viewType = useMediaState('viewType'),
    $offset =
      !isSmallLayout && menuGroup === 'bottom' && $viewType === 'video'
        ? 26
        : 0,
    $RemotionThumbnail = useSignal(RemotionThumbnail),
    colorSchemeClass = useColorSchemeClass(colorScheme),
    [isOpen, setIsOpen] = React2.useState(false),
    dialogEl = useParentDialogEl();
  if (disabled) return null;
  function onOpen() {
    (0, import_react_dom.flushSync)(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content2 = React2.createElement(
    Items,
    {
      className: 'vds-chapters-menu-items vds-menu-items',
      placement,
      offset: $offset,
    },
    isOpen
      ? React2.createElement(
          Root$1,
          {
            className: 'vds-chapters-radio-group vds-radio-group',
            value: options.selectedValue,
            'data-thumbnails': thumbnails ? '' : null,
          },
          options.map(
            ({
              cue,
              label,
              value,
              startTimeText,
              durationText,
              select,
              setProgressVar,
            }) =>
              React2.createElement(
                Item$1,
                {
                  className: 'vds-chapter-radio vds-radio',
                  value,
                  key: value,
                  onSelect: select,
                  ref: setProgressVar,
                },
                thumbnails
                  ? React2.createElement(
                      Root$3,
                      {
                        src: thumbnails,
                        className: 'vds-thumbnail',
                        time: cue.startTime,
                      },
                      React2.createElement(Img, null)
                    )
                  : $RemotionThumbnail && isRemotionSrc($src)
                  ? React2.createElement($RemotionThumbnail, {
                      className: 'vds-thumbnail',
                      frame: cue.startTime * $src.fps,
                    })
                  : null,
                React2.createElement(
                  'div',
                  { className: 'vds-chapter-radio-content' },
                  React2.createElement(
                    'span',
                    { className: 'vds-chapter-radio-label' },
                    label
                  ),
                  React2.createElement(
                    'span',
                    { className: 'vds-chapter-radio-start-time' },
                    startTimeText
                  ),
                  React2.createElement(
                    'span',
                    { className: 'vds-chapter-radio-duration' },
                    durationText
                  )
                )
              )
          )
        )
      : null
  );
  return React2.createElement(
    Root,
    {
      className: 'vds-chapters-menu vds-menu',
      showDelay: showMenuDelay,
      onOpen,
      onClose,
    },
    React2.createElement(
      DefaultTooltip,
      { content: chaptersText, placement: tooltip },
      React2.createElement(
        Button,
        {
          className: 'vds-menu-button vds-button',
          disabled,
          'aria-label': chaptersText,
        },
        React2.createElement(Icons.Menu.Chapters, { className: 'vds-icon' })
      )
    ),
    noModal || !isSmallLayout
      ? Content2
      : React2.createElement(
          Portal,
          {
            container: menuContainer ?? dialogEl,
            className:
              portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ''),
            disabled: 'fullscreen',
            'data-sm': isSmallLayout ? '' : null,
            'data-lg': !isSmallLayout ? '' : null,
            'data-size': isSmallLayout ? 'sm' : 'lg',
          },
          Content2
        )
  );
}
DefaultChaptersMenu.displayName = 'DefaultChaptersMenu';
var FONT_COLOR_OPTION = {
  type: 'color',
};
var FONT_FAMILY_OPTION = {
  type: 'radio',
  values: {
    'Monospaced Serif': 'mono-serif',
    'Proportional Serif': 'pro-serif',
    'Monospaced Sans-Serif': 'mono-sans',
    'Proportional Sans-Serif': 'pro-sans',
    Casual: 'casual',
    Cursive: 'cursive',
    'Small Capitals': 'capitals',
  },
};
var FONT_SIZE_OPTION = {
  type: 'slider',
  min: 0,
  max: 400,
  step: 25,
  upIcon: null,
  downIcon: null,
};
var FONT_OPACITY_OPTION = {
  type: 'slider',
  min: 0,
  max: 100,
  step: 5,
  upIcon: null,
  downIcon: null,
};
var FONT_TEXT_SHADOW_OPTION = {
  type: 'radio',
  values: ['None', 'Drop Shadow', 'Raised', 'Depressed', 'Outline'],
};
var FONT_DEFAULTS = {
  fontFamily: 'pro-sans',
  fontSize: '100%',
  textColor: '#ffffff',
  textOpacity: '100%',
  textShadow: 'none',
  textBg: '#000000',
  textBgOpacity: '100%',
  displayBg: '#000000',
  displayBgOpacity: '0%',
};
var FONT_SIGNALS = Object.keys(FONT_DEFAULTS).reduce(
  (prev, type) => ({
    ...prev,
    [type]: signal(FONT_DEFAULTS[type]),
  }),
  {}
);
if (!IS_SERVER) {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const value = localStorage.getItem(`vds-player:${camelToKebabCase(type)}`);
    if (isString(value)) FONT_SIGNALS[type].set(value);
  }
}
function onFontReset() {
  for (const type of Object.keys(FONT_SIGNALS)) {
    const defaultValue = FONT_DEFAULTS[type];
    FONT_SIGNALS[type].set(defaultValue);
  }
}
function hexToRgb(hex) {
  const { style } = new Option();
  style.color = hex;
  return style.color.match(/\((.*?)\)/)[1].replace(/,/g, ' ');
}
var isWatchingVars = false;
var players = /* @__PURE__ */ new Set();
function updateFontCssVars() {
  if (IS_SERVER) return;
  const { player } = useMediaContext();
  players.add(player);
  onDispose(() => players.delete(player));
  if (!isWatchingVars) {
    scoped(() => {
      for (const type of keysOf(FONT_SIGNALS)) {
        const $value = FONT_SIGNALS[type],
          defaultValue = FONT_DEFAULTS[type],
          varName = `--media-user-${camelToKebabCase(type)}`,
          storageKey = `vds-player:${camelToKebabCase(type)}`;
        effect(() => {
          var _a;
          const value = $value(),
            isDefaultVarValue = value === defaultValue,
            varValue = !isDefaultVarValue
              ? getCssVarValue(player, type, value)
              : null;
          for (const player2 of players) {
            (_a = player2.el) == null
              ? void 0
              : _a.style.setProperty(varName, varValue);
          }
          if (isDefaultVarValue) {
            localStorage.removeItem(storageKey);
          } else {
            localStorage.setItem(storageKey, value);
          }
        });
      }
    }, null);
    isWatchingVars = true;
  }
}
function getCssVarValue(player, type, value) {
  var _a;
  switch (type) {
    case 'fontFamily':
      const fontVariant = value === 'capitals' ? 'small-caps' : '';
      (_a = player.el) == null
        ? void 0
        : _a.style.setProperty('--media-user-font-variant', fontVariant);
      return getFontFamilyCSSVarValue(value);
    case 'fontSize':
    case 'textOpacity':
    case 'textBgOpacity':
    case 'displayBgOpacity':
      return percentToRatio(value);
    case 'textColor':
      return `rgb(${hexToRgb(value)} / var(--media-user-text-opacity, 1))`;
    case 'textShadow':
      return getTextShadowCssVarValue(value);
    case 'textBg':
      return `rgb(${hexToRgb(value)} / var(--media-user-text-bg-opacity, 1))`;
    case 'displayBg':
      return `rgb(${hexToRgb(
        value
      )} / var(--media-user-display-bg-opacity, 1))`;
  }
}
function percentToRatio(value) {
  return (parseInt(value) / 100).toString();
}
function getFontFamilyCSSVarValue(value) {
  switch (value) {
    case 'mono-serif':
      return '"Courier New", Courier, "Nimbus Mono L", "Cutive Mono", monospace';
    case 'mono-sans':
      return '"Deja Vu Sans Mono", "Lucida Console", Monaco, Consolas, "PT Mono", monospace';
    case 'pro-sans':
      return 'Roboto, "Arial Unicode Ms", Arial, Helvetica, Verdana, "PT Sans Caption", sans-serif';
    case 'casual':
      return '"Comic Sans MS", Impact, Handlee, fantasy';
    case 'cursive':
      return '"Monotype Corsiva", "URW Chancery L", "Apple Chancery", "Dancing Script", cursive';
    case 'capitals':
      return '"Arial Unicode Ms", Arial, Helvetica, Verdana, "Marcellus SC", sans-serif + font-variant=small-caps';
    default:
      return '"Times New Roman", Times, Georgia, Cambria, "PT Serif Caption", serif';
  }
}
function getTextShadowCssVarValue(value) {
  switch (value) {
    case 'drop shadow':
      return 'rgb(34, 34, 34) 1.86389px 1.86389px 2.79583px, rgb(34, 34, 34) 1.86389px 1.86389px 3.72778px, rgb(34, 34, 34) 1.86389px 1.86389px 4.65972px';
    case 'raised':
      return 'rgb(34, 34, 34) 1px 1px, rgb(34, 34, 34) 2px 2px';
    case 'depressed':
      return 'rgb(204, 204, 204) 1px 1px, rgb(34, 34, 34) -1px -1px';
    case 'outline':
      return 'rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px, rgb(34, 34, 34) 0px 0px 1.86389px';
    default:
      return '';
  }
}
function DefaultMenuSection({ label, value, children }) {
  const id = React2.useId();
  if (!label) {
    return React2.createElement(
      'div',
      { className: 'vds-menu-section' },
      React2.createElement(
        'div',
        { className: 'vds-menu-section-body' },
        children
      )
    );
  }
  return React2.createElement(
    'section',
    { className: 'vds-menu-section', role: 'group', 'aria-labelledby': id },
    React2.createElement(
      'div',
      { className: 'vds-menu-section-title' },
      React2.createElement('header', { id }, label),
      value
        ? React2.createElement(
            'div',
            { className: 'vds-menu-section-value' },
            value
          )
        : null
    ),
    React2.createElement(
      'div',
      { className: 'vds-menu-section-body' },
      children
    )
  );
}
DefaultMenuSection.displayName = 'DefaultMenuSection';
function DefaultMenuButton({
  label,
  hint = '',
  Icon: Icon2,
  disabled = false,
}) {
  const { icons: Icons } = React2.useContext(DefaultLayoutContext);
  return React2.createElement(
    Button,
    { className: 'vds-menu-item', disabled },
    React2.createElement(Icons.Menu.ArrowLeft, {
      className: 'vds-menu-close-icon vds-icon',
    }),
    Icon2
      ? React2.createElement(Icon2, {
          className: 'vds-menu-item-icon vds-icon',
        })
      : null,
    React2.createElement('span', { className: 'vds-menu-item-label' }, label),
    React2.createElement('span', { className: 'vds-menu-item-hint' }, hint),
    React2.createElement(Icons.Menu.ArrowRight, {
      className: 'vds-menu-open-icon vds-icon',
    })
  );
}
DefaultMenuButton.displayName = 'DefaultMenuButton';
function DefaultMenuItem({ label, children }) {
  return React2.createElement(
    'div',
    { className: 'vds-menu-item' },
    React2.createElement('div', { className: 'vds-menu-item-label' }, label),
    children
  );
}
DefaultMenuItem.displayName = 'DefaultMenuItem';
function DefaultMenuRadioGroup({ value, options, onChange }) {
  const { icons: Icons } = useDefaultLayoutContext();
  return React2.createElement(
    Root$1,
    { className: 'vds-radio-group', value, onChange },
    options.map((option) =>
      React2.createElement(
        Item$1,
        { className: 'vds-radio', value: option.value, key: option.value },
        React2.createElement(Icons.Menu.RadioCheck, { className: 'vds-icon' }),
        React2.createElement(
          'span',
          { className: 'vds-radio-label', 'data-part': 'label' },
          option.label
        )
      )
    )
  );
}
DefaultMenuRadioGroup.displayName = 'DefaultMenuRadioGroup';
function createRadioOptions(entries) {
  return React2.useMemo(
    () =>
      isArray(entries)
        ? entries.map((entry) => ({ label: entry, value: entry.toLowerCase() }))
        : Object.keys(entries).map((label) => ({
            label,
            value: entries[label],
          })),
    [entries]
  );
}
function DefaultMenuSliderItem({
  label,
  value,
  UpIcon,
  DownIcon,
  children,
  isMin,
  isMax,
}) {
  const hasTitle = label || value,
    Content2 = React2.createElement(
      React2.Fragment,
      null,
      DownIcon
        ? React2.createElement(DownIcon, { className: 'vds-icon down' })
        : null,
      children,
      UpIcon ? React2.createElement(UpIcon, { className: 'vds-icon up' }) : null
    );
  return React2.createElement(
    'div',
    {
      className: `vds-menu-item vds-menu-slider-item${
        hasTitle ? ' group' : ''
      }`,
      'data-min': isMin ? '' : null,
      'data-max': isMax ? '' : null,
    },
    hasTitle
      ? React2.createElement(
          React2.Fragment,
          null,
          React2.createElement(
            'div',
            { className: 'vds-menu-slider-title' },
            label ? React2.createElement('div', null, label) : null,
            value ? React2.createElement('div', null, value) : null
          ),
          React2.createElement(
            'div',
            { className: 'vds-menu-slider-body' },
            Content2
          )
        )
      : Content2
  );
}
DefaultMenuSliderItem.displayName = 'DefaultMenuSliderItem';
function DefaultSliderParts() {
  return React2.createElement(
    React2.Fragment,
    null,
    React2.createElement(Track, { className: 'vds-slider-track' }),
    React2.createElement(TrackFill, {
      className: 'vds-slider-track-fill vds-slider-track',
    }),
    React2.createElement(Thumb, { className: 'vds-slider-thumb' })
  );
}
DefaultSliderParts.displayName = 'DefaultSliderParts';
function DefaultSliderSteps() {
  return React2.createElement(
    Steps,
    { className: 'vds-slider-steps' },
    (step) =>
      React2.createElement('div', {
        className: 'vds-slider-step',
        key: String(step),
      })
  );
}
DefaultSliderSteps.displayName = 'DefaultSliderSteps';
function DefaultFontMenu() {
  const label = useDefaultLayoutWord('Caption Styles'),
    $hasCaptions = useMediaState('hasCaptions'),
    fontSectionLabel = useDefaultLayoutWord('Font'),
    textSectionLabel = useDefaultLayoutWord('Text'),
    textBgSectionLabel = useDefaultLayoutWord('Text Background'),
    displayBgSectionLabel = useDefaultLayoutWord('Display Background');
  if (!$hasCaptions) return null;
  return React2.createElement(
    Root,
    { className: 'vds-font-menu vds-menu' },
    React2.createElement(DefaultMenuButton, { label }),
    React2.createElement(
      Items,
      { className: 'vds-font-style-items vds-menu-items' },
      React2.createElement(
        DefaultMenuSection,
        { label: fontSectionLabel },
        React2.createElement(DefaultFontFamilyMenu, null),
        React2.createElement(DefaultFontSizeSlider, null)
      ),
      React2.createElement(
        DefaultMenuSection,
        { label: textSectionLabel },
        React2.createElement(DefaultTextColorInput, null),
        React2.createElement(DefaultTextShadowMenu, null),
        React2.createElement(DefaultTextOpacitySlider, null)
      ),
      React2.createElement(
        DefaultMenuSection,
        { label: textBgSectionLabel },
        React2.createElement(DefaultTextBgInput, null),
        React2.createElement(DefaultTextBgOpacitySlider, null)
      ),
      React2.createElement(
        DefaultMenuSection,
        { label: displayBgSectionLabel },
        React2.createElement(DefaultDisplayBgInput, null),
        React2.createElement(DefaultDisplayBgOpacitySlider, null)
      ),
      React2.createElement(
        DefaultMenuSection,
        null,
        React2.createElement(DefaultResetMenuItem, null)
      )
    )
  );
}
DefaultFontMenu.displayName = 'DefaultFontMenu';
function DefaultFontFamilyMenu() {
  return React2.createElement(DefaultFontSetting, {
    label: 'Family',
    type: 'fontFamily',
    option: FONT_FAMILY_OPTION,
  });
}
DefaultFontFamilyMenu.displayName = 'DefaultFontFamilyMenu';
function DefaultFontSizeSlider() {
  const { icons: Icons } = useDefaultLayoutContext(),
    option = {
      ...FONT_SIZE_OPTION,
      upIcon: Icons.Menu.FontSizeUp,
      downIcon: Icons.Menu.FontSizeDown,
    };
  return React2.createElement(DefaultFontSetting, {
    label: 'Size',
    type: 'fontSize',
    option,
  });
}
DefaultFontSizeSlider.displayName = 'DefaultFontSizeSlider';
function DefaultTextColorInput() {
  return React2.createElement(DefaultFontSetting, {
    label: 'Color',
    type: 'textColor',
    option: FONT_COLOR_OPTION,
  });
}
DefaultTextColorInput.displayName = 'DefaultTextColorInput';
function DefaultTextOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(),
    option = {
      ...FONT_OPACITY_OPTION,
      upIcon: Icons.Menu.OpacityUp,
      downIcon: Icons.Menu.OpacityDown,
    };
  return React2.createElement(DefaultFontSetting, {
    label: 'Opacity',
    type: 'textOpacity',
    option,
  });
}
DefaultTextOpacitySlider.displayName = 'DefaultTextOpacitySlider';
function DefaultTextShadowMenu() {
  return React2.createElement(DefaultFontSetting, {
    label: 'Shadow',
    type: 'textShadow',
    option: FONT_TEXT_SHADOW_OPTION,
  });
}
DefaultTextShadowMenu.displayName = 'DefaultTextShadowMenu';
function DefaultTextBgInput() {
  return React2.createElement(DefaultFontSetting, {
    label: 'Color',
    type: 'textBg',
    option: FONT_COLOR_OPTION,
  });
}
DefaultTextBgInput.displayName = 'DefaultTextBgInput';
function DefaultTextBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(),
    option = {
      ...FONT_OPACITY_OPTION,
      upIcon: Icons.Menu.OpacityUp,
      downIcon: Icons.Menu.OpacityDown,
    };
  return React2.createElement(DefaultFontSetting, {
    label: 'Opacity',
    type: 'textBgOpacity',
    option,
  });
}
DefaultTextBgOpacitySlider.displayName = 'DefaultTextBgOpacitySlider';
function DefaultDisplayBgInput() {
  return React2.createElement(DefaultFontSetting, {
    label: 'Color',
    type: 'displayBg',
    option: FONT_COLOR_OPTION,
  });
}
DefaultDisplayBgInput.displayName = 'DefaultDisplayBgInput';
function DefaultDisplayBgOpacitySlider() {
  const { icons: Icons } = useDefaultLayoutContext(),
    option = {
      ...FONT_OPACITY_OPTION,
      upIcon: Icons.Menu.OpacityUp,
      downIcon: Icons.Menu.OpacityDown,
    };
  return React2.createElement(DefaultFontSetting, {
    label: 'Opacity',
    type: 'displayBgOpacity',
    option,
  });
}
DefaultDisplayBgOpacitySlider.displayName = 'DefaultDisplayBgOpacitySlider';
function DefaultFontSetting({ label, option, type }) {
  const player = useMediaPlayer(),
    $currentValue = FONT_SIGNALS[type],
    $value = useSignal($currentValue),
    translatedLabel = useDefaultLayoutWord(label);
  const notify = React2.useCallback(() => {
    player == null
      ? void 0
      : player.dispatchEvent(new Event('vds-font-change'));
  }, [player]);
  const onChange = React2.useCallback(
    (newValue) => {
      $currentValue.set(newValue);
      notify();
    },
    [$currentValue, notify]
  );
  if (option.type === 'color') {
    let onColorChange2 = function (event) {
      onChange(event.target.value);
    };
    return React2.createElement(
      DefaultMenuItem,
      { label: translatedLabel },
      React2.createElement('input', {
        className: 'vds-color-picker',
        type: 'color',
        value: $value,
        onChange: onColorChange2,
      })
    );
  }
  if (option.type === 'slider') {
    let onSliderValueChange2 = function (value) {
      onChange(value + '%');
    };
    const { min, max, step, upIcon, downIcon } = option;
    return React2.createElement(
      DefaultMenuSliderItem,
      {
        label: translatedLabel,
        value: $value,
        UpIcon: upIcon,
        DownIcon: downIcon,
        isMin: $value === min + '%',
        isMax: $value === max + '%',
      },
      React2.createElement(
        Root$5,
        {
          className: 'vds-slider',
          min,
          max,
          step,
          keyStep: step,
          value: parseInt($value),
          'aria-label': translatedLabel,
          onValueChange: onSliderValueChange2,
          onDragValueChange: onSliderValueChange2,
        },
        React2.createElement(DefaultSliderParts, null),
        React2.createElement(DefaultSliderSteps, null)
      )
    );
  }
  if (option.type === 'radio') {
    return React2.createElement(DefaultFontRadioGroup, {
      id: camelToKebabCase(type),
      label: translatedLabel,
      value: $value,
      values: option.values,
      onChange,
    });
  }
  return null;
}
DefaultFontSetting.displayName = 'DefaultFontSetting';
function DefaultFontRadioGroup({ id, label, value, values, onChange }) {
  const radioOptions = createRadioOptions(values),
    { translations } = useDefaultLayoutContext(),
    hint = React2.useMemo(() => {
      var _a;
      const label2 =
        ((_a = radioOptions.find((radio) => radio.value === value)) == null
          ? void 0
          : _a.label) || '';
      return i18n(translations, label2);
    }, [value, radioOptions]);
  return React2.createElement(
    Root,
    { className: `vds-${id}-menu vds-menu` },
    React2.createElement(DefaultMenuButton, { label, hint }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      React2.createElement(DefaultMenuRadioGroup, {
        value,
        options: radioOptions,
        onChange,
      })
    )
  );
}
DefaultFontRadioGroup.displayName = 'DefaultFontRadioGroup';
function DefaultResetMenuItem() {
  const resetText = useDefaultLayoutWord('Reset');
  return React2.createElement(
    'button',
    { className: 'vds-menu-item', role: 'menuitem', onClick: onFontReset },
    React2.createElement(
      'span',
      { className: 'vds-menu-item-label' },
      resetText
    )
  );
}
DefaultResetMenuItem.displayName = 'DefaultResetMenuItem';
function DefaultMenuCheckbox({
  label,
  checked,
  storageKey,
  defaultChecked = false,
  onChange,
}) {
  const [isChecked, setIsChecked] = React2.useState(defaultChecked),
    [isActive, setIsActive] = React2.useState(false);
  React2.useEffect(() => {
    const savedValue = storageKey ? localStorage.getItem(storageKey) : null,
      checked2 = !!(savedValue ?? defaultChecked);
    setIsChecked(checked2);
    onChange == null ? void 0 : onChange(checked2);
  }, []);
  React2.useEffect(() => {
    if (isBoolean(checked)) setIsChecked(checked);
  }, [checked]);
  function onPress(event) {
    if (
      event &&
      'button' in event &&
      (event == null ? void 0 : event.button) === 1
    )
      return;
    const toggledCheck = !isChecked;
    setIsChecked(toggledCheck);
    if (storageKey) localStorage.setItem(storageKey, toggledCheck ? '1' : '');
    onChange == null
      ? void 0
      : onChange(toggledCheck, event == null ? void 0 : event.nativeEvent);
    setIsActive(false);
  }
  function onActive(event) {
    if (event.button !== 0) return;
    setIsActive(true);
  }
  function onKeyDown(event) {
    if (isKeyboardClick(event.nativeEvent)) onPress();
  }
  return React2.createElement('div', {
    className: 'vds-menu-checkbox',
    role: 'menuitemcheckbox',
    tabIndex: 0,
    'aria-label': label,
    'aria-checked': isChecked ? 'true' : 'false',
    'data-active': isActive ? '' : null,
    onPointerUp: onPress,
    onPointerDown: onActive,
    onKeyDown,
  });
}
DefaultMenuCheckbox.displayName = 'DefaultMenuCheckbox';
function DefaultAccessibilityMenu({ slots }) {
  const label = useDefaultLayoutWord('Accessibility'),
    { icons: Icons } = useDefaultLayoutContext();
  return React2.createElement(
    Root,
    { className: 'vds-accessibility-menu vds-menu' },
    React2.createElement(DefaultMenuButton, {
      label,
      Icon: Icons.Menu.Accessibility,
    }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      slot(slots, 'accessibilityMenuItemsStart', null),
      React2.createElement(
        DefaultMenuSection,
        null,
        React2.createElement(DefaultAnnouncementsMenuCheckbox, null),
        React2.createElement(DefaultKeyboardAnimationsMenuCheckbox, null)
      ),
      React2.createElement(
        DefaultMenuSection,
        null,
        React2.createElement(DefaultFontMenu, null)
      ),
      slot(slots, 'accessibilityMenuItemsEnd', null)
    )
  );
}
DefaultAccessibilityMenu.displayName = 'DefaultAccessibilityMenu';
function DefaultAnnouncementsMenuCheckbox() {
  const { userPrefersAnnouncements } = useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Announcements');
  function onChange(checked) {
    userPrefersAnnouncements.set(checked);
  }
  return React2.createElement(
    DefaultMenuItem,
    { label },
    React2.createElement(DefaultMenuCheckbox, {
      label,
      defaultChecked: true,
      storageKey: 'vds-player::announcements',
      onChange,
    })
  );
}
DefaultAnnouncementsMenuCheckbox.displayName =
  'DefaultAnnouncementsMenuCheckbox';
function DefaultKeyboardAnimationsMenuCheckbox() {
  const $viewType = useMediaState('viewType'),
    { userPrefersKeyboardAnimations, noKeyboardAnimations } =
      useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Keyboard Animations');
  if ($viewType !== 'video' || noKeyboardAnimations) return null;
  function onChange(checked) {
    userPrefersKeyboardAnimations.set(checked);
  }
  return React2.createElement(
    DefaultMenuItem,
    { label },
    React2.createElement(DefaultMenuCheckbox, {
      label,
      defaultChecked: true,
      storageKey: 'vds-player::keyboard-animations',
      onChange,
    })
  );
}
DefaultKeyboardAnimationsMenuCheckbox.displayName =
  'DefaultKeyboardAnimationsMenuCheckbox';
function DefaultAudioMenu({ slots }) {
  const label = useDefaultLayoutWord('Audio'),
    $canSetAudioGain = useMediaState('canSetAudioGain'),
    $audioTracks = useMediaState('audioTracks'),
    { noAudioGain, icons: Icons } = useDefaultLayoutContext(),
    hasGainSlider = $canSetAudioGain && !noAudioGain,
    $disabled = !hasGainSlider && $audioTracks.length <= 1;
  if ($disabled) return null;
  return React2.createElement(
    Root,
    { className: 'vds-audio-menu vds-menu' },
    React2.createElement(DefaultMenuButton, { label, Icon: Icons.Menu.Audio }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      slot(slots, 'audioMenuItemsStart', null),
      React2.createElement(DefaultAudioTracksMenu, null),
      hasGainSlider
        ? React2.createElement(DefaultAudioBoostMenuSection, null)
        : null,
      slot(slots, 'audioMenuItemsEnd', null)
    )
  );
}
DefaultAudioMenu.displayName = 'DefaultAudioMenu';
function DefaultAudioBoostMenuSection() {
  const $audioGain = useMediaState('audioGain'),
    label = useDefaultLayoutWord('Boost'),
    value = Math.round((($audioGain ?? 1) - 1) * 100) + '%',
    $canSetAudioGain = useMediaState('canSetAudioGain'),
    { noAudioGain, icons: Icons } = useDefaultLayoutContext(),
    $disabled = !$canSetAudioGain || noAudioGain,
    min = useGainMin(),
    max = useGainMax();
  if ($disabled) return null;
  return React2.createElement(
    DefaultMenuSection,
    { label, value },
    React2.createElement(
      DefaultMenuSliderItem,
      {
        UpIcon: Icons.Menu.AudioBoostUp,
        DownIcon: Icons.Menu.AudioBoostDown,
        isMin: (($audioGain ?? 1) - 1) * 100 <= min,
        isMax: (($audioGain ?? 1) - 1) * 100 === max,
      },
      React2.createElement(DefaultAudioGainSlider, null)
    )
  );
}
DefaultAudioBoostMenuSection.displayName = 'DefaultAudioBoostMenuSection';
function useGainMin() {
  const { audioGains } = useDefaultLayoutContext(),
    min = isArray(audioGains)
      ? audioGains[0]
      : audioGains == null
      ? void 0
      : audioGains.min;
  return min ?? 0;
}
function useGainMax() {
  const { audioGains } = useDefaultLayoutContext(),
    max = isArray(audioGains)
      ? audioGains[audioGains.length - 1]
      : audioGains == null
      ? void 0
      : audioGains.max;
  return max ?? 300;
}
function useGainStep() {
  const { audioGains } = useDefaultLayoutContext(),
    step = isArray(audioGains)
      ? audioGains[1] - audioGains[0]
      : audioGains == null
      ? void 0
      : audioGains.step;
  return step || 25;
}
function DefaultAudioGainSlider() {
  const label = useDefaultLayoutWord('Audio Boost'),
    min = useGainMin(),
    max = useGainMax(),
    step = useGainStep();
  return React2.createElement(
    Root$22,
    {
      className: 'vds-audio-gain-slider vds-slider',
      'aria-label': label,
      min,
      max,
      step,
      keyStep: step,
    },
    React2.createElement(DefaultSliderParts, null),
    React2.createElement(DefaultSliderSteps, null)
  );
}
DefaultAudioGainSlider.displayName = 'DefaultAudioGainSlider';
function DefaultAudioTracksMenu() {
  const { icons: Icons } = useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Track'),
    defaultText = useDefaultLayoutWord('Default'),
    $track = useMediaState('audioTrack'),
    options = useAudioOptions();
  if (options.disabled) return null;
  return React2.createElement(
    Root,
    { className: 'vds-audio-track-menu vds-menu' },
    React2.createElement(DefaultMenuButton, {
      label,
      hint: ($track == null ? void 0 : $track.label) ?? defaultText,
      disabled: options.disabled,
      Icon: Icons.Menu.Audio,
    }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      React2.createElement(
        Root$1,
        {
          className: 'vds-audio-radio-group vds-radio-group',
          value: options.selectedValue,
        },
        options.map(({ label: label2, value, select }) =>
          React2.createElement(
            Item$1,
            {
              className: 'vds-audio-radio vds-radio',
              value,
              onSelect: select,
              key: value,
            },
            React2.createElement(Icons.Menu.RadioCheck, {
              className: 'vds-icon',
            }),
            React2.createElement(
              'span',
              { className: 'vds-radio-label' },
              label2
            )
          )
        )
      )
    )
  );
}
DefaultAudioTracksMenu.displayName = 'DefaultAudioTracksMenu';
function DefaultCaptionMenu({ slots }) {
  var _a;
  const { icons: Icons } = useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Captions'),
    offText = useDefaultLayoutWord('Off'),
    options = useCaptionOptions({ off: offText }),
    hint =
      ((_a = options.selectedTrack) == null ? void 0 : _a.label) ?? offText;
  if (options.disabled) return null;
  return React2.createElement(
    Root,
    { className: 'vds-captions-menu vds-menu' },
    React2.createElement(DefaultMenuButton, {
      label,
      hint,
      disabled: options.disabled,
      Icon: Icons.Menu.Captions,
    }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      slot(slots, 'captionsMenuItemsStart', null),
      React2.createElement(
        Root$1,
        {
          className: 'vds-captions-radio-group vds-radio-group',
          value: options.selectedValue,
        },
        options.map(({ label: label2, value, select }) =>
          React2.createElement(
            Item$1,
            {
              className: 'vds-caption-radio vds-radio',
              value,
              onSelect: select,
              key: value,
            },
            React2.createElement(Icons.Menu.RadioCheck, {
              className: 'vds-icon',
            }),
            React2.createElement(
              'span',
              { className: 'vds-radio-label' },
              label2
            )
          )
        )
      ),
      slot(slots, 'captionsMenuItemsEnd', null)
    )
  );
}
DefaultCaptionMenu.displayName = 'DefaultCaptionMenu';
function DefaultPlaybackMenu({ slots }) {
  const label = useDefaultLayoutWord('Playback'),
    { icons: Icons } = useDefaultLayoutContext();
  return React2.createElement(
    Root,
    { className: 'vds-playback-menu vds-menu' },
    React2.createElement(DefaultMenuButton, {
      label,
      Icon: Icons.Menu.Playback,
    }),
    React2.createElement(
      Items,
      { className: 'vds-menu-items' },
      slot(slots, 'playbackMenuItemsStart', null),
      React2.createElement(
        DefaultMenuSection,
        null,
        slot(
          slots,
          'playbackMenuLoop',
          React2.createElement(DefaultLoopMenuCheckbox, null)
        )
      ),
      React2.createElement(DefaultSpeedMenuSection, null),
      React2.createElement(DefaultQualityMenuSection, null),
      slot(slots, 'playbackMenuItemsEnd', null)
    )
  );
}
DefaultPlaybackMenu.displayName = 'DefaultPlaybackMenu';
function DefaultLoopMenuCheckbox() {
  const { remote } = useMediaContext2(),
    label = useDefaultLayoutWord('Loop');
  function onChange(checked, trigger) {
    remote.userPrefersLoopChange(checked, trigger);
  }
  return React2.createElement(
    DefaultMenuItem,
    { label },
    React2.createElement(DefaultMenuCheckbox, {
      label,
      storageKey: 'vds-player::user-loop',
      onChange,
    })
  );
}
DefaultLoopMenuCheckbox.displayName = 'DefaultLoopMenuCheckbox';
function DefaultAutoQualityMenuCheckbox() {
  const { remote, qualities } = useMediaContext2(),
    $autoQuality = useMediaState('autoQuality'),
    label = useDefaultLayoutWord('Auto');
  function onChange(checked, trigger) {
    if (checked) {
      remote.requestAutoQuality(trigger);
    } else {
      remote.changeQuality(qualities.selectedIndex, trigger);
    }
  }
  return React2.createElement(
    DefaultMenuItem,
    { label },
    React2.createElement(DefaultMenuCheckbox, {
      label,
      checked: $autoQuality,
      onChange,
      defaultChecked: $autoQuality,
    })
  );
}
DefaultAutoQualityMenuCheckbox.displayName = 'DefaultAutoQualityMenuCheckbox';
function DefaultQualityMenuSection() {
  const { hideQualityBitrate, icons: Icons } = useDefaultLayoutContext(),
    $canSetQuality = useMediaState('canSetQuality'),
    $qualities = useMediaState('qualities'),
    $quality = useMediaState('quality'),
    label = useDefaultLayoutWord('Quality'),
    autoText = useDefaultLayoutWord('Auto'),
    sortedQualities = React2.useMemo(
      () => sortVideoQualities($qualities),
      [$qualities]
    );
  if (!$canSetQuality || $qualities.length <= 1) return null;
  const height = $quality == null ? void 0 : $quality.height,
    bitrate = !hideQualityBitrate
      ? $quality == null
        ? void 0
        : $quality.bitrate
      : null,
    bitrateText =
      bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null,
    value = height
      ? `${height}p${bitrateText ? ` (${bitrateText})` : ''}`
      : autoText,
    isMin = sortedQualities[0] === $quality,
    isMax = sortedQualities.at(-1) === $quality;
  return React2.createElement(
    DefaultMenuSection,
    { label, value },
    React2.createElement(
      DefaultMenuSliderItem,
      {
        UpIcon: Icons.Menu.QualityUp,
        DownIcon: Icons.Menu.QualityDown,
        isMin,
        isMax,
      },
      React2.createElement(DefaultQualitySlider, null)
    ),
    React2.createElement(DefaultAutoQualityMenuCheckbox, null)
  );
}
DefaultQualityMenuSection.displayName = 'DefaultQualityMenuSection';
function DefaultQualitySlider() {
  const label = useDefaultLayoutWord('Quality');
  return React2.createElement(
    Root$32,
    { className: 'vds-quality-slider vds-slider', 'aria-label': label },
    React2.createElement(DefaultSliderParts, null),
    React2.createElement(DefaultSliderSteps, null)
  );
}
DefaultQualitySlider.displayName = 'DefaultQualitySlider';
function DefaultSpeedMenuSection() {
  const { icons: Icons } = useDefaultLayoutContext(),
    $playbackRate = useMediaState('playbackRate'),
    $canSetPlaybackRate = useMediaState('canSetPlaybackRate'),
    label = useDefaultLayoutWord('Speed'),
    normalText = useDefaultLayoutWord('Normal'),
    min = useSpeedMin(),
    max = useSpeedMax(),
    value = $playbackRate === 1 ? normalText : $playbackRate + 'x';
  if (!$canSetPlaybackRate) return null;
  return React2.createElement(
    DefaultMenuSection,
    { label, value },
    React2.createElement(
      DefaultMenuSliderItem,
      {
        UpIcon: Icons.Menu.SpeedUp,
        DownIcon: Icons.Menu.SpeedDown,
        isMin: $playbackRate === min,
        isMax: $playbackRate === max,
      },
      React2.createElement(DefaultSpeedSlider, null)
    )
  );
}
function useSpeedMin() {
  const { playbackRates } = useDefaultLayoutContext(),
    rates = playbackRates;
  return (isArray(rates) ? rates[0] : rates == null ? void 0 : rates.min) ?? 0;
}
function useSpeedMax() {
  const { playbackRates } = useDefaultLayoutContext(),
    rates = playbackRates;
  return (
    (isArray(rates)
      ? rates[rates.length - 1]
      : rates == null
      ? void 0
      : rates.max) ?? 2
  );
}
function useSpeedStep() {
  const { playbackRates } = useDefaultLayoutContext(),
    rates = playbackRates;
  return (
    (isArray(rates)
      ? rates[1] - rates[0]
      : rates == null
      ? void 0
      : rates.step) || 0.25
  );
}
function DefaultSpeedSlider() {
  const label = useDefaultLayoutWord('Speed'),
    min = useSpeedMin(),
    max = useSpeedMax(),
    step = useSpeedStep();
  return React2.createElement(
    Root$12,
    {
      className: 'vds-speed-slider vds-slider',
      'aria-label': label,
      min,
      max,
      step,
      keyStep: step,
    },
    React2.createElement(DefaultSliderParts, null),
    React2.createElement(DefaultSliderSteps, null)
  );
}
DefaultSpeedSlider.displayName = 'DefaultSpeedSlider';
function DefaultSettingsMenu({ tooltip, placement, portalClass = '', slots }) {
  const {
      showMenuDelay,
      icons: Icons,
      isSmallLayout,
      menuContainer,
      menuGroup,
      noModal,
      colorScheme,
    } = useDefaultLayoutContext(),
    settingsText = useDefaultLayoutWord('Settings'),
    $viewType = useMediaState('viewType'),
    $offset =
      !isSmallLayout && menuGroup === 'bottom' && $viewType === 'video'
        ? 26
        : 0,
    colorSchemeClass = useColorSchemeClass(colorScheme),
    [isOpen, setIsOpen] = React2.useState(false),
    dialogEl = useParentDialogEl();
  useScoped(updateFontCssVars);
  function onOpen() {
    (0, import_react_dom.flushSync)(() => {
      setIsOpen(true);
    });
  }
  function onClose() {
    setIsOpen(false);
  }
  const Content2 = React2.createElement(
    Items,
    {
      className: 'vds-settings-menu-items vds-menu-items',
      placement,
      offset: $offset,
    },
    isOpen
      ? React2.createElement(
          React2.Fragment,
          null,
          slot(slots, 'settingsMenuItemsStart', null),
          slot(slots, 'settingsMenuStartItems', null),
          React2.createElement(DefaultPlaybackMenu, { slots }),
          React2.createElement(DefaultAccessibilityMenu, { slots }),
          React2.createElement(DefaultAudioMenu, { slots }),
          React2.createElement(DefaultCaptionMenu, { slots }),
          slot(slots, 'settingsMenuEndItems', null),
          slot(slots, 'settingsMenuItemsEnd', null)
        )
      : null
  );
  return React2.createElement(
    Root,
    {
      className: 'vds-settings-menu vds-menu',
      showDelay: showMenuDelay,
      onOpen,
      onClose,
    },
    React2.createElement(
      DefaultTooltip,
      { content: settingsText, placement: tooltip },
      React2.createElement(
        Button,
        { className: 'vds-menu-button vds-button', 'aria-label': settingsText },
        React2.createElement(Icons.Menu.Settings, {
          className: 'vds-icon vds-rotate-icon',
        })
      )
    ),
    noModal || !isSmallLayout
      ? Content2
      : React2.createElement(
          Portal,
          {
            className:
              portalClass + (colorSchemeClass ? ` ${colorSchemeClass}` : ''),
            container: menuContainer ?? dialogEl,
            disabled: 'fullscreen',
            'data-sm': isSmallLayout ? '' : null,
            'data-lg': !isSmallLayout ? '' : null,
            'data-size': isSmallLayout ? 'sm' : 'lg',
            'data-view-type': $viewType,
          },
          Content2
        )
  );
}
DefaultSettingsMenu.displayName = 'DefaultSettingsMenu';
function DefaultVolumePopup({ tooltip, orientation, slots }) {
  const $pointer = useMediaState('pointer'),
    $muted = useMediaState('muted'),
    $canSetVolume = useMediaState('canSetVolume'),
    [rootEl, setRootEl] = React2.useState(null),
    isRootActive = useActive(rootEl),
    muteButton = slot(
      slots,
      'muteButton',
      React2.createElement(DefaultMuteButton, { tooltip })
    );
  if (!$canSetVolume) {
    return muteButton;
  }
  return $pointer === 'coarse' && !$muted
    ? null
    : React2.createElement(
        'div',
        {
          className: 'vds-volume',
          'data-active': isRootActive ? '' : null,
          ref: setRootEl,
        },
        muteButton,
        React2.createElement(
          'div',
          { className: 'vds-volume-popup' },
          slot(
            slots,
            'volumeSlider',
            React2.createElement(DefaultVolumeSlider, { orientation })
          )
        )
      );
}
DefaultVolumePopup.displayName = 'DefaultVolumePopup';
function DefaultVolumeSlider(props) {
  const label = useDefaultLayoutWord('Volume');
  return React2.createElement(
    Root$4,
    {
      className: 'vds-volume-slider vds-slider',
      'aria-label': label,
      ...props,
    },
    React2.createElement(Track, { className: 'vds-slider-track' }),
    React2.createElement(TrackFill, {
      className: 'vds-slider-track-fill vds-slider-track',
    }),
    React2.createElement(Thumb, { className: 'vds-slider-thumb' }),
    React2.createElement(
      Preview,
      { className: 'vds-slider-preview', noClamp: true },
      React2.createElement(Value, { className: 'vds-slider-value' })
    )
  );
}
DefaultVolumeSlider.displayName = 'DefaultVolumeSlider';
function DefaultTimeSlider() {
  const [instance, setInstance] = React2.useState(null),
    [width, setWidth] = React2.useState(0),
    $src = useMediaState('currentSrc'),
    {
      thumbnails,
      sliderChaptersMinWidth,
      disableTimeSlider,
      seekStep,
      noScrubGesture,
    } = useDefaultLayoutContext(),
    label = useDefaultLayoutWord('Seek'),
    $RemotionSliderThumbnail = useSignal(RemotionSliderThumbnail);
  const onResize = React2.useCallback(() => {
    const el = instance == null ? void 0 : instance.el;
    el && setWidth(el.clientWidth);
  }, [instance]);
  useResizeObserver(instance == null ? void 0 : instance.el, onResize);
  return React2.createElement(
    Root$2,
    {
      className: 'vds-time-slider vds-slider',
      'aria-label': label,
      disabled: disableTimeSlider,
      noSwipeGesture: noScrubGesture,
      keyStep: seekStep,
      ref: setInstance,
    },
    React2.createElement(
      Chapters,
      {
        className: 'vds-slider-chapters',
        disabled: width < sliderChaptersMinWidth,
      },
      (cues, forwardRef2) =>
        cues.map((cue) =>
          React2.createElement(
            'div',
            {
              className: 'vds-slider-chapter',
              key: cue.startTime,
              ref: forwardRef2,
            },
            React2.createElement(Track, { className: 'vds-slider-track' }),
            React2.createElement(TrackFill, {
              className: 'vds-slider-track-fill vds-slider-track',
            }),
            React2.createElement(Progress, {
              className: 'vds-slider-progress vds-slider-track',
            })
          )
        )
    ),
    React2.createElement(Thumb, { className: 'vds-slider-thumb' }),
    React2.createElement(
      Preview,
      { className: 'vds-slider-preview' },
      thumbnails
        ? React2.createElement(
            Thumbnail.Root,
            {
              src: thumbnails,
              className: 'vds-slider-thumbnail vds-thumbnail',
            },
            React2.createElement(Thumbnail.Img, null)
          )
        : $RemotionSliderThumbnail && isRemotionSrc($src)
        ? React2.createElement($RemotionSliderThumbnail, {
            className: 'vds-slider-thumbnail vds-thumbnail',
          })
        : null,
      React2.createElement(ChapterTitle, {
        className: 'vds-slider-chapter-title',
      }),
      React2.createElement(Value, { className: 'vds-slider-value' })
    )
  );
}
DefaultTimeSlider.displayName = 'DefaultTimeSlider';
function DefaultTimeGroup({ slots }) {
  const $duration = useMediaState('duration');
  if (!$duration) return null;
  return React2.createElement(
    'div',
    { className: 'vds-time-group' },
    slot(
      slots,
      'currentTime',
      React2.createElement(Time, { className: 'vds-time', type: 'current' })
    ),
    slot(
      slots,
      'timeSeparator',
      React2.createElement('div', { className: 'vds-time-divider' }, '/')
    ),
    slot(
      slots,
      'endTime',
      React2.createElement(Time, { className: 'vds-time', type: 'duration' })
    )
  );
}
DefaultTimeGroup.displayName = 'DefaultTimeGroup';
function DefaultTimeInfo({ slots }) {
  const $live = useMediaState('live');
  return $live
    ? slot(slots, 'liveButton', React2.createElement(DefaultLiveButton, null))
    : React2.createElement(DefaultTimeGroup, { slots });
}
DefaultTimeInfo.displayName = 'DefaultTimeInfo';
function DefaultTimeInvert({ slots }) {
  const $live = useMediaState('live'),
    $duration = useMediaState('duration');
  return $live
    ? slot(slots, 'liveButton', React2.createElement(DefaultLiveButton, null))
    : slot(
        slots,
        'endTime',
        $duration
          ? React2.createElement(Time, {
              className: 'vds-time',
              type: 'current',
              toggle: true,
              remainder: true,
            })
          : null
      );
}
DefaultTimeInvert.displayName = 'DefaultTimeInvert';
var MediaLayout$1 = createDefaultMediaLayout({
  type: 'audio',
  smLayoutWhen({ width }) {
    return width < 576;
  },
  renderLayout: () => React2.createElement(AudioLayout, null),
});
function DefaultAudioLayout(props) {
  const [scrubbing, setScrubbing] = React2.useState(false),
    $pointer = useMediaState('pointer');
  const onStartScrubbing = React2.useCallback((event) => {
    const { target } = event,
      hasTimeSlider = !!(
        target instanceof HTMLElement && target.closest('.vds-time-slider')
      );
    if (!hasTimeSlider) return;
    event.nativeEvent.stopImmediatePropagation();
    setScrubbing(true);
  }, []);
  const onStopScrubbing = React2.useCallback(() => {
    setScrubbing(false);
  }, []);
  React2.useEffect(() => {
    if (scrubbing) return listenEvent(window, 'pointerdown', onStopScrubbing);
  }, [scrubbing, onStopScrubbing]);
  return React2.createElement(MediaLayout$1, {
    ...props,
    'data-scrubbing': scrubbing ? '' : null,
    onPointerDown: scrubbing ? (e) => e.stopPropagation() : void 0,
    onPointerDownCapture:
      $pointer === 'coarse' && !scrubbing ? onStartScrubbing : void 0,
  });
}
DefaultAudioLayout.displayName = 'DefaultAudioLayout';
function AudioLayout() {
  const slots = useDefaultAudioLayoutSlots();
  useLayoutName('audio');
  return React2.createElement(
    React2.Fragment,
    null,
    React2.createElement(DefaultAnnouncer, null),
    React2.createElement(DefaultCaptions, null),
    React2.createElement(
      Root$52,
      { className: 'vds-controls' },
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(
          slots,
          'seekBackwardButton',
          React2.createElement(DefaultSeekButton, {
            backward: true,
            tooltip: 'top start',
          })
        ),
        slot(
          slots,
          'playButton',
          React2.createElement(DefaultPlayButton, { tooltip: 'top center' })
        ),
        slot(
          slots,
          'seekForwardButton',
          React2.createElement(DefaultSeekButton, { tooltip: 'top center' })
        ),
        React2.createElement(DefaultAudioTitle, null),
        slot(
          slots,
          'timeSlider',
          React2.createElement(DefaultTimeSlider, null)
        ),
        React2.createElement(DefaultTimeInvert, { slots }),
        React2.createElement(DefaultVolumePopup, {
          orientation: 'vertical',
          tooltip: 'top',
          slots,
        }),
        slot(
          slots,
          'captionButton',
          React2.createElement(DefaultCaptionButton, { tooltip: 'top center' })
        ),
        slot(
          slots,
          'downloadButton',
          React2.createElement(DefaultDownloadButton, null)
        ),
        React2.createElement(DefaultAudioMenus, { slots })
      )
    )
  );
}
AudioLayout.displayName = 'AudioLayout';
function DefaultAudioMenus({ slots }) {
  const { isSmallLayout, noModal } = useDefaultLayoutContext(),
    placement = noModal ? 'top end' : !isSmallLayout ? 'top end' : null;
  return React2.createElement(
    React2.Fragment,
    null,
    slot(
      slots,
      'chaptersMenu',
      React2.createElement(DefaultChaptersMenu, {
        tooltip: 'top',
        placement,
        portalClass: 'vds-audio-layout',
      })
    ),
    slot(
      slots,
      'settingsMenu',
      React2.createElement(DefaultSettingsMenu, {
        tooltip: 'top end',
        placement,
        portalClass: 'vds-audio-layout',
        slots,
      })
    )
  );
}
DefaultAudioMenus.displayName = 'DefaultAudioMenus';
function DefaultAudioTitle() {
  const [rootEl, setRootEl] = React2.useState(null),
    media = useMediaContext2(),
    { translations } = useDefaultLayoutContext(),
    [isTextOverflowing, setIsTextOverflowing] = React2.useState(false);
  const isContinued = createComputed(() => {
    const { started, currentTime } = media.$state;
    return started() || currentTime() > 0;
  });
  const $title = useSignal(
    createComputed(() => {
      const { title, ended } = media.$state;
      if (!title()) return '';
      const word = ended() ? 'Replay' : isContinued() ? 'Continue' : 'Play';
      return `${i18n(translations, word)}: ${title()}`;
    })
  );
  const chapterTitle = useChapterTitle(),
    $isContinued = useSignal(isContinued),
    $chapterTitle = $isContinued ? chapterTitle : '',
    isTransitionActive = useTransitionActive(rootEl);
  React2.useEffect(() => {
    var _a;
    if (isTransitionActive && document.activeElement === document.body) {
      (_a = media.player.el) == null
        ? void 0
        : _a.focus({ preventScroll: true });
    }
  }, []);
  const onResize = React2.useCallback(() => {
    const el = rootEl,
      isOverflowing =
        !!el &&
        !isTransitionActive &&
        el.clientWidth < el.children[0].clientWidth;
    if (el) toggleClass(el, 'vds-marquee', isOverflowing);
    setIsTextOverflowing(isOverflowing);
  }, [rootEl, isTransitionActive]);
  useResizeObserver(rootEl, onResize);
  return $title
    ? React2.createElement(
        'span',
        { className: 'vds-title', title: $title, ref: setRootEl },
        React2.createElement(AudioTitle, {
          title: $title,
          chapterTitle: $chapterTitle,
        }),
        isTextOverflowing && !isTransitionActive
          ? React2.createElement(AudioTitle, {
              title: $title,
              chapterTitle: $chapterTitle,
            })
          : null
      )
    : React2.createElement(DefaultControlsSpacer, null);
}
DefaultAudioTitle.displayName = 'DefaultAudioTitle';
function AudioTitle({ title, chapterTitle }) {
  const slots = useDefaultAudioLayoutSlots();
  return React2.createElement(
    'span',
    { className: 'vds-title-text' },
    slot(slots, 'title', title),
    slot(
      slots,
      'chapterTitle',
      React2.createElement(
        'span',
        { className: 'vds-chapter-title' },
        chapterTitle
      )
    )
  );
}
AudioTitle.displayName = 'AudioTitle';
var DefaultKeyboardDisplay = React2.forwardRef(
  ({ icons: Icons, ...props }, forwardRef2) => {
    const [visible, setVisible] = React2.useState(false),
      [Icon2, setIcon] = React2.useState(null),
      [count, setCount] = React2.useState(0),
      $lastKeyboardAction = useMediaState('lastKeyboardAction');
    React2.useEffect(() => {
      setCount((n) => n + 1);
    }, [$lastKeyboardAction]);
    const actionDataAttr = React2.useMemo(() => {
      const action =
        $lastKeyboardAction == null ? void 0 : $lastKeyboardAction.action;
      return action && visible ? camelToKebabCase(action) : null;
    }, [visible, $lastKeyboardAction]);
    const className = React2.useMemo(
      () =>
        `vds-kb-action${!visible ? ' hidden' : ''}${
          props.className ? ` ${props.className}` : ''
        }`,
      [visible]
    );
    const $$text = createComputed(getText),
      $text = useSignal($$text);
    createEffect(() => {
      const Icon22 = getIcon(Icons);
      setIcon(() => Icon22);
    }, [Icons]);
    React2.useEffect(() => {
      setVisible(!!$lastKeyboardAction);
      const id = setTimeout(() => setVisible(false), 500);
      return () => {
        setVisible(false);
        window.clearTimeout(id);
      };
    }, [$lastKeyboardAction]);
    return Icon2
      ? React2.createElement(
          Primitive.div,
          {
            ...props,
            className,
            'data-action': actionDataAttr,
            ref: forwardRef2,
          },
          React2.createElement(
            'div',
            { className: 'vds-kb-text-wrapper' },
            React2.createElement('div', { className: 'vds-kb-text' }, $text)
          ),
          React2.createElement(
            'div',
            { className: 'vds-kb-bezel', key: count },
            React2.createElement(
              'div',
              { className: 'vds-kb-icon' },
              React2.createElement(Icon2, null)
            )
          )
        )
      : null;
  }
);
DefaultKeyboardDisplay.displayName = 'DefaultKeyboardDisplay';
function getText() {
  var _a;
  const { $state } = useContext(mediaContext),
    action = (_a = $state.lastKeyboardAction()) == null ? void 0 : _a.action,
    audioGain = $state.audioGain() ?? 1;
  switch (action) {
    case 'toggleMuted':
      return $state.muted() ? '0%' : getVolumeText($state.volume(), audioGain);
    case 'volumeUp':
    case 'volumeDown':
      return getVolumeText($state.volume(), audioGain);
    default:
      return '';
  }
}
function getVolumeText(volume, gain) {
  return `${Math.round(volume * gain * 100)}%`;
}
function getIcon(Icons) {
  var _a;
  const { $state } = useContext(mediaContext),
    action = (_a = $state.lastKeyboardAction()) == null ? void 0 : _a.action;
  switch (action) {
    case 'togglePaused':
      return !$state.paused() ? Icons.Play : Icons.Pause;
    case 'toggleMuted':
      return $state.muted() || $state.volume() === 0
        ? Icons.Mute
        : $state.volume() >= 0.5
        ? Icons.VolumeUp
        : Icons.VolumeDown;
    case 'toggleFullscreen':
      return $state.fullscreen() ? Icons.EnterFullscreen : Icons.ExitFullscreen;
    case 'togglePictureInPicture':
      return $state.pictureInPicture() ? Icons.EnterPiP : Icons.ExitPiP;
    case 'toggleCaptions':
      return $state.hasCaptions()
        ? $state.textTrack()
          ? Icons.CaptionsOn
          : Icons.CaptionsOff
        : null;
    case 'volumeUp':
      return Icons.VolumeUp;
    case 'volumeDown':
      return Icons.VolumeDown;
    case 'seekForward':
      return Icons.SeekForward;
    case 'seekBackward':
      return Icons.SeekBackward;
    default:
      return null;
  }
}
function DefaultTitle() {
  const $started = useMediaState('started'),
    $title = useMediaState('title'),
    $hasChapters = useActiveTextTrack('chapters');
  return $hasChapters && ($started || !$title)
    ? React2.createElement(ChapterTitle2, { className: 'vds-chapter-title' })
    : React2.createElement(Title, { className: 'vds-chapter-title' });
}
DefaultTitle.displayName = 'DefaultTitle';
var MediaLayout = createDefaultMediaLayout({
  type: 'video',
  smLayoutWhen({ width, height }) {
    return width < 576 || height < 380;
  },
  renderLayout(props) {
    return React2.createElement(VideoLayout, { ...props });
  },
});
function DefaultVideoLayout(props) {
  return React2.createElement(MediaLayout, { ...props });
}
DefaultVideoLayout.displayName = 'DefaultVideoLayout';
function VideoLayout({ streamType, isLoadLayout, isSmallLayout }) {
  useLayoutName('video');
  return isLoadLayout
    ? React2.createElement(DefaultVideoLoadLayout, null)
    : streamType === 'unknown'
    ? React2.createElement(DefaultBufferingIndicator, null)
    : isSmallLayout
    ? React2.createElement(DefaultVideoSmallLayout, null)
    : React2.createElement(DefaultVideoLargeLayout, null);
}
VideoLayout.displayName = 'VideoLayout';
function DefaultVideoLargeLayout() {
  const { menuGroup } = useDefaultLayoutContext(),
    baseSlots = useDefaultVideoLayoutSlots(),
    slots = {
      ...baseSlots,
      ...(baseSlots == null ? void 0 : baseSlots.largeLayout),
    };
  return React2.createElement(
    React2.Fragment,
    null,
    React2.createElement(DefaultAnnouncer, null),
    React2.createElement(DefaultVideoGestures, null),
    React2.createElement(DefaultVideoKeyboardDisplay, null),
    slot(
      slots,
      'bufferingIndicator',
      React2.createElement(DefaultBufferingIndicator, null)
    ),
    slot(slots, 'captions', React2.createElement(DefaultCaptions, null)),
    React2.createElement(
      Root$52,
      { className: 'vds-controls' },
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(slots, 'topControlsGroupStart', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'topControlsGroupCenter', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'topControlsGroupEnd', null),
        menuGroup === 'top' &&
          React2.createElement(DefaultVideoMenus, { slots })
      ),
      React2.createElement(DefaultControlsSpacer, null),
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(slots, 'centerControlsGroupStart', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'centerControlsGroupCenter', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'centerControlsGroupEnd', null)
      ),
      React2.createElement(DefaultControlsSpacer, null),
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(slots, 'timeSlider', React2.createElement(DefaultTimeSlider, null))
      ),
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(
          slots,
          'playButton',
          React2.createElement(DefaultPlayButton, { tooltip: 'top start' })
        ),
        React2.createElement(DefaultVolumePopup, {
          orientation: 'horizontal',
          tooltip: 'top',
          slots,
        }),
        React2.createElement(DefaultTimeInfo, { slots }),
        slot(slots, 'chapterTitle', React2.createElement(DefaultTitle, null)),
        slot(
          slots,
          'captionButton',
          React2.createElement(DefaultCaptionButton, { tooltip: 'top' })
        ),
        menuGroup === 'bottom' &&
          React2.createElement(DefaultVideoMenus, { slots }),
        slot(
          slots,
          'airPlayButton',
          React2.createElement(DefaultAirPlayButton, { tooltip: 'top' })
        ),
        slot(
          slots,
          'googleCastButton',
          React2.createElement(DefaultGoogleCastButton, { tooltip: 'top' })
        ),
        slot(
          slots,
          'downloadButton',
          React2.createElement(DefaultDownloadButton, null)
        ),
        slot(
          slots,
          'pipButton',
          React2.createElement(DefaultPIPButton, { tooltip: 'top' })
        ),
        slot(
          slots,
          'fullscreenButton',
          React2.createElement(DefaultFullscreenButton, { tooltip: 'top end' })
        )
      )
    )
  );
}
DefaultVideoLargeLayout.displayName = 'DefaultVideoLargeLayout';
function DefaultVideoSmallLayout() {
  const baseSlots = useDefaultVideoLayoutSlots(),
    slots = {
      ...baseSlots,
      ...(baseSlots == null ? void 0 : baseSlots.smallLayout),
    };
  return React2.createElement(
    React2.Fragment,
    null,
    React2.createElement(DefaultAnnouncer, null),
    React2.createElement(DefaultVideoGestures, null),
    React2.createElement(DefaultVideoKeyboardDisplay, null),
    slot(
      slots,
      'bufferingIndicator',
      React2.createElement(DefaultBufferingIndicator, null)
    ),
    slot(slots, 'captions', React2.createElement(DefaultCaptions, null)),
    React2.createElement(
      Root$52,
      { className: 'vds-controls' },
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(slots, 'topControlsGroupStart', null),
        slot(
          slots,
          'airPlayButton',
          React2.createElement(DefaultAirPlayButton, { tooltip: 'top start' })
        ),
        slot(
          slots,
          'googleCastButton',
          React2.createElement(DefaultGoogleCastButton, {
            tooltip: 'top start',
          })
        ),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'topControlsGroupCenter', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(
          slots,
          'captionButton',
          React2.createElement(DefaultCaptionButton, { tooltip: 'bottom' })
        ),
        slot(
          slots,
          'downloadButton',
          React2.createElement(DefaultDownloadButton, null)
        ),
        React2.createElement(DefaultVideoMenus, { slots }),
        React2.createElement(DefaultVolumePopup, {
          orientation: 'vertical',
          tooltip: 'bottom end',
          slots,
        }),
        slot(slots, 'topControlsGroupEnd', null)
      ),
      React2.createElement(DefaultControlsSpacer, null),
      React2.createElement(
        Group,
        { className: 'vds-controls-group', style: { pointerEvents: 'none' } },
        slot(slots, 'centerControlsGroupStart', null),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'centerControlsGroupCenter', null),
        slot(
          slots,
          'playButton',
          React2.createElement(DefaultPlayButton, { tooltip: 'top' })
        ),
        React2.createElement(DefaultControlsSpacer, null),
        slot(slots, 'centerControlsGroupEnd', null)
      ),
      React2.createElement(DefaultControlsSpacer, null),
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        React2.createElement(DefaultTimeInfo, { slots }),
        slot(slots, 'chapterTitle', React2.createElement(DefaultTitle, null)),
        slot(
          slots,
          'fullscreenButton',
          React2.createElement(DefaultFullscreenButton, { tooltip: 'top end' })
        )
      ),
      React2.createElement(
        Group,
        { className: 'vds-controls-group' },
        slot(slots, 'timeSlider', React2.createElement(DefaultTimeSlider, null))
      )
    ),
    slot(
      slots,
      'startDuration',
      React2.createElement(DefaultVideoStartDuration, null)
    )
  );
}
DefaultVideoSmallLayout.displayName = 'DefaultVideoSmallLayout';
function DefaultVideoStartDuration() {
  const $duration = useMediaState('duration');
  if ($duration === 0) return null;
  return React2.createElement(
    'div',
    { className: 'vds-start-duration' },
    React2.createElement(Time, { className: 'vds-time', type: 'duration' })
  );
}
DefaultVideoStartDuration.displayName = 'DefaultVideoStartDuration';
function DefaultVideoGestures() {
  const { noGestures } = useDefaultLayoutContext();
  if (noGestures) return null;
  return React2.createElement(
    'div',
    { className: 'vds-gestures' },
    React2.createElement(Gesture, {
      className: 'vds-gesture',
      event: 'pointerup',
      action: 'toggle:paused',
    }),
    React2.createElement(Gesture, {
      className: 'vds-gesture',
      event: 'pointerup',
      action: 'toggle:controls',
    }),
    React2.createElement(Gesture, {
      className: 'vds-gesture',
      event: 'dblpointerup',
      action: 'toggle:fullscreen',
    }),
    React2.createElement(Gesture, {
      className: 'vds-gesture',
      event: 'dblpointerup',
      action: 'seek:-10',
    }),
    React2.createElement(Gesture, {
      className: 'vds-gesture',
      event: 'dblpointerup',
      action: 'seek:10',
    })
  );
}
DefaultVideoGestures.displayName = 'DefaultVideoGestures';
function DefaultBufferingIndicator() {
  return React2.createElement(
    'div',
    { className: 'vds-buffering-indicator' },
    React2.createElement(
      Root2,
      { className: 'vds-buffering-spinner' },
      React2.createElement(Track2, { className: 'vds-buffering-track' }),
      React2.createElement(TrackFill2, {
        className: 'vds-buffering-track-fill',
      })
    )
  );
}
DefaultBufferingIndicator.displayName = 'DefaultBufferingIndicator';
function DefaultVideoMenus({ slots }) {
  const { isSmallLayout, noModal, menuGroup } = useDefaultLayoutContext(),
    side = menuGroup === 'top' || isSmallLayout ? 'bottom' : 'top',
    tooltip = `${side} end`,
    placement = noModal ? `${side} end` : !isSmallLayout ? `${side} end` : null;
  return React2.createElement(
    React2.Fragment,
    null,
    slot(
      slots,
      'chaptersMenu',
      React2.createElement(DefaultChaptersMenu, {
        tooltip,
        placement,
        portalClass: 'vds-video-layout',
      })
    ),
    slot(
      slots,
      'settingsMenu',
      React2.createElement(DefaultSettingsMenu, {
        tooltip,
        placement,
        portalClass: 'vds-video-layout',
        slots,
      })
    )
  );
}
DefaultVideoMenus.displayName = 'DefaultVideoMenus';
function DefaultVideoLoadLayout() {
  const { isSmallLayout } = useDefaultLayoutContext(),
    baseSlots = useDefaultVideoLayoutSlots(),
    slots = {
      ...baseSlots,
      ...(baseSlots == null
        ? void 0
        : baseSlots[isSmallLayout ? 'smallLayout' : 'largeLayout']),
    };
  return React2.createElement(
    'div',
    { className: 'vds-load-container' },
    slot(
      slots,
      'bufferingIndicator',
      React2.createElement(DefaultBufferingIndicator, null)
    ),
    slot(
      slots,
      'loadButton',
      React2.createElement(DefaultPlayButton, { tooltip: 'top' })
    )
  );
}
DefaultVideoLoadLayout.displayName = 'DefaultVideoLoadLayout';
function DefaultVideoKeyboardDisplay() {
  const { noKeyboardAnimations, icons, userPrefersKeyboardAnimations } =
      useDefaultLayoutContext(),
    $userPrefersKeyboardAnimations = useSignal(userPrefersKeyboardAnimations),
    disabled = noKeyboardAnimations || !$userPrefersKeyboardAnimations;
  if (disabled || !icons.KeyboardDisplay) return null;
  return React2.createElement(DefaultKeyboardDisplay, {
    icons: icons.KeyboardDisplay,
  });
}
DefaultVideoKeyboardDisplay.displayName = 'DefaultVideoKeyboardDisplay';

// ../../node_modules/@vidstack/react/dev/player/vidstack-default-icons.js
var React3 = __toESM(require_react(), 1);
function createIcon(paths) {
  function DefaultLayoutIcon(props) {
    return React3.createElement(Icon, { paths, ...props });
  }
  DefaultLayoutIcon.displayName = 'DefaultLayoutIcon';
  return DefaultLayoutIcon;
}
var defaultLayoutIcons = {
  AirPlayButton: {
    Default: createIcon(Icon$5),
  },
  GoogleCastButton: {
    Default: createIcon(Icon$24),
  },
  PlayButton: {
    Play: createIcon(Icon$62),
    Pause: createIcon(Icon$59),
    Replay: createIcon(Icon$74),
  },
  MuteButton: {
    Mute: createIcon(Icon$54),
    VolumeLow: createIcon(Icon$105),
    VolumeHigh: createIcon(Icon$104),
  },
  CaptionButton: {
    On: createIcon(Icon$26),
    Off: createIcon(Icon$27),
  },
  PIPButton: {
    Enter: createIcon(Icon$61),
    Exit: createIcon(Icon$60),
  },
  FullscreenButton: {
    Enter: createIcon(Icon$40),
    Exit: createIcon(Icon$39),
  },
  SeekButton: {
    Backward: createIcon(Icon$77),
    Forward: createIcon(Icon$81),
  },
  DownloadButton: {
    Default: createIcon(Icon$31),
  },
  Menu: {
    Accessibility: createIcon(Icon$0),
    ArrowLeft: createIcon(Icon$11),
    ArrowRight: createIcon(Icon$22),
    Audio: createIcon(Icon$53),
    Chapters: createIcon(Icon$16),
    Captions: createIcon(Icon$27),
    Playback: createIcon(Icon$63),
    Settings: createIcon(Icon$88),
    AudioBoostUp: createIcon(Icon$104),
    AudioBoostDown: createIcon(Icon$105),
    SpeedUp: createIcon(Icon$35),
    SpeedDown: createIcon(Icon$34),
    QualityUp: createIcon(Icon$13),
    QualityDown: createIcon(Icon$8),
    FontSizeUp: createIcon(Icon$13),
    FontSizeDown: createIcon(Icon$8),
    OpacityUp: createIcon(Icon$33),
    OpacityDown: createIcon(Icon$56),
    RadioCheck: createIcon(Icon$19),
  },
  KeyboardDisplay: {
    Play: createIcon(Icon$62),
    Pause: createIcon(Icon$59),
    Mute: createIcon(Icon$54),
    VolumeUp: createIcon(Icon$104),
    VolumeDown: createIcon(Icon$105),
    EnterFullscreen: createIcon(Icon$40),
    ExitFullscreen: createIcon(Icon$39),
    EnterPiP: createIcon(Icon$61),
    ExitPiP: createIcon(Icon$60),
    CaptionsOn: createIcon(Icon$26),
    CaptionsOff: createIcon(Icon$27),
    SeekForward: createIcon(Icon$35),
    SeekBackward: createIcon(Icon$34),
  },
};

// ../../node_modules/@vidstack/react/dev/player/vidstack-default-layout.js
var import_react = __toESM(require_react());
var import_react_dom2 = __toESM(require_react_dom());
export {
  DefaultAudioLayout,
  DefaultBufferingIndicator,
  DefaultKeyboardDisplay,
  DefaultLayoutContext,
  DefaultMenuButton,
  DefaultMenuCheckbox,
  DefaultMenuItem,
  DefaultMenuRadioGroup,
  DefaultMenuSection,
  DefaultMenuSliderItem,
  DefaultSliderParts,
  DefaultSliderSteps,
  DefaultTooltip,
  DefaultVideoGestures,
  DefaultVideoLargeLayout,
  DefaultVideoLayout,
  DefaultVideoSmallLayout,
  createRadioOptions,
  defaultLayoutIcons,
  i18n,
  useDefaultLayoutContext,
  useDefaultLayoutWord,
};
//# sourceMappingURL=@vidstack_react_player_layouts_default.js.map
