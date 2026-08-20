'use client';
import { EmbedProvider } from './chunk-NC2U644D.js';
import { resolveYouTubeVideoId } from './chunk-7GLVTHO3.js';
import { TimeRange, preconnect } from './chunk-AB3KZNRI.js';
import {
  createScope,
  deferredPromise,
  effect,
  isBoolean,
  isNumber,
  isObject,
  isString,
  signal,
} from './chunk-KJZMXNFV.js';
import './chunk-Y4QXJQIJ.js';
import { require_react } from './chunk-QBXGYTN6.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
  __toESM,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-Breph70c.js
var import_react = __toESM(require_react(), 1);
var YouTubePlayerState = {
  Unstarted: -1,
  Ended: 0,
  Playing: 1,
  Paused: 2,
  Buffering: 3,
  Cued: 5,
};
var _ctx,
  _videoId,
  _state,
  _currentSrc,
  _seekingTimer,
  _invalidPlay,
  _promises,
  _YouTubeProvider_instances,
  playFail_fn,
  pauseFail_fn,
  watchVideoId_fn,
  remote_fn,
  onReady_fn,
  onPause_fn,
  onTimeUpdate_fn,
  onProgress_fn,
  onSeeked_fn,
  onEnded_fn,
  onStateChange_fn,
  reset_fn,
  getPromise_fn,
  isPending_fn;
var YouTubeProvider = class extends EmbedProvider {
  constructor(iframe, ctx) {
    super(iframe);
    __privateAdd(this, _YouTubeProvider_instances);
    __publicField(this, '$$PROVIDER_TYPE', 'YOUTUBE');
    __publicField(this, 'scope', createScope());
    __privateAdd(this, _ctx);
    __privateAdd(this, _videoId, signal(''));
    __privateAdd(this, _state, -1);
    __privateAdd(this, _currentSrc, null);
    __privateAdd(this, _seekingTimer, -1);
    __privateAdd(this, _invalidPlay, false);
    __privateAdd(this, _promises, /* @__PURE__ */ new Map());
    /**
     * Sets the player's interface language. The parameter value is an ISO 639-1 two-letter
     * language code or a fully specified locale. For example, fr and fr-ca are both valid values.
     * Other language input codes, such as IETF language tags (BCP 47) might also be handled properly.
     *
     * The interface language is used for tooltips in the player and also affects the default caption
     * track. Note that YouTube might select a different caption track language for a particular
     * user based on the user's individual language preferences and the availability of caption tracks.
     *
     * @defaultValue 'en'
     */
    __publicField(this, 'language', 'en');
    __publicField(this, 'color', 'red');
    /**
     * Whether cookies should be enabled on the embed. This is turned off by default to be
     * GDPR-compliant.
     *
     * @defaultValue `false`
     */
    __publicField(this, 'cookies', false);
    __privateSet(this, _ctx, ctx);
  }
  get currentSrc() {
    return __privateGet(this, _currentSrc);
  }
  get type() {
    return 'youtube';
  }
  get videoId() {
    return __privateGet(this, _videoId).call(this);
  }
  preconnect() {
    preconnect(this.getOrigin());
  }
  setup() {
    super.setup();
    effect(
      __privateMethod(this, _YouTubeProvider_instances, watchVideoId_fn).bind(
        this
      )
    );
    __privateGet(this, _ctx).notify('provider-setup', this);
  }
  destroy() {
    __privateMethod(this, _YouTubeProvider_instances, reset_fn).call(this);
    const message = 'provider destroyed';
    for (const promises of __privateGet(this, _promises).values()) {
      for (const { reject } of promises) reject(message);
    }
    __privateGet(this, _promises).clear();
  }
  async play() {
    return __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
      this,
      'playVideo'
    );
  }
  async pause() {
    return __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
      this,
      'pauseVideo'
    );
  }
  setMuted(muted) {
    if (muted)
      __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
        this,
        'mute'
      );
    else
      __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
        this,
        'unMute'
      );
  }
  setCurrentTime(time) {
    __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
      this,
      'seekTo',
      time
    );
    __privateGet(this, _ctx).notify('seeking', time);
  }
  setVolume(volume) {
    __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
      this,
      'setVolume',
      volume * 100
    );
  }
  setPlaybackRate(rate) {
    __privateMethod(this, _YouTubeProvider_instances, remote_fn).call(
      this,
      'setPlaybackRate',
      rate
    );
  }
  async loadSource(src) {
    if (!isString(src.src)) {
      __privateSet(this, _currentSrc, null);
      __privateGet(this, _videoId).set('');
      return;
    }
    const videoId = resolveYouTubeVideoId(src.src);
    __privateGet(this, _videoId).set(videoId ?? '');
    __privateSet(this, _currentSrc, src);
  }
  getOrigin() {
    return !this.cookies
      ? 'https://www.youtube-nocookie.com'
      : 'https://www.youtube.com';
  }
  buildParams() {
    const { keyDisabled } = __privateGet(this, _ctx).$props,
      { muted, playsInline, nativeControls } = __privateGet(this, _ctx).$state,
      showControls = nativeControls();
    return {
      autoplay: 0,
      cc_lang_pref: this.language,
      cc_load_policy: showControls ? 1 : void 0,
      color: this.color,
      controls: showControls ? 1 : 0,
      disablekb: !showControls || keyDisabled() ? 1 : 0,
      enablejsapi: 1,
      fs: 1,
      hl: this.language,
      iv_load_policy: showControls ? 1 : 3,
      mute: muted() ? 1 : 0,
      playsinline: playsInline() ? 1 : 0,
    };
  }
  onLoad() {
    window.setTimeout(() => this.postMessage({ event: 'listening' }), 100);
  }
  onMessage({ info }, event) {
    var _a;
    if (!info) return;
    const { title, intrinsicDuration, playbackRate } = __privateGet(
      this,
      _ctx
    ).$state;
    if (isObject(info.videoData) && info.videoData.title !== title()) {
      __privateGet(this, _ctx).notify(
        'title-change',
        info.videoData.title,
        event
      );
    }
    if (isNumber(info.duration) && info.duration !== intrinsicDuration()) {
      if (isNumber(info.videoLoadedFraction)) {
        const buffered =
            ((_a = info.progressState) == null ? void 0 : _a.loaded) ??
            info.videoLoadedFraction * info.duration,
          seekable = new TimeRange(0, info.duration);
        __privateMethod(this, _YouTubeProvider_instances, onProgress_fn).call(
          this,
          buffered,
          seekable,
          event
        );
      }
      __privateGet(this, _ctx).notify('duration-change', info.duration, event);
    }
    if (isNumber(info.playbackRate) && info.playbackRate !== playbackRate()) {
      __privateGet(this, _ctx).notify('rate-change', info.playbackRate, event);
    }
    if (info.progressState) {
      const { current, seekableStart, seekableEnd, loaded, duration } =
        info.progressState;
      __privateMethod(this, _YouTubeProvider_instances, onTimeUpdate_fn).call(
        this,
        current,
        event
      );
      __privateMethod(this, _YouTubeProvider_instances, onProgress_fn).call(
        this,
        loaded,
        new TimeRange(seekableStart, seekableEnd),
        event
      );
      if (duration !== intrinsicDuration()) {
        __privateGet(this, _ctx).notify('duration-change', duration, event);
      }
    }
    if (
      isNumber(info.volume) &&
      isBoolean(info.muted) &&
      !__privateGet(this, _invalidPlay)
    ) {
      const detail = {
        muted: info.muted,
        volume: info.volume / 100,
      };
      __privateGet(this, _ctx).notify('volume-change', detail, event);
    }
    if (
      isNumber(info.playerState) &&
      info.playerState !== __privateGet(this, _state)
    ) {
      __privateMethod(this, _YouTubeProvider_instances, onStateChange_fn).call(
        this,
        info.playerState,
        event
      );
    }
  }
};
_ctx = new WeakMap();
_videoId = new WeakMap();
_state = new WeakMap();
_currentSrc = new WeakMap();
_seekingTimer = new WeakMap();
_invalidPlay = new WeakMap();
_promises = new WeakMap();
_YouTubeProvider_instances = new WeakSet();
playFail_fn = function (message) {
  var _a;
  (_a = __privateMethod(this, _YouTubeProvider_instances, getPromise_fn).call(
    this,
    'playVideo'
  )) == null
    ? void 0
    : _a.reject(message);
};
pauseFail_fn = function (message) {
  var _a;
  (_a = __privateMethod(this, _YouTubeProvider_instances, getPromise_fn).call(
    this,
    'pauseVideo'
  )) == null
    ? void 0
    : _a.reject(message);
};
watchVideoId_fn = function () {
  __privateMethod(this, _YouTubeProvider_instances, reset_fn).call(this);
  const videoId = __privateGet(this, _videoId).call(this);
  if (!videoId) {
    this.src.set('');
    return;
  }
  this.src.set(`${this.getOrigin()}/embed/${videoId}`);
  __privateGet(this, _ctx).notify('load-start');
};
remote_fn = function (command, arg) {
  let promise = deferredPromise(),
    promises = __privateGet(this, _promises).get(command);
  if (!promises) __privateGet(this, _promises).set(command, (promises = []));
  promises.push(promise);
  this.postMessage({
    event: 'command',
    func: command,
    args: arg ? [arg] : void 0,
  });
  return promise.promise;
};
onReady_fn = function (trigger) {
  __privateGet(this, _ctx).notify('loaded-metadata');
  __privateGet(this, _ctx).notify('loaded-data');
  __privateGet(this, _ctx).delegate.ready(void 0, trigger);
};
onPause_fn = function (trigger) {
  var _a;
  (_a = __privateMethod(this, _YouTubeProvider_instances, getPromise_fn).call(
    this,
    'pauseVideo'
  )) == null
    ? void 0
    : _a.resolve();
  __privateGet(this, _ctx).notify('pause', void 0, trigger);
};
onTimeUpdate_fn = function (time, trigger) {
  const { duration, realCurrentTime } = __privateGet(this, _ctx).$state,
    hasEnded = __privateGet(this, _state) === YouTubePlayerState.Ended,
    boundTime = hasEnded ? duration() : time;
  __privateGet(this, _ctx).notify('time-change', boundTime, trigger);
  if (!hasEnded && Math.abs(boundTime - realCurrentTime()) > 1) {
    __privateGet(this, _ctx).notify('seeking', boundTime, trigger);
  }
};
onProgress_fn = function (buffered, seekable, trigger) {
  const detail = {
    buffered: new TimeRange(0, buffered),
    seekable,
  };
  __privateGet(this, _ctx).notify('progress', detail, trigger);
  const { seeking, realCurrentTime } = __privateGet(this, _ctx).$state;
  if (seeking() && buffered > realCurrentTime()) {
    __privateMethod(this, _YouTubeProvider_instances, onSeeked_fn).call(
      this,
      trigger
    );
  }
};
onSeeked_fn = function (trigger) {
  const { paused, realCurrentTime } = __privateGet(this, _ctx).$state;
  window.clearTimeout(__privateGet(this, _seekingTimer));
  __privateSet(
    this,
    _seekingTimer,
    window.setTimeout(
      () => {
        __privateGet(this, _ctx).notify('seeked', realCurrentTime(), trigger);
        __privateSet(this, _seekingTimer, -1);
      },
      paused() ? 100 : 0
    )
  );
};
onEnded_fn = function (trigger) {
  const { seeking } = __privateGet(this, _ctx).$state;
  if (seeking())
    __privateMethod(this, _YouTubeProvider_instances, onSeeked_fn).call(
      this,
      trigger
    );
  __privateGet(this, _ctx).notify('pause', void 0, trigger);
  __privateGet(this, _ctx).notify('end', void 0, trigger);
};
onStateChange_fn = function (state, trigger) {
  var _a;
  const { paused, seeking } = __privateGet(this, _ctx).$state,
    isPlaying = state === YouTubePlayerState.Playing,
    isBuffering = state === YouTubePlayerState.Buffering,
    isPendingPlay = __privateMethod(
      this,
      _YouTubeProvider_instances,
      isPending_fn
    ).call(this, 'playVideo'),
    isPlay = paused() && (isBuffering || isPlaying);
  if (isBuffering) __privateGet(this, _ctx).notify('waiting', void 0, trigger);
  if (seeking() && isPlaying) {
    __privateMethod(this, _YouTubeProvider_instances, onSeeked_fn).call(
      this,
      trigger
    );
  }
  if (__privateGet(this, _invalidPlay) && isPlaying) {
    this.pause();
    __privateSet(this, _invalidPlay, false);
    this.setMuted(__privateGet(this, _ctx).$state.muted());
    return;
  }
  if (!isPendingPlay && isPlay) {
    __privateSet(this, _invalidPlay, true);
    this.setMuted(true);
    return;
  }
  if (isPlay) {
    (_a = __privateMethod(this, _YouTubeProvider_instances, getPromise_fn).call(
      this,
      'playVideo'
    )) == null
      ? void 0
      : _a.resolve();
    __privateGet(this, _ctx).notify('play', void 0, trigger);
  }
  switch (state) {
    case YouTubePlayerState.Cued:
      __privateMethod(this, _YouTubeProvider_instances, onReady_fn).call(
        this,
        trigger
      );
      break;
    case YouTubePlayerState.Playing:
      __privateGet(this, _ctx).notify('playing', void 0, trigger);
      break;
    case YouTubePlayerState.Paused:
      __privateMethod(this, _YouTubeProvider_instances, onPause_fn).call(
        this,
        trigger
      );
      break;
    case YouTubePlayerState.Ended:
      __privateMethod(this, _YouTubeProvider_instances, onEnded_fn).call(
        this,
        trigger
      );
      break;
  }
  __privateSet(this, _state, state);
};
reset_fn = function () {
  __privateSet(this, _state, -1);
  __privateSet(this, _seekingTimer, -1);
  __privateSet(this, _invalidPlay, false);
};
getPromise_fn = function (command) {
  var _a;
  return (_a = __privateGet(this, _promises).get(command)) == null
    ? void 0
    : _a.shift();
};
isPending_fn = function (command) {
  var _a;
  return Boolean(
    (_a = __privateGet(this, _promises).get(command)) == null
      ? void 0
      : _a.length
  );
};
export { YouTubeProvider };
//# sourceMappingURL=vidstack-Breph70c-MIHHRUTJ.js.map
