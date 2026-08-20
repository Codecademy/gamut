import {
  Component,
  DOMEvent,
  EventsController,
  EventsTarget,
  State,
  ViewController,
  animationFrameThrottle,
  ariaBool,
  camelToKebabCase,
  composeRefs,
  computed,
  createContext,
  createScope,
  deferredPromise,
  effect,
  fscreen,
  functionDebounce,
  functionThrottle,
  getScope,
  hasProvidedContext,
  isArray,
  isBoolean,
  isDOMNode,
  isFunction,
  isKeyboardClick,
  isKeyboardEvent,
  isMouseEvent,
  isNil,
  isNull,
  isNumber,
  isObject,
  isPointerEvent,
  isString,
  isTouchEvent,
  isUndefined,
  isWriteSignal,
  kebabToCamelCase,
  listenEvent,
  method,
  noop,
  onDispose,
  peek,
  prop,
  provideContext,
  r,
  scoped,
  setAttribute,
  setStyle,
  signal,
  tick,
  untrack,
  uppercaseFirstChar,
  useContext,
  useSignal,
  useSignalRecord,
  useState,
  useStateContext,
  waitIdlePeriod,
  waitTimeout,
  wasEnterKeyPressed,
} from './chunk-KJZMXNFV.js';
import { autoUpdate, computePosition, flip, shift } from './chunk-Y4QXJQIJ.js';
import { require_react } from './chunk-QBXGYTN6.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __privateWrapper,
  __publicField,
  __toESM,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-C-WrcxmD.js
var React = __toESM(require_react(), 1);
function isVideoQualitySrc(src) {
  return (
    !isString(src) &&
    'width' in src &&
    'height' in src &&
    isNumber(src.width) &&
    isNumber(src.height)
  );
}
var IS_SERVER = typeof document === 'undefined';
var UA = IS_SERVER
  ? ''
  : (navigator == null ? void 0 : navigator.userAgent.toLowerCase()) || '';
var IS_IOS = !IS_SERVER && /iphone|ipad|ipod|ios|crios|fxios/i.test(UA);
var IS_IPHONE =
  !IS_SERVER &&
  /(iphone|ipod)/gi.test(
    (navigator == null ? void 0 : navigator.platform) || ''
  );
var IS_CHROME = !IS_SERVER && !!window.chrome;
var IS_SAFARI = !IS_SERVER && (!!window.safari || IS_IOS);
function canOrientScreen() {
  return canRotateScreen() && isFunction(screen.orientation.unlock);
}
function canRotateScreen() {
  return (
    !IS_SERVER &&
    !isUndefined(window.screen.orientation) &&
    !isUndefined(window.screen.orientation.lock)
  );
}
function canPlayAudioType(audio, type) {
  if (IS_SERVER) return false;
  if (!audio) audio = document.createElement('audio');
  return audio.canPlayType(type).length > 0;
}
function canPlayVideoType(video, type) {
  if (IS_SERVER) return false;
  if (!video) video = document.createElement('video');
  return video.canPlayType(type).length > 0;
}
function canPlayHLSNatively(video) {
  if (IS_SERVER) return false;
  if (!video) video = document.createElement('video');
  return video.canPlayType('application/vnd.apple.mpegurl').length > 0;
}
function canUsePictureInPicture(video) {
  if (IS_SERVER) return false;
  return (
    !!document.pictureInPictureEnabled &&
    !(video == null ? void 0 : video.disablePictureInPicture)
  );
}
function canUseVideoPresentation(video) {
  if (IS_SERVER) return false;
  return (
    isFunction(video == null ? void 0 : video.webkitSupportsPresentationMode) &&
    isFunction(video == null ? void 0 : video.webkitSetPresentationMode)
  );
}
async function canChangeVolume() {
  const video = document.createElement('video');
  video.volume = 0.5;
  await waitTimeout(0);
  return video.volume === 0.5;
}
function getMediaSource() {
  return IS_SERVER
    ? void 0
    : (window == null ? void 0 : window.ManagedMediaSource) ??
        (window == null ? void 0 : window.MediaSource) ??
        (window == null ? void 0 : window.WebKitMediaSource);
}
function getSourceBuffer() {
  return IS_SERVER
    ? void 0
    : (window == null ? void 0 : window.SourceBuffer) ??
        (window == null ? void 0 : window.WebKitSourceBuffer);
}
function isHLSSupported() {
  if (IS_SERVER) return false;
  const MediaSource = getMediaSource();
  if (isUndefined(MediaSource)) return false;
  const isTypeSupported =
    MediaSource &&
    isFunction(MediaSource.isTypeSupported) &&
    MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
  const SourceBuffer = getSourceBuffer();
  const isSourceBufferValid =
    isUndefined(SourceBuffer) ||
    (!isUndefined(SourceBuffer.prototype) &&
      isFunction(SourceBuffer.prototype.appendBuffer) &&
      isFunction(SourceBuffer.prototype.remove));
  return !!isTypeSupported && !!isSourceBufferValid;
}
function isDASHSupported() {
  return isHLSSupported();
}
var _ranges;
var TimeRange = class {
  constructor(start, end) {
    __privateAdd(this, _ranges);
    if (isArray(start)) {
      __privateSet(this, _ranges, start);
    } else if (!isUndefined(start) && !isUndefined(end)) {
      __privateSet(this, _ranges, [[start, end]]);
    } else {
      __privateSet(this, _ranges, []);
    }
  }
  get length() {
    return __privateGet(this, _ranges).length;
  }
  start(index) {
    throwIfEmpty(__privateGet(this, _ranges).length);
    throwIfOutOfRange('start', index, __privateGet(this, _ranges).length - 1);
    return __privateGet(this, _ranges)[index][0] ?? Infinity;
  }
  end(index) {
    throwIfEmpty(__privateGet(this, _ranges).length);
    throwIfOutOfRange('end', index, __privateGet(this, _ranges).length - 1);
    return __privateGet(this, _ranges)[index][1] ?? Infinity;
  }
};
_ranges = new WeakMap();
function getTimeRangesStart(range) {
  if (!range.length) return null;
  let min = range.start(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.start(i);
    if (value < min) min = value;
  }
  return min;
}
function getTimeRangesEnd(range) {
  if (!range.length) return null;
  let max = range.end(0);
  for (let i = 1; i < range.length; i++) {
    const value = range.end(i);
    if (value > max) max = value;
  }
  return max;
}
function throwIfEmpty(length) {
  if (!length) throw new Error('`TimeRanges` object is empty.');
}
function throwIfOutOfRange(fnName, index, end) {
  if (!isNumber(index) || index < 0 || index > end) {
    throw new Error(
      `Failed to execute '${fnName}' on 'TimeRanges': The index provided (${index}) is non-numeric or out of bounds (0-${end}).`
    );
  }
}
function normalizeTimeIntervals(intervals) {
  if (intervals.length <= 1) {
    return intervals;
  }
  intervals.sort((a, b) => a[0] - b[0]);
  let normalized = [],
    current = intervals[0];
  for (let i = 1; i < intervals.length; i++) {
    const next = intervals[i];
    if (current[1] >= next[0] - 1) {
      current = [current[0], Math.max(current[1], next[1])];
    } else {
      normalized.push(current);
      current = next;
    }
  }
  normalized.push(current);
  return normalized;
}
function updateTimeIntervals(intervals, interval, value) {
  let start = interval[0],
    end = interval[1];
  if (value < start) {
    return [value, -1];
  } else if (value === start) {
    return interval;
  } else if (start === -1) {
    interval[0] = value;
    return interval;
  } else if (value > start) {
    interval[1] = value;
    if (end === -1) intervals.push(interval);
  }
  normalizeTimeIntervals(intervals);
  return interval;
}
var AUDIO_EXTENSIONS =
  /\.(m4a|m4b|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx|flac)($|\?)/i;
var AUDIO_TYPES = /* @__PURE__ */ new Set([
  'audio/mpeg',
  'audio/ogg',
  'audio/3gp',
  'audio/mp3',
  'audio/webm',
  'audio/flac',
  'audio/m4a',
  'audio/m4b',
  'audio/mp4a',
  'audio/mp4',
]);
var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;
var VIDEO_TYPES = /* @__PURE__ */ new Set([
  'video/mp4',
  'video/webm',
  'video/3gp',
  'video/ogg',
  'video/avi',
  'video/mpeg',
]);
var HLS_VIDEO_EXTENSIONS = /\.(m3u8)($|\?)/i;
var DASH_VIDEO_EXTENSIONS = /\.(mpd)($|\?)/i;
var HLS_VIDEO_TYPES = /* @__PURE__ */ new Set([
  // Apple sanctioned
  'application/vnd.apple.mpegurl',
  // Apple sanctioned for backwards compatibility
  'audio/mpegurl',
  // Very common
  'audio/x-mpegurl',
  // Very common
  'application/x-mpegurl',
  // Included for completeness
  'video/x-mpegurl',
  'video/mpegurl',
  'application/mpegurl',
]);
var DASH_VIDEO_TYPES = /* @__PURE__ */ new Set(['application/dash+xml']);
function isAudioSrc({ src, type }) {
  return isString(src)
    ? AUDIO_EXTENSIONS.test(src) ||
        AUDIO_TYPES.has(type) ||
        (src.startsWith('blob:') && type === 'audio/object')
    : type === 'audio/object';
}
function isVideoSrc(src) {
  return isString(src.src)
    ? VIDEO_EXTENSIONS.test(src.src) ||
        VIDEO_TYPES.has(src.type) ||
        (src.src.startsWith('blob:') && src.type === 'video/object') ||
        (isHLSSrc(src) && (IS_SERVER || canPlayHLSNatively()))
    : src.type === 'video/object';
}
function isHLSSrc({ src, type }) {
  return (
    (isString(src) && HLS_VIDEO_EXTENSIONS.test(src)) ||
    HLS_VIDEO_TYPES.has(type)
  );
}
function isDASHSrc({ src, type }) {
  return (
    (isString(src) && DASH_VIDEO_EXTENSIONS.test(src)) ||
    DASH_VIDEO_TYPES.has(type)
  );
}
function canGoogleCastSrc(src) {
  return (
    isString(src.src) && (isAudioSrc(src) || isVideoSrc(src) || isHLSSrc(src))
  );
}
function isMediaStream(src) {
  return (
    !IS_SERVER &&
    typeof window.MediaStream !== 'undefined' &&
    src instanceof window.MediaStream
  );
}
function appendParamsToURL(baseUrl, params) {
  const url = new URL(baseUrl);
  for (const key of Object.keys(params)) {
    url.searchParams.set(key, params[key] + '');
  }
  return url.toString();
}
function preconnect(url, rel = 'preconnect') {
  if (IS_SERVER) return false;
  const exists = document.querySelector(`link[href="${url}"]`);
  if (!isNull(exists)) return true;
  const link = document.createElement('link');
  link.rel = rel;
  link.href = url;
  link.crossOrigin = 'true';
  document.head.append(link);
  return true;
}
var pendingRequests = {};
function loadScript(src) {
  if (pendingRequests[src]) return pendingRequests[src].promise;
  const promise = deferredPromise(),
    exists = document.querySelector(`script[src="${src}"]`);
  if (!isNull(exists)) {
    promise.resolve();
    return promise.promise;
  }
  pendingRequests[src] = promise;
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    promise.resolve();
    delete pendingRequests[src];
  };
  script.onerror = () => {
    promise.reject();
    delete pendingRequests[src];
  };
  setTimeout(() => document.head.append(script), 0);
  return promise.promise;
}
function getRequestCredentials(crossOrigin) {
  return crossOrigin === 'use-credentials'
    ? 'include'
    : isString(crossOrigin)
    ? 'same-origin'
    : void 0;
}
function getDownloadFile({ title, src, download }) {
  const url =
    isBoolean(download) || download === ''
      ? src.src
      : isString(download)
      ? download
      : download == null
      ? void 0
      : download.url;
  if (!isValidFileDownload({ url, src, download })) return null;
  return {
    url,
    name:
      (!isBoolean(download) &&
        !isString(download) &&
        (download == null ? void 0 : download.filename)) ||
      title.toLowerCase() ||
      'media',
  };
}
function isValidFileDownload({ url, src, download }) {
  return (
    isString(url) &&
    ((download && download !== true) || isAudioSrc(src) || isVideoSrc(src))
  );
}
var CROSS_ORIGIN = Symbol('TEXT_TRACK_CROSS_ORIGIN');
var READY_STATE = Symbol('TEXT_TRACK_READY_STATE');
var UPDATE_ACTIVE_CUES = Symbol('TEXT_TRACK_UPDATE_ACTIVE_CUES');
var CAN_LOAD = Symbol('TEXT_TRACK_CAN_LOAD');
var ON_MODE_CHANGE = Symbol('TEXT_TRACK_ON_MODE_CHANGE');
var NATIVE = Symbol('TEXT_TRACK_NATIVE');
var NATIVE_HLS = Symbol('TEXT_TRACK_NATIVE_HLS');
var TextTrackSymbol = {
  crossOrigin: CROSS_ORIGIN,
  readyState: READY_STATE,
  updateActiveCues: UPDATE_ACTIVE_CUES,
  canLoad: CAN_LOAD,
  onModeChange: ON_MODE_CHANGE,
  native: NATIVE,
  nativeHLS: NATIVE_HLS,
};
function findActiveCue(cues, time) {
  for (let i = 0, len = cues.length; i < len; i++) {
    if (isCueActive(cues[i], time)) return cues[i];
  }
  return null;
}
function isCueActive(cue, time) {
  return time >= cue.startTime && time < cue.endTime;
}
function watchActiveTextTrack(tracks, kind, onChange) {
  let currentTrack = null,
    scope = getScope();
  function onModeChange() {
    const kinds = isString(kind) ? [kind] : kind,
      track = tracks
        .toArray()
        .find(
          (track2) => kinds.includes(track2.kind) && track2.mode === 'showing'
        );
    if (track === currentTrack) return;
    if (!track) {
      onChange(null);
      currentTrack = null;
      return;
    }
    if (track.readyState == 2) {
      onChange(track);
    } else {
      onChange(null);
      scoped(() => {
        const off = listenEvent(
          track,
          'load',
          () => {
            onChange(track);
            off();
          },
          { once: true }
        );
      }, scope);
    }
    currentTrack = track;
  }
  onModeChange();
  return listenEvent(tracks, 'mode-change', onModeChange);
}
function watchCueTextChange(tracks, kind, callback) {
  watchActiveTextTrack(tracks, kind, (track) => {
    if (!track) {
      callback('');
      return;
    }
    const onCueChange = () => {
      const activeCue = track == null ? void 0 : track.activeCues[0];
      callback((activeCue == null ? void 0 : activeCue.text) || '');
    };
    onCueChange();
    listenEvent(track, 'cue-change', onCueChange);
  });
}
var _a,
  _b,
  _c,
  _d,
  _canLoad,
  _currentTime,
  _mode,
  _metadata,
  _regions,
  _cues,
  _activeCues,
  _TextTrack_instances,
  parseContent_fn,
  load_fn,
  ready_fn,
  error_fn,
  parseJSON_fn,
  activeCuesChanged_fn;
var TextTrack = class extends EventsTarget {
  constructor(init2) {
    super();
    __privateAdd(this, _TextTrack_instances);
    __publicField(this, 'src');
    __publicField(this, 'content');
    __publicField(this, 'type');
    __publicField(this, 'encoding');
    __publicField(this, 'id', '');
    __publicField(this, 'label', '');
    __publicField(this, 'language', '');
    __publicField(this, 'kind');
    __publicField(this, 'default', false);
    __privateAdd(this, _canLoad, false);
    __privateAdd(this, _currentTime, 0);
    __privateAdd(this, _mode, 'disabled');
    __privateAdd(this, _metadata, {});
    __privateAdd(this, _regions, []);
    __privateAdd(this, _cues, []);
    __privateAdd(this, _activeCues, []);
    /** @internal */
    __publicField(this, _d, 0);
    /** @internal */
    __publicField(this, _c);
    /** @internal */
    __publicField(this, _b, null);
    /** @internal */
    __publicField(this, _a, null);
    for (const prop2 of Object.keys(init2)) this[prop2] = init2[prop2];
    if (!this.type) this.type = 'vtt';
    if (!IS_SERVER && init2.content) {
      __privateMethod(this, _TextTrack_instances, parseContent_fn).call(
        this,
        init2
      );
    } else if (!init2.src) {
      this[TextTrackSymbol.readyState] = 2;
    }
    if (isTrackCaptionKind(this) && !this.label) {
      console.warn(
        `[vidstack] captions text track created without label: \`${this.src}\``
      );
    }
  }
  static createId(track) {
    return `vds-${track.type}-${track.kind}-${track.src ?? track.label ?? '?'}`;
  }
  get metadata() {
    return __privateGet(this, _metadata);
  }
  get regions() {
    return __privateGet(this, _regions);
  }
  get cues() {
    return __privateGet(this, _cues);
  }
  get activeCues() {
    return __privateGet(this, _activeCues);
  }
  /**
   * - 0: Not Loading
   * - 1: Loading
   * - 2: Ready
   * - 3: Error
   */
  get readyState() {
    return this[TextTrackSymbol.readyState];
  }
  get mode() {
    return __privateGet(this, _mode);
  }
  set mode(mode) {
    this.setMode(mode);
  }
  addCue(cue, trigger) {
    var _a6;
    let i = 0,
      length = __privateGet(this, _cues).length;
    for (i = 0; i < length; i++)
      if (cue.endTime <= __privateGet(this, _cues)[i].startTime) break;
    if (i === length) __privateGet(this, _cues).push(cue);
    else __privateGet(this, _cues).splice(i, 0, cue);
    if (!(cue instanceof TextTrackCue)) {
      (_a6 = this[TextTrackSymbol.native]) == null
        ? void 0
        : _a6.track.addCue(cue);
    }
    this.dispatchEvent(new DOMEvent('add-cue', { detail: cue, trigger }));
    if (isCueActive(cue, __privateGet(this, _currentTime))) {
      this[TextTrackSymbol.updateActiveCues](
        __privateGet(this, _currentTime),
        trigger
      );
    }
  }
  removeCue(cue, trigger) {
    var _a6;
    const index = __privateGet(this, _cues).indexOf(cue);
    if (index >= 0) {
      const isActive = __privateGet(this, _activeCues).includes(cue);
      __privateGet(this, _cues).splice(index, 1);
      (_a6 = this[TextTrackSymbol.native]) == null
        ? void 0
        : _a6.track.removeCue(cue);
      this.dispatchEvent(new DOMEvent('remove-cue', { detail: cue, trigger }));
      if (isActive) {
        this[TextTrackSymbol.updateActiveCues](
          __privateGet(this, _currentTime),
          trigger
        );
      }
    }
  }
  setMode(mode, trigger) {
    var _a6;
    if (__privateGet(this, _mode) === mode) return;
    __privateSet(this, _mode, mode);
    if (mode === 'disabled') {
      __privateSet(this, _activeCues, []);
      __privateMethod(this, _TextTrack_instances, activeCuesChanged_fn).call(
        this
      );
    } else if (this.readyState === 2) {
      this[TextTrackSymbol.updateActiveCues](
        __privateGet(this, _currentTime),
        trigger
      );
    } else {
      __privateMethod(this, _TextTrack_instances, load_fn).call(this);
    }
    this.dispatchEvent(new DOMEvent('mode-change', { detail: this, trigger }));
    (_a6 = this[TextTrackSymbol.onModeChange]) == null
      ? void 0
      : _a6.call(this);
  }
  /** @internal */
  [((_d = TextTrackSymbol.readyState),
  (_c = TextTrackSymbol.crossOrigin),
  (_b = TextTrackSymbol.onModeChange),
  (_a = TextTrackSymbol.native),
  TextTrackSymbol.updateActiveCues)](currentTime, trigger) {
    __privateSet(this, _currentTime, currentTime);
    if (this.mode === 'disabled' || !__privateGet(this, _cues).length) return;
    const activeCues = [];
    for (
      let i = 0, length = __privateGet(this, _cues).length;
      i < length;
      i++
    ) {
      const cue = __privateGet(this, _cues)[i];
      if (isCueActive(cue, currentTime)) activeCues.push(cue);
    }
    let changed = activeCues.length !== __privateGet(this, _activeCues).length;
    if (!changed) {
      for (let i = 0; i < activeCues.length; i++) {
        if (!__privateGet(this, _activeCues).includes(activeCues[i])) {
          changed = true;
          break;
        }
      }
    }
    __privateSet(this, _activeCues, activeCues);
    if (changed)
      __privateMethod(this, _TextTrack_instances, activeCuesChanged_fn).call(
        this,
        trigger
      );
  }
  /** @internal */
  [TextTrackSymbol.canLoad]() {
    __privateSet(this, _canLoad, true);
    if (__privateGet(this, _mode) !== 'disabled')
      __privateMethod(this, _TextTrack_instances, load_fn).call(this);
  }
};
_canLoad = new WeakMap();
_currentTime = new WeakMap();
_mode = new WeakMap();
_metadata = new WeakMap();
_regions = new WeakMap();
_cues = new WeakMap();
_activeCues = new WeakMap();
_TextTrack_instances = new WeakSet();
parseContent_fn = function (init2) {
  import('./dev-3UBCCOPC.js').then(({ parseText, VTTCue, VTTRegion }) => {
    if (!isString(init2.content) || init2.type === 'json') {
      __privateMethod(this, _TextTrack_instances, parseJSON_fn).call(
        this,
        init2.content,
        VTTCue,
        VTTRegion
      );
      if (this.readyState !== 3)
        __privateMethod(this, _TextTrack_instances, ready_fn).call(this);
    } else {
      parseText(init2.content, { type: init2.type }).then(
        ({ cues, regions }) => {
          __privateSet(this, _cues, cues);
          __privateSet(this, _regions, regions);
          __privateMethod(this, _TextTrack_instances, ready_fn).call(this);
        }
      );
    }
  });
};
load_fn = async function () {
  var _a6, _b2;
  if (!__privateGet(this, _canLoad) || this[TextTrackSymbol.readyState] > 0)
    return;
  this[TextTrackSymbol.readyState] = 1;
  this.dispatchEvent(new DOMEvent('load-start'));
  if (!this.src) {
    __privateMethod(this, _TextTrack_instances, ready_fn).call(this);
    return;
  }
  try {
    const { parseResponse, VTTCue, VTTRegion } = await import(
        './dev-3UBCCOPC.js'
      ),
      crossOrigin =
        (_a6 = this[TextTrackSymbol.crossOrigin]) == null
          ? void 0
          : _a6.call(this);
    const response = fetch(this.src, {
      headers:
        this.type === 'json' ? { 'Content-Type': 'application/json' } : void 0,
      credentials: getRequestCredentials(crossOrigin),
    });
    if (this.type === 'json') {
      __privateMethod(this, _TextTrack_instances, parseJSON_fn).call(
        this,
        await (await response).text(),
        VTTCue,
        VTTRegion
      );
    } else {
      const { errors, metadata, regions, cues } = await parseResponse(
        response,
        {
          type: this.type,
          encoding: this.encoding,
        }
      );
      if (((_b2 = errors[0]) == null ? void 0 : _b2.code) === 0) {
        throw errors[0];
      } else {
        __privateSet(this, _metadata, metadata);
        __privateSet(this, _regions, regions);
        __privateSet(this, _cues, cues);
      }
    }
    __privateMethod(this, _TextTrack_instances, ready_fn).call(this);
  } catch (error) {
    __privateMethod(this, _TextTrack_instances, error_fn).call(this, error);
  }
};
ready_fn = function () {
  this[TextTrackSymbol.readyState] = 2;
  if (!this.src || this.type !== 'vtt') {
    const native = this[TextTrackSymbol.native];
    if (native && !native.managed) {
      for (const cue of __privateGet(this, _cues)) native.track.addCue(cue);
    }
  }
  const loadEvent = new DOMEvent('load');
  this[TextTrackSymbol.updateActiveCues](
    __privateGet(this, _currentTime),
    loadEvent
  );
  this.dispatchEvent(loadEvent);
};
error_fn = function (error) {
  this[TextTrackSymbol.readyState] = 3;
  this.dispatchEvent(new DOMEvent('error', { detail: error }));
};
parseJSON_fn = function (json, VTTCue, VTTRegion) {
  try {
    const { regions, cues } = parseJSONCaptionsFile(json, VTTCue, VTTRegion);
    __privateSet(this, _regions, regions);
    __privateSet(this, _cues, cues);
  } catch (error) {
    {
      console.error(
        `[vidstack] failed to parse JSON captions at: \`${this.src}\`

`,
        error
      );
    }
    __privateMethod(this, _TextTrack_instances, error_fn).call(this, error);
  }
};
activeCuesChanged_fn = function (trigger) {
  this.dispatchEvent(new DOMEvent('cue-change', { trigger }));
};
var captionRE = /captions|subtitles/;
function isTrackCaptionKind(track) {
  return captionRE.test(track.kind);
}
function parseJSONCaptionsFile(json, Cue, Region) {
  const content = isString(json) ? JSON.parse(json) : json;
  let regions = [],
    cues = [];
  if (content.regions && Region) {
    regions = content.regions.map((region) =>
      Object.assign(new Region(), region)
    );
  }
  if (content.cues || isArray(content)) {
    cues = (isArray(content) ? content : content.cues)
      .filter(
        (content2) => isNumber(content2.startTime) && isNumber(content2.endTime)
      )
      .map((cue) => Object.assign(new Cue(0, 0, ''), cue));
  }
  return { regions, cues };
}
var mediaState = new State({
  artist: '',
  artwork: null,
  audioTrack: null,
  audioTracks: [],
  autoPlay: false,
  autoPlayError: null,
  audioGain: null,
  buffered: new TimeRange(),
  canLoad: false,
  canLoadPoster: false,
  canFullscreen: false,
  canOrientScreen: canOrientScreen(),
  canPictureInPicture: false,
  canPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  get iOSControls() {
    return (
      IS_IPHONE &&
      this.mediaType === 'video' &&
      (!this.playsInline || (!fscreen.fullscreenEnabled && this.fullscreen))
    );
  },
  get nativeControls() {
    return this.controls || this.iOSControls;
  },
  controlsVisible: false,
  get controlsHidden() {
    return !this.controlsVisible;
  },
  crossOrigin: null,
  ended: false,
  error: null,
  fullscreen: false,
  get loop() {
    return this.providedLoop || this.userPrefersLoop;
  },
  logLevel: 'warn',
  mediaType: 'unknown',
  muted: false,
  paused: true,
  played: new TimeRange(),
  playing: false,
  playsInline: false,
  pictureInPicture: false,
  preload: 'metadata',
  playbackRate: 1,
  qualities: [],
  quality: null,
  autoQuality: false,
  canSetQuality: true,
  canSetPlaybackRate: true,
  canSetVolume: false,
  canSetAudioGain: false,
  seekable: new TimeRange(),
  seeking: false,
  source: { src: '', type: '' },
  sources: [],
  started: false,
  textTracks: [],
  textTrack: null,
  get hasCaptions() {
    return this.textTracks.filter(isTrackCaptionKind).length > 0;
  },
  volume: 1,
  waiting: false,
  realCurrentTime: 0,
  get currentTime() {
    return this.ended
      ? this.duration
      : this.clipStartTime > 0
      ? Math.max(
          0,
          Math.min(this.realCurrentTime - this.clipStartTime, this.duration)
        )
      : this.realCurrentTime;
  },
  providedDuration: -1,
  intrinsicDuration: 0,
  get duration() {
    return this.seekableWindow;
  },
  get title() {
    return this.providedTitle || this.inferredTitle;
  },
  get poster() {
    return this.providedPoster || this.inferredPoster;
  },
  get viewType() {
    return this.providedViewType !== 'unknown'
      ? this.providedViewType
      : this.inferredViewType;
  },
  get streamType() {
    return this.providedStreamType !== 'unknown'
      ? this.providedStreamType
      : this.inferredStreamType;
  },
  get currentSrc() {
    return this.source;
  },
  get bufferedStart() {
    const start = getTimeRangesStart(this.buffered) ?? 0;
    return Math.max(start, this.clipStartTime);
  },
  get bufferedEnd() {
    const end = getTimeRangesEnd(this.buffered) ?? 0;
    return Math.min(this.seekableEnd, Math.max(0, end - this.clipStartTime));
  },
  get bufferedWindow() {
    return Math.max(0, this.bufferedEnd - this.bufferedStart);
  },
  get seekableStart() {
    if (this.isLiveDVR && this.liveDVRWindow > 0) {
      return Math.max(0, this.seekableEnd - this.liveDVRWindow);
    }
    const start = getTimeRangesStart(this.seekable) ?? 0;
    return Math.max(start, this.clipStartTime);
  },
  get seekableEnd() {
    if (this.providedDuration > 0) return this.providedDuration;
    const end =
      this.liveSyncPosition > 0
        ? this.liveSyncPosition
        : this.canPlay
        ? getTimeRangesEnd(this.seekable) ?? Infinity
        : 0;
    return this.clipEndTime > 0 ? Math.min(this.clipEndTime, end) : end;
  },
  get seekableWindow() {
    const window2 = this.seekableEnd - this.seekableStart;
    return !isNaN(window2) ? Math.max(0, window2) : Infinity;
  },
  // ~~ remote playback ~~
  canAirPlay: false,
  canGoogleCast: false,
  remotePlaybackState: 'disconnected',
  remotePlaybackType: 'none',
  remotePlaybackLoader: null,
  remotePlaybackInfo: null,
  get isAirPlayConnected() {
    return (
      this.remotePlaybackType === 'airplay' &&
      this.remotePlaybackState === 'connected'
    );
  },
  get isGoogleCastConnected() {
    return (
      this.remotePlaybackType === 'google-cast' &&
      this.remotePlaybackState === 'connected'
    );
  },
  // ~~ responsive design ~~
  pointer: 'fine',
  orientation: 'landscape',
  width: 0,
  height: 0,
  mediaWidth: 0,
  mediaHeight: 0,
  lastKeyboardAction: null,
  // ~~ user props ~~
  userBehindLiveEdge: false,
  // ~~ live props ~~
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  get canSeek() {
    return (
      /unknown|on-demand|:dvr/.test(this.streamType) &&
      Number.isFinite(this.duration) &&
      (!this.isLiveDVR || this.duration >= this.liveDVRWindow)
    );
  },
  get live() {
    return this.streamType.includes('live') || !Number.isFinite(this.duration);
  },
  get liveEdgeStart() {
    return this.live && Number.isFinite(this.seekableEnd)
      ? Math.max(0, this.seekableEnd - this.liveEdgeTolerance)
      : 0;
  },
  get liveEdge() {
    return (
      this.live &&
      (!this.canSeek ||
        (!this.userBehindLiveEdge && this.currentTime >= this.liveEdgeStart))
    );
  },
  get liveEdgeWindow() {
    return this.live && Number.isFinite(this.seekableEnd)
      ? this.seekableEnd - this.liveEdgeStart
      : 0;
  },
  get isLiveDVR() {
    return /:dvr/.test(this.streamType);
  },
  get liveDVRWindow() {
    return Math.max(this.inferredLiveDVRWindow, this.minLiveDVRWindow);
  },
  // ~~ internal props ~~
  autoPlaying: false,
  providedTitle: '',
  inferredTitle: '',
  providedLoop: false,
  userPrefersLoop: false,
  providedPoster: '',
  inferredPoster: '',
  inferredViewType: 'unknown',
  providedViewType: 'unknown',
  providedStreamType: 'unknown',
  inferredStreamType: 'unknown',
  liveSyncPosition: null,
  inferredLiveDVRWindow: 0,
  savedState: null,
});
var RESET_ON_SRC_QUALITY_CHANGE = /* @__PURE__ */ new Set([
  'autoPlayError',
  'autoPlaying',
  'buffered',
  'canPlay',
  'error',
  'paused',
  'played',
  'playing',
  'seekable',
  'seeking',
  'waiting',
]);
var RESET_ON_SRC_CHANGE = /* @__PURE__ */ new Set([
  ...RESET_ON_SRC_QUALITY_CHANGE,
  'ended',
  'inferredPoster',
  'inferredStreamType',
  'inferredTitle',
  'intrinsicDuration',
  'inferredLiveDVRWindow',
  'liveSyncPosition',
  'realCurrentTime',
  'savedState',
  'started',
  'userBehindLiveEdge',
]);
function softResetMediaState($media, isSourceQualityChange = false) {
  const filter = isSourceQualityChange
    ? RESET_ON_SRC_QUALITY_CHANGE
    : RESET_ON_SRC_CHANGE;
  mediaState.reset($media, (prop2) => filter.has(prop2));
  tick();
}
function boundTime(time, store) {
  const clippedTime = time + store.clipStartTime(),
    isStart = Math.floor(time) === Math.floor(store.seekableStart()),
    isEnd = Math.floor(clippedTime) === Math.floor(store.seekableEnd());
  if (isStart) {
    return store.seekableStart();
  }
  if (isEnd) {
    return store.seekableEnd();
  }
  if (
    store.isLiveDVR() &&
    store.liveDVRWindow() > 0 &&
    clippedTime < store.seekableEnd() - store.liveDVRWindow()
  ) {
    return store.bufferedStart();
  }
  return Math.min(
    Math.max(store.seekableStart() + 0.1, clippedTime),
    store.seekableEnd() - 0.1
  );
}
var mediaContext = createContext();
function useMediaContext() {
  return useContext(mediaContext);
}
var GROUPED_LOG = Symbol('GROUPED_LOG');
var _a2;
_a2 = GROUPED_LOG;
var _GroupedLog = class _GroupedLog {
  constructor(logger, level, title, root, parent) {
    __publicField(this, _a2, true);
    __publicField(this, 'logs', []);
    this.logger = logger;
    this.level = level;
    this.title = title;
    this.root = root;
    this.parent = parent;
  }
  log(...data) {
    this.logs.push({ data });
    return this;
  }
  labelledLog(label, ...data) {
    this.logs.push({ label, data });
    return this;
  }
  groupStart(title) {
    return new _GroupedLog(
      this.logger,
      this.level,
      title,
      this.root ?? this,
      this
    );
  }
  groupEnd() {
    var _a6;
    (_a6 = this.parent) == null ? void 0 : _a6.logs.push(this);
    return this.parent ?? this;
  }
  dispatch() {
    return this.logger.dispatch(this.level, this.root ?? this);
  }
};
var GroupedLog = _GroupedLog;
function isGroupedLog(data) {
  return !!(data == null ? void 0 : data[GROUPED_LOG]);
}
var _target;
var Logger = class {
  constructor() {
    __privateAdd(this, _target, null);
  }
  error(...data) {
    return this.dispatch('error', ...data);
  }
  warn(...data) {
    return this.dispatch('warn', ...data);
  }
  info(...data) {
    return this.dispatch('info', ...data);
  }
  debug(...data) {
    return this.dispatch('debug', ...data);
  }
  errorGroup(title) {
    return new GroupedLog(this, 'error', title);
  }
  warnGroup(title) {
    return new GroupedLog(this, 'warn', title);
  }
  infoGroup(title) {
    return new GroupedLog(this, 'info', title);
  }
  debugGroup(title) {
    return new GroupedLog(this, 'debug', title);
  }
  setTarget(newTarget) {
    __privateSet(this, _target, newTarget);
  }
  dispatch(level, ...data) {
    var _a6;
    return (
      ((_a6 = __privateGet(this, _target)) == null
        ? void 0
        : _a6.dispatchEvent(
            new DOMEvent('vds-log', {
              bubbles: true,
              composed: true,
              detail: { level, data },
            })
          )) || false
    );
  }
};
_target = new WeakMap();
var _target2,
  _player,
  _prevTrackIndex,
  _logger,
  _MediaRemoteControl_instances,
  dispatchRequest_fn,
  noPlayerWarning_fn;
var MediaRemoteControl = class {
  constructor(logger = new Logger()) {
    __privateAdd(this, _MediaRemoteControl_instances);
    __privateAdd(this, _target2, null);
    __privateAdd(this, _player, null);
    __privateAdd(this, _prevTrackIndex, -1);
    __privateAdd(this, _logger);
    __privateSet(this, _logger, logger);
  }
  /**
   * Set the target from which to dispatch media requests events from. The events should bubble
   * up from this target to the player element.
   *
   * @example
   * ```ts
   * const button = document.querySelector('button');
   * remote.setTarget(button);
   * ```
   */
  setTarget(target) {
    var _a6;
    __privateSet(this, _target2, target);
    (_a6 = __privateGet(this, _logger)) == null
      ? void 0
      : _a6.setTarget(target);
  }
  /**
   * Returns the current player element. This method will attempt to find the player by
   * searching up from either the given `target` or default target set via `remote.setTarget`.
   *
   * @example
   * ```ts
   * const player = remote.getPlayer();
   * ```
   */
  getPlayer(target) {
    var _a6;
    if (__privateGet(this, _player)) return __privateGet(this, _player);
    (_a6 = target ?? __privateGet(this, _target2)) == null
      ? void 0
      : _a6.dispatchEvent(
          new DOMEvent('find-media-player', {
            detail: (player) => void __privateSet(this, _player, player),
            bubbles: true,
            composed: true,
          })
        );
    return __privateGet(this, _player);
  }
  /**
   * Set the current player element so the remote can support toggle methods such as
   * `togglePaused` as they rely on the current media state.
   */
  setPlayer(player) {
    __privateSet(this, _player, player);
  }
  /**
   * Dispatch a request to start the media loading process. This will only work if the media
   * player has been initialized with a custom loading strategy `load="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-start-loading', trigger);
  }
  /**
   * Dispatch a request to start the poster loading process. This will only work if the media
   * player has been initialized with a custom poster loading strategy `posterLoad="custom">`.
   *
   * @docs {@link https://www.vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-poster-start-loading', trigger);
  }
  /**
   * Dispatch a request to connect to AirPlay.
   *
   * @see {@link https://www.apple.com/au/airplay}
   */
  requestAirPlay(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-airplay-request', trigger);
  }
  /**
   * Dispatch a request to connect to Google Cast.
   *
   * @see {@link https://developers.google.com/cast/docs/overview}
   */
  requestGoogleCast(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-google-cast-request', trigger);
  }
  /**
   * Dispatch a request to begin/resume media playback.
   */
  play(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-play-request', trigger);
  }
  /**
   * Dispatch a request to pause media playback.
   */
  pause(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-pause-request', trigger);
  }
  /**
   * Dispatch a request to set the media volume to mute (0).
   */
  mute(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-mute-request', trigger);
  }
  /**
   * Dispatch a request to unmute the media volume and set it back to it's previous state.
   */
  unmute(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-unmute-request', trigger);
  }
  /**
   * Dispatch a request to enter fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  enterFullscreen(target, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-enter-fullscreen-request', trigger, target);
  }
  /**
   * Dispatch a request to exit fullscreen.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  exitFullscreen(target, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-exit-fullscreen-request', trigger, target);
  }
  /**
   * Dispatch a request to lock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/screen-orientation#remote-control}
   */
  lockScreenOrientation(lockType, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-orientation-lock-request', trigger, lockType);
  }
  /**
   * Dispatch a request to unlock the screen orientation.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/screen-orientation#remote-control}
   */
  unlockScreenOrientation(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-orientation-unlock-request', trigger);
  }
  /**
   * Dispatch a request to enter picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  enterPictureInPicture(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-enter-pip-request', trigger);
  }
  /**
   * Dispatch a request to exit picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  exitPictureInPicture(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-exit-pip-request', trigger);
  }
  /**
   * Notify the media player that a seeking process is happening and to seek to the given `time`.
   */
  seeking(time, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-seeking-request', trigger, time);
  }
  /**
   * Notify the media player that a seeking operation has completed and to seek to the given `time`.
   * This is generally called after a series of `remote.seeking()` calls.
   */
  seek(time, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-seek-request', trigger, time);
  }
  seekToLiveEdge(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-live-edge-request', trigger);
  }
  /**
   * Dispatch a request to update the length of the media in seconds.
   *
   * @example
   * ```ts
   * remote.changeDuration(100); // 100 seconds
   * ```
   */
  changeDuration(duration, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-duration-change-request', trigger, duration);
  }
  /**
   * Dispatch a request to update the clip start time. This is the time at which media playback
   * should start at.
   *
   * @example
   * ```ts
   * remote.changeClipStart(100); // start at 100 seconds
   * ```
   */
  changeClipStart(startTime, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-clip-start-change-request', trigger, startTime);
  }
  /**
   * Dispatch a request to update the clip end time. This is the time at which media playback
   * should end at.
   *
   * @example
   * ```ts
   * remote.changeClipEnd(100); // end at 100 seconds
   * ```
   */
  changeClipEnd(endTime, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-clip-end-change-request', trigger, endTime);
  }
  /**
   * Dispatch a request to update the media volume to the given `volume` level which is a value
   * between 0 and 1.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/audio-gain#remote-control}
   * @example
   * ```ts
   * remote.changeVolume(0); // 0%
   * remote.changeVolume(0.05); // 5%
   * remote.changeVolume(0.5); // 50%
   * remote.changeVolume(0.75); // 70%
   * remote.changeVolume(1); // 100%
   * ```
   */
  changeVolume(volume, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(
      this,
      'media-volume-change-request',
      trigger,
      Math.max(0, Math.min(1, volume))
    );
  }
  /**
   * Dispatch a request to change the current audio track.
   *
   * @example
   * ```ts
   * remote.changeAudioTrack(1); // track at index 1
   * ```
   */
  changeAudioTrack(index, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-audio-track-change-request', trigger, index);
  }
  /**
   * Dispatch a request to change the video quality. The special value `-1` represents auto quality
   * selection.
   *
   * @example
   * ```ts
   * remote.changeQuality(-1); // auto
   * remote.changeQuality(1); // quality at index 1
   * ```
   */
  changeQuality(index, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-quality-change-request', trigger, index);
  }
  /**
   * Request auto quality selection.
   */
  requestAutoQuality(trigger) {
    this.changeQuality(-1, trigger);
  }
  /**
   * Dispatch a request to change the mode of the text track at the given index.
   *
   * @example
   * ```ts
   * remote.changeTextTrackMode(1, 'showing'); // track at index 1
   * ```
   */
  changeTextTrackMode(index, mode, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-text-track-change-request', trigger, {
      index,
      mode,
    });
  }
  /**
   * Dispatch a request to change the media playback rate.
   *
   * @example
   * ```ts
   * remote.changePlaybackRate(0.5); // Half the normal speed
   * remote.changePlaybackRate(1); // Normal speed
   * remote.changePlaybackRate(1.5); // 50% faster than normal
   * remote.changePlaybackRate(2); // Double the normal speed
   * ```
   */
  changePlaybackRate(rate, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-rate-change-request', trigger, rate);
  }
  /**
   * Dispatch a request to change the media audio gain.
   *
   * @example
   * ```ts
   * remote.changeAudioGain(1); // Disable audio gain
   * remote.changeAudioGain(1.5); // 50% louder
   * remote.changeAudioGain(2); // 100% louder
   * ```
   */
  changeAudioGain(gain, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-audio-gain-change-request', trigger, gain);
  }
  /**
   * Dispatch a request to resume idle tracking on controls.
   */
  resumeControls(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-resume-controls-request', trigger);
  }
  /**
   * Dispatch a request to pause controls idle tracking. Pausing tracking will result in the
   * controls being visible until `remote.resumeControls()` is called. This method
   * is generally used when building custom controls and you'd like to prevent the UI from
   * disappearing.
   *
   * @example
   * ```ts
   * // Prevent controls hiding while menu is being interacted with.
   * function onSettingsOpen() {
   *   remote.pauseControls();
   * }
   *
   * function onSettingsClose() {
   *   remote.resumeControls();
   * }
   * ```
   */
  pauseControls(trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-pause-controls-request', trigger);
  }
  /**
   * Dispatch a request to toggle the media playback state.
   */
  togglePaused(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.togglePaused.name);
      return;
    }
    if (player.state.paused) this.play(trigger);
    else this.pause(trigger);
  }
  /**
   * Dispatch a request to toggle the controls visibility.
   */
  toggleControls(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.toggleControls.name);
      return;
    }
    if (!player.controls.showing) {
      player.controls.show(0, trigger);
    } else {
      player.controls.hide(0, trigger);
    }
  }
  /**
   * Dispatch a request to toggle the media muted state.
   */
  toggleMuted(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.toggleMuted.name);
      return;
    }
    if (player.state.muted) this.unmute(trigger);
    else this.mute(trigger);
  }
  /**
   * Dispatch a request to toggle the media fullscreen state.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/fullscreen#remote-control}
   */
  toggleFullscreen(target, trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.toggleFullscreen.name);
      return;
    }
    if (player.state.fullscreen) this.exitFullscreen(target, trigger);
    else this.enterFullscreen(target, trigger);
  }
  /**
   * Dispatch a request to toggle the media picture-in-picture mode.
   *
   * @docs {@link https://www.vidstack.io/docs/player/api/picture-in-picture#remote-control}
   */
  togglePictureInPicture(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.togglePictureInPicture.name);
      return;
    }
    if (player.state.pictureInPicture) this.exitPictureInPicture(trigger);
    else this.enterPictureInPicture(trigger);
  }
  /**
   * Show captions.
   */
  showCaptions(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.showCaptions.name);
      return;
    }
    let tracks = player.state.textTracks,
      index = __privateGet(this, _prevTrackIndex);
    if (!tracks[index] || !isTrackCaptionKind(tracks[index])) {
      index = -1;
    }
    if (index === -1) {
      index = tracks.findIndex(
        (track) => isTrackCaptionKind(track) && track.default
      );
    }
    if (index === -1) {
      index = tracks.findIndex((track) => isTrackCaptionKind(track));
    }
    if (index >= 0) this.changeTextTrackMode(index, 'showing', trigger);
    __privateSet(this, _prevTrackIndex, -1);
  }
  /**
   * Turn captions off.
   */
  disableCaptions(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.disableCaptions.name);
      return;
    }
    const tracks = player.state.textTracks,
      track = player.state.textTrack;
    if (track) {
      const index = tracks.indexOf(track);
      this.changeTextTrackMode(index, 'disabled', trigger);
      __privateSet(this, _prevTrackIndex, index);
    }
  }
  /**
   * Dispatch a request to toggle the current captions mode.
   */
  toggleCaptions(trigger) {
    const player = this.getPlayer(trigger == null ? void 0 : trigger.target);
    if (!player) {
      __privateMethod(
        this,
        _MediaRemoteControl_instances,
        noPlayerWarning_fn
      ).call(this, this.toggleCaptions.name);
      return;
    }
    if (player.state.textTrack) {
      this.disableCaptions();
    } else {
      this.showCaptions();
    }
  }
  userPrefersLoopChange(prefersLoop, trigger) {
    __privateMethod(
      this,
      _MediaRemoteControl_instances,
      dispatchRequest_fn
    ).call(this, 'media-user-loop-change-request', trigger, prefersLoop);
  }
};
_target2 = new WeakMap();
_player = new WeakMap();
_prevTrackIndex = new WeakMap();
_logger = new WeakMap();
_MediaRemoteControl_instances = new WeakSet();
dispatchRequest_fn = function (type, trigger, detail) {
  var _a6, _b2, _c2;
  const request = new DOMEvent(type, {
    bubbles: true,
    composed: true,
    cancelable: true,
    detail,
    trigger,
  });
  let target = (trigger == null ? void 0 : trigger.target) || null;
  if (target && target instanceof Component) target = target.el;
  const shouldUsePlayer =
    !target ||
    target === document ||
    target === window ||
    target === document.body ||
    (((_a6 = __privateGet(this, _player)) == null ? void 0 : _a6.el) &&
      target instanceof Node &&
      !__privateGet(this, _player).el.contains(target));
  target = shouldUsePlayer
    ? __privateGet(this, _target2) ??
      ((_b2 = this.getPlayer()) == null ? void 0 : _b2.el)
    : target ?? __privateGet(this, _target2);
  {
    (_c2 = __privateGet(this, _logger)) == null
      ? void 0
      : _c2
          .debugGroup(`📨 dispatching \`${type}\``)
          .labelledLog('Target', target)
          .labelledLog('Player', __privateGet(this, _player))
          .labelledLog('Request Event', request)
          .labelledLog('Trigger Event', trigger)
          .dispatch();
  }
  if (__privateGet(this, _player)) {
    if (
      type === 'media-play-request' &&
      !__privateGet(this, _player).state.canLoad
    ) {
      target == null ? void 0 : target.dispatchEvent(request);
    } else {
      __privateGet(this, _player).canPlayQueue.enqueue(type, () =>
        target == null ? void 0 : target.dispatchEvent(request)
      );
    }
  } else {
    target == null ? void 0 : target.dispatchEvent(request);
  }
};
noPlayerWarning_fn = function (method2) {
  {
    console.warn(
      `[vidstack] attempted to call \`MediaRemoteControl.${method2}\`() that requires player but failed because remote could not find a parent player element from target`
    );
  }
};
var _data;
var LocalMediaStorage = class {
  constructor() {
    __publicField(this, 'playerId', 'vds-player');
    __publicField(this, 'mediaId', null);
    __privateAdd(this, _data, {
      volume: null,
      muted: null,
      audioGain: null,
      time: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
    });
    __publicField(
      this,
      'saveTimeThrottled',
      functionThrottle(this.saveTime.bind(this), 1e3)
    );
  }
  async getVolume() {
    return __privateGet(this, _data).volume;
  }
  async setVolume(volume) {
    __privateGet(this, _data).volume = volume;
    this.save();
  }
  async getMuted() {
    return __privateGet(this, _data).muted;
  }
  async setMuted(muted) {
    __privateGet(this, _data).muted = muted;
    this.save();
  }
  async getTime() {
    return __privateGet(this, _data).time;
  }
  async setTime(time, ended) {
    const shouldClear = time < 0;
    __privateGet(this, _data).time = !shouldClear ? time : null;
    if (shouldClear || ended) this.saveTime();
    else this.saveTimeThrottled();
  }
  async getLang() {
    return __privateGet(this, _data).lang;
  }
  async setLang(lang) {
    __privateGet(this, _data).lang = lang;
    this.save();
  }
  async getCaptions() {
    return __privateGet(this, _data).captions;
  }
  async setCaptions(enabled) {
    __privateGet(this, _data).captions = enabled;
    this.save();
  }
  async getPlaybackRate() {
    return __privateGet(this, _data).rate;
  }
  async setPlaybackRate(rate) {
    __privateGet(this, _data).rate = rate;
    this.save();
  }
  async getAudioGain() {
    return __privateGet(this, _data).audioGain;
  }
  async setAudioGain(gain) {
    __privateGet(this, _data).audioGain = gain;
    this.save();
  }
  async getVideoQuality() {
    return __privateGet(this, _data).quality;
  }
  async setVideoQuality(quality) {
    __privateGet(this, _data).quality = quality;
    this.save();
  }
  onChange(src, mediaId, playerId = 'vds-player') {
    const savedData = playerId ? localStorage.getItem(playerId) : null,
      savedTime = mediaId ? localStorage.getItem(mediaId) : null;
    this.playerId = playerId;
    this.mediaId = mediaId;
    __privateSet(this, _data, {
      volume: null,
      muted: null,
      audioGain: null,
      lang: null,
      captions: null,
      rate: null,
      quality: null,
      ...(savedData ? JSON.parse(savedData) : {}),
      time: savedTime ? +savedTime : null,
    });
  }
  save() {
    if (IS_SERVER || !this.playerId) return;
    const data = JSON.stringify({ ...__privateGet(this, _data), time: void 0 });
    localStorage.setItem(this.playerId, data);
  }
  saveTime() {
    if (IS_SERVER || !this.mediaId) return;
    const data = (__privateGet(this, _data).time ?? 0).toString();
    localStorage.setItem(this.mediaId, data);
  }
};
_data = new WeakMap();
var ADD = Symbol('LIST_ADD');
var REMOVE = Symbol('LIST_REMOVE');
var RESET = Symbol('LIST_RESET');
var SELECT = Symbol('LIST_SELECT');
var READONLY = Symbol('LIST_READONLY');
var SET_READONLY = Symbol('LIST_SET_READONLY');
var ON_RESET = Symbol('LIST_ON_RESET');
var ON_REMOVE = Symbol('LIST_ON_REMOVE');
var ON_USER_SELECT = Symbol('LIST_ON_USER_SELECT');
var ListSymbol = {
  add: ADD,
  remove: REMOVE,
  reset: RESET,
  select: SELECT,
  readonly: READONLY,
  setReadonly: SET_READONLY,
  onReset: ON_RESET,
  onRemove: ON_REMOVE,
  onUserSelect: ON_USER_SELECT,
};
var _a3;
var List = class extends EventsTarget {
  constructor() {
    super(...arguments);
    __publicField(this, 'items', []);
    /** @internal */
    __publicField(this, _a3, false);
  }
  get length() {
    return this.items.length;
  }
  get readonly() {
    return this[ListSymbol.readonly];
  }
  /**
   * Returns the index of the first occurrence of the given item, or -1 if it is not present.
   */
  indexOf(item) {
    return this.items.indexOf(item);
  }
  /**
   * Returns an item matching the given `id`, or `null` if not present.
   */
  getById(id2) {
    if (id2 === '') return null;
    return this.items.find((item) => item.id === id2) ?? null;
  }
  /**
   * Transform list to an array.
   */
  toArray() {
    return [...this.items];
  }
  [((_a3 = ListSymbol.readonly), Symbol.iterator)]() {
    return this.items.values();
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    const index = this.items.length;
    if (!('' + index in this)) {
      Object.defineProperty(this, index, {
        get() {
          return this.items[index];
        },
      });
    }
    if (this.items.includes(item)) return;
    this.items.push(item);
    this.dispatchEvent(new DOMEvent('add', { detail: item, trigger }));
  }
  /** @internal */
  [ListSymbol.remove](item, trigger) {
    var _a6;
    const index = this.items.indexOf(item);
    if (index >= 0) {
      (_a6 = this[ListSymbol.onRemove]) == null
        ? void 0
        : _a6.call(this, item, trigger);
      this.items.splice(index, 1);
      this.dispatchEvent(new DOMEvent('remove', { detail: item, trigger }));
    }
  }
  /** @internal */
  [ListSymbol.reset](trigger) {
    var _a6;
    for (const item of [...this.items]) this[ListSymbol.remove](item, trigger);
    this.items = [];
    this[ListSymbol.setReadonly](false, trigger);
    (_a6 = this[ListSymbol.onReset]) == null ? void 0 : _a6.call(this);
  }
  /** @internal */
  [ListSymbol.setReadonly](readonly, trigger) {
    if (this[ListSymbol.readonly] === readonly) return;
    this[ListSymbol.readonly] = readonly;
    this.dispatchEvent(
      new DOMEvent('readonly-change', { detail: readonly, trigger })
    );
  }
};
var SELECTED = Symbol('SELECTED');
var SelectList = class extends List {
  get selected() {
    return this.items.find((item) => item.selected) ?? null;
  }
  get selectedIndex() {
    return this.items.findIndex((item) => item.selected);
  }
  /** @internal */
  [ListSymbol.onRemove](item, trigger) {
    this[ListSymbol.select](item, false, trigger);
  }
  /** @internal */
  [ListSymbol.add](item, trigger) {
    item[SELECTED] = false;
    Object.defineProperty(item, 'selected', {
      get() {
        return this[SELECTED];
      },
      set: (selected) => {
        var _a6;
        if (this.readonly) return;
        (_a6 = this[ListSymbol.onUserSelect]) == null ? void 0 : _a6.call(this);
        this[ListSymbol.select](item, selected);
      },
    });
    super[ListSymbol.add](item, trigger);
  }
  /** @internal */
  [ListSymbol.select](item, selected, trigger) {
    if (selected === (item == null ? void 0 : item[SELECTED])) return;
    const prev = this.selected;
    if (item) item[SELECTED] = selected;
    const changed = !selected ? prev === item : prev !== item;
    if (changed) {
      if (prev) prev[SELECTED] = false;
      this.dispatchEvent(
        new DOMEvent('change', {
          detail: {
            prev,
            current: this.selected,
          },
          trigger,
        })
      );
    }
  }
};
var AudioTrackList = class extends SelectList {};
function round(num, decimalPlaces = 2) {
  return Number(num.toFixed(decimalPlaces));
}
function getNumberOfDecimalPlaces(num) {
  var _a6;
  return ((_a6 = String(num).split('.')[1]) == null ? void 0 : _a6.length) ?? 0;
}
function clampNumber(min, value, max) {
  return Math.max(min, Math.min(max, value));
}
function isEventInside(el, event2) {
  const target = event2.composedPath()[0];
  return isDOMNode(target) && el.contains(target);
}
var rafJobs = /* @__PURE__ */ new Set();
if (!IS_SERVER) {
  let processJobs = function () {
    for (const job of rafJobs) {
      try {
        job();
      } catch (e) {
        console.error(`[vidstack] failed job:

${e}`);
      }
    }
    window.requestAnimationFrame(processJobs);
  };
  processJobs();
}
function scheduleRafJob(job) {
  rafJobs.add(job);
  return () => rafJobs.delete(job);
}
function setAttributeIfEmpty(target, name, value) {
  if (!target.hasAttribute(name)) target.setAttribute(name, value);
}
function setARIALabel(target, $label) {
  if (target.hasAttribute('aria-label') || target.hasAttribute('data-no-label'))
    return;
  if (!isFunction($label)) {
    setAttribute(target, 'aria-label', $label);
    return;
  }
  function updateAriaDescription() {
    setAttribute(target, 'aria-label', $label());
  }
  if (IS_SERVER) updateAriaDescription();
  else effect(updateAriaDescription);
}
function isElementVisible(el) {
  const style = getComputedStyle(el);
  return style.display !== 'none' && parseInt(style.opacity) > 0;
}
function checkVisibility(el) {
  return (
    !!el &&
    ('checkVisibility' in el
      ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
      : isElementVisible(el))
  );
}
function observeVisibility(el, callback) {
  return scheduleRafJob(() => callback(checkVisibility(el)));
}
function isElementParent(owner, node, test) {
  while (node) {
    if (node === owner) {
      return true;
    } else if (test == null ? void 0 : test(node)) {
      break;
    } else {
      node = node.parentElement;
    }
  }
  return false;
}
function onPress(target, handler) {
  return new EventsController(target)
    .add('pointerup', (event2) => {
      if (event2.button === 0 && !event2.defaultPrevented) handler(event2);
    })
    .add('keydown', (event2) => {
      if (isKeyboardClick(event2)) handler(event2);
    });
}
function isTouchPinchEvent(event2) {
  return (
    isTouchEvent(event2) &&
    (event2.touches.length > 1 || event2.changedTouches.length > 1)
  );
}
function requestScopedAnimationFrame(callback) {
  if (IS_SERVER) return callback();
  let scope = getScope(),
    id2 = window.requestAnimationFrame(() => {
      scoped(callback, scope);
      id2 = -1;
    });
  return () => void window.cancelAnimationFrame(id2);
}
function autoPlacement(
  el,
  trigger,
  placement,
  { offsetVarName, xOffset, yOffset, ...options }
) {
  if (!el) return;
  const floatingPlacement = placement.replace(' ', '-').replace('-center', '');
  setStyle(el, 'visibility', !trigger ? 'hidden' : null);
  if (!trigger) return;
  let isTop = placement.includes('top');
  const negateX = (x) => (placement.includes('left') ? `calc(-1 * ${x})` : x),
    negateY = (y) => (isTop ? `calc(-1 * ${y})` : y);
  return autoUpdate(trigger, el, () => {
    computePosition(trigger, el, {
      placement: floatingPlacement,
      middleware: [
        ...(options.middleware ?? []),
        flip({ fallbackAxisSideDirection: 'start', crossAxis: false }),
        shift(),
      ],
      ...options,
    }).then(({ x, y, middlewareData }) => {
      var _a6;
      const hasFlipped = !!((_a6 = middlewareData.flip) == null
        ? void 0
        : _a6.index);
      isTop = placement.includes(hasFlipped ? 'bottom' : 'top');
      el.setAttribute(
        'data-placement',
        hasFlipped
          ? placement.startsWith('top')
            ? placement.replace('top', 'bottom')
            : placement.replace('bottom', 'top')
          : placement
      );
      Object.assign(el.style, {
        top: `calc(${y + 'px'} + ${negateY(
          yOffset ? yOffset + 'px' : `var(--${offsetVarName}-y-offset, 0px)`
        )})`,
        left: `calc(${x + 'px'} + ${negateX(
          xOffset ? xOffset + 'px' : `var(--${offsetVarName}-x-offset, 0px)`
        )})`,
      });
    });
  });
}
function hasAnimation(el) {
  const styles = getComputedStyle(el);
  return styles.animationName !== 'none';
}
function isHTMLElement(el) {
  return el instanceof HTMLElement;
}
var _display,
  _video,
  _track,
  _tracks,
  _NativeTextRenderer_instances,
  attachTrack_fn,
  createTrackElement_fn,
  copyCues_fn,
  onChange_fn;
var NativeTextRenderer = class {
  constructor() {
    __privateAdd(this, _NativeTextRenderer_instances);
    __publicField(this, 'priority', 0);
    __privateAdd(this, _display, true);
    __privateAdd(this, _video, null);
    __privateAdd(this, _track, null);
    __privateAdd(this, _tracks, /* @__PURE__ */ new Set());
  }
  canRender(_, video) {
    return !!video;
  }
  attach(video) {
    __privateSet(this, _video, video);
    if (video)
      video.textTracks.onchange = __privateMethod(
        this,
        _NativeTextRenderer_instances,
        onChange_fn
      ).bind(this);
  }
  addTrack(track) {
    __privateGet(this, _tracks).add(track);
    __privateMethod(this, _NativeTextRenderer_instances, attachTrack_fn).call(
      this,
      track
    );
  }
  removeTrack(track) {
    var _a6, _b2;
    (_b2 =
      (_a6 = track[TextTrackSymbol.native]) == null ? void 0 : _a6.remove) ==
    null
      ? void 0
      : _b2.call(_a6);
    track[TextTrackSymbol.native] = null;
    __privateGet(this, _tracks).delete(track);
  }
  changeTrack(track) {
    const current = track == null ? void 0 : track[TextTrackSymbol.native];
    if (current && current.track.mode !== 'showing') {
      current.track.mode = 'showing';
    }
    __privateSet(this, _track, track);
  }
  setDisplay(display) {
    __privateSet(this, _display, display);
    __privateMethod(this, _NativeTextRenderer_instances, onChange_fn).call(
      this
    );
  }
  detach() {
    if (__privateGet(this, _video))
      __privateGet(this, _video).textTracks.onchange = null;
    for (const track of __privateGet(this, _tracks)) this.removeTrack(track);
    __privateGet(this, _tracks).clear();
    __privateSet(this, _video, null);
    __privateSet(this, _track, null);
  }
};
_display = new WeakMap();
_video = new WeakMap();
_track = new WeakMap();
_tracks = new WeakMap();
_NativeTextRenderer_instances = new WeakSet();
attachTrack_fn = function (track) {
  var _a6;
  if (!__privateGet(this, _video)) return;
  const el =
    track[(_a6 = TextTrackSymbol.native)] ??
    (track[_a6] = __privateMethod(
      this,
      _NativeTextRenderer_instances,
      createTrackElement_fn
    ).call(this, track));
  if (isHTMLElement(el)) {
    __privateGet(this, _video).append(el);
    el.track.mode = el.default ? 'showing' : 'disabled';
  }
};
createTrackElement_fn = function (track) {
  const el = document.createElement('track'),
    isDefault = track.default || track.mode === 'showing',
    isSupported = track.src && track.type === 'vtt';
  el.id = track.id;
  el.src = isSupported ? track.src : '';
  el.label = track.label;
  el.kind = track.kind;
  el.default = isDefault;
  track.language && (el.srclang = track.language);
  if (isDefault && !isSupported) {
    __privateMethod(this, _NativeTextRenderer_instances, copyCues_fn).call(
      this,
      track,
      el.track
    );
  }
  return el;
};
copyCues_fn = function (track, native) {
  var _a6;
  if (
    (track.src && track.type === 'vtt') ||
    ((_a6 = native.cues) == null ? void 0 : _a6.length)
  )
    return;
  for (const cue of track.cues) native.addCue(cue);
};
onChange_fn = function (event2) {
  for (const track of __privateGet(this, _tracks)) {
    const native = track[TextTrackSymbol.native];
    if (!native) continue;
    if (!__privateGet(this, _display)) {
      native.track.mode = native.managed ? 'hidden' : 'disabled';
      continue;
    }
    const isShowing = native.track.mode === 'showing';
    if (isShowing)
      __privateMethod(this, _NativeTextRenderer_instances, copyCues_fn).call(
        this,
        track,
        native.track
      );
    track.setMode(isShowing ? 'showing' : 'disabled', event2);
  }
};
var _video2,
  _textTracks,
  _renderers,
  _media,
  _nativeDisplay,
  _nativeRenderer,
  _customRenderer,
  _TextRenderers_instances,
  watchControls_fn,
  addNativeTrack_fn,
  removeNativeTrack_fn,
  onAddTrack_fn,
  onRemoveTrack_fn,
  update_fn,
  detach_fn;
var TextRenderers = class {
  constructor(media) {
    __privateAdd(this, _TextRenderers_instances);
    __privateAdd(this, _video2, null);
    __privateAdd(this, _textTracks);
    __privateAdd(this, _renderers, []);
    __privateAdd(this, _media);
    __privateAdd(this, _nativeDisplay, false);
    __privateAdd(this, _nativeRenderer, null);
    __privateAdd(this, _customRenderer, null);
    __privateSet(this, _media, media);
    const textTracks = media.textTracks;
    __privateSet(this, _textTracks, textTracks);
    effect(
      __privateMethod(this, _TextRenderers_instances, watchControls_fn).bind(
        this
      )
    );
    onDispose(
      __privateMethod(this, _TextRenderers_instances, detach_fn).bind(this)
    );
    new EventsController(textTracks)
      .add(
        'add',
        __privateMethod(this, _TextRenderers_instances, onAddTrack_fn).bind(
          this
        )
      )
      .add(
        'remove',
        __privateMethod(this, _TextRenderers_instances, onRemoveTrack_fn).bind(
          this
        )
      )
      .add(
        'mode-change',
        __privateMethod(this, _TextRenderers_instances, update_fn).bind(this)
      );
  }
  add(renderer) {
    __privateGet(this, _renderers).push(renderer);
    untrack(
      __privateMethod(this, _TextRenderers_instances, update_fn).bind(this)
    );
  }
  remove(renderer) {
    renderer.detach();
    __privateGet(this, _renderers).splice(
      __privateGet(this, _renderers).indexOf(renderer),
      1
    );
    untrack(
      __privateMethod(this, _TextRenderers_instances, update_fn).bind(this)
    );
  }
  /** @internal */
  attachVideo(video) {
    requestAnimationFrame(() => {
      __privateSet(this, _video2, video);
      if (video) {
        __privateSet(this, _nativeRenderer, new NativeTextRenderer());
        __privateGet(this, _nativeRenderer).attach(video);
        for (const track of __privateGet(this, _textTracks))
          __privateMethod(
            this,
            _TextRenderers_instances,
            addNativeTrack_fn
          ).call(this, track);
      }
      __privateMethod(this, _TextRenderers_instances, update_fn).call(this);
    });
  }
};
_video2 = new WeakMap();
_textTracks = new WeakMap();
_renderers = new WeakMap();
_media = new WeakMap();
_nativeDisplay = new WeakMap();
_nativeRenderer = new WeakMap();
_customRenderer = new WeakMap();
_TextRenderers_instances = new WeakSet();
watchControls_fn = function () {
  const { nativeControls } = __privateGet(this, _media).$state;
  __privateSet(this, _nativeDisplay, nativeControls());
  __privateMethod(this, _TextRenderers_instances, update_fn).call(this);
};
addNativeTrack_fn = function (track) {
  var _a6;
  if (!isTrackCaptionKind(track)) return;
  (_a6 = __privateGet(this, _nativeRenderer)) == null
    ? void 0
    : _a6.addTrack(track);
};
removeNativeTrack_fn = function (track) {
  var _a6;
  if (!isTrackCaptionKind(track)) return;
  (_a6 = __privateGet(this, _nativeRenderer)) == null
    ? void 0
    : _a6.removeTrack(track);
};
onAddTrack_fn = function (event2) {
  __privateMethod(this, _TextRenderers_instances, addNativeTrack_fn).call(
    this,
    event2.detail
  );
};
onRemoveTrack_fn = function (event2) {
  __privateMethod(this, _TextRenderers_instances, removeNativeTrack_fn).call(
    this,
    event2.detail
  );
};
update_fn = function () {
  var _a6, _b2, _c2, _d2, _e, _f, _g;
  const currentTrack = __privateGet(this, _textTracks).selected;
  if (
    __privateGet(this, _video2) &&
    (__privateGet(this, _nativeDisplay) ||
      (currentTrack == null ? void 0 : currentTrack[TextTrackSymbol.nativeHLS]))
  ) {
    (_a6 = __privateGet(this, _customRenderer)) == null
      ? void 0
      : _a6.changeTrack(null);
    (_b2 = __privateGet(this, _nativeRenderer)) == null
      ? void 0
      : _b2.setDisplay(true);
    (_c2 = __privateGet(this, _nativeRenderer)) == null
      ? void 0
      : _c2.changeTrack(currentTrack);
    return;
  }
  (_d2 = __privateGet(this, _nativeRenderer)) == null
    ? void 0
    : _d2.setDisplay(false);
  (_e = __privateGet(this, _nativeRenderer)) == null
    ? void 0
    : _e.changeTrack(null);
  if (!currentTrack) {
    (_f = __privateGet(this, _customRenderer)) == null
      ? void 0
      : _f.changeTrack(null);
    return;
  }
  const customRenderer = __privateGet(this, _renderers)
    .sort((a, b) => a.priority - b.priority)
    .find((renderer) =>
      renderer.canRender(currentTrack, __privateGet(this, _video2))
    );
  if (__privateGet(this, _customRenderer) !== customRenderer) {
    (_g = __privateGet(this, _customRenderer)) == null ? void 0 : _g.detach();
    customRenderer == null
      ? void 0
      : customRenderer.attach(__privateGet(this, _video2));
    __privateSet(this, _customRenderer, customRenderer ?? null);
  }
  customRenderer == null ? void 0 : customRenderer.changeTrack(currentTrack);
};
detach_fn = function () {
  var _a6, _b2;
  (_a6 = __privateGet(this, _nativeRenderer)) == null ? void 0 : _a6.detach();
  __privateSet(this, _nativeRenderer, null);
  (_b2 = __privateGet(this, _customRenderer)) == null ? void 0 : _b2.detach();
  __privateSet(this, _customRenderer, null);
};
var _a4,
  _canLoad2,
  _defaults,
  _storage,
  _preferredLang,
  _selectTracks,
  _pendingRemoval,
  _onTrackModeChangeBind,
  _TextTrackList_instances,
  onTrackModeChange_fn,
  saveCaptionsTrack_fn,
  saveLang_fn;
var TextTrackList = class extends List {
  constructor() {
    super();
    __privateAdd(this, _TextTrackList_instances);
    __privateAdd(this, _canLoad2, false);
    __privateAdd(this, _defaults, {});
    __privateAdd(this, _storage, null);
    __privateAdd(this, _preferredLang, null);
    /** @internal */
    __publicField(this, _a4);
    __privateAdd(
      this,
      _selectTracks,
      functionDebounce(async () => {
        var _a6;
        if (!__privateGet(this, _canLoad2)) return;
        if (
          !__privateGet(this, _preferredLang) &&
          __privateGet(this, _storage)
        ) {
          __privateSet(
            this,
            _preferredLang,
            await __privateGet(this, _storage).getLang()
          );
        }
        const showCaptions = await ((_a6 = __privateGet(this, _storage)) == null
            ? void 0
            : _a6.getCaptions()),
          kinds = [
            ['captions', 'subtitles'],
            'chapters',
            'descriptions',
            'metadata',
          ];
        for (const kind of kinds) {
          const tracks = this.getByKind(kind);
          if (tracks.find((t) => t.mode === 'showing')) continue;
          const preferredTrack = __privateGet(this, _preferredLang)
            ? tracks.find(
                (track2) =>
                  track2.language === __privateGet(this, _preferredLang)
              )
            : null;
          const defaultTrack = isArray(kind)
            ? __privateGet(this, _defaults)[
                kind.find((kind2) => __privateGet(this, _defaults)[kind2]) || ''
              ]
            : __privateGet(this, _defaults)[kind];
          const track = preferredTrack ?? defaultTrack,
            isCaptionsKind = track && isTrackCaptionKind(track);
          if (track && (!isCaptionsKind || showCaptions !== false)) {
            track.mode = 'showing';
            if (isCaptionsKind)
              __privateMethod(
                this,
                _TextTrackList_instances,
                saveCaptionsTrack_fn
              ).call(this, track);
          }
        }
      }, 300)
    );
    __privateAdd(this, _pendingRemoval, null);
    __privateAdd(
      this,
      _onTrackModeChangeBind,
      __privateMethod(
        this,
        _TextTrackList_instances,
        onTrackModeChange_fn
      ).bind(this)
    );
  }
  get selected() {
    const track = this.items.find(
      (t) => t.mode === 'showing' && isTrackCaptionKind(t)
    );
    return track ?? null;
  }
  get selectedIndex() {
    const selected = this.selected;
    return selected ? this.indexOf(selected) : -1;
  }
  get preferredLang() {
    return __privateGet(this, _preferredLang);
  }
  set preferredLang(lang) {
    __privateSet(this, _preferredLang, lang);
    __privateMethod(this, _TextTrackList_instances, saveLang_fn).call(
      this,
      lang
    );
  }
  add(init2, trigger) {
    const isTrack = init2 instanceof TextTrack,
      track = isTrack ? init2 : new TextTrack(init2),
      kind =
        init2.kind === 'captions' || init2.kind === 'subtitles'
          ? 'captions'
          : init2.kind;
    if (__privateGet(this, _defaults)[kind] && init2.default)
      delete init2.default;
    track.addEventListener(
      'mode-change',
      __privateGet(this, _onTrackModeChangeBind)
    );
    this[ListSymbol.add](track, trigger);
    track[TextTrackSymbol.crossOrigin] = this[TextTrackSymbol.crossOrigin];
    if (__privateGet(this, _canLoad2)) track[TextTrackSymbol.canLoad]();
    if (init2.default) __privateGet(this, _defaults)[kind] = track;
    __privateGet(this, _selectTracks).call(this);
    return this;
  }
  remove(track, trigger) {
    __privateSet(this, _pendingRemoval, track);
    if (!this.items.includes(track)) return;
    if (track === __privateGet(this, _defaults)[track.kind])
      delete __privateGet(this, _defaults)[track.kind];
    track.mode = 'disabled';
    track[TextTrackSymbol.onModeChange] = null;
    track.removeEventListener(
      'mode-change',
      __privateGet(this, _onTrackModeChangeBind)
    );
    this[ListSymbol.remove](track, trigger);
    __privateSet(this, _pendingRemoval, null);
    return this;
  }
  clear(trigger) {
    for (const track of [...this.items]) {
      this.remove(track, trigger);
    }
    return this;
  }
  getByKind(kind) {
    const kinds = Array.isArray(kind) ? kind : [kind];
    return this.items.filter((track) => kinds.includes(track.kind));
  }
  /** @internal */
  [((_a4 = TextTrackSymbol.crossOrigin), TextTrackSymbol.canLoad)]() {
    if (__privateGet(this, _canLoad2)) return;
    for (const track of this.items) track[TextTrackSymbol.canLoad]();
    __privateSet(this, _canLoad2, true);
    __privateGet(this, _selectTracks).call(this);
  }
  setStorage(storage) {
    __privateSet(this, _storage, storage);
  }
};
_canLoad2 = new WeakMap();
_defaults = new WeakMap();
_storage = new WeakMap();
_preferredLang = new WeakMap();
_selectTracks = new WeakMap();
_pendingRemoval = new WeakMap();
_onTrackModeChangeBind = new WeakMap();
_TextTrackList_instances = new WeakSet();
onTrackModeChange_fn = function (event2) {
  const track = event2.detail;
  if (
    __privateGet(this, _storage) &&
    isTrackCaptionKind(track) &&
    track !== __privateGet(this, _pendingRemoval)
  ) {
    __privateMethod(this, _TextTrackList_instances, saveCaptionsTrack_fn).call(
      this,
      track
    );
  }
  if (track.mode === 'showing') {
    const kinds = isTrackCaptionKind(track)
      ? ['captions', 'subtitles']
      : [track.kind];
    for (const t of this.items) {
      if (t.mode === 'showing' && t != track && kinds.includes(t.kind)) {
        t.mode = 'disabled';
      }
    }
  }
  this.dispatchEvent(
    new DOMEvent('mode-change', {
      detail: event2.detail,
      trigger: event2,
    })
  );
};
saveCaptionsTrack_fn = function (track) {
  var _a6, _b2;
  if (track.mode !== 'disabled') {
    __privateMethod(this, _TextTrackList_instances, saveLang_fn).call(
      this,
      track.language
    );
  }
  (_b2 =
    (_a6 = __privateGet(this, _storage)) == null ? void 0 : _a6.setCaptions) ==
  null
    ? void 0
    : _b2.call(_a6, track.mode === 'showing');
};
saveLang_fn = function (lang) {
  var _a6, _b2;
  (_b2 = (_a6 = __privateGet(this, _storage)) == null ? void 0 : _a6.setLang) ==
  null
    ? void 0
    : _b2.call(_a6, __privateSet(this, _preferredLang, lang));
};
var SET_AUTO = Symbol('SET_AUTO_QUALITY');
var ENABLE_AUTO = Symbol('ENABLE_AUTO_QUALITY');
var QualitySymbol = {
  setAuto: SET_AUTO,
  enableAuto: ENABLE_AUTO,
};
var _a5, _auto;
var VideoQualityList = class extends SelectList {
  constructor() {
    super(...arguments);
    __privateAdd(this, _auto, false);
    /**
     * Configures quality switching:
     *
     * - `current`: Trigger an immediate quality level switch. This will abort the current fragment
     * request if any, flush the whole buffer, and fetch fragment matching with current position
     * and requested quality level.
     *
     * - `next`: Trigger a quality level switch for next fragment. This could eventually flush
     * already buffered next fragment.
     *
     * - `load`: Set quality level for next loaded fragment.
     *
     * @see {@link https://www.vidstack.io/docs/player/api/video-quality#switch}
     * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#quality-switch-control-api}
     */
    __publicField(this, 'switch', 'current');
    /** @internal */
    __publicField(this, _a5);
  }
  /**
   * Whether automatic quality selection is enabled.
   */
  get auto() {
    return __privateGet(this, _auto) || this.readonly;
  }
  /** @internal */
  [((_a5 = QualitySymbol.enableAuto), ListSymbol.onUserSelect)]() {
    this[QualitySymbol.setAuto](false);
  }
  /** @internal */
  [ListSymbol.onReset](trigger) {
    this[QualitySymbol.enableAuto] = void 0;
    this[QualitySymbol.setAuto](false, trigger);
  }
  /**
   * Request automatic quality selection (if supported). This will be a no-op if the list is
   * `readonly` as that already implies auto-selection.
   */
  autoSelect(trigger) {
    var _a6;
    if (
      this.readonly ||
      __privateGet(this, _auto) ||
      !this[QualitySymbol.enableAuto]
    )
      return;
    (_a6 = this[QualitySymbol.enableAuto]) == null
      ? void 0
      : _a6.call(this, trigger);
    this[QualitySymbol.setAuto](true, trigger);
  }
  getBySrc(src) {
    return this.items.find((quality) => quality.src === src);
  }
  /** @internal */
  [QualitySymbol.setAuto](auto, trigger) {
    if (__privateGet(this, _auto) === auto) return;
    __privateSet(this, _auto, auto);
    this.dispatchEvent(
      new DOMEvent('auto-change', {
        detail: auto,
        trigger,
      })
    );
  }
};
_auto = new WeakMap();
function sortVideoQualities(qualities, desc) {
  return [...qualities].sort(
    desc ? compareVideoQualityDesc : compareVideoQualityAsc
  );
}
function compareVideoQualityAsc(a, b) {
  return a.height === b.height
    ? (a.bitrate ?? 0) - (b.bitrate ?? 0)
    : a.height - b.height;
}
function compareVideoQualityDesc(a, b) {
  return b.height === a.height
    ? (b.bitrate ?? 0) - (a.bitrate ?? 0)
    : b.height - a.height;
}
function isAudioProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'AUDIO';
}
function isVideoProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'VIDEO';
}
function isHLSProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'HLS';
}
function isDASHProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'DASH';
}
function isYouTubeProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'YOUTUBE';
}
function isVimeoProvider(provider2) {
  return (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'VIMEO';
}
function isGoogleCastProvider(provider2) {
  return (
    (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'GOOGLE_CAST'
  );
}
function isHTMLAudioElement(element) {
  return !IS_SERVER && element instanceof HTMLAudioElement;
}
function isHTMLVideoElement(element) {
  return !IS_SERVER && element instanceof HTMLVideoElement;
}
function isHTMLMediaElement(element) {
  return isHTMLAudioElement(element) || isHTMLVideoElement(element);
}
function isHTMLIFrameElement(element) {
  return !IS_SERVER && element instanceof HTMLIFrameElement;
}
var MediaPlayerController = class extends ViewController {};
var MEDIA_KEY_SHORTCUTS = {
  togglePaused: 'k Space',
  toggleMuted: 'm',
  toggleFullscreen: 'f',
  togglePictureInPicture: 'i',
  toggleCaptions: 'c',
  seekBackward: 'j J ArrowLeft',
  seekForward: 'l L ArrowRight',
  volumeUp: 'ArrowUp',
  volumeDown: 'ArrowDown',
  speedUp: '>',
  slowDown: '<',
};
var MODIFIER_KEYS = /* @__PURE__ */ new Set(['Shift', 'Alt', 'Meta', 'Ctrl']);
var BUTTON_SELECTORS = 'button, [role="button"]';
var IGNORE_SELECTORS =
  'input, textarea, select, [contenteditable], [role^="menuitem"], [role="timer"]';
var _media2,
  _MediaKeyboardController_instances,
  onTargetChange_fn,
  onKeyUp_fn,
  onKeyDown_fn,
  onPreventVideoKeys_fn,
  getMatchingMethod_fn,
  _seekTotal,
  calcSeekAmount_fn,
  _timeSlider,
  forwardTimeKeyboardEvent_fn,
  seeking_fn;
var MediaKeyboardController = class extends MediaPlayerController {
  constructor(media) {
    super();
    __privateAdd(this, _MediaKeyboardController_instances);
    __privateAdd(this, _media2);
    __privateAdd(this, _seekTotal);
    __privateAdd(this, _timeSlider, null);
    __privateSet(this, _media2, media);
  }
  onConnect() {
    effect(
      __privateMethod(
        this,
        _MediaKeyboardController_instances,
        onTargetChange_fn
      ).bind(this)
    );
  }
};
_media2 = new WeakMap();
_MediaKeyboardController_instances = new WeakSet();
onTargetChange_fn = function () {
  const { keyDisabled, keyTarget } = this.$props;
  if (keyDisabled()) return;
  const target = keyTarget() === 'player' ? this.el : document,
    $active = signal(false);
  if (target === this.el) {
    new EventsController(this.el)
      .add('focusin', () => $active.set(true))
      .add('focusout', (event2) => {
        if (!this.el.contains(event2.target)) $active.set(false);
      });
  } else {
    if (!peek($active))
      $active.set(document.querySelector('[data-media-player]') === this.el);
    listenEvent(document, 'focusin', (event2) => {
      const activePlayer = event2
        .composedPath()
        .find((el) => el instanceof Element && el.localName === 'media-player');
      if (activePlayer !== void 0) $active.set(this.el === activePlayer);
    });
  }
  effect(() => {
    if (!$active()) return;
    new EventsController(target)
      .add(
        'keyup',
        __privateMethod(
          this,
          _MediaKeyboardController_instances,
          onKeyUp_fn
        ).bind(this)
      )
      .add(
        'keydown',
        __privateMethod(
          this,
          _MediaKeyboardController_instances,
          onKeyDown_fn
        ).bind(this)
      )
      .add(
        'keydown',
        __privateMethod(
          this,
          _MediaKeyboardController_instances,
          onPreventVideoKeys_fn
        ).bind(this),
        { capture: true }
      );
  });
};
onKeyUp_fn = function (event2) {
  var _a6, _b2;
  const focusedEl = document.activeElement;
  if (
    !event2.key ||
    !this.$state.canSeek() ||
    (focusedEl == null ? void 0 : focusedEl.matches(IGNORE_SELECTORS))
  ) {
    return;
  }
  let { method: method2, value } = __privateMethod(
    this,
    _MediaKeyboardController_instances,
    getMatchingMethod_fn
  ).call(this, event2);
  if (!isString(value) && !isArray(value)) {
    (_a6 = value == null ? void 0 : value.onKeyUp) == null
      ? void 0
      : _a6.call(value, {
          event: event2,
          player: __privateGet(this, _media2).player,
          remote: __privateGet(this, _media2).remote,
        });
    (_b2 = value == null ? void 0 : value.callback) == null
      ? void 0
      : _b2.call(value, event2, __privateGet(this, _media2).remote);
    return;
  }
  if (method2 == null ? void 0 : method2.startsWith('seek')) {
    event2.preventDefault();
    event2.stopPropagation();
    if (__privateGet(this, _timeSlider)) {
      __privateMethod(
        this,
        _MediaKeyboardController_instances,
        forwardTimeKeyboardEvent_fn
      ).call(this, event2, method2 === 'seekForward');
      __privateSet(this, _timeSlider, null);
    } else {
      __privateGet(this, _media2).remote.seek(
        __privateGet(this, _seekTotal),
        event2
      );
      __privateSet(this, _seekTotal, void 0);
    }
  }
  if (method2 == null ? void 0 : method2.startsWith('volume')) {
    const volumeSlider = this.el.querySelector('[data-media-volume-slider]');
    volumeSlider == null
      ? void 0
      : volumeSlider.dispatchEvent(
          new KeyboardEvent('keyup', {
            key: method2 === 'volumeUp' ? 'Up' : 'Down',
            shiftKey: event2.shiftKey,
            trigger: event2,
          })
        );
  }
};
onKeyDown_fn = function (event2) {
  var _a6, _b2, _c2, _d2;
  if (!event2.key || MODIFIER_KEYS.has(event2.key)) return;
  const focusedEl = document.activeElement;
  if (
    (focusedEl == null ? void 0 : focusedEl.matches(IGNORE_SELECTORS)) ||
    (isKeyboardClick(event2) &&
      (focusedEl == null ? void 0 : focusedEl.matches(BUTTON_SELECTORS)))
  ) {
    return;
  }
  let { method: method2, value } = __privateMethod(
      this,
      _MediaKeyboardController_instances,
      getMatchingMethod_fn
    ).call(this, event2),
    isNumberPress = !event2.metaKey && /^[0-9]$/.test(event2.key);
  if (!isString(value) && !isArray(value) && !isNumberPress) {
    (_a6 = value == null ? void 0 : value.onKeyDown) == null
      ? void 0
      : _a6.call(value, {
          event: event2,
          player: __privateGet(this, _media2).player,
          remote: __privateGet(this, _media2).remote,
        });
    (_b2 = value == null ? void 0 : value.callback) == null
      ? void 0
      : _b2.call(value, event2, __privateGet(this, _media2).remote);
    return;
  }
  if (!method2 && isNumberPress) {
    event2.preventDefault();
    event2.stopPropagation();
    __privateGet(this, _media2).remote.seek(
      (this.$state.duration() / 10) * Number(event2.key),
      event2
    );
    return;
  }
  if (!method2) return;
  event2.preventDefault();
  event2.stopPropagation();
  switch (method2) {
    case 'seekForward':
    case 'seekBackward':
      __privateMethod(
        this,
        _MediaKeyboardController_instances,
        seeking_fn
      ).call(this, event2, method2, method2 === 'seekForward');
      break;
    case 'volumeUp':
    case 'volumeDown':
      const volumeSlider = this.el.querySelector('[data-media-volume-slider]');
      if (volumeSlider) {
        volumeSlider.dispatchEvent(
          new KeyboardEvent('keydown', {
            key: method2 === 'volumeUp' ? 'Up' : 'Down',
            shiftKey: event2.shiftKey,
            trigger: event2,
          })
        );
      } else {
        const value2 = event2.shiftKey ? 0.1 : 0.05;
        __privateGet(this, _media2).remote.changeVolume(
          this.$state.volume() + (method2 === 'volumeUp' ? +value2 : -value2),
          event2
        );
      }
      break;
    case 'toggleFullscreen':
      __privateGet(this, _media2).remote.toggleFullscreen(
        'prefer-media',
        event2
      );
      break;
    case 'speedUp':
    case 'slowDown':
      const playbackRate = this.$state.playbackRate();
      __privateGet(this, _media2).remote.changePlaybackRate(
        Math.max(
          0.25,
          Math.min(2, playbackRate + (method2 === 'speedUp' ? 0.25 : -0.25))
        ),
        event2
      );
      break;
    default:
      (_d2 = (_c2 = __privateGet(this, _media2).remote)[method2]) == null
        ? void 0
        : _d2.call(_c2, event2);
  }
  this.$state.lastKeyboardAction.set({
    action: method2,
    event: event2,
  });
};
onPreventVideoKeys_fn = function (event2) {
  if (
    isHTMLMediaElement(event2.target) &&
    __privateMethod(
      this,
      _MediaKeyboardController_instances,
      getMatchingMethod_fn
    ).call(this, event2).method
  ) {
    event2.preventDefault();
  }
};
getMatchingMethod_fn = function (event2) {
  const keyShortcuts = {
    ...this.$props.keyShortcuts(),
    ...__privateGet(this, _media2).ariaKeys,
  };
  const method2 = Object.keys(keyShortcuts).find((method22) => {
    var _a6;
    const value = keyShortcuts[method22],
      keys = isArray(value)
        ? value.join(' ')
        : isString(value)
        ? value
        : value == null
        ? void 0
        : value.keys;
    const combinations =
      (_a6 = isArray(keys) ? keys : keys == null ? void 0 : keys.split(' ')) ==
      null
        ? void 0
        : _a6.map((key) =>
            replaceSymbolKeys(key)
              .replace(/Control/g, 'Ctrl')
              .split('+')
          );
    return combinations == null
      ? void 0
      : combinations.some((combo) => {
          const modifierKeys = new Set(
            combo.filter((key) => MODIFIER_KEYS.has(key))
          );
          for (const modKey of MODIFIER_KEYS) {
            const modKeyProp = modKey.toLowerCase() + 'Key';
            if (!modifierKeys.has(modKey) && event2[modKeyProp]) {
              return false;
            }
          }
          return combo.every((key) => {
            return MODIFIER_KEYS.has(key)
              ? event2[key.toLowerCase() + 'Key']
              : event2.key === key.replace('Space', ' ');
          });
        });
  });
  return {
    method: method2,
    value: method2 ? keyShortcuts[method2] : null,
  };
};
_seekTotal = new WeakMap();
calcSeekAmount_fn = function (event2, type) {
  const seekBy = event2.shiftKey ? 10 : 5;
  return __privateSet(
    this,
    _seekTotal,
    Math.max(
      0,
      Math.min(
        (__privateGet(this, _seekTotal) ?? this.$state.currentTime()) +
          (type === 'seekForward' ? +seekBy : -seekBy),
        this.$state.duration()
      )
    )
  );
};
_timeSlider = new WeakMap();
forwardTimeKeyboardEvent_fn = function (event2, forward) {
  var _a6;
  (_a6 = __privateGet(this, _timeSlider)) == null
    ? void 0
    : _a6.dispatchEvent(
        new KeyboardEvent(event2.type, {
          key: !forward ? 'Left' : 'Right',
          shiftKey: event2.shiftKey,
          trigger: event2,
        })
      );
};
seeking_fn = function (event2, type, forward) {
  if (!this.$state.canSeek()) return;
  if (!__privateGet(this, _timeSlider)) {
    __privateSet(
      this,
      _timeSlider,
      this.el.querySelector('[data-media-time-slider]')
    );
  }
  if (__privateGet(this, _timeSlider)) {
    __privateMethod(
      this,
      _MediaKeyboardController_instances,
      forwardTimeKeyboardEvent_fn
    ).call(this, event2, forward);
  } else {
    __privateGet(this, _media2).remote.seeking(
      __privateMethod(
        this,
        _MediaKeyboardController_instances,
        calcSeekAmount_fn
      ).call(this, event2, type),
      event2
    );
  }
};
var SYMBOL_KEY_MAP = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')'];
function replaceSymbolKeys(key) {
  return key.replace(/Shift\+(\d)/g, (_, num) => SYMBOL_KEY_MAP[num - 1]);
}
var _shortcut;
var ARIAKeyShortcuts = class extends ViewController {
  constructor(shortcut) {
    super();
    __privateAdd(this, _shortcut);
    __privateSet(this, _shortcut, shortcut);
  }
  onAttach(el) {
    const { $props, ariaKeys } = useMediaContext(),
      keys = el.getAttribute('aria-keyshortcuts');
    if (keys) {
      ariaKeys[__privateGet(this, _shortcut)] = keys;
      if (!IS_SERVER) {
        onDispose(() => {
          delete ariaKeys[__privateGet(this, _shortcut)];
        });
      }
      return;
    }
    const shortcuts = $props.keyShortcuts()[__privateGet(this, _shortcut)];
    if (shortcuts) {
      const keys2 = isArray(shortcuts)
        ? shortcuts.join(' ')
        : isString(shortcuts)
        ? shortcuts
        : shortcuts == null
        ? void 0
        : shortcuts.keys;
      el.setAttribute(
        'aria-keyshortcuts',
        isArray(keys2) ? keys2.join(' ') : keys2
      );
    }
  }
};
_shortcut = new WeakMap();
var _idleTimer,
  _pausedTracking,
  _hideOnMouseLeave,
  _isMouseOutside,
  _focusedItem,
  _canIdle,
  _MediaControls_instances,
  init_fn,
  watchMouse_fn,
  watchPaused_fn,
  onPlay_fn,
  onPause_fn,
  onEnd_fn,
  onMouseEnter_fn,
  onMouseLeave_fn,
  clearIdleTimer_fn,
  onStopIdle_fn,
  changeVisibility_fn,
  onChange_fn2;
var MediaControls = class extends MediaPlayerController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MediaControls_instances);
    __privateAdd(this, _idleTimer, -2);
    __privateAdd(this, _pausedTracking, false);
    __privateAdd(this, _hideOnMouseLeave, signal(false));
    __privateAdd(this, _isMouseOutside, signal(false));
    __privateAdd(this, _focusedItem, null);
    __privateAdd(this, _canIdle, signal(true));
    /**
     * The default amount of delay in milliseconds while media playback is progressing without user
     * activity to indicate an idle state (i.e., hide controls).
     *
     * @defaultValue 2000
     */
    __publicField(this, 'defaultDelay', 2e3);
  }
  /**
   * Whether controls can hide after a delay in user interaction. If this is false, controls will
   * not hide and be user controlled.
   */
  get canIdle() {
    return __privateGet(this, _canIdle).call(this);
  }
  set canIdle(canIdle) {
    __privateGet(this, _canIdle).set(canIdle);
  }
  /**
   * Whether controls visibility should be toggled when the mouse enters and leaves the player
   * container.
   *
   * @defaultValue false
   */
  get hideOnMouseLeave() {
    const { hideControlsOnMouseLeave } = this.$props;
    return (
      __privateGet(this, _hideOnMouseLeave).call(this) ||
      hideControlsOnMouseLeave()
    );
  }
  set hideOnMouseLeave(hide) {
    __privateGet(this, _hideOnMouseLeave).set(hide);
  }
  /**
   * Whether media controls are currently visible.
   */
  get showing() {
    return this.$state.controlsVisible();
  }
  /**
   * Show controls.
   */
  show(delay = 0, trigger) {
    __privateMethod(this, _MediaControls_instances, clearIdleTimer_fn).call(
      this
    );
    if (!__privateGet(this, _pausedTracking)) {
      __privateMethod(this, _MediaControls_instances, changeVisibility_fn).call(
        this,
        true,
        delay,
        trigger
      );
    }
  }
  /**
   * Hide controls.
   */
  hide(delay = this.defaultDelay, trigger) {
    __privateMethod(this, _MediaControls_instances, clearIdleTimer_fn).call(
      this
    );
    if (!__privateGet(this, _pausedTracking)) {
      __privateMethod(this, _MediaControls_instances, changeVisibility_fn).call(
        this,
        false,
        delay,
        trigger
      );
    }
  }
  /**
   * Whether all idle tracking on controls should be paused until resumed again.
   */
  pause(trigger) {
    __privateSet(this, _pausedTracking, true);
    __privateMethod(this, _MediaControls_instances, clearIdleTimer_fn).call(
      this
    );
    __privateMethod(this, _MediaControls_instances, changeVisibility_fn).call(
      this,
      true,
      0,
      trigger
    );
  }
  resume(trigger) {
    __privateSet(this, _pausedTracking, false);
    if (this.$state.paused()) return;
    __privateMethod(this, _MediaControls_instances, changeVisibility_fn).call(
      this,
      false,
      this.defaultDelay,
      trigger
    );
  }
  onConnect() {
    effect(__privateMethod(this, _MediaControls_instances, init_fn).bind(this));
  }
};
_idleTimer = new WeakMap();
_pausedTracking = new WeakMap();
_hideOnMouseLeave = new WeakMap();
_isMouseOutside = new WeakMap();
_focusedItem = new WeakMap();
_canIdle = new WeakMap();
_MediaControls_instances = new WeakSet();
init_fn = function () {
  const { viewType } = this.$state;
  if (!this.el || !__privateGet(this, _canIdle).call(this)) return;
  if (viewType() === 'audio') {
    this.show();
    return;
  }
  effect(
    __privateMethod(this, _MediaControls_instances, watchMouse_fn).bind(this)
  );
  effect(
    __privateMethod(this, _MediaControls_instances, watchPaused_fn).bind(this)
  );
  const onPlay = __privateMethod(
      this,
      _MediaControls_instances,
      onPlay_fn
    ).bind(this),
    onPause = __privateMethod(this, _MediaControls_instances, onPause_fn).bind(
      this
    ),
    onEnd = __privateMethod(this, _MediaControls_instances, onEnd_fn).bind(
      this
    );
  new EventsController(this.el)
    .add('can-play', (event2) => this.show(0, event2))
    .add('play', onPlay)
    .add('pause', onPause)
    .add('end', onEnd)
    .add('auto-play-fail', onPause);
};
watchMouse_fn = function () {
  if (!this.el) return;
  const { started, pointer, paused } = this.$state;
  if (!started() || pointer() !== 'fine') return;
  const events = new EventsController(this.el),
    shouldHideOnMouseLeave = this.hideOnMouseLeave;
  if (
    !shouldHideOnMouseLeave ||
    !__privateGet(this, _isMouseOutside).call(this)
  ) {
    effect(() => {
      if (!paused())
        events.add(
          'pointermove',
          __privateMethod(this, _MediaControls_instances, onStopIdle_fn).bind(
            this
          )
        );
    });
  }
  if (shouldHideOnMouseLeave) {
    events
      .add(
        'mouseenter',
        __privateMethod(this, _MediaControls_instances, onMouseEnter_fn).bind(
          this
        )
      )
      .add(
        'mouseleave',
        __privateMethod(this, _MediaControls_instances, onMouseLeave_fn).bind(
          this
        )
      );
  }
};
watchPaused_fn = function () {
  const { paused, started, autoPlayError } = this.$state;
  if (paused() || (autoPlayError() && !started())) return;
  const onStopIdle = __privateMethod(
    this,
    _MediaControls_instances,
    onStopIdle_fn
  ).bind(this);
  effect(() => {
    if (!this.el) return;
    const pointer = this.$state.pointer(),
      isTouch = pointer === 'coarse',
      events = new EventsController(this.el),
      eventTypes = [isTouch ? 'touchend' : 'pointerup', 'keydown'];
    for (const eventType of eventTypes) {
      events.add(eventType, onStopIdle, { passive: false });
    }
  });
};
onPlay_fn = function (event2) {
  if (event2.triggers.hasType('ended')) return;
  this.show(0, event2);
  this.hide(void 0, event2);
};
onPause_fn = function (event2) {
  this.show(0, event2);
};
onEnd_fn = function (event2) {
  const { loop } = this.$state;
  if (loop()) this.hide(0, event2);
};
onMouseEnter_fn = function (event2) {
  __privateGet(this, _isMouseOutside).set(false);
  this.show(0, event2);
  this.hide(void 0, event2);
};
onMouseLeave_fn = function (event2) {
  __privateGet(this, _isMouseOutside).set(true);
  this.hide(0, event2);
};
clearIdleTimer_fn = function () {
  window.clearTimeout(__privateGet(this, _idleTimer));
  __privateSet(this, _idleTimer, -1);
};
onStopIdle_fn = function (event2) {
  var _a6;
  if (
    // @ts-expect-error
    event2.MEDIA_GESTURE ||
    __privateGet(this, _pausedTracking) ||
    isTouchPinchEvent(event2)
  ) {
    return;
  }
  if (isKeyboardEvent(event2)) {
    if (event2.key === 'Escape') {
      (_a6 = this.el) == null ? void 0 : _a6.focus();
      __privateSet(this, _focusedItem, null);
    } else if (__privateGet(this, _focusedItem)) {
      event2.preventDefault();
      requestAnimationFrame(() => {
        var _a7;
        (_a7 = __privateGet(this, _focusedItem)) == null ? void 0 : _a7.focus();
        __privateSet(this, _focusedItem, null);
      });
    }
  }
  this.show(0, event2);
  this.hide(this.defaultDelay, event2);
};
changeVisibility_fn = function (visible, delay, trigger) {
  if (delay === 0) {
    __privateMethod(this, _MediaControls_instances, onChange_fn2).call(
      this,
      visible,
      trigger
    );
    return;
  }
  __privateSet(
    this,
    _idleTimer,
    window.setTimeout(() => {
      if (!this.scope) return;
      __privateMethod(this, _MediaControls_instances, onChange_fn2).call(
        this,
        visible && !__privateGet(this, _pausedTracking),
        trigger
      );
    }, delay)
  );
};
onChange_fn2 = function (visible, trigger) {
  var _a6;
  if (this.$state.controlsVisible() === visible) return;
  this.$state.controlsVisible.set(visible);
  if (
    !visible &&
    document.activeElement &&
    ((_a6 = this.el) == null ? void 0 : _a6.contains(document.activeElement))
  ) {
    __privateSet(this, _focusedItem, document.activeElement);
    requestAnimationFrame(() => {
      var _a7;
      (_a7 = this.el) == null ? void 0 : _a7.focus({ preventScroll: true });
    });
  }
  this.dispatch('controls-change', {
    detail: visible,
    trigger,
  });
};
var CAN_FULLSCREEN = fscreen.fullscreenEnabled;
var _listening,
  _active,
  _FullscreenController_instances,
  onDisconnect_fn,
  onChange_fn3,
  onError_fn;
var FullscreenController = class extends ViewController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _FullscreenController_instances);
    /**
     * Tracks whether we're the active fullscreen event listener. Fullscreen events can only be
     * listened to globally on the document so we need to know if they relate to the current host
     * element or not.
     */
    __privateAdd(this, _listening, false);
    __privateAdd(this, _active, false);
  }
  get active() {
    return __privateGet(this, _active);
  }
  get supported() {
    return CAN_FULLSCREEN;
  }
  onConnect() {
    new EventsController(fscreen)
      .add(
        'fullscreenchange',
        __privateMethod(
          this,
          _FullscreenController_instances,
          onChange_fn3
        ).bind(this)
      )
      .add(
        'fullscreenerror',
        __privateMethod(this, _FullscreenController_instances, onError_fn).bind(
          this
        )
      );
    onDispose(
      __privateMethod(
        this,
        _FullscreenController_instances,
        onDisconnect_fn
      ).bind(this)
    );
  }
  async enter() {
    try {
      __privateSet(this, _listening, true);
      if (!this.el || isFullscreen(this.el)) return;
      assertFullscreenAPI();
      return fscreen.requestFullscreen(this.el);
    } catch (error) {
      __privateSet(this, _listening, false);
      throw error;
    }
  }
  async exit() {
    if (!this.el || !isFullscreen(this.el)) return;
    assertFullscreenAPI();
    return fscreen.exitFullscreen();
  }
};
_listening = new WeakMap();
_active = new WeakMap();
_FullscreenController_instances = new WeakSet();
onDisconnect_fn = async function () {
  if (CAN_FULLSCREEN) await this.exit();
};
onChange_fn3 = function (event2) {
  const active = isFullscreen(this.el);
  if (active === __privateGet(this, _active)) return;
  if (!active) __privateSet(this, _listening, false);
  __privateSet(this, _active, active);
  this.dispatch('fullscreen-change', { detail: active, trigger: event2 });
};
onError_fn = function (event2) {
  if (!__privateGet(this, _listening)) return;
  this.dispatch('fullscreen-error', { detail: null, trigger: event2 });
  __privateSet(this, _listening, false);
};
function canFullscreen() {
  return CAN_FULLSCREEN;
}
function isFullscreen(host) {
  if (fscreen.fullscreenElement === host) return true;
  try {
    return host.matches(
      // @ts-expect-error - `fullscreenPseudoClass` is missing from `@types/fscreen`.
      fscreen.fullscreenPseudoClass
    );
  } catch (error) {
    return false;
  }
}
function assertFullscreenAPI() {
  if (CAN_FULLSCREEN) return;
  throw Error(
    '[vidstack] fullscreen API is not enabled or supported in this environment'
  );
}
var _type,
  _locked,
  _currentLock,
  _ScreenOrientationController_instances,
  onDisconnect_fn2,
  onOrientationChange_fn,
  assertScreenOrientationAPI_fn,
  getScreenOrientation_fn;
var _ScreenOrientationController = class _ScreenOrientationController extends ViewController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _ScreenOrientationController_instances);
    __privateAdd(
      this,
      _type,
      signal(
        __privateMethod(
          this,
          _ScreenOrientationController_instances,
          getScreenOrientation_fn
        ).call(this)
      )
    );
    __privateAdd(this, _locked, signal(false));
    __privateAdd(this, _currentLock);
  }
  /**
   * The current screen orientation type.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get type() {
    return __privateGet(this, _type).call(this);
  }
  /**
   * Whether the screen orientation is currently locked.
   *
   * @signal
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ScreenOrientation}
   * @see https://w3c.github.io/screen-orientation/#screen-orientation-types-and-locks
   */
  get locked() {
    return __privateGet(this, _locked).call(this);
  }
  /**
   * Whether the viewport is in a portrait orientation.
   *
   * @signal
   */
  get portrait() {
    return __privateGet(this, _type).call(this).startsWith('portrait');
  }
  /**
   * Whether the viewport is in a landscape orientation.
   *
   * @signal
   */
  get landscape() {
    return __privateGet(this, _type).call(this).startsWith('landscape');
  }
  /**
   * Whether the native Screen Orientation API is available.
   */
  get supported() {
    return _ScreenOrientationController.supported;
  }
  onConnect() {
    if (this.supported) {
      listenEvent(
        screen.orientation,
        'change',
        __privateMethod(
          this,
          _ScreenOrientationController_instances,
          onOrientationChange_fn
        ).bind(this)
      );
    } else {
      const query = window.matchMedia('(orientation: landscape)');
      query.onchange = __privateMethod(
        this,
        _ScreenOrientationController_instances,
        onOrientationChange_fn
      ).bind(this);
      onDispose(() => (query.onchange = null));
    }
    onDispose(
      __privateMethod(
        this,
        _ScreenOrientationController_instances,
        onDisconnect_fn2
      ).bind(this)
    );
  }
  /**
   * Locks the orientation of the screen to the desired orientation type using the
   * Screen Orientation API.
   *
   * @param lockType - The screen lock orientation type.
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async lock(lockType) {
    if (
      peek(__privateGet(this, _locked)) ||
      __privateGet(this, _currentLock) === lockType
    )
      return;
    __privateMethod(
      this,
      _ScreenOrientationController_instances,
      assertScreenOrientationAPI_fn
    ).call(this);
    await screen.orientation.lock(lockType);
    __privateGet(this, _locked).set(true);
    __privateSet(this, _currentLock, lockType);
  }
  /**
   * Unlocks the orientation of the screen to it's default state using the Screen Orientation
   * API. This method will throw an error if the API is unavailable.
   *
   * @throws Error - If screen orientation API is unavailable.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Screen/orientation}
   * @see {@link https://w3c.github.io/screen-orientation}
   */
  async unlock() {
    if (!peek(__privateGet(this, _locked))) return;
    __privateMethod(
      this,
      _ScreenOrientationController_instances,
      assertScreenOrientationAPI_fn
    ).call(this);
    __privateSet(this, _currentLock, void 0);
    await screen.orientation.unlock();
    __privateGet(this, _locked).set(false);
  }
};
_type = new WeakMap();
_locked = new WeakMap();
_currentLock = new WeakMap();
_ScreenOrientationController_instances = new WeakSet();
onDisconnect_fn2 = async function () {
  if (this.supported && __privateGet(this, _locked).call(this))
    await this.unlock();
};
onOrientationChange_fn = function (event2) {
  __privateGet(this, _type).set(
    __privateMethod(
      this,
      _ScreenOrientationController_instances,
      getScreenOrientation_fn
    ).call(this)
  );
  this.dispatch('orientation-change', {
    detail: {
      orientation: peek(__privateGet(this, _type)),
      lock: __privateGet(this, _currentLock),
    },
    trigger: event2,
  });
};
assertScreenOrientationAPI_fn = function () {
  if (this.supported) return;
  throw Error('[vidstack] screen orientation API is not available');
};
getScreenOrientation_fn = function () {
  if (IS_SERVER) return 'portrait-primary';
  if (this.supported) return window.screen.orientation.type;
  return window.innerWidth >= window.innerHeight
    ? 'landscape-primary'
    : 'portrait-primary';
};
/**
 * Whether the native Screen Orientation API is available.
 */
__publicField(_ScreenOrientationController, 'supported', canOrientScreen());
var ScreenOrientationController = _ScreenOrientationController;
var AudioProviderLoader = class {
  constructor() {
    __publicField(this, 'name', 'audio');
    __publicField(this, 'target');
  }
  canPlay(src) {
    if (!isAudioSrc(src)) return false;
    return (
      IS_SERVER ||
      !isString(src.src) ||
      src.type === '?' ||
      canPlayAudioType(this.target, src.type)
    );
  }
  mediaType() {
    return 'audio';
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load audio provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<audio>` element was not found - did you forget to include `<media-provider>`?'
      );
    }
    return new (await import('./vidstack-CvY7pagE-KABT244C.js')).AudioProvider(
      this.target,
      ctx
    );
  }
};
var VideoProviderLoader = class {
  constructor() {
    __publicField(this, 'name', 'video');
    __publicField(this, 'target');
  }
  canPlay(src) {
    if (!isVideoSrc(src)) return false;
    return (
      IS_SERVER ||
      !isString(src.src) ||
      src.type === '?' ||
      canPlayVideoType(this.target, src.type)
    );
  }
  mediaType() {
    return 'video';
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load video provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<video>` element was not found - did you forget to include media provider?'
      );
    }
    return new (
      await Promise.resolve().then(function () {
        return provider$1;
      })
    ).VideoProvider(this.target, ctx);
  }
};
var _HLSProviderLoader = class _HLSProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    __publicField(this, 'name', 'hls');
  }
  canPlay(src) {
    return _HLSProviderLoader.supported && isHLSSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load hls provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?'
      );
    }
    return new (await import('./vidstack-GNfRj3wa-6L7WR2GG.js')).HLSProvider(
      this.target,
      context
    );
  }
};
__publicField(_HLSProviderLoader, 'supported', isHLSSupported());
var HLSProviderLoader = _HLSProviderLoader;
var audioContext = null;
var gainNodes = [];
var elAudioSources = [];
function getOrCreateAudioCtx() {
  return audioContext ?? (audioContext = new AudioContext());
}
function createGainNode() {
  const audioCtx = getOrCreateAudioCtx(),
    gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNodes.push(gainNode);
  return gainNode;
}
function createElementSource(el, gainNode) {
  const audioCtx = getOrCreateAudioCtx(),
    src = audioCtx.createMediaElementSource(el);
  if (gainNode) {
    src.connect(gainNode);
  }
  elAudioSources.push(src);
  return src;
}
function destroyGainNode(node) {
  const idx = gainNodes.indexOf(node);
  if (idx !== -1) {
    gainNodes.splice(idx, 1);
    node.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function destroyElementSource(src) {
  const idx = elAudioSources.indexOf(src);
  if (idx !== -1) {
    elAudioSources.splice(idx, 1);
    src.disconnect();
    freeAudioCtxWhenAllResourcesFreed();
  }
}
function freeAudioCtxWhenAllResourcesFreed() {
  if (audioContext && gainNodes.length === 0 && elAudioSources.length === 0) {
    audioContext.close().then(() => {
      audioContext = null;
    });
  }
}
var _media3,
  _onChange,
  _gainNode,
  _srcAudioNode,
  _AudioGain_instances,
  destroySrcNode_fn,
  destroyGainNode_fn;
var AudioGain = class {
  constructor(media, onChange) {
    __privateAdd(this, _AudioGain_instances);
    __privateAdd(this, _media3);
    __privateAdd(this, _onChange);
    __privateAdd(this, _gainNode, null);
    __privateAdd(this, _srcAudioNode, null);
    __privateSet(this, _media3, media);
    __privateSet(this, _onChange, onChange);
  }
  get currentGain() {
    var _a6, _b2;
    return (
      ((_b2 =
        (_a6 = __privateGet(this, _gainNode)) == null ? void 0 : _a6.gain) ==
      null
        ? void 0
        : _b2.value) ?? null
    );
  }
  get supported() {
    return true;
  }
  setGain(gain) {
    const currGain = this.currentGain;
    if (gain === this.currentGain) {
      return;
    }
    if (gain === 1 && currGain !== 1) {
      this.removeGain();
      return;
    }
    if (!__privateGet(this, _gainNode)) {
      __privateSet(this, _gainNode, createGainNode());
      if (__privateGet(this, _srcAudioNode)) {
        __privateGet(this, _srcAudioNode).connect(
          __privateGet(this, _gainNode)
        );
      }
    }
    if (!__privateGet(this, _srcAudioNode)) {
      __privateSet(
        this,
        _srcAudioNode,
        createElementSource(
          __privateGet(this, _media3),
          __privateGet(this, _gainNode)
        )
      );
    }
    __privateGet(this, _gainNode).gain.value = gain;
    __privateGet(this, _onChange).call(this, gain);
  }
  removeGain() {
    if (!__privateGet(this, _gainNode)) return;
    if (__privateGet(this, _srcAudioNode)) {
      __privateGet(this, _srcAudioNode).connect(
        getOrCreateAudioCtx().destination
      );
    }
    __privateMethod(this, _AudioGain_instances, destroyGainNode_fn).call(this);
    __privateGet(this, _onChange).call(this, null);
  }
  destroy() {
    __privateMethod(this, _AudioGain_instances, destroySrcNode_fn).call(this);
    __privateMethod(this, _AudioGain_instances, destroyGainNode_fn).call(this);
  }
};
_media3 = new WeakMap();
_onChange = new WeakMap();
_gainNode = new WeakMap();
_srcAudioNode = new WeakMap();
_AudioGain_instances = new WeakSet();
destroySrcNode_fn = function () {
  if (!__privateGet(this, _srcAudioNode)) return;
  try {
    destroyElementSource(__privateGet(this, _srcAudioNode));
  } catch (e) {
  } finally {
    __privateSet(this, _srcAudioNode, null);
  }
};
destroyGainNode_fn = function () {
  if (!__privateGet(this, _gainNode)) return;
  try {
    destroyGainNode(__privateGet(this, _gainNode));
  } catch (e) {
  } finally {
    __privateSet(this, _gainNode, null);
  }
};
var PAGE_EVENTS = ['focus', 'blur', 'visibilitychange', 'pageshow', 'pagehide'];
var _state,
  _visibility,
  _safariBeforeUnloadTimeout,
  _PageVisibility_instances,
  handlePageEvent_fn;
var PageVisibility = class {
  constructor() {
    __privateAdd(this, _PageVisibility_instances);
    __privateAdd(this, _state, signal(determinePageState()));
    __privateAdd(
      this,
      _visibility,
      signal(IS_SERVER ? 'visible' : document.visibilityState)
    );
    __privateAdd(this, _safariBeforeUnloadTimeout);
  }
  connect() {
    const events = new EventsController(window),
      handlePageEvent = __privateMethod(
        this,
        _PageVisibility_instances,
        handlePageEvent_fn
      ).bind(this);
    for (const eventType of PAGE_EVENTS) {
      events.add(eventType, handlePageEvent);
    }
    if (IS_SAFARI) {
      events.add('beforeunload', (event2) => {
        __privateSet(
          this,
          _safariBeforeUnloadTimeout,
          setTimeout(() => {
            if (!(event2.defaultPrevented || event2.returnValue.length > 0)) {
              __privateGet(this, _state).set('hidden');
              __privateGet(this, _visibility).set('hidden');
            }
          }, 0)
        );
      });
    }
  }
  /**
   * The current page state. Important to note we only account for a subset of page states, as
   * the rest aren't valuable to the player at the moment.
   *
   * - **active:** A page is in the active state if it is visible and has input focus.
   * - **passive:** A page is in the passive state if it is visible and does not have input focus.
   * - **hidden:** A page is in the hidden state if it is not visible.
   *
   * @see https://developers.google.com/web/updates/2018/07/page-lifecycle-api#states
   */
  get pageState() {
    return __privateGet(this, _state).call(this);
  }
  /**
   * The current document visibility state.
   *
   * - **visible:** The page content may be at least partially visible. In practice, this means that
   * the page is the foreground tab of a non-minimized window.
   * - **hidden:** The page content is not visible to the user. In practice this means that the
   * document is either a background tab or part of a minimized window, or the OS screen lock is
   * active.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState
   */
  get visibility() {
    return __privateGet(this, _visibility).call(this);
  }
};
_state = new WeakMap();
_visibility = new WeakMap();
_safariBeforeUnloadTimeout = new WeakMap();
_PageVisibility_instances = new WeakSet();
handlePageEvent_fn = function (event2) {
  if (IS_SAFARI)
    window.clearTimeout(__privateGet(this, _safariBeforeUnloadTimeout));
  if (
    event2.type !== 'blur' ||
    __privateGet(this, _state).call(this) === 'active'
  ) {
    __privateGet(this, _state).set(determinePageState(event2));
    __privateGet(this, _visibility).set(
      document.visibilityState == 'hidden' ? 'hidden' : 'visible'
    );
  }
};
function determinePageState(event2) {
  if (IS_SERVER) return 'hidden';
  if (
    (event2 == null ? void 0 : event2.type) === 'blur' ||
    document.visibilityState === 'hidden'
  )
    return 'hidden';
  if (document.hasFocus()) return 'active';
  return 'passive';
}
var _id, _callback, _RAFLoop_instances, loop_fn;
var RAFLoop = class {
  constructor(callback) {
    __privateAdd(this, _RAFLoop_instances);
    __privateAdd(this, _id);
    __privateAdd(this, _callback);
    __privateSet(this, _callback, callback);
  }
  start() {
    if (!isUndefined(__privateGet(this, _id))) return;
    __privateMethod(this, _RAFLoop_instances, loop_fn).call(this);
  }
  stop() {
    if (isNumber(__privateGet(this, _id)))
      window.cancelAnimationFrame(__privateGet(this, _id));
    __privateSet(this, _id, void 0);
  }
};
_id = new WeakMap();
_callback = new WeakMap();
_RAFLoop_instances = new WeakSet();
loop_fn = function () {
  __privateSet(
    this,
    _id,
    window.requestAnimationFrame(() => {
      if (isUndefined(__privateGet(this, _id))) return;
      __privateGet(this, _callback).call(this);
      __privateMethod(this, _RAFLoop_instances, loop_fn).call(this);
    })
  );
};
var _provider,
  _ctx,
  _waiting,
  _attachedLoadStart,
  _attachedCanPlay,
  _timeRAF,
  _pageVisibility,
  _events,
  _HTMLMediaEvents_instances,
  media_get,
  onDispose_fn,
  _lastSeenTime,
  _seekedTo,
  onAnimationFrame_fn,
  attachInitialListeners_fn,
  attachLoadStartListeners_fn,
  attachCanPlayListeners_fn,
  _devHandlers,
  _handleDevEvent,
  attachEventListener_fn,
  onDevEvent_fn,
  updateCurrentTime_fn,
  onLoadStart_fn,
  onAbort_fn,
  onEmptied_fn,
  onLoadedData_fn,
  onLoadedMetadata_fn,
  getCanPlayDetail_fn,
  onPlay_fn2,
  onPause_fn2,
  onCanPlay_fn,
  onCanPlayThrough_fn,
  onPlaying_fn,
  onStalled_fn,
  onWaiting_fn,
  onEnded_fn,
  attachTimeUpdate_fn,
  onTimeUpdate_fn,
  onDurationChange_fn,
  onVolumeChange_fn,
  onSeeked_fn,
  onSeeking_fn,
  onProgress_fn,
  onSuspend_fn,
  onRateChange_fn,
  onError_fn2;
var HTMLMediaEvents = class {
  constructor(provider2, ctx) {
    __privateAdd(this, _HTMLMediaEvents_instances);
    __privateAdd(this, _provider);
    __privateAdd(this, _ctx);
    __privateAdd(this, _waiting, false);
    __privateAdd(this, _attachedLoadStart, false);
    __privateAdd(this, _attachedCanPlay, false);
    __privateAdd(
      this,
      _timeRAF,
      new RAFLoop(
        __privateMethod(
          this,
          _HTMLMediaEvents_instances,
          onAnimationFrame_fn
        ).bind(this)
      )
    );
    __privateAdd(this, _pageVisibility, new PageVisibility());
    __privateAdd(this, _events);
    /**
     * The `timeupdate` event fires surprisingly infrequently during playback, meaning your progress
     * bar (or whatever else is synced to the currentTime) moves in a choppy fashion. This helps
     * resolve that by retrieving time updates in a request animation frame loop.
     */
    __privateAdd(this, _lastSeenTime, 0);
    __privateAdd(this, _seekedTo, -1);
    __privateAdd(this, _devHandlers, /* @__PURE__ */ new Map());
    __privateAdd(
      this,
      _handleDevEvent,
      __privateMethod(this, _HTMLMediaEvents_instances, onDevEvent_fn).bind(
        this
      )
    );
    __privateSet(this, _provider, provider2);
    __privateSet(this, _ctx, ctx);
    __privateSet(this, _events, new EventsController(provider2.media));
    __privateMethod(
      this,
      _HTMLMediaEvents_instances,
      attachInitialListeners_fn
    ).call(this);
    __privateGet(this, _pageVisibility).connect();
    effect(
      __privateMethod(
        this,
        _HTMLMediaEvents_instances,
        attachTimeUpdate_fn
      ).bind(this)
    );
    onDispose(
      __privateMethod(this, _HTMLMediaEvents_instances, onDispose_fn).bind(this)
    );
  }
};
_provider = new WeakMap();
_ctx = new WeakMap();
_waiting = new WeakMap();
_attachedLoadStart = new WeakMap();
_attachedCanPlay = new WeakMap();
_timeRAF = new WeakMap();
_pageVisibility = new WeakMap();
_events = new WeakMap();
_HTMLMediaEvents_instances = new WeakSet();
media_get = function () {
  return __privateGet(this, _provider).media;
};
onDispose_fn = function () {
  var _a6;
  __privateSet(this, _attachedLoadStart, false);
  __privateSet(this, _attachedCanPlay, false);
  __privateGet(this, _timeRAF).stop();
  __privateGet(this, _events).abort();
  (_a6 = __privateGet(this, _devHandlers)) == null ? void 0 : _a6.clear();
};
_lastSeenTime = new WeakMap();
_seekedTo = new WeakMap();
onAnimationFrame_fn = function () {
  const newTime = __privateGet(
    this,
    _HTMLMediaEvents_instances,
    media_get
  ).currentTime;
  const didStutter =
    IS_SAFARI && newTime - __privateGet(this, _seekedTo) < 0.35;
  if (!didStutter && __privateGet(this, _lastSeenTime) !== newTime) {
    __privateMethod(
      this,
      _HTMLMediaEvents_instances,
      updateCurrentTime_fn
    ).call(this, newTime);
    __privateSet(this, _lastSeenTime, newTime);
  }
};
attachInitialListeners_fn = function () {
  var _a6, _b2;
  {
    (_a6 = __privateGet(this, _ctx).logger) == null
      ? void 0
      : _a6.info('attaching initial listeners');
  }
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'loadstart',
    __privateMethod(this, _HTMLMediaEvents_instances, onLoadStart_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'abort',
    __privateMethod(this, _HTMLMediaEvents_instances, onAbort_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'emptied',
    __privateMethod(this, _HTMLMediaEvents_instances, onEmptied_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'error',
    __privateMethod(this, _HTMLMediaEvents_instances, onError_fn2)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'volumechange',
    __privateMethod(this, _HTMLMediaEvents_instances, onVolumeChange_fn)
  );
  (_b2 = __privateGet(this, _ctx).logger) == null
    ? void 0
    : _b2.debug('attached initial media event listeners');
};
attachLoadStartListeners_fn = function () {
  var _a6;
  if (__privateGet(this, _attachedLoadStart)) return;
  {
    (_a6 = __privateGet(this, _ctx).logger) == null
      ? void 0
      : _a6.info('attaching load start listeners');
  }
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'loadeddata',
    __privateMethod(this, _HTMLMediaEvents_instances, onLoadedData_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'loadedmetadata',
    __privateMethod(this, _HTMLMediaEvents_instances, onLoadedMetadata_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'canplay',
    __privateMethod(this, _HTMLMediaEvents_instances, onCanPlay_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'canplaythrough',
    __privateMethod(this, _HTMLMediaEvents_instances, onCanPlayThrough_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'durationchange',
    __privateMethod(this, _HTMLMediaEvents_instances, onDurationChange_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'play',
    __privateMethod(this, _HTMLMediaEvents_instances, onPlay_fn2)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'progress',
    __privateMethod(this, _HTMLMediaEvents_instances, onProgress_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'stalled',
    __privateMethod(this, _HTMLMediaEvents_instances, onStalled_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'suspend',
    __privateMethod(this, _HTMLMediaEvents_instances, onSuspend_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'ratechange',
    __privateMethod(this, _HTMLMediaEvents_instances, onRateChange_fn)
  );
  __privateSet(this, _attachedLoadStart, true);
};
attachCanPlayListeners_fn = function () {
  var _a6;
  if (__privateGet(this, _attachedCanPlay)) return;
  {
    (_a6 = __privateGet(this, _ctx).logger) == null
      ? void 0
      : _a6.info('attaching can play listeners');
  }
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'pause',
    __privateMethod(this, _HTMLMediaEvents_instances, onPause_fn2)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'playing',
    __privateMethod(this, _HTMLMediaEvents_instances, onPlaying_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'seeked',
    __privateMethod(this, _HTMLMediaEvents_instances, onSeeked_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'seeking',
    __privateMethod(this, _HTMLMediaEvents_instances, onSeeking_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'ended',
    __privateMethod(this, _HTMLMediaEvents_instances, onEnded_fn)
  );
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachEventListener_fn
  ).call(
    this,
    'waiting',
    __privateMethod(this, _HTMLMediaEvents_instances, onWaiting_fn)
  );
  __privateSet(this, _attachedCanPlay, true);
};
_devHandlers = new WeakMap();
_handleDevEvent = new WeakMap();
attachEventListener_fn = function (eventType, handler) {
  __privateGet(this, _devHandlers).set(eventType, handler);
  __privateGet(this, _events).add(
    eventType,
    __privateGet(this, _handleDevEvent)
  );
};
onDevEvent_fn = function (event2) {
  var _a6, _b2;
  (_a6 = __privateGet(this, _ctx).logger) == null
    ? void 0
    : _a6
        .debugGroup(`📺 provider fired \`${event2.type}\``)
        .labelledLog('Provider', __privateGet(this, _provider))
        .labelledLog('Event', event2)
        .labelledLog('Media Store', { ...__privateGet(this, _ctx).$state })
        .dispatch();
  (_b2 = __privateGet(this, _devHandlers).get(event2.type)) == null
    ? void 0
    : _b2.call(this, event2);
};
updateCurrentTime_fn = function (time, trigger) {
  const newTime = Math.min(time, __privateGet(this, _ctx).$state.seekableEnd());
  __privateGet(this, _ctx).notify('time-change', newTime, trigger);
};
onLoadStart_fn = function (event2) {
  if (
    __privateGet(this, _HTMLMediaEvents_instances, media_get).networkState === 3
  ) {
    __privateMethod(this, _HTMLMediaEvents_instances, onAbort_fn).call(
      this,
      event2
    );
    return;
  }
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachLoadStartListeners_fn
  ).call(this);
  __privateGet(this, _ctx).notify('load-start', void 0, event2);
};
onAbort_fn = function (event2) {
  __privateGet(this, _ctx).notify('abort', void 0, event2);
};
onEmptied_fn = function () {
  __privateGet(this, _ctx).notify('emptied', void 0, event);
};
onLoadedData_fn = function (event2) {
  __privateGet(this, _ctx).notify('loaded-data', void 0, event2);
};
onLoadedMetadata_fn = function (event2) {
  __privateSet(this, _lastSeenTime, 0);
  __privateSet(this, _seekedTo, -1);
  __privateMethod(
    this,
    _HTMLMediaEvents_instances,
    attachCanPlayListeners_fn
  ).call(this);
  __privateGet(this, _ctx).notify('loaded-metadata', void 0, event2);
  if (
    IS_IOS ||
    (IS_SAFARI && isHLSSrc(__privateGet(this, _ctx).$state.source()))
  ) {
    __privateGet(this, _ctx).delegate.ready(
      __privateMethod(
        this,
        _HTMLMediaEvents_instances,
        getCanPlayDetail_fn
      ).call(this),
      event2
    );
  }
};
getCanPlayDetail_fn = function () {
  return {
    provider: peek(__privateGet(this, _ctx).$provider),
    duration: __privateGet(this, _HTMLMediaEvents_instances, media_get)
      .duration,
    buffered: __privateGet(this, _HTMLMediaEvents_instances, media_get)
      .buffered,
    seekable: __privateGet(this, _HTMLMediaEvents_instances, media_get)
      .seekable,
  };
};
onPlay_fn2 = function (event2) {
  if (!__privateGet(this, _ctx).$state.canPlay) return;
  __privateGet(this, _ctx).notify('play', void 0, event2);
};
onPause_fn2 = function (event2) {
  if (
    __privateGet(this, _HTMLMediaEvents_instances, media_get).readyState ===
      1 &&
    !__privateGet(this, _waiting)
  )
    return;
  __privateSet(this, _waiting, false);
  __privateGet(this, _timeRAF).stop();
  __privateGet(this, _ctx).notify('pause', void 0, event2);
};
onCanPlay_fn = function (event2) {
  __privateGet(this, _ctx).delegate.ready(
    __privateMethod(this, _HTMLMediaEvents_instances, getCanPlayDetail_fn).call(
      this
    ),
    event2
  );
};
onCanPlayThrough_fn = function (event2) {
  if (__privateGet(this, _ctx).$state.started()) return;
  __privateGet(this, _ctx).notify(
    'can-play-through',
    __privateMethod(this, _HTMLMediaEvents_instances, getCanPlayDetail_fn).call(
      this
    ),
    event2
  );
};
onPlaying_fn = function (event2) {
  if (__privateGet(this, _HTMLMediaEvents_instances, media_get).paused) return;
  __privateSet(this, _waiting, false);
  __privateGet(this, _ctx).notify('playing', void 0, event2);
  __privateGet(this, _timeRAF).start();
};
onStalled_fn = function (event2) {
  __privateGet(this, _ctx).notify('stalled', void 0, event2);
  if (
    __privateGet(this, _HTMLMediaEvents_instances, media_get).readyState < 3
  ) {
    __privateSet(this, _waiting, true);
    __privateGet(this, _ctx).notify('waiting', void 0, event2);
  }
};
onWaiting_fn = function (event2) {
  if (
    __privateGet(this, _HTMLMediaEvents_instances, media_get).readyState < 3
  ) {
    __privateSet(this, _waiting, true);
    __privateGet(this, _ctx).notify('waiting', void 0, event2);
  }
};
onEnded_fn = function (event2) {
  __privateGet(this, _timeRAF).stop();
  __privateMethod(this, _HTMLMediaEvents_instances, updateCurrentTime_fn).call(
    this,
    __privateGet(this, _HTMLMediaEvents_instances, media_get).duration,
    event2
  );
  __privateGet(this, _ctx).notify('end', void 0, event2);
  if (__privateGet(this, _ctx).$state.loop()) {
    const hasCustomControls = isNil(
      __privateGet(this, _HTMLMediaEvents_instances, media_get).controls
    );
    if (hasCustomControls)
      __privateGet(
        this,
        _HTMLMediaEvents_instances,
        media_get
      ).controls = false;
  }
};
attachTimeUpdate_fn = function () {
  const isPaused = __privateGet(this, _ctx).$state.paused(),
    isPageHidden = __privateGet(this, _pageVisibility).visibility === 'hidden',
    shouldListenToTimeUpdates = isPaused || isPageHidden;
  if (shouldListenToTimeUpdates) {
    listenEvent(
      __privateGet(this, _HTMLMediaEvents_instances, media_get),
      'timeupdate',
      __privateMethod(this, _HTMLMediaEvents_instances, onTimeUpdate_fn).bind(
        this
      )
    );
  }
};
onTimeUpdate_fn = function (event2) {
  __privateMethod(this, _HTMLMediaEvents_instances, updateCurrentTime_fn).call(
    this,
    __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime,
    event2
  );
};
onDurationChange_fn = function (event2) {
  if (__privateGet(this, _ctx).$state.ended()) {
    __privateMethod(
      this,
      _HTMLMediaEvents_instances,
      updateCurrentTime_fn
    ).call(
      this,
      __privateGet(this, _HTMLMediaEvents_instances, media_get).duration,
      event2
    );
  }
  __privateGet(this, _ctx).notify(
    'duration-change',
    __privateGet(this, _HTMLMediaEvents_instances, media_get).duration,
    event2
  );
};
onVolumeChange_fn = function (event2) {
  const detail = {
    volume: __privateGet(this, _HTMLMediaEvents_instances, media_get).volume,
    muted: __privateGet(this, _HTMLMediaEvents_instances, media_get).muted,
  };
  __privateGet(this, _ctx).notify('volume-change', detail, event2);
};
onSeeked_fn = function (event2) {
  __privateSet(
    this,
    _seekedTo,
    __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime
  );
  __privateMethod(this, _HTMLMediaEvents_instances, updateCurrentTime_fn).call(
    this,
    __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime,
    event2
  );
  __privateGet(this, _ctx).notify(
    'seeked',
    __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime,
    event2
  );
  if (
    Math.trunc(
      __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime
    ) ===
      Math.trunc(
        __privateGet(this, _HTMLMediaEvents_instances, media_get).duration
      ) &&
    getNumberOfDecimalPlaces(
      __privateGet(this, _HTMLMediaEvents_instances, media_get).duration
    ) >
      getNumberOfDecimalPlaces(
        __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime
      )
  ) {
    __privateMethod(
      this,
      _HTMLMediaEvents_instances,
      updateCurrentTime_fn
    ).call(
      this,
      __privateGet(this, _HTMLMediaEvents_instances, media_get).duration,
      event2
    );
    if (!__privateGet(this, _HTMLMediaEvents_instances, media_get).ended) {
      __privateGet(this, _ctx).player.dispatch(
        new DOMEvent('media-play-request', {
          trigger: event2,
        })
      );
    }
  }
};
onSeeking_fn = function (event2) {
  __privateGet(this, _ctx).notify(
    'seeking',
    __privateGet(this, _HTMLMediaEvents_instances, media_get).currentTime,
    event2
  );
};
onProgress_fn = function (event2) {
  const detail = {
    buffered: __privateGet(this, _HTMLMediaEvents_instances, media_get)
      .buffered,
    seekable: __privateGet(this, _HTMLMediaEvents_instances, media_get)
      .seekable,
  };
  __privateGet(this, _ctx).notify('progress', detail, event2);
};
onSuspend_fn = function (event2) {
  __privateGet(this, _ctx).notify('suspend', void 0, event2);
};
onRateChange_fn = function (event2) {
  __privateGet(this, _ctx).notify(
    'rate-change',
    __privateGet(this, _HTMLMediaEvents_instances, media_get).playbackRate,
    event2
  );
};
onError_fn2 = function (event2) {
  const error = __privateGet(this, _HTMLMediaEvents_instances, media_get).error;
  if (!error) return;
  const detail = {
    message: error.message,
    code: error.code,
    mediaError: error,
  };
  __privateGet(this, _ctx).notify('error', detail, event2);
};
var _provider2,
  _ctx2,
  _NativeAudioTracks_instances,
  nativeTracks_get,
  onAddNativeTrack_fn,
  onRemoveNativeTrack_fn,
  onChangeNativeTrack_fn,
  getEnabledNativeTrack_fn,
  onChangeTrack_fn;
var NativeAudioTracks = class {
  constructor(provider2, ctx) {
    __privateAdd(this, _NativeAudioTracks_instances);
    __privateAdd(this, _provider2);
    __privateAdd(this, _ctx2);
    __privateSet(this, _provider2, provider2);
    __privateSet(this, _ctx2, ctx);
    __privateGet(
      this,
      _NativeAudioTracks_instances,
      nativeTracks_get
    ).onaddtrack = __privateMethod(
      this,
      _NativeAudioTracks_instances,
      onAddNativeTrack_fn
    ).bind(this);
    __privateGet(
      this,
      _NativeAudioTracks_instances,
      nativeTracks_get
    ).onremovetrack = __privateMethod(
      this,
      _NativeAudioTracks_instances,
      onRemoveNativeTrack_fn
    ).bind(this);
    __privateGet(
      this,
      _NativeAudioTracks_instances,
      nativeTracks_get
    ).onchange = __privateMethod(
      this,
      _NativeAudioTracks_instances,
      onChangeNativeTrack_fn
    ).bind(this);
    listenEvent(
      __privateGet(this, _ctx2).audioTracks,
      'change',
      __privateMethod(
        this,
        _NativeAudioTracks_instances,
        onChangeTrack_fn
      ).bind(this)
    );
  }
};
_provider2 = new WeakMap();
_ctx2 = new WeakMap();
_NativeAudioTracks_instances = new WeakSet();
nativeTracks_get = function () {
  return __privateGet(this, _provider2).media.audioTracks;
};
onAddNativeTrack_fn = function (event2) {
  const nativeTrack = event2.track;
  if (nativeTrack.label === '') return;
  const id2 =
      nativeTrack.id.toString() ||
      `native-audio-${__privateGet(this, _ctx2).audioTracks.length}`,
    audioTrack = {
      id: id2,
      label: nativeTrack.label,
      language: nativeTrack.language,
      kind: nativeTrack.kind,
      selected: false,
    };
  __privateGet(this, _ctx2).audioTracks[ListSymbol.add](audioTrack, event2);
  if (nativeTrack.enabled) audioTrack.selected = true;
};
onRemoveNativeTrack_fn = function (event2) {
  const track = __privateGet(this, _ctx2).audioTracks.getById(event2.track.id);
  if (track)
    __privateGet(this, _ctx2).audioTracks[ListSymbol.remove](track, event2);
};
onChangeNativeTrack_fn = function (event2) {
  let enabledTrack = __privateMethod(
    this,
    _NativeAudioTracks_instances,
    getEnabledNativeTrack_fn
  ).call(this);
  if (!enabledTrack) return;
  const track = __privateGet(this, _ctx2).audioTracks.getById(enabledTrack.id);
  if (track)
    __privateGet(this, _ctx2).audioTracks[ListSymbol.select](
      track,
      true,
      event2
    );
};
getEnabledNativeTrack_fn = function () {
  return Array.from(
    __privateGet(this, _NativeAudioTracks_instances, nativeTracks_get)
  ).find((track) => track.enabled);
};
onChangeTrack_fn = function (event2) {
  const { current } = event2.detail;
  if (!current) return;
  const track = __privateGet(
    this,
    _NativeAudioTracks_instances,
    nativeTracks_get
  ).getTrackById(current.id);
  if (track) {
    const prev = __privateMethod(
      this,
      _NativeAudioTracks_instances,
      getEnabledNativeTrack_fn
    ).call(this);
    if (prev) prev.enabled = false;
    track.enabled = true;
  }
};
var _HTMLMediaProvider_instances, appendMediaFragment_fn;
var HTMLMediaProvider = class {
  constructor(media, ctx) {
    __privateAdd(this, _HTMLMediaProvider_instances);
    __publicField(this, 'scope', createScope());
    __publicField(this, 'currentSrc', null);
    __publicField(this, 'audioGain');
    this.media = media;
    this.ctx = ctx;
    this.audioGain = new AudioGain(media, (gain) => {
      this.ctx.notify('audio-gain-change', gain);
    });
  }
  setup() {
    new HTMLMediaEvents(this, this.ctx);
    if ('audioTracks' in this.media) new NativeAudioTracks(this, this.ctx);
    onDispose(() => {
      this.audioGain.destroy();
      this.media.srcObject = null;
      this.media.removeAttribute('src');
      for (const source of this.media.querySelectorAll('source'))
        source.remove();
      this.media.load();
    });
  }
  get type() {
    return '';
  }
  setPlaybackRate(rate) {
    this.media.playbackRate = rate;
  }
  async play() {
    return this.media.play();
  }
  async pause() {
    return this.media.pause();
  }
  setMuted(muted) {
    this.media.muted = muted;
  }
  setVolume(volume) {
    this.media.volume = volume;
  }
  setCurrentTime(time) {
    this.media.currentTime = time;
  }
  setPlaysInline(inline) {
    setAttribute(this.media, 'playsinline', inline);
  }
  async loadSource({ src, type }, preload) {
    this.media.preload = preload || '';
    if (isMediaStream(src)) {
      this.removeSource();
      this.media.srcObject = src;
    } else {
      this.media.srcObject = null;
      if (isString(src)) {
        if (type !== '?') {
          this.appendSource({ src, type });
        } else {
          this.removeSource();
          this.media.src = __privateMethod(
            this,
            _HTMLMediaProvider_instances,
            appendMediaFragment_fn
          ).call(this, src);
        }
      } else {
        this.removeSource();
        this.media.src = window.URL.createObjectURL(src);
      }
    }
    this.media.load();
    this.currentSrc = { src, type };
  }
  /**
   * Append source so it works when requesting AirPlay since hls.js will remove it.
   */
  appendSource(src, defaultType) {
    const prevSource = this.media.querySelector('source[data-vds]'),
      source = prevSource ?? document.createElement('source');
    setAttribute(
      source,
      'src',
      __privateMethod(
        this,
        _HTMLMediaProvider_instances,
        appendMediaFragment_fn
      ).call(this, src.src)
    );
    setAttribute(source, 'type', src.type !== '?' ? src.type : defaultType);
    setAttribute(source, 'data-vds', '');
    if (!prevSource) this.media.append(source);
  }
  removeSource() {
    var _a6;
    (_a6 = this.media.querySelector('source[data-vds]')) == null
      ? void 0
      : _a6.remove();
  }
};
_HTMLMediaProvider_instances = new WeakSet();
appendMediaFragment_fn = function (src) {
  const { clipStartTime, clipEndTime } = this.ctx.$state,
    startTime = clipStartTime(),
    endTime = clipEndTime();
  if (startTime > 0 && endTime > 0) {
    return `${src}#t=${startTime},${endTime}`;
  } else if (startTime > 0) {
    return `${src}#t=${startTime}`;
  } else if (endTime > 0) {
    return `${src}#t=0,${endTime}`;
  }
  return src;
};
var _media4,
  _ctx3,
  _state2,
  _supported,
  _HTMLRemotePlaybackAdapter_instances,
  setup_fn,
  watchSupported_fn,
  onStateChange_fn;
var HTMLRemotePlaybackAdapter = class {
  constructor(media, ctx) {
    __privateAdd(this, _HTMLRemotePlaybackAdapter_instances);
    __privateAdd(this, _media4);
    __privateAdd(this, _ctx3);
    __privateAdd(this, _state2);
    __privateAdd(this, _supported, signal(false));
    __privateSet(this, _media4, media);
    __privateSet(this, _ctx3, ctx);
    __privateMethod(this, _HTMLRemotePlaybackAdapter_instances, setup_fn).call(
      this
    );
  }
  get supported() {
    return __privateGet(this, _supported).call(this);
  }
  async prompt() {
    if (!this.supported) throw Error('Not supported on this platform.');
    if (
      this.type === 'airplay' &&
      __privateGet(this, _media4).webkitShowPlaybackTargetPicker
    ) {
      return __privateGet(this, _media4).webkitShowPlaybackTargetPicker();
    }
    return __privateGet(this, _media4).remote.prompt();
  }
};
_media4 = new WeakMap();
_ctx3 = new WeakMap();
_state2 = new WeakMap();
_supported = new WeakMap();
_HTMLRemotePlaybackAdapter_instances = new WeakSet();
setup_fn = function () {
  var _a6;
  if (
    IS_SERVER ||
    !((_a6 = __privateGet(this, _media4)) == null ? void 0 : _a6.remote) ||
    !this.canPrompt
  )
    return;
  __privateGet(this, _media4)
    .remote.watchAvailability((available) => {
      __privateGet(this, _supported).set(available);
    })
    .catch(() => {
      __privateGet(this, _supported).set(false);
    });
  effect(
    __privateMethod(
      this,
      _HTMLRemotePlaybackAdapter_instances,
      watchSupported_fn
    ).bind(this)
  );
};
watchSupported_fn = function () {
  if (!__privateGet(this, _supported).call(this)) return;
  const events = ['connecting', 'connect', 'disconnect'],
    onStateChange = __privateMethod(
      this,
      _HTMLRemotePlaybackAdapter_instances,
      onStateChange_fn
    ).bind(this);
  onStateChange();
  listenEvent(__privateGet(this, _media4), 'playing', onStateChange);
  const remoteEvents = new EventsController(__privateGet(this, _media4).remote);
  for (const type of events) {
    remoteEvents.add(type, onStateChange);
  }
};
onStateChange_fn = function (event2) {
  const state = __privateGet(this, _media4).remote.state;
  if (state === __privateGet(this, _state2)) return;
  const detail = { type: this.type, state };
  __privateGet(this, _ctx3).notify('remote-playback-change', detail, event2);
  __privateSet(this, _state2, state);
};
var HTMLAirPlayAdapter = class extends HTMLRemotePlaybackAdapter {
  constructor() {
    super(...arguments);
    __publicField(this, 'type', 'airplay');
  }
  get canPrompt() {
    return 'WebKitPlaybackTargetAvailabilityEvent' in window;
  }
};
var _video3,
  _ctx4,
  _NativeHLSTextTracks_instances,
  onAddTrack_fn2,
  onDispose_fn2;
var NativeHLSTextTracks = class {
  constructor(video, ctx) {
    __privateAdd(this, _NativeHLSTextTracks_instances);
    __privateAdd(this, _video3);
    __privateAdd(this, _ctx4);
    __privateSet(this, _video3, video);
    __privateSet(this, _ctx4, ctx);
    video.textTracks.onaddtrack = __privateMethod(
      this,
      _NativeHLSTextTracks_instances,
      onAddTrack_fn2
    ).bind(this);
    onDispose(
      __privateMethod(this, _NativeHLSTextTracks_instances, onDispose_fn2).bind(
        this
      )
    );
  }
};
_video3 = new WeakMap();
_ctx4 = new WeakMap();
_NativeHLSTextTracks_instances = new WeakSet();
onAddTrack_fn2 = function (event2) {
  const nativeTrack = event2.track;
  if (
    !nativeTrack ||
    findTextTrackElement(__privateGet(this, _video3), nativeTrack)
  )
    return;
  const track = new TextTrack({
    id: nativeTrack.id,
    kind: nativeTrack.kind,
    label: nativeTrack.label ?? '',
    language: nativeTrack.language,
    type: 'vtt',
  });
  track[TextTrackSymbol.native] = { track: nativeTrack };
  track[TextTrackSymbol.readyState] = 2;
  track[TextTrackSymbol.nativeHLS] = true;
  let lastIndex = 0;
  const onCueChange = (event22) => {
    if (!nativeTrack.cues) return;
    for (let i = lastIndex; i < nativeTrack.cues.length; i++) {
      track.addCue(nativeTrack.cues[i], event22);
      lastIndex++;
    }
  };
  onCueChange(event2);
  nativeTrack.oncuechange = onCueChange;
  __privateGet(this, _ctx4).textTracks.add(track, event2);
  track.setMode(nativeTrack.mode, event2);
};
onDispose_fn2 = function () {
  var _a6;
  __privateGet(this, _video3).textTracks.onaddtrack = null;
  for (const track of __privateGet(this, _ctx4).textTracks) {
    const nativeTrack =
      (_a6 = track[TextTrackSymbol.native]) == null ? void 0 : _a6.track;
    if (nativeTrack == null ? void 0 : nativeTrack.oncuechange)
      nativeTrack.oncuechange = null;
  }
};
function findTextTrackElement(video, track) {
  return Array.from(video.children).find((el) => el.track === track);
}
var _video4,
  _media5,
  _VideoPictureInPicture_instances,
  onEnter_fn,
  onExit_fn,
  _onChange2;
var VideoPictureInPicture = class {
  constructor(video, media) {
    __privateAdd(this, _VideoPictureInPicture_instances);
    __privateAdd(this, _video4);
    __privateAdd(this, _media5);
    __privateAdd(this, _onChange2, (active, event2) => {
      __privateGet(this, _media5).notify(
        'picture-in-picture-change',
        active,
        event2
      );
    });
    __privateSet(this, _video4, video);
    __privateSet(this, _media5, media);
    new EventsController(video)
      .add(
        'enterpictureinpicture',
        __privateMethod(
          this,
          _VideoPictureInPicture_instances,
          onEnter_fn
        ).bind(this)
      )
      .add(
        'leavepictureinpicture',
        __privateMethod(this, _VideoPictureInPicture_instances, onExit_fn).bind(
          this
        )
      );
  }
  get active() {
    return document.pictureInPictureElement === __privateGet(this, _video4);
  }
  get supported() {
    return canUsePictureInPicture(__privateGet(this, _video4));
  }
  async enter() {
    return __privateGet(this, _video4).requestPictureInPicture();
  }
  exit() {
    return document.exitPictureInPicture();
  }
};
_video4 = new WeakMap();
_media5 = new WeakMap();
_VideoPictureInPicture_instances = new WeakSet();
onEnter_fn = function (event2) {
  __privateGet(this, _onChange2).call(this, true, event2);
};
onExit_fn = function (event2) {
  __privateGet(this, _onChange2).call(this, false, event2);
};
_onChange2 = new WeakMap();
var _video5, _media6, _mode2, _VideoPresentation_instances, onModeChange_fn;
var VideoPresentation = class {
  constructor(video, media) {
    __privateAdd(this, _VideoPresentation_instances);
    __privateAdd(this, _video5);
    __privateAdd(this, _media6);
    __privateAdd(this, _mode2, 'inline');
    __privateSet(this, _video5, video);
    __privateSet(this, _media6, media);
    listenEvent(
      video,
      'webkitpresentationmodechanged',
      __privateMethod(this, _VideoPresentation_instances, onModeChange_fn).bind(
        this
      )
    );
  }
  get mode() {
    return __privateGet(this, _mode2);
  }
  get supported() {
    return canUseVideoPresentation(__privateGet(this, _video5));
  }
  async setPresentationMode(mode) {
    if (__privateGet(this, _mode2) === mode) return;
    __privateGet(this, _video5).webkitSetPresentationMode(mode);
  }
};
_video5 = new WeakMap();
_media6 = new WeakMap();
_mode2 = new WeakMap();
_VideoPresentation_instances = new WeakSet();
onModeChange_fn = function (event2) {
  var _a6, _b2;
  const prevMode = __privateGet(this, _mode2);
  __privateSet(
    this,
    _mode2,
    __privateGet(this, _video5).webkitPresentationMode
  );
  {
    (_a6 = __privateGet(this, _media6).logger) == null
      ? void 0
      : _a6
          .infoGroup('presentation mode change')
          .labelledLog('Mode', __privateGet(this, _mode2))
          .labelledLog('Event', event2)
          .dispatch();
  }
  (_b2 = __privateGet(this, _media6).player) == null
    ? void 0
    : _b2.dispatch(
        new DOMEvent('video-presentation-change', {
          detail: __privateGet(this, _mode2),
          trigger: event2,
        })
      );
  ['fullscreen', 'picture-in-picture'].forEach((type) => {
    if (__privateGet(this, _mode2) === type || prevMode === type) {
      __privateGet(this, _media6).notify(
        `${type}-change`,
        __privateGet(this, _mode2) === type,
        event2
      );
    }
  });
};
var _presentation;
var FullscreenPresentationAdapter = class {
  constructor(presentation) {
    __privateAdd(this, _presentation);
    __privateSet(this, _presentation, presentation);
  }
  get active() {
    return __privateGet(this, _presentation).mode === 'fullscreen';
  }
  get supported() {
    return __privateGet(this, _presentation).supported;
  }
  async enter() {
    __privateGet(this, _presentation).setPresentationMode('fullscreen');
  }
  async exit() {
    __privateGet(this, _presentation).setPresentationMode('inline');
  }
};
_presentation = new WeakMap();
var _presentation2;
var PIPPresentationAdapter = class {
  constructor(presentation) {
    __privateAdd(this, _presentation2);
    __privateSet(this, _presentation2, presentation);
  }
  get active() {
    return __privateGet(this, _presentation2).mode === 'picture-in-picture';
  }
  get supported() {
    return __privateGet(this, _presentation2).supported;
  }
  async enter() {
    __privateGet(this, _presentation2).setPresentationMode(
      'picture-in-picture'
    );
  }
  async exit() {
    __privateGet(this, _presentation2).setPresentationMode('inline');
  }
};
_presentation2 = new WeakMap();
var VideoProvider = class extends HTMLMediaProvider {
  constructor(video, ctx) {
    super(video, ctx);
    __publicField(this, '$$PROVIDER_TYPE', 'VIDEO');
    __publicField(this, 'airPlay');
    __publicField(this, 'fullscreen');
    __publicField(this, 'pictureInPicture');
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(video, ctx);
      if (canUseVideoPresentation(video)) {
        const presentation = new VideoPresentation(video, ctx);
        this.fullscreen = new FullscreenPresentationAdapter(presentation);
        this.pictureInPicture = new PIPPresentationAdapter(presentation);
      } else if (canUsePictureInPicture(video)) {
        this.pictureInPicture = new VideoPictureInPicture(video, ctx);
      }
    }, this.scope);
  }
  get type() {
    return 'video';
  }
  setup() {
    super.setup();
    if (canPlayHLSNatively(this.video)) {
      new NativeHLSTextTracks(this.video, this.ctx);
    }
    this.ctx.textRenderers.attachVideo(this.video);
    onDispose(() => {
      this.ctx.textRenderers.attachVideo(null);
    });
    if (this.type === 'video') this.ctx.notify('provider-setup', this);
  }
  /**
   * The native HTML `<video>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement}
   */
  get video() {
    return this.media;
  }
};
var provider$1 = Object.freeze({
  __proto__: null,
  VideoProvider,
});
function getLangName(langCode) {
  try {
    const displayNames = new Intl.DisplayNames(navigator.languages, {
      type: 'language',
    });
    const languageName = displayNames.of(langCode);
    return languageName ?? null;
  } catch (err) {
    return null;
  }
}
var toDOMEventType = (type) => `dash-${camelToKebabCase(type)}`;
var _video6,
  _ctx5,
  _instance,
  _callbacks,
  _stopLiveSync,
  _DASHController_instances,
  createDOMEvent_fn,
  liveSync_fn,
  liveSyncPosition_fn,
  dispatchDASHEvent_fn,
  _currentTrack,
  _cueTracker,
  onTextFragmentLoaded_fn,
  onTextTracksAdded_fn,
  onTrackChange_fn,
  onQualityChange_fn,
  onManifestLoaded_fn,
  onError_fn3,
  onFragmentLoadStart_fn,
  onFragmentLoadComplete_fn,
  _retryLoadingTimer,
  onNetworkError_fn,
  clearRetryTimer_fn,
  onFatalError_fn,
  enableAutoQuality_fn,
  switchAutoBitrate_fn,
  onUserQualityChange_fn,
  onUserAudioChange_fn,
  reset_fn;
var DASHController = class {
  constructor(video, ctx) {
    __privateAdd(this, _DASHController_instances);
    __privateAdd(this, _video6);
    __privateAdd(this, _ctx5);
    __privateAdd(this, _instance, null);
    __privateAdd(this, _callbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _stopLiveSync, null);
    __publicField(this, 'config', {});
    __privateAdd(this, _currentTrack, null);
    __privateAdd(this, _cueTracker, {});
    __privateAdd(this, _retryLoadingTimer, -1);
    __privateSet(this, _video6, video);
    __privateSet(this, _ctx5, ctx);
  }
  get instance() {
    return __privateGet(this, _instance);
  }
  setup(ctor) {
    __privateSet(this, _instance, ctor().create());
    const dispatcher = __privateMethod(
      this,
      _DASHController_instances,
      dispatchDASHEvent_fn
    ).bind(this);
    for (const event2 of Object.values(ctor.events))
      __privateGet(this, _instance).on(event2, dispatcher);
    __privateGet(this, _instance).on(
      ctor.events.ERROR,
      __privateMethod(this, _DASHController_instances, onError_fn3).bind(this)
    );
    for (const callback of __privateGet(this, _callbacks))
      callback(__privateGet(this, _instance));
    __privateGet(this, _ctx5).player.dispatch('dash-instance', {
      detail: __privateGet(this, _instance),
    });
    __privateGet(this, _instance).initialize(
      __privateGet(this, _video6),
      void 0,
      false
    );
    __privateGet(this, _instance).updateSettings({
      streaming: {
        text: {
          // Disabling text rendering by dash.
          defaultEnabled: false,
          dispatchForManualRendering: true,
        },
        buffer: {
          /// Enables buffer replacement when switching bitrates for faster switching.
          fastSwitchEnabled: true,
        },
      },
      ...this.config,
    });
    __privateGet(this, _instance).on(
      ctor.events.FRAGMENT_LOADING_STARTED,
      __privateMethod(
        this,
        _DASHController_instances,
        onFragmentLoadStart_fn
      ).bind(this)
    );
    __privateGet(this, _instance).on(
      ctor.events.FRAGMENT_LOADING_COMPLETED,
      __privateMethod(
        this,
        _DASHController_instances,
        onFragmentLoadComplete_fn
      ).bind(this)
    );
    __privateGet(this, _instance).on(
      ctor.events.MANIFEST_LOADED,
      __privateMethod(
        this,
        _DASHController_instances,
        onManifestLoaded_fn
      ).bind(this)
    );
    __privateGet(this, _instance).on(
      ctor.events.QUALITY_CHANGE_RENDERED,
      __privateMethod(this, _DASHController_instances, onQualityChange_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.events.TEXT_TRACKS_ADDED,
      __privateMethod(
        this,
        _DASHController_instances,
        onTextTracksAdded_fn
      ).bind(this)
    );
    __privateGet(this, _instance).on(
      ctor.events.TRACK_CHANGE_RENDERED,
      __privateMethod(this, _DASHController_instances, onTrackChange_fn).bind(
        this
      )
    );
    __privateGet(this, _ctx5).qualities[QualitySymbol.enableAuto] =
      __privateMethod(
        this,
        _DASHController_instances,
        enableAutoQuality_fn
      ).bind(this);
    listenEvent(
      __privateGet(this, _ctx5).qualities,
      'change',
      __privateMethod(
        this,
        _DASHController_instances,
        onUserQualityChange_fn
      ).bind(this)
    );
    listenEvent(
      __privateGet(this, _ctx5).audioTracks,
      'change',
      __privateMethod(
        this,
        _DASHController_instances,
        onUserAudioChange_fn
      ).bind(this)
    );
    __privateSet(
      this,
      _stopLiveSync,
      effect(
        __privateMethod(this, _DASHController_instances, liveSync_fn).bind(this)
      )
    );
  }
  onInstance(callback) {
    __privateGet(this, _callbacks).add(callback);
    return () => __privateGet(this, _callbacks).delete(callback);
  }
  loadSource(src) {
    var _a6;
    __privateMethod(this, _DASHController_instances, reset_fn).call(this);
    if (!isString(src.src)) return;
    (_a6 = __privateGet(this, _instance)) == null
      ? void 0
      : _a6.attachSource(src.src);
  }
  destroy() {
    var _a6, _b2, _c2, _d2;
    __privateMethod(this, _DASHController_instances, reset_fn).call(this);
    (_a6 = __privateGet(this, _instance)) == null ? void 0 : _a6.destroy();
    __privateSet(this, _instance, null);
    (_b2 = __privateGet(this, _stopLiveSync)) == null ? void 0 : _b2.call(this);
    __privateSet(this, _stopLiveSync, null);
    (_d2 = (_c2 = __privateGet(this, _ctx5)) == null ? void 0 : _c2.logger) ==
    null
      ? void 0
      : _d2.info('🏗️ Destroyed DASH instance');
  }
};
_video6 = new WeakMap();
_ctx5 = new WeakMap();
_instance = new WeakMap();
_callbacks = new WeakMap();
_stopLiveSync = new WeakMap();
_DASHController_instances = new WeakSet();
createDOMEvent_fn = function (event2) {
  return new DOMEvent(toDOMEventType(event2.type), { detail: event2 });
};
liveSync_fn = function () {
  if (!__privateGet(this, _ctx5).$state.live()) return;
  const raf = new RAFLoop(
    __privateMethod(this, _DASHController_instances, liveSyncPosition_fn).bind(
      this
    )
  );
  raf.start();
  return raf.stop.bind(raf);
};
liveSyncPosition_fn = function () {
  if (!__privateGet(this, _instance)) return;
  const position =
    __privateGet(this, _instance).duration() -
    __privateGet(this, _instance).time();
  __privateGet(this, _ctx5).$state.liveSyncPosition.set(
    !isNaN(position) ? position : Infinity
  );
};
dispatchDASHEvent_fn = function (event2) {
  var _a6;
  (_a6 = __privateGet(this, _ctx5).player) == null
    ? void 0
    : _a6.dispatch(
        __privateMethod(
          this,
          _DASHController_instances,
          createDOMEvent_fn
        ).call(this, event2)
      );
};
_currentTrack = new WeakMap();
_cueTracker = new WeakMap();
onTextFragmentLoaded_fn = function (event2) {
  var _a6;
  const native =
      (_a6 = __privateGet(this, _currentTrack)) == null
        ? void 0
        : _a6[TextTrackSymbol.native],
    cues = (native == null ? void 0 : native.track).cues;
  if (!native || !cues) return;
  const id2 = __privateGet(this, _currentTrack).id,
    startIndex = __privateGet(this, _cueTracker)[id2] ?? 0,
    trigger = __privateMethod(
      this,
      _DASHController_instances,
      createDOMEvent_fn
    ).call(this, event2);
  for (let i = startIndex; i < cues.length; i++) {
    const cue = cues[i];
    if (!cue.positionAlign) cue.positionAlign = 'auto';
    __privateGet(this, _currentTrack).addCue(cue, trigger);
  }
  __privateGet(this, _cueTracker)[id2] = cues.length;
};
onTextTracksAdded_fn = function (event2) {
  var _a6;
  if (!__privateGet(this, _instance)) return;
  const data = event2.tracks,
    nativeTextTracks = [...__privateGet(this, _video6).textTracks].filter(
      (track) => 'manualMode' in track
    ),
    trigger = __privateMethod(
      this,
      _DASHController_instances,
      createDOMEvent_fn
    ).call(this, event2);
  for (let i = 0; i < nativeTextTracks.length; i++) {
    const textTrackInfo = data[i],
      nativeTextTrack = nativeTextTracks[i];
    const id2 = `dash-${textTrackInfo.kind}-${i}`,
      track = new TextTrack({
        id: id2,
        label:
          (textTrackInfo == null ? void 0 : textTrackInfo.label) ??
          ((_a6 = textTrackInfo.labels.find((t) => t.text)) == null
            ? void 0
            : _a6.text) ??
          ((textTrackInfo == null ? void 0 : textTrackInfo.lang) &&
            getLangName(textTrackInfo.lang)) ??
          (textTrackInfo == null ? void 0 : textTrackInfo.lang) ??
          void 0,
        language: textTrackInfo.lang ?? void 0,
        kind: textTrackInfo.kind,
        default: textTrackInfo.defaultTrack,
      });
    track[TextTrackSymbol.native] = {
      managed: true,
      track: nativeTextTrack,
    };
    track[TextTrackSymbol.readyState] = 2;
    track[TextTrackSymbol.onModeChange] = () => {
      if (!__privateGet(this, _instance)) return;
      if (track.mode === 'showing') {
        __privateGet(this, _instance).setTextTrack(i);
        __privateSet(this, _currentTrack, track);
      } else {
        __privateGet(this, _instance).setTextTrack(-1);
        __privateSet(this, _currentTrack, null);
      }
    };
    __privateGet(this, _ctx5).textTracks.add(track, trigger);
  }
};
onTrackChange_fn = function (event2) {
  const { mediaType, newMediaInfo } = event2;
  if (mediaType === 'audio') {
    const track = __privateGet(this, _ctx5).audioTracks.getById(
      `dash-audio-${newMediaInfo.index}`
    );
    if (track) {
      const trigger = __privateMethod(
        this,
        _DASHController_instances,
        createDOMEvent_fn
      ).call(this, event2);
      __privateGet(this, _ctx5).audioTracks[ListSymbol.select](
        track,
        true,
        trigger
      );
    }
  }
};
onQualityChange_fn = function (event2) {
  if (event2.mediaType !== 'video') return;
  const quality = __privateGet(this, _ctx5).qualities[event2.newQuality];
  if (quality) {
    const trigger = __privateMethod(
      this,
      _DASHController_instances,
      createDOMEvent_fn
    ).call(this, event2);
    __privateGet(this, _ctx5).qualities[ListSymbol.select](
      quality,
      true,
      trigger
    );
  }
};
onManifestLoaded_fn = function (event2) {
  if (
    __privateGet(this, _ctx5).$state.canPlay() ||
    !__privateGet(this, _instance)
  )
    return;
  const { type, mediaPresentationDuration } = event2.data,
    trigger = __privateMethod(
      this,
      _DASHController_instances,
      createDOMEvent_fn
    ).call(this, event2);
  __privateGet(this, _ctx5).notify(
    'stream-type-change',
    type !== 'static' ? 'live' : 'on-demand',
    trigger
  );
  __privateGet(this, _ctx5).notify(
    'duration-change',
    mediaPresentationDuration,
    trigger
  );
  __privateGet(this, _ctx5).qualities[QualitySymbol.setAuto](true, trigger);
  const media = __privateGet(this, _instance).getVideoElement();
  const videoQualities = __privateGet(
    this,
    _instance
  ).getTracksForTypeFromManifest('video', event2.data);
  const supportedVideoMimeType = [
    ...new Set(videoQualities.map((e) => e.mimeType)),
  ].find((type2) => type2 && canPlayVideoType(media, type2));
  const videoQuality = videoQualities.filter(
    (track) => supportedVideoMimeType === track.mimeType
  )[0];
  let audioTracks = __privateGet(this, _instance).getTracksForTypeFromManifest(
    'audio',
    event2.data
  );
  const supportedAudioMimeType = [
    ...new Set(audioTracks.map((e) => e.mimeType)),
  ].find((type2) => type2 && canPlayAudioType(media, type2));
  audioTracks = audioTracks.filter(
    (track) => supportedAudioMimeType === track.mimeType
  );
  videoQuality.bitrateList.forEach((bitrate, index) => {
    var _a6;
    const quality = {
      id:
        ((_a6 = bitrate.id) == null ? void 0 : _a6.toString()) ??
        `dash-bitrate-${index}`,
      width: bitrate.width ?? 0,
      height: bitrate.height ?? 0,
      bitrate: bitrate.bandwidth ?? 0,
      codec: videoQuality.codec,
      index,
    };
    __privateGet(this, _ctx5).qualities[ListSymbol.add](quality, trigger);
  });
  if (isNumber(videoQuality.index)) {
    const quality = __privateGet(this, _ctx5).qualities[videoQuality.index];
    if (quality)
      __privateGet(this, _ctx5).qualities[ListSymbol.select](
        quality,
        true,
        trigger
      );
  }
  audioTracks.forEach((audioTrack, index) => {
    const matchingLabel = audioTrack.labels.find((label2) => {
      return navigator.languages.some((language) => {
        return (
          label2.lang &&
          language.toLowerCase().startsWith(label2.lang.toLowerCase())
        );
      });
    });
    const label = matchingLabel || audioTrack.labels[0];
    const localTrack = {
      id: `dash-audio-${audioTrack == null ? void 0 : audioTrack.index}`,
      label:
        (label == null ? void 0 : label.text) ??
        (audioTrack.lang && getLangName(audioTrack.lang)) ??
        audioTrack.lang ??
        '',
      language: audioTrack.lang ?? '',
      kind: 'main',
      mimeType: audioTrack.mimeType,
      codec: audioTrack.codec,
      index,
    };
    __privateGet(this, _ctx5).audioTracks[ListSymbol.add](localTrack, trigger);
  });
  media.dispatchEvent(new DOMEvent('canplay', { trigger }));
};
onError_fn3 = function (event2) {
  var _a6;
  const { type: eventType, error: data } = event2;
  {
    (_a6 = __privateGet(this, _ctx5).logger) == null
      ? void 0
      : _a6
          .errorGroup(`[vidstack] DASH error \`${data.message}\``)
          .labelledLog('Media Element', __privateGet(this, _video6))
          .labelledLog('DASH Instance', __privateGet(this, _instance))
          .labelledLog('Event Type', eventType)
          .labelledLog('Data', data)
          .labelledLog('Src', peek(__privateGet(this, _ctx5).$state.source))
          .labelledLog('Media Store', { ...__privateGet(this, _ctx5).$state })
          .dispatch();
  }
  switch (data.code) {
    case 27:
      __privateMethod(this, _DASHController_instances, onNetworkError_fn).call(
        this,
        data
      );
      break;
    default:
      __privateMethod(this, _DASHController_instances, onFatalError_fn).call(
        this,
        data
      );
      break;
  }
};
onFragmentLoadStart_fn = function () {
  if (__privateGet(this, _retryLoadingTimer) >= 0)
    __privateMethod(this, _DASHController_instances, clearRetryTimer_fn).call(
      this
    );
};
onFragmentLoadComplete_fn = function (event2) {
  const mediaType = event2.mediaType;
  if (mediaType === 'text') {
    requestAnimationFrame(
      __privateMethod(
        this,
        _DASHController_instances,
        onTextFragmentLoaded_fn
      ).bind(this, event2)
    );
  }
};
_retryLoadingTimer = new WeakMap();
onNetworkError_fn = function (error) {
  var _a6;
  __privateMethod(this, _DASHController_instances, clearRetryTimer_fn).call(
    this
  );
  (_a6 = __privateGet(this, _instance)) == null ? void 0 : _a6.play();
  __privateSet(
    this,
    _retryLoadingTimer,
    window.setTimeout(() => {
      __privateSet(this, _retryLoadingTimer, -1);
      __privateMethod(this, _DASHController_instances, onFatalError_fn).call(
        this,
        error
      );
    }, 5e3)
  );
};
clearRetryTimer_fn = function () {
  clearTimeout(__privateGet(this, _retryLoadingTimer));
  __privateSet(this, _retryLoadingTimer, -1);
};
onFatalError_fn = function (error) {
  __privateGet(this, _ctx5).notify('error', {
    message: error.message ?? '',
    code: 1,
    error,
  });
};
enableAutoQuality_fn = function () {
  var _a6;
  __privateMethod(this, _DASHController_instances, switchAutoBitrate_fn).call(
    this,
    'video',
    true
  );
  const { qualities } = __privateGet(this, _ctx5);
  (_a6 = __privateGet(this, _instance)) == null
    ? void 0
    : _a6.setQualityFor('video', qualities.selectedIndex, true);
};
switchAutoBitrate_fn = function (type, auto) {
  var _a6;
  (_a6 = __privateGet(this, _instance)) == null
    ? void 0
    : _a6.updateSettings({
        streaming: { abr: { autoSwitchBitrate: { [type]: auto } } },
      });
};
onUserQualityChange_fn = function () {
  const { qualities } = __privateGet(this, _ctx5);
  if (!__privateGet(this, _instance) || qualities.auto || !qualities.selected)
    return;
  __privateMethod(this, _DASHController_instances, switchAutoBitrate_fn).call(
    this,
    'video',
    false
  );
  __privateGet(this, _instance).setQualityFor(
    'video',
    qualities.selectedIndex,
    qualities.switch === 'current'
  );
  if (IS_CHROME) {
    __privateGet(this, _video6).currentTime = __privateGet(
      this,
      _video6
    ).currentTime;
  }
};
onUserAudioChange_fn = function () {
  if (!__privateGet(this, _instance)) return;
  const { audioTracks } = __privateGet(this, _ctx5),
    selectedTrack = __privateGet(this, _instance)
      .getTracksFor('audio')
      .find(
        (track) =>
          audioTracks.selected &&
          audioTracks.selected.id === `dash-audio-${track.index}`
      );
  if (selectedTrack)
    __privateGet(this, _instance).setCurrentTrack(selectedTrack);
};
reset_fn = function () {
  __privateMethod(this, _DASHController_instances, clearRetryTimer_fn).call(
    this
  );
  __privateSet(this, _currentTrack, null);
  __privateSet(this, _cueTracker, {});
};
function coerceToError(error) {
  return error instanceof Error
    ? error
    : Error(typeof error === 'string' ? error : JSON.stringify(error));
}
function assert(condition, message) {
  if (!condition) {
    throw Error(message || 'Assertion failed.');
  }
}
var _lib,
  _ctx6,
  _callback2,
  _DASHLibLoader_instances,
  startLoading_fn,
  onLoadStart_fn2,
  onLoaded_fn,
  onLoadError_fn;
var DASHLibLoader = class {
  constructor(lib, ctx, callback) {
    __privateAdd(this, _DASHLibLoader_instances);
    __privateAdd(this, _lib);
    __privateAdd(this, _ctx6);
    __privateAdd(this, _callback2);
    __privateSet(this, _lib, lib);
    __privateSet(this, _ctx6, ctx);
    __privateSet(this, _callback2, callback);
    __privateMethod(this, _DASHLibLoader_instances, startLoading_fn).call(this);
  }
};
_lib = new WeakMap();
_ctx6 = new WeakMap();
_callback2 = new WeakMap();
_DASHLibLoader_instances = new WeakSet();
startLoading_fn = async function () {
  var _a6, _b2;
  (_a6 = __privateGet(this, _ctx6).logger) == null
    ? void 0
    : _a6.info('🏗️ Loading DASH Library');
  const callbacks = {
    onLoadStart: __privateMethod(
      this,
      _DASHLibLoader_instances,
      onLoadStart_fn2
    ).bind(this),
    onLoaded: __privateMethod(this, _DASHLibLoader_instances, onLoaded_fn).bind(
      this
    ),
    onLoadError: __privateMethod(
      this,
      _DASHLibLoader_instances,
      onLoadError_fn
    ).bind(this),
  };
  let ctor = await loadDASHScript(__privateGet(this, _lib), callbacks);
  if (isUndefined(ctor) && !isString(__privateGet(this, _lib)))
    ctor = await importDASH(__privateGet(this, _lib), callbacks);
  if (!ctor) return null;
  if (!window.dashjs.supportsMediaSource()) {
    const message = '[vidstack] `dash.js` is not supported in this environment';
    (_b2 = __privateGet(this, _ctx6).logger) == null
      ? void 0
      : _b2.error(message);
    __privateGet(this, _ctx6).player.dispatch(new DOMEvent('dash-unsupported'));
    __privateGet(this, _ctx6).notify('error', { message, code: 4 });
    return null;
  }
  return ctor;
};
onLoadStart_fn2 = function () {
  var _a6;
  {
    (_a6 = __privateGet(this, _ctx6).logger) == null
      ? void 0
      : _a6
          .infoGroup('Starting to load `dash.js`')
          .labelledLog('URL', __privateGet(this, _lib))
          .dispatch();
  }
  __privateGet(this, _ctx6).player.dispatch(
    new DOMEvent('dash-lib-load-start')
  );
};
onLoaded_fn = function (ctor) {
  var _a6;
  {
    (_a6 = __privateGet(this, _ctx6).logger) == null
      ? void 0
      : _a6
          .infoGroup('Loaded `dash.js`')
          .labelledLog('Library', __privateGet(this, _lib))
          .labelledLog('Constructor', ctor)
          .dispatch();
  }
  __privateGet(this, _ctx6).player.dispatch(
    new DOMEvent('dash-lib-loaded', {
      detail: ctor,
    })
  );
  __privateGet(this, _callback2).call(this, ctor);
};
onLoadError_fn = function (e) {
  var _a6;
  const error = coerceToError(e);
  {
    (_a6 = __privateGet(this, _ctx6).logger) == null
      ? void 0
      : _a6
          .errorGroup('[vidstack] Failed to load `dash.js`')
          .labelledLog('Library', __privateGet(this, _lib))
          .labelledLog('Error', e)
          .dispatch();
  }
  __privateGet(this, _ctx6).player.dispatch(
    new DOMEvent('dash-lib-load-error', {
      detail: error,
    })
  );
  __privateGet(this, _ctx6).notify('error', {
    message: error.message,
    code: 4,
    error,
  });
};
async function importDASH(loader, callbacks = {}) {
  var _a6, _b2, _c2, _d2, _e, _f, _g;
  if (isUndefined(loader)) return void 0;
  (_a6 = callbacks.onLoadStart) == null ? void 0 : _a6.call(callbacks);
  if (isDASHConstructor(loader)) {
    (_b2 = callbacks.onLoaded) == null ? void 0 : _b2.call(callbacks, loader);
    return loader;
  }
  if (isDASHNamespace(loader)) {
    const ctor = loader.MediaPlayer;
    (_c2 = callbacks.onLoaded) == null ? void 0 : _c2.call(callbacks, ctor);
    return ctor;
  }
  try {
    const ctor = (_d2 = await loader()) == null ? void 0 : _d2.default;
    if (isDASHNamespace(ctor)) {
      (_e = callbacks.onLoaded) == null
        ? void 0
        : _e.call(callbacks, ctor.MediaPlayer);
      return ctor.MediaPlayer;
    }
    if (ctor) {
      (_f = callbacks.onLoaded) == null ? void 0 : _f.call(callbacks, ctor);
    } else {
      throw Error(
        true
          ? '[vidstack] failed importing `dash.js`. Dynamic import returned invalid object.'
          : ''
      );
    }
    return ctor;
  } catch (err) {
    (_g = callbacks.onLoadError) == null ? void 0 : _g.call(callbacks, err);
  }
  return void 0;
}
async function loadDASHScript(src, callbacks = {}) {
  var _a6, _b2, _c2;
  if (!isString(src)) return void 0;
  (_a6 = callbacks.onLoadStart) == null ? void 0 : _a6.call(callbacks);
  try {
    await loadScript(src);
    if (!isFunction(window.dashjs.MediaPlayer)) {
      throw Error(
        true
          ? '[vidstack] failed loading `dash.js`. Could not find a valid `Dash` constructor on window'
          : ''
      );
    }
    const ctor = window.dashjs.MediaPlayer;
    (_b2 = callbacks.onLoaded) == null ? void 0 : _b2.call(callbacks, ctor);
    return ctor;
  } catch (err) {
    (_c2 = callbacks.onLoadError) == null ? void 0 : _c2.call(callbacks, err);
  }
  return void 0;
}
function isDASHConstructor(value) {
  return value && value.prototype && value.prototype !== Function;
}
function isDASHNamespace(value) {
  return value && 'MediaPlayer' in value;
}
var JS_DELIVR_CDN = 'https://cdn.jsdelivr.net';
var _ctor, _controller, _library;
var DASHProvider = class extends VideoProvider {
  constructor() {
    super(...arguments);
    __publicField(this, '$$PROVIDER_TYPE', 'DASH');
    __privateAdd(this, _ctor, null);
    __privateAdd(this, _controller, new DASHController(this.video, this.ctx));
    __privateAdd(
      this,
      _library,
      `${JS_DELIVR_CDN}/npm/dashjs@4.7.4/dist/dash${'.all.debug.js'}`
    );
  }
  /**
   * The `dash.js` constructor.
   */
  get ctor() {
    return __privateGet(this, _ctor);
  }
  /**
   * The current `dash.js` instance.
   */
  get instance() {
    return __privateGet(this, _controller).instance;
  }
  get type() {
    return 'dash';
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `dash.js` configuration object.
   *
   * @see {@link https://cdn.dashjs.org/latest/jsdoc/module-Settings.html}
   */
  get config() {
    return __privateGet(this, _controller).config;
  }
  set config(config) {
    __privateGet(this, _controller).config = config;
  }
  /**
   * The `dash.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/dashjs@4.7.4/dist/dash.all.min.js`
   */
  get library() {
    return __privateGet(this, _library);
  }
  set library(library) {
    __privateSet(this, _library, library);
  }
  preconnect() {
    if (!isString(__privateGet(this, _library))) return;
    preconnect(__privateGet(this, _library));
  }
  setup() {
    super.setup();
    new DASHLibLoader(__privateGet(this, _library), this.ctx, (ctor) => {
      __privateSet(this, _ctor, ctor);
      __privateGet(this, _controller).setup(ctor);
      this.ctx.notify('provider-setup', this);
      const src = peek(this.ctx.$state.source);
      if (src) this.loadSource(src);
    });
  }
  async loadSource(src, preload) {
    if (!isString(src.src)) {
      this.removeSource();
      return;
    }
    this.media.preload = preload || '';
    this.appendSource(src, 'application/x-mpegurl');
    __privateGet(this, _controller).loadSource(src);
    this.currentSrc = src;
  }
  /**
   * The given callback is invoked when a new `dash.js` instance is created and right before it's
   * attached to media.
   */
  onInstance(callback) {
    const instance = __privateGet(this, _controller).instance;
    if (instance) callback(instance);
    return __privateGet(this, _controller).onInstance(callback);
  }
  destroy() {
    __privateGet(this, _controller).destroy();
  }
};
_ctor = new WeakMap();
_controller = new WeakMap();
_library = new WeakMap();
/**
 * Whether `dash.js` is supported in this environment.
 */
__publicField(DASHProvider, 'supported', isDASHSupported());
var provider = Object.freeze({
  __proto__: null,
  DASHProvider,
});
var _DASHProviderLoader = class _DASHProviderLoader extends VideoProviderLoader {
  constructor() {
    super(...arguments);
    __publicField(this, 'name', 'dash');
  }
  canPlay(src) {
    return _DASHProviderLoader.supported && isDASHSrc(src);
  }
  async load(context) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load dash provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<video>` element was not found - did you forget to include `<media-provider>`?'
      );
    }
    return new (
      await Promise.resolve().then(function () {
        return provider;
      })
    ).DASHProvider(this.target, context);
  }
};
__publicField(_DASHProviderLoader, 'supported', isDASHSupported());
var DASHProviderLoader = _DASHProviderLoader;
var VimeoProviderLoader = class {
  constructor() {
    __publicField(this, 'name', 'vimeo');
    __publicField(this, 'target');
  }
  preconnect() {
    const connections = [
      'https://i.vimeocdn.com',
      'https://f.vimeocdn.com',
      'https://fresnel.vimeocdn.com',
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === 'video/vimeo';
  }
  mediaType() {
    return 'video';
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load vimeo provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<iframe>` element was not found - did you forget to include media provider?'
      );
    }
    return new (await import('./vidstack-DF6waG6B-NGYFNMHS.js')).VimeoProvider(
      this.target,
      ctx
    );
  }
  async loadPoster(src, ctx, abort) {
    const { resolveVimeoVideoId, getVimeoVideoInfo } = await import(
      './vidstack-krOAtKMi-NMYGYJMI.js'
    );
    if (!isString(src.src)) return null;
    const { videoId, hash } = resolveVimeoVideoId(src.src);
    if (videoId) {
      return getVimeoVideoInfo(videoId, abort, hash).then((info) =>
        info ? info.poster : null
      );
    }
    return null;
  }
};
var YouTubeProviderLoader = class {
  constructor() {
    __publicField(this, 'name', 'youtube');
    __publicField(this, 'target');
  }
  preconnect() {
    const connections = [
      // Botguard script.
      'https://www.google.com',
      // Posters.
      'https://i.ytimg.com',
      // Ads.
      'https://googleads.g.doubleclick.net',
      'https://static.doubleclick.net',
    ];
    for (const url of connections) {
      preconnect(url);
    }
  }
  canPlay(src) {
    return isString(src.src) && src.type === 'video/youtube';
  }
  mediaType() {
    return 'video';
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load youtube provider server-side');
    }
    if (!this.target) {
      throw Error(
        '[vidstack] `<iframe>` element was not found - did you forget to include media provider?'
      );
    }
    return new (
      await import('./vidstack-Breph70c-MIHHRUTJ.js')
    ).YouTubeProvider(this.target, ctx);
  }
  async loadPoster(src, ctx, abort) {
    const { findYouTubePoster, resolveYouTubeVideoId } = await import(
      './vidstack-Zc3I7oOd-IDRYYQWC.js'
    );
    const videoId = isString(src.src) && resolveYouTubeVideoId(src.src);
    if (videoId) return findYouTubePoster(videoId, abort);
    return null;
  }
};
function padNumberWithZeroes(num, expectedLength) {
  const str = String(num);
  const actualLength = str.length;
  const shouldPad = actualLength < expectedLength;
  if (shouldPad) {
    const padLength = expectedLength - actualLength;
    const padding = `0`.repeat(padLength);
    return `${padding}${num}`;
  }
  return str;
}
function parseTime(duration) {
  const hours = Math.trunc(duration / 3600);
  const minutes = Math.trunc((duration % 3600) / 60);
  const seconds = Math.trunc(duration % 60);
  const fraction = Number((duration - Math.trunc(duration)).toPrecision(3));
  return {
    hours,
    minutes,
    seconds,
    fraction,
  };
}
function formatTime(
  duration,
  { padHrs = null, padMins = null, showHrs = false, showMs = false } = {}
) {
  const { hours, minutes, seconds, fraction } = parseTime(duration),
    paddedHours = padHrs ? padNumberWithZeroes(hours, 2) : hours,
    paddedMinutes =
      padMins || (isNull(padMins) && duration >= 3600)
        ? padNumberWithZeroes(minutes, 2)
        : minutes,
    paddedSeconds = padNumberWithZeroes(seconds, 2),
    paddedMs =
      showMs && fraction > 0 ? `.${String(fraction).replace(/^0?\./, '')}` : '',
    time = `${paddedMinutes}:${paddedSeconds}${paddedMs}`;
  return hours > 0 || showHrs ? `${paddedHours}:${time}` : time;
}
function formatSpokenTime(duration) {
  const spokenParts = [];
  const { hours, minutes, seconds } = parseTime(duration);
  if (hours > 0) {
    spokenParts.push(`${hours} hour`);
  }
  if (minutes > 0) {
    spokenParts.push(`${minutes} min`);
  }
  if (seconds > 0 || spokenParts.length === 0) {
    spokenParts.push(`${seconds} sec`);
  }
  return spokenParts.join(' ');
}
var MEDIA_ATTRIBUTES = Symbol('MEDIA_ATTRIBUTES');
var mediaAttributes = [
  'autoPlay',
  'canAirPlay',
  'canFullscreen',
  'canGoogleCast',
  'canLoad',
  'canLoadPoster',
  'canPictureInPicture',
  'canPlay',
  'canSeek',
  'ended',
  'fullscreen',
  'isAirPlayConnected',
  'isGoogleCastConnected',
  'live',
  'liveEdge',
  'loop',
  'mediaType',
  'muted',
  'paused',
  'pictureInPicture',
  'playing',
  'playsInline',
  'remotePlaybackState',
  'remotePlaybackType',
  'seeking',
  'started',
  'streamType',
  'viewType',
  'waiting',
];
var mediaPlayerProps = {
  artist: '',
  artwork: null,
  autoplay: false,
  autoPlay: false,
  clipStartTime: 0,
  clipEndTime: 0,
  controls: false,
  currentTime: 0,
  crossorigin: null,
  crossOrigin: null,
  duration: -1,
  fullscreenOrientation: 'landscape',
  googleCast: {},
  load: 'visible',
  posterLoad: 'visible',
  logLevel: 'warn',
  loop: false,
  muted: false,
  paused: true,
  playsinline: false,
  playsInline: false,
  playbackRate: 1,
  poster: '',
  preload: 'metadata',
  preferNativeHLS: false,
  src: '',
  title: '',
  controlsDelay: 2e3,
  hideControlsOnMouseLeave: false,
  viewType: 'unknown',
  streamType: 'unknown',
  volume: 1,
  liveEdgeTolerance: 10,
  minLiveDVRWindow: 60,
  keyDisabled: false,
  keyTarget: 'player',
  keyShortcuts: MEDIA_KEY_SHORTCUTS,
  storage: null,
};
var MEDIA_EVENTS = [
  'abort',
  'can-play',
  'can-play-through',
  'duration-change',
  'emptied',
  'ended',
  'error',
  'fullscreen-change',
  'loaded-data',
  'loaded-metadata',
  'load-start',
  'media-type-change',
  'pause',
  'play',
  'playing',
  'progress',
  'seeked',
  'seeking',
  'source-change',
  'sources-change',
  'stalled',
  'started',
  'suspend',
  'stream-type-change',
  'replay',
  // time-change,
  // 'time-update',
  'view-type-change',
  'volume-change',
  'waiting',
];
var _media7, _MediaEventsLogger_instances, onMediaEvent_fn;
var MediaEventsLogger = class extends MediaPlayerController {
  constructor(media) {
    super();
    __privateAdd(this, _MediaEventsLogger_instances);
    __privateAdd(this, _media7);
    __privateSet(this, _media7, media);
  }
  onConnect(el) {
    const events = new EventsController(el),
      handler = __privateMethod(
        this,
        _MediaEventsLogger_instances,
        onMediaEvent_fn
      ).bind(this);
    for (const eventType of MEDIA_EVENTS) {
      events.add(eventType, handler);
    }
  }
};
_media7 = new WeakMap();
_MediaEventsLogger_instances = new WeakSet();
onMediaEvent_fn = function (event2) {
  var _a6;
  (_a6 = __privateGet(this, _media7).logger) == null
    ? void 0
    : _a6
        .debugGroup(`📡 dispatching \`${event2.type}\``)
        .labelledLog('Media Store', { ...this.$state })
        .labelledLog('Event', event2)
        .dispatch();
};
var _type2, _callback3;
var MediaLoadController = class extends MediaPlayerController {
  constructor(type, callback) {
    super();
    __privateAdd(this, _type2);
    __privateAdd(this, _callback3);
    __privateSet(this, _type2, type);
    __privateSet(this, _callback3, callback);
  }
  async onAttach(el) {
    if (IS_SERVER) return;
    const load = this.$props[__privateGet(this, _type2)]();
    if (load === 'eager') {
      requestAnimationFrame(__privateGet(this, _callback3));
    } else if (load === 'idle') {
      waitIdlePeriod(__privateGet(this, _callback3));
    } else if (load === 'visible') {
      let dispose,
        observer = new IntersectionObserver((entries) => {
          if (!this.scope) return;
          if (entries[0].isIntersecting) {
            dispose == null ? void 0 : dispose();
            dispose = void 0;
            __privateGet(this, _callback3).call(this);
          }
        });
      observer.observe(el);
      dispose = onDispose(() => observer.disconnect());
    }
  }
};
_type2 = new WeakMap();
_callback3 = new WeakMap();
var seenAutoplayWarning = false;
var _handle, _media8, _MediaPlayerDelegate_instances, attemptAutoplay_fn;
var MediaPlayerDelegate = class {
  constructor(handle, media) {
    __privateAdd(this, _MediaPlayerDelegate_instances);
    __privateAdd(this, _handle);
    __privateAdd(this, _media8);
    __privateSet(this, _handle, handle);
    __privateSet(this, _media8, media);
  }
  notify(type, ...init2) {
    if (IS_SERVER) return;
    __privateGet(this, _handle).call(
      this,
      new DOMEvent(type, {
        detail: init2 == null ? void 0 : init2[0],
        trigger: init2 == null ? void 0 : init2[1],
      })
    );
  }
  async ready(info, trigger) {
    if (IS_SERVER) return;
    return untrack(async () => {
      var _a6, _b2, _c2, _d2, _e, _f, _g;
      const { logger } = __privateGet(this, _media8),
        {
          autoPlay,
          canPlay,
          started,
          duration,
          seekable,
          buffered,
          remotePlaybackInfo,
          playsInline,
          savedState,
          source,
        } = __privateGet(this, _media8).$state;
      if (canPlay()) return;
      const detail = {
        duration: (info == null ? void 0 : info.duration) ?? duration(),
        seekable: (info == null ? void 0 : info.seekable) ?? seekable(),
        buffered: (info == null ? void 0 : info.buffered) ?? buffered(),
        provider: __privateGet(this, _media8).$provider(),
      };
      this.notify('can-play', detail, trigger);
      tick();
      {
        logger == null
          ? void 0
          : logger
              .infoGroup('-~-~-~-~-~-~- ✅ MEDIA READY -~-~-~-~-~-~-')
              .labelledLog('Media', __privateGet(this, _media8))
              .labelledLog('Trigger Event', trigger)
              .dispatch();
      }
      let provider2 = __privateGet(this, _media8).$provider(),
        { storage, qualities } = __privateGet(this, _media8),
        { muted, volume, clipStartTime, playbackRate } = __privateGet(
          this,
          _media8
        ).$props;
      await ((_a6 = storage == null ? void 0 : storage.onLoad) == null
        ? void 0
        : _a6.call(storage, source()));
      const savedPlaybackTime =
          (_b2 = savedState()) == null ? void 0 : _b2.currentTime,
        savedPausedState = (_c2 = savedState()) == null ? void 0 : _c2.paused,
        storageTime = await (storage == null ? void 0 : storage.getTime()),
        startTime = savedPlaybackTime ?? storageTime ?? clipStartTime(),
        shouldAutoPlay =
          savedPausedState === false ||
          (savedPausedState !== true && !started() && autoPlay());
      if (provider2) {
        provider2.setVolume(
          (await (storage == null ? void 0 : storage.getVolume())) ?? volume()
        );
        provider2.setMuted(
          muted() || !!(await (storage == null ? void 0 : storage.getMuted()))
        );
        const audioGain =
          (await (storage == null ? void 0 : storage.getAudioGain())) ?? 1;
        if (audioGain > 1)
          (_e = (_d2 = provider2.audioGain) == null ? void 0 : _d2.setGain) ==
          null
            ? void 0
            : _e.call(_d2, audioGain);
        (_f = provider2.setPlaybackRate) == null
          ? void 0
          : _f.call(
              provider2,
              (await (storage == null ? void 0 : storage.getPlaybackRate())) ??
                playbackRate()
            );
        (_g = provider2.setPlaysInline) == null
          ? void 0
          : _g.call(provider2, playsInline());
        if (startTime > 0) provider2.setCurrentTime(startTime);
      }
      const prefQuality = await (storage == null
        ? void 0
        : storage.getVideoQuality());
      if (prefQuality && qualities.length) {
        let currentQuality = null,
          currentScore = Infinity;
        for (const quality of qualities) {
          const score =
            Math.abs(prefQuality.width - quality.width) +
            Math.abs(prefQuality.height - quality.height) +
            (prefQuality.bitrate
              ? Math.abs(prefQuality.bitrate - (quality.bitrate ?? 0))
              : 0);
          if (score < currentScore) {
            currentQuality = quality;
            currentScore = score;
          }
        }
        if (currentQuality) currentQuality.selected = true;
      }
      if (canPlay() && shouldAutoPlay) {
        await __privateMethod(
          this,
          _MediaPlayerDelegate_instances,
          attemptAutoplay_fn
        ).call(this, trigger);
      } else if (storageTime && storageTime > 0) {
        this.notify('started', void 0, trigger);
      }
      remotePlaybackInfo.set(null);
    });
  }
};
_handle = new WeakMap();
_media8 = new WeakMap();
_MediaPlayerDelegate_instances = new WeakSet();
attemptAutoplay_fn = async function (trigger) {
  var _a6;
  const {
    player,
    $state: { autoPlaying, muted },
  } = __privateGet(this, _media8);
  autoPlaying.set(true);
  const attemptEvent = new DOMEvent('auto-play-attempt', { trigger });
  try {
    await player.play(attemptEvent);
  } catch (error) {
    if (!seenAutoplayWarning) {
      const muteMsg = !muted()
        ? ' Attempting with volume muted will most likely resolve the issue.'
        : '';
      (_a6 = __privateGet(this, _media8).logger) == null
        ? void 0
        : _a6
            .errorGroup('[vidstack] auto-play request failed')
            .labelledLog(
              'Message',
              `Autoplay was requested but failed most likely due to browser autoplay policies.${muteMsg}`
            )
            .labelledLog('Trigger Event', trigger)
            .labelledLog('Error', error)
            .labelledLog('See', 'https://developer.chrome.com/blog/autoplay')
            .dispatch();
      seenAutoplayWarning = true;
    }
  }
};
var _queue;
var Queue = class {
  constructor() {
    __privateAdd(this, _queue, /* @__PURE__ */ new Map());
  }
  /**
   * Queue the given `item` under the given `key` to be processed at a later time by calling
   * `serve(key)`.
   */
  enqueue(key, item) {
    __privateGet(this, _queue).set(key, item);
  }
  /**
   * Process item in queue for the given `key`.
   */
  serve(key) {
    const value = this.peek(key);
    __privateGet(this, _queue).delete(key);
    return value;
  }
  /**
   * Peek at item in queue for the given `key`.
   */
  peek(key) {
    return __privateGet(this, _queue).get(key);
  }
  /**
   * Removes queued item under the given `key`.
   */
  delete(key) {
    __privateGet(this, _queue).delete(key);
  }
  /**
   * Clear all items in the queue.
   */
  clear() {
    __privateGet(this, _queue).clear();
  }
};
_queue = new WeakMap();
var _serving, _pending, _queue2, _RequestQueue_instances, flush_fn, release_fn;
var RequestQueue = class {
  constructor() {
    __privateAdd(this, _RequestQueue_instances);
    __privateAdd(this, _serving, false);
    __privateAdd(this, _pending, deferredPromise());
    __privateAdd(this, _queue2, /* @__PURE__ */ new Map());
  }
  /**
   * The number of callbacks that are currently in queue.
   */
  get size() {
    return __privateGet(this, _queue2).size;
  }
  /**
   * Whether items in the queue are being served immediately, otherwise they're queued to
   * be processed later.
   */
  get isServing() {
    return __privateGet(this, _serving);
  }
  /**
   * Waits for the queue to be flushed (ie: start serving).
   */
  async waitForFlush() {
    if (__privateGet(this, _serving)) return;
    await __privateGet(this, _pending).promise;
  }
  /**
   * Queue the given `callback` to be invoked at a later time by either calling the `serve()` or
   * `start()` methods. If the queue has started serving (i.e., `start()` was already called),
   * then the callback will be invoked immediately.
   *
   * @param key - Uniquely identifies this callback so duplicates are ignored.
   * @param callback - The function to call when this item in the queue is being served.
   */
  enqueue(key, callback) {
    if (__privateGet(this, _serving)) {
      callback();
      return;
    }
    __privateGet(this, _queue2).delete(key);
    __privateGet(this, _queue2).set(key, callback);
  }
  /**
   * Invokes the callback with the given `key` in the queue (if it exists).
   */
  serve(key) {
    var _a6;
    (_a6 = __privateGet(this, _queue2).get(key)) == null ? void 0 : _a6();
    __privateGet(this, _queue2).delete(key);
  }
  /**
   * Flush all queued items and start serving future requests immediately until `stop()` is called.
   */
  start() {
    __privateMethod(this, _RequestQueue_instances, flush_fn).call(this);
    __privateSet(this, _serving, true);
    if (__privateGet(this, _queue2).size > 0)
      __privateMethod(this, _RequestQueue_instances, flush_fn).call(this);
  }
  /**
   * Stop serving requests, they'll be queued until you begin processing again by calling `start()`.
   */
  stop() {
    __privateSet(this, _serving, false);
  }
  /**
   * Stop serving requests, empty the request queue, and release any promises waiting for the
   * queue to flush.
   */
  reset() {
    this.stop();
    __privateGet(this, _queue2).clear();
    __privateMethod(this, _RequestQueue_instances, release_fn).call(this);
  }
};
_serving = new WeakMap();
_pending = new WeakMap();
_queue2 = new WeakMap();
_RequestQueue_instances = new WeakSet();
flush_fn = function () {
  for (const key of __privateGet(this, _queue2).keys()) this.serve(key);
  __privateMethod(this, _RequestQueue_instances, release_fn).call(this);
};
release_fn = function () {
  __privateGet(this, _pending).resolve();
  __privateSet(this, _pending, deferredPromise());
};
var _stateMgr,
  _request,
  _media9,
  _fullscreen,
  _orientation,
  _$provider,
  _providerQueue,
  _MediaRequestManager_instances,
  attachLoadPlayListener_fn,
  watchProvider_fn,
  handleRequest_fn,
  handleLoadPlayStrategy_fn,
  _wasPIPActive,
  getFullscreenAdapter_fn,
  throwIfPIPNotSupported_fn,
  watchControlsDelayChange_fn,
  watchAudioGainSupport_fn,
  watchAirPlaySupport_fn,
  watchGoogleCastSupport_fn,
  watchFullscreenSupport_fn,
  watchPiPSupport_fn,
  _googleCastLoader,
  onFullscreenChange_fn,
  onFullscreenError_fn,
  onPictureInPictureError_fn,
  logError_fn;
var MediaRequestManager = class extends MediaPlayerController {
  constructor(stateMgr, request, media) {
    super();
    __privateAdd(this, _MediaRequestManager_instances);
    __privateAdd(this, _stateMgr);
    __privateAdd(this, _request);
    __privateAdd(this, _media9);
    __publicField(this, 'controls');
    __privateAdd(this, _fullscreen);
    __privateAdd(this, _orientation);
    __privateAdd(this, _$provider);
    __privateAdd(this, _providerQueue, new RequestQueue());
    __privateAdd(this, _wasPIPActive, false);
    __privateAdd(this, _googleCastLoader);
    __privateSet(this, _stateMgr, stateMgr);
    __privateSet(this, _request, request);
    __privateSet(this, _media9, media);
    __privateSet(this, _$provider, media.$provider);
    this.controls = new MediaControls();
    __privateSet(this, _fullscreen, new FullscreenController());
    __privateSet(this, _orientation, new ScreenOrientationController());
  }
  onAttach() {
    this.listen(
      'fullscreen-change',
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        onFullscreenChange_fn
      ).bind(this)
    );
  }
  onConnect(el) {
    const names = Object.getOwnPropertyNames(Object.getPrototypeOf(this)),
      events = new EventsController(el),
      handleRequest = __privateMethod(
        this,
        _MediaRequestManager_instances,
        handleRequest_fn
      ).bind(this);
    for (const name of names) {
      if (name.startsWith('media-')) {
        events.add(name, handleRequest);
      }
    }
    __privateMethod(
      this,
      _MediaRequestManager_instances,
      attachLoadPlayListener_fn
    ).call(this);
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchProvider_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchControlsDelayChange_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchAudioGainSupport_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchAirPlaySupport_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchGoogleCastSupport_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchFullscreenSupport_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        watchPiPSupport_fn
      ).bind(this)
    );
  }
  onDestroy() {
    try {
      const destroyEvent = this.createEvent('destroy'),
        { pictureInPicture, fullscreen } = this.$state;
      if (fullscreen()) this.exitFullscreen('prefer-media', destroyEvent);
      if (pictureInPicture()) this.exitPictureInPicture(destroyEvent);
    } catch (e) {}
    __privateGet(this, _providerQueue).reset();
  }
  async play(trigger) {
    if (IS_SERVER) return;
    const { canPlay, paused, autoPlaying } = this.$state;
    if (
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        handleLoadPlayStrategy_fn
      ).call(this, trigger)
    )
      return;
    if (!peek(paused)) return;
    if (trigger)
      __privateGet(this, _request).queue.enqueue('media-play-request', trigger);
    const isAutoPlaying = peek(autoPlaying);
    try {
      const provider2 = peek(__privateGet(this, _$provider));
      throwIfNotReadyForPlayback(provider2, peek(canPlay));
      return await provider2.play();
    } catch (error) {
      __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
        this,
        'play request failed',
        error,
        trigger
      );
      const errorEvent = this.createEvent('play-fail', {
        detail: coerceToError(error),
        trigger,
      });
      errorEvent.autoPlay = isAutoPlaying;
      __privateGet(this, _stateMgr).handle(errorEvent);
      throw error;
    }
  }
  async pause(trigger) {
    if (IS_SERVER) return;
    const { canPlay, paused } = this.$state;
    if (peek(paused)) return;
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-pause-request',
        trigger
      );
    }
    try {
      const provider2 = peek(__privateGet(this, _$provider));
      throwIfNotReadyForPlayback(provider2, peek(canPlay));
      return await provider2.pause();
    } catch (error) {
      __privateGet(this, _request).queue.delete('media-pause-request');
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'pause request failed',
          error,
          trigger
        );
      }
      throw error;
    }
  }
  setAudioGain(gain, trigger) {
    const { audioGain, canSetAudioGain } = this.$state;
    if (audioGain() === gain) return;
    const provider2 = __privateGet(this, _$provider).call(this);
    if (
      !(provider2 == null ? void 0 : provider2.audioGain) ||
      !canSetAudioGain()
    ) {
      throw Error('[vidstack] audio gain api not available');
    }
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-audio-gain-change-request',
        trigger
      );
    }
    provider2.audioGain.setGain(gain);
  }
  seekToLiveEdge(trigger) {
    if (IS_SERVER) return;
    const {
      canPlay,
      live,
      liveEdge,
      canSeek,
      liveSyncPosition,
      seekableEnd,
      userBehindLiveEdge,
    } = this.$state;
    userBehindLiveEdge.set(false);
    if (peek(() => !live() || liveEdge() || !canSeek())) return;
    const provider2 = peek(__privateGet(this, _$provider));
    throwIfNotReadyForPlayback(provider2, peek(canPlay));
    if (trigger)
      __privateGet(this, _request).queue.enqueue('media-seek-request', trigger);
    const end = seekableEnd() - 2;
    provider2.setCurrentTime(Math.min(end, liveSyncPosition() ?? end));
  }
  async enterFullscreen(target = 'prefer-media', trigger) {
    if (IS_SERVER) return;
    const adapter = __privateMethod(
      this,
      _MediaRequestManager_instances,
      getFullscreenAdapter_fn
    ).call(this, target);
    throwIfFullscreenNotSupported(target, adapter);
    if (adapter.active) return;
    if (peek(this.$state.pictureInPicture)) {
      __privateSet(this, _wasPIPActive, true);
      await this.exitPictureInPicture(trigger);
    }
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-enter-fullscreen-request',
        trigger
      );
    }
    return adapter.enter();
  }
  async exitFullscreen(target = 'prefer-media', trigger) {
    if (IS_SERVER) return;
    const adapter = __privateMethod(
      this,
      _MediaRequestManager_instances,
      getFullscreenAdapter_fn
    ).call(this, target);
    throwIfFullscreenNotSupported(target, adapter);
    if (!adapter.active) return;
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-exit-fullscreen-request',
        trigger
      );
    }
    try {
      const result = await adapter.exit();
      if (
        __privateGet(this, _wasPIPActive) &&
        peek(this.$state.canPictureInPicture)
      ) {
        await this.enterPictureInPicture();
      }
      return result;
    } finally {
      __privateSet(this, _wasPIPActive, false);
    }
  }
  async enterPictureInPicture(trigger) {
    if (IS_SERVER) return;
    __privateMethod(
      this,
      _MediaRequestManager_instances,
      throwIfPIPNotSupported_fn
    ).call(this);
    if (this.$state.pictureInPicture()) return;
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-enter-pip-request',
        trigger
      );
    }
    return await __privateGet(this, _$provider)
      .call(this)
      .pictureInPicture.enter();
  }
  async exitPictureInPicture(trigger) {
    if (IS_SERVER) return;
    __privateMethod(
      this,
      _MediaRequestManager_instances,
      throwIfPIPNotSupported_fn
    ).call(this);
    if (!this.$state.pictureInPicture()) return;
    if (trigger) {
      __privateGet(this, _request).queue.enqueue(
        'media-exit-pip-request',
        trigger
      );
    }
    return await __privateGet(this, _$provider)
      .call(this)
      .pictureInPicture.exit();
  }
  async ['media-airplay-request'](event2) {
    try {
      await this.requestAirPlay(event2);
    } catch (error) {}
  }
  async requestAirPlay(trigger) {
    var _a6;
    try {
      const adapter =
        (_a6 = __privateGet(this, _$provider).call(this)) == null
          ? void 0
          : _a6.airPlay;
      if (!(adapter == null ? void 0 : adapter.supported)) {
        throw Error(
          true
            ? 'AirPlay adapter not available on provider.'
            : 'No AirPlay adapter.'
        );
      }
      if (trigger) {
        __privateGet(this, _request).queue.enqueue(
          'media-airplay-request',
          trigger
        );
      }
      return await adapter.prompt();
    } catch (error) {
      __privateGet(this, _request).queue.delete('media-airplay-request');
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'airplay request failed',
          error,
          trigger
        );
      }
      throw error;
    }
  }
  async ['media-google-cast-request'](event2) {
    try {
      await this.requestGoogleCast(event2);
    } catch (error) {}
  }
  async requestGoogleCast(trigger) {
    try {
      const { canGoogleCast } = this.$state;
      if (!peek(canGoogleCast)) {
        const error = Error(
          true
            ? 'Google Cast not available on this platform.'
            : 'Cast not available.'
        );
        error.code = 'CAST_NOT_AVAILABLE';
        throw error;
      }
      preconnect('https://www.gstatic.com');
      if (!__privateGet(this, _googleCastLoader)) {
        const $module = await import('./vidstack-C8ZxSSGF-XPASJUFR.js').then(
          function (n) {
            return n.loader;
          }
        );
        __privateSet(this, _googleCastLoader, new $module.GoogleCastLoader());
      }
      await __privateGet(this, _googleCastLoader).prompt(
        __privateGet(this, _media9)
      );
      if (trigger) {
        __privateGet(this, _request).queue.enqueue(
          'media-google-cast-request',
          trigger
        );
      }
      const isConnecting =
        peek(this.$state.remotePlaybackState) !== 'disconnected';
      if (isConnecting) {
        this.$state.savedState.set({
          paused: peek(this.$state.paused),
          currentTime: peek(this.$state.currentTime),
        });
      }
      this.$state.remotePlaybackLoader.set(
        isConnecting ? __privateGet(this, _googleCastLoader) : null
      );
    } catch (error) {
      __privateGet(this, _request).queue.delete('media-google-cast-request');
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'google cast request failed',
          error,
          trigger
        );
      }
      throw error;
    }
  }
  ['media-clip-start-change-request'](event2) {
    const { clipStartTime } = this.$state;
    clipStartTime.set(event2.detail);
  }
  ['media-clip-end-change-request'](event2) {
    const { clipEndTime } = this.$state;
    clipEndTime.set(event2.detail);
    this.dispatch('duration-change', {
      detail: event2.detail,
      trigger: event2,
    });
  }
  ['media-duration-change-request'](event2) {
    const { providedDuration, clipEndTime } = this.$state;
    providedDuration.set(event2.detail);
    if (clipEndTime() <= 0) {
      this.dispatch('duration-change', {
        detail: event2.detail,
        trigger: event2,
      });
    }
  }
  ['media-audio-track-change-request'](event2) {
    const { logger, audioTracks } = __privateGet(this, _media9);
    if (audioTracks.readonly) {
      {
        logger == null
          ? void 0
          : logger
              .warnGroup(
                `[vidstack] attempted to change audio track but it is currently read-only`
              )
              .labelledLog('Request Event', event2)
              .dispatch();
      }
      return;
    }
    const index = event2.detail,
      track = audioTracks[index];
    if (track) {
      const key = event2.type;
      __privateGet(this, _request).queue.enqueue(key, event2);
      track.selected = true;
    } else {
      logger == null
        ? void 0
        : logger
            .warnGroup(
              '[vidstack] failed audio track change request (invalid index)'
            )
            .labelledLog('Audio Tracks', audioTracks.toArray())
            .labelledLog('Index', index)
            .labelledLog('Request Event', event2)
            .dispatch();
    }
  }
  async ['media-enter-fullscreen-request'](event2) {
    try {
      await this.enterFullscreen(event2.detail, event2);
    } catch (error) {
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        onFullscreenError_fn
      ).call(this, error, event2);
    }
  }
  async ['media-exit-fullscreen-request'](event2) {
    try {
      await this.exitFullscreen(event2.detail, event2);
    } catch (error) {
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        onFullscreenError_fn
      ).call(this, error, event2);
    }
  }
  async ['media-orientation-lock-request'](event2) {
    const key = event2.type;
    try {
      __privateGet(this, _request).queue.enqueue(key, event2);
      await __privateGet(this, _orientation).lock(event2.detail);
    } catch (error) {
      __privateGet(this, _request).queue.delete(key);
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'failed to lock screen orientation',
          error,
          event2
        );
      }
    }
  }
  async ['media-orientation-unlock-request'](event2) {
    const key = event2.type;
    try {
      __privateGet(this, _request).queue.enqueue(key, event2);
      await __privateGet(this, _orientation).unlock();
    } catch (error) {
      __privateGet(this, _request).queue.delete(key);
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'failed to unlock screen orientation',
          error,
          event2
        );
      }
    }
  }
  async ['media-enter-pip-request'](event2) {
    try {
      await this.enterPictureInPicture(event2);
    } catch (error) {
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        onPictureInPictureError_fn
      ).call(this, error, event2);
    }
  }
  async ['media-exit-pip-request'](event2) {
    try {
      await this.exitPictureInPicture(event2);
    } catch (error) {
      __privateMethod(
        this,
        _MediaRequestManager_instances,
        onPictureInPictureError_fn
      ).call(this, error, event2);
    }
  }
  ['media-live-edge-request'](event2) {
    const { live, liveEdge, canSeek } = this.$state;
    if (!live() || liveEdge() || !canSeek()) return;
    __privateGet(this, _request).queue.enqueue('media-seek-request', event2);
    try {
      this.seekToLiveEdge();
    } catch (error) {
      __privateGet(this, _request).queue.delete('media-seek-request');
      {
        __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
          this,
          'seek to live edge fail',
          error,
          event2
        );
      }
    }
  }
  async ['media-loop-request'](event2) {
    try {
      __privateGet(this, _request).looping = true;
      __privateGet(this, _request).replaying = true;
      await this.play(event2);
    } catch (error) {
      __privateGet(this, _request).looping = false;
    }
  }
  ['media-user-loop-change-request'](event2) {
    this.$state.userPrefersLoop.set(event2.detail);
  }
  async ['media-pause-request'](event2) {
    if (this.$state.paused()) return;
    try {
      await this.pause(event2);
    } catch (error) {}
  }
  async ['media-play-request'](event2) {
    if (!this.$state.paused()) return;
    try {
      await this.play(event2);
    } catch (e) {}
  }
  ['media-rate-change-request'](event2) {
    const { playbackRate, canSetPlaybackRate } = this.$state;
    if (playbackRate() === event2.detail || !canSetPlaybackRate()) return;
    const provider2 = __privateGet(this, _$provider).call(this);
    if (!(provider2 == null ? void 0 : provider2.setPlaybackRate)) return;
    __privateGet(this, _request).queue.enqueue(
      'media-rate-change-request',
      event2
    );
    provider2.setPlaybackRate(event2.detail);
  }
  ['media-audio-gain-change-request'](event2) {
    try {
      this.setAudioGain(event2.detail, event2);
    } catch (e) {}
  }
  ['media-quality-change-request'](event2) {
    var _a6, _b2;
    const { qualities, storage, logger } = __privateGet(this, _media9);
    if (qualities.readonly) {
      {
        logger == null
          ? void 0
          : logger
              .warnGroup(
                `[vidstack] attempted to change video quality but it is currently read-only`
              )
              .labelledLog('Request Event', event2)
              .dispatch();
      }
      return;
    }
    __privateGet(this, _request).queue.enqueue(
      'media-quality-change-request',
      event2
    );
    const index = event2.detail;
    if (index < 0) {
      qualities.autoSelect(event2);
      if (event2.isOriginTrusted)
        (_a6 = storage == null ? void 0 : storage.setVideoQuality) == null
          ? void 0
          : _a6.call(storage, null);
    } else {
      const quality = qualities[index];
      if (quality) {
        quality.selected = true;
        if (event2.isOriginTrusted) {
          (_b2 = storage == null ? void 0 : storage.setVideoQuality) == null
            ? void 0
            : _b2.call(storage, {
                id: quality.id,
                width: quality.width,
                height: quality.height,
                bitrate: quality.bitrate,
              });
        }
      } else {
        logger == null
          ? void 0
          : logger
              .warnGroup(
                '[vidstack] failed quality change request (invalid index)'
              )
              .labelledLog('Qualities', qualities.toArray())
              .labelledLog('Index', index)
              .labelledLog('Request Event', event2)
              .dispatch();
      }
    }
  }
  ['media-pause-controls-request'](event2) {
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    this.controls.pause(event2);
  }
  ['media-resume-controls-request'](event2) {
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    this.controls.resume(event2);
  }
  ['media-seek-request'](event2) {
    const { canSeek, ended, live, seekableEnd, userBehindLiveEdge } =
        this.$state,
      seekTime = event2.detail;
    if (ended()) __privateGet(this, _request).replaying = true;
    const key = event2.type;
    __privateGet(this, _request).seeking = false;
    __privateGet(this, _request).queue.delete(key);
    const boundedTime = boundTime(seekTime, this.$state);
    if (!Number.isFinite(boundedTime) || !canSeek()) return;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _$provider).call(this).setCurrentTime(boundedTime);
    if (
      live() &&
      event2.isOriginTrusted &&
      Math.abs(seekableEnd() - boundedTime) >= 2
    ) {
      userBehindLiveEdge.set(true);
    }
  }
  ['media-seeking-request'](event2) {
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    this.$state.seeking.set(true);
    __privateGet(this, _request).seeking = true;
  }
  ['media-start-loading'](event2) {
    if (this.$state.canLoad()) return;
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _stateMgr).handle(this.createEvent('can-load'));
  }
  ['media-poster-start-loading'](event2) {
    if (this.$state.canLoadPoster()) return;
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _stateMgr).handle(this.createEvent('can-load-poster'));
  }
  ['media-text-track-change-request'](event2) {
    var _a6;
    const { index, mode } = event2.detail,
      track = __privateGet(this, _media9).textTracks[index];
    if (track) {
      const key = event2.type;
      __privateGet(this, _request).queue.enqueue(key, event2);
      track.setMode(mode, event2);
    } else {
      (_a6 = __privateGet(this, _media9).logger) == null
        ? void 0
        : _a6
            .warnGroup(
              '[vidstack] failed text track change request (invalid index)'
            )
            .labelledLog(
              'Text Tracks',
              __privateGet(this, _media9).textTracks.toArray()
            )
            .labelledLog('Index', index)
            .labelledLog('Request Event', event2)
            .dispatch();
    }
  }
  ['media-mute-request'](event2) {
    if (this.$state.muted()) return;
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _$provider).call(this).setMuted(true);
  }
  ['media-unmute-request'](event2) {
    const { muted, volume } = this.$state;
    if (!muted()) return;
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _media9).$provider().setMuted(false);
    if (volume() === 0) {
      __privateGet(this, _request).queue.enqueue(key, event2);
      __privateGet(this, _$provider).call(this).setVolume(0.25);
    }
  }
  ['media-volume-change-request'](event2) {
    const { muted, volume } = this.$state;
    const newVolume = event2.detail;
    if (volume() === newVolume) return;
    const key = event2.type;
    __privateGet(this, _request).queue.enqueue(key, event2);
    __privateGet(this, _$provider).call(this).setVolume(newVolume);
    if (newVolume > 0 && muted()) {
      __privateGet(this, _request).queue.enqueue(key, event2);
      __privateGet(this, _$provider).call(this).setMuted(false);
    }
  }
};
_stateMgr = new WeakMap();
_request = new WeakMap();
_media9 = new WeakMap();
_fullscreen = new WeakMap();
_orientation = new WeakMap();
_$provider = new WeakMap();
_providerQueue = new WeakMap();
_MediaRequestManager_instances = new WeakSet();
attachLoadPlayListener_fn = function () {
  const { load } = this.$props,
    { canLoad } = this.$state;
  if (load() !== 'play' || canLoad()) return;
  const off = this.listen('media-play-request', (event2) => {
    __privateMethod(
      this,
      _MediaRequestManager_instances,
      handleLoadPlayStrategy_fn
    ).call(this, event2);
    off();
  });
};
watchProvider_fn = function () {
  const provider2 = __privateGet(this, _$provider).call(this),
    canPlay = this.$state.canPlay();
  if (provider2 && canPlay) {
    __privateGet(this, _providerQueue).start();
  }
  return () => {
    __privateGet(this, _providerQueue).stop();
  };
};
handleRequest_fn = function (event2) {
  var _a6;
  event2.stopPropagation();
  if (event2.defaultPrevented) return;
  {
    (_a6 = __privateGet(this, _media9).logger) == null
      ? void 0
      : _a6
          .infoGroup(`📬 received \`${event2.type}\``)
          .labelledLog('Request', event2)
          .dispatch();
  }
  if (!this[event2.type]) return;
  if (peek(__privateGet(this, _$provider))) {
    this[event2.type](event2);
  } else {
    __privateGet(this, _providerQueue).enqueue(event2.type, () => {
      if (peek(__privateGet(this, _$provider))) this[event2.type](event2);
    });
  }
};
handleLoadPlayStrategy_fn = function (trigger) {
  const { load } = this.$props,
    { canLoad } = this.$state;
  if (load() === 'play' && !canLoad()) {
    const event2 = this.createEvent('media-start-loading', { trigger });
    this.dispatchEvent(event2);
    __privateGet(this, _providerQueue).enqueue(
      'media-play-request',
      async () => {
        try {
          await this.play(event2);
        } catch (error) {}
      }
    );
    return true;
  }
  return false;
};
_wasPIPActive = new WeakMap();
getFullscreenAdapter_fn = function (target) {
  const provider2 = peek(__privateGet(this, _$provider));
  return (target === 'prefer-media' &&
    __privateGet(this, _fullscreen).supported) ||
    target === 'media'
    ? __privateGet(this, _fullscreen)
    : provider2 == null
    ? void 0
    : provider2.fullscreen;
};
throwIfPIPNotSupported_fn = function () {
  if (this.$state.canPictureInPicture()) return;
  throw Error(`[vidstack] picture-in-picture is not currently available`);
};
watchControlsDelayChange_fn = function () {
  this.controls.defaultDelay = this.$props.controlsDelay();
};
watchAudioGainSupport_fn = function () {
  var _a6, _b2;
  const { canSetAudioGain } = this.$state,
    supported = !!((_b2 =
      (_a6 = __privateGet(this, _$provider).call(this)) == null
        ? void 0
        : _a6.audioGain) == null
      ? void 0
      : _b2.supported);
  canSetAudioGain.set(supported);
};
watchAirPlaySupport_fn = function () {
  var _a6, _b2;
  const { canAirPlay } = this.$state,
    supported = !!((_b2 =
      (_a6 = __privateGet(this, _$provider).call(this)) == null
        ? void 0
        : _a6.airPlay) == null
      ? void 0
      : _b2.supported);
  canAirPlay.set(supported);
};
watchGoogleCastSupport_fn = function () {
  const { canGoogleCast, source } = this.$state,
    supported = IS_CHROME && !IS_IOS && canGoogleCastSrc(source());
  canGoogleCast.set(supported);
};
watchFullscreenSupport_fn = function () {
  var _a6, _b2;
  const { canFullscreen: canFullscreen2 } = this.$state,
    supported =
      __privateGet(this, _fullscreen).supported ||
      !!((_b2 =
        (_a6 = __privateGet(this, _$provider).call(this)) == null
          ? void 0
          : _a6.fullscreen) == null
        ? void 0
        : _b2.supported);
  canFullscreen2.set(supported);
};
watchPiPSupport_fn = function () {
  var _a6, _b2;
  const { canPictureInPicture } = this.$state,
    supported = !!((_b2 =
      (_a6 = __privateGet(this, _$provider).call(this)) == null
        ? void 0
        : _a6.pictureInPicture) == null
      ? void 0
      : _b2.supported);
  canPictureInPicture.set(supported);
};
_googleCastLoader = new WeakMap();
onFullscreenChange_fn = async function (event2) {
  const lockType = peek(this.$props.fullscreenOrientation),
    isFullscreen2 = event2.detail;
  if (
    isUndefined(lockType) ||
    lockType === 'none' ||
    !__privateGet(this, _orientation).supported
  )
    return;
  if (isFullscreen2) {
    if (__privateGet(this, _orientation).locked) return;
    this.dispatch('media-orientation-lock-request', {
      detail: lockType,
      trigger: event2,
    });
  } else if (__privateGet(this, _orientation).locked) {
    this.dispatch('media-orientation-unlock-request', {
      trigger: event2,
    });
  }
};
onFullscreenError_fn = function (error, request) {
  {
    __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
      this,
      'fullscreen request failed',
      error,
      request
    );
  }
  __privateGet(this, _stateMgr).handle(
    this.createEvent('fullscreen-error', {
      detail: coerceToError(error),
    })
  );
};
onPictureInPictureError_fn = function (error, request) {
  {
    __privateMethod(this, _MediaRequestManager_instances, logError_fn).call(
      this,
      'pip request failed',
      error,
      request
    );
  }
  __privateGet(this, _stateMgr).handle(
    this.createEvent('picture-in-picture-error', {
      detail: coerceToError(error),
    })
  );
};
logError_fn = function (title, error, request) {
  var _a6;
  (_a6 = __privateGet(this, _media9).logger) == null
    ? void 0
    : _a6
        .errorGroup(`[vidstack] ${title}`)
        .labelledLog('Error', error)
        .labelledLog('Media Context', { ...__privateGet(this, _media9) })
        .labelledLog('Trigger Event', request)
        .dispatch();
};
function throwIfNotReadyForPlayback(provider2, canPlay) {
  if (provider2 && canPlay) return;
  throw Error(`[vidstack] media is not ready - wait for \`can-play\` event.`);
}
function throwIfFullscreenNotSupported(target, fullscreen) {
  if (fullscreen == null ? void 0 : fullscreen.supported) return;
  throw Error(
    `[vidstack] fullscreen is not currently available on target \`${target}\``
  );
}
var MediaRequestContext = class {
  constructor() {
    __publicField(this, 'seeking', false);
    __publicField(this, 'looping', false);
    __publicField(this, 'replaying', false);
    __publicField(this, 'queue', new Queue());
  }
};
var TRACKED_EVENT = /* @__PURE__ */ new Set([
  'auto-play',
  'auto-play-fail',
  'can-load',
  'sources-change',
  'source-change',
  'load-start',
  'abort',
  'error',
  'loaded-metadata',
  'loaded-data',
  'can-play',
  'play',
  'play-fail',
  'pause',
  'playing',
  'seeking',
  'seeked',
  'waiting',
]);
var _request2,
  _media10,
  _trackedEvents,
  _clipEnded,
  _playedIntervals,
  _playedInterval,
  _firingWaiting,
  _waitingTrigger,
  _isPlayingOnDisconnect,
  _MediaStateManager_instances,
  resumePlaybackOnConnect_fn,
  pausePlaybackOnDisconnect_fn,
  resetTracking_fn,
  satisfyRequest_fn,
  addTextTrackListeners_fn,
  addQualityListeners_fn,
  addAudioTrackListeners_fn,
  onTextTracksChange_fn,
  onTextTrackModeChange_fn,
  onAudioTracksChange_fn,
  onAudioTrackChange_fn,
  onQualitiesChange_fn,
  onQualityChange_fn2,
  onAutoQualityChange_fn,
  _stopQualityResizeEffect,
  watchQualityResize_fn,
  stopWatchingQualityResize_fn,
  onCanSetQualityChange_fn,
  watchCanSetVolume_fn,
  onSourceQualitiesChange_fn,
  resetMediaState_fn,
  onCanPlayDetail_fn,
  resetPlaybackIfNeeded_fn,
  updatePlayed_fn,
  onEndPrecisionChange_fn,
  saveTime_fn,
  _fireWaiting,
  onEnded_fn2,
  stopWaiting_fn;
var MediaStateManager = class extends MediaPlayerController {
  constructor(request, media) {
    super();
    __privateAdd(this, _MediaStateManager_instances);
    __privateAdd(this, _request2);
    __privateAdd(this, _media10);
    __privateAdd(this, _trackedEvents, /* @__PURE__ */ new Map());
    __privateAdd(this, _clipEnded, false);
    __privateAdd(this, _playedIntervals, []);
    __privateAdd(this, _playedInterval, [-1, -1]);
    __privateAdd(this, _firingWaiting, false);
    __privateAdd(this, _waitingTrigger);
    __privateAdd(this, _isPlayingOnDisconnect, false);
    __privateAdd(this, _stopQualityResizeEffect, null);
    __publicField(
      this,
      'seeking',
      functionThrottle(
        (event2) => {
          const { seeking, realCurrentTime, paused } = this.$state;
          seeking.set(true);
          realCurrentTime.set(event2.detail);
          __privateMethod(
            this,
            _MediaStateManager_instances,
            satisfyRequest_fn
          ).call(this, 'media-seeking-request', event2);
          if (paused()) {
            __privateSet(this, _waitingTrigger, event2);
            __privateGet(this, _fireWaiting).call(this);
          }
          __privateSet(this, _playedInterval, [-1, -1]);
        },
        150,
        { leading: true }
      )
    );
    __privateAdd(
      this,
      _fireWaiting,
      functionDebounce(() => {
        if (!__privateGet(this, _waitingTrigger)) return;
        __privateSet(this, _firingWaiting, true);
        const { waiting, playing } = this.$state;
        waiting.set(true);
        playing.set(false);
        const event2 = this.createEvent('waiting', {
          trigger: __privateGet(this, _waitingTrigger),
        });
        __privateGet(this, _trackedEvents).set('waiting', event2);
        this.dispatch(event2);
        __privateSet(this, _waitingTrigger, void 0);
        __privateSet(this, _firingWaiting, false);
      }, 300)
    );
    __privateSet(this, _request2, request);
    __privateSet(this, _media10, media);
  }
  onAttach(el) {
    el.setAttribute('aria-busy', 'true');
    new EventsController(this)
      .add('fullscreen-change', this['fullscreen-change'].bind(this))
      .add('fullscreen-error', this['fullscreen-error'].bind(this))
      .add('orientation-change', this['orientation-change'].bind(this));
  }
  onConnect(el) {
    effect(
      __privateMethod(
        this,
        _MediaStateManager_instances,
        watchCanSetVolume_fn
      ).bind(this)
    );
    __privateMethod(
      this,
      _MediaStateManager_instances,
      addTextTrackListeners_fn
    ).call(this);
    __privateMethod(
      this,
      _MediaStateManager_instances,
      addQualityListeners_fn
    ).call(this);
    __privateMethod(
      this,
      _MediaStateManager_instances,
      addAudioTrackListeners_fn
    ).call(this);
    __privateMethod(
      this,
      _MediaStateManager_instances,
      resumePlaybackOnConnect_fn
    ).call(this);
    onDispose(
      __privateMethod(
        this,
        _MediaStateManager_instances,
        pausePlaybackOnDisconnect_fn
      ).bind(this)
    );
  }
  onDestroy() {
    const { audioTracks, qualities, textTracks } = __privateGet(this, _media10);
    audioTracks[ListSymbol.reset]();
    qualities[ListSymbol.reset]();
    textTracks[ListSymbol.reset]();
    __privateMethod(
      this,
      _MediaStateManager_instances,
      stopWatchingQualityResize_fn
    ).call(this);
  }
  handle(event2) {
    if (!this.scope) return;
    const type = event2.type;
    untrack(() => {
      var _a6;
      return (_a6 = this[event2.type]) == null
        ? void 0
        : _a6.call(this, event2);
    });
    if (!IS_SERVER) {
      if (TRACKED_EVENT.has(type))
        __privateGet(this, _trackedEvents).set(type, event2);
      this.dispatch(event2);
    }
  }
  ['provider-change'](event2) {
    var _a6, _b2;
    const prevProvider = __privateGet(this, _media10).$provider(),
      newProvider = event2.detail;
    if (
      (prevProvider == null ? void 0 : prevProvider.type) ===
      (newProvider == null ? void 0 : newProvider.type)
    )
      return;
    (_a6 = prevProvider == null ? void 0 : prevProvider.destroy) == null
      ? void 0
      : _a6.call(prevProvider);
    (_b2 = prevProvider == null ? void 0 : prevProvider.scope) == null
      ? void 0
      : _b2.dispose();
    __privateGet(this, _media10).$provider.set(event2.detail);
    if (prevProvider && event2.detail === null) {
      __privateMethod(
        this,
        _MediaStateManager_instances,
        resetMediaState_fn
      ).call(this, event2);
    }
  }
  ['provider-loader-change'](event2) {
    var _a6, _b2;
    {
      (_b2 = __privateGet(this, _media10).logger) == null
        ? void 0
        : _b2
            .infoGroup(
              `Loader change \`${
                (_a6 = event2.detail) == null ? void 0 : _a6.constructor.name
              }\``
            )
            .labelledLog('Event', event2)
            .dispatch();
    }
  }
  ['auto-play'](event2) {
    this.$state.autoPlayError.set(null);
  }
  ['auto-play-fail'](event2) {
    this.$state.autoPlayError.set(event2.detail);
    __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
      this
    );
  }
  ['can-load'](event2) {
    this.$state.canLoad.set(true);
    __privateGet(this, _trackedEvents).set('can-load', event2);
    __privateGet(this, _media10).textTracks[TextTrackSymbol.canLoad]();
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-start-loading',
      event2
    );
  }
  ['can-load-poster'](event2) {
    this.$state.canLoadPoster.set(true);
    __privateGet(this, _trackedEvents).set('can-load-poster', event2);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-poster-start-loading',
      event2
    );
  }
  ['media-type-change'](event2) {
    const sourceChangeEvent = __privateGet(this, _trackedEvents).get(
      'source-change'
    );
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const viewType = this.$state.viewType();
    this.$state.mediaType.set(event2.detail);
    const providedViewType = this.$state.providedViewType(),
      currentViewType =
        providedViewType === 'unknown' ? event2.detail : providedViewType;
    if (viewType !== currentViewType) {
      if (IS_SERVER) {
        this.$state.inferredViewType.set(currentViewType);
      } else {
        setTimeout(() => {
          requestAnimationFrame(() => {
            if (!this.scope) return;
            this.$state.inferredViewType.set(event2.detail);
            this.dispatch('view-type-change', {
              detail: currentViewType,
              trigger: event2,
            });
          });
        }, 0);
      }
    }
  }
  ['stream-type-change'](event2) {
    const sourceChangeEvent = __privateGet(this, _trackedEvents).get(
      'source-change'
    );
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const { streamType, inferredStreamType } = this.$state;
    inferredStreamType.set(event2.detail);
    event2.detail = streamType();
  }
  ['rate-change'](event2) {
    var _a6;
    const { storage } = __privateGet(this, _media10),
      { canPlay } = this.$state;
    this.$state.playbackRate.set(event2.detail);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-rate-change-request',
      event2
    );
    if (canPlay()) {
      (_a6 = storage == null ? void 0 : storage.setPlaybackRate) == null
        ? void 0
        : _a6.call(storage, event2.detail);
    }
  }
  ['remote-playback-change'](event2) {
    const { remotePlaybackState, remotePlaybackType } = this.$state,
      { type, state } = event2.detail,
      isConnected = state === 'connected';
    remotePlaybackType.set(type);
    remotePlaybackState.set(state);
    const key =
      type === 'airplay'
        ? 'media-airplay-request'
        : 'media-google-cast-request';
    if (isConnected) {
      __privateMethod(
        this,
        _MediaStateManager_instances,
        satisfyRequest_fn
      ).call(this, key, event2);
    } else {
      const requestEvent = __privateGet(this, _request2).queue.peek(key);
      if (requestEvent) {
        event2.request = requestEvent;
        event2.triggers.add(requestEvent);
      }
    }
  }
  ['sources-change'](event2) {
    const prevSources = this.$state.sources(),
      newSources = event2.detail;
    this.$state.sources.set(newSources);
    __privateMethod(
      this,
      _MediaStateManager_instances,
      onSourceQualitiesChange_fn
    ).call(this, prevSources, newSources, event2);
  }
  ['source-change'](event2) {
    var _a6, _b2, _c2;
    event2.isQualityChange =
      ((_a6 = event2.originEvent) == null ? void 0 : _a6.type) ===
      'quality-change';
    const source = event2.detail;
    __privateMethod(
      this,
      _MediaStateManager_instances,
      resetMediaState_fn
    ).call(this, event2, event2.isQualityChange);
    __privateGet(this, _trackedEvents).set(event2.type, event2);
    this.$state.source.set(source);
    (_b2 = this.el) == null ? void 0 : _b2.setAttribute('aria-busy', 'true');
    {
      (_c2 = __privateGet(this, _media10).logger) == null
        ? void 0
        : _c2
            .infoGroup('📼 Media source change')
            .labelledLog('Source', source)
            .dispatch();
    }
  }
  ['abort'](event2) {
    const sourceChangeEvent = __privateGet(this, _trackedEvents).get(
      'source-change'
    );
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
    const canLoadEvent = __privateGet(this, _trackedEvents).get('can-load');
    if (canLoadEvent && !event2.triggers.hasType('can-load')) {
      event2.triggers.add(canLoadEvent);
    }
  }
  ['load-start'](event2) {
    const sourceChangeEvent = __privateGet(this, _trackedEvents).get(
      'source-change'
    );
    if (sourceChangeEvent) event2.triggers.add(sourceChangeEvent);
  }
  ['error'](event2) {
    var _a6;
    this.$state.error.set(event2.detail);
    const abortEvent = __privateGet(this, _trackedEvents).get('abort');
    if (abortEvent) event2.triggers.add(abortEvent);
    {
      (_a6 = __privateGet(this, _media10).logger) == null
        ? void 0
        : _a6
            .errorGroup('Media Error')
            .labelledLog('Error', event2.detail)
            .labelledLog('Event', event2)
            .labelledLog('Context', __privateGet(this, _media10))
            .dispatch();
    }
  }
  ['loaded-metadata'](event2) {
    const loadStartEvent = __privateGet(this, _trackedEvents).get('load-start');
    if (loadStartEvent) event2.triggers.add(loadStartEvent);
  }
  ['loaded-data'](event2) {
    const loadStartEvent = __privateGet(this, _trackedEvents).get('load-start');
    if (loadStartEvent) event2.triggers.add(loadStartEvent);
  }
  ['can-play'](event2) {
    var _a6;
    const loadedMetadata = __privateGet(this, _trackedEvents).get(
      'loaded-metadata'
    );
    if (loadedMetadata) event2.triggers.add(loadedMetadata);
    __privateMethod(
      this,
      _MediaStateManager_instances,
      onCanPlayDetail_fn
    ).call(this, event2.detail);
    (_a6 = this.el) == null ? void 0 : _a6.setAttribute('aria-busy', 'false');
  }
  ['can-play-through'](event2) {
    __privateMethod(
      this,
      _MediaStateManager_instances,
      onCanPlayDetail_fn
    ).call(this, event2.detail);
    const canPlay = __privateGet(this, _trackedEvents).get('can-play');
    if (canPlay) event2.triggers.add(canPlay);
  }
  ['duration-change'](event2) {
    const { live, intrinsicDuration, providedDuration, clipEndTime, ended } =
        this.$state,
      time = event2.detail;
    if (!live()) {
      const duration = !Number.isNaN(time) ? time : 0;
      intrinsicDuration.set(duration);
      if (ended())
        __privateMethod(
          this,
          _MediaStateManager_instances,
          onEndPrecisionChange_fn
        ).call(this, event2);
    }
    if (providedDuration() > 0 || clipEndTime() > 0) {
      event2.stopImmediatePropagation();
    }
  }
  ['progress'](event2) {
    const { buffered, seekable } = this.$state,
      { buffered: newBuffered, seekable: newSeekable } = event2.detail,
      newBufferedEnd = getTimeRangesEnd(newBuffered),
      hasBufferedLengthChanged = newBuffered.length !== buffered().length,
      hasBufferedEndChanged = newBufferedEnd !== getTimeRangesEnd(buffered()),
      newSeekableEnd = getTimeRangesEnd(newSeekable),
      hasSeekableLengthChanged = newSeekable.length !== seekable().length,
      hasSeekableEndChanged = newSeekableEnd !== getTimeRangesEnd(seekable());
    if (hasBufferedLengthChanged || hasBufferedEndChanged) {
      buffered.set(newBuffered);
    }
    if (hasSeekableLengthChanged || hasSeekableEndChanged) {
      seekable.set(newSeekable);
    }
  }
  ['play'](event2) {
    const {
      paused,
      autoPlayError,
      ended,
      autoPlaying,
      playsInline,
      pointer,
      muted,
      viewType,
      live,
      userBehindLiveEdge,
    } = this.$state;
    __privateMethod(
      this,
      _MediaStateManager_instances,
      resetPlaybackIfNeeded_fn
    ).call(this);
    if (!paused()) {
      event2.stopImmediatePropagation();
      return;
    }
    event2.autoPlay = autoPlaying();
    const waitingEvent = __privateGet(this, _trackedEvents).get('waiting');
    if (waitingEvent) event2.triggers.add(waitingEvent);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-play-request',
      event2
    );
    __privateGet(this, _trackedEvents).set('play', event2);
    paused.set(false);
    autoPlayError.set(null);
    if (event2.autoPlay) {
      this.handle(
        this.createEvent('auto-play', {
          detail: { muted: muted() },
          trigger: event2,
        })
      );
      autoPlaying.set(false);
    }
    if (ended() || __privateGet(this, _request2).replaying) {
      __privateGet(this, _request2).replaying = false;
      ended.set(false);
      this.handle(this.createEvent('replay', { trigger: event2 }));
    }
    if (!playsInline() && viewType() === 'video' && pointer() === 'coarse') {
      __privateGet(this, _media10).remote.enterFullscreen(
        'prefer-media',
        event2
      );
    }
    if (live() && !userBehindLiveEdge()) {
      __privateGet(this, _media10).remote.seekToLiveEdge(event2);
    }
  }
  ['play-fail'](event2) {
    const { muted, autoPlaying } = this.$state;
    const playEvent = __privateGet(this, _trackedEvents).get('play');
    if (playEvent) event2.triggers.add(playEvent);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-play-request',
      event2
    );
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
      this
    );
    __privateGet(this, _trackedEvents).set('play-fail', event2);
    if (event2.autoPlay) {
      this.handle(
        this.createEvent('auto-play-fail', {
          detail: {
            muted: muted(),
            error: event2.detail,
          },
          trigger: event2,
        })
      );
      autoPlaying.set(false);
    }
  }
  ['playing'](event2) {
    const playEvent = __privateGet(this, _trackedEvents).get('play'),
      seekedEvent = __privateGet(this, _trackedEvents).get('seeked');
    if (playEvent) event2.triggers.add(playEvent);
    else if (seekedEvent) event2.triggers.add(seekedEvent);
    setTimeout(
      () =>
        __privateMethod(
          this,
          _MediaStateManager_instances,
          resetTracking_fn
        ).call(this),
      0
    );
    const {
      paused,
      playing,
      live,
      liveSyncPosition,
      seekableEnd,
      started,
      currentTime,
      seeking,
      ended,
    } = this.$state;
    paused.set(false);
    playing.set(true);
    seeking.set(false);
    ended.set(false);
    if (__privateGet(this, _request2).looping) {
      __privateGet(this, _request2).looping = false;
      return;
    }
    if (live() && !started() && currentTime() === 0) {
      const end = liveSyncPosition() ?? seekableEnd() - 2;
      if (Number.isFinite(end))
        __privateGet(this, _media10).$provider().setCurrentTime(end);
    }
    this['started'](event2);
  }
  ['started'](event2) {
    const { started } = this.$state;
    if (!started()) {
      started.set(true);
      this.handle(this.createEvent('started', { trigger: event2 }));
    }
  }
  ['pause'](event2) {
    var _a6;
    if (!((_a6 = this.el) == null ? void 0 : _a6.isConnected)) {
      __privateSet(this, _isPlayingOnDisconnect, true);
    }
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-pause-request',
      event2
    );
    const seekedEvent = __privateGet(this, _trackedEvents).get('seeked');
    if (seekedEvent) event2.triggers.add(seekedEvent);
    const { paused, playing } = this.$state;
    paused.set(true);
    playing.set(false);
    if (__privateGet(this, _clipEnded)) {
      setTimeout(() => {
        this.handle(this.createEvent('end', { trigger: event2 }));
        __privateSet(this, _clipEnded, false);
      }, 0);
    }
    __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
      this
    );
  }
  ['time-change'](event2) {
    if (__privateGet(this, _request2).looping) {
      event2.stopImmediatePropagation();
      return;
    }
    let { waiting, played, clipEndTime, realCurrentTime, currentTime } =
        this.$state,
      newTime = event2.detail,
      endTime = clipEndTime();
    realCurrentTime.set(newTime);
    __privateMethod(this, _MediaStateManager_instances, updatePlayed_fn).call(
      this
    );
    waiting.set(false);
    for (const track of __privateGet(this, _media10).textTracks) {
      track[TextTrackSymbol.updateActiveCues](newTime, event2);
    }
    if (endTime > 0 && newTime >= endTime) {
      __privateSet(this, _clipEnded, true);
      this.dispatch('media-pause-request', { trigger: event2 });
    }
    __privateMethod(this, _MediaStateManager_instances, saveTime_fn).call(this);
    this.dispatch('time-update', {
      detail: { currentTime: currentTime(), played: played() },
      trigger: event2,
    });
  }
  ['audio-gain-change'](event2) {
    var _a6;
    const { storage } = __privateGet(this, _media10),
      { canPlay, audioGain } = this.$state;
    audioGain.set(event2.detail);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-audio-gain-change-request',
      event2
    );
    if (canPlay())
      (_a6 = storage == null ? void 0 : storage.setAudioGain) == null
        ? void 0
        : _a6.call(storage, audioGain());
  }
  ['volume-change'](event2) {
    var _a6, _b2;
    const { storage } = __privateGet(this, _media10),
      { volume, muted, canPlay } = this.$state,
      detail = event2.detail;
    volume.set(detail.volume);
    muted.set(detail.muted || detail.volume === 0);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-volume-change-request',
      event2
    );
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      detail.muted ? 'media-mute-request' : 'media-unmute-request',
      event2
    );
    if (canPlay()) {
      (_a6 = storage == null ? void 0 : storage.setVolume) == null
        ? void 0
        : _a6.call(storage, volume());
      (_b2 = storage == null ? void 0 : storage.setMuted) == null
        ? void 0
        : _b2.call(storage, muted());
    }
  }
  ['seeked'](event2) {
    const {
      seeking,
      currentTime,
      realCurrentTime,
      paused,
      seekableEnd,
      ended,
      live,
    } = this.$state;
    if (__privateGet(this, _request2).seeking) {
      seeking.set(true);
      event2.stopImmediatePropagation();
    } else if (seeking()) {
      const waitingEvent = __privateGet(this, _trackedEvents).get('waiting');
      if (waitingEvent) event2.triggers.add(waitingEvent);
      const seekingEvent = __privateGet(this, _trackedEvents).get('seeking');
      if (seekingEvent && !event2.triggers.has(seekingEvent)) {
        event2.triggers.add(seekingEvent);
      }
      if (paused())
        __privateMethod(
          this,
          _MediaStateManager_instances,
          stopWaiting_fn
        ).call(this);
      seeking.set(false);
      realCurrentTime.set(event2.detail);
      __privateMethod(
        this,
        _MediaStateManager_instances,
        satisfyRequest_fn
      ).call(this, 'media-seek-request', event2);
      const origin = event2 == null ? void 0 : event2.originEvent;
      if (
        (origin == null ? void 0 : origin.isTrusted) &&
        !(origin instanceof MessageEvent) &&
        !/seek/.test(origin.type)
      ) {
        this['started'](event2);
      }
    }
    if (!live()) {
      if (Math.floor(currentTime()) !== Math.floor(seekableEnd())) {
        ended.set(false);
      } else {
        this.end(event2);
      }
    }
  }
  ['waiting'](event2) {
    if (
      __privateGet(this, _firingWaiting) ||
      __privateGet(this, _request2).seeking
    )
      return;
    event2.stopImmediatePropagation();
    __privateSet(this, _waitingTrigger, event2);
    __privateGet(this, _fireWaiting).call(this);
  }
  ['end'](event2) {
    const { loop, ended } = this.$state;
    if (!loop() && ended()) return;
    if (loop()) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          __privateMethod(
            this,
            _MediaStateManager_instances,
            resetPlaybackIfNeeded_fn
          ).call(this, event2);
          this.dispatch('media-loop-request', { trigger: event2 });
        });
      }, 10);
      return;
    }
    setTimeout(
      () =>
        __privateMethod(this, _MediaStateManager_instances, onEnded_fn2).call(
          this,
          event2
        ),
      0
    );
  }
  ['fullscreen-change'](event2) {
    const isFullscreen2 = event2.detail;
    this.$state.fullscreen.set(isFullscreen2);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      isFullscreen2
        ? 'media-enter-fullscreen-request'
        : 'media-exit-fullscreen-request',
      event2
    );
  }
  ['fullscreen-error'](event2) {
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-enter-fullscreen-request',
      event2
    );
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-exit-fullscreen-request',
      event2
    );
  }
  ['orientation-change'](event2) {
    const isLocked = event2.detail.lock;
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      isLocked
        ? 'media-orientation-lock-request'
        : 'media-orientation-unlock-request',
      event2
    );
  }
  ['picture-in-picture-change'](event2) {
    const isPiP = event2.detail;
    this.$state.pictureInPicture.set(isPiP);
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      isPiP ? 'media-enter-pip-request' : 'media-exit-pip-request',
      event2
    );
  }
  ['picture-in-picture-error'](event2) {
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-enter-pip-request',
      event2
    );
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-exit-pip-request',
      event2
    );
  }
  ['title-change'](event2) {
    if (!event2.trigger) return;
    event2.stopImmediatePropagation();
    this.$state.inferredTitle.set(event2.detail);
  }
  ['poster-change'](event2) {
    if (!event2.trigger) return;
    event2.stopImmediatePropagation();
    this.$state.inferredPoster.set(event2.detail);
  }
};
_request2 = new WeakMap();
_media10 = new WeakMap();
_trackedEvents = new WeakMap();
_clipEnded = new WeakMap();
_playedIntervals = new WeakMap();
_playedInterval = new WeakMap();
_firingWaiting = new WeakMap();
_waitingTrigger = new WeakMap();
_isPlayingOnDisconnect = new WeakMap();
_MediaStateManager_instances = new WeakSet();
resumePlaybackOnConnect_fn = function () {
  if (!__privateGet(this, _isPlayingOnDisconnect)) return;
  requestAnimationFrame(() => {
    if (!this.scope) return;
    __privateGet(this, _media10).remote.play(new DOMEvent('dom-connect'));
  });
  __privateSet(this, _isPlayingOnDisconnect, false);
};
pausePlaybackOnDisconnect_fn = function () {
  var _a6;
  if (__privateGet(this, _isPlayingOnDisconnect)) return;
  __privateSet(this, _isPlayingOnDisconnect, !this.$state.paused());
  (_a6 = __privateGet(this, _media10).$provider()) == null
    ? void 0
    : _a6.pause();
};
resetTracking_fn = function () {
  __privateMethod(this, _MediaStateManager_instances, stopWaiting_fn).call(
    this
  );
  __privateSet(this, _clipEnded, false);
  __privateGet(this, _request2).replaying = false;
  __privateGet(this, _request2).looping = false;
  __privateSet(this, _firingWaiting, false);
  __privateSet(this, _waitingTrigger, void 0);
  __privateGet(this, _trackedEvents).clear();
};
satisfyRequest_fn = function (request, event2) {
  const requestEvent = __privateGet(this, _request2).queue.serve(request);
  if (!requestEvent) return;
  event2.request = requestEvent;
  event2.triggers.add(requestEvent);
};
addTextTrackListeners_fn = function () {
  __privateMethod(
    this,
    _MediaStateManager_instances,
    onTextTracksChange_fn
  ).call(this);
  __privateMethod(
    this,
    _MediaStateManager_instances,
    onTextTrackModeChange_fn
  ).call(this);
  const textTracks = __privateGet(this, _media10).textTracks;
  new EventsController(textTracks)
    .add(
      'add',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onTextTracksChange_fn
      ).bind(this)
    )
    .add(
      'remove',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onTextTracksChange_fn
      ).bind(this)
    )
    .add(
      'mode-change',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onTextTrackModeChange_fn
      ).bind(this)
    );
};
addQualityListeners_fn = function () {
  const qualities = __privateGet(this, _media10).qualities;
  new EventsController(qualities)
    .add(
      'add',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onQualitiesChange_fn
      ).bind(this)
    )
    .add(
      'remove',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onQualitiesChange_fn
      ).bind(this)
    )
    .add(
      'change',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onQualityChange_fn2
      ).bind(this)
    )
    .add(
      'auto-change',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onAutoQualityChange_fn
      ).bind(this)
    )
    .add(
      'readonly-change',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onCanSetQualityChange_fn
      ).bind(this)
    );
};
addAudioTrackListeners_fn = function () {
  const audioTracks = __privateGet(this, _media10).audioTracks;
  new EventsController(audioTracks)
    .add(
      'add',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onAudioTracksChange_fn
      ).bind(this)
    )
    .add(
      'remove',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onAudioTracksChange_fn
      ).bind(this)
    )
    .add(
      'change',
      __privateMethod(
        this,
        _MediaStateManager_instances,
        onAudioTrackChange_fn
      ).bind(this)
    );
};
onTextTracksChange_fn = function (event2) {
  const { textTracks } = this.$state;
  textTracks.set(__privateGet(this, _media10).textTracks.toArray());
  this.dispatch('text-tracks-change', {
    detail: textTracks(),
    trigger: event2,
  });
};
onTextTrackModeChange_fn = function (event2) {
  if (event2)
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-text-track-change-request',
      event2
    );
  const current = __privateGet(this, _media10).textTracks.selected,
    { textTrack } = this.$state;
  if (textTrack() !== current) {
    textTrack.set(current);
    this.dispatch('text-track-change', {
      detail: current,
      trigger: event2,
    });
  }
};
onAudioTracksChange_fn = function (event2) {
  const { audioTracks } = this.$state;
  audioTracks.set(__privateGet(this, _media10).audioTracks.toArray());
  this.dispatch('audio-tracks-change', {
    detail: audioTracks(),
    trigger: event2,
  });
};
onAudioTrackChange_fn = function (event2) {
  const { audioTrack } = this.$state;
  audioTrack.set(__privateGet(this, _media10).audioTracks.selected);
  if (event2)
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-audio-track-change-request',
      event2
    );
  this.dispatch('audio-track-change', {
    detail: audioTrack(),
    trigger: event2,
  });
};
onQualitiesChange_fn = function (event2) {
  const { qualities } = this.$state;
  qualities.set(__privateGet(this, _media10).qualities.toArray());
  this.dispatch('qualities-change', {
    detail: qualities(),
    trigger: event2,
  });
};
onQualityChange_fn2 = function (event2) {
  const { quality } = this.$state;
  quality.set(__privateGet(this, _media10).qualities.selected);
  if (event2)
    __privateMethod(this, _MediaStateManager_instances, satisfyRequest_fn).call(
      this,
      'media-quality-change-request',
      event2
    );
  this.dispatch('quality-change', {
    detail: quality(),
    trigger: event2,
  });
};
onAutoQualityChange_fn = function () {
  const { qualities } = __privateGet(this, _media10),
    isAuto = qualities.auto;
  this.$state.autoQuality.set(isAuto);
  if (!isAuto)
    __privateMethod(
      this,
      _MediaStateManager_instances,
      stopWatchingQualityResize_fn
    ).call(this);
};
_stopQualityResizeEffect = new WeakMap();
watchQualityResize_fn = function () {
  __privateMethod(
    this,
    _MediaStateManager_instances,
    stopWatchingQualityResize_fn
  ).call(this);
  __privateSet(
    this,
    _stopQualityResizeEffect,
    effect(() => {
      const { qualities } = __privateGet(this, _media10),
        { mediaWidth, mediaHeight } = this.$state,
        w = mediaWidth(),
        h2 = mediaHeight();
      if (w === 0 || h2 === 0) return;
      let selectedQuality = null,
        minScore = Infinity;
      for (const quality of qualities) {
        const score =
          Math.abs(quality.width - w) + Math.abs(quality.height - h2);
        if (score < minScore) {
          minScore = score;
          selectedQuality = quality;
        }
      }
      if (selectedQuality) {
        qualities[ListSymbol.select](
          selectedQuality,
          true,
          new DOMEvent('resize', { detail: { width: w, height: h2 } })
        );
      }
    })
  );
};
stopWatchingQualityResize_fn = function () {
  var _a6;
  (_a6 = __privateGet(this, _stopQualityResizeEffect)) == null
    ? void 0
    : _a6.call(this);
  __privateSet(this, _stopQualityResizeEffect, null);
};
onCanSetQualityChange_fn = function () {
  this.$state.canSetQuality.set(
    !__privateGet(this, _media10).qualities.readonly
  );
};
watchCanSetVolume_fn = function () {
  const { canSetVolume, isGoogleCastConnected } = this.$state;
  if (isGoogleCastConnected()) {
    canSetVolume.set(false);
    return;
  }
  canChangeVolume().then(canSetVolume.set);
};
onSourceQualitiesChange_fn = function (prevSources, newSources, trigger) {
  let { qualities } = __privateGet(this, _media10),
    added = false,
    removed = false;
  for (const prevSrc of prevSources) {
    if (!isVideoQualitySrc(prevSrc)) continue;
    const exists = newSources.some((s2) => s2.src === prevSrc.src);
    if (!exists) {
      const quality = qualities.getBySrc(prevSrc.src);
      if (quality) {
        qualities[ListSymbol.remove](quality, trigger);
        removed = true;
      }
    }
  }
  if (removed && !qualities.length) {
    this.$state.savedState.set(null);
    qualities[ListSymbol.reset](trigger);
  }
  for (const src of newSources) {
    if (!isVideoQualitySrc(src) || qualities.getBySrc(src.src)) continue;
    const quality = {
      id: src.id ?? src.height + 'p',
      bitrate: null,
      codec: null,
      ...src,
      selected: false,
    };
    qualities[ListSymbol.add](quality, trigger);
    added = true;
  }
  if (added && !qualities[QualitySymbol.enableAuto]) {
    __privateMethod(
      this,
      _MediaStateManager_instances,
      watchQualityResize_fn
    ).call(this);
    qualities[QualitySymbol.enableAuto] = __privateMethod(
      this,
      _MediaStateManager_instances,
      watchQualityResize_fn
    ).bind(this);
    qualities[QualitySymbol.setAuto](true, trigger);
  }
};
resetMediaState_fn = function (event2, isSourceQualityChange = false) {
  const { audioTracks, qualities } = __privateGet(this, _media10);
  if (!isSourceQualityChange) {
    __privateSet(this, _playedIntervals, []);
    __privateSet(this, _playedInterval, [-1, -1]);
    audioTracks[ListSymbol.reset](event2);
    qualities[ListSymbol.reset](event2);
    softResetMediaState(this.$state, isSourceQualityChange);
    __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
      this
    );
    return;
  }
  softResetMediaState(this.$state, isSourceQualityChange);
  __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
    this
  );
};
onCanPlayDetail_fn = function (detail) {
  const { seekable, buffered, intrinsicDuration, canPlay } = this.$state;
  canPlay.set(true);
  buffered.set(detail.buffered);
  seekable.set(detail.seekable);
  const seekableEnd = getTimeRangesEnd(detail.seekable) ?? Infinity;
  intrinsicDuration.set(seekableEnd);
};
resetPlaybackIfNeeded_fn = function (trigger) {
  const provider2 = peek(__privateGet(this, _media10).$provider);
  if (!provider2) return;
  const {
    ended,
    seekableStart,
    clipEndTime,
    currentTime,
    realCurrentTime,
    duration,
  } = this.$state;
  const shouldReset =
    ended() ||
    realCurrentTime() < seekableStart() ||
    (clipEndTime() > 0 && realCurrentTime() >= clipEndTime()) ||
    Math.abs(currentTime() - duration()) < 0.1;
  if (shouldReset) {
    this.dispatch('media-seek-request', {
      detail: seekableStart(),
      trigger,
    });
  }
  return shouldReset;
};
updatePlayed_fn = function () {
  const { currentTime, played, paused } = this.$state;
  if (paused()) return;
  __privateSet(
    this,
    _playedInterval,
    updateTimeIntervals(
      __privateGet(this, _playedIntervals),
      __privateGet(this, _playedInterval),
      currentTime()
    )
  );
  played.set(new TimeRange(__privateGet(this, _playedIntervals)));
};
// Called to update time again incase duration precision has changed.
onEndPrecisionChange_fn = function (trigger) {
  const { clipStartTime, clipEndTime, duration } = this.$state,
    isClipped = clipStartTime() > 0 || clipEndTime() > 0;
  if (isClipped) return;
  this.handle(
    this.createEvent('time-change', {
      detail: duration(),
      trigger,
    })
  );
};
saveTime_fn = function () {
  var _a6;
  const { storage } = __privateGet(this, _media10),
    { canPlay, realCurrentTime } = this.$state;
  if (canPlay()) {
    (_a6 = storage == null ? void 0 : storage.setTime) == null
      ? void 0
      : _a6.call(storage, realCurrentTime());
  }
};
_fireWaiting = new WeakMap();
onEnded_fn2 = function (event2) {
  var _a6;
  const { storage } = __privateGet(this, _media10),
    { paused, seeking, ended, duration } = this.$state;
  __privateMethod(
    this,
    _MediaStateManager_instances,
    onEndPrecisionChange_fn
  ).call(this, event2);
  if (!paused()) {
    this.dispatch('pause', { trigger: event2 });
  }
  if (seeking()) {
    this.dispatch('seeked', {
      detail: duration(),
      trigger: event2,
    });
  }
  ended.set(true);
  __privateMethod(this, _MediaStateManager_instances, resetTracking_fn).call(
    this
  );
  (_a6 = storage == null ? void 0 : storage.setTime) == null
    ? void 0
    : _a6.call(storage, duration(), true);
  this.dispatch('ended', {
    trigger: event2,
  });
};
stopWaiting_fn = function () {
  __privateGet(this, _fireWaiting).cancel();
  this.$state.waiting.set(false);
};
var _MediaStateSync_instances,
  init_fn2,
  watchProvidedTypes_fn,
  watchLogLevel_fn,
  watchMetadata_fn,
  watchTitle_fn,
  watchAutoplay_fn,
  watchLoop_fn,
  watchControls_fn2,
  watchPoster_fn,
  watchCrossOrigin_fn,
  watchDuration_fn,
  watchPlaysInline_fn,
  watchClipStartTime_fn,
  watchClipEndTime_fn,
  watchLive_fn,
  watchLiveTolerance_fn,
  watchLiveEdge_fn;
var MediaStateSync = class extends MediaPlayerController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MediaStateSync_instances);
  }
  onSetup() {
    __privateMethod(this, _MediaStateSync_instances, init_fn2).call(this);
    if (IS_SERVER) return;
    effect(
      __privateMethod(this, _MediaStateSync_instances, watchLogLevel_fn).bind(
        this
      )
    );
    const effects = [
      __privateMethod(this, _MediaStateSync_instances, watchMetadata_fn),
      __privateMethod(this, _MediaStateSync_instances, watchAutoplay_fn),
      __privateMethod(this, _MediaStateSync_instances, watchClipStartTime_fn),
      __privateMethod(this, _MediaStateSync_instances, watchClipEndTime_fn),
      __privateMethod(this, _MediaStateSync_instances, watchControls_fn2),
      __privateMethod(this, _MediaStateSync_instances, watchCrossOrigin_fn),
      __privateMethod(this, _MediaStateSync_instances, watchDuration_fn),
      __privateMethod(this, _MediaStateSync_instances, watchLive_fn),
      __privateMethod(this, _MediaStateSync_instances, watchLiveEdge_fn),
      __privateMethod(this, _MediaStateSync_instances, watchLiveTolerance_fn),
      __privateMethod(this, _MediaStateSync_instances, watchLoop_fn),
      __privateMethod(this, _MediaStateSync_instances, watchPlaysInline_fn),
      __privateMethod(this, _MediaStateSync_instances, watchPoster_fn),
      __privateMethod(this, _MediaStateSync_instances, watchProvidedTypes_fn),
      __privateMethod(this, _MediaStateSync_instances, watchTitle_fn),
    ];
    for (const callback of effects) {
      effect(callback.bind(this));
    }
  }
};
_MediaStateSync_instances = new WeakSet();
init_fn2 = function () {
  var _a6;
  const providedProps = {
    duration: 'providedDuration',
    loop: 'providedLoop',
    poster: 'providedPoster',
    streamType: 'providedStreamType',
    title: 'providedTitle',
    viewType: 'providedViewType',
  };
  const skip = /* @__PURE__ */ new Set([
    'currentTime',
    'paused',
    'playbackRate',
    'volume',
  ]);
  for (const prop2 of Object.keys(this.$props)) {
    if (skip.has(prop2)) continue;
    (_a6 = this.$state[providedProps[prop2] ?? prop2]) == null
      ? void 0
      : _a6.set(this.$props[prop2]());
  }
  this.$state.muted.set(this.$props.muted() || this.$props.volume() === 0);
};
// Sync "provided" props with internal state. Provided props are used to differentiate from
// provider inferred values.
watchProvidedTypes_fn = function () {
  const { viewType, streamType, title, poster, loop } = this.$props,
    $state = this.$state;
  $state.providedPoster.set(poster());
  $state.providedStreamType.set(streamType());
  $state.providedViewType.set(viewType());
  $state.providedTitle.set(title());
  $state.providedLoop.set(loop());
};
watchLogLevel_fn = function () {
  this.$state.logLevel.set(this.$props.logLevel());
};
watchMetadata_fn = function () {
  const { artist, artwork } = this.$props;
  this.$state.artist.set(artist());
  this.$state.artwork.set(artwork());
};
watchTitle_fn = function () {
  const { title } = this.$state;
  this.dispatch('title-change', { detail: title() });
};
watchAutoplay_fn = function () {
  const autoPlay = this.$props.autoPlay() || this.$props.autoplay();
  this.$state.autoPlay.set(autoPlay);
  this.dispatch('auto-play-change', { detail: autoPlay });
};
watchLoop_fn = function () {
  const loop = this.$state.loop();
  this.dispatch('loop-change', { detail: loop });
};
watchControls_fn2 = function () {
  const controls = this.$props.controls();
  this.$state.controls.set(controls);
};
watchPoster_fn = function () {
  const { poster } = this.$state;
  this.dispatch('poster-change', { detail: poster() });
};
watchCrossOrigin_fn = function () {
  const crossOrigin = this.$props.crossOrigin() ?? this.$props.crossorigin(),
    value = crossOrigin === true ? '' : crossOrigin;
  this.$state.crossOrigin.set(value);
};
watchDuration_fn = function () {
  const { duration } = this.$props;
  this.dispatch('media-duration-change-request', {
    detail: duration(),
  });
};
watchPlaysInline_fn = function () {
  const inline = this.$props.playsInline() || this.$props.playsinline();
  this.$state.playsInline.set(inline);
  this.dispatch('plays-inline-change', { detail: inline });
};
watchClipStartTime_fn = function () {
  const { clipStartTime } = this.$props;
  this.dispatch('media-clip-start-change-request', {
    detail: clipStartTime(),
  });
};
watchClipEndTime_fn = function () {
  const { clipEndTime } = this.$props;
  this.dispatch('media-clip-end-change-request', {
    detail: clipEndTime(),
  });
};
watchLive_fn = function () {
  this.dispatch('live-change', { detail: this.$state.live() });
};
watchLiveTolerance_fn = function () {
  this.$state.liveEdgeTolerance.set(this.$props.liveEdgeTolerance());
  this.$state.minLiveDVRWindow.set(this.$props.minLiveDVRWindow());
};
watchLiveEdge_fn = function () {
  this.dispatch('live-edge-change', { detail: this.$state.liveEdge() });
};
var actions = ['play', 'pause', 'seekforward', 'seekbackward', 'seekto'];
var _NavigatorMediaSession_instances,
  onDisconnect_fn3,
  onMetadataChange_fn,
  onPlaybackStateChange_fn,
  handleAction_fn;
var NavigatorMediaSession = class extends MediaPlayerController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _NavigatorMediaSession_instances);
  }
  onConnect() {
    effect(
      __privateMethod(
        this,
        _NavigatorMediaSession_instances,
        onMetadataChange_fn
      ).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _NavigatorMediaSession_instances,
        onPlaybackStateChange_fn
      ).bind(this)
    );
    const handleAction = __privateMethod(
      this,
      _NavigatorMediaSession_instances,
      handleAction_fn
    ).bind(this);
    for (const action of actions) {
      navigator.mediaSession.setActionHandler(action, handleAction);
    }
    onDispose(
      __privateMethod(
        this,
        _NavigatorMediaSession_instances,
        onDisconnect_fn3
      ).bind(this)
    );
  }
};
_NavigatorMediaSession_instances = new WeakSet();
onDisconnect_fn3 = function () {
  for (const action of actions) {
    navigator.mediaSession.setActionHandler(action, null);
  }
};
onMetadataChange_fn = function () {
  const { title, artist, artwork, poster } = this.$state;
  navigator.mediaSession.metadata = new MediaMetadata({
    title: title(),
    artist: artist(),
    artwork: artwork() ?? [{ src: poster() }],
  });
};
onPlaybackStateChange_fn = function () {
  const { canPlay, paused } = this.$state;
  navigator.mediaSession.playbackState = !canPlay()
    ? 'none'
    : paused()
    ? 'paused'
    : 'playing';
};
handleAction_fn = function (details) {
  const trigger = new DOMEvent(`media-session-action`, { detail: details });
  switch (details.action) {
    case 'play':
      this.dispatch('media-play-request', { trigger });
      break;
    case 'pause':
      this.dispatch('media-pause-request', { trigger });
      break;
    case 'seekto':
    case 'seekforward':
    case 'seekbackward':
      this.dispatch('media-seek-request', {
        detail: isNumber(details.seekTime)
          ? details.seekTime
          : this.$state.currentTime() +
            (details.seekOffset ??
              (details.action === 'seekforward' ? 10 : -10)),
        trigger,
      });
      break;
  }
};
var LOCAL_STORAGE_KEY = '@vidstack/log-colors';
var savedColors = init();
function getLogColor(key) {
  return savedColors.get(key);
}
function saveLogColor(
  key,
  { color = generateColor(), overwrite = false } = {}
) {
  if (!savedColors.has(key) || overwrite) {
    savedColors.set(key, color);
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(Object.entries(savedColors))
    );
  }
}
function generateColor() {
  return `hsl(${Math.random() * 360}, 55%, 70%)`;
}
function init() {
  let colors;
  try {
    colors = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  } catch {}
  return new Map(Object.entries(colors ?? {}));
}
var LogLevelValue = Object.freeze({
  silent: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
});
var LogLevelColor = Object.freeze({
  silent: 'white',
  error: 'hsl(6, 58%, 50%)',
  warn: 'hsl(51, 58%, 50%)',
  info: 'hsl(219, 58%, 50%)',
  debug: 'hsl(280, 58%, 50%)',
});
var s = 1e3;
var m = s * 60;
var h = m * 60;
var d = h * 24;
function ms(val) {
  const msAbs = Math.abs(val);
  if (msAbs >= d) {
    return Math.round(val / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(val / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(val / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(val / s) + 's';
  }
  return round(val, 2) + 'ms';
}
var _level,
  _lastLogged,
  _LogPrinter_instances,
  printTimeDiff_fn,
  calcLastLogTimeDiff_fn;
var LogPrinter = class extends ViewController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _LogPrinter_instances);
    __privateAdd(this, _level, 'warn');
    __privateAdd(this, _lastLogged);
  }
  /**
   * The current log level.
   */
  get logLevel() {
    return __privateGet(this, _level);
  }
  set logLevel(level) {
    __privateSet(this, _level, level);
  }
  onConnect() {
    this.listen('vds-log', (event2) => {
      var _a6, _b2;
      event2.stopPropagation();
      const element =
          ((_a6 = event2.path) == null ? void 0 : _a6[0]) ??
          (event2.target instanceof ViewController
            ? event2.target.el
            : event2.target),
        eventTargetName =
          ((_b2 = element == null ? void 0 : element.$$COMPONENT_NAME) == null
            ? void 0
            : _b2.replace(/^_/, '').replace(/Instance$/, '')) ??
          (element == null ? void 0 : element.tagName.toLowerCase()) ??
          'unknown';
      const { level = 'warn', data } = event2.detail ?? {};
      if (LogLevelValue[__privateGet(this, _level)] < LogLevelValue[level]) {
        return;
      }
      saveLogColor(eventTargetName);
      const hint =
        (data == null ? void 0 : data.length) === 1 && isGroupedLog(data[0])
          ? data[0].title
          : isString(data == null ? void 0 : data[0])
          ? data[0]
          : '';
      console.groupCollapsed(
        `%c${level.toUpperCase()}%c ${eventTargetName}%c ${hint.slice(0, 50)}${
          hint.length > 50 ? '...' : ''
        }`,
        `background: ${LogLevelColor[level]}; color: white; padding: 1.5px 2.2px; border-radius: 2px; font-size: 11px;`,
        `color: ${getLogColor(
          eventTargetName
        )}; padding: 4px 0px; font-size: 11px;`,
        'color: gray; font-size: 11px; padding-left: 4px;'
      );
      if (
        (data == null ? void 0 : data.length) === 1 &&
        isGroupedLog(data[0])
      ) {
        if (element)
          data[0].logs.unshift({ label: 'Element', data: [element] });
        printGroup(level, data[0]);
      } else if (data) {
        print(level, ...data);
      }
      __privateMethod(this, _LogPrinter_instances, printTimeDiff_fn).call(this);
      printStackTrace();
      console.groupEnd();
    });
    onDispose(() => {
      __privateSet(this, _lastLogged, void 0);
    });
  }
};
_level = new WeakMap();
_lastLogged = new WeakMap();
_LogPrinter_instances = new WeakSet();
printTimeDiff_fn = function () {
  labelledPrint(
    'Time since last log',
    __privateMethod(this, _LogPrinter_instances, calcLastLogTimeDiff_fn).call(
      this
    )
  );
};
calcLastLogTimeDiff_fn = function () {
  const time = performance.now();
  const diff =
    time -
    (__privateGet(this, _lastLogged) ??
      __privateSet(this, _lastLogged, performance.now()));
  __privateSet(this, _lastLogged, time);
  return ms(diff);
};
function print(level, ...data) {
  console[level](...data);
}
function labelledPrint(label, ...data) {
  console.log(`%c${label}:`, 'color: gray', ...data);
}
function printStackTrace() {
  console.groupCollapsed('%cStack Trace', 'color: gray');
  console.trace();
  console.groupEnd();
}
function printGroup(level, groupedLog) {
  for (const log of groupedLog.logs) {
    if (isGroupedLog(log)) {
      console.groupCollapsed(groupedLog.title);
      printGroup(level, log);
      console.groupEnd();
    } else if ('label' in log && !isUndefined(log.label)) {
      labelledPrint(log.label, ...log.data);
    } else {
      print(level, ...log.data);
    }
  }
}
var $keyboard = signal(false);
if (!IS_SERVER) {
  listenEvent(document, 'pointerdown', () => {
    $keyboard.set(false);
  });
  listenEvent(document, 'keydown', (e) => {
    if (e.metaKey || e.altKey || e.ctrlKey) return;
    $keyboard.set(true);
  });
}
var _focused,
  _FocusVisibleController_instances,
  onFocus_fn,
  onBlur_fn,
  onPointerEnter_fn,
  onPointerLeave_fn;
var FocusVisibleController = class extends ViewController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _FocusVisibleController_instances);
    __privateAdd(this, _focused, signal(false));
  }
  onConnect(el) {
    effect(() => {
      const events = new EventsController(el);
      if (!$keyboard()) {
        __privateGet(this, _focused).set(false);
        updateFocusAttr(el, false);
        events
          .add(
            'pointerenter',
            __privateMethod(
              this,
              _FocusVisibleController_instances,
              onPointerEnter_fn
            ).bind(this)
          )
          .add(
            'pointerleave',
            __privateMethod(
              this,
              _FocusVisibleController_instances,
              onPointerLeave_fn
            ).bind(this)
          );
        return;
      }
      const active = document.activeElement === el;
      __privateGet(this, _focused).set(active);
      updateFocusAttr(el, active);
      events
        .add(
          'focus',
          __privateMethod(
            this,
            _FocusVisibleController_instances,
            onFocus_fn
          ).bind(this)
        )
        .add(
          'blur',
          __privateMethod(
            this,
            _FocusVisibleController_instances,
            onBlur_fn
          ).bind(this)
        );
    });
  }
  focused() {
    return __privateGet(this, _focused).call(this);
  }
};
_focused = new WeakMap();
_FocusVisibleController_instances = new WeakSet();
onFocus_fn = function () {
  __privateGet(this, _focused).set(true);
  updateFocusAttr(this.el, true);
};
onBlur_fn = function () {
  __privateGet(this, _focused).set(false);
  updateFocusAttr(this.el, false);
};
onPointerEnter_fn = function () {
  updateHoverAttr(this.el, true);
};
onPointerLeave_fn = function () {
  updateHoverAttr(this.el, false);
};
function updateFocusAttr(el, isFocused) {
  setAttribute(el, 'data-focus', isFocused);
  setAttribute(el, 'data-hocus', isFocused);
}
function updateHoverAttr(el, isHovering) {
  setAttribute(el, 'data-hocus', isHovering);
  setAttribute(el, 'data-hover', isHovering);
}
var _media11,
  _stateMgr2,
  _requestMgr,
  _MediaPlayer_instances,
  provider_get,
  props_get,
  _skipTitleUpdate,
  watchTitle_fn2,
  watchOrientation_fn,
  watchCanPlay_fn,
  setupMediaAttributes_fn,
  onFindPlayer_fn,
  onResize_fn,
  onPointerChange_fn,
  watchPaused_fn2,
  queuePausedUpdate_fn,
  watchMuted_fn,
  queueMutedUpdate_fn,
  watchCurrentTime_fn,
  queueCurrentTimeUpdate_fn,
  watchVolume_fn,
  queueVolumeUpdate_fn,
  watchPlaybackRate_fn,
  queuePlaybackRateUpdate_fn,
  watchPlaysInline_fn2,
  queuePlaysInlineUpdate_fn,
  watchStorage_fn,
  computeMediaId_fn;
var _MediaPlayer = class _MediaPlayer extends Component {
  constructor() {
    super();
    __privateAdd(this, _MediaPlayer_instances);
    __privateAdd(this, _media11);
    __privateAdd(this, _stateMgr2);
    __privateAdd(this, _requestMgr);
    __publicField(this, 'canPlayQueue', new RequestQueue());
    __publicField(this, 'remoteControl');
    __privateAdd(this, _skipTitleUpdate, false);
    /**
     * Controls the screen orientation of the current browser window and dispatches orientation
     * change events on the player.
     */
    __publicField(this, 'orientation');
    new MediaStateSync();
    const context = {
      player: this,
      qualities: new VideoQualityList(),
      audioTracks: new AudioTrackList(),
      storage: null,
      $provider: signal(null),
      $providerSetup: signal(false),
      $props: this.$props,
      $state: this.$state,
    };
    {
      const logPrinter = new LogPrinter();
      effect(() => {
        logPrinter.logLevel = this.$props.logLevel();
      });
    }
    context.logger = new Logger();
    context.remote = this.remoteControl = new MediaRemoteControl(
      context.logger
    );
    context.remote.setPlayer(this);
    context.textTracks = new TextTrackList();
    context.textTracks[TextTrackSymbol.crossOrigin] = this.$state.crossOrigin;
    context.textRenderers = new TextRenderers(context);
    context.ariaKeys = {};
    __privateSet(this, _media11, context);
    provideContext(mediaContext, context);
    this.orientation = new ScreenOrientationController();
    new FocusVisibleController();
    new MediaKeyboardController(context);
    new MediaEventsLogger(context);
    const request = new MediaRequestContext();
    __privateSet(this, _stateMgr2, new MediaStateManager(request, context));
    __privateSet(
      this,
      _requestMgr,
      new MediaRequestManager(__privateGet(this, _stateMgr2), request, context)
    );
    context.delegate = new MediaPlayerDelegate(
      __privateGet(this, _stateMgr2).handle.bind(
        __privateGet(this, _stateMgr2)
      ),
      context
    );
    context.notify = context.delegate.notify.bind(context.delegate);
    if (typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      new NavigatorMediaSession();
    }
    new MediaLoadController('load', this.startLoading.bind(this));
    new MediaLoadController('posterLoad', this.startLoadingPoster.bind(this));
  }
  onSetup() {
    __privateMethod(this, _MediaPlayer_instances, setupMediaAttributes_fn).call(
      this
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchCanPlay_fn).bind(this)
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchMuted_fn).bind(this)
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchPaused_fn2).bind(this)
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchVolume_fn).bind(this)
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchCurrentTime_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchPlaysInline_fn2).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchPlaybackRate_fn).bind(
        this
      )
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-player', '');
    setAttributeIfEmpty(el, 'tabindex', '0');
    setAttributeIfEmpty(el, 'role', 'region');
    effect(
      __privateMethod(this, _MediaPlayer_instances, watchStorage_fn).bind(this)
    );
    if (IS_SERVER)
      __privateMethod(this, _MediaPlayer_instances, watchTitle_fn2).call(this);
    else
      effect(
        __privateMethod(this, _MediaPlayer_instances, watchTitle_fn2).bind(this)
      );
    if (IS_SERVER)
      __privateMethod(this, _MediaPlayer_instances, watchOrientation_fn).call(
        this
      );
    else
      effect(
        __privateMethod(this, _MediaPlayer_instances, watchOrientation_fn).bind(
          this
        )
      );
    listenEvent(
      el,
      'find-media-player',
      __privateMethod(this, _MediaPlayer_instances, onFindPlayer_fn).bind(this)
    );
  }
  onConnect(el) {
    if (IS_IPHONE) setAttribute(el, 'data-iphone', '');
    const pointerQuery = window.matchMedia('(pointer: coarse)');
    __privateMethod(this, _MediaPlayer_instances, onPointerChange_fn).call(
      this,
      pointerQuery
    );
    pointerQuery.onchange = __privateMethod(
      this,
      _MediaPlayer_instances,
      onPointerChange_fn
    ).bind(this);
    const resize = new ResizeObserver(
      animationFrameThrottle(
        __privateMethod(this, _MediaPlayer_instances, onResize_fn).bind(this)
      )
    );
    resize.observe(el);
    effect(
      __privateMethod(this, _MediaPlayer_instances, onResize_fn).bind(this)
    );
    this.dispatch('media-player-connect', {
      detail: this,
      bubbles: true,
      composed: true,
    });
    __privateGet(this, _media11).logger.setTarget(el);
    onDispose(() => {
      resize.disconnect();
      pointerQuery.onchange = null;
      __privateGet(this, _media11).logger.setTarget(null);
    });
  }
  onDestroy() {
    __privateGet(this, _media11).player = null;
    this.canPlayQueue.reset();
  }
  /**
   * The current media provider.
   */
  get provider() {
    return __privateGet(this, _MediaPlayer_instances, provider_get);
  }
  /**
   * Media controls settings.
   */
  get controls() {
    return __privateGet(this, _requestMgr).controls;
  }
  set controls(controls) {
    __privateGet(this, _MediaPlayer_instances, props_get).controls.set(
      controls
    );
  }
  /**
   * The title of the current media.
   */
  get title() {
    return peek(this.$state.title);
  }
  set title(newTitle) {
    if (__privateGet(this, _skipTitleUpdate)) {
      __privateSet(this, _skipTitleUpdate, false);
      return;
    }
    __privateGet(this, _MediaPlayer_instances, props_get).title.set(newTitle);
  }
  /**
   * A list of all `VideoQuality` objects representing the set of available video renditions.
   *
   * @see {@link https://vidstack.io/docs/player/api/video-quality}
   */
  get qualities() {
    return __privateGet(this, _media11).qualities;
  }
  /**
   * A list of all `AudioTrack` objects representing the set of available audio tracks.
   *
   * @see {@link https://vidstack.io/docs/player/api/audio-tracks}
   */
  get audioTracks() {
    return __privateGet(this, _media11).audioTracks;
  }
  /**
   * A list of all `TextTrack` objects representing the set of available text tracks.
   *
   * @see {@link https://vidstack.io/docs/player/api/text-tracks}
   */
  get textTracks() {
    return __privateGet(this, _media11).textTracks;
  }
  /**
   * Contains text renderers which are responsible for loading, parsing, and rendering text
   * tracks.
   */
  get textRenderers() {
    return __privateGet(this, _media11).textRenderers;
  }
  get duration() {
    return this.$state.duration();
  }
  set duration(duration) {
    __privateGet(this, _MediaPlayer_instances, props_get).duration.set(
      duration
    );
  }
  get paused() {
    return peek(this.$state.paused);
  }
  set paused(paused) {
    __privateMethod(this, _MediaPlayer_instances, queuePausedUpdate_fn).call(
      this,
      paused
    );
  }
  get muted() {
    return peek(this.$state.muted);
  }
  set muted(muted) {
    __privateMethod(this, _MediaPlayer_instances, queueMutedUpdate_fn).call(
      this,
      muted
    );
  }
  get currentTime() {
    return peek(this.$state.currentTime);
  }
  set currentTime(time) {
    __privateMethod(
      this,
      _MediaPlayer_instances,
      queueCurrentTimeUpdate_fn
    ).call(this, time);
  }
  get volume() {
    return peek(this.$state.volume);
  }
  set volume(volume) {
    __privateMethod(this, _MediaPlayer_instances, queueVolumeUpdate_fn).call(
      this,
      volume
    );
  }
  get playbackRate() {
    return peek(this.$state.playbackRate);
  }
  set playbackRate(rate) {
    __privateMethod(
      this,
      _MediaPlayer_instances,
      queuePlaybackRateUpdate_fn
    ).call(this, rate);
  }
  /**
   * Begins/resumes playback of the media. If this method is called programmatically before the
   * user has interacted with the player, the promise may be rejected subject to the browser's
   * autoplay policies. This method will throw if called before media is ready for playback.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play}
   */
  async play(trigger) {
    return __privateGet(this, _requestMgr).play(trigger);
  }
  /**
   * Pauses playback of the media. This method will throw if called before media is ready for
   * playback.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause}
   */
  async pause(trigger) {
    return __privateGet(this, _requestMgr).pause(trigger);
  }
  /**
   * Attempts to display the player in fullscreen. The promise will resolve if successful, and
   * reject if not. This method will throw if any fullscreen API is _not_ currently available.
   *
   * @see {@link https://vidstack.io/docs/player/api/fullscreen}
   */
  async enterFullscreen(target, trigger) {
    return __privateGet(this, _requestMgr).enterFullscreen(target, trigger);
  }
  /**
   * Attempts to display the player inline by exiting fullscreen. This method will throw if any
   * fullscreen API is _not_ currently available.
   *
   * @see {@link https://vidstack.io/docs/player/api/fullscreen}
   */
  async exitFullscreen(target, trigger) {
    return __privateGet(this, _requestMgr).exitFullscreen(target, trigger);
  }
  /**
   * Attempts to display the player in picture-in-picture mode. This method will throw if PIP is
   * not supported. This method will also return a `PictureInPictureWindow` if the current
   * provider supports it.
   *
   * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
   */
  enterPictureInPicture(trigger) {
    return __privateGet(this, _requestMgr).enterPictureInPicture(trigger);
  }
  /**
   * Attempts to display the player in inline by exiting picture-in-picture mode. This method
   * will throw if not supported.
   *
   * @see {@link https://vidstack.io/docs/player/api/picture-in-picture}
   */
  exitPictureInPicture(trigger) {
    return __privateGet(this, _requestMgr).exitPictureInPicture(trigger);
  }
  /**
   * Sets the current time to the live edge (i.e., `duration`). This is a no-op for non-live
   * streams and will throw if called before media is ready for playback.
   *
   * @see {@link https://vidstack.io/docs/player/api/live}
   */
  seekToLiveEdge(trigger) {
    __privateGet(this, _requestMgr).seekToLiveEdge(trigger);
  }
  /**
   * Called when media can begin loading. Calling this method will trigger the initial provider
   * loading process. Calling it more than once has no effect.
   *
   * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoading(trigger) {
    __privateGet(this, _media11).notify('can-load', void 0, trigger);
  }
  /**
   * Called when the poster image can begin loading. Calling it more than once has no effect.
   *
   * @see {@link https://vidstack.io/docs/player/core-concepts/loading#load-strategies}
   */
  startLoadingPoster(trigger) {
    __privateGet(this, _media11).notify('can-load-poster', void 0, trigger);
  }
  /**
   * Request Apple AirPlay picker to open.
   */
  requestAirPlay(trigger) {
    return __privateGet(this, _requestMgr).requestAirPlay(trigger);
  }
  /**
   * Request Google Cast device picker to open. The Google Cast framework will be loaded if it
   * hasn't yet.
   */
  requestGoogleCast(trigger) {
    return __privateGet(this, _requestMgr).requestGoogleCast(trigger);
  }
  /**
   * Set the audio gain, amplifying volume and enabling a maximum volume above 100%.
   *
   * @see {@link https://vidstack.io/docs/player/api/audio-gain}
   */
  setAudioGain(gain, trigger) {
    return __privateGet(this, _requestMgr).setAudioGain(gain, trigger);
  }
  destroy() {
    super.destroy();
    __privateGet(this, _media11).remote.setPlayer(null);
    this.dispatch('destroy');
  }
};
_media11 = new WeakMap();
_stateMgr2 = new WeakMap();
_requestMgr = new WeakMap();
_MediaPlayer_instances = new WeakSet();
provider_get = function () {
  return __privateGet(this, _media11).$provider();
};
props_get = function () {
  return this.$props;
};
_skipTitleUpdate = new WeakMap();
watchTitle_fn2 = function () {
  const el = this.$el,
    { title, live, viewType, providedTitle } = this.$state,
    isLive = live(),
    type = uppercaseFirstChar(viewType()),
    typeText =
      type !== 'Unknown'
        ? `${isLive ? 'Live ' : ''}${type}`
        : isLive
        ? 'Live'
        : 'Media',
    currentTitle = title();
  setAttribute(
    this.el,
    'aria-label',
    `${typeText} Player` + (currentTitle ? ` - ${currentTitle}` : '')
  );
  if (!IS_SERVER && (el == null ? void 0 : el.hasAttribute('title'))) {
    __privateSet(this, _skipTitleUpdate, true);
    el == null ? void 0 : el.removeAttribute('title');
  }
};
watchOrientation_fn = function () {
  const orientation = this.orientation.landscape ? 'landscape' : 'portrait';
  this.$state.orientation.set(orientation);
  setAttribute(this.el, 'data-orientation', orientation);
  __privateMethod(this, _MediaPlayer_instances, onResize_fn).call(this);
};
watchCanPlay_fn = function () {
  if (
    this.$state.canPlay() &&
    __privateGet(this, _MediaPlayer_instances, provider_get)
  )
    this.canPlayQueue.start();
  else this.canPlayQueue.stop();
};
setupMediaAttributes_fn = function () {
  if (_MediaPlayer[MEDIA_ATTRIBUTES]) {
    this.setAttributes(_MediaPlayer[MEDIA_ATTRIBUTES]);
    return;
  }
  const $attrs = {
    'data-load': function () {
      return this.$props.load();
    },
    'data-captions': function () {
      const track = this.$state.textTrack();
      return !!track && isTrackCaptionKind(track);
    },
    'data-ios-controls': function () {
      return this.$state.iOSControls();
    },
    'data-controls': function () {
      return this.controls.showing;
    },
    'data-buffering': function () {
      const { canLoad, canPlay, waiting } = this.$state;
      return canLoad() && (!canPlay() || waiting());
    },
    'data-error': function () {
      const { error } = this.$state;
      return !!error();
    },
    'data-autoplay-error': function () {
      const { autoPlayError } = this.$state;
      return !!autoPlayError();
    },
  };
  const alias = {
    autoPlay: 'autoplay',
    canAirPlay: 'can-airplay',
    canPictureInPicture: 'can-pip',
    pictureInPicture: 'pip',
    playsInline: 'playsinline',
    remotePlaybackState: 'remote-state',
    remotePlaybackType: 'remote-type',
    isAirPlayConnected: 'airplay',
    isGoogleCastConnected: 'google-cast',
  };
  for (const prop2 of mediaAttributes) {
    const attrName = 'data-' + (alias[prop2] ?? camelToKebabCase(prop2));
    $attrs[attrName] = function () {
      return this.$state[prop2]();
    };
  }
  delete $attrs.title;
  _MediaPlayer[MEDIA_ATTRIBUTES] = $attrs;
  this.setAttributes($attrs);
};
onFindPlayer_fn = function (event2) {
  event2.detail(this);
};
onResize_fn = function () {
  if (IS_SERVER || !this.el) return;
  const width = this.el.clientWidth,
    height = this.el.clientHeight;
  this.$state.width.set(width);
  this.$state.height.set(height);
  setStyle(this.el, '--player-width', width + 'px');
  setStyle(this.el, '--player-height', height + 'px');
};
onPointerChange_fn = function (queryList) {
  if (IS_SERVER) return;
  const pointer = queryList.matches ? 'coarse' : 'fine';
  setAttribute(this.el, 'data-pointer', pointer);
  this.$state.pointer.set(pointer);
  __privateMethod(this, _MediaPlayer_instances, onResize_fn).call(this);
};
watchPaused_fn2 = function () {
  __privateMethod(this, _MediaPlayer_instances, queuePausedUpdate_fn).call(
    this,
    this.$props.paused()
  );
};
queuePausedUpdate_fn = function (paused) {
  if (paused) {
    this.canPlayQueue.enqueue('paused', () =>
      __privateGet(this, _requestMgr).pause()
    );
  } else
    this.canPlayQueue.enqueue('paused', () =>
      __privateGet(this, _requestMgr).play()
    );
};
watchMuted_fn = function () {
  __privateMethod(this, _MediaPlayer_instances, queueMutedUpdate_fn).call(
    this,
    this.$props.muted()
  );
};
queueMutedUpdate_fn = function (muted) {
  this.canPlayQueue.enqueue('muted', () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get))
      __privateGet(this, _MediaPlayer_instances, provider_get).setMuted(muted);
  });
};
watchCurrentTime_fn = function () {
  __privateMethod(this, _MediaPlayer_instances, queueCurrentTimeUpdate_fn).call(
    this,
    this.$props.currentTime()
  );
};
queueCurrentTimeUpdate_fn = function (time) {
  this.canPlayQueue.enqueue('currentTime', () => {
    const { currentTime } = this.$state;
    if (time === peek(currentTime)) return;
    peek(() => {
      if (!__privateGet(this, _MediaPlayer_instances, provider_get)) return;
      const boundedTime = boundTime(time, this.$state);
      if (Number.isFinite(boundedTime)) {
        __privateGet(this, _MediaPlayer_instances, provider_get).setCurrentTime(
          boundedTime
        );
      }
    });
  });
};
watchVolume_fn = function () {
  __privateMethod(this, _MediaPlayer_instances, queueVolumeUpdate_fn).call(
    this,
    this.$props.volume()
  );
};
queueVolumeUpdate_fn = function (volume) {
  const clampedVolume = clampNumber(0, volume, 1);
  this.canPlayQueue.enqueue('volume', () => {
    if (__privateGet(this, _MediaPlayer_instances, provider_get))
      __privateGet(this, _MediaPlayer_instances, provider_get).setVolume(
        clampedVolume
      );
  });
};
watchPlaybackRate_fn = function () {
  __privateMethod(
    this,
    _MediaPlayer_instances,
    queuePlaybackRateUpdate_fn
  ).call(this, this.$props.playbackRate());
};
queuePlaybackRateUpdate_fn = function (rate) {
  this.canPlayQueue.enqueue('rate', () => {
    var _a6, _b2;
    if (__privateGet(this, _MediaPlayer_instances, provider_get))
      (_b2 = (_a6 = __privateGet(this, _MediaPlayer_instances, provider_get))
        .setPlaybackRate) == null
        ? void 0
        : _b2.call(_a6, rate);
  });
};
watchPlaysInline_fn2 = function () {
  __privateMethod(this, _MediaPlayer_instances, queuePlaysInlineUpdate_fn).call(
    this,
    this.$props.playsInline()
  );
};
queuePlaysInlineUpdate_fn = function (inline) {
  this.canPlayQueue.enqueue('playsinline', () => {
    var _a6, _b2;
    if (__privateGet(this, _MediaPlayer_instances, provider_get))
      (_b2 = (_a6 = __privateGet(this, _MediaPlayer_instances, provider_get))
        .setPlaysInline) == null
        ? void 0
        : _b2.call(_a6, inline);
  });
};
watchStorage_fn = function () {
  var _a6;
  let storageValue = this.$props.storage(),
    storage = isString(storageValue) ? new LocalMediaStorage() : storageValue;
  if (storage == null ? void 0 : storage.onChange) {
    const { source } = this.$state,
      playerId = isString(storageValue)
        ? storageValue
        : (_a6 = this.el) == null
        ? void 0
        : _a6.id,
      mediaId = computed(
        __privateMethod(this, _MediaPlayer_instances, computeMediaId_fn).bind(
          this
        )
      );
    effect(() => storage.onChange(source(), mediaId(), playerId || void 0));
  }
  __privateGet(this, _media11).storage = storage;
  __privateGet(this, _media11).textTracks.setStorage(storage);
  onDispose(() => {
    var _a7;
    (_a7 = storage == null ? void 0 : storage.onDestroy) == null
      ? void 0
      : _a7.call(storage);
    __privateGet(this, _media11).storage = null;
    __privateGet(this, _media11).textTracks.setStorage(null);
  });
};
computeMediaId_fn = function () {
  const { clipStartTime, clipEndTime } = this.$props,
    { source } = this.$state,
    src = source();
  return src.src ? `${src.src}:${clipStartTime()}:${clipEndTime()}` : null;
};
__publicField(_MediaPlayer, 'props', mediaPlayerProps);
__publicField(_MediaPlayer, 'state', mediaState);
var MediaPlayer = _MediaPlayer;
var mediaplayer__proto = MediaPlayer.prototype;
prop(mediaplayer__proto, 'canPlayQueue');
prop(mediaplayer__proto, 'remoteControl');
prop(mediaplayer__proto, 'provider');
prop(mediaplayer__proto, 'controls');
prop(mediaplayer__proto, 'orientation');
prop(mediaplayer__proto, 'title');
prop(mediaplayer__proto, 'qualities');
prop(mediaplayer__proto, 'audioTracks');
prop(mediaplayer__proto, 'textTracks');
prop(mediaplayer__proto, 'textRenderers');
prop(mediaplayer__proto, 'duration');
prop(mediaplayer__proto, 'paused');
prop(mediaplayer__proto, 'muted');
prop(mediaplayer__proto, 'currentTime');
prop(mediaplayer__proto, 'volume');
prop(mediaplayer__proto, 'playbackRate');
method(mediaplayer__proto, 'play');
method(mediaplayer__proto, 'pause');
method(mediaplayer__proto, 'enterFullscreen');
method(mediaplayer__proto, 'exitFullscreen');
method(mediaplayer__proto, 'enterPictureInPicture');
method(mediaplayer__proto, 'exitPictureInPicture');
method(mediaplayer__proto, 'seekToLiveEdge');
method(mediaplayer__proto, 'startLoading');
method(mediaplayer__proto, 'startLoadingPoster');
method(mediaplayer__proto, 'requestAirPlay');
method(mediaplayer__proto, 'requestGoogleCast');
method(mediaplayer__proto, 'setAudioGain');
function resolveStreamTypeFromDASHManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit)
    .then((res) => res.text())
    .then((manifest) => {
      return /type="static"/.test(manifest) ? 'on-demand' : 'live';
    });
}
function resolveStreamTypeFromHLSManifest(manifestSrc, requestInit) {
  return fetch(manifestSrc, requestInit)
    .then((res) => res.text())
    .then((manifest) => {
      const renditionURI = resolveHLSRenditionURI(manifest);
      if (renditionURI) {
        return resolveStreamTypeFromHLSManifest(
          /^https?:/.test(renditionURI)
            ? renditionURI
            : new URL(renditionURI, manifestSrc).href,
          requestInit
        );
      }
      const streamType = /EXT-X-PLAYLIST-TYPE:\s*VOD/.test(manifest)
        ? 'on-demand'
        : 'live';
      if (
        streamType === 'live' &&
        resolveTargetDuration(manifest) >= 10 &&
        (/#EXT-X-DVR-ENABLED:\s*true/.test(manifest) ||
          manifest.includes('#EXT-X-DISCONTINUITY'))
      ) {
        return 'live:dvr';
      }
      return streamType;
    });
}
function resolveHLSRenditionURI(manifest) {
  const matches = manifest.match(/#EXT-X-STREAM-INF:[^\n]+(\n[^\n]+)*/g);
  return matches ? matches[0].split('\n')[1].trim() : null;
}
function resolveTargetDuration(manifest) {
  const lines = manifest.split('\n');
  for (const line of lines) {
    if (line.startsWith('#EXT-X-TARGETDURATION')) {
      const duration = parseFloat(line.split(':')[1]);
      if (!isNaN(duration)) {
        return duration;
      }
    }
  }
  return -1;
}
var warned$1 = /* @__PURE__ */ new Set();
var sourceTypes = /* @__PURE__ */ new Map();
var _initialize,
  _loaders,
  _domSources,
  _media12,
  _loader,
  _SourceSelection_instances,
  onSourcesChange_fn,
  onSourceChange_fn,
  findNewSource_fn,
  notifySourceChange_fn,
  notifyLoaderChange_fn,
  onSetup_fn,
  onLoadSource_fn,
  onLoadPoster_fn;
var SourceSelection = class {
  constructor(domSources, media, loader, customLoaders = []) {
    __privateAdd(this, _SourceSelection_instances);
    __privateAdd(this, _initialize, false);
    __privateAdd(this, _loaders);
    __privateAdd(this, _domSources);
    __privateAdd(this, _media12);
    __privateAdd(this, _loader);
    __privateSet(this, _domSources, domSources);
    __privateSet(this, _media12, media);
    __privateSet(this, _loader, loader);
    const DASH_LOADER = new DASHProviderLoader(),
      HLS_LOADER = new HLSProviderLoader(),
      VIDEO_LOADER = new VideoProviderLoader(),
      AUDIO_LOADER = new AudioProviderLoader(),
      YOUTUBE_LOADER = new YouTubeProviderLoader(),
      VIMEO_LOADER = new VimeoProviderLoader(),
      EMBED_LOADERS = [YOUTUBE_LOADER, VIMEO_LOADER];
    __privateSet(
      this,
      _loaders,
      computed(() => {
        const remoteLoader = media.$state.remotePlaybackLoader();
        const loaders = media.$props.preferNativeHLS()
          ? [
              VIDEO_LOADER,
              AUDIO_LOADER,
              DASH_LOADER,
              HLS_LOADER,
              ...EMBED_LOADERS,
              ...customLoaders,
            ]
          : [
              HLS_LOADER,
              VIDEO_LOADER,
              AUDIO_LOADER,
              DASH_LOADER,
              ...EMBED_LOADERS,
              ...customLoaders,
            ];
        return remoteLoader ? [remoteLoader, ...loaders] : loaders;
      })
    );
    const { $state } = media;
    $state.sources.set(normalizeSrc(media.$props.src()));
    for (const src of $state.sources()) {
      const loader2 = __privateGet(this, _loaders)
        .call(this)
        .find((loader3) => loader3.canPlay(src));
      if (!loader2) continue;
      const mediaType = loader2.mediaType(src);
      media.$state.source.set(src);
      media.$state.mediaType.set(mediaType);
      media.$state.inferredViewType.set(mediaType);
      __privateGet(this, _loader).set(loader2);
      __privateSet(this, _initialize, true);
      break;
    }
  }
  connect() {
    const loader = __privateGet(this, _loader).call(this);
    if (__privateGet(this, _initialize)) {
      __privateMethod(
        this,
        _SourceSelection_instances,
        notifySourceChange_fn
      ).call(this, __privateGet(this, _media12).$state.source(), loader);
      __privateMethod(
        this,
        _SourceSelection_instances,
        notifyLoaderChange_fn
      ).call(this, loader);
      __privateSet(this, _initialize, false);
    }
    effect(
      __privateMethod(
        this,
        _SourceSelection_instances,
        onSourcesChange_fn
      ).bind(this)
    );
    effect(
      __privateMethod(this, _SourceSelection_instances, onSourceChange_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SourceSelection_instances, onSetup_fn).bind(this)
    );
    effect(
      __privateMethod(this, _SourceSelection_instances, onLoadSource_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SourceSelection_instances, onLoadPoster_fn).bind(
        this
      )
    );
  }
};
_initialize = new WeakMap();
_loaders = new WeakMap();
_domSources = new WeakMap();
_media12 = new WeakMap();
_loader = new WeakMap();
_SourceSelection_instances = new WeakSet();
onSourcesChange_fn = function () {
  __privateGet(this, _media12).notify('sources-change', [
    ...normalizeSrc(__privateGet(this, _media12).$props.src()),
    ...__privateGet(this, _domSources).call(this),
  ]);
};
onSourceChange_fn = function () {
  var _a6;
  const { $state } = __privateGet(this, _media12);
  const sources = $state.sources(),
    currentSource = peek($state.source),
    newSource = __privateMethod(
      this,
      _SourceSelection_instances,
      findNewSource_fn
    ).call(this, currentSource, sources),
    noMatch =
      ((_a6 = sources[0]) == null ? void 0 : _a6.src) &&
      !newSource.src &&
      !newSource.type;
  if (
    noMatch &&
    !warned$1.has(newSource.src) &&
    !peek(__privateGet(this, _loader))
  ) {
    const source = sources[0];
    console.warn(
      `[vidstack] could not find a loader for any of the given media sources, consider providing \`type\`:

--- HTML ---

<media-provider>
  <source src="${source.src}" type="video/mp4" />
</media-provider>"

--- React ---

<MediaPlayer src={{ src: "${source.src}", type: "video/mp4" }}>

---

Falling back to fetching source headers...`
    );
    warned$1.add(newSource.src);
  }
  if (noMatch) {
    const { crossOrigin } = $state,
      credentials = getRequestCredentials(crossOrigin()),
      abort = new AbortController();
    Promise.all(
      sources.map((source) =>
        isString(source.src) && source.type === '?'
          ? fetch(source.src, {
              method: 'HEAD',
              credentials,
              signal: abort.signal,
            })
              .then((res) => {
                source.type = res.headers.get('content-type') || '??';
                sourceTypes.set(source.src, source.type);
                return source;
              })
              .catch(() => source)
          : source
      )
    ).then((sources2) => {
      if (abort.signal.aborted) return;
      const newSource2 = __privateMethod(
        this,
        _SourceSelection_instances,
        findNewSource_fn
      ).call(this, peek($state.source), sources2);
      tick();
      if (!newSource2.src) {
        __privateGet(this, _media12).notify('error', {
          message: 'Failed to load resource.',
          code: 4,
        });
      }
    });
    return () => abort.abort();
  }
  tick();
};
findNewSource_fn = function (currentSource, sources) {
  let newSource = { src: '', type: '' },
    newLoader = null,
    triggerEvent = new DOMEvent('sources-change', { detail: { sources } }),
    loaders = __privateGet(this, _loaders).call(this),
    { started, paused, currentTime, quality, savedState } = __privateGet(
      this,
      _media12
    ).$state;
  for (const src of sources) {
    const loader = loaders.find((loader2) => loader2.canPlay(src));
    if (loader) {
      newSource = src;
      newLoader = loader;
      break;
    }
  }
  if (isVideoQualitySrc(newSource)) {
    const currentQuality = quality(),
      sourceQuality = sources.find(
        (s2) =>
          s2.src === (currentQuality == null ? void 0 : currentQuality.src)
      );
    if (peek(started)) {
      savedState.set({
        paused: peek(paused),
        currentTime: peek(currentTime),
      });
    } else {
      savedState.set(null);
    }
    if (sourceQuality) {
      newSource = sourceQuality;
      triggerEvent = new DOMEvent('quality-change', {
        detail: { quality: currentQuality },
      });
    }
  }
  if (!isSameSrc(currentSource, newSource)) {
    __privateMethod(
      this,
      _SourceSelection_instances,
      notifySourceChange_fn
    ).call(this, newSource, newLoader, triggerEvent);
  }
  if (newLoader !== peek(__privateGet(this, _loader))) {
    __privateMethod(
      this,
      _SourceSelection_instances,
      notifyLoaderChange_fn
    ).call(this, newLoader, triggerEvent);
  }
  return newSource;
};
notifySourceChange_fn = function (src, loader, trigger) {
  __privateGet(this, _media12).notify('source-change', src, trigger);
  __privateGet(this, _media12).notify(
    'media-type-change',
    (loader == null ? void 0 : loader.mediaType(src)) || 'unknown',
    trigger
  );
};
notifyLoaderChange_fn = function (loader, trigger) {
  __privateGet(this, _media12).$providerSetup.set(false);
  __privateGet(this, _media12).notify('provider-change', null, trigger);
  loader &&
    peek(() => {
      var _a6;
      return (_a6 = loader.preconnect) == null
        ? void 0
        : _a6.call(loader, __privateGet(this, _media12));
    });
  __privateGet(this, _loader).set(loader);
  __privateGet(this, _media12).notify(
    'provider-loader-change',
    loader,
    trigger
  );
};
onSetup_fn = function () {
  const provider2 = __privateGet(this, _media12).$provider();
  if (!provider2 || peek(__privateGet(this, _media12).$providerSetup)) return;
  if (__privateGet(this, _media12).$state.canLoad()) {
    scoped(() => provider2.setup(), provider2.scope);
    __privateGet(this, _media12).$providerSetup.set(true);
    return;
  }
  peek(() => {
    var _a6;
    return (_a6 = provider2.preconnect) == null ? void 0 : _a6.call(provider2);
  });
};
onLoadSource_fn = function () {
  var _a6;
  if (!__privateGet(this, _media12).$providerSetup()) return;
  const provider2 = __privateGet(this, _media12).$provider(),
    source = __privateGet(this, _media12).$state.source(),
    crossOrigin = peek(__privateGet(this, _media12).$state.crossOrigin),
    preferNativeHLS = peek(__privateGet(this, _media12).$props.preferNativeHLS);
  if (isSameSrc(provider2 == null ? void 0 : provider2.currentSrc, source)) {
    return;
  }
  if (__privateGet(this, _media12).$state.canLoad()) {
    const abort = new AbortController();
    if (isHLSSrc(source)) {
      if (preferNativeHLS || !isHLSSupported()) {
        resolveStreamTypeFromHLSManifest(source.src, {
          credentials: getRequestCredentials(crossOrigin),
          signal: abort.signal,
        })
          .then((streamType) => {
            __privateGet(this, _media12).notify(
              'stream-type-change',
              streamType
            );
          })
          .catch(noop);
      }
    } else if (isDASHSrc(source)) {
      resolveStreamTypeFromDASHManifest(source.src, {
        credentials: getRequestCredentials(crossOrigin),
        signal: abort.signal,
      })
        .then((streamType) => {
          __privateGet(this, _media12).notify('stream-type-change', streamType);
        })
        .catch(noop);
    } else {
      __privateGet(this, _media12).notify('stream-type-change', 'on-demand');
    }
    peek(() => {
      const preload = peek(__privateGet(this, _media12).$state.preload);
      return provider2 == null
        ? void 0
        : provider2.loadSource(source, preload).catch((error) => {
            var _a7;
            {
              (_a7 = __privateGet(this, _media12).logger) == null
                ? void 0
                : _a7
                    .errorGroup('[vidstack] failed to load source')
                    .labelledLog('Error', error)
                    .labelledLog('Source', source)
                    .labelledLog('Provider', provider2)
                    .labelledLog('Media Context', {
                      ...__privateGet(this, _media12),
                    })
                    .dispatch();
            }
          });
    });
    return () => abort.abort();
  }
  try {
    isString(source.src) && preconnect(new URL(source.src).origin);
  } catch (error) {
    {
      (_a6 = __privateGet(this, _media12).logger) == null
        ? void 0
        : _a6
            .infoGroup(`Failed to preconnect to source: ${source.src}`)
            .labelledLog('Error', error)
            .dispatch();
    }
  }
};
onLoadPoster_fn = function () {
  const loader = __privateGet(this, _loader).call(this),
    { providedPoster, source, canLoadPoster } = __privateGet(
      this,
      _media12
    ).$state;
  if (
    !loader ||
    !loader.loadPoster ||
    !source() ||
    !canLoadPoster() ||
    providedPoster()
  )
    return;
  const abort = new AbortController(),
    trigger = new DOMEvent('source-change', { detail: source });
  loader
    .loadPoster(source(), __privateGet(this, _media12), abort)
    .then((url) => {
      __privateGet(this, _media12).notify('poster-change', url || '', trigger);
    })
    .catch(() => {
      __privateGet(this, _media12).notify('poster-change', '', trigger);
    });
  return () => {
    abort.abort();
  };
};
function normalizeSrc(src) {
  return (isArray(src) ? src : [src]).map((src2) => {
    if (isString(src2)) {
      return { src: src2, type: inferType(src2) };
    } else {
      return { ...src2, type: inferType(src2.src, src2.type) };
    }
  });
}
function inferType(src, type) {
  if (isString(type) && type.length) {
    return type;
  } else if (isString(src) && sourceTypes.has(src)) {
    return sourceTypes.get(src);
  } else if (!type && isHLSSrc({ src, type: '' })) {
    return 'application/x-mpegurl';
  } else if (!type && isDASHSrc({ src, type: '' })) {
    return 'application/dash+xml';
  } else if (!isString(src) || src.startsWith('blob:')) {
    return 'video/object';
  } else if (src.includes('youtube') || src.includes('youtu.be')) {
    return 'video/youtube';
  } else if (
    src.includes('vimeo') &&
    !src.includes('progressive_redirect') &&
    !src.includes('.m3u8')
  ) {
    return 'video/vimeo';
  }
  return '?';
}
function isSameSrc(a, b) {
  return (
    (a == null ? void 0 : a.src) === (b == null ? void 0 : b.src) &&
    (a == null ? void 0 : a.type) === (b == null ? void 0 : b.type)
  );
}
var _domTracks, _media13, _prevTracks, _Tracks_instances, onTracksChange_fn;
var Tracks = class {
  constructor(domTracks, media) {
    __privateAdd(this, _Tracks_instances);
    __privateAdd(this, _domTracks);
    __privateAdd(this, _media13);
    __privateAdd(this, _prevTracks, []);
    __privateSet(this, _domTracks, domTracks);
    __privateSet(this, _media13, media);
    effect(
      __privateMethod(this, _Tracks_instances, onTracksChange_fn).bind(this)
    );
  }
};
_domTracks = new WeakMap();
_media13 = new WeakMap();
_prevTracks = new WeakMap();
_Tracks_instances = new WeakSet();
onTracksChange_fn = function () {
  const newTracks = __privateGet(this, _domTracks).call(this);
  for (const oldTrack of __privateGet(this, _prevTracks)) {
    if (!newTracks.some((t) => t.id === oldTrack.id)) {
      const track =
        oldTrack.id &&
        __privateGet(this, _media13).textTracks.getById(oldTrack.id);
      if (track) __privateGet(this, _media13).textTracks.remove(track);
    }
  }
  for (const newTrack of newTracks) {
    const id2 = newTrack.id || TextTrack.createId(newTrack);
    if (!__privateGet(this, _media13).textTracks.getById(id2)) {
      newTrack.id = id2;
      __privateGet(this, _media13).textTracks.add(newTrack);
    }
  }
  __privateSet(this, _prevTracks, newTracks);
};
var _media14,
  _sources,
  _domSources2,
  _domTracks2,
  _loader2,
  _loadRafId,
  _MediaProvider_instances,
  runLoader_fn,
  destroyProvider_fn,
  onResize_fn2,
  onMutation_fn;
var MediaProvider = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MediaProvider_instances);
    __privateAdd(this, _media14);
    __privateAdd(this, _sources);
    __privateAdd(this, _domSources2, signal([]));
    __privateAdd(this, _domTracks2, signal([]));
    __privateAdd(this, _loader2, null);
    __privateAdd(this, _loadRafId, -1);
  }
  onSetup() {
    __privateSet(this, _media14, useMediaContext());
    __privateSet(
      this,
      _sources,
      new SourceSelection(
        __privateGet(this, _domSources2),
        __privateGet(this, _media14),
        this.$state.loader,
        this.$props.loaders()
      )
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-provider', '');
  }
  onConnect(el) {
    __privateGet(this, _sources).connect();
    new Tracks(__privateGet(this, _domTracks2), __privateGet(this, _media14));
    const resize = new ResizeObserver(
      animationFrameThrottle(
        __privateMethod(this, _MediaProvider_instances, onResize_fn2).bind(this)
      )
    );
    resize.observe(el);
    const mutations = new MutationObserver(
      __privateMethod(this, _MediaProvider_instances, onMutation_fn).bind(this)
    );
    mutations.observe(el, { attributes: true, childList: true });
    __privateMethod(this, _MediaProvider_instances, onResize_fn2).call(this);
    __privateMethod(this, _MediaProvider_instances, onMutation_fn).call(this);
    onDispose(() => {
      resize.disconnect();
      mutations.disconnect();
    });
  }
  load(target) {
    target == null ? void 0 : target.setAttribute('aria-hidden', 'true');
    window.cancelAnimationFrame(__privateGet(this, _loadRafId));
    __privateSet(
      this,
      _loadRafId,
      requestAnimationFrame(() =>
        __privateMethod(this, _MediaProvider_instances, runLoader_fn).call(
          this,
          target
        )
      )
    );
    onDispose(() => {
      window.cancelAnimationFrame(__privateGet(this, _loadRafId));
    });
  }
  onDestroy() {
    __privateSet(this, _loader2, null);
    __privateMethod(this, _MediaProvider_instances, destroyProvider_fn).call(
      this
    );
  }
};
_media14 = new WeakMap();
_sources = new WeakMap();
_domSources2 = new WeakMap();
_domTracks2 = new WeakMap();
_loader2 = new WeakMap();
_loadRafId = new WeakMap();
_MediaProvider_instances = new WeakSet();
runLoader_fn = function (target) {
  if (!this.scope) return;
  const loader = this.$state.loader(),
    { $provider } = __privateGet(this, _media14);
  if (
    __privateGet(this, _loader2) === loader &&
    (loader == null ? void 0 : loader.target) === target &&
    peek($provider)
  )
    return;
  __privateMethod(this, _MediaProvider_instances, destroyProvider_fn).call(
    this
  );
  __privateSet(this, _loader2, loader);
  if (loader) loader.target = target || null;
  if (!loader || !target) return;
  loader.load(__privateGet(this, _media14)).then((provider2) => {
    if (!this.scope) return;
    if (peek(this.$state.loader) !== loader) return;
    __privateGet(this, _media14).notify('provider-change', provider2);
  });
};
destroyProvider_fn = function () {
  var _a6;
  (_a6 = __privateGet(this, _media14)) == null
    ? void 0
    : _a6.notify('provider-change', null);
};
onResize_fn2 = function () {
  if (!this.el) return;
  const { player, $state } = __privateGet(this, _media14),
    width = this.el.offsetWidth,
    height = this.el.offsetHeight;
  if (!player) return;
  $state.mediaWidth.set(width);
  $state.mediaHeight.set(height);
  if (player.el) {
    setStyle(player.el, '--media-width', width + 'px');
    setStyle(player.el, '--media-height', height + 'px');
  }
};
onMutation_fn = function () {
  const sources = [],
    tracks = [],
    children = this.el.children;
  for (const el of children) {
    if (el.hasAttribute('data-vds')) continue;
    if (el instanceof HTMLSourceElement) {
      const src = {
        id: el.id,
        src: el.src,
        type: el.type,
      };
      for (const prop2 of [
        'id',
        'src',
        'width',
        'height',
        'bitrate',
        'codec',
      ]) {
        const value = el.getAttribute(`data-${prop2}`);
        if (isString(value))
          src[prop2] = /id|src|codec/.test(prop2) ? value : Number(value);
      }
      sources.push(src);
    } else if (el instanceof HTMLTrackElement) {
      const track = {
        src: el.src,
        kind: el.track.kind,
        language: el.srclang,
        label: el.label,
        default: el.default,
        type: el.getAttribute('data-type'),
      };
      tracks.push({
        id: el.id || TextTrack.createId(track),
        ...track,
      });
    }
  }
  __privateGet(this, _domSources2).set(sources);
  __privateGet(this, _domTracks2).set(tracks);
  tick();
};
__publicField(MediaProvider, 'props', {
  loaders: [],
});
__publicField(
  MediaProvider,
  'state',
  new State({
    loader: null,
  })
);
var mediaprovider__proto = MediaProvider.prototype;
method(mediaprovider__proto, 'load');
var _media15,
  _initializing,
  _MediaAnnouncer_instances,
  watchPaused_fn3,
  watchFullscreen_fn,
  watchPiP_fn,
  watchCaptions_fn,
  watchVolume_fn2,
  _startedSeekingAt,
  _seekTimer,
  watchSeeking_fn,
  translate_fn,
  watchLabel_fn,
  setLabel_fn;
var MediaAnnouncer = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MediaAnnouncer_instances);
    __privateAdd(this, _media15);
    __privateAdd(this, _initializing, false);
    __privateAdd(this, _startedSeekingAt, -1);
    __privateAdd(this, _seekTimer, -1);
  }
  onSetup() {
    __privateSet(this, _media15, useMediaContext());
  }
  onAttach(el) {
    el.style.display = 'contents';
  }
  onConnect(el) {
    el.setAttribute('data-media-announcer', '');
    setAttributeIfEmpty(el, 'role', 'status');
    setAttributeIfEmpty(el, 'aria-live', 'polite');
    const { busy } = this.$state;
    this.setAttributes({
      'aria-busy': () => (busy() ? 'true' : null),
    });
    __privateSet(this, _initializing, true);
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchPaused_fn3).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchVolume_fn2).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchCaptions_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchFullscreen_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchPiP_fn).bind(this)
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchSeeking_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _MediaAnnouncer_instances, watchLabel_fn).bind(this)
    );
    tick();
    __privateSet(this, _initializing, false);
  }
};
_media15 = new WeakMap();
_initializing = new WeakMap();
_MediaAnnouncer_instances = new WeakSet();
watchPaused_fn3 = function () {
  const { paused } = __privateGet(this, _media15).$state;
  __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
    this,
    !paused() ? 'Play' : 'Pause'
  );
};
watchFullscreen_fn = function () {
  const { fullscreen } = __privateGet(this, _media15).$state;
  __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
    this,
    fullscreen() ? 'Enter Fullscreen' : 'Exit Fullscreen'
  );
};
watchPiP_fn = function () {
  const { pictureInPicture } = __privateGet(this, _media15).$state;
  __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
    this,
    pictureInPicture() ? 'Enter PiP' : 'Exit PiP'
  );
};
watchCaptions_fn = function () {
  const { textTrack } = __privateGet(this, _media15).$state;
  __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
    this,
    textTrack() ? 'Closed-Captions On' : 'Closed-Captions Off'
  );
};
watchVolume_fn2 = function () {
  const { muted, volume, audioGain } = __privateGet(this, _media15).$state;
  __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
    this,
    muted() || volume() === 0
      ? 'Mute'
      : `${Math.round(volume() * (audioGain() ?? 1) * 100)}% ${__privateMethod(
          this,
          _MediaAnnouncer_instances,
          translate_fn
        ).call(this, 'Volume')}`
  );
};
_startedSeekingAt = new WeakMap();
_seekTimer = new WeakMap();
watchSeeking_fn = function () {
  const { seeking, currentTime } = __privateGet(this, _media15).$state,
    isSeeking = seeking();
  if (__privateGet(this, _startedSeekingAt) > 0) {
    window.clearTimeout(__privateGet(this, _seekTimer));
    __privateSet(
      this,
      _seekTimer,
      window.setTimeout(() => {
        if (!this.scope) return;
        const newTime = peek(currentTime),
          seconds = Math.abs(newTime - __privateGet(this, _startedSeekingAt));
        if (seconds >= 1) {
          const isForward = newTime >= __privateGet(this, _startedSeekingAt),
            spokenTime = formatSpokenTime(seconds);
          __privateMethod(this, _MediaAnnouncer_instances, setLabel_fn).call(
            this,
            `${__privateMethod(
              this,
              _MediaAnnouncer_instances,
              translate_fn
            ).call(
              this,
              isForward ? 'Seek Forward' : 'Seek Backward'
            )} ${spokenTime}`
          );
        }
        __privateSet(this, _startedSeekingAt, -1);
        __privateSet(this, _seekTimer, -1);
      }, 300)
    );
  } else if (isSeeking) {
    __privateSet(this, _startedSeekingAt, peek(currentTime));
  }
};
translate_fn = function (word) {
  var _a6;
  const { translations } = this.$props;
  return (
    ((_a6 = translations == null ? void 0 : translations()) == null
      ? void 0
      : _a6[word || '']) ?? word
  );
};
watchLabel_fn = function () {
  const { label, busy } = this.$state,
    $label = __privateMethod(
      this,
      _MediaAnnouncer_instances,
      translate_fn
    ).call(this, label());
  if (__privateGet(this, _initializing)) return;
  busy.set(true);
  const id2 = window.setTimeout(() => void busy.set(false), 150);
  this.el && setAttribute(this.el, 'aria-label', $label);
  if (isString($label)) {
    this.dispatch('change', { detail: $label });
  }
  return () => window.clearTimeout(id2);
};
setLabel_fn = function (word) {
  const { label } = this.$state;
  label.set(word);
};
__publicField(MediaAnnouncer, 'props', {
  translations: null,
});
__publicField(
  MediaAnnouncer,
  'state',
  new State({
    label: null,
    busy: false,
  })
);
var _media16, _Controls_instances, hideControls_fn, watchProps_fn, isShowing_fn;
var Controls = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Controls_instances);
    __privateAdd(this, _media16);
  }
  onSetup() {
    __privateSet(this, _media16, useMediaContext());
    effect(
      __privateMethod(this, _Controls_instances, watchProps_fn).bind(this)
    );
  }
  onAttach(el) {
    const { pictureInPicture, fullscreen } = __privateGet(
      this,
      _media16
    ).$state;
    setStyle(el, 'pointer-events', 'none');
    setAttributeIfEmpty(el, 'role', 'group');
    this.setAttributes({
      'data-visible': __privateMethod(
        this,
        _Controls_instances,
        isShowing_fn
      ).bind(this),
      'data-fullscreen': fullscreen,
      'data-pip': pictureInPicture,
    });
    effect(() => {
      this.dispatch('change', {
        detail: __privateMethod(this, _Controls_instances, isShowing_fn).call(
          this
        ),
      });
    });
    effect(
      __privateMethod(this, _Controls_instances, hideControls_fn).bind(this)
    );
    effect(() => {
      const isFullscreen2 = fullscreen();
      for (const side of ['top', 'right', 'bottom', 'left']) {
        setStyle(
          el,
          `padding-${side}`,
          isFullscreen2 && `env(safe-area-inset-${side})`
        );
      }
    });
  }
};
_media16 = new WeakMap();
_Controls_instances = new WeakSet();
hideControls_fn = function () {
  if (!this.el) return;
  const { nativeControls } = __privateGet(this, _media16).$state,
    isHidden = nativeControls();
  setAttribute(this.el, 'aria-hidden', isHidden ? 'true' : null);
  setStyle(this.el, 'display', isHidden ? 'none' : null);
};
watchProps_fn = function () {
  const { controls } = __privateGet(this, _media16).player,
    { hideDelay, hideOnMouseLeave } = this.$props;
  controls.defaultDelay =
    hideDelay() === 2e3
      ? __privateGet(this, _media16).$props.controlsDelay()
      : hideDelay();
  controls.hideOnMouseLeave = hideOnMouseLeave();
};
isShowing_fn = function () {
  const { controlsVisible } = __privateGet(this, _media16).$state;
  return controlsVisible();
};
__publicField(Controls, 'props', {
  hideDelay: 2e3,
  hideOnMouseLeave: false,
});
var ControlsGroup = class extends Component {
  onAttach(el) {
    if (!el.style.pointerEvents) setStyle(el, 'pointer-events', 'auto');
  }
};
var _delegate,
  _Popper_instances,
  watchTrigger_fn,
  _showTimerId,
  _hideRafId,
  _stopAnimationEndListener,
  cancelShowing_fn;
var Popper = class extends ViewController {
  constructor(delegate) {
    super();
    __privateAdd(this, _Popper_instances);
    __privateAdd(this, _delegate);
    __privateAdd(this, _showTimerId, -1);
    __privateAdd(this, _hideRafId, -1);
    __privateAdd(this, _stopAnimationEndListener, null);
    __privateSet(this, _delegate, delegate);
    effect(
      __privateMethod(this, _Popper_instances, watchTrigger_fn).bind(this)
    );
  }
  onDestroy() {
    var _a6;
    (_a6 = __privateGet(this, _stopAnimationEndListener)) == null
      ? void 0
      : _a6.call(this);
    __privateSet(this, _stopAnimationEndListener, null);
  }
  show(trigger) {
    var _a6, _b2, _c2;
    __privateMethod(this, _Popper_instances, cancelShowing_fn).call(this);
    window.cancelAnimationFrame(__privateGet(this, _hideRafId));
    __privateSet(this, _hideRafId, -1);
    (_a6 = __privateGet(this, _stopAnimationEndListener)) == null
      ? void 0
      : _a6.call(this);
    __privateSet(this, _stopAnimationEndListener, null);
    __privateSet(
      this,
      _showTimerId,
      window.setTimeout(() => {
        __privateSet(this, _showTimerId, -1);
        const content = __privateGet(this, _delegate).content();
        if (content) content.style.removeProperty('display');
        peek(() => __privateGet(this, _delegate).onChange(true, trigger));
      }, ((_c2 = (_b2 = __privateGet(this, _delegate)).showDelay) == null ? void 0 : _c2.call(_b2)) ?? 0)
    );
  }
  hide(trigger) {
    __privateMethod(this, _Popper_instances, cancelShowing_fn).call(this);
    peek(() => __privateGet(this, _delegate).onChange(false, trigger));
    __privateSet(
      this,
      _hideRafId,
      requestAnimationFrame(() => {
        var _a6;
        __privateMethod(this, _Popper_instances, cancelShowing_fn).call(this);
        __privateSet(this, _hideRafId, -1);
        const content = __privateGet(this, _delegate).content();
        if (content) {
          const onHide = () => {
            content.style.display = 'none';
            __privateSet(this, _stopAnimationEndListener, null);
          };
          const isAnimated = hasAnimation(content);
          if (isAnimated) {
            (_a6 = __privateGet(this, _stopAnimationEndListener)) == null
              ? void 0
              : _a6.call(this);
            const stop = listenEvent(content, 'animationend', onHide, {
              once: true,
            });
            __privateSet(this, _stopAnimationEndListener, stop);
          } else {
            onHide();
          }
        }
      })
    );
  }
};
_delegate = new WeakMap();
_Popper_instances = new WeakSet();
watchTrigger_fn = function () {
  const trigger = __privateGet(this, _delegate).trigger();
  if (!trigger) {
    this.hide();
    return;
  }
  const show = this.show.bind(this),
    hide = this.hide.bind(this);
  __privateGet(this, _delegate).listen(trigger, show, hide);
};
_showTimerId = new WeakMap();
_hideRafId = new WeakMap();
_stopAnimationEndListener = new WeakMap();
cancelShowing_fn = function () {
  window.clearTimeout(__privateGet(this, _showTimerId));
  __privateSet(this, _showTimerId, -1);
};
var tooltipContext = createContext();
var id = 0;
var _id2,
  _trigger,
  _content,
  _showing,
  _Tooltip_instances,
  attachTrigger_fn,
  detachTrigger_fn,
  attachContent_fn,
  detachContent_fn,
  onShowingChange_fn;
var Tooltip = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _Tooltip_instances);
    __privateAdd(this, _id2, `media-tooltip-${++id}`);
    __privateAdd(this, _trigger, signal(null));
    __privateAdd(this, _content, signal(null));
    __privateAdd(this, _showing, signal(false));
    new FocusVisibleController();
    const { showDelay } = this.$props;
    new Popper({
      trigger: __privateGet(this, _trigger),
      content: __privateGet(this, _content),
      showDelay,
      listen(trigger, show, hide) {
        effect(() => {
          if ($keyboard()) listenEvent(trigger, 'focus', show);
          listenEvent(trigger, 'blur', hide);
        });
        new EventsController(trigger)
          .add('touchstart', (e) => e.preventDefault(), { passive: false })
          .add('mouseenter', show)
          .add('mouseleave', hide);
      },
      onChange: __privateMethod(
        this,
        _Tooltip_instances,
        onShowingChange_fn
      ).bind(this),
    });
  }
  onAttach(el) {
    el.style.setProperty('display', 'contents');
  }
  onSetup() {
    provideContext(tooltipContext, {
      trigger: __privateGet(this, _trigger),
      content: __privateGet(this, _content),
      showing: __privateGet(this, _showing),
      attachTrigger: __privateMethod(
        this,
        _Tooltip_instances,
        attachTrigger_fn
      ).bind(this),
      detachTrigger: __privateMethod(
        this,
        _Tooltip_instances,
        detachTrigger_fn
      ).bind(this),
      attachContent: __privateMethod(
        this,
        _Tooltip_instances,
        attachContent_fn
      ).bind(this),
      detachContent: __privateMethod(
        this,
        _Tooltip_instances,
        detachContent_fn
      ).bind(this),
    });
  }
};
_id2 = new WeakMap();
_trigger = new WeakMap();
_content = new WeakMap();
_showing = new WeakMap();
_Tooltip_instances = new WeakSet();
attachTrigger_fn = function (el) {
  var _a6;
  __privateGet(this, _trigger).set(el);
  let tooltipName = el.getAttribute('data-media-tooltip');
  if (tooltipName) {
    (_a6 = this.el) == null
      ? void 0
      : _a6.setAttribute(`data-media-${tooltipName}-tooltip`, '');
  }
  setAttribute(el, 'data-describedby', __privateGet(this, _id2));
};
detachTrigger_fn = function (el) {
  el.removeAttribute('data-describedby');
  el.removeAttribute('aria-describedby');
  __privateGet(this, _trigger).set(null);
};
attachContent_fn = function (el) {
  el.setAttribute('id', __privateGet(this, _id2));
  el.style.display = 'none';
  setAttributeIfEmpty(el, 'role', 'tooltip');
  __privateGet(this, _content).set(el);
};
detachContent_fn = function (el) {
  el.removeAttribute('id');
  el.removeAttribute('role');
  __privateGet(this, _content).set(null);
};
onShowingChange_fn = function (isShowing) {
  const trigger = __privateGet(this, _trigger).call(this),
    content = __privateGet(this, _content).call(this);
  if (trigger) {
    setAttribute(
      trigger,
      'aria-describedby',
      isShowing ? __privateGet(this, _id2) : null
    );
  }
  for (const el of [this.el, trigger, content]) {
    el && setAttribute(el, 'data-visible', isShowing);
  }
  __privateGet(this, _showing).set(isShowing);
};
__publicField(Tooltip, 'props', {
  showDelay: 700,
});
var _TooltipTrigger_instances, attach_fn, getButton_fn;
var TooltipTrigger = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _TooltipTrigger_instances);
    new FocusVisibleController();
  }
  onConnect(el) {
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        __privateMethod(this, _TooltipTrigger_instances, attach_fn).call(this);
        const tooltip = useContext(tooltipContext);
        onDispose(() => {
          const button = __privateMethod(
            this,
            _TooltipTrigger_instances,
            getButton_fn
          ).call(this);
          button && tooltip.detachTrigger(button);
        });
      })
    );
  }
};
_TooltipTrigger_instances = new WeakSet();
attach_fn = function () {
  const button = __privateMethod(
      this,
      _TooltipTrigger_instances,
      getButton_fn
    ).call(this),
    tooltip = useContext(tooltipContext);
  button && tooltip.attachTrigger(button);
};
getButton_fn = function () {
  const candidate = this.el.firstElementChild;
  return (candidate == null ? void 0 : candidate.localName) === 'button' ||
    (candidate == null ? void 0 : candidate.getAttribute('role')) === 'button'
    ? candidate
    : this.el;
};
var _TooltipContent_instances, attach_fn2, watchPlacement_fn, getTrigger_fn;
var TooltipContent = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _TooltipContent_instances);
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      'data-placement': placement,
    });
  }
  onAttach(el) {
    __privateMethod(this, _TooltipContent_instances, attach_fn2).call(this, el);
    Object.assign(el.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'max-content',
    });
  }
  onConnect(el) {
    __privateMethod(this, _TooltipContent_instances, attach_fn2).call(this, el);
    const tooltip = useContext(tooltipContext);
    onDispose(() => tooltip.detachContent(el));
    onDispose(
      requestScopedAnimationFrame(() => {
        if (!this.connectScope) return;
        effect(
          __privateMethod(
            this,
            _TooltipContent_instances,
            watchPlacement_fn
          ).bind(this)
        );
      })
    );
  }
};
_TooltipContent_instances = new WeakSet();
attach_fn2 = function (el) {
  const tooltip = useContext(tooltipContext);
  tooltip.attachContent(el);
};
watchPlacement_fn = function () {
  const { showing } = useContext(tooltipContext);
  if (!showing()) return;
  const { placement, offset: mainOffset, alignOffset } = this.$props;
  return autoPlacement(
    this.el,
    __privateMethod(this, _TooltipContent_instances, getTrigger_fn).call(this),
    placement(),
    {
      offsetVarName: 'media-tooltip',
      xOffset: alignOffset(),
      yOffset: mainOffset(),
    }
  );
};
getTrigger_fn = function () {
  return useContext(tooltipContext).trigger();
};
__publicField(TooltipContent, 'props', {
  placement: 'top center',
  offset: 0,
  alignOffset: 0,
});
var _delegate2,
  _ToggleButtonController_instances,
  isARIAPressed_fn,
  onPressed_fn,
  onMaybePress_fn,
  onInteraction_fn;
var ToggleButtonController = class extends ViewController {
  constructor(delegate) {
    super();
    __privateAdd(this, _ToggleButtonController_instances);
    __privateAdd(this, _delegate2);
    __privateSet(this, _delegate2, delegate);
    new FocusVisibleController();
    if (delegate.keyShortcut) {
      new ARIAKeyShortcuts(delegate.keyShortcut);
    }
  }
  onSetup() {
    const { disabled } = this.$props;
    this.setAttributes({
      'data-pressed': __privateGet(this, _delegate2).isPresssed,
      'aria-pressed': __privateMethod(
        this,
        _ToggleButtonController_instances,
        isARIAPressed_fn
      ).bind(this),
      'aria-disabled': () => (disabled() ? 'true' : null),
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, 'tabindex', '0');
    setAttributeIfEmpty(el, 'role', 'button');
    setAttributeIfEmpty(el, 'type', 'button');
  }
  onConnect(el) {
    const events = onPress(
      el,
      __privateMethod(
        this,
        _ToggleButtonController_instances,
        onMaybePress_fn
      ).bind(this)
    );
    for (const type of ['click', 'touchstart']) {
      events.add(
        type,
        __privateMethod(
          this,
          _ToggleButtonController_instances,
          onInteraction_fn
        ).bind(this),
        {
          passive: true,
        }
      );
    }
  }
};
_delegate2 = new WeakMap();
_ToggleButtonController_instances = new WeakSet();
isARIAPressed_fn = function () {
  return ariaBool(__privateGet(this, _delegate2).isPresssed());
};
onPressed_fn = function (event2) {
  if (isWriteSignal(__privateGet(this, _delegate2).isPresssed)) {
    __privateGet(this, _delegate2).isPresssed.set((p) => !p);
  }
};
onMaybePress_fn = function (event2) {
  const disabled =
    this.$props.disabled() || this.el.hasAttribute('data-disabled');
  if (disabled) {
    event2.preventDefault();
    event2.stopImmediatePropagation();
    return;
  }
  event2.preventDefault();
  (
    __privateGet(this, _delegate2).onPress ??
    __privateMethod(this, _ToggleButtonController_instances, onPressed_fn)
  ).call(this, event2);
};
onInteraction_fn = function (event2) {
  if (this.$props.disabled()) {
    event2.preventDefault();
    event2.stopImmediatePropagation();
  }
};
__publicField(ToggleButtonController, 'props', {
  disabled: false,
});
var _pressed;
var ToggleButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _pressed, signal(false));
    new ToggleButtonController({
      isPresssed: __privateGet(this, _pressed),
    });
  }
  /**
   * Whether the toggle is currently in a `pressed` state.
   */
  get pressed() {
    return __privateGet(this, _pressed).call(this);
  }
};
_pressed = new WeakMap();
__publicField(ToggleButton, 'props', {
  disabled: false,
  defaultPressed: false,
});
var togglebutton__proto = ToggleButton.prototype;
prop(togglebutton__proto, 'pressed');
function ariaBool2(value) {
  return value ? 'true' : 'false';
}
function $ariaBool(signal2) {
  return () => ariaBool2(signal2());
}
var _media17,
  _AirPlayButton_instances,
  onPress_fn,
  isPressed_fn,
  getState_fn,
  getDefaultLabel_fn;
var AirPlayButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _AirPlayButton_instances);
    __privateAdd(this, _media17);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _AirPlayButton_instances,
        isPressed_fn
      ).bind(this),
      onPress: __privateMethod(this, _AirPlayButton_instances, onPress_fn).bind(
        this
      ),
    });
  }
  onSetup() {
    __privateSet(this, _media17, useMediaContext());
    const { canAirPlay, isAirPlayConnected } = __privateGet(
      this,
      _media17
    ).$state;
    this.setAttributes({
      'data-active': isAirPlayConnected,
      'data-supported': canAirPlay,
      'data-state': __privateMethod(
        this,
        _AirPlayButton_instances,
        getState_fn
      ).bind(this),
      'aria-hidden': $ariaBool(() => !canAirPlay()),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'airplay');
    setARIALabel(
      el,
      __privateMethod(this, _AirPlayButton_instances, getDefaultLabel_fn).bind(
        this
      )
    );
  }
};
_media17 = new WeakMap();
_AirPlayButton_instances = new WeakSet();
onPress_fn = function (event2) {
  const remote = __privateGet(this, _media17).remote;
  remote.requestAirPlay(event2);
};
isPressed_fn = function () {
  const { remotePlaybackType, remotePlaybackState } = __privateGet(
    this,
    _media17
  ).$state;
  return (
    remotePlaybackType() === 'airplay' &&
    remotePlaybackState() !== 'disconnected'
  );
};
getState_fn = function () {
  const { remotePlaybackType, remotePlaybackState } = __privateGet(
    this,
    _media17
  ).$state;
  return remotePlaybackType() === 'airplay' && remotePlaybackState();
};
getDefaultLabel_fn = function () {
  const { remotePlaybackState } = __privateGet(this, _media17).$state;
  return `AirPlay ${remotePlaybackState()}`;
};
__publicField(AirPlayButton, 'props', ToggleButtonController.props);
var _media18,
  _GoogleCastButton_instances,
  onPress_fn2,
  isPressed_fn2,
  getState_fn2,
  getDefaultLabel_fn2;
var GoogleCastButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _GoogleCastButton_instances);
    __privateAdd(this, _media18);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _GoogleCastButton_instances,
        isPressed_fn2
      ).bind(this),
      onPress: __privateMethod(
        this,
        _GoogleCastButton_instances,
        onPress_fn2
      ).bind(this),
    });
  }
  onSetup() {
    __privateSet(this, _media18, useMediaContext());
    const { canGoogleCast, isGoogleCastConnected } = __privateGet(
      this,
      _media18
    ).$state;
    this.setAttributes({
      'data-active': isGoogleCastConnected,
      'data-supported': canGoogleCast,
      'data-state': __privateMethod(
        this,
        _GoogleCastButton_instances,
        getState_fn2
      ).bind(this),
      'aria-hidden': $ariaBool(() => !canGoogleCast()),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'google-cast');
    setARIALabel(
      el,
      __privateMethod(
        this,
        _GoogleCastButton_instances,
        getDefaultLabel_fn2
      ).bind(this)
    );
  }
};
_media18 = new WeakMap();
_GoogleCastButton_instances = new WeakSet();
onPress_fn2 = function (event2) {
  const remote = __privateGet(this, _media18).remote;
  remote.requestGoogleCast(event2);
};
isPressed_fn2 = function () {
  const { remotePlaybackType, remotePlaybackState } = __privateGet(
    this,
    _media18
  ).$state;
  return (
    remotePlaybackType() === 'google-cast' &&
    remotePlaybackState() !== 'disconnected'
  );
};
getState_fn2 = function () {
  const { remotePlaybackType, remotePlaybackState } = __privateGet(
    this,
    _media18
  ).$state;
  return remotePlaybackType() === 'google-cast' && remotePlaybackState();
};
getDefaultLabel_fn2 = function () {
  const { remotePlaybackState } = __privateGet(this, _media18).$state;
  return `Google Cast ${remotePlaybackState()}`;
};
__publicField(GoogleCastButton, 'props', ToggleButtonController.props);
var _media19, _PlayButton_instances, onPress_fn3, isPressed_fn3;
var PlayButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _PlayButton_instances);
    __privateAdd(this, _media19);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _PlayButton_instances,
        isPressed_fn3
      ).bind(this),
      keyShortcut: 'togglePaused',
      onPress: __privateMethod(this, _PlayButton_instances, onPress_fn3).bind(
        this
      ),
    });
  }
  onSetup() {
    __privateSet(this, _media19, useMediaContext());
    const { paused, ended } = __privateGet(this, _media19).$state;
    this.setAttributes({
      'data-paused': paused,
      'data-ended': ended,
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'play');
    setARIALabel(el, 'Play');
  }
};
_media19 = new WeakMap();
_PlayButton_instances = new WeakSet();
onPress_fn3 = function (event2) {
  const remote = __privateGet(this, _media19).remote;
  __privateMethod(this, _PlayButton_instances, isPressed_fn3).call(this)
    ? remote.pause(event2)
    : remote.play(event2);
};
isPressed_fn3 = function () {
  const { paused } = __privateGet(this, _media19).$state;
  return !paused();
};
__publicField(PlayButton, 'props', ToggleButtonController.props);
var _media20, _CaptionButton_instances, onPress_fn4, isPressed_fn4, isHidden_fn;
var CaptionButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _CaptionButton_instances);
    __privateAdd(this, _media20);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _CaptionButton_instances,
        isPressed_fn4
      ).bind(this),
      keyShortcut: 'toggleCaptions',
      onPress: __privateMethod(
        this,
        _CaptionButton_instances,
        onPress_fn4
      ).bind(this),
    });
  }
  onSetup() {
    __privateSet(this, _media20, useMediaContext());
    this.setAttributes({
      'data-active': __privateMethod(
        this,
        _CaptionButton_instances,
        isPressed_fn4
      ).bind(this),
      'data-supported': () =>
        !__privateMethod(this, _CaptionButton_instances, isHidden_fn).call(
          this
        ),
      'aria-hidden': $ariaBool(
        __privateMethod(this, _CaptionButton_instances, isHidden_fn).bind(this)
      ),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'caption');
    setARIALabel(el, 'Captions');
  }
};
_media20 = new WeakMap();
_CaptionButton_instances = new WeakSet();
onPress_fn4 = function (event2) {
  __privateGet(this, _media20).remote.toggleCaptions(event2);
};
isPressed_fn4 = function () {
  const { textTrack } = __privateGet(this, _media20).$state,
    track = textTrack();
  return !!track && isTrackCaptionKind(track);
};
isHidden_fn = function () {
  const { hasCaptions } = __privateGet(this, _media20).$state;
  return !hasCaptions();
};
__publicField(CaptionButton, 'props', ToggleButtonController.props);
var _media21,
  _FullscreenButton_instances,
  onPress_fn5,
  isPressed_fn5,
  isSupported_fn;
var FullscreenButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _FullscreenButton_instances);
    __privateAdd(this, _media21);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _FullscreenButton_instances,
        isPressed_fn5
      ).bind(this),
      keyShortcut: 'toggleFullscreen',
      onPress: __privateMethod(
        this,
        _FullscreenButton_instances,
        onPress_fn5
      ).bind(this),
    });
  }
  onSetup() {
    __privateSet(this, _media21, useMediaContext());
    const { fullscreen } = __privateGet(this, _media21).$state,
      isSupported = __privateMethod(
        this,
        _FullscreenButton_instances,
        isSupported_fn
      ).bind(this);
    this.setAttributes({
      'data-active': fullscreen,
      'data-supported': isSupported,
      'aria-hidden': $ariaBool(() => !isSupported()),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'fullscreen');
    setARIALabel(el, 'Fullscreen');
  }
};
_media21 = new WeakMap();
_FullscreenButton_instances = new WeakSet();
onPress_fn5 = function (event2) {
  const remote = __privateGet(this, _media21).remote,
    target = this.$props.target();
  __privateMethod(this, _FullscreenButton_instances, isPressed_fn5).call(this)
    ? remote.exitFullscreen(target, event2)
    : remote.enterFullscreen(target, event2);
};
isPressed_fn5 = function () {
  const { fullscreen } = __privateGet(this, _media21).$state;
  return fullscreen();
};
isSupported_fn = function () {
  const { canFullscreen: canFullscreen2 } = __privateGet(this, _media21).$state;
  return canFullscreen2();
};
__publicField(FullscreenButton, 'props', {
  ...ToggleButtonController.props,
  target: 'prefer-media',
});
var _media22, _MuteButton_instances, onPress_fn6, isPressed_fn6, getState_fn3;
var MuteButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _MuteButton_instances);
    __privateAdd(this, _media22);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _MuteButton_instances,
        isPressed_fn6
      ).bind(this),
      keyShortcut: 'toggleMuted',
      onPress: __privateMethod(this, _MuteButton_instances, onPress_fn6).bind(
        this
      ),
    });
  }
  onSetup() {
    __privateSet(this, _media22, useMediaContext());
    this.setAttributes({
      'data-muted': __privateMethod(
        this,
        _MuteButton_instances,
        isPressed_fn6
      ).bind(this),
      'data-state': __privateMethod(
        this,
        _MuteButton_instances,
        getState_fn3
      ).bind(this),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-mute-button', '');
    el.setAttribute('data-media-tooltip', 'mute');
    setARIALabel(el, 'Mute');
  }
};
_media22 = new WeakMap();
_MuteButton_instances = new WeakSet();
onPress_fn6 = function (event2) {
  const remote = __privateGet(this, _media22).remote;
  __privateMethod(this, _MuteButton_instances, isPressed_fn6).call(this)
    ? remote.unmute(event2)
    : remote.mute(event2);
};
isPressed_fn6 = function () {
  const { muted, volume } = __privateGet(this, _media22).$state;
  return muted() || volume() === 0;
};
getState_fn3 = function () {
  const { muted, volume } = __privateGet(this, _media22).$state,
    $volume = volume();
  if (muted() || $volume === 0) return 'muted';
  else if ($volume >= 0.5) return 'high';
  else if ($volume < 0.5) return 'low';
};
__publicField(MuteButton, 'props', ToggleButtonController.props);
var _media23, _PIPButton_instances, onPress_fn7, isPressed_fn7, isSupported_fn2;
var PIPButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _PIPButton_instances);
    __privateAdd(this, _media23);
    new ToggleButtonController({
      isPresssed: __privateMethod(
        this,
        _PIPButton_instances,
        isPressed_fn7
      ).bind(this),
      keyShortcut: 'togglePictureInPicture',
      onPress: __privateMethod(this, _PIPButton_instances, onPress_fn7).bind(
        this
      ),
    });
  }
  onSetup() {
    __privateSet(this, _media23, useMediaContext());
    const { pictureInPicture } = __privateGet(this, _media23).$state,
      isSupported = __privateMethod(
        this,
        _PIPButton_instances,
        isSupported_fn2
      ).bind(this);
    this.setAttributes({
      'data-active': pictureInPicture,
      'data-supported': isSupported,
      'aria-hidden': $ariaBool(() => !isSupported()),
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-tooltip', 'pip');
    setARIALabel(el, 'PiP');
  }
};
_media23 = new WeakMap();
_PIPButton_instances = new WeakSet();
onPress_fn7 = function (event2) {
  const remote = __privateGet(this, _media23).remote;
  __privateMethod(this, _PIPButton_instances, isPressed_fn7).call(this)
    ? remote.exitPictureInPicture(event2)
    : remote.enterPictureInPicture(event2);
};
isPressed_fn7 = function () {
  const { pictureInPicture } = __privateGet(this, _media23).$state;
  return pictureInPicture();
};
isSupported_fn2 = function () {
  const { canPictureInPicture } = __privateGet(this, _media23).$state;
  return canPictureInPicture();
};
__publicField(PIPButton, 'props', ToggleButtonController.props);
var _media24,
  _SeekButton_instances,
  isSupported_fn3,
  getDefaultLabel_fn3,
  onPress_fn8;
var SeekButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _SeekButton_instances);
    __privateAdd(this, _media24);
    new FocusVisibleController();
  }
  onSetup() {
    __privateSet(this, _media24, useMediaContext());
    const { seeking } = __privateGet(this, _media24).$state,
      { seconds } = this.$props,
      isSupported = __privateMethod(
        this,
        _SeekButton_instances,
        isSupported_fn3
      ).bind(this);
    this.setAttributes({
      seconds,
      'data-seeking': seeking,
      'data-supported': isSupported,
      'aria-hidden': $ariaBool(() => !isSupported()),
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, 'tabindex', '0');
    setAttributeIfEmpty(el, 'role', 'button');
    setAttributeIfEmpty(el, 'type', 'button');
    el.setAttribute('data-media-tooltip', 'seek');
    setARIALabel(
      el,
      __privateMethod(this, _SeekButton_instances, getDefaultLabel_fn3).bind(
        this
      )
    );
  }
  onConnect(el) {
    onPress(
      el,
      __privateMethod(this, _SeekButton_instances, onPress_fn8).bind(this)
    );
  }
};
_media24 = new WeakMap();
_SeekButton_instances = new WeakSet();
isSupported_fn3 = function () {
  const { canSeek } = __privateGet(this, _media24).$state;
  return canSeek();
};
getDefaultLabel_fn3 = function () {
  const { seconds } = this.$props;
  return `Seek ${seconds() > 0 ? 'forward' : 'backward'} ${seconds()} seconds`;
};
onPress_fn8 = function (event2) {
  const { seconds, disabled } = this.$props;
  if (disabled()) return;
  const { currentTime } = __privateGet(this, _media24).$state,
    seekTo = currentTime() + seconds();
  __privateGet(this, _media24).remote.seek(seekTo, event2);
};
__publicField(SeekButton, 'props', {
  disabled: false,
  seconds: 30,
});
var _media25, _LiveButton_instances, onPress_fn9;
var LiveButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _LiveButton_instances);
    __privateAdd(this, _media25);
    new FocusVisibleController();
  }
  onSetup() {
    __privateSet(this, _media25, useMediaContext());
    const { disabled } = this.$props,
      { live, liveEdge } = __privateGet(this, _media25).$state,
      isHidden = () => !live();
    this.setAttributes({
      'data-edge': liveEdge,
      'data-hidden': isHidden,
      'aria-disabled': $ariaBool(() => disabled() || liveEdge()),
      'aria-hidden': $ariaBool(isHidden),
    });
  }
  onAttach(el) {
    setAttributeIfEmpty(el, 'tabindex', '0');
    setAttributeIfEmpty(el, 'role', 'button');
    setAttributeIfEmpty(el, 'type', 'button');
    el.setAttribute('data-media-tooltip', 'live');
  }
  onConnect(el) {
    onPress(
      el,
      __privateMethod(this, _LiveButton_instances, onPress_fn9).bind(this)
    );
  }
};
_media25 = new WeakMap();
_LiveButton_instances = new WeakSet();
onPress_fn9 = function (event2) {
  const { disabled } = this.$props,
    { liveEdge } = __privateGet(this, _media25).$state;
  if (disabled() || liveEdge()) return;
  __privateGet(this, _media25).remote.seekToLiveEdge(event2);
};
__publicField(LiveButton, 'props', {
  disabled: false,
});
var sliderState = new State({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  pointerValue: 0,
  focused: false,
  dragging: false,
  pointing: false,
  hidden: false,
  get active() {
    return this.dragging || this.focused || this.pointing;
  },
  get fillRate() {
    return calcRate(this.min, this.max, this.value);
  },
  get fillPercent() {
    return this.fillRate * 100;
  },
  get pointerRate() {
    return calcRate(this.min, this.max, this.pointerValue);
  },
  get pointerPercent() {
    return this.pointerRate * 100;
  },
});
function calcRate(min, max, value) {
  const range = max - min,
    offset = value - min;
  return range > 0 ? offset / range : 0;
}
var _init,
  _observer,
  _IntersectionObserverController_instances,
  onDisconnect_fn4;
var IntersectionObserverController = class extends ViewController {
  constructor(init2) {
    super();
    __privateAdd(this, _IntersectionObserverController_instances);
    __privateAdd(this, _init);
    __privateAdd(this, _observer);
    __privateSet(this, _init, init2);
  }
  onConnect(el) {
    __privateSet(
      this,
      _observer,
      new IntersectionObserver((entries) => {
        var _a6, _b2;
        (_b2 = (_a6 = __privateGet(this, _init)).callback) == null
          ? void 0
          : _b2.call(_a6, entries, __privateGet(this, _observer));
      }, __privateGet(this, _init))
    );
    __privateGet(this, _observer).observe(el);
    onDispose(
      __privateMethod(
        this,
        _IntersectionObserverController_instances,
        onDisconnect_fn4
      ).bind(this)
    );
  }
};
_init = new WeakMap();
_observer = new WeakMap();
_IntersectionObserverController_instances = new WeakSet();
/**
 * Disconnect any active intersection observers.
 */
onDisconnect_fn4 = function () {
  var _a6;
  (_a6 = __privateGet(this, _observer)) == null ? void 0 : _a6.disconnect();
  __privateSet(this, _observer, void 0);
};
var sliderContext = createContext();
var sliderObserverContext = createContext();
function getClampedValue(min, max, value, step) {
  return clampNumber(min, round(value, getNumberOfDecimalPlaces(step)), max);
}
function getValueFromRate(min, max, rate, step) {
  const boundRate = clampNumber(0, rate, 1),
    range = max - min,
    fill = range * boundRate,
    stepRatio = fill / step,
    steps = step * Math.round(stepRatio);
  return min + steps;
}
var SliderKeyDirection = {
  Left: -1,
  ArrowLeft: -1,
  Up: 1,
  ArrowUp: 1,
  Right: 1,
  ArrowRight: 1,
  Down: -1,
  ArrowDown: -1,
};
var _delegate3,
  _media26,
  _observer2,
  _SliderEventsController_instances,
  watchSwipeGesture_fn,
  _provider3,
  _touch,
  _touchStartValue,
  onTouchStart_fn,
  onTouchMove_fn,
  attachEventListeners_fn,
  attachPointerListeners_fn,
  onFocus_fn2,
  updateValue_fn,
  updatePointerValue_fn,
  getPointerValue_fn,
  onPointerEnter_fn2,
  onPointerMove_fn,
  onPointerLeave_fn2,
  onPointerDown_fn,
  onStartDragging_fn,
  onStopDragging_fn,
  _lastDownKey,
  _repeatedKeys,
  onKeyDown_fn2,
  onKeyUp_fn2,
  calcJumpValue_fn,
  calcNewKeyValue_fn,
  onDocumentPointerUp_fn,
  onDocumentTouchMove_fn,
  _onDocumentPointerMove;
var SliderEventsController = class extends ViewController {
  constructor(delegate, media) {
    super();
    __privateAdd(this, _SliderEventsController_instances);
    __privateAdd(this, _delegate3);
    __privateAdd(this, _media26);
    __privateAdd(this, _observer2);
    __privateAdd(this, _provider3, null);
    __privateAdd(this, _touch, null);
    __privateAdd(this, _touchStartValue, null);
    // -------------------------------------------------------------------------------------------
    // Keyboard Events
    // -------------------------------------------------------------------------------------------
    __privateAdd(this, _lastDownKey);
    __privateAdd(this, _repeatedKeys, false);
    __privateAdd(
      this,
      _onDocumentPointerMove,
      functionThrottle(
        (event2) => {
          __privateMethod(
            this,
            _SliderEventsController_instances,
            updatePointerValue_fn
          ).call(
            this,
            __privateMethod(
              this,
              _SliderEventsController_instances,
              getPointerValue_fn
            ).call(this, event2),
            event2
          );
        },
        20,
        { leading: true }
      )
    );
    __privateSet(this, _delegate3, delegate);
    __privateSet(this, _media26, media);
  }
  onSetup() {
    if (hasProvidedContext(sliderObserverContext)) {
      __privateSet(this, _observer2, useContext(sliderObserverContext));
    }
  }
  onConnect(el) {
    effect(
      __privateMethod(
        this,
        _SliderEventsController_instances,
        attachEventListeners_fn
      ).bind(this, el)
    );
    effect(
      __privateMethod(
        this,
        _SliderEventsController_instances,
        attachPointerListeners_fn
      ).bind(this, el)
    );
    if (__privateGet(this, _delegate3).swipeGesture)
      effect(
        __privateMethod(
          this,
          _SliderEventsController_instances,
          watchSwipeGesture_fn
        ).bind(this)
      );
  }
};
_delegate3 = new WeakMap();
_media26 = new WeakMap();
_observer2 = new WeakMap();
_SliderEventsController_instances = new WeakSet();
watchSwipeGesture_fn = function () {
  var _a6;
  const { pointer } = __privateGet(this, _media26).$state;
  if (
    pointer() !== 'coarse' ||
    !__privateGet(this, _delegate3).swipeGesture()
  ) {
    __privateSet(this, _provider3, null);
    return;
  }
  __privateSet(
    this,
    _provider3,
    (_a6 = __privateGet(this, _media26).player.el) == null
      ? void 0
      : _a6.querySelector('media-provider,[data-media-provider]')
  );
  if (!__privateGet(this, _provider3)) return;
  new EventsController(__privateGet(this, _provider3))
    .add(
      'touchstart',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onTouchStart_fn
      ).bind(this),
      {
        passive: true,
      }
    )
    .add(
      'touchmove',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onTouchMove_fn
      ).bind(this),
      { passive: false }
    );
};
_provider3 = new WeakMap();
_touch = new WeakMap();
_touchStartValue = new WeakMap();
onTouchStart_fn = function (event2) {
  __privateSet(this, _touch, event2.touches[0]);
};
onTouchMove_fn = function (event2) {
  if (isNull(__privateGet(this, _touch)) || isTouchPinchEvent(event2)) return;
  const touch = event2.touches[0],
    xDiff = touch.clientX - __privateGet(this, _touch).clientX,
    yDiff = touch.clientY - __privateGet(this, _touch).clientY,
    isDragging = this.$state.dragging();
  if (!isDragging && Math.abs(yDiff) > 5) {
    return;
  }
  if (isDragging) return;
  event2.preventDefault();
  if (Math.abs(xDiff) > 20) {
    __privateSet(this, _touch, touch);
    __privateSet(this, _touchStartValue, this.$state.value());
    __privateMethod(
      this,
      _SliderEventsController_instances,
      onStartDragging_fn
    ).call(this, __privateGet(this, _touchStartValue), event2);
  }
};
attachEventListeners_fn = function (el) {
  const { hidden } = this.$props;
  listenEvent(
    el,
    'focus',
    __privateMethod(this, _SliderEventsController_instances, onFocus_fn2).bind(
      this
    )
  );
  if (hidden() || __privateGet(this, _delegate3).isDisabled()) return;
  new EventsController(el)
    .add(
      'keyup',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onKeyUp_fn2
      ).bind(this)
    )
    .add(
      'keydown',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onKeyDown_fn2
      ).bind(this)
    )
    .add(
      'pointerenter',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onPointerEnter_fn2
      ).bind(this)
    )
    .add(
      'pointermove',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onPointerMove_fn
      ).bind(this)
    )
    .add(
      'pointerleave',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onPointerLeave_fn2
      ).bind(this)
    )
    .add(
      'pointerdown',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onPointerDown_fn
      ).bind(this)
    );
};
attachPointerListeners_fn = function (el) {
  if (__privateGet(this, _delegate3).isDisabled() || !this.$state.dragging())
    return;
  new EventsController(document)
    .add(
      'pointerup',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onDocumentPointerUp_fn
      ).bind(this),
      { capture: true }
    )
    .add('pointermove', __privateGet(this, _onDocumentPointerMove).bind(this))
    .add(
      'touchmove',
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onDocumentTouchMove_fn
      ).bind(this),
      {
        passive: false,
      }
    );
};
onFocus_fn2 = function () {
  __privateMethod(
    this,
    _SliderEventsController_instances,
    updatePointerValue_fn
  ).call(this, this.$state.value());
};
updateValue_fn = function (newValue, trigger) {
  var _a6, _b2, _c2, _d2;
  const { value, min, max, dragging } = this.$state;
  const clampedValue = Math.max(min(), Math.min(newValue, max()));
  value.set(clampedValue);
  const event2 = this.createEvent('value-change', {
    detail: clampedValue,
    trigger,
  });
  this.dispatch(event2);
  (_b2 = (_a6 = __privateGet(this, _delegate3)).onValueChange) == null
    ? void 0
    : _b2.call(_a6, event2);
  if (dragging()) {
    const event22 = this.createEvent('drag-value-change', {
      detail: clampedValue,
      trigger,
    });
    this.dispatch(event22);
    (_d2 = (_c2 = __privateGet(this, _delegate3)).onDragValueChange) == null
      ? void 0
      : _d2.call(_c2, event22);
  }
};
updatePointerValue_fn = function (value, trigger) {
  const { pointerValue, dragging } = this.$state;
  pointerValue.set(value);
  this.dispatch('pointer-value-change', { detail: value, trigger });
  if (dragging()) {
    __privateMethod(
      this,
      _SliderEventsController_instances,
      updateValue_fn
    ).call(this, value, trigger);
  }
};
getPointerValue_fn = function (event2) {
  let thumbPositionRate,
    rect = this.el.getBoundingClientRect(),
    { min, max } = this.$state;
  if (this.$props.orientation() === 'vertical') {
    const { bottom: trackBottom, height: trackHeight } = rect;
    thumbPositionRate = (trackBottom - event2.clientY) / trackHeight;
  } else {
    if (
      __privateGet(this, _touch) &&
      isNumber(__privateGet(this, _touchStartValue))
    ) {
      const { width } = __privateGet(this, _provider3).getBoundingClientRect(),
        rate = (event2.clientX - __privateGet(this, _touch).clientX) / width,
        range = max() - min(),
        diff = range * Math.abs(rate);
      thumbPositionRate =
        (rate < 0
          ? __privateGet(this, _touchStartValue) - diff
          : __privateGet(this, _touchStartValue) + diff) / range;
    } else {
      const { left: trackLeft, width: trackWidth } = rect;
      thumbPositionRate = (event2.clientX - trackLeft) / trackWidth;
    }
  }
  return Math.max(
    min(),
    Math.min(
      max(),
      __privateGet(this, _delegate3).roundValue(
        getValueFromRate(
          min(),
          max(),
          thumbPositionRate,
          __privateGet(this, _delegate3).getStep()
        )
      )
    )
  );
};
onPointerEnter_fn2 = function (event2) {
  this.$state.pointing.set(true);
};
onPointerMove_fn = function (event2) {
  const { dragging } = this.$state;
  if (dragging()) return;
  __privateMethod(
    this,
    _SliderEventsController_instances,
    updatePointerValue_fn
  ).call(
    this,
    __privateMethod(
      this,
      _SliderEventsController_instances,
      getPointerValue_fn
    ).call(this, event2),
    event2
  );
};
onPointerLeave_fn2 = function (event2) {
  this.$state.pointing.set(false);
};
onPointerDown_fn = function (event2) {
  if (event2.button !== 0) return;
  const value = __privateMethod(
    this,
    _SliderEventsController_instances,
    getPointerValue_fn
  ).call(this, event2);
  __privateMethod(
    this,
    _SliderEventsController_instances,
    onStartDragging_fn
  ).call(this, value, event2);
  __privateMethod(
    this,
    _SliderEventsController_instances,
    updatePointerValue_fn
  ).call(this, value, event2);
};
onStartDragging_fn = function (value, trigger) {
  var _a6, _b2, _c2, _d2;
  const { dragging } = this.$state;
  if (dragging()) return;
  dragging.set(true);
  __privateGet(this, _media26).remote.pauseControls(trigger);
  const event2 = this.createEvent('drag-start', { detail: value, trigger });
  this.dispatch(event2);
  (_b2 = (_a6 = __privateGet(this, _delegate3)).onDragStart) == null
    ? void 0
    : _b2.call(_a6, event2);
  (_d2 =
    (_c2 = __privateGet(this, _observer2)) == null
      ? void 0
      : _c2.onDragStart) == null
    ? void 0
    : _d2.call(_c2);
};
onStopDragging_fn = function (value, trigger) {
  var _a6, _b2, _c2, _d2;
  const { dragging } = this.$state;
  if (!dragging()) return;
  dragging.set(false);
  __privateGet(this, _media26).remote.resumeControls(trigger);
  const event2 = this.createEvent('drag-end', { detail: value, trigger });
  this.dispatch(event2);
  (_b2 = (_a6 = __privateGet(this, _delegate3)).onDragEnd) == null
    ? void 0
    : _b2.call(_a6, event2);
  __privateSet(this, _touch, null);
  __privateSet(this, _touchStartValue, null);
  (_d2 =
    (_c2 = __privateGet(this, _observer2)) == null ? void 0 : _c2.onDragEnd) ==
  null
    ? void 0
    : _d2.call(_c2);
};
_lastDownKey = new WeakMap();
_repeatedKeys = new WeakMap();
onKeyDown_fn2 = function (event2) {
  const isValidKey = Object.keys(SliderKeyDirection).includes(event2.key);
  if (!isValidKey) return;
  const { key } = event2,
    jumpValue = __privateMethod(
      this,
      _SliderEventsController_instances,
      calcJumpValue_fn
    ).call(this, event2);
  if (!isNull(jumpValue)) {
    __privateMethod(
      this,
      _SliderEventsController_instances,
      updatePointerValue_fn
    ).call(this, jumpValue, event2);
    __privateMethod(
      this,
      _SliderEventsController_instances,
      updateValue_fn
    ).call(this, jumpValue, event2);
    return;
  }
  const newValue = __privateMethod(
    this,
    _SliderEventsController_instances,
    calcNewKeyValue_fn
  ).call(this, event2);
  if (!__privateGet(this, _repeatedKeys)) {
    __privateSet(this, _repeatedKeys, key === __privateGet(this, _lastDownKey));
    if (!this.$state.dragging() && __privateGet(this, _repeatedKeys)) {
      __privateMethod(
        this,
        _SliderEventsController_instances,
        onStartDragging_fn
      ).call(this, newValue, event2);
    }
  }
  __privateMethod(
    this,
    _SliderEventsController_instances,
    updatePointerValue_fn
  ).call(this, newValue, event2);
  __privateSet(this, _lastDownKey, key);
};
onKeyUp_fn2 = function (event2) {
  const isValidKey = Object.keys(SliderKeyDirection).includes(event2.key);
  if (
    !isValidKey ||
    !isNull(
      __privateMethod(
        this,
        _SliderEventsController_instances,
        calcJumpValue_fn
      ).call(this, event2)
    )
  )
    return;
  const newValue = __privateGet(this, _repeatedKeys)
    ? this.$state.pointerValue()
    : __privateMethod(
        this,
        _SliderEventsController_instances,
        calcNewKeyValue_fn
      ).call(this, event2);
  __privateMethod(this, _SliderEventsController_instances, updateValue_fn).call(
    this,
    newValue,
    event2
  );
  __privateMethod(
    this,
    _SliderEventsController_instances,
    onStopDragging_fn
  ).call(this, newValue, event2);
  __privateSet(this, _lastDownKey, '');
  __privateSet(this, _repeatedKeys, false);
};
calcJumpValue_fn = function (event2) {
  let key = event2.key,
    { min, max } = this.$state;
  if (key === 'Home' || key === 'PageUp') {
    return min();
  } else if (key === 'End' || key === 'PageDown') {
    return max();
  } else if (!event2.metaKey && /^[0-9]$/.test(key)) {
    return ((max() - min()) / 10) * Number(key);
  }
  return null;
};
calcNewKeyValue_fn = function (event2) {
  var _a6, _b2;
  const { key, shiftKey } = event2;
  event2.preventDefault();
  event2.stopPropagation();
  const { shiftKeyMultiplier } = this.$props;
  const { min, max, value, pointerValue } = this.$state,
    step = __privateGet(this, _delegate3).getStep(),
    keyStep = __privateGet(this, _delegate3).getKeyStep();
  const modifiedStep = !shiftKey ? keyStep : keyStep * shiftKeyMultiplier(),
    direction = Number(SliderKeyDirection[key]),
    diff = modifiedStep * direction,
    currentValue = __privateGet(this, _repeatedKeys)
      ? pointerValue()
      : ((_b2 = (_a6 = __privateGet(this, _delegate3)).getValue) == null
          ? void 0
          : _b2.call(_a6)) ?? value(),
    steps = (currentValue + diff) / step;
  return Math.max(min(), Math.min(max(), Number((step * steps).toFixed(3))));
};
// -------------------------------------------------------------------------------------------
// Document (Pointer Events)
// -------------------------------------------------------------------------------------------
onDocumentPointerUp_fn = function (event2) {
  if (event2.button !== 0) return;
  event2.preventDefault();
  event2.stopImmediatePropagation();
  const value = __privateMethod(
    this,
    _SliderEventsController_instances,
    getPointerValue_fn
  ).call(this, event2);
  __privateMethod(
    this,
    _SliderEventsController_instances,
    updatePointerValue_fn
  ).call(this, value, event2);
  __privateMethod(
    this,
    _SliderEventsController_instances,
    onStopDragging_fn
  ).call(this, value, event2);
};
onDocumentTouchMove_fn = function (event2) {
  event2.preventDefault();
};
_onDocumentPointerMove = new WeakMap();
var sliderValueFormatContext = createContext(() => ({}));
var _media27,
  _delegate4,
  _isVisible,
  _isIntersecting,
  _SliderController_instances,
  onIntersectionChange_fn,
  watchHidden_fn,
  watchValue_fn,
  watchStep_fn,
  watchDisabled_fn,
  getARIADisabled_fn,
  setupAttrs_fn,
  watchCSSVars_fn,
  _updateSliderVars;
var SliderController = class extends ViewController {
  constructor(delegate) {
    super();
    __privateAdd(this, _SliderController_instances);
    __privateAdd(this, _media27);
    __privateAdd(this, _delegate4);
    __privateAdd(this, _isVisible, signal(true));
    __privateAdd(this, _isIntersecting, signal(true));
    __privateAdd(
      this,
      _updateSliderVars,
      animationFrameThrottle((fillPercent, pointerPercent) => {
        var _a6, _b2;
        (_a6 = this.el) == null
          ? void 0
          : _a6.style.setProperty('--slider-fill', fillPercent + '%');
        (_b2 = this.el) == null
          ? void 0
          : _b2.style.setProperty('--slider-pointer', pointerPercent + '%');
      })
    );
    __privateSet(this, _delegate4, delegate);
  }
  onSetup() {
    __privateSet(this, _media27, useMediaContext());
    const focus = new FocusVisibleController();
    focus.attach(this);
    this.$state.focused = focus.focused.bind(focus);
    if (!hasProvidedContext(sliderValueFormatContext)) {
      provideContext(sliderValueFormatContext, {
        default: 'value',
      });
    }
    provideContext(sliderContext, {
      orientation: this.$props.orientation,
      disabled: __privateGet(this, _delegate4).isDisabled,
      preview: signal(null),
    });
    effect(
      __privateMethod(this, _SliderController_instances, watchValue_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SliderController_instances, watchStep_fn).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SliderController_instances, watchDisabled_fn).bind(
        this
      )
    );
    __privateMethod(this, _SliderController_instances, setupAttrs_fn).call(
      this
    );
    new SliderEventsController(
      __privateGet(this, _delegate4),
      __privateGet(this, _media27)
    ).attach(this);
    new IntersectionObserverController({
      callback: __privateMethod(
        this,
        _SliderController_instances,
        onIntersectionChange_fn
      ).bind(this),
    }).attach(this);
  }
  onAttach(el) {
    setAttributeIfEmpty(el, 'role', 'slider');
    setAttributeIfEmpty(el, 'tabindex', '0');
    setAttributeIfEmpty(el, 'autocomplete', 'off');
    if (IS_SERVER)
      __privateMethod(this, _SliderController_instances, watchCSSVars_fn).call(
        this
      );
    else
      effect(
        __privateMethod(
          this,
          _SliderController_instances,
          watchCSSVars_fn
        ).bind(this)
      );
  }
  onConnect(el) {
    onDispose(observeVisibility(el, __privateGet(this, _isVisible).set));
    effect(
      __privateMethod(this, _SliderController_instances, watchHidden_fn).bind(
        this
      )
    );
  }
};
_media27 = new WeakMap();
_delegate4 = new WeakMap();
_isVisible = new WeakMap();
_isIntersecting = new WeakMap();
_SliderController_instances = new WeakSet();
onIntersectionChange_fn = function (entries) {
  __privateGet(this, _isIntersecting).set(entries[0].isIntersecting);
};
// -------------------------------------------------------------------------------------------
// Watch
// -------------------------------------------------------------------------------------------
watchHidden_fn = function () {
  const { hidden } = this.$props;
  this.$state.hidden.set(
    hidden() ||
      !__privateGet(this, _isVisible).call(this) ||
      !__privateGet(this, _isIntersecting).bind(this)
  );
};
watchValue_fn = function () {
  const { dragging, value, min, max } = this.$state;
  if (peek(dragging)) return;
  value.set(
    getClampedValue(
      min(),
      max(),
      value(),
      __privateGet(this, _delegate4).getStep()
    )
  );
};
watchStep_fn = function () {
  this.$state.step.set(__privateGet(this, _delegate4).getStep());
};
watchDisabled_fn = function () {
  if (!__privateGet(this, _delegate4).isDisabled()) return;
  const { dragging, pointing } = this.$state;
  dragging.set(false);
  pointing.set(false);
};
// -------------------------------------------------------------------------------------------
// ARIA
// -------------------------------------------------------------------------------------------
getARIADisabled_fn = function () {
  return ariaBool(__privateGet(this, _delegate4).isDisabled());
};
// -------------------------------------------------------------------------------------------
// Attributes
// -------------------------------------------------------------------------------------------
setupAttrs_fn = function () {
  const { orientation } = this.$props,
    { dragging, active, pointing } = this.$state;
  this.setAttributes({
    'data-dragging': dragging,
    'data-pointing': pointing,
    'data-active': active,
    'aria-disabled': __privateMethod(
      this,
      _SliderController_instances,
      getARIADisabled_fn
    ).bind(this),
    'aria-valuemin':
      __privateGet(this, _delegate4).aria.valueMin ?? this.$state.min,
    'aria-valuemax':
      __privateGet(this, _delegate4).aria.valueMax ?? this.$state.max,
    'aria-valuenow': __privateGet(this, _delegate4).aria.valueNow,
    'aria-valuetext': __privateGet(this, _delegate4).aria.valueText,
    'aria-orientation': orientation,
  });
};
watchCSSVars_fn = function () {
  const { fillPercent, pointerPercent } = this.$state;
  __privateGet(this, _updateSliderVars).call(
    this,
    round(fillPercent(), 3),
    round(pointerPercent(), 3)
  );
};
_updateSliderVars = new WeakMap();
__publicField(SliderController, 'props', {
  hidden: false,
  disabled: false,
  step: 1,
  keyStep: 1,
  orientation: 'horizontal',
  shiftKeyMultiplier: 5,
});
var _Slider_instances,
  getARIAValueNow_fn,
  getARIAValueText_fn,
  watchValue_fn2,
  watchMinMax_fn;
var Slider = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _Slider_instances);
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: this.$props.disabled,
      aria: {
        valueNow: __privateMethod(
          this,
          _Slider_instances,
          getARIAValueNow_fn
        ).bind(this),
        valueText: __privateMethod(
          this,
          _Slider_instances,
          getARIAValueText_fn
        ).bind(this),
      },
    });
  }
  onSetup() {
    effect(__privateMethod(this, _Slider_instances, watchValue_fn2).bind(this));
    effect(__privateMethod(this, _Slider_instances, watchMinMax_fn).bind(this));
  }
};
_Slider_instances = new WeakSet();
// -------------------------------------------------------------------------------------------
// Props
// -------------------------------------------------------------------------------------------
getARIAValueNow_fn = function () {
  const { value } = this.$state;
  return Math.round(value());
};
getARIAValueText_fn = function () {
  const { value, max } = this.$state;
  return round((value() / max()) * 100, 2) + '%';
};
// -------------------------------------------------------------------------------------------
// Watch
// -------------------------------------------------------------------------------------------
watchValue_fn2 = function () {
  const { value } = this.$props;
  this.$state.value.set(value());
};
watchMinMax_fn = function () {
  const { min, max } = this.$props;
  this.$state.min.set(min());
  this.$state.max.set(max());
};
__publicField(Slider, 'props', {
  ...SliderController.props,
  min: 0,
  max: 100,
  value: 0,
});
__publicField(Slider, 'state', sliderState);
var cache = /* @__PURE__ */ new Map();
var pending = /* @__PURE__ */ new Map();
var warned = /* @__PURE__ */ new Set();
var _media28,
  _src,
  _crossOrigin,
  _ThumbnailsLoader_instances,
  onLoadCues_fn,
  processImages_fn,
  processStoryboard_fn,
  processVTTCues_fn,
  resolveBaseUrl_fn,
  resolveURL_fn,
  resolveData_fn,
  onError_fn4;
var _ThumbnailsLoader = class _ThumbnailsLoader {
  constructor(src, crossOrigin, media) {
    __privateAdd(this, _ThumbnailsLoader_instances);
    __privateAdd(this, _media28);
    __privateAdd(this, _src);
    __privateAdd(this, _crossOrigin);
    __publicField(this, '$images', signal([]));
    __privateSet(this, _src, src);
    __privateSet(this, _crossOrigin, crossOrigin);
    __privateSet(this, _media28, media);
    effect(
      __privateMethod(this, _ThumbnailsLoader_instances, onLoadCues_fn).bind(
        this
      )
    );
  }
  static create(src, crossOrigin) {
    const media = useMediaContext();
    return new _ThumbnailsLoader(src, crossOrigin, media);
  }
};
_media28 = new WeakMap();
_src = new WeakMap();
_crossOrigin = new WeakMap();
_ThumbnailsLoader_instances = new WeakSet();
onLoadCues_fn = function () {
  var _a6;
  const { canLoad } = __privateGet(this, _media28).$state;
  if (!canLoad()) return;
  const src = __privateGet(this, _src).call(this);
  if (!src) return;
  if (isString(src) && cache.has(src)) {
    const cues = cache.get(src);
    cache.delete(src);
    cache.set(src, cues);
    if (cache.size > 99) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    this.$images.set(cache.get(src));
  } else if (isString(src)) {
    const crossOrigin = __privateGet(this, _crossOrigin).call(this),
      currentKey = src + '::' + crossOrigin;
    if (!pending.has(currentKey)) {
      const promise = new Promise(async (resolve, reject) => {
        try {
          const response = await fetch(src, {
              credentials: getRequestCredentials(crossOrigin),
            }),
            isJSON =
              response.headers.get('content-type') === 'application/json';
          if (isJSON) {
            const json = await response.json();
            if (isArray(json)) {
              if (json[0] && 'text' in json[0]) {
                resolve(
                  __privateMethod(
                    this,
                    _ThumbnailsLoader_instances,
                    processVTTCues_fn
                  ).call(this, json)
                );
              } else {
                for (let i = 0; i < json.length; i++) {
                  const image = json[i];
                  assert(isObject(image), `Item not an object at index ${i}`);
                  assert(
                    'url' in image && isString(image.url),
                    `Invalid or missing \`url\` property at index ${i}`
                  );
                  assert(
                    'startTime' in image && isNumber(image.startTime),
                    `Invalid or missing \`startTime\` property at index ${i}`
                  );
                }
                resolve(json);
              }
            } else {
              resolve(
                __privateMethod(
                  this,
                  _ThumbnailsLoader_instances,
                  processStoryboard_fn
                ).call(this, json)
              );
            }
            return;
          }
          import('./dev-3UBCCOPC.js').then(async ({ parseResponse }) => {
            try {
              const { cues } = await parseResponse(response);
              resolve(
                __privateMethod(
                  this,
                  _ThumbnailsLoader_instances,
                  processVTTCues_fn
                ).call(this, cues)
              );
            } catch (e) {
              reject(e);
            }
          });
        } catch (e) {
          reject(e);
        }
      })
        .then((images) => {
          cache.set(currentKey, images);
          return images;
        })
        .catch((error) => {
          __privateMethod(this, _ThumbnailsLoader_instances, onError_fn4).call(
            this,
            src,
            error
          );
        })
        .finally(() => {
          if (isString(currentKey)) pending.delete(currentKey);
        });
      pending.set(currentKey, promise);
    }
    (_a6 = pending.get(currentKey)) == null
      ? void 0
      : _a6.then((images) => {
          this.$images.set(images || []);
        });
  } else if (isArray(src)) {
    try {
      this.$images.set(
        __privateMethod(
          this,
          _ThumbnailsLoader_instances,
          processImages_fn
        ).call(this, src)
      );
    } catch (error) {
      __privateMethod(this, _ThumbnailsLoader_instances, onError_fn4).call(
        this,
        src,
        error
      );
    }
  } else {
    try {
      this.$images.set(
        __privateMethod(
          this,
          _ThumbnailsLoader_instances,
          processStoryboard_fn
        ).call(this, src)
      );
    } catch (error) {
      __privateMethod(this, _ThumbnailsLoader_instances, onError_fn4).call(
        this,
        src,
        error
      );
    }
  }
  return () => {
    this.$images.set([]);
  };
};
processImages_fn = function (images) {
  const baseURL = __privateMethod(
    this,
    _ThumbnailsLoader_instances,
    resolveBaseUrl_fn
  ).call(this);
  return images.map((img, i) => {
    assert(
      img.url && isString(img.url),
      `Invalid or missing \`url\` property at index ${i}`
    );
    assert(
      'startTime' in img && isNumber(img.startTime),
      `Invalid or missing \`startTime\` property at index ${i}`
    );
    return {
      ...img,
      url: isString(img.url)
        ? __privateMethod(
            this,
            _ThumbnailsLoader_instances,
            resolveURL_fn
          ).call(this, img.url, baseURL)
        : img.url,
    };
  });
};
processStoryboard_fn = function (board) {
  var _a6;
  assert(isString(board.url), 'Missing `url` in storyboard object');
  assert(
    isArray(board.tiles) && ((_a6 = board.tiles) == null ? void 0 : _a6.length),
    `Empty tiles in storyboard`
  );
  const url = new URL(board.url),
    images = [];
  const tileWidth = 'tile_width' in board ? board.tile_width : board.tileWidth,
    tileHeight = 'tile_height' in board ? board.tile_height : board.tileHeight;
  for (const tile of board.tiles) {
    images.push({
      url,
      startTime: 'start' in tile ? tile.start : tile.startTime,
      width: tileWidth,
      height: tileHeight,
      coords: { x: tile.x, y: tile.y },
    });
  }
  return images;
};
processVTTCues_fn = function (cues) {
  for (let i = 0; i < cues.length; i++) {
    const cue = cues[i];
    assert(
      'startTime' in cue && isNumber(cue.startTime),
      `Invalid or missing \`startTime\` property at index ${i}`
    );
    assert(
      'text' in cue && isString(cue.text),
      `Invalid or missing \`text\` property at index ${i}`
    );
  }
  const images = [],
    baseURL = __privateMethod(
      this,
      _ThumbnailsLoader_instances,
      resolveBaseUrl_fn
    ).call(this);
  for (const cue of cues) {
    const [url, hash] = cue.text.split('#'),
      data = __privateMethod(
        this,
        _ThumbnailsLoader_instances,
        resolveData_fn
      ).call(this, hash);
    images.push({
      url: __privateMethod(
        this,
        _ThumbnailsLoader_instances,
        resolveURL_fn
      ).call(this, url, baseURL),
      startTime: cue.startTime,
      endTime: cue.endTime,
      width: data == null ? void 0 : data.w,
      height: data == null ? void 0 : data.h,
      coords:
        data && isNumber(data.x) && isNumber(data.y)
          ? { x: data.x, y: data.y }
          : void 0,
    });
  }
  return images;
};
resolveBaseUrl_fn = function () {
  let baseURL = peek(__privateGet(this, _src));
  if (!isString(baseURL) || !/^https?:/.test(baseURL)) {
    return location.href;
  }
  return baseURL;
};
resolveURL_fn = function (src, baseURL) {
  return /^https?:/.test(src) ? new URL(src) : new URL(src, baseURL);
};
resolveData_fn = function (hash) {
  if (!hash) return {};
  const [hashProps, values] = hash.split('='),
    hashValues = values == null ? void 0 : values.split(','),
    data = {};
  if (!hashProps || !hashValues) {
    return null;
  }
  for (let i = 0; i < hashProps.length; i++) {
    const value = +hashValues[i];
    if (!isNaN(value)) data[hashProps[i]] = value;
  }
  return data;
};
onError_fn4 = function (src, error) {
  var _a6;
  if (warned == null ? void 0 : warned.has(src)) return;
  (_a6 = __privateGet(this, _media28).logger) == null
    ? void 0
    : _a6
        .errorGroup('[vidstack] failed to load thumbnails')
        .labelledLog('Src', src)
        .labelledLog('Error', error)
        .dispatch();
  warned == null ? void 0 : warned.add(src);
};
var ThumbnailsLoader = _ThumbnailsLoader;
var _loader3,
  _styleResets,
  _Thumbnail_instances,
  watchImg_fn,
  watchCrossOrigin_fn2,
  onLoadStart_fn3,
  onLoaded_fn2,
  onError_fn5,
  isLoading_fn,
  hasError_fn,
  watchHidden_fn2,
  onFindActiveThumbnail_fn,
  resize_fn,
  style_fn,
  resetStyles_fn;
var Thumbnail = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Thumbnail_instances);
    __publicField(this, 'media');
    __privateAdd(this, _loader3);
    __privateAdd(this, _styleResets, []);
  }
  onSetup() {
    this.media = useMediaContext();
    __privateSet(
      this,
      _loader3,
      ThumbnailsLoader.create(this.$props.src, this.$state.crossOrigin)
    );
    __privateMethod(this, _Thumbnail_instances, watchCrossOrigin_fn2).call(
      this
    );
    this.setAttributes({
      'data-loading': __privateMethod(
        this,
        _Thumbnail_instances,
        isLoading_fn
      ).bind(this),
      'data-error': __privateMethod(
        this,
        _Thumbnail_instances,
        hasError_fn
      ).bind(this),
      'data-hidden': this.$state.hidden,
      'aria-hidden': $ariaBool(this.$state.hidden),
    });
  }
  onConnect(el) {
    effect(__privateMethod(this, _Thumbnail_instances, watchImg_fn).bind(this));
    effect(
      __privateMethod(this, _Thumbnail_instances, watchHidden_fn2).bind(this)
    );
    effect(
      __privateMethod(this, _Thumbnail_instances, watchCrossOrigin_fn2).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _Thumbnail_instances, onLoadStart_fn3).bind(this)
    );
    effect(
      __privateMethod(
        this,
        _Thumbnail_instances,
        onFindActiveThumbnail_fn
      ).bind(this)
    );
    effect(__privateMethod(this, _Thumbnail_instances, resize_fn).bind(this));
  }
  getTime() {
    return this.$props.time();
  }
};
_loader3 = new WeakMap();
_styleResets = new WeakMap();
_Thumbnail_instances = new WeakSet();
watchImg_fn = function () {
  const img = this.$state.img();
  if (!img) return;
  new EventsController(img)
    .add(
      'load',
      __privateMethod(this, _Thumbnail_instances, onLoaded_fn2).bind(this)
    )
    .add(
      'error',
      __privateMethod(this, _Thumbnail_instances, onError_fn5).bind(this)
    );
};
watchCrossOrigin_fn2 = function () {
  const { crossOrigin: crossOriginProp } = this.$props,
    { crossOrigin: crossOriginState } = this.$state,
    { crossOrigin: mediaCrossOrigin } = this.media.$state,
    crossOrigin =
      crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
  crossOriginState.set(crossOrigin === true ? 'anonymous' : crossOrigin);
};
onLoadStart_fn3 = function () {
  const { src, loading, error } = this.$state;
  if (src()) {
    loading.set(true);
    error.set(null);
  }
  return () => {
    __privateMethod(this, _Thumbnail_instances, resetStyles_fn).call(this);
    loading.set(false);
    error.set(null);
  };
};
onLoaded_fn2 = function () {
  const { loading, error } = this.$state;
  __privateMethod(this, _Thumbnail_instances, resize_fn).call(this);
  loading.set(false);
  error.set(null);
};
onError_fn5 = function (event2) {
  const { loading, error } = this.$state;
  loading.set(false);
  error.set(event2);
};
isLoading_fn = function () {
  const { loading, hidden } = this.$state;
  return !hidden() && loading();
};
hasError_fn = function () {
  const { error } = this.$state;
  return !isNull(error());
};
watchHidden_fn2 = function () {
  const { hidden } = this.$state,
    { duration } = this.media.$state,
    images = __privateGet(this, _loader3).$images();
  hidden.set(
    __privateMethod(this, _Thumbnail_instances, hasError_fn).call(this) ||
      !Number.isFinite(duration()) ||
      images.length === 0
  );
};
onFindActiveThumbnail_fn = function () {
  let images = __privateGet(this, _loader3).$images();
  if (!images.length) return;
  let time = this.getTime(),
    { src, activeThumbnail } = this.$state,
    activeIndex = -1,
    activeImage = null;
  for (let i = images.length - 1; i >= 0; i--) {
    const image = images[i];
    if (time >= image.startTime && (!image.endTime || time < image.endTime)) {
      activeIndex = i;
      break;
    }
  }
  if (images[activeIndex]) {
    activeImage = images[activeIndex];
  }
  activeThumbnail.set(activeImage);
  src.set((activeImage == null ? void 0 : activeImage.url.href) || '');
};
resize_fn = function () {
  if (!this.scope || this.$state.hidden()) return;
  const rootEl = this.el,
    imgEl = this.$state.img(),
    thumbnail = this.$state.activeThumbnail();
  if (!imgEl || !thumbnail || !rootEl) return;
  let width = thumbnail.width ?? imgEl.naturalWidth,
    height =
      (thumbnail == null ? void 0 : thumbnail.height) ?? imgEl.naturalHeight,
    {
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      width: elWidth,
      height: elHeight,
    } = getComputedStyle(this.el);
  if (minWidth === '100%') minWidth = parseFloat(elWidth) + '';
  if (minHeight === '100%') minHeight = parseFloat(elHeight) + '';
  let minRatio = Math.max(
      parseInt(minWidth) / width,
      parseInt(minHeight) / height
    ),
    maxRatio = Math.min(
      Math.max(parseInt(minWidth), parseInt(maxWidth)) / width,
      Math.max(parseInt(minHeight), parseInt(maxHeight)) / height
    ),
    scale =
      !isNaN(maxRatio) && maxRatio < 1 ? maxRatio : minRatio > 1 ? minRatio : 1;
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    rootEl,
    '--thumbnail-width',
    `${width * scale}px`
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    rootEl,
    '--thumbnail-height',
    `${height * scale}px`
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    rootEl,
    '--thumbnail-aspect-ratio',
    String(round(width / height, 5))
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    imgEl,
    'width',
    `${imgEl.naturalWidth * scale}px`
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    imgEl,
    'height',
    `${imgEl.naturalHeight * scale}px`
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    imgEl,
    'transform',
    thumbnail.coords
      ? `translate(-${thumbnail.coords.x * scale}px, -${
          thumbnail.coords.y * scale
        }px)`
      : ''
  );
  __privateMethod(this, _Thumbnail_instances, style_fn).call(
    this,
    imgEl,
    'max-width',
    'none'
  );
};
style_fn = function (el, name, value) {
  el.style.setProperty(name, value);
  __privateGet(this, _styleResets).push(() => el.style.removeProperty(name));
};
resetStyles_fn = function () {
  for (const reset of __privateGet(this, _styleResets)) reset();
  __privateSet(this, _styleResets, []);
};
__publicField(Thumbnail, 'props', {
  src: null,
  time: 0,
  crossOrigin: null,
});
__publicField(
  Thumbnail,
  'state',
  new State({
    src: '',
    img: null,
    thumbnails: [],
    activeThumbnail: null,
    crossOrigin: null,
    loading: false,
    error: null,
    hidden: false,
  })
);
var _slider;
var SliderThumbnail = class extends Thumbnail {
  constructor() {
    super(...arguments);
    __privateAdd(this, _slider);
  }
  onAttach(el) {
    __privateSet(this, _slider, useState(Slider.state));
  }
  getTime() {
    const { duration, clipStartTime } = this.media.$state;
    return (
      clipStartTime() + __privateGet(this, _slider).pointerRate() * duration()
    );
  }
};
_slider = new WeakMap();
var _media29,
  _slider2,
  _SliderVideo_instances,
  watchVideo_fn,
  watchSrc_fn,
  watchCrossOrigin_fn3,
  isLoading_fn2,
  hasError_fn2,
  watchHidden_fn3,
  onSrcChange_fn,
  onCanPlay_fn2,
  onError_fn6,
  onUpdateTime_fn;
var SliderVideo = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _SliderVideo_instances);
    __privateAdd(this, _media29);
    __privateAdd(this, _slider2);
  }
  get video() {
    return this.$state.video();
  }
  onSetup() {
    __privateSet(this, _media29, useMediaContext());
    __privateSet(this, _slider2, useState(Slider.state));
    __privateMethod(this, _SliderVideo_instances, watchCrossOrigin_fn3).call(
      this
    );
    this.setAttributes({
      'data-loading': __privateMethod(
        this,
        _SliderVideo_instances,
        isLoading_fn2
      ).bind(this),
      'data-hidden': this.$state.hidden,
      'data-error': __privateMethod(
        this,
        _SliderVideo_instances,
        hasError_fn2
      ).bind(this),
      'aria-hidden': $ariaBool(this.$state.hidden),
    });
  }
  onAttach(el) {
    effect(
      __privateMethod(this, _SliderVideo_instances, watchVideo_fn).bind(this)
    );
    effect(
      __privateMethod(this, _SliderVideo_instances, watchSrc_fn).bind(this)
    );
    effect(
      __privateMethod(this, _SliderVideo_instances, watchCrossOrigin_fn3).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _SliderVideo_instances, watchHidden_fn3).bind(this)
    );
    effect(
      __privateMethod(this, _SliderVideo_instances, onSrcChange_fn).bind(this)
    );
    effect(
      __privateMethod(this, _SliderVideo_instances, onUpdateTime_fn).bind(this)
    );
  }
};
_media29 = new WeakMap();
_slider2 = new WeakMap();
_SliderVideo_instances = new WeakSet();
watchVideo_fn = function () {
  const video = this.$state.video();
  if (!video) return;
  if (video.readyState >= 2)
    __privateMethod(this, _SliderVideo_instances, onCanPlay_fn2).call(this);
  new EventsController(video)
    .add(
      'canplay',
      __privateMethod(this, _SliderVideo_instances, onCanPlay_fn2).bind(this)
    )
    .add(
      'error',
      __privateMethod(this, _SliderVideo_instances, onError_fn6).bind(this)
    );
};
watchSrc_fn = function () {
  const { src } = this.$state,
    { canLoad } = __privateGet(this, _media29).$state;
  src.set(canLoad() ? this.$props.src() : null);
};
watchCrossOrigin_fn3 = function () {
  const { crossOrigin: crossOriginProp } = this.$props,
    { crossOrigin: crossOriginState } = this.$state,
    { crossOrigin: mediaCrossOrigin } = __privateGet(this, _media29).$state,
    crossOrigin =
      crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
  crossOriginState.set(crossOrigin === true ? 'anonymous' : crossOrigin);
};
isLoading_fn2 = function () {
  const { canPlay, hidden } = this.$state;
  return !canPlay() && !hidden();
};
hasError_fn2 = function () {
  const { error } = this.$state;
  return !isNull(error);
};
watchHidden_fn3 = function () {
  const { src, hidden } = this.$state,
    { canLoad, duration } = __privateGet(this, _media29).$state;
  hidden.set(
    canLoad() &&
      (!src() ||
        __privateMethod(this, _SliderVideo_instances, hasError_fn2).call(
          this
        ) ||
        !Number.isFinite(duration()))
  );
};
onSrcChange_fn = function () {
  const { src, canPlay, error } = this.$state;
  src();
  canPlay.set(false);
  error.set(null);
};
onCanPlay_fn2 = function (event2) {
  const { canPlay, error } = this.$state;
  canPlay.set(true);
  error.set(null);
  this.dispatch('can-play', { trigger: event2 });
};
onError_fn6 = function (event2) {
  const { canPlay, error } = this.$state;
  canPlay.set(false);
  error.set(event2);
  this.dispatch('error', { trigger: event2 });
};
onUpdateTime_fn = function () {
  const { video, canPlay } = this.$state,
    { duration } = __privateGet(this, _media29).$state,
    { pointerRate } = __privateGet(this, _slider2),
    media = video(),
    canUpdate =
      canPlay() &&
      media &&
      Number.isFinite(duration()) &&
      Number.isFinite(pointerRate());
  if (canUpdate) {
    media.currentTime = pointerRate() * duration();
  }
};
__publicField(SliderVideo, 'props', {
  src: null,
  crossOrigin: null,
});
__publicField(
  SliderVideo,
  'state',
  new State({
    video: null,
    src: null,
    crossOrigin: null,
    canPlay: false,
    error: null,
    hidden: false,
  })
);
var slidervideo__proto = SliderVideo.prototype;
prop(slidervideo__proto, 'video');
var _format, _text, _slider3;
var SliderValue = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _format);
    __privateAdd(this, _text);
    __privateAdd(this, _slider3);
  }
  onSetup() {
    __privateSet(this, _slider3, useState(Slider.state));
    __privateSet(this, _format, useContext(sliderValueFormatContext));
    __privateSet(this, _text, computed(this.getValueText.bind(this)));
  }
  /**
   * Returns the current value formatted as text based on prop settings.
   */
  getValueText() {
    var _a6, _b2;
    const {
        type,
        format: $format,
        decimalPlaces,
        padHours,
        padMinutes,
        showHours,
        showMs,
      } = this.$props,
      {
        value: sliderValue,
        pointerValue,
        min,
        max,
      } = __privateGet(this, _slider3),
      format =
        ($format == null ? void 0 : $format()) ??
        __privateGet(this, _format).default;
    const value = type() === 'current' ? sliderValue() : pointerValue();
    if (format === 'percent') {
      const range = max() - min();
      const percent = (value / range) * 100;
      return (
        (__privateGet(this, _format).percent ?? round)(
          percent,
          decimalPlaces()
        ) + '%'
      );
    } else if (format === 'time') {
      return (__privateGet(this, _format).time ?? formatTime)(value, {
        padHrs: padHours(),
        padMins: padMinutes(),
        showHrs: showHours(),
        showMs: showMs(),
      });
    } else {
      return (
        (((_b2 = (_a6 = __privateGet(this, _format)).value) == null
          ? void 0
          : _b2.call(_a6, value)) ?? value.toFixed(2)) + ''
      );
    }
  }
};
_format = new WeakMap();
_text = new WeakMap();
_slider3 = new WeakMap();
__publicField(SliderValue, 'props', {
  type: 'pointer',
  format: null,
  showHours: false,
  showMs: false,
  padHours: null,
  padMinutes: null,
  decimalPlaces: 2,
});
var slidervalue__proto = SliderValue.prototype;
method(slidervalue__proto, 'getValueText');
var _slider4, _updatePlacement;
var SliderPreview = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _slider4);
    __privateAdd(
      this,
      _updatePlacement,
      animationFrameThrottle(() => {
        const { disabled, orientation } = __privateGet(this, _slider4);
        if (disabled()) return;
        const el = this.el,
          { offset, noClamp } = this.$props;
        if (!el) return;
        updateSliderPreviewPlacement(el, {
          clamp: !noClamp(),
          offset: offset(),
          orientation: orientation(),
        });
      })
    );
  }
  onSetup() {
    __privateSet(this, _slider4, useContext(sliderContext));
    const { active } = useState(Slider.state);
    this.setAttributes({
      'data-visible': active,
    });
  }
  onAttach(el) {
    Object.assign(el.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      width: 'max-content',
    });
  }
  onConnect(el) {
    const { preview } = __privateGet(this, _slider4);
    preview.set(el);
    onDispose(() => preview.set(null));
    effect(__privateGet(this, _updatePlacement).bind(this));
    const resize = new ResizeObserver(
      __privateGet(this, _updatePlacement).bind(this)
    );
    resize.observe(el);
    onDispose(() => resize.disconnect());
  }
};
_slider4 = new WeakMap();
_updatePlacement = new WeakMap();
__publicField(SliderPreview, 'props', {
  offset: 0,
  noClamp: false,
});
function updateSliderPreviewPlacement(el, { clamp, offset, orientation }) {
  const computedStyle = getComputedStyle(el),
    width = parseFloat(computedStyle.width),
    height = parseFloat(computedStyle.height),
    styles = {
      top: null,
      right: null,
      bottom: null,
      left: null,
    };
  styles[
    orientation === 'horizontal' ? 'bottom' : 'left'
  ] = `calc(100% + var(--media-slider-preview-offset, ${offset}px))`;
  if (orientation === 'horizontal') {
    const widthHalf = width / 2;
    if (!clamp) {
      styles.left = `calc(var(--slider-pointer) - ${widthHalf}px)`;
    } else {
      const leftClamp = `max(0px, calc(var(--slider-pointer) - ${widthHalf}px))`,
        rightClamp = `calc(100% - ${width}px)`;
      styles.left = `min(${leftClamp}, ${rightClamp})`;
    }
  } else {
    const heightHalf = height / 2;
    if (!clamp) {
      styles.bottom = `calc(var(--slider-pointer) - ${heightHalf}px)`;
    } else {
      const topClamp = `max(${heightHalf}px, calc(var(--slider-pointer) - ${heightHalf}px))`,
        bottomClamp = `calc(100% - ${height}px)`;
      styles.bottom = `min(${topClamp}, ${bottomClamp})`;
    }
  }
  Object.assign(el.style, styles);
}
var _media30,
  _VolumeSlider_instances,
  getARIAValueNow_fn2,
  getARIAValueText_fn2,
  getARIAValueMax_fn,
  isDisabled_fn,
  watchVolume_fn3,
  _throttleVolumeChange,
  onVolumeChange_fn2,
  onValueChange_fn,
  onDragValueChange_fn;
var VolumeSlider = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _VolumeSlider_instances);
    __privateAdd(this, _media30);
    __privateAdd(
      this,
      _throttleVolumeChange,
      functionThrottle(
        __privateMethod(this, _VolumeSlider_instances, onVolumeChange_fn2).bind(
          this
        ),
        25
      )
    );
  }
  onSetup() {
    __privateSet(this, _media30, useMediaContext());
    const { audioGain } = __privateGet(this, _media30).$state;
    provideContext(sliderValueFormatContext, {
      default: 'percent',
      value(value) {
        return (value * (audioGain() ?? 1)).toFixed(2);
      },
      percent(value) {
        return Math.round(value * (audioGain() ?? 1));
      },
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: __privateMethod(
        this,
        _VolumeSlider_instances,
        isDisabled_fn
      ).bind(this),
      aria: {
        valueMax: __privateMethod(
          this,
          _VolumeSlider_instances,
          getARIAValueMax_fn
        ).bind(this),
        valueNow: __privateMethod(
          this,
          _VolumeSlider_instances,
          getARIAValueNow_fn2
        ).bind(this),
        valueText: __privateMethod(
          this,
          _VolumeSlider_instances,
          getARIAValueText_fn2
        ).bind(this),
      },
      onDragValueChange: __privateMethod(
        this,
        _VolumeSlider_instances,
        onDragValueChange_fn
      ).bind(this),
      onValueChange: __privateMethod(
        this,
        _VolumeSlider_instances,
        onValueChange_fn
      ).bind(this),
    }).attach(this);
    effect(
      __privateMethod(this, _VolumeSlider_instances, watchVolume_fn3).bind(this)
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-volume-slider', '');
    setAttributeIfEmpty(el, 'aria-label', 'Volume');
    const { canSetVolume } = __privateGet(this, _media30).$state;
    this.setAttributes({
      'data-supported': canSetVolume,
      'aria-hidden': $ariaBool(() => !canSetVolume()),
    });
  }
};
_media30 = new WeakMap();
_VolumeSlider_instances = new WeakSet();
getARIAValueNow_fn2 = function () {
  const { value } = this.$state,
    { audioGain } = __privateGet(this, _media30).$state;
  return Math.round(value() * (audioGain() ?? 1));
};
getARIAValueText_fn2 = function () {
  const { value, max } = this.$state,
    { audioGain } = __privateGet(this, _media30).$state;
  return round((value() / max()) * (audioGain() ?? 1) * 100, 2) + '%';
};
getARIAValueMax_fn = function () {
  const { audioGain } = __privateGet(this, _media30).$state;
  return this.$state.max() * (audioGain() ?? 1);
};
isDisabled_fn = function () {
  const { disabled } = this.$props,
    { canSetVolume } = __privateGet(this, _media30).$state;
  return disabled() || !canSetVolume();
};
watchVolume_fn3 = function () {
  const { muted, volume } = __privateGet(this, _media30).$state;
  const newValue = muted() ? 0 : volume() * 100;
  this.$state.value.set(newValue);
  this.dispatch('value-change', { detail: newValue });
};
_throttleVolumeChange = new WeakMap();
onVolumeChange_fn2 = function (event2) {
  if (!event2.trigger) return;
  const mediaVolume = round(event2.detail / 100, 3);
  __privateGet(this, _media30).remote.changeVolume(mediaVolume, event2);
};
onValueChange_fn = function (event2) {
  __privateGet(this, _throttleVolumeChange).call(this, event2);
};
onDragValueChange_fn = function (event2) {
  __privateGet(this, _throttleVolumeChange).call(this, event2);
};
__publicField(VolumeSlider, 'props', {
  ...SliderController.props,
  keyStep: 5,
  shiftKeyMultiplier: 2,
});
__publicField(VolumeSlider, 'state', sliderState);
var _media31,
  _AudioGainSlider_instances,
  getARIAValueNow_fn3,
  getARIAValueText_fn3,
  watchMinMax_fn2,
  watchAudioGain_fn,
  isDisabled_fn2,
  onAudioGainChange_fn,
  onValueChange_fn2,
  onDragValueChange_fn2;
var AudioGainSlider = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _AudioGainSlider_instances);
    __privateAdd(this, _media31);
  }
  onSetup() {
    __privateSet(this, _media31, useMediaContext());
    provideContext(sliderValueFormatContext, {
      default: 'percent',
      percent: (_, decimalPlaces) => {
        return round(this.$state.value(), decimalPlaces) + '%';
      },
    });
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: __privateMethod(
        this,
        _AudioGainSlider_instances,
        isDisabled_fn2
      ).bind(this),
      aria: {
        valueNow: __privateMethod(
          this,
          _AudioGainSlider_instances,
          getARIAValueNow_fn3
        ).bind(this),
        valueText: __privateMethod(
          this,
          _AudioGainSlider_instances,
          getARIAValueText_fn3
        ).bind(this),
      },
      onDragValueChange: __privateMethod(
        this,
        _AudioGainSlider_instances,
        onDragValueChange_fn2
      ).bind(this),
      onValueChange: __privateMethod(
        this,
        _AudioGainSlider_instances,
        onValueChange_fn2
      ).bind(this),
    }).attach(this);
    effect(
      __privateMethod(this, _AudioGainSlider_instances, watchMinMax_fn2).bind(
        this
      )
    );
    effect(
      __privateMethod(this, _AudioGainSlider_instances, watchAudioGain_fn).bind(
        this
      )
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-audio-gain-slider', '');
    setAttributeIfEmpty(el, 'aria-label', 'Audio Boost');
    const { canSetAudioGain } = __privateGet(this, _media31).$state;
    this.setAttributes({
      'data-supported': canSetAudioGain,
      'aria-hidden': $ariaBool(() => !canSetAudioGain()),
    });
  }
};
_media31 = new WeakMap();
_AudioGainSlider_instances = new WeakSet();
getARIAValueNow_fn3 = function () {
  const { value } = this.$state;
  return Math.round(value());
};
getARIAValueText_fn3 = function () {
  const { value } = this.$state;
  return value() + '%';
};
watchMinMax_fn2 = function () {
  const { min, max } = this.$props;
  this.$state.min.set(min());
  this.$state.max.set(max());
};
watchAudioGain_fn = function () {
  const { audioGain } = __privateGet(this, _media31).$state,
    value = ((audioGain() ?? 1) - 1) * 100;
  this.$state.value.set(value);
  this.dispatch('value-change', { detail: value });
};
isDisabled_fn2 = function () {
  const { disabled } = this.$props,
    { canSetAudioGain } = __privateGet(this, _media31).$state;
  return disabled() || !canSetAudioGain();
};
onAudioGainChange_fn = function (event2) {
  if (!event2.trigger) return;
  const gain = round(1 + event2.detail / 100, 2);
  __privateGet(this, _media31).remote.changeAudioGain(gain, event2);
};
onValueChange_fn2 = function (event2) {
  __privateMethod(this, _AudioGainSlider_instances, onAudioGainChange_fn).call(
    this,
    event2
  );
};
onDragValueChange_fn2 = function (event2) {
  __privateMethod(this, _AudioGainSlider_instances, onAudioGainChange_fn).call(
    this,
    event2
  );
};
__publicField(AudioGainSlider, 'props', {
  ...SliderController.props,
  step: 25,
  keyStep: 25,
  shiftKeyMultiplier: 2,
  min: 0,
  max: 300,
});
__publicField(AudioGainSlider, 'state', sliderState);
var _media32,
  _SpeedSlider_instances,
  getARIAValueNow_fn4,
  getARIAValueText_fn4,
  watchMinMax_fn3,
  watchPlaybackRate_fn2,
  roundValue_fn,
  isDisabled_fn3,
  _throttledSpeedChange,
  onPlaybackRateChange_fn,
  onValueChange_fn3,
  onDragValueChange_fn3;
var SpeedSlider = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _SpeedSlider_instances);
    __privateAdd(this, _media32);
    __privateAdd(
      this,
      _throttledSpeedChange,
      functionThrottle(
        __privateMethod(
          this,
          _SpeedSlider_instances,
          onPlaybackRateChange_fn
        ).bind(this),
        25
      )
    );
  }
  onSetup() {
    __privateSet(this, _media32, useMediaContext());
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: __privateMethod(this, _SpeedSlider_instances, roundValue_fn),
      isDisabled: __privateMethod(
        this,
        _SpeedSlider_instances,
        isDisabled_fn3
      ).bind(this),
      aria: {
        valueNow: __privateMethod(
          this,
          _SpeedSlider_instances,
          getARIAValueNow_fn4
        ).bind(this),
        valueText: __privateMethod(
          this,
          _SpeedSlider_instances,
          getARIAValueText_fn4
        ).bind(this),
      },
      onDragValueChange: __privateMethod(
        this,
        _SpeedSlider_instances,
        onDragValueChange_fn3
      ).bind(this),
      onValueChange: __privateMethod(
        this,
        _SpeedSlider_instances,
        onValueChange_fn3
      ).bind(this),
    }).attach(this);
    effect(
      __privateMethod(this, _SpeedSlider_instances, watchMinMax_fn3).bind(this)
    );
    effect(
      __privateMethod(this, _SpeedSlider_instances, watchPlaybackRate_fn2).bind(
        this
      )
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-speed-slider', '');
    setAttributeIfEmpty(el, 'aria-label', 'Speed');
    const { canSetPlaybackRate } = __privateGet(this, _media32).$state;
    this.setAttributes({
      'data-supported': canSetPlaybackRate,
      'aria-hidden': $ariaBool(() => !canSetPlaybackRate()),
    });
  }
};
_media32 = new WeakMap();
_SpeedSlider_instances = new WeakSet();
getARIAValueNow_fn4 = function () {
  const { value } = this.$state;
  return value();
};
getARIAValueText_fn4 = function () {
  const { value } = this.$state;
  return value() + 'x';
};
watchMinMax_fn3 = function () {
  const { min, max } = this.$props;
  this.$state.min.set(min());
  this.$state.max.set(max());
};
watchPlaybackRate_fn2 = function () {
  const { playbackRate } = __privateGet(this, _media32).$state;
  const newValue = playbackRate();
  this.$state.value.set(newValue);
  this.dispatch('value-change', { detail: newValue });
};
roundValue_fn = function (value) {
  return round(value, 2);
};
isDisabled_fn3 = function () {
  const { disabled } = this.$props,
    { canSetPlaybackRate } = __privateGet(this, _media32).$state;
  return disabled() || !canSetPlaybackRate();
};
_throttledSpeedChange = new WeakMap();
onPlaybackRateChange_fn = function (event2) {
  if (!event2.trigger) return;
  const rate = event2.detail;
  __privateGet(this, _media32).remote.changePlaybackRate(rate, event2);
};
onValueChange_fn3 = function (event2) {
  __privateGet(this, _throttledSpeedChange).call(this, event2);
};
onDragValueChange_fn3 = function (event2) {
  __privateGet(this, _throttledSpeedChange).call(this, event2);
};
__publicField(SpeedSlider, 'props', {
  ...SliderController.props,
  step: 0.25,
  keyStep: 0.25,
  shiftKeyMultiplier: 2,
  min: 0,
  max: 2,
});
__publicField(SpeedSlider, 'state', sliderState);
var _media33,
  _sortedQualities,
  _QualitySlider_instances,
  getARIAValueNow_fn5,
  getARIAValueText_fn5,
  watchMax_fn,
  watchQuality_fn,
  isDisabled_fn4,
  _throttledQualityChange,
  onQualityChange_fn3,
  onValueChange_fn4,
  onDragValueChange_fn4;
var QualitySlider = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _QualitySlider_instances);
    __privateAdd(this, _media33);
    __privateAdd(
      this,
      _sortedQualities,
      computed(() => {
        const { qualities } = __privateGet(this, _media33).$state;
        return sortVideoQualities(qualities());
      })
    );
    __privateAdd(
      this,
      _throttledQualityChange,
      functionThrottle(
        __privateMethod(
          this,
          _QualitySlider_instances,
          onQualityChange_fn3
        ).bind(this),
        25
      )
    );
  }
  onSetup() {
    __privateSet(this, _media33, useMediaContext());
    new SliderController({
      getStep: this.$props.step,
      getKeyStep: this.$props.keyStep,
      roundValue: Math.round,
      isDisabled: __privateMethod(
        this,
        _QualitySlider_instances,
        isDisabled_fn4
      ).bind(this),
      aria: {
        valueNow: __privateMethod(
          this,
          _QualitySlider_instances,
          getARIAValueNow_fn5
        ).bind(this),
        valueText: __privateMethod(
          this,
          _QualitySlider_instances,
          getARIAValueText_fn5
        ).bind(this),
      },
      onDragValueChange: __privateMethod(
        this,
        _QualitySlider_instances,
        onDragValueChange_fn4
      ).bind(this),
      onValueChange: __privateMethod(
        this,
        _QualitySlider_instances,
        onValueChange_fn4
      ).bind(this),
    }).attach(this);
    effect(
      __privateMethod(this, _QualitySlider_instances, watchMax_fn).bind(this)
    );
    effect(
      __privateMethod(this, _QualitySlider_instances, watchQuality_fn).bind(
        this
      )
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-quality-slider', '');
    setAttributeIfEmpty(el, 'aria-label', 'Video Quality');
    const { qualities, canSetQuality } = __privateGet(this, _media33).$state,
      $supported = computed(() => canSetQuality() && qualities().length > 0);
    this.setAttributes({
      'data-supported': $supported,
      'aria-hidden': $ariaBool(() => !$supported()),
    });
  }
};
_media33 = new WeakMap();
_sortedQualities = new WeakMap();
_QualitySlider_instances = new WeakSet();
getARIAValueNow_fn5 = function () {
  const { value } = this.$state;
  return value();
};
getARIAValueText_fn5 = function () {
  const { quality } = __privateGet(this, _media33).$state;
  if (!quality()) return '';
  const { height, bitrate } = quality(),
    bitrateText =
      bitrate && bitrate > 0 ? `${(bitrate / 1e6).toFixed(2)} Mbps` : null;
  return height
    ? `${height}p${bitrateText ? ` (${bitrateText})` : ''}`
    : 'Auto';
};
watchMax_fn = function () {
  const $qualities = __privateGet(this, _sortedQualities).call(this);
  this.$state.max.set(Math.max(0, $qualities.length - 1));
};
watchQuality_fn = function () {
  let { quality } = __privateGet(this, _media33).$state,
    $qualities = __privateGet(this, _sortedQualities).call(this),
    value = Math.max(0, $qualities.indexOf(quality()));
  this.$state.value.set(value);
  this.dispatch('value-change', { detail: value });
};
isDisabled_fn4 = function () {
  const { disabled } = this.$props,
    { canSetQuality, qualities } = __privateGet(this, _media33).$state;
  return disabled() || qualities().length <= 1 || !canSetQuality();
};
_throttledQualityChange = new WeakMap();
onQualityChange_fn3 = function (event2) {
  if (!event2.trigger) return;
  const { qualities } = __privateGet(this, _media33),
    quality = peek(__privateGet(this, _sortedQualities))[event2.detail];
  __privateGet(this, _media33).remote.changeQuality(
    qualities.indexOf(quality),
    event2
  );
};
onValueChange_fn4 = function (event2) {
  __privateGet(this, _throttledQualityChange).call(this, event2);
};
onDragValueChange_fn4 = function (event2) {
  __privateGet(this, _throttledQualityChange).call(this, event2);
};
__publicField(QualitySlider, 'props', {
  ...SliderController.props,
  step: 1,
  keyStep: 1,
  shiftKeyMultiplier: 1,
});
__publicField(QualitySlider, 'state', sliderState);
var _media34,
  _dispatchSeeking,
  _chapter,
  _TimeSlider_instances,
  calcBufferedPercent_fn,
  hasChapters_fn,
  watchSeekingThrottle_fn,
  watchCurrentTime_fn2,
  watchPreviewing_fn,
  seeking_fn2,
  seek_fn,
  _playingBeforeDragStart,
  onDragStart_fn,
  onDragValueChange_fn5,
  onDragEnd_fn,
  onValueChange_fn5,
  getValue_fn,
  getStep_fn,
  getKeyStep_fn,
  roundValue_fn2,
  isDisabled_fn5,
  getARIAValueNow_fn6,
  getARIAValueText_fn6,
  percentToTime_fn,
  timeToPercent_fn,
  formatValue_fn,
  formatTime_fn;
var TimeSlider = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _TimeSlider_instances);
    __privateAdd(this, _media34);
    __privateAdd(this, _dispatchSeeking);
    __privateAdd(this, _chapter, signal(null));
    __privateAdd(this, _playingBeforeDragStart, false);
    const { noSwipeGesture } = this.$props;
    new SliderController({
      swipeGesture: () => !noSwipeGesture(),
      getValue: __privateMethod(this, _TimeSlider_instances, getValue_fn).bind(
        this
      ),
      getStep: __privateMethod(this, _TimeSlider_instances, getStep_fn).bind(
        this
      ),
      getKeyStep: __privateMethod(
        this,
        _TimeSlider_instances,
        getKeyStep_fn
      ).bind(this),
      roundValue: __privateMethod(this, _TimeSlider_instances, roundValue_fn2),
      isDisabled: __privateMethod(
        this,
        _TimeSlider_instances,
        isDisabled_fn5
      ).bind(this),
      aria: {
        valueNow: __privateMethod(
          this,
          _TimeSlider_instances,
          getARIAValueNow_fn6
        ).bind(this),
        valueText: __privateMethod(
          this,
          _TimeSlider_instances,
          getARIAValueText_fn6
        ).bind(this),
      },
      onDragStart: __privateMethod(
        this,
        _TimeSlider_instances,
        onDragStart_fn
      ).bind(this),
      onDragValueChange: __privateMethod(
        this,
        _TimeSlider_instances,
        onDragValueChange_fn5
      ).bind(this),
      onDragEnd: __privateMethod(
        this,
        _TimeSlider_instances,
        onDragEnd_fn
      ).bind(this),
      onValueChange: __privateMethod(
        this,
        _TimeSlider_instances,
        onValueChange_fn5
      ).bind(this),
    });
  }
  onSetup() {
    __privateSet(this, _media34, useMediaContext());
    provideContext(sliderValueFormatContext, {
      default: 'time',
      value: __privateMethod(this, _TimeSlider_instances, formatValue_fn).bind(
        this
      ),
      time: __privateMethod(this, _TimeSlider_instances, formatTime_fn).bind(
        this
      ),
    });
    this.setAttributes({
      'data-chapters': __privateMethod(
        this,
        _TimeSlider_instances,
        hasChapters_fn
      ).bind(this),
    });
    this.setStyles({
      '--slider-progress': __privateMethod(
        this,
        _TimeSlider_instances,
        calcBufferedPercent_fn
      ).bind(this),
    });
    effect(
      __privateMethod(this, _TimeSlider_instances, watchCurrentTime_fn2).bind(
        this
      )
    );
    effect(
      __privateMethod(
        this,
        _TimeSlider_instances,
        watchSeekingThrottle_fn
      ).bind(this)
    );
  }
  onAttach(el) {
    el.setAttribute('data-media-time-slider', '');
    setAttributeIfEmpty(el, 'aria-label', 'Seek');
  }
  onConnect(el) {
    effect(
      __privateMethod(this, _TimeSlider_instances, watchPreviewing_fn).bind(
        this
      )
    );
    watchActiveTextTrack(
      __privateGet(this, _media34).textTracks,
      'chapters',
      __privateGet(this, _chapter).set
    );
  }
};
_media34 = new WeakMap();
_dispatchSeeking = new WeakMap();
_chapter = new WeakMap();
_TimeSlider_instances = new WeakSet();
calcBufferedPercent_fn = function () {
  const { bufferedEnd, duration } = __privateGet(this, _media34).$state;
  return (
    round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1) * 100, 3) + '%'
  );
};
hasChapters_fn = function () {
  var _a6;
  const { duration } = __privateGet(this, _media34).$state;
  return (
    ((_a6 = __privateGet(this, _chapter).call(this)) == null
      ? void 0
      : _a6.cues.length) &&
    Number.isFinite(duration()) &&
    duration() > 0
  );
};
watchSeekingThrottle_fn = function () {
  __privateSet(
    this,
    _dispatchSeeking,
    functionThrottle(
      __privateMethod(this, _TimeSlider_instances, seeking_fn2).bind(this),
      this.$props.seekingRequestThrottle()
    )
  );
};
watchCurrentTime_fn2 = function () {
  if (this.$state.hidden()) return;
  const { value, dragging } = this.$state,
    newValue = __privateMethod(this, _TimeSlider_instances, getValue_fn).call(
      this
    );
  if (!peek(dragging)) {
    value.set(newValue);
    this.dispatch('value-change', { detail: newValue });
  }
};
watchPreviewing_fn = function () {
  const player = __privateGet(this, _media34).player.el,
    { preview } = useContext(sliderContext);
  player &&
    preview() &&
    setAttribute(player, 'data-preview', this.$state.active());
};
seeking_fn2 = function (time, event2) {
  __privateGet(this, _media34).remote.seeking(time, event2);
};
seek_fn = function (time, percent, event2) {
  __privateGet(this, _dispatchSeeking).cancel();
  const { live } = __privateGet(this, _media34).$state;
  if (live() && percent >= 99) {
    __privateGet(this, _media34).remote.seekToLiveEdge(event2);
    return;
  }
  __privateGet(this, _media34).remote.seek(time, event2);
};
_playingBeforeDragStart = new WeakMap();
onDragStart_fn = function (event2) {
  const { pauseWhileDragging } = this.$props;
  if (pauseWhileDragging()) {
    const { paused } = __privateGet(this, _media34).$state;
    __privateSet(this, _playingBeforeDragStart, !paused());
    __privateGet(this, _media34).remote.pause(event2);
  }
};
onDragValueChange_fn5 = function (event2) {
  __privateGet(this, _dispatchSeeking).call(
    this,
    __privateMethod(this, _TimeSlider_instances, percentToTime_fn).call(
      this,
      event2.detail
    ),
    event2
  );
};
onDragEnd_fn = function (event2) {
  const { seeking } = __privateGet(this, _media34).$state;
  if (!peek(seeking))
    __privateMethod(this, _TimeSlider_instances, seeking_fn2).call(
      this,
      __privateMethod(this, _TimeSlider_instances, percentToTime_fn).call(
        this,
        event2.detail
      ),
      event2
    );
  const percent = event2.detail;
  __privateMethod(this, _TimeSlider_instances, seek_fn).call(
    this,
    __privateMethod(this, _TimeSlider_instances, percentToTime_fn).call(
      this,
      percent
    ),
    percent,
    event2
  );
  const { pauseWhileDragging } = this.$props;
  if (pauseWhileDragging() && __privateGet(this, _playingBeforeDragStart)) {
    __privateGet(this, _media34).remote.play(event2);
    __privateSet(this, _playingBeforeDragStart, false);
  }
};
onValueChange_fn5 = function (event2) {
  const { dragging } = this.$state;
  if (dragging() || !event2.trigger) return;
  __privateMethod(this, _TimeSlider_instances, onDragEnd_fn).call(this, event2);
};
// -------------------------------------------------------------------------------------------
// Props
// -------------------------------------------------------------------------------------------
getValue_fn = function () {
  const { currentTime } = __privateGet(this, _media34).$state;
  return __privateMethod(this, _TimeSlider_instances, timeToPercent_fn).call(
    this,
    currentTime()
  );
};
getStep_fn = function () {
  const value =
    (this.$props.step() / __privateGet(this, _media34).$state.duration()) * 100;
  return Number.isFinite(value) ? value : 1;
};
getKeyStep_fn = function () {
  const value =
    (this.$props.keyStep() / __privateGet(this, _media34).$state.duration()) *
    100;
  return Number.isFinite(value) ? value : 1;
};
roundValue_fn2 = function (value) {
  return round(value, 3);
};
isDisabled_fn5 = function () {
  const { disabled } = this.$props,
    { canSeek } = __privateGet(this, _media34).$state;
  return disabled() || !canSeek();
};
// -------------------------------------------------------------------------------------------
// ARIA
// -------------------------------------------------------------------------------------------
getARIAValueNow_fn6 = function () {
  const { value } = this.$state;
  return Math.round(value());
};
getARIAValueText_fn6 = function () {
  const time = __privateMethod(
      this,
      _TimeSlider_instances,
      percentToTime_fn
    ).call(this, this.$state.value()),
    { duration } = __privateGet(this, _media34).$state;
  return Number.isFinite(time)
    ? `${formatSpokenTime(time)} out of ${formatSpokenTime(duration())}`
    : 'live';
};
// -------------------------------------------------------------------------------------------
// Format
// -------------------------------------------------------------------------------------------
percentToTime_fn = function (percent) {
  const { duration } = __privateGet(this, _media34).$state;
  return round((percent / 100) * duration(), 5);
};
timeToPercent_fn = function (time) {
  const { liveEdge, duration } = __privateGet(this, _media34).$state,
    rate = Math.max(
      0,
      Math.min(1, liveEdge() ? 1 : Math.min(time, duration()) / duration())
    );
  return Number.isNaN(rate) ? 0 : Number.isFinite(rate) ? rate * 100 : 100;
};
formatValue_fn = function (percent) {
  const time = __privateMethod(
      this,
      _TimeSlider_instances,
      percentToTime_fn
    ).call(this, percent),
    { live, duration } = __privateGet(this, _media34).$state;
  return Number.isFinite(time)
    ? (live() ? time - duration() : time).toFixed(0)
    : 'LIVE';
};
formatTime_fn = function (percent, options) {
  const time = __privateMethod(
      this,
      _TimeSlider_instances,
      percentToTime_fn
    ).call(this, percent),
    { live, duration } = __privateGet(this, _media34).$state,
    value = live() ? time - duration() : time;
  return Number.isFinite(time)
    ? `${value < 0 ? '-' : ''}${formatTime(Math.abs(value), options)}`
    : 'LIVE';
};
__publicField(TimeSlider, 'props', {
  ...SliderController.props,
  step: 0.1,
  keyStep: 5,
  shiftKeyMultiplier: 2,
  pauseWhileDragging: false,
  noSwipeGesture: false,
  seekingRequestThrottle: 100,
});
__publicField(TimeSlider, 'state', sliderState);
var _media35,
  _sliderState,
  _updateScope,
  _titleRef,
  _refs,
  _$track,
  _$cues,
  _activeIndex,
  _activePointerIndex,
  _bufferedIndex,
  _SliderChapters_instances,
  setTrack_fn,
  reset_fn2,
  watch_fn,
  watchUpdates_fn,
  watchContainerWidths_fn,
  watchFillPercent_fn,
  watchPointerPercent_fn,
  updateFillPercents_fn,
  updateFillPercent_fn,
  findActiveChapterIndex_fn,
  watchBufferedPercent_fn,
  _updateBufferedPercent,
  _bufferedPercent,
  calcMediaBufferedPercent_fn,
  getEndTime_fn,
  calcPercent_fn,
  fillGaps_fn,
  watchSource_fn,
  onTrackChange_fn2,
  watchMediaDuration_fn,
  _onCuesChange,
  onChapterTitleChange_fn,
  findParentSlider_fn,
  findChapterTitleRef_fn;
var SliderChapters = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _SliderChapters_instances);
    __privateAdd(this, _media35);
    __privateAdd(this, _sliderState);
    __privateAdd(this, _updateScope);
    __privateAdd(this, _titleRef, null);
    __privateAdd(this, _refs, []);
    __privateAdd(this, _$track, signal(null));
    __privateAdd(this, _$cues, signal([]));
    __privateAdd(this, _activeIndex, signal(-1));
    __privateAdd(this, _activePointerIndex, signal(-1));
    __privateAdd(this, _bufferedIndex, 0);
    __privateAdd(
      this,
      _updateBufferedPercent,
      animationFrameThrottle((bufferedPercent) => {
        var _a6;
        let percent,
          cues = __privateGet(this, _$cues).call(this),
          { seekableStart } = __privateGet(this, _media35).$state,
          startTime = seekableStart(),
          endTime = __privateMethod(
            this,
            _SliderChapters_instances,
            getEndTime_fn
          ).call(this, cues);
        for (
          let i = __privateGet(this, _bufferedIndex);
          i < __privateGet(this, _refs).length;
          i++
        ) {
          percent = __privateMethod(
            this,
            _SliderChapters_instances,
            calcPercent_fn
          ).call(this, cues[i], bufferedPercent, startTime, endTime);
          (_a6 = __privateGet(this, _refs)[i]) == null
            ? void 0
            : _a6.style.setProperty('--chapter-progress', percent + '%');
          if (percent < 100) {
            __privateSet(this, _bufferedIndex, i);
            break;
          }
        }
      })
    );
    __privateAdd(
      this,
      _bufferedPercent,
      computed(
        __privateMethod(
          this,
          _SliderChapters_instances,
          calcMediaBufferedPercent_fn
        ).bind(this)
      )
    );
    __privateAdd(
      this,
      _onCuesChange,
      functionDebounce(
        () => {
          const track = peek(__privateGet(this, _$track));
          if (!this.scope || !track || !track.cues.length) return;
          __privateGet(this, _$cues).set(
            __privateMethod(this, _SliderChapters_instances, fillGaps_fn).call(
              this,
              track.cues
            )
          );
          __privateGet(this, _activeIndex).set(0);
          __privateSet(this, _bufferedIndex, 0);
        },
        150,
        true
      )
    );
  }
  get cues() {
    return __privateGet(this, _$cues).call(this);
  }
  get activeCue() {
    return (
      __privateGet(this, _$cues).call(this)[
        __privateGet(this, _activeIndex).call(this)
      ] || null
    );
  }
  get activePointerCue() {
    return (
      __privateGet(this, _$cues).call(this)[
        __privateGet(this, _activePointerIndex).call(this)
      ] || null
    );
  }
  onSetup() {
    __privateSet(this, _media35, useMediaContext());
    __privateSet(this, _sliderState, useState(TimeSlider.state));
  }
  onAttach(el) {
    watchActiveTextTrack(
      __privateGet(this, _media35).textTracks,
      'chapters',
      __privateMethod(this, _SliderChapters_instances, setTrack_fn).bind(this)
    );
    effect(
      __privateMethod(this, _SliderChapters_instances, watchSource_fn).bind(
        this
      )
    );
  }
  onConnect() {
    onDispose(() =>
      __privateMethod(this, _SliderChapters_instances, reset_fn2).bind(this)
    );
  }
  onDestroy() {
    __privateMethod(this, _SliderChapters_instances, setTrack_fn).call(
      this,
      null
    );
  }
  setRefs(refs) {
    var _a6;
    __privateSet(this, _refs, refs);
    (_a6 = __privateGet(this, _updateScope)) == null ? void 0 : _a6.dispose();
    if (__privateGet(this, _refs).length === 1) {
      const el = __privateGet(this, _refs)[0];
      el.style.width = '100%';
      el.style.setProperty('--chapter-fill', 'var(--slider-fill)');
      el.style.setProperty('--chapter-progress', 'var(--slider-progress)');
    } else if (__privateGet(this, _refs).length > 0) {
      scoped(
        () =>
          __privateMethod(this, _SliderChapters_instances, watch_fn).call(this),
        __privateSet(this, _updateScope, createScope())
      );
    }
  }
};
_media35 = new WeakMap();
_sliderState = new WeakMap();
_updateScope = new WeakMap();
_titleRef = new WeakMap();
_refs = new WeakMap();
_$track = new WeakMap();
_$cues = new WeakMap();
_activeIndex = new WeakMap();
_activePointerIndex = new WeakMap();
_bufferedIndex = new WeakMap();
_SliderChapters_instances = new WeakSet();
setTrack_fn = function (track) {
  if (peek(__privateGet(this, _$track)) === track) return;
  __privateMethod(this, _SliderChapters_instances, reset_fn2).call(this);
  __privateGet(this, _$track).set(track);
};
reset_fn2 = function () {
  var _a6;
  __privateSet(this, _refs, []);
  __privateGet(this, _$cues).set([]);
  __privateGet(this, _activeIndex).set(-1);
  __privateGet(this, _activePointerIndex).set(-1);
  __privateSet(this, _bufferedIndex, 0);
  (_a6 = __privateGet(this, _updateScope)) == null ? void 0 : _a6.dispose();
};
watch_fn = function () {
  if (!__privateGet(this, _refs).length) return;
  effect(
    __privateMethod(this, _SliderChapters_instances, watchUpdates_fn).bind(this)
  );
};
watchUpdates_fn = function () {
  const { hidden } = __privateGet(this, _sliderState);
  if (hidden()) return;
  effect(
    __privateMethod(
      this,
      _SliderChapters_instances,
      watchContainerWidths_fn
    ).bind(this)
  );
  effect(
    __privateMethod(this, _SliderChapters_instances, watchFillPercent_fn).bind(
      this
    )
  );
  effect(
    __privateMethod(
      this,
      _SliderChapters_instances,
      watchPointerPercent_fn
    ).bind(this)
  );
  effect(
    __privateMethod(
      this,
      _SliderChapters_instances,
      watchBufferedPercent_fn
    ).bind(this)
  );
};
watchContainerWidths_fn = function () {
  const cues = __privateGet(this, _$cues).call(this);
  if (!cues.length) return;
  let cue,
    { seekableStart, seekableEnd } = __privateGet(this, _media35).$state,
    startTime = seekableStart(),
    endTime = seekableEnd() || cues[cues.length - 1].endTime,
    duration = endTime - startTime,
    remainingWidth = 100;
  for (let i = 0; i < cues.length; i++) {
    cue = cues[i];
    if (__privateGet(this, _refs)[i]) {
      const width =
        i === cues.length - 1
          ? remainingWidth
          : round(
              ((cue.endTime - Math.max(startTime, cue.startTime)) / duration) *
                100,
              3
            );
      __privateGet(this, _refs)[i].style.width = width + '%';
      remainingWidth -= width;
    }
  }
};
watchFillPercent_fn = function () {
  let { liveEdge, seekableStart, seekableEnd } = __privateGet(
      this,
      _media35
    ).$state,
    { fillPercent, value } = __privateGet(this, _sliderState),
    cues = __privateGet(this, _$cues).call(this),
    isLiveEdge = liveEdge(),
    prevActiveIndex = peek(__privateGet(this, _activeIndex)),
    currentChapter = cues[prevActiveIndex];
  let currentActiveIndex = isLiveEdge
    ? __privateGet(this, _$cues).length - 1
    : __privateMethod(
        this,
        _SliderChapters_instances,
        findActiveChapterIndex_fn
      ).call(
        this,
        currentChapter
          ? (currentChapter.startTime / seekableEnd()) * 100 <= peek(value)
            ? prevActiveIndex
            : 0
          : 0,
        fillPercent()
      );
  if (isLiveEdge || !currentChapter) {
    __privateMethod(
      this,
      _SliderChapters_instances,
      updateFillPercents_fn
    ).call(this, 0, cues.length, 100);
  } else if (currentActiveIndex > prevActiveIndex) {
    __privateMethod(
      this,
      _SliderChapters_instances,
      updateFillPercents_fn
    ).call(this, prevActiveIndex, currentActiveIndex, 100);
  } else if (currentActiveIndex < prevActiveIndex) {
    __privateMethod(
      this,
      _SliderChapters_instances,
      updateFillPercents_fn
    ).call(this, currentActiveIndex + 1, prevActiveIndex + 1, 0);
  }
  const percent = isLiveEdge
    ? 100
    : __privateMethod(this, _SliderChapters_instances, calcPercent_fn).call(
        this,
        cues[currentActiveIndex],
        fillPercent(),
        seekableStart(),
        __privateMethod(this, _SliderChapters_instances, getEndTime_fn).call(
          this,
          cues
        )
      );
  __privateMethod(this, _SliderChapters_instances, updateFillPercent_fn).call(
    this,
    __privateGet(this, _refs)[currentActiveIndex],
    percent
  );
  __privateGet(this, _activeIndex).set(currentActiveIndex);
};
watchPointerPercent_fn = function () {
  let { pointing, pointerPercent } = __privateGet(this, _sliderState);
  if (!pointing()) {
    __privateGet(this, _activePointerIndex).set(-1);
    return;
  }
  const activeIndex = __privateMethod(
    this,
    _SliderChapters_instances,
    findActiveChapterIndex_fn
  ).call(this, 0, pointerPercent());
  __privateGet(this, _activePointerIndex).set(activeIndex);
};
updateFillPercents_fn = function (start, end, percent) {
  for (let i = start; i < end; i++)
    __privateMethod(this, _SliderChapters_instances, updateFillPercent_fn).call(
      this,
      __privateGet(this, _refs)[i],
      percent
    );
};
updateFillPercent_fn = function (ref, percent) {
  if (!ref) return;
  ref.style.setProperty('--chapter-fill', percent + '%');
  setAttribute(ref, 'data-active', percent > 0 && percent < 100);
  setAttribute(ref, 'data-ended', percent === 100);
};
findActiveChapterIndex_fn = function (startIndex, percent) {
  let chapterPercent = 0,
    cues = __privateGet(this, _$cues).call(this);
  if (percent === 0) return 0;
  else if (percent === 100) return cues.length - 1;
  let { seekableStart } = __privateGet(this, _media35).$state,
    startTime = seekableStart(),
    endTime = __privateMethod(
      this,
      _SliderChapters_instances,
      getEndTime_fn
    ).call(this, cues);
  for (let i = startIndex; i < cues.length; i++) {
    chapterPercent = __privateMethod(
      this,
      _SliderChapters_instances,
      calcPercent_fn
    ).call(this, cues[i], percent, startTime, endTime);
    if (chapterPercent >= 0 && chapterPercent < 100) return i;
  }
  return 0;
};
watchBufferedPercent_fn = function () {
  __privateGet(this, _updateBufferedPercent).call(
    this,
    __privateGet(this, _bufferedPercent).call(this)
  );
};
_updateBufferedPercent = new WeakMap();
_bufferedPercent = new WeakMap();
calcMediaBufferedPercent_fn = function () {
  const { bufferedEnd, duration } = __privateGet(this, _media35).$state;
  return round(Math.min(bufferedEnd() / Math.max(duration(), 1), 1), 3) * 100;
};
getEndTime_fn = function (cues) {
  var _a6;
  const { seekableEnd } = __privateGet(this, _media35).$state,
    endTime = seekableEnd();
  return Number.isFinite(endTime)
    ? endTime
    : ((_a6 = cues[cues.length - 1]) == null ? void 0 : _a6.endTime) || 0;
};
calcPercent_fn = function (cue, percent, startTime, endTime) {
  if (!cue) return 0;
  const cues = __privateGet(this, _$cues).call(this);
  if (cues.length === 0) return 0;
  const duration = endTime - startTime,
    cueStartTime = Math.max(0, cue.startTime - startTime),
    cueEndTime = Math.min(endTime, cue.endTime) - startTime;
  const startRatio = cueStartTime / duration,
    startPercent = startRatio * 100,
    endPercent =
      Math.min(1, startRatio + (cueEndTime - cueStartTime) / duration) * 100;
  return Math.max(
    0,
    round(
      percent >= endPercent
        ? 100
        : ((percent - startPercent) / (endPercent - startPercent)) * 100,
      3
    )
  );
};
fillGaps_fn = function (cues) {
  let chapters = [],
    { seekableStart, seekableEnd, duration } = __privateGet(
      this,
      _media35
    ).$state,
    startTime = seekableStart(),
    endTime = seekableEnd();
  cues = cues.filter(
    (cue) => cue.startTime <= endTime && cue.endTime >= startTime
  );
  const firstCue = cues[0];
  if (firstCue && firstCue.startTime > startTime) {
    chapters.push(new window.VTTCue(startTime, firstCue.startTime, ''));
  }
  for (let i = 0; i < cues.length - 1; i++) {
    const currentCue = cues[i],
      nextCue = cues[i + 1];
    chapters.push(currentCue);
    if (nextCue) {
      const timeDiff = nextCue.startTime - currentCue.endTime;
      if (timeDiff > 0) {
        chapters.push(
          new window.VTTCue(
            currentCue.endTime,
            currentCue.endTime + timeDiff,
            ''
          )
        );
      }
    }
  }
  const lastCue = cues[cues.length - 1];
  if (lastCue) {
    chapters.push(lastCue);
    const endTime2 = duration();
    if (endTime2 >= 0 && endTime2 - lastCue.endTime > 1) {
      chapters.push(new window.VTTCue(lastCue.endTime, duration(), ''));
    }
  }
  return chapters;
};
watchSource_fn = function () {
  const { source } = __privateGet(this, _media35).$state;
  source();
  __privateMethod(this, _SliderChapters_instances, onTrackChange_fn2).call(
    this
  );
};
onTrackChange_fn2 = function () {
  if (!this.scope) return;
  const { disabled } = this.$props;
  if (disabled()) {
    __privateGet(this, _$cues).set([]);
    __privateGet(this, _activeIndex).set(0);
    __privateSet(this, _bufferedIndex, 0);
    return;
  }
  const track = __privateGet(this, _$track).call(this);
  if (track) {
    const onCuesChange = __privateGet(this, _onCuesChange).bind(this);
    onCuesChange();
    new EventsController(track)
      .add('add-cue', onCuesChange)
      .add('remove-cue', onCuesChange);
    effect(
      __privateMethod(
        this,
        _SliderChapters_instances,
        watchMediaDuration_fn
      ).bind(this)
    );
  }
  __privateSet(
    this,
    _titleRef,
    __privateMethod(
      this,
      _SliderChapters_instances,
      findChapterTitleRef_fn
    ).call(this)
  );
  if (__privateGet(this, _titleRef))
    effect(
      __privateMethod(
        this,
        _SliderChapters_instances,
        onChapterTitleChange_fn
      ).bind(this)
    );
  return () => {
    if (__privateGet(this, _titleRef)) {
      __privateGet(this, _titleRef).textContent = '';
      __privateSet(this, _titleRef, null);
    }
  };
};
watchMediaDuration_fn = function () {
  __privateGet(this, _media35).$state.duration();
  __privateGet(this, _onCuesChange).call(this);
};
_onCuesChange = new WeakMap();
onChapterTitleChange_fn = function () {
  const cue = this.activePointerCue || this.activeCue;
  if (__privateGet(this, _titleRef))
    __privateGet(this, _titleRef).textContent =
      (cue == null ? void 0 : cue.text) || '';
};
findParentSlider_fn = function () {
  let node = this.el;
  while (node && node.getAttribute('role') !== 'slider') {
    node = node.parentElement;
  }
  return node;
};
findChapterTitleRef_fn = function () {
  const slider = __privateMethod(
    this,
    _SliderChapters_instances,
    findParentSlider_fn
  ).call(this);
  return slider ? slider.querySelector('[data-part="chapter-title"]') : null;
};
__publicField(SliderChapters, 'props', {
  disabled: false,
});
var sliderchapters__proto = SliderChapters.prototype;
prop(sliderchapters__proto, 'cues');
prop(sliderchapters__proto, 'activeCue');
prop(sliderchapters__proto, 'activePointerCue');
method(sliderchapters__proto, 'setRefs');
var menuContext = createContext();
function scrollIntoView(el, options) {
  const scrolls = r(el, options);
  for (const { el: el2, top, left } of scrolls) {
    el2.scroll({ top, left, behavior: options.behavior });
  }
}
function scrollIntoCenter(el, options = {}) {
  scrollIntoView(el, {
    scrollMode: 'if-needed',
    block: 'center',
    inline: 'center',
    ...options,
  });
}
var FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]',
  '[tabindex]',
  'input',
  'select',
  'button',
]
  .map((selector) => `${selector}:not([aria-hidden='true'])`)
  .join(',');
var VALID_KEYS = /* @__PURE__ */ new Set([
  'Escape',
  'Tab',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'PageUp',
  'End',
  'PageDown',
  'Enter',
  ' ',
]);
var _index,
  _el,
  _elements,
  _delegate5,
  _MenuFocusController_instances,
  focusAt_fn,
  findActiveIndex_fn,
  onFocus_fn3,
  validateKeyEvent_fn,
  onKeyUp_fn3,
  onKeyDown_fn3,
  nextIndex_fn,
  getFocusableElements_fn;
var MenuFocusController = class {
  constructor(delegate) {
    __privateAdd(this, _MenuFocusController_instances);
    __privateAdd(this, _index, -1);
    __privateAdd(this, _el, null);
    __privateAdd(this, _elements, []);
    __privateAdd(this, _delegate5);
    __privateSet(this, _delegate5, delegate);
  }
  get items() {
    return __privateGet(this, _elements);
  }
  attachMenu(el) {
    listenEvent(
      el,
      'focus',
      __privateMethod(this, _MenuFocusController_instances, onFocus_fn3).bind(
        this
      )
    );
    __privateSet(this, _el, el);
    onDispose(() => {
      __privateSet(this, _el, null);
    });
  }
  listen() {
    if (!__privateGet(this, _el)) return;
    this.update();
    new EventsController(__privateGet(this, _el))
      .add(
        'keyup',
        __privateMethod(this, _MenuFocusController_instances, onKeyUp_fn3).bind(
          this
        )
      )
      .add(
        'keydown',
        __privateMethod(
          this,
          _MenuFocusController_instances,
          onKeyDown_fn3
        ).bind(this)
      );
    onDispose(() => {
      __privateSet(this, _index, -1);
      __privateSet(this, _elements, []);
    });
  }
  update() {
    __privateSet(this, _index, 0);
    __privateSet(
      this,
      _elements,
      __privateMethod(
        this,
        _MenuFocusController_instances,
        getFocusableElements_fn
      ).call(this)
    );
  }
  scroll(
    index = __privateMethod(
      this,
      _MenuFocusController_instances,
      findActiveIndex_fn
    ).call(this)
  ) {
    const element = __privateGet(this, _elements)[index];
    if (element) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollIntoCenter(element, {
            behavior: 'smooth',
            boundary: (el) => {
              return !el.hasAttribute('data-root');
            },
          });
        });
      });
    }
  }
  focusActive(scroll = true) {
    const index = __privateMethod(
      this,
      _MenuFocusController_instances,
      findActiveIndex_fn
    ).call(this);
    __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
      this,
      index >= 0 ? index : 0,
      scroll
    );
  }
};
_index = new WeakMap();
_el = new WeakMap();
_elements = new WeakMap();
_delegate5 = new WeakMap();
_MenuFocusController_instances = new WeakSet();
focusAt_fn = function (index, scroll = true) {
  var _a6;
  __privateSet(this, _index, index);
  if (__privateGet(this, _elements)[index]) {
    __privateGet(this, _elements)[index].focus({ preventScroll: true });
    if (scroll) this.scroll(index);
  } else {
    (_a6 = __privateGet(this, _el)) == null
      ? void 0
      : _a6.focus({ preventScroll: true });
  }
};
findActiveIndex_fn = function () {
  return __privateGet(this, _elements).findIndex(
    (el) =>
      document.activeElement === el ||
      (el.getAttribute('role') === 'menuitemradio' &&
        el.getAttribute('aria-checked') === 'true')
  );
};
onFocus_fn3 = function () {
  if (__privateGet(this, _index) >= 0) return;
  this.update();
  this.focusActive();
};
validateKeyEvent_fn = function (event2) {
  const el = event2.target;
  if (wasEnterKeyPressed(event2) && el instanceof Element) {
    const role = el.getAttribute('role');
    return !/a|input|select|button/.test(el.localName) && !role;
  }
  return VALID_KEYS.has(event2.key);
};
onKeyUp_fn3 = function (event2) {
  if (
    !__privateMethod(
      this,
      _MenuFocusController_instances,
      validateKeyEvent_fn
    ).call(this, event2)
  )
    return;
  event2.stopPropagation();
  event2.preventDefault();
};
onKeyDown_fn3 = function (event2) {
  if (
    !__privateMethod(
      this,
      _MenuFocusController_instances,
      validateKeyEvent_fn
    ).call(this, event2)
  )
    return;
  event2.stopPropagation();
  event2.preventDefault();
  switch (event2.key) {
    case 'Escape':
      __privateGet(this, _delegate5).closeMenu(event2);
      break;
    case 'Tab':
      __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
        this,
        __privateMethod(
          this,
          _MenuFocusController_instances,
          nextIndex_fn
        ).call(this, event2.shiftKey ? -1 : 1)
      );
      break;
    case 'ArrowUp':
      __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
        this,
        __privateMethod(
          this,
          _MenuFocusController_instances,
          nextIndex_fn
        ).call(this, -1)
      );
      break;
    case 'ArrowDown':
      __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
        this,
        __privateMethod(
          this,
          _MenuFocusController_instances,
          nextIndex_fn
        ).call(this, 1)
      );
      break;
    case 'Home':
    case 'PageUp':
      __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
        this,
        0
      );
      break;
    case 'End':
    case 'PageDown':
      __privateMethod(this, _MenuFocusController_instances, focusAt_fn).call(
        this,
        __privateGet(this, _elements).length - 1
      );
      break;
  }
};
nextIndex_fn = function (delta) {
  var _a6;
  let index = __privateGet(this, _index);
  do {
    index =
      (index + delta + __privateGet(this, _elements).length) %
      __privateGet(this, _elements).length;
  } while (
    ((_a6 = __privateGet(this, _elements)[index]) == null
      ? void 0
      : _a6.offsetParent) === null
  );
  return index;
};
getFocusableElements_fn = function () {
  if (!__privateGet(this, _el)) return [];
  const focusableElements = __privateGet(this, _el).querySelectorAll(
      FOCUSABLE_ELEMENTS_SELECTOR
    ),
    elements = [];
  const is = (node) => {
    return node.getAttribute('role') === 'menu';
  };
  for (const el of focusableElements) {
    if (
      isHTMLElement(el) &&
      el.offsetParent !== null && // does not have display: none
      isElementParent(__privateGet(this, _el), el, is)
    ) {
      elements.push(el);
    }
  }
  return elements;
};
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key);
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if ((decorator = decorators[i]))
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
var idCount = 0;
var _media36,
  _menuId,
  _menuButtonId,
  _expanded,
  _disabled,
  _trigger2,
  _content2,
  _parentMenu,
  _submenus,
  _menuObserver,
  _popper,
  _focus,
  _isSliderActive,
  _isTriggerDisabled,
  _transitionCallbacks,
  _Menu_instances,
  observeSliders_fn,
  watchExpanded_fn,
  attachMenuButton_fn,
  attachMenuItems_fn,
  attachObserver_fn,
  updateMenuItemsHidden_fn,
  disableMenuButton_fn,
  _wasKeyboardExpand,
  onExpandedChange_fn,
  updateFocus_fn,
  isExpanded_fn,
  isDisabled_fn6,
  disable_fn,
  onPointerUp_fn,
  onWindowPointerUp_fn,
  getCloseTarget_fn,
  toggleMediaControls_fn,
  addSubmenu_fn,
  _removeSubmenuBind,
  removeSubmenu_fn,
  _isSubmenuOpen,
  _onSubmenuOpenBind,
  onSubmenuOpen_fn,
  _onSubmenuCloseBind,
  onSubmenuClose_fn,
  _onResize,
  _isTransitionActive,
  onResizeTransition_fn;
var Menu = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _Menu_instances);
    __privateAdd(this, _media36);
    __privateAdd(this, _menuId);
    __privateAdd(this, _menuButtonId);
    __privateAdd(this, _expanded, signal(false));
    __privateAdd(this, _disabled, signal(false));
    __privateAdd(this, _trigger2, signal(null));
    __privateAdd(this, _content2, signal(null));
    __privateAdd(this, _parentMenu);
    __privateAdd(this, _submenus, /* @__PURE__ */ new Set());
    __privateAdd(this, _menuObserver, null);
    __privateAdd(this, _popper);
    __privateAdd(this, _focus);
    __privateAdd(this, _isSliderActive, false);
    __privateAdd(this, _isTriggerDisabled, signal(false));
    __privateAdd(this, _transitionCallbacks, /* @__PURE__ */ new Set());
    __privateAdd(this, _wasKeyboardExpand, false);
    __privateAdd(
      this,
      _removeSubmenuBind,
      __privateMethod(this, _Menu_instances, removeSubmenu_fn).bind(this)
    );
    __privateAdd(this, _isSubmenuOpen, false);
    __privateAdd(
      this,
      _onSubmenuOpenBind,
      __privateMethod(this, _Menu_instances, onSubmenuOpen_fn).bind(this)
    );
    __privateAdd(
      this,
      _onSubmenuCloseBind,
      __privateMethod(this, _Menu_instances, onSubmenuClose_fn).bind(this)
    );
    __privateAdd(
      this,
      _onResize,
      animationFrameThrottle(() => {
        const content = peek(__privateGet(this, _content2));
        if (!content || IS_SERVER) return;
        let height = 0,
          styles = getComputedStyle(content),
          children = [...content.children];
        for (const prop2 of [
          'paddingTop',
          'paddingBottom',
          'borderTopWidth',
          'borderBottomWidth',
        ]) {
          height += parseFloat(styles[prop2]) || 0;
        }
        for (const child of children) {
          if (isHTMLElement(child) && child.style.display === 'contents') {
            children.push(...child.children);
          } else if (child.nodeType === 3) {
            height += parseFloat(getComputedStyle(child).fontSize);
          } else if (isHTMLElement(child)) {
            if (!isElementVisible(child)) continue;
            const style = getComputedStyle(child);
            height +=
              child.offsetHeight +
              (parseFloat(style.marginTop) || 0) +
              (parseFloat(style.marginBottom) || 0);
          }
        }
        setStyle(content, '--menu-height', height + 'px');
      })
    );
    __privateAdd(this, _isTransitionActive, false);
    const { showDelay } = this.$props;
    __privateSet(
      this,
      _popper,
      new Popper({
        trigger: __privateGet(this, _trigger2),
        content: __privateGet(this, _content2),
        showDelay,
        listen: (trigger, show, hide) => {
          onPress(trigger, (event2) => {
            if (__privateGet(this, _expanded).call(this)) hide(event2);
            else show(event2);
          });
          const closeTarget = __privateMethod(
            this,
            _Menu_instances,
            getCloseTarget_fn
          ).call(this);
          if (closeTarget) {
            onPress(closeTarget, (event2) => {
              event2.stopPropagation();
              hide(event2);
            });
          }
        },
        onChange: __privateMethod(
          this,
          _Menu_instances,
          onExpandedChange_fn
        ).bind(this),
      })
    );
  }
  get triggerElement() {
    return __privateGet(this, _trigger2).call(this);
  }
  get contentElement() {
    return __privateGet(this, _content2).call(this);
  }
  get isSubmenu() {
    return !!__privateGet(this, _parentMenu);
  }
  onSetup() {
    __privateSet(this, _media36, useMediaContext());
    const currentIdCount = ++idCount;
    __privateSet(this, _menuId, `media-menu-${currentIdCount}`);
    __privateSet(this, _menuButtonId, `media-menu-button-${currentIdCount}`);
    __privateSet(
      this,
      _focus,
      new MenuFocusController({
        closeMenu: this.close.bind(this),
      })
    );
    if (hasProvidedContext(menuContext)) {
      __privateSet(this, _parentMenu, useContext(menuContext));
    }
    __privateMethod(this, _Menu_instances, observeSliders_fn).call(this);
    this.setAttributes({
      'data-open': __privateGet(this, _expanded),
      'data-root': !this.isSubmenu,
      'data-submenu': this.isSubmenu,
      'data-disabled': __privateMethod(
        this,
        _Menu_instances,
        isDisabled_fn6
      ).bind(this),
    });
    provideContext(menuContext, {
      button: __privateGet(this, _trigger2),
      content: __privateGet(this, _content2),
      expanded: __privateGet(this, _expanded),
      hint: signal(''),
      submenu: !!__privateGet(this, _parentMenu),
      disable: __privateMethod(this, _Menu_instances, disable_fn).bind(this),
      attachMenuButton: __privateMethod(
        this,
        _Menu_instances,
        attachMenuButton_fn
      ).bind(this),
      attachMenuItems: __privateMethod(
        this,
        _Menu_instances,
        attachMenuItems_fn
      ).bind(this),
      attachObserver: __privateMethod(
        this,
        _Menu_instances,
        attachObserver_fn
      ).bind(this),
      disableMenuButton: __privateMethod(
        this,
        _Menu_instances,
        disableMenuButton_fn
      ).bind(this),
      addSubmenu: __privateMethod(this, _Menu_instances, addSubmenu_fn).bind(
        this
      ),
      onTransitionEvent: (callback) => {
        __privateGet(this, _transitionCallbacks).add(callback);
        onDispose(() => {
          __privateGet(this, _transitionCallbacks).delete(callback);
        });
      },
    });
  }
  onAttach(el) {
    el.style.setProperty('display', 'contents');
  }
  onConnect(el) {
    var _a6;
    effect(__privateMethod(this, _Menu_instances, watchExpanded_fn).bind(this));
    if (this.isSubmenu) {
      (_a6 = __privateGet(this, _parentMenu)) == null
        ? void 0
        : _a6.addSubmenu(this);
    }
  }
  onDestroy() {
    __privateGet(this, _trigger2).set(null);
    __privateGet(this, _content2).set(null);
    __privateSet(this, _menuObserver, null);
    __privateGet(this, _transitionCallbacks).clear();
  }
  open(trigger) {
    if (peek(__privateGet(this, _expanded))) return;
    __privateGet(this, _popper).show(trigger);
    tick();
  }
  close(trigger) {
    if (!peek(__privateGet(this, _expanded))) return;
    __privateGet(this, _popper).hide(trigger);
    tick();
  }
};
_media36 = new WeakMap();
_menuId = new WeakMap();
_menuButtonId = new WeakMap();
_expanded = new WeakMap();
_disabled = new WeakMap();
_trigger2 = new WeakMap();
_content2 = new WeakMap();
_parentMenu = new WeakMap();
_submenus = new WeakMap();
_menuObserver = new WeakMap();
_popper = new WeakMap();
_focus = new WeakMap();
_isSliderActive = new WeakMap();
_isTriggerDisabled = new WeakMap();
_transitionCallbacks = new WeakMap();
_Menu_instances = new WeakSet();
observeSliders_fn = function () {
  let sliderActiveTimer = -1,
    parentSliderObserver = hasProvidedContext(sliderObserverContext)
      ? useContext(sliderObserverContext)
      : null;
  provideContext(sliderObserverContext, {
    onDragStart: () => {
      var _a6;
      (_a6 =
        parentSliderObserver == null
          ? void 0
          : parentSliderObserver.onDragStart) == null
        ? void 0
        : _a6.call(parentSliderObserver);
      window.clearTimeout(sliderActiveTimer);
      sliderActiveTimer = -1;
      __privateSet(this, _isSliderActive, true);
    },
    onDragEnd: () => {
      var _a6;
      (_a6 =
        parentSliderObserver == null
          ? void 0
          : parentSliderObserver.onDragEnd) == null
        ? void 0
        : _a6.call(parentSliderObserver);
      sliderActiveTimer = window.setTimeout(() => {
        __privateSet(this, _isSliderActive, false);
        sliderActiveTimer = -1;
      }, 300);
    },
  });
};
watchExpanded_fn = function () {
  const expanded = __privateMethod(this, _Menu_instances, isExpanded_fn).call(
    this
  );
  if (!this.isSubmenu) __privateGet(this, _onResize).call(this);
  __privateMethod(this, _Menu_instances, updateMenuItemsHidden_fn).call(
    this,
    expanded
  );
  if (!expanded) return;
  effect(() => {
    const { height } = __privateGet(this, _media36).$state,
      content = __privateGet(this, _content2).call(this);
    content && setStyle(content, '--player-height', height() + 'px');
  });
  __privateGet(this, _focus).listen();
  this.listen(
    'pointerup',
    __privateMethod(this, _Menu_instances, onPointerUp_fn).bind(this)
  );
  listenEvent(
    window,
    'pointerup',
    __privateMethod(this, _Menu_instances, onWindowPointerUp_fn).bind(this)
  );
};
attachMenuButton_fn = function (button) {
  const el = button.el,
    isMenuItem = this.isSubmenu,
    isARIADisabled = $ariaBool(
      __privateMethod(this, _Menu_instances, isDisabled_fn6).bind(this)
    );
  setAttributeIfEmpty(el, 'tabindex', isMenuItem ? '-1' : '0');
  setAttributeIfEmpty(el, 'role', isMenuItem ? 'menuitem' : 'button');
  setAttribute(el, 'id', __privateGet(this, _menuButtonId));
  setAttribute(el, 'aria-haspopup', 'menu');
  setAttribute(el, 'aria-expanded', 'false');
  setAttribute(el, 'data-root', !this.isSubmenu);
  setAttribute(el, 'data-submenu', this.isSubmenu);
  const watchAttrs = () => {
    setAttribute(el, 'data-open', __privateGet(this, _expanded).call(this));
    setAttribute(el, 'aria-disabled', isARIADisabled());
  };
  if (IS_SERVER) watchAttrs();
  else effect(watchAttrs);
  __privateGet(this, _trigger2).set(el);
  onDispose(() => {
    __privateGet(this, _trigger2).set(null);
  });
};
attachMenuItems_fn = function (items) {
  var _a6;
  const el = items.el;
  el.style.setProperty('display', 'none');
  setAttribute(el, 'id', __privateGet(this, _menuId));
  setAttributeIfEmpty(el, 'role', 'menu');
  setAttributeIfEmpty(el, 'tabindex', '-1');
  setAttribute(el, 'data-root', !this.isSubmenu);
  setAttribute(el, 'data-submenu', this.isSubmenu);
  __privateGet(this, _content2).set(el);
  onDispose(() => __privateGet(this, _content2).set(null));
  const watchAttrs = () =>
    setAttribute(el, 'data-open', __privateGet(this, _expanded).call(this));
  if (IS_SERVER) watchAttrs();
  else effect(watchAttrs);
  __privateGet(this, _focus).attachMenu(el);
  __privateMethod(this, _Menu_instances, updateMenuItemsHidden_fn).call(
    this,
    false
  );
  const onTransition = __privateMethod(
    this,
    _Menu_instances,
    onResizeTransition_fn
  ).bind(this);
  if (!this.isSubmenu) {
    items.listen('transitionstart', onTransition);
    items.listen('transitionend', onTransition);
    items.listen('animationend', __privateGet(this, _onResize));
    items.listen('vds-menu-resize', __privateGet(this, _onResize));
  } else {
    (_a6 = __privateGet(this, _parentMenu)) == null
      ? void 0
      : _a6.onTransitionEvent(onTransition);
  }
};
attachObserver_fn = function (observer) {
  __privateSet(this, _menuObserver, observer);
};
updateMenuItemsHidden_fn = function (expanded) {
  const content = peek(__privateGet(this, _content2));
  if (content) setAttribute(content, 'aria-hidden', ariaBool(!expanded));
};
disableMenuButton_fn = function (disabled) {
  __privateGet(this, _isTriggerDisabled).set(disabled);
};
_wasKeyboardExpand = new WeakMap();
onExpandedChange_fn = function (isExpanded, event2) {
  var _a6, _b2, _c2, _d2, _e, _f;
  __privateSet(this, _wasKeyboardExpand, isKeyboardEvent(event2));
  event2 == null ? void 0 : event2.stopPropagation();
  if (__privateGet(this, _expanded).call(this) === isExpanded) return;
  if (__privateMethod(this, _Menu_instances, isDisabled_fn6).call(this)) {
    if (isExpanded) __privateGet(this, _popper).hide(event2);
    return;
  }
  (_a6 = this.el) == null
    ? void 0
    : _a6.dispatchEvent(
        new Event('vds-menu-resize', {
          bubbles: true,
          composed: true,
        })
      );
  const trigger = __privateGet(this, _trigger2).call(this),
    content = __privateGet(this, _content2).call(this);
  if (trigger) {
    setAttribute(
      trigger,
      'aria-controls',
      isExpanded && __privateGet(this, _menuId)
    );
    setAttribute(trigger, 'aria-expanded', ariaBool(isExpanded));
  }
  if (content)
    setAttribute(
      content,
      'aria-labelledby',
      isExpanded && __privateGet(this, _menuButtonId)
    );
  __privateGet(this, _expanded).set(isExpanded);
  __privateMethod(this, _Menu_instances, toggleMediaControls_fn).call(
    this,
    event2
  );
  tick();
  if (__privateGet(this, _wasKeyboardExpand)) {
    if (isExpanded) content == null ? void 0 : content.focus();
    else trigger == null ? void 0 : trigger.focus();
    for (const el of [this.el, content]) {
      el && el.setAttribute('data-keyboard', '');
    }
  } else {
    for (const el of [this.el, content]) {
      el && el.removeAttribute('data-keyboard');
    }
  }
  this.dispatch(isExpanded ? 'open' : 'close', { trigger: event2 });
  if (isExpanded) {
    if (!this.isSubmenu && __privateGet(this, _media36).activeMenu !== this) {
      (_b2 = __privateGet(this, _media36).activeMenu) == null
        ? void 0
        : _b2.close(event2);
      __privateGet(this, _media36).activeMenu = this;
    }
    (_d2 =
      (_c2 = __privateGet(this, _menuObserver)) == null
        ? void 0
        : _c2.onOpen) == null
      ? void 0
      : _d2.call(_c2, event2);
  } else {
    if (this.isSubmenu) {
      for (const el of __privateGet(this, _submenus)) el.close(event2);
    } else {
      __privateGet(this, _media36).activeMenu = null;
    }
    (_f =
      (_e = __privateGet(this, _menuObserver)) == null ? void 0 : _e.onClose) ==
    null
      ? void 0
      : _f.call(_e, event2);
  }
  if (isExpanded) {
    requestAnimationFrame(
      __privateMethod(this, _Menu_instances, updateFocus_fn).bind(this)
    );
  }
};
updateFocus_fn = function () {
  if (
    __privateGet(this, _isTransitionActive) ||
    __privateGet(this, _isSubmenuOpen)
  )
    return;
  __privateGet(this, _focus).update();
  requestAnimationFrame(() => {
    if (__privateGet(this, _wasKeyboardExpand)) {
      __privateGet(this, _focus).focusActive();
    } else {
      __privateGet(this, _focus).scroll();
    }
  });
};
isExpanded_fn = function () {
  return (
    !__privateMethod(this, _Menu_instances, isDisabled_fn6).call(this) &&
    __privateGet(this, _expanded).call(this)
  );
};
isDisabled_fn6 = function () {
  return (
    __privateGet(this, _disabled).call(this) ||
    __privateGet(this, _isTriggerDisabled).call(this)
  );
};
disable_fn = function (disabled) {
  __privateGet(this, _disabled).set(disabled);
};
onPointerUp_fn = function (event2) {
  const content = __privateGet(this, _content2).call(this);
  if (
    __privateGet(this, _isSliderActive) ||
    (content && isEventInside(content, event2))
  ) {
    return;
  }
  event2.stopPropagation();
};
onWindowPointerUp_fn = function (event2) {
  const content = __privateGet(this, _content2).call(this);
  if (
    __privateGet(this, _isSliderActive) ||
    (content && isEventInside(content, event2))
  ) {
    return;
  }
  this.close(event2);
};
getCloseTarget_fn = function () {
  var _a6;
  const target =
    (_a6 = this.el) == null
      ? void 0
      : _a6.querySelector('[data-part="close-target"]');
  return this.el &&
    target &&
    isElementParent(
      this.el,
      target,
      (node) => node.getAttribute('role') === 'menu'
    )
    ? target
    : null;
};
toggleMediaControls_fn = function (trigger) {
  if (this.isSubmenu) return;
  if (__privateGet(this, _expanded).call(this))
    __privateGet(this, _media36).remote.pauseControls(trigger);
  else __privateGet(this, _media36).remote.resumeControls(trigger);
};
addSubmenu_fn = function (menu) {
  __privateGet(this, _submenus).add(menu);
  new EventsController(menu)
    .add('open', __privateGet(this, _onSubmenuOpenBind))
    .add('close', __privateGet(this, _onSubmenuCloseBind));
  onDispose(__privateGet(this, _removeSubmenuBind));
};
_removeSubmenuBind = new WeakMap();
removeSubmenu_fn = function (menu) {
  __privateGet(this, _submenus).delete(menu);
};
_isSubmenuOpen = new WeakMap();
_onSubmenuOpenBind = new WeakMap();
onSubmenuOpen_fn = function (event2) {
  var _a6;
  __privateSet(this, _isSubmenuOpen, true);
  const content = __privateGet(this, _content2).call(this);
  if (this.isSubmenu) {
    (_a6 = this.triggerElement) == null
      ? void 0
      : _a6.setAttribute('aria-hidden', 'true');
  }
  for (const target of __privateGet(this, _submenus)) {
    if (target !== event2.target) {
      for (const el of [target.el, target.triggerElement]) {
        el == null ? void 0 : el.setAttribute('aria-hidden', 'true');
      }
    }
  }
  if (content) {
    const el = event2.target.el;
    for (const child of content.children) {
      if (child.contains(el)) {
        child.setAttribute('data-open', '');
      } else if (child !== el) {
        child.setAttribute('data-hidden', '');
      }
    }
  }
};
_onSubmenuCloseBind = new WeakMap();
onSubmenuClose_fn = function (event2) {
  var _a6;
  __privateSet(this, _isSubmenuOpen, false);
  const content = __privateGet(this, _content2).call(this);
  if (this.isSubmenu) {
    (_a6 = this.triggerElement) == null
      ? void 0
      : _a6.setAttribute('aria-hidden', 'false');
  }
  for (const target of __privateGet(this, _submenus)) {
    for (const el of [target.el, target.triggerElement]) {
      el == null ? void 0 : el.setAttribute('aria-hidden', 'false');
    }
  }
  if (content) {
    for (const child of content.children) {
      child.removeAttribute('data-open');
      child.removeAttribute('data-hidden');
    }
  }
};
_onResize = new WeakMap();
_isTransitionActive = new WeakMap();
onResizeTransition_fn = function (event2) {
  const content = __privateGet(this, _content2).call(this);
  if (content && event2.propertyName === 'height') {
    __privateSet(this, _isTransitionActive, event2.type === 'transitionstart');
    setAttribute(
      content,
      'data-transition',
      __privateGet(this, _isTransitionActive) ? 'height' : null
    );
    if (__privateGet(this, _expanded).call(this))
      __privateMethod(this, _Menu_instances, updateFocus_fn).call(this);
  }
  for (const callback of __privateGet(this, _transitionCallbacks))
    callback(event2);
};
__publicField(Menu, 'props', {
  showDelay: 0,
});
__decorateClass([prop], Menu.prototype, 'triggerElement');
__decorateClass([prop], Menu.prototype, 'contentElement');
__decorateClass([prop], Menu.prototype, 'isSubmenu');
__decorateClass([method], Menu.prototype, 'open');
__decorateClass([method], Menu.prototype, 'close');
var _menu,
  _hintEl,
  _MenuButton_instances,
  watchDisabled_fn2,
  watchHintEl_fn,
  onMutation_fn2;
var MenuButton = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _MenuButton_instances);
    __privateAdd(this, _menu);
    __privateAdd(this, _hintEl, signal(null));
    new FocusVisibleController();
  }
  get expanded() {
    var _a6;
    return (
      ((_a6 = __privateGet(this, _menu)) == null ? void 0 : _a6.expanded()) ??
      false
    );
  }
  onSetup() {
    __privateSet(this, _menu, useContext(menuContext));
  }
  onAttach(el) {
    __privateGet(this, _menu).attachMenuButton(this);
    effect(
      __privateMethod(this, _MenuButton_instances, watchDisabled_fn2).bind(this)
    );
    setAttributeIfEmpty(el, 'type', 'button');
  }
  onConnect(el) {
    effect(
      __privateMethod(this, _MenuButton_instances, watchHintEl_fn).bind(this)
    );
    __privateMethod(this, _MenuButton_instances, onMutation_fn2).call(this);
    const mutations = new MutationObserver(
      __privateMethod(this, _MenuButton_instances, onMutation_fn2).bind(this)
    );
    mutations.observe(el, {
      attributeFilter: ['data-part'],
      childList: true,
      subtree: true,
    });
    onDispose(() => mutations.disconnect());
    onPress(el, (trigger) => {
      this.dispatch('select', { trigger });
    });
  }
};
_menu = new WeakMap();
_hintEl = new WeakMap();
_MenuButton_instances = new WeakSet();
watchDisabled_fn2 = function () {
  __privateGet(this, _menu).disableMenuButton(this.$props.disabled());
};
watchHintEl_fn = function () {
  const el = __privateGet(this, _hintEl).call(this);
  if (!el) return;
  effect(() => {
    const text = __privateGet(this, _menu).hint();
    if (text) el.textContent = text;
  });
};
onMutation_fn2 = function () {
  var _a6;
  const hintEl =
    (_a6 = this.el) == null ? void 0 : _a6.querySelector('[data-part="hint"]');
  __privateGet(this, _hintEl).set(hintEl ?? null);
};
__publicField(MenuButton, 'props', {
  disabled: false,
});
var menubutton__proto = MenuButton.prototype;
prop(menubutton__proto, 'expanded');
var MenuItem = class extends MenuButton {};
var _target3,
  _media37,
  _MenuPortal_instances,
  attachElement_fn,
  watchDisabled_fn3,
  portal_fn,
  getContainer_fn;
var MenuPortal = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _MenuPortal_instances);
    __privateAdd(this, _target3, null);
    __privateAdd(this, _media37);
  }
  onSetup() {
    __privateSet(this, _media37, useMediaContext());
    provideContext(menuPortalContext, {
      attach: __privateMethod(
        this,
        _MenuPortal_instances,
        attachElement_fn
      ).bind(this),
    });
  }
  onAttach(el) {
    el.style.setProperty('display', 'contents');
  }
  // Need this so connect scope is defined.
  onConnect(el) {}
  onDestroy() {
    var _a6;
    (_a6 = __privateGet(this, _target3)) == null ? void 0 : _a6.remove();
    __privateSet(this, _target3, null);
  }
};
_target3 = new WeakMap();
_media37 = new WeakMap();
_MenuPortal_instances = new WeakSet();
attachElement_fn = function (el) {
  __privateMethod(this, _MenuPortal_instances, portal_fn).call(this, false);
  __privateSet(this, _target3, el);
  requestScopedAnimationFrame(() => {
    requestScopedAnimationFrame(() => {
      if (!this.connectScope) return;
      effect(
        __privateMethod(this, _MenuPortal_instances, watchDisabled_fn3).bind(
          this
        )
      );
    });
  });
};
watchDisabled_fn3 = function () {
  const { fullscreen } = __privateGet(this, _media37).$state,
    { disabled } = this.$props;
  __privateMethod(this, _MenuPortal_instances, portal_fn).call(
    this,
    disabled() === 'fullscreen' ? !fullscreen() : !disabled()
  );
};
portal_fn = function (shouldPortal) {
  var _a6;
  if (!__privateGet(this, _target3)) return;
  let container = __privateMethod(
    this,
    _MenuPortal_instances,
    getContainer_fn
  ).call(this, this.$props.container());
  if (!container) return;
  const isPortalled = __privateGet(this, _target3).parentElement === container;
  setAttribute(__privateGet(this, _target3), 'data-portal', shouldPortal);
  if (shouldPortal) {
    if (!isPortalled) {
      __privateGet(this, _target3).remove();
      container.append(__privateGet(this, _target3));
    }
  } else if (
    isPortalled &&
    __privateGet(this, _target3).parentElement === container
  ) {
    __privateGet(this, _target3).remove();
    (_a6 = this.el) == null ? void 0 : _a6.append(__privateGet(this, _target3));
  }
};
getContainer_fn = function (selector) {
  if (isHTMLElement(selector)) return selector;
  return selector ? document.querySelector(selector) : document.body;
};
__publicField(MenuPortal, 'props', {
  container: null,
  disabled: false,
});
var menuPortalContext = createContext();
var _menu2, _MenuItems_instances, watchPlacement_fn2, hide_fn, getButton_fn2;
var MenuItems = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _MenuItems_instances);
    __privateAdd(this, _menu2);
    new FocusVisibleController();
    const { placement } = this.$props;
    this.setAttributes({
      'data-placement': placement,
    });
  }
  onAttach(el) {
    __privateSet(this, _menu2, useContext(menuContext));
    __privateGet(this, _menu2).attachMenuItems(this);
    if (hasProvidedContext(menuPortalContext)) {
      const portal = useContext(menuPortalContext);
      if (portal) {
        provideContext(menuPortalContext, null);
        portal.attach(el);
        onDispose(() => portal.attach(null));
      }
    }
  }
  onConnect(el) {
    effect(
      __privateMethod(this, _MenuItems_instances, watchPlacement_fn2).bind(this)
    );
  }
};
_menu2 = new WeakMap();
_MenuItems_instances = new WeakSet();
watchPlacement_fn2 = function () {
  const { expanded } = __privateGet(this, _menu2);
  if (!this.el || !expanded()) return;
  const placement = this.$props.placement();
  if (!placement) return;
  Object.assign(this.el.style, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 'max-content',
  });
  const { offset: mainOffset, alignOffset } = this.$props;
  onDispose(
    autoPlacement(
      this.el,
      __privateMethod(this, _MenuItems_instances, getButton_fn2).call(this),
      placement,
      {
        offsetVarName: 'media-menu',
        xOffset: alignOffset(),
        yOffset: mainOffset(),
      }
    )
  );
  onDispose(__privateMethod(this, _MenuItems_instances, hide_fn).bind(this));
};
hide_fn = function () {
  if (!this.el) return;
  this.el.removeAttribute('style');
  this.el.style.display = 'none';
};
getButton_fn2 = function () {
  return __privateGet(this, _menu2).button();
};
__publicField(MenuItems, 'props', {
  placement: null,
  offset: 0,
  alignOffset: 0,
});
var radioControllerContext = createContext();
var _group,
  _value,
  _controller2,
  _RadioGroupController_instances,
  addRadio_fn,
  removeRadio_fn,
  _onChangeBind,
  onChange_fn4,
  findRadio_fn;
var RadioGroupController = class extends ViewController {
  constructor() {
    super(...arguments);
    __privateAdd(this, _RadioGroupController_instances);
    __privateAdd(this, _group, /* @__PURE__ */ new Set());
    __privateAdd(this, _value, signal(''));
    __privateAdd(this, _controller2, null);
    __publicField(this, 'onValueChange');
    __privateAdd(
      this,
      _onChangeBind,
      __privateMethod(this, _RadioGroupController_instances, onChange_fn4).bind(
        this
      )
    );
  }
  get values() {
    return Array.from(__privateGet(this, _group)).map((radio) => radio.value());
  }
  get value() {
    return __privateGet(this, _value).call(this);
  }
  set value(value) {
    __privateMethod(this, _RadioGroupController_instances, onChange_fn4).call(
      this,
      value
    );
  }
  onSetup() {
    provideContext(radioControllerContext, {
      add: __privateMethod(
        this,
        _RadioGroupController_instances,
        addRadio_fn
      ).bind(this),
      remove: __privateMethod(
        this,
        _RadioGroupController_instances,
        removeRadio_fn
      ).bind(this),
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    if (!isMenuItem) setAttributeIfEmpty(el, 'role', 'radiogroup');
    this.setAttributes({ value: __privateGet(this, _value) });
  }
  onDestroy() {
    __privateGet(this, _group).clear();
  }
};
_group = new WeakMap();
_value = new WeakMap();
_controller2 = new WeakMap();
_RadioGroupController_instances = new WeakSet();
addRadio_fn = function (radio) {
  if (__privateGet(this, _group).has(radio)) return;
  __privateGet(this, _group).add(radio);
  radio.onCheck = __privateGet(this, _onChangeBind);
  radio.check(radio.value() === __privateGet(this, _value).call(this));
};
removeRadio_fn = function (radio) {
  radio.onCheck = null;
  __privateGet(this, _group).delete(radio);
};
_onChangeBind = new WeakMap();
onChange_fn4 = function (newValue, trigger) {
  var _a6;
  const currentValue = peek(__privateGet(this, _value));
  if (!newValue || newValue === currentValue) return;
  const currentRadio = __privateMethod(
      this,
      _RadioGroupController_instances,
      findRadio_fn
    ).call(this, currentValue),
    newRadio = __privateMethod(
      this,
      _RadioGroupController_instances,
      findRadio_fn
    ).call(this, newValue);
  currentRadio == null ? void 0 : currentRadio.check(false, trigger);
  newRadio == null ? void 0 : newRadio.check(true, trigger);
  __privateGet(this, _value).set(newValue);
  (_a6 = this.onValueChange) == null
    ? void 0
    : _a6.call(this, newValue, trigger);
};
findRadio_fn = function (newValue) {
  for (const radio of __privateGet(this, _group)) {
    if (newValue === peek(radio.value)) return radio;
  }
  return null;
};
var _controller3, _RadioGroup_instances, watchValue_fn3, onValueChange_fn6;
var RadioGroup = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _RadioGroup_instances);
    __privateAdd(this, _controller3);
    __privateSet(this, _controller3, new RadioGroupController());
    __privateGet(this, _controller3).onValueChange = __privateMethod(
      this,
      _RadioGroup_instances,
      onValueChange_fn6
    ).bind(this);
  }
  /**
   * A list of radio values that belong this group.
   */
  get values() {
    return __privateGet(this, _controller3).values;
  }
  /**
   * The radio value that is checked in this group.
   */
  get value() {
    return __privateGet(this, _controller3).value;
  }
  set value(newValue) {
    __privateGet(this, _controller3).value = newValue;
  }
  onSetup() {
    if (IS_SERVER)
      __privateMethod(this, _RadioGroup_instances, watchValue_fn3).call(this);
    else
      effect(
        __privateMethod(this, _RadioGroup_instances, watchValue_fn3).bind(this)
      );
  }
};
_controller3 = new WeakMap();
_RadioGroup_instances = new WeakSet();
watchValue_fn3 = function () {
  __privateGet(this, _controller3).value = this.$props.value();
};
onValueChange_fn6 = function (value, trigger) {
  const event2 = this.createEvent('change', { detail: value, trigger });
  this.dispatch(event2);
};
__publicField(RadioGroup, 'props', {
  value: '',
});
var radiogroup__proto = RadioGroup.prototype;
prop(radiogroup__proto, 'values');
prop(radiogroup__proto, 'value');
var _checked,
  _controller4,
  _Radio_instances,
  onDisconnect_fn5,
  addToGroup_fn,
  watchValue_fn4,
  onPress_fn10,
  check_fn,
  onChange_fn5,
  onSelect_fn;
var Radio = class extends Component {
  constructor() {
    super();
    __privateAdd(this, _Radio_instances);
    __privateAdd(this, _checked, signal(false));
    __privateAdd(this, _controller4, {
      value: this.$props.value,
      check: __privateMethod(this, _Radio_instances, check_fn).bind(this),
      onCheck: null,
    });
    new FocusVisibleController();
  }
  /**
   * Whether this radio is currently checked.
   */
  get checked() {
    return __privateGet(this, _checked).call(this);
  }
  onSetup() {
    this.setAttributes({
      value: this.$props.value,
      'data-checked': __privateGet(this, _checked),
      'aria-checked': $ariaBool(__privateGet(this, _checked)),
    });
  }
  onAttach(el) {
    const isMenuItem = hasProvidedContext(menuContext);
    setAttributeIfEmpty(el, 'tabindex', isMenuItem ? '-1' : '0');
    setAttributeIfEmpty(el, 'role', isMenuItem ? 'menuitemradio' : 'radio');
    effect(__privateMethod(this, _Radio_instances, watchValue_fn4).bind(this));
  }
  onConnect(el) {
    __privateMethod(this, _Radio_instances, addToGroup_fn).call(this);
    onPress(
      el,
      __privateMethod(this, _Radio_instances, onPress_fn10).bind(this)
    );
    onDispose(
      __privateMethod(this, _Radio_instances, onDisconnect_fn5).bind(this)
    );
  }
};
_checked = new WeakMap();
_controller4 = new WeakMap();
_Radio_instances = new WeakSet();
onDisconnect_fn5 = function () {
  scoped(() => {
    const group = useContext(radioControllerContext);
    group.remove(__privateGet(this, _controller4));
  }, this.connectScope);
};
addToGroup_fn = function () {
  const group = useContext(radioControllerContext);
  group.add(__privateGet(this, _controller4));
};
watchValue_fn4 = function () {
  var _a6, _b2;
  const { value } = this.$props,
    newValue = value();
  if (peek(__privateGet(this, _checked))) {
    (_b2 = (_a6 = __privateGet(this, _controller4)).onCheck) == null
      ? void 0
      : _b2.call(_a6, newValue);
  }
};
onPress_fn10 = function (event2) {
  var _a6, _b2;
  if (peek(__privateGet(this, _checked))) return;
  __privateMethod(this, _Radio_instances, onChange_fn5).call(
    this,
    true,
    event2
  );
  __privateMethod(this, _Radio_instances, onSelect_fn).call(this, event2);
  (_b2 = (_a6 = __privateGet(this, _controller4)).onCheck) == null
    ? void 0
    : _b2.call(_a6, peek(this.$props.value), event2);
};
check_fn = function (value, trigger) {
  if (peek(__privateGet(this, _checked)) === value) return;
  __privateMethod(this, _Radio_instances, onChange_fn5).call(
    this,
    value,
    trigger
  );
};
onChange_fn5 = function (value, trigger) {
  __privateGet(this, _checked).set(value);
  this.dispatch('change', { detail: value, trigger });
};
onSelect_fn = function (trigger) {
  this.dispatch('select', { trigger });
};
__publicField(Radio, 'props', {
  value: '',
});
var radio__proto = Radio.prototype;
prop(radio__proto, 'checked');
var _media38,
  _provider4,
  _Gesture_instances,
  attachListener_fn,
  _presses,
  _pressTimerId,
  acceptEvent_fn,
  handleEvent_fn,
  inBounds_fn,
  isTopLayer_fn,
  performAction_fn;
var Gesture = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Gesture_instances);
    __privateAdd(this, _media38);
    __privateAdd(this, _provider4, null);
    __privateAdd(this, _presses, 0);
    __privateAdd(this, _pressTimerId, -1);
  }
  onSetup() {
    __privateSet(this, _media38, useMediaContext());
    const { event: event2, action } = this.$props;
    this.setAttributes({
      event: event2,
      action,
    });
  }
  onAttach(el) {
    el.setAttribute('data-media-gesture', '');
    el.style.setProperty('pointer-events', 'none');
  }
  onConnect(el) {
    var _a6;
    __privateSet(
      this,
      _provider4,
      (_a6 = __privateGet(this, _media38).player.el) == null
        ? void 0
        : _a6.querySelector('[data-media-provider]')
    );
    effect(
      __privateMethod(this, _Gesture_instances, attachListener_fn).bind(this)
    );
  }
};
_media38 = new WeakMap();
_provider4 = new WeakMap();
_Gesture_instances = new WeakSet();
attachListener_fn = function () {
  let eventType = this.$props.event(),
    disabled = this.$props.disabled();
  if (!__privateGet(this, _provider4) || !eventType || disabled) return;
  if (/^dbl/.test(eventType)) {
    eventType = eventType.split(/^dbl/)[1];
  }
  if (eventType === 'pointerup' || eventType === 'pointerdown') {
    const pointer = __privateGet(this, _media38).$state.pointer();
    if (pointer === 'coarse') {
      eventType = eventType === 'pointerup' ? 'touchend' : 'touchstart';
    }
  }
  listenEvent(
    __privateGet(this, _provider4),
    eventType,
    __privateMethod(this, _Gesture_instances, acceptEvent_fn).bind(this),
    { passive: false }
  );
};
_presses = new WeakMap();
_pressTimerId = new WeakMap();
acceptEvent_fn = function (event2) {
  if (
    this.$props.disabled() ||
    (isPointerEvent(event2) &&
      (event2.button !== 0 || __privateGet(this, _media38).activeMenu)) ||
    (isTouchEvent(event2) && __privateGet(this, _media38).activeMenu) ||
    isTouchPinchEvent(event2) ||
    !__privateMethod(this, _Gesture_instances, inBounds_fn).call(this, event2)
  ) {
    return;
  }
  event2.MEDIA_GESTURE = true;
  event2.preventDefault();
  const eventType = peek(this.$props.event),
    isDblEvent = eventType == null ? void 0 : eventType.startsWith('dbl');
  if (!isDblEvent) {
    if (__privateGet(this, _presses) === 0) {
      setTimeout(() => {
        if (__privateGet(this, _presses) === 1)
          __privateMethod(this, _Gesture_instances, handleEvent_fn).call(
            this,
            event2
          );
      }, 250);
    }
  } else if (__privateGet(this, _presses) === 1) {
    queueMicrotask(() =>
      __privateMethod(this, _Gesture_instances, handleEvent_fn).call(
        this,
        event2
      )
    );
    clearTimeout(__privateGet(this, _pressTimerId));
    __privateSet(this, _presses, 0);
    return;
  }
  if (__privateGet(this, _presses) === 0) {
    __privateSet(
      this,
      _pressTimerId,
      window.setTimeout(() => {
        __privateSet(this, _presses, 0);
      }, 275)
    );
  }
  __privateWrapper(this, _presses)._++;
};
handleEvent_fn = function (event2) {
  this.el.setAttribute('data-triggered', '');
  requestAnimationFrame(() => {
    if (__privateMethod(this, _Gesture_instances, isTopLayer_fn).call(this)) {
      __privateMethod(this, _Gesture_instances, performAction_fn).call(
        this,
        peek(this.$props.action),
        event2
      );
    }
    requestAnimationFrame(() => {
      this.el.removeAttribute('data-triggered');
    });
  });
};
/** Validate event occurred in gesture bounds. */
inBounds_fn = function (event2) {
  if (!this.el) return false;
  if (isPointerEvent(event2) || isMouseEvent(event2) || isTouchEvent(event2)) {
    const touch = isTouchEvent(event2)
      ? event2.changedTouches[0] ?? event2.touches[0]
      : void 0;
    const clientX = (touch == null ? void 0 : touch.clientX) ?? event2.clientX;
    const clientY = (touch == null ? void 0 : touch.clientY) ?? event2.clientY;
    const rect = this.el.getBoundingClientRect();
    const inBounds =
      clientY >= rect.top &&
      clientY <= rect.bottom &&
      clientX >= rect.left &&
      clientX <= rect.right;
    return event2.type.includes('leave') ? !inBounds : inBounds;
  }
  return true;
};
/** Validate gesture has the highest z-index in this triggered group. */
isTopLayer_fn = function () {
  const gestures = __privateGet(this, _media38).player.el.querySelectorAll(
    '[data-media-gesture][data-triggered]'
  );
  return (
    Array.from(gestures).sort(
      (a, b) => +getComputedStyle(b).zIndex - +getComputedStyle(a).zIndex
    )[0] === this.el
  );
};
performAction_fn = function (action, trigger) {
  if (!action) return;
  const willTriggerEvent = new DOMEvent('will-trigger', {
    detail: action,
    cancelable: true,
    trigger,
  });
  this.dispatchEvent(willTriggerEvent);
  if (willTriggerEvent.defaultPrevented) return;
  const [method2, value] = action.replace(/:([a-z])/, '-$1').split(':');
  if (action.includes(':fullscreen')) {
    __privateGet(this, _media38).remote.toggleFullscreen(
      'prefer-media',
      trigger
    );
  } else if (action.includes('seek:')) {
    __privateGet(this, _media38).remote.seek(
      peek(__privateGet(this, _media38).$state.currentTime) + (+value || 0),
      trigger
    );
  } else {
    __privateGet(this, _media38).remote[kebabToCamelCase(method2)](trigger);
  }
  this.dispatch('trigger', {
    detail: action,
    trigger,
  });
};
__publicField(Gesture, 'props', {
  disabled: false,
  event: void 0,
  action: void 0,
});
var _track2,
  _renderer,
  _events2,
  _CaptionsTextRenderer_instances,
  changeTrack_fn;
var CaptionsTextRenderer = class {
  constructor(renderer) {
    __privateAdd(this, _CaptionsTextRenderer_instances);
    __publicField(this, 'priority', 10);
    __privateAdd(this, _track2, null);
    __privateAdd(this, _renderer);
    __privateAdd(this, _events2);
    __privateSet(this, _renderer, renderer);
  }
  attach() {}
  canRender() {
    return true;
  }
  detach() {
    var _a6;
    (_a6 = __privateGet(this, _events2)) == null ? void 0 : _a6.abort();
    __privateSet(this, _events2, void 0);
    __privateGet(this, _renderer).reset();
    __privateSet(this, _track2, null);
  }
  changeTrack(track) {
    var _a6;
    if (!track || __privateGet(this, _track2) === track) return;
    (_a6 = __privateGet(this, _events2)) == null ? void 0 : _a6.abort();
    __privateSet(this, _events2, new EventsController(track));
    if (track.readyState < 2) {
      __privateGet(this, _renderer).reset();
      __privateGet(this, _events2).add(
        'load',
        () =>
          __privateMethod(
            this,
            _CaptionsTextRenderer_instances,
            changeTrack_fn
          ).call(this, track),
        { once: true }
      );
    } else {
      __privateMethod(
        this,
        _CaptionsTextRenderer_instances,
        changeTrack_fn
      ).call(this, track);
    }
    __privateGet(this, _events2)
      .add('add-cue', (event2) => {
        __privateGet(this, _renderer).addCue(event2.detail);
      })
      .add('remove-cue', (event2) => {
        __privateGet(this, _renderer).removeCue(event2.detail);
      });
    __privateSet(this, _track2, track);
  }
};
_track2 = new WeakMap();
_renderer = new WeakMap();
_events2 = new WeakMap();
_CaptionsTextRenderer_instances = new WeakSet();
changeTrack_fn = function (track) {
  __privateGet(this, _renderer).changeTrack({
    cues: [...track.cues],
    regions: [...track.regions],
  });
};
var _media39,
  _Captions_instances,
  isHidden_fn2,
  watchViewType_fn,
  setupAudioView_fn,
  onTrackChange_fn3,
  onCueChange_fn,
  onUpdateTimedNodes_fn,
  setupVideoView_fn,
  watchTextDirection_fn,
  watchMediaTime_fn,
  listenToFontStyleChanges_fn,
  onFontStyleChange_fn,
  showExample_fn,
  _hideExampleTimer,
  hideExample_fn,
  removeExample_fn,
  createCueDisplayElement_fn,
  createCueElement_fn;
var _Captions = class _Captions extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Captions_instances);
    __privateAdd(this, _media39);
    __privateAdd(this, _hideExampleTimer, -1);
  }
  onSetup() {
    __privateSet(this, _media39, useMediaContext());
    this.setAttributes({
      'aria-hidden': $ariaBool(
        __privateMethod(this, _Captions_instances, isHidden_fn2).bind(this)
      ),
    });
  }
  onAttach(el) {
    el.style.setProperty('pointer-events', 'none');
  }
  onConnect(el) {
    if (!_Captions.lib()) {
      import('./dev-3UBCCOPC.js').then((lib) => _Captions.lib.set(lib));
    }
    effect(
      __privateMethod(this, _Captions_instances, watchViewType_fn).bind(this)
    );
  }
};
_media39 = new WeakMap();
_Captions_instances = new WeakSet();
isHidden_fn2 = function () {
  const { textTrack, remotePlaybackState, iOSControls } = __privateGet(
      this,
      _media39
    ).$state,
    track = textTrack();
  return (
    iOSControls() ||
    remotePlaybackState() === 'connected' ||
    !track ||
    !isTrackCaptionKind(track)
  );
};
watchViewType_fn = function () {
  if (!_Captions.lib()) return;
  const { viewType } = __privateGet(this, _media39).$state;
  if (viewType() === 'audio') {
    return __privateMethod(this, _Captions_instances, setupAudioView_fn).call(
      this
    );
  } else {
    return __privateMethod(this, _Captions_instances, setupVideoView_fn).call(
      this
    );
  }
};
setupAudioView_fn = function () {
  effect(
    __privateMethod(this, _Captions_instances, onTrackChange_fn3).bind(this)
  );
  __privateMethod(this, _Captions_instances, listenToFontStyleChanges_fn).call(
    this,
    null
  );
  return () => {
    this.el.textContent = '';
  };
};
onTrackChange_fn3 = function () {
  if (__privateMethod(this, _Captions_instances, isHidden_fn2).call(this))
    return;
  __privateMethod(this, _Captions_instances, onCueChange_fn).call(this);
  const { textTrack } = __privateGet(this, _media39).$state;
  listenEvent(
    textTrack(),
    'cue-change',
    __privateMethod(this, _Captions_instances, onCueChange_fn).bind(this)
  );
  effect(
    __privateMethod(this, _Captions_instances, onUpdateTimedNodes_fn).bind(this)
  );
};
onCueChange_fn = function () {
  this.el.textContent = '';
  if (__privateGet(this, _hideExampleTimer) >= 0) {
    __privateMethod(this, _Captions_instances, removeExample_fn).call(this);
  }
  const { realCurrentTime, textTrack } = __privateGet(this, _media39).$state,
    { renderVTTCueString } = _Captions.lib(),
    time = peek(realCurrentTime),
    activeCues = peek(textTrack).activeCues;
  for (const cue of activeCues) {
    const displayEl = __privateMethod(
        this,
        _Captions_instances,
        createCueDisplayElement_fn
      ).call(this),
      cueEl = __privateMethod(
        this,
        _Captions_instances,
        createCueElement_fn
      ).call(this);
    cueEl.innerHTML = renderVTTCueString(cue, time);
    displayEl.append(cueEl);
    this.el.append(cueEl);
  }
};
onUpdateTimedNodes_fn = function () {
  const { realCurrentTime } = __privateGet(this, _media39).$state,
    { updateTimedVTTCueNodes } = _Captions.lib();
  updateTimedVTTCueNodes(this.el, realCurrentTime());
};
setupVideoView_fn = function () {
  const { CaptionsRenderer } = _Captions.lib(),
    renderer = new CaptionsRenderer(this.el),
    textRenderer = new CaptionsTextRenderer(renderer);
  __privateGet(this, _media39).textRenderers.add(textRenderer);
  effect(
    __privateMethod(this, _Captions_instances, watchTextDirection_fn).bind(
      this,
      renderer
    )
  );
  effect(
    __privateMethod(this, _Captions_instances, watchMediaTime_fn).bind(
      this,
      renderer
    )
  );
  __privateMethod(this, _Captions_instances, listenToFontStyleChanges_fn).call(
    this,
    renderer
  );
  return () => {
    this.el.textContent = '';
    __privateGet(this, _media39).textRenderers.remove(textRenderer);
    renderer.destroy();
  };
};
watchTextDirection_fn = function (renderer) {
  renderer.dir = this.$props.textDir();
};
watchMediaTime_fn = function (renderer) {
  var _a6;
  if (__privateMethod(this, _Captions_instances, isHidden_fn2).call(this))
    return;
  const { realCurrentTime, textTrack } = __privateGet(this, _media39).$state;
  renderer.currentTime = realCurrentTime();
  if (
    __privateGet(this, _hideExampleTimer) >= 0 &&
    ((_a6 = textTrack()) == null ? void 0 : _a6.activeCues[0])
  ) {
    __privateMethod(this, _Captions_instances, removeExample_fn).call(this);
  }
};
listenToFontStyleChanges_fn = function (renderer) {
  const player = __privateGet(this, _media39).player;
  if (!player) return;
  const onChange = __privateMethod(
    this,
    _Captions_instances,
    onFontStyleChange_fn
  ).bind(this, renderer);
  listenEvent(player, 'vds-font-change', onChange);
};
onFontStyleChange_fn = function (renderer) {
  var _a6;
  if (__privateGet(this, _hideExampleTimer) >= 0) {
    __privateMethod(this, _Captions_instances, hideExample_fn).call(this);
    return;
  }
  const { textTrack } = __privateGet(this, _media39).$state;
  if (!((_a6 = textTrack()) == null ? void 0 : _a6.activeCues[0])) {
    __privateMethod(this, _Captions_instances, showExample_fn).call(this);
  } else {
    renderer == null ? void 0 : renderer.update(true);
  }
};
showExample_fn = function () {
  var _a6, _b2;
  const display = __privateMethod(
    this,
    _Captions_instances,
    createCueDisplayElement_fn
  ).call(this);
  setAttribute(display, 'data-example', '');
  const cue = __privateMethod(
    this,
    _Captions_instances,
    createCueElement_fn
  ).call(this);
  setAttribute(cue, 'data-example', '');
  cue.textContent = this.$props.exampleText();
  display == null ? void 0 : display.append(cue);
  (_a6 = this.el) == null ? void 0 : _a6.append(display);
  (_b2 = this.el) == null ? void 0 : _b2.setAttribute('data-example', '');
  __privateMethod(this, _Captions_instances, hideExample_fn).call(this);
};
_hideExampleTimer = new WeakMap();
hideExample_fn = function () {
  window.clearTimeout(__privateGet(this, _hideExampleTimer));
  __privateSet(
    this,
    _hideExampleTimer,
    window.setTimeout(
      __privateMethod(this, _Captions_instances, removeExample_fn).bind(this),
      2500
    )
  );
};
removeExample_fn = function () {
  var _a6, _b2;
  (_a6 = this.el) == null ? void 0 : _a6.removeAttribute('data-example');
  if ((_b2 = this.el) == null ? void 0 : _b2.querySelector('[data-example]'))
    this.el.textContent = '';
  __privateSet(this, _hideExampleTimer, -1);
};
createCueDisplayElement_fn = function () {
  const el = document.createElement('div');
  setAttribute(el, 'data-part', 'cue-display');
  return el;
};
createCueElement_fn = function () {
  const el = document.createElement('div');
  setAttribute(el, 'data-part', 'cue');
  return el;
};
__publicField(_Captions, 'props', {
  textDir: 'ltr',
  exampleText: 'Captions look like this.',
});
__publicField(_Captions, 'lib', signal(null));
var Captions = _Captions;
var _media40,
  _Poster_instances,
  hasError_fn3,
  onPreconnect_fn,
  watchHidden_fn4,
  isLoading_fn3,
  watchImg_fn2,
  _prevSrc,
  watchSrc_fn2,
  watchAlt_fn,
  watchCrossOrigin_fn4,
  onLoadStart_fn4,
  onLoad_fn,
  onError_fn7;
var Poster = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Poster_instances);
    __privateAdd(this, _media40);
    __privateAdd(this, _prevSrc, '');
  }
  onSetup() {
    __privateSet(this, _media40, useMediaContext());
    __privateMethod(this, _Poster_instances, watchSrc_fn2).call(this);
    __privateMethod(this, _Poster_instances, watchAlt_fn).call(this);
    __privateMethod(this, _Poster_instances, watchCrossOrigin_fn4).call(this);
    __privateMethod(this, _Poster_instances, watchHidden_fn4).call(this);
  }
  onAttach(el) {
    el.style.setProperty('pointer-events', 'none');
    effect(__privateMethod(this, _Poster_instances, watchImg_fn2).bind(this));
    effect(__privateMethod(this, _Poster_instances, watchSrc_fn2).bind(this));
    effect(__privateMethod(this, _Poster_instances, watchAlt_fn).bind(this));
    effect(
      __privateMethod(this, _Poster_instances, watchCrossOrigin_fn4).bind(this)
    );
    effect(
      __privateMethod(this, _Poster_instances, watchHidden_fn4).bind(this)
    );
    const { started } = __privateGet(this, _media40).$state;
    this.setAttributes({
      'data-visible': () => !started() && !this.$state.hidden(),
      'data-loading': __privateMethod(
        this,
        _Poster_instances,
        isLoading_fn3
      ).bind(this),
      'data-error': __privateMethod(this, _Poster_instances, hasError_fn3).bind(
        this
      ),
      'data-hidden': this.$state.hidden,
    });
  }
  onConnect(el) {
    effect(
      __privateMethod(this, _Poster_instances, onPreconnect_fn).bind(this)
    );
    effect(
      __privateMethod(this, _Poster_instances, onLoadStart_fn4).bind(this)
    );
  }
};
_media40 = new WeakMap();
_Poster_instances = new WeakSet();
hasError_fn3 = function () {
  const { error } = this.$state;
  return !isNull(error());
};
onPreconnect_fn = function () {
  const { canLoadPoster, poster } = __privateGet(this, _media40).$state;
  if (!canLoadPoster() && poster()) preconnect(poster(), 'preconnect');
};
watchHidden_fn4 = function () {
  const { src } = this.$props,
    { poster, nativeControls } = __privateGet(this, _media40).$state;
  this.el && setAttribute(this.el, 'display', nativeControls() ? 'none' : null);
  this.$state.hidden.set(
    __privateMethod(this, _Poster_instances, hasError_fn3).call(this) ||
      !(src() || poster()) ||
      nativeControls()
  );
};
isLoading_fn3 = function () {
  const { loading, hidden } = this.$state;
  return !hidden() && loading();
};
watchImg_fn2 = function () {
  const img = this.$state.img();
  if (!img) return;
  new EventsController(img)
    .add('load', __privateMethod(this, _Poster_instances, onLoad_fn).bind(this))
    .add(
      'error',
      __privateMethod(this, _Poster_instances, onError_fn7).bind(this)
    );
  if (img.complete)
    __privateMethod(this, _Poster_instances, onLoad_fn).call(this);
};
_prevSrc = new WeakMap();
watchSrc_fn2 = function () {
  const { poster: defaultPoster } = __privateGet(this, _media40).$props,
    { canLoadPoster, providedPoster, inferredPoster } = __privateGet(
      this,
      _media40
    ).$state;
  const src = this.$props.src() || '',
    poster = src || defaultPoster() || inferredPoster();
  if (__privateGet(this, _prevSrc) === providedPoster()) {
    providedPoster.set(src);
  }
  this.$state.src.set(canLoadPoster() && poster.length ? poster : null);
  __privateSet(this, _prevSrc, src);
};
watchAlt_fn = function () {
  const { src } = this.$props,
    { alt } = this.$state,
    { poster } = __privateGet(this, _media40).$state;
  alt.set(src() || poster() ? this.$props.alt() : null);
};
watchCrossOrigin_fn4 = function () {
  const { crossOrigin: crossOriginProp } = this.$props,
    { crossOrigin: crossOriginState } = this.$state,
    { crossOrigin: mediaCrossOrigin, poster: src } = __privateGet(
      this,
      _media40
    ).$state,
    crossOrigin =
      crossOriginProp() !== null ? crossOriginProp() : mediaCrossOrigin();
  crossOriginState.set(
    /ytimg\.com|vimeo/.test(src() || '')
      ? null
      : crossOrigin === true
      ? 'anonymous'
      : crossOrigin
  );
};
onLoadStart_fn4 = function () {
  const { loading, error } = this.$state,
    { canLoadPoster, poster } = __privateGet(this, _media40).$state;
  loading.set(canLoadPoster() && !!poster());
  error.set(null);
};
onLoad_fn = function () {
  const { loading, error } = this.$state;
  loading.set(false);
  error.set(null);
};
onError_fn7 = function (event2) {
  const { loading, error } = this.$state;
  loading.set(false);
  error.set(event2);
};
__publicField(Poster, 'props', {
  src: null,
  alt: null,
  crossOrigin: null,
});
__publicField(
  Poster,
  'state',
  new State({
    img: null,
    src: null,
    alt: null,
    crossOrigin: null,
    loading: true,
    error: null,
    hidden: false,
  })
);
var _media41,
  _invert,
  _isVisible2,
  _isIntersecting2,
  _Time_instances,
  onIntersectionChange_fn2,
  watchHidden_fn5,
  watchToggle_fn,
  watchTime_fn,
  watchRole_fn,
  getSeconds_fn,
  shouldInvert_fn,
  onToggle_fn;
var Time = class extends Component {
  constructor() {
    super(...arguments);
    __privateAdd(this, _Time_instances);
    __privateAdd(this, _media41);
    __privateAdd(this, _invert, signal(null));
    __privateAdd(this, _isVisible2, signal(true));
    __privateAdd(this, _isIntersecting2, signal(true));
  }
  onSetup() {
    __privateSet(this, _media41, useMediaContext());
    __privateMethod(this, _Time_instances, watchTime_fn).call(this);
    const { type } = this.$props;
    this.setAttributes({
      'data-type': type,
      'data-remainder': __privateMethod(
        this,
        _Time_instances,
        shouldInvert_fn
      ).bind(this),
    });
    new IntersectionObserverController({
      callback: __privateMethod(
        this,
        _Time_instances,
        onIntersectionChange_fn2
      ).bind(this),
    }).attach(this);
  }
  onAttach(el) {
    if (!el.hasAttribute('role'))
      effect(__privateMethod(this, _Time_instances, watchRole_fn).bind(this));
    effect(__privateMethod(this, _Time_instances, watchTime_fn).bind(this));
  }
  onConnect(el) {
    onDispose(observeVisibility(el, __privateGet(this, _isVisible2).set));
    effect(__privateMethod(this, _Time_instances, watchHidden_fn5).bind(this));
    effect(__privateMethod(this, _Time_instances, watchToggle_fn).bind(this));
  }
};
_media41 = new WeakMap();
_invert = new WeakMap();
_isVisible2 = new WeakMap();
_isIntersecting2 = new WeakMap();
_Time_instances = new WeakSet();
onIntersectionChange_fn2 = function (entries) {
  __privateGet(this, _isIntersecting2).set(entries[0].isIntersecting);
};
watchHidden_fn5 = function () {
  const { hidden } = this.$props;
  this.$state.hidden.set(
    hidden() ||
      !__privateGet(this, _isVisible2).call(this) ||
      !__privateGet(this, _isIntersecting2).call(this)
  );
};
watchToggle_fn = function () {
  if (!this.$props.toggle()) {
    __privateGet(this, _invert).set(null);
    return;
  }
  if (this.el) {
    onPress(
      this.el,
      __privateMethod(this, _Time_instances, onToggle_fn).bind(this)
    );
  }
};
watchTime_fn = function () {
  const { hidden, timeText } = this.$state,
    { duration } = __privateGet(this, _media41).$state;
  if (hidden()) return;
  const { type, padHours, padMinutes, showHours } = this.$props,
    seconds = __privateMethod(this, _Time_instances, getSeconds_fn).call(
      this,
      type()
    ),
    $duration = duration(),
    shouldInvert = __privateMethod(this, _Time_instances, shouldInvert_fn).call(
      this
    );
  if (!Number.isFinite(seconds + $duration)) {
    timeText.set('LIVE');
    return;
  }
  const time = shouldInvert ? Math.max(0, $duration - seconds) : seconds,
    formattedTime = formatTime(time, {
      padHrs: padHours(),
      padMins: padMinutes(),
      showHrs: showHours(),
    });
  timeText.set((shouldInvert ? '-' : '') + formattedTime);
};
watchRole_fn = function () {
  if (!this.el) return;
  const { toggle } = this.$props;
  setAttribute(this.el, 'role', toggle() ? 'timer' : null);
  setAttribute(this.el, 'tabindex', toggle() ? 0 : null);
};
getSeconds_fn = function (type) {
  const { bufferedEnd, duration, currentTime } = __privateGet(
    this,
    _media41
  ).$state;
  switch (type) {
    case 'buffered':
      return bufferedEnd();
    case 'duration':
      return duration();
    default:
      return currentTime();
  }
};
shouldInvert_fn = function () {
  return (
    this.$props.remainder() && __privateGet(this, _invert).call(this) !== false
  );
};
onToggle_fn = function (event2) {
  event2.preventDefault();
  if (__privateGet(this, _invert).call(this) === null) {
    __privateGet(this, _invert).set(!this.$props.remainder());
    return;
  }
  __privateGet(this, _invert).set((v) => !v);
};
__publicField(Time, 'props', {
  type: 'current',
  showHours: false,
  padHours: null,
  padMinutes: null,
  remainder: false,
  toggle: false,
  hidden: false,
});
__publicField(
  Time,
  'state',
  new State({
    timeText: '',
    hidden: false,
  })
);
var MediaPlayerInstance = class extends MediaPlayer {};
var MediaProviderInstance = class extends MediaProvider {};
var MediaAnnouncerInstance = class extends MediaAnnouncer {};
var ControlsInstance = class extends Controls {};
var ControlsGroupInstance = class extends ControlsGroup {};
var ToggleButtonInstance = class extends ToggleButton {};
var CaptionButtonInstance = class extends CaptionButton {};
var FullscreenButtonInstance = class extends FullscreenButton {};
var LiveButtonInstance = class extends LiveButton {};
var MuteButtonInstance = class extends MuteButton {};
var PIPButtonInstance = class extends PIPButton {};
var PlayButtonInstance = class extends PlayButton {};
var AirPlayButtonInstance = class extends AirPlayButton {};
var GoogleCastButtonInstance = class extends GoogleCastButton {};
var SeekButtonInstance = class extends SeekButton {};
var TooltipInstance = class extends Tooltip {};
var TooltipTriggerInstance = class extends TooltipTrigger {};
var TooltipContentInstance = class extends TooltipContent {};
var SliderInstance = class extends Slider {};
var TimeSliderInstance = class extends TimeSlider {};
var VolumeSliderInstance = class extends VolumeSlider {};
var AudioGainSliderInstance = class extends AudioGainSlider {};
var SpeedSliderInstance = class extends SpeedSlider {};
var QualitySliderInstance = class extends QualitySlider {};
var SliderThumbnailInstance = class extends SliderThumbnail {};
var SliderValueInstance = class extends SliderValue {};
var SliderVideoInstance = class extends SliderVideo {};
var SliderPreviewInstance = class extends SliderPreview {};
var SliderChaptersInstance = class extends SliderChapters {};
var MenuInstance = class extends Menu {};
var MenuButtonInstance = class extends MenuButton {};
var MenuItemsInstance = class extends MenuItems {};
var MenuItemInstance = class extends MenuItem {};
var MenuPortalInstance = class extends MenuPortal {};
var RadioGroupInstance = class extends RadioGroup {};
var RadioInstance = class extends Radio {};
var CaptionsInstance = class extends Captions {};
var GestureInstance = class extends Gesture {};
var PosterInstance = class extends Poster {};
var ThumbnailInstance = class extends Thumbnail {};
var TimeInstance = class extends Time {};
var Slot = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const childrenArray = React.Children.toArray(children);
  const slottable = childrenArray.find(isSlottable);
  if (slottable) {
    const newElement = slottable.props.children;
    const newChildren = childrenArray.map((child) => {
      if (child === slottable) {
        if (React.Children.count(newElement) > 1)
          return React.Children.only(null);
        return React.isValidElement(newElement)
          ? newElement.props.children
          : null;
      } else {
        return child;
      }
    });
    return React.createElement(
      SlotClone,
      { ...slotProps, ref: forwardedRef },
      React.isValidElement(newElement)
        ? React.cloneElement(newElement, void 0, newChildren)
        : null
    );
  }
  return React.createElement(
    SlotClone,
    { ...slotProps, ref: forwardedRef },
    children
  );
});
Slot.displayName = 'Slot';
var SlotClone = React.forwardRef((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...mergeProps(slotProps, children.props),
      ref: forwardedRef
        ? composeRefs(forwardedRef, children.ref)
        : children.ref,
    });
  }
  return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = 'SlotClone';
var Slottable = ({ children }) => {
  return React.createElement(React.Fragment, null, children);
};
function isSlottable(child) {
  return React.isValidElement(child) && child.type === Slottable;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          childPropValue(...args);
          slotPropValue(...args);
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === 'style') {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === 'className') {
      overrideProps[propName] = [slotPropValue, childPropValue]
        .filter(Boolean)
        .join(' ');
    }
  }
  return { ...slotProps, ...overrideProps };
}
var NODES = ['button', 'div', 'span', 'img', 'video', 'audio'];
var Primitive = NODES.reduce((primitives, node) => {
  const Node2 = React.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot : node;
    return React.createElement(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node2.displayName = `Primitive.${node}`;
  return { ...primitives, [node]: Node2 };
}, {});
function isRemotionProvider(provider2) {
  return (
    (provider2 == null ? void 0 : provider2.$$PROVIDER_TYPE) === 'REMOTION'
  );
}
function isRemotionSrc(src) {
  return (src == null ? void 0 : src.type) === 'video/remotion';
}
var sliderStateRecord = SliderInstance.state.record;
var initialSliderStore = Object.keys(sliderStateRecord).reduce(
  (store, prop2) => ({
    ...store,
    [prop2]() {
      return sliderStateRecord[prop2];
    },
  }),
  {}
);
function useSliderState(prop2, ref) {
  var _a6;
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderState\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignal(
    (((_a6 = ref == null ? void 0 : ref.current) == null
      ? void 0
      : _a6.$state) ||
      $state ||
      initialSliderStore)[prop2]
  );
}
function useSliderStore(ref) {
  const $state = useStateContext(sliderState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useSliderStore\` requires \`RefObject<SliderInstance>\` argument if called outside of a slider component`
    );
  }
  return useSignalRecord(
    (ref == null ? void 0 : ref.current)
      ? ref.current.$state
      : $state || initialSliderStore
  );
}
var mediaStateRecord = MediaPlayerInstance.state.record;
var initialMediaStore = Object.keys(mediaStateRecord).reduce(
  (store, prop2) => ({
    ...store,
    [prop2]() {
      return mediaStateRecord[prop2];
    },
  }),
  {}
);
function useMediaState(prop2, ref) {
  var _a6;
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaState\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignal(
    (((_a6 = ref == null ? void 0 : ref.current) == null
      ? void 0
      : _a6.$state) ||
      $state ||
      initialMediaStore)[prop2]
  );
}
function useMediaStore(ref) {
  const $state = useStateContext(mediaState);
  if (!$state && !ref) {
    console.warn(
      `[vidstack] \`useMediaStore\` requires \`RefObject<MediaPlayerInstance>\` argument if called outside the \`<MediaPlayer>\` component`
    );
  }
  return useSignalRecord(
    (ref == null ? void 0 : ref.current)
      ? ref.current.$state
      : $state || initialMediaStore
  );
}

export {
  isVideoQualitySrc,
  IS_SERVER,
  IS_IOS,
  IS_CHROME,
  canOrientScreen,
  canRotateScreen,
  canPlayHLSNatively,
  canUsePictureInPicture,
  canUseVideoPresentation,
  canChangeVolume,
  isHLSSupported,
  TimeRange,
  getTimeRangesStart,
  getTimeRangesEnd,
  normalizeTimeIntervals,
  updateTimeIntervals,
  AUDIO_EXTENSIONS,
  AUDIO_TYPES,
  VIDEO_EXTENSIONS,
  VIDEO_TYPES,
  HLS_VIDEO_EXTENSIONS,
  DASH_VIDEO_EXTENSIONS,
  HLS_VIDEO_TYPES,
  DASH_VIDEO_TYPES,
  isAudioSrc,
  isVideoSrc,
  isHLSSrc,
  isDASHSrc,
  canGoogleCastSrc,
  isMediaStream,
  appendParamsToURL,
  preconnect,
  loadScript,
  getDownloadFile,
  TextTrackSymbol,
  findActiveCue,
  isCueActive,
  watchActiveTextTrack,
  watchCueTextChange,
  TextTrack,
  isTrackCaptionKind,
  parseJSONCaptionsFile,
  mediaState,
  softResetMediaState,
  boundTime,
  mediaContext,
  useMediaContext,
  Logger,
  MediaRemoteControl,
  LocalMediaStorage,
  ListSymbol,
  List,
  AudioTrackList,
  TextRenderers,
  TextTrackList,
  QualitySymbol,
  VideoQualityList,
  sortVideoQualities,
  isAudioProvider,
  isVideoProvider,
  isHLSProvider,
  isDASHProvider,
  isYouTubeProvider,
  isVimeoProvider,
  isGoogleCastProvider,
  isHTMLAudioElement,
  isHTMLVideoElement,
  isHTMLMediaElement,
  isHTMLIFrameElement,
  MEDIA_KEY_SHORTCUTS,
  ARIAKeyShortcuts,
  MediaControls,
  FullscreenController,
  canFullscreen,
  ScreenOrientationController,
  AudioProviderLoader,
  VideoProviderLoader,
  HLSProviderLoader,
  RAFLoop,
  HTMLMediaProvider,
  HTMLAirPlayAdapter,
  VideoProvider,
  coerceToError,
  DASHProviderLoader,
  VimeoProviderLoader,
  YouTubeProviderLoader,
  formatTime,
  formatSpokenTime,
  sliderState,
  ThumbnailsLoader,
  updateSliderPreviewPlacement,
  menuContext,
  RadioGroupController,
  MediaPlayerInstance,
  MediaProviderInstance,
  MediaAnnouncerInstance,
  ControlsInstance,
  ControlsGroupInstance,
  ToggleButtonInstance,
  CaptionButtonInstance,
  FullscreenButtonInstance,
  LiveButtonInstance,
  MuteButtonInstance,
  PIPButtonInstance,
  PlayButtonInstance,
  AirPlayButtonInstance,
  GoogleCastButtonInstance,
  SeekButtonInstance,
  TooltipInstance,
  TooltipTriggerInstance,
  TooltipContentInstance,
  SliderInstance,
  TimeSliderInstance,
  VolumeSliderInstance,
  AudioGainSliderInstance,
  SpeedSliderInstance,
  QualitySliderInstance,
  SliderThumbnailInstance,
  SliderValueInstance,
  SliderVideoInstance,
  SliderPreviewInstance,
  SliderChaptersInstance,
  MenuInstance,
  MenuButtonInstance,
  MenuItemsInstance,
  MenuItemInstance,
  MenuPortalInstance,
  RadioGroupInstance,
  RadioInstance,
  CaptionsInstance,
  GestureInstance,
  PosterInstance,
  ThumbnailInstance,
  TimeInstance,
  Primitive,
  isRemotionProvider,
  isRemotionSrc,
  useSliderState,
  useSliderStore,
  useMediaState,
  useMediaStore,
};
//# sourceMappingURL=chunk-AB3KZNRI.js.map
