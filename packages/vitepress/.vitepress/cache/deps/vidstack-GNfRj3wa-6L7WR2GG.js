'use client';
import {
  IS_CHROME,
  ListSymbol,
  QualitySymbol,
  RAFLoop,
  TextTrack,
  TextTrackSymbol,
  VideoProvider,
  coerceToError,
  isHLSSupported,
  loadScript,
  preconnect,
} from './chunk-AB3KZNRI.js';
import {
  DOMEvent,
  camelToKebabCase,
  effect,
  isFunction,
  isString,
  isUndefined,
  listenEvent,
  peek,
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

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-GNfRj3wa.js
var import_react = __toESM(require_react(), 1);
var toDOMEventType = (type) => camelToKebabCase(type);
var _video,
  _ctx,
  _instance,
  _stopLiveSync,
  _callbacks,
  _HLSController_instances,
  createDOMEvent_fn,
  liveSync_fn,
  liveSyncPosition_fn,
  dispatchHLSEvent_fn,
  onTracksFound_fn,
  onCuesParsed_fn,
  onAudioSwitch_fn,
  onLevelSwitched_fn,
  onLevelUpdated_fn,
  onLevelLoaded_fn,
  onError_fn,
  onFatalError_fn,
  enableAutoQuality_fn,
  onUserQualityChange_fn,
  onUserAudioChange_fn;
var HLSController = class {
  constructor(video, ctx) {
    __privateAdd(this, _HLSController_instances);
    __privateAdd(this, _video);
    __privateAdd(this, _ctx);
    __privateAdd(this, _instance, null);
    __privateAdd(this, _stopLiveSync, null);
    __publicField(this, 'config', {});
    __privateAdd(this, _callbacks, /* @__PURE__ */ new Set());
    __privateSet(this, _video, video);
    __privateSet(this, _ctx, ctx);
  }
  get instance() {
    return __privateGet(this, _instance);
  }
  setup(ctor) {
    const { streamType } = __privateGet(this, _ctx).$state;
    const isLive = peek(streamType).includes('live'),
      isLiveLowLatency = peek(streamType).includes('ll-');
    __privateSet(
      this,
      _instance,
      new ctor({
        lowLatencyMode: isLiveLowLatency,
        backBufferLength: isLiveLowLatency ? 4 : isLive ? 8 : void 0,
        renderTextTracksNatively: false,
        ...this.config,
      })
    );
    const dispatcher = __privateMethod(
      this,
      _HLSController_instances,
      dispatchHLSEvent_fn
    ).bind(this);
    for (const event of Object.values(ctor.Events))
      __privateGet(this, _instance).on(event, dispatcher);
    __privateGet(this, _instance).on(
      ctor.Events.ERROR,
      __privateMethod(this, _HLSController_instances, onError_fn).bind(this)
    );
    for (const callback of __privateGet(this, _callbacks))
      callback(__privateGet(this, _instance));
    __privateGet(this, _ctx).player.dispatch('hls-instance', {
      detail: __privateGet(this, _instance),
    });
    __privateGet(this, _instance).attachMedia(__privateGet(this, _video));
    __privateGet(this, _instance).on(
      ctor.Events.AUDIO_TRACK_SWITCHED,
      __privateMethod(this, _HLSController_instances, onAudioSwitch_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.Events.LEVEL_SWITCHED,
      __privateMethod(this, _HLSController_instances, onLevelSwitched_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.Events.LEVEL_LOADED,
      __privateMethod(this, _HLSController_instances, onLevelLoaded_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.Events.LEVEL_UPDATED,
      __privateMethod(this, _HLSController_instances, onLevelUpdated_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.Events.NON_NATIVE_TEXT_TRACKS_FOUND,
      __privateMethod(this, _HLSController_instances, onTracksFound_fn).bind(
        this
      )
    );
    __privateGet(this, _instance).on(
      ctor.Events.CUES_PARSED,
      __privateMethod(this, _HLSController_instances, onCuesParsed_fn).bind(
        this
      )
    );
    __privateGet(this, _ctx).qualities[QualitySymbol.enableAuto] =
      __privateMethod(
        this,
        _HLSController_instances,
        enableAutoQuality_fn
      ).bind(this);
    listenEvent(
      __privateGet(this, _ctx).qualities,
      'change',
      __privateMethod(
        this,
        _HLSController_instances,
        onUserQualityChange_fn
      ).bind(this)
    );
    listenEvent(
      __privateGet(this, _ctx).audioTracks,
      'change',
      __privateMethod(
        this,
        _HLSController_instances,
        onUserAudioChange_fn
      ).bind(this)
    );
    __privateSet(
      this,
      _stopLiveSync,
      effect(
        __privateMethod(this, _HLSController_instances, liveSync_fn).bind(this)
      )
    );
  }
  onInstance(callback) {
    __privateGet(this, _callbacks).add(callback);
    return () => __privateGet(this, _callbacks).delete(callback);
  }
  loadSource(src) {
    var _a;
    if (!isString(src.src)) return;
    (_a = __privateGet(this, _instance)) == null
      ? void 0
      : _a.loadSource(src.src);
  }
  destroy() {
    var _a, _b, _c, _d;
    (_a = __privateGet(this, _instance)) == null ? void 0 : _a.destroy();
    __privateSet(this, _instance, null);
    (_b = __privateGet(this, _stopLiveSync)) == null ? void 0 : _b.call(this);
    __privateSet(this, _stopLiveSync, null);
    (_d = (_c = __privateGet(this, _ctx)) == null ? void 0 : _c.logger) == null
      ? void 0
      : _d.info('🏗️ Destroyed HLS instance');
  }
};
_video = new WeakMap();
_ctx = new WeakMap();
_instance = new WeakMap();
_stopLiveSync = new WeakMap();
_callbacks = new WeakMap();
_HLSController_instances = new WeakSet();
createDOMEvent_fn = function (type, data) {
  return new DOMEvent(toDOMEventType(type), { detail: data });
};
liveSync_fn = function () {
  if (!__privateGet(this, _ctx).$state.live()) return;
  const raf = new RAFLoop(
    __privateMethod(this, _HLSController_instances, liveSyncPosition_fn).bind(
      this
    )
  );
  raf.start();
  return raf.stop.bind(raf);
};
liveSyncPosition_fn = function () {
  var _a;
  __privateGet(this, _ctx).$state.liveSyncPosition.set(
    ((_a = __privateGet(this, _instance)) == null
      ? void 0
      : _a.liveSyncPosition) ?? Infinity
  );
};
dispatchHLSEvent_fn = function (type, data) {
  var _a;
  (_a = __privateGet(this, _ctx).player) == null
    ? void 0
    : _a.dispatch(
        __privateMethod(this, _HLSController_instances, createDOMEvent_fn).call(
          this,
          type,
          data
        )
      );
};
onTracksFound_fn = function (eventType, data) {
  const event = __privateMethod(
    this,
    _HLSController_instances,
    createDOMEvent_fn
  ).call(this, eventType, data);
  let currentTrack = -1;
  for (let i = 0; i < data.tracks.length; i++) {
    const nonNativeTrack = data.tracks[i],
      init = nonNativeTrack.subtitleTrack ?? nonNativeTrack.closedCaptions,
      track = new TextTrack({
        id: `hls-${nonNativeTrack.kind}-${i}`,
        src: init == null ? void 0 : init.url,
        label: nonNativeTrack.label,
        language: init == null ? void 0 : init.lang,
        kind: nonNativeTrack.kind,
        default: nonNativeTrack.default,
      });
    track[TextTrackSymbol.readyState] = 2;
    track[TextTrackSymbol.onModeChange] = () => {
      if (track.mode === 'showing') {
        __privateGet(this, _instance).subtitleTrack = i;
        currentTrack = i;
      } else if (currentTrack === i) {
        __privateGet(this, _instance).subtitleTrack = -1;
        currentTrack = -1;
      }
    };
    __privateGet(this, _ctx).textTracks.add(track, event);
  }
};
onCuesParsed_fn = function (eventType, data) {
  var _a;
  const index =
      (_a = __privateGet(this, _instance)) == null ? void 0 : _a.subtitleTrack,
    track = __privateGet(this, _ctx).textTracks.getById(
      `hls-${data.type}-${index}`
    );
  if (!track) return;
  const event = __privateMethod(
    this,
    _HLSController_instances,
    createDOMEvent_fn
  ).call(this, eventType, data);
  for (const cue of data.cues) {
    cue.positionAlign = 'auto';
    track.addCue(cue, event);
  }
};
onAudioSwitch_fn = function (eventType, data) {
  const track = __privateGet(this, _ctx).audioTracks[data.id];
  if (track) {
    const trigger = __privateMethod(
      this,
      _HLSController_instances,
      createDOMEvent_fn
    ).call(this, eventType, data);
    __privateGet(this, _ctx).audioTracks[ListSymbol.select](
      track,
      true,
      trigger
    );
  }
};
onLevelSwitched_fn = function (eventType, data) {
  const quality = __privateGet(this, _ctx).qualities[data.level];
  if (quality) {
    const trigger = __privateMethod(
      this,
      _HLSController_instances,
      createDOMEvent_fn
    ).call(this, eventType, data);
    __privateGet(this, _ctx).qualities[ListSymbol.select](
      quality,
      true,
      trigger
    );
  }
};
onLevelUpdated_fn = function (eventType, data) {
  if (data.details.totalduration > 0) {
    __privateGet(this, _ctx).$state.inferredLiveDVRWindow.set(
      data.details.totalduration
    );
  }
};
onLevelLoaded_fn = function (eventType, data) {
  var _a;
  if (__privateGet(this, _ctx).$state.canPlay()) return;
  const { type, live, totalduration: duration, targetduration } = data.details,
    trigger = __privateMethod(
      this,
      _HLSController_instances,
      createDOMEvent_fn
    ).call(this, eventType, data);
  __privateGet(this, _ctx).notify(
    'stream-type-change',
    live
      ? type === 'EVENT' && Number.isFinite(duration) && targetduration >= 10
        ? 'live:dvr'
        : 'live'
      : 'on-demand',
    trigger
  );
  __privateGet(this, _ctx).notify('duration-change', duration, trigger);
  const media = __privateGet(this, _instance).media;
  if (__privateGet(this, _instance).currentLevel === -1) {
    __privateGet(this, _ctx).qualities[QualitySymbol.setAuto](true, trigger);
  }
  for (const remoteTrack of __privateGet(this, _instance).audioTracks) {
    const localTrack = {
      id: remoteTrack.id.toString(),
      label: remoteTrack.name,
      language: remoteTrack.lang || '',
      kind: 'main',
    };
    __privateGet(this, _ctx).audioTracks[ListSymbol.add](localTrack, trigger);
  }
  for (const level of __privateGet(this, _instance).levels) {
    const videoQuality = {
      id:
        ((_a = level.id) == null ? void 0 : _a.toString()) ??
        level.height + 'p',
      width: level.width,
      height: level.height,
      codec: level.codecSet,
      bitrate: level.bitrate,
    };
    __privateGet(this, _ctx).qualities[ListSymbol.add](videoQuality, trigger);
  }
  media.dispatchEvent(new DOMEvent('canplay', { trigger }));
};
onError_fn = function (eventType, data) {
  var _a, _b, _c;
  {
    (_b = __privateGet(this, _ctx).logger) == null
      ? void 0
      : _b
          .errorGroup(`[vidstack] HLS error \`${eventType}\``)
          .labelledLog(
            'Media Element',
            (_a = __privateGet(this, _instance)) == null ? void 0 : _a.media
          )
          .labelledLog('HLS Instance', __privateGet(this, _instance))
          .labelledLog('Event Type', eventType)
          .labelledLog('Data', data)
          .labelledLog('Src', peek(__privateGet(this, _ctx).$state.source))
          .labelledLog('Media Store', { ...__privateGet(this, _ctx).$state })
          .dispatch();
  }
  if (data.fatal) {
    switch (data.type) {
      case 'mediaError':
        (_c = __privateGet(this, _instance)) == null
          ? void 0
          : _c.recoverMediaError();
        break;
      default:
        __privateMethod(this, _HLSController_instances, onFatalError_fn).call(
          this,
          data.error
        );
        break;
    }
  }
};
onFatalError_fn = function (error) {
  __privateGet(this, _ctx).notify('error', {
    message: error.message,
    code: 1,
    error,
  });
};
enableAutoQuality_fn = function () {
  if (__privateGet(this, _instance))
    __privateGet(this, _instance).currentLevel = -1;
};
onUserQualityChange_fn = function () {
  const { qualities } = __privateGet(this, _ctx);
  if (!__privateGet(this, _instance) || qualities.auto) return;
  __privateGet(this, _instance)[qualities.switch + 'Level'] =
    qualities.selectedIndex;
  if (IS_CHROME) {
    __privateGet(this, _video).currentTime = __privateGet(
      this,
      _video
    ).currentTime;
  }
};
onUserAudioChange_fn = function () {
  const { audioTracks } = __privateGet(this, _ctx);
  if (
    __privateGet(this, _instance) &&
    __privateGet(this, _instance).audioTrack !== audioTracks.selectedIndex
  ) {
    __privateGet(this, _instance).audioTrack = audioTracks.selectedIndex;
  }
};
var _lib,
  _ctx2,
  _callback,
  _HLSLibLoader_instances,
  startLoading_fn,
  onLoadStart_fn,
  onLoaded_fn,
  onLoadError_fn;
var HLSLibLoader = class {
  constructor(lib, ctx, callback) {
    __privateAdd(this, _HLSLibLoader_instances);
    __privateAdd(this, _lib);
    __privateAdd(this, _ctx2);
    __privateAdd(this, _callback);
    __privateSet(this, _lib, lib);
    __privateSet(this, _ctx2, ctx);
    __privateSet(this, _callback, callback);
    __privateMethod(this, _HLSLibLoader_instances, startLoading_fn).call(this);
  }
};
_lib = new WeakMap();
_ctx2 = new WeakMap();
_callback = new WeakMap();
_HLSLibLoader_instances = new WeakSet();
startLoading_fn = async function () {
  var _a, _b;
  (_a = __privateGet(this, _ctx2).logger) == null
    ? void 0
    : _a.info('🏗️ Loading HLS Library');
  const callbacks = {
    onLoadStart: __privateMethod(
      this,
      _HLSLibLoader_instances,
      onLoadStart_fn
    ).bind(this),
    onLoaded: __privateMethod(this, _HLSLibLoader_instances, onLoaded_fn).bind(
      this
    ),
    onLoadError: __privateMethod(
      this,
      _HLSLibLoader_instances,
      onLoadError_fn
    ).bind(this),
  };
  let ctor = await loadHLSScript(__privateGet(this, _lib), callbacks);
  if (isUndefined(ctor) && !isString(__privateGet(this, _lib)))
    ctor = await importHLS(__privateGet(this, _lib), callbacks);
  if (!ctor) return null;
  if (!ctor.isSupported()) {
    const message = '[vidstack] `hls.js` is not supported in this environment';
    (_b = __privateGet(this, _ctx2).logger) == null
      ? void 0
      : _b.error(message);
    __privateGet(this, _ctx2).player.dispatch(new DOMEvent('hls-unsupported'));
    __privateGet(this, _ctx2).notify('error', { message, code: 4 });
    return null;
  }
  return ctor;
};
onLoadStart_fn = function () {
  var _a;
  {
    (_a = __privateGet(this, _ctx2).logger) == null
      ? void 0
      : _a
          .infoGroup('Starting to load `hls.js`')
          .labelledLog('URL', __privateGet(this, _lib))
          .dispatch();
  }
  __privateGet(this, _ctx2).player.dispatch(new DOMEvent('hls-lib-load-start'));
};
onLoaded_fn = function (ctor) {
  var _a;
  {
    (_a = __privateGet(this, _ctx2).logger) == null
      ? void 0
      : _a
          .infoGroup('Loaded `hls.js`')
          .labelledLog('Library', __privateGet(this, _lib))
          .labelledLog('Constructor', ctor)
          .dispatch();
  }
  __privateGet(this, _ctx2).player.dispatch(
    new DOMEvent('hls-lib-loaded', {
      detail: ctor,
    })
  );
  __privateGet(this, _callback).call(this, ctor);
};
onLoadError_fn = function (e) {
  var _a;
  const error = coerceToError(e);
  {
    (_a = __privateGet(this, _ctx2).logger) == null
      ? void 0
      : _a
          .errorGroup('[vidstack] Failed to load `hls.js`')
          .labelledLog('Library', __privateGet(this, _lib))
          .labelledLog('Error', e)
          .dispatch();
  }
  __privateGet(this, _ctx2).player.dispatch(
    new DOMEvent('hls-lib-load-error', {
      detail: error,
    })
  );
  __privateGet(this, _ctx2).notify('error', {
    message: error.message,
    code: 4,
    error,
  });
};
async function importHLS(loader, callbacks = {}) {
  var _a, _b, _c, _d, _e;
  if (isUndefined(loader)) return void 0;
  (_a = callbacks.onLoadStart) == null ? void 0 : _a.call(callbacks);
  if (loader.prototype && loader.prototype !== Function) {
    (_b = callbacks.onLoaded) == null ? void 0 : _b.call(callbacks, loader);
    return loader;
  }
  try {
    const ctor = (_c = await loader()) == null ? void 0 : _c.default;
    if (ctor && !!ctor.isSupported) {
      (_d = callbacks.onLoaded) == null ? void 0 : _d.call(callbacks, ctor);
    } else {
      throw Error(
        true
          ? '[vidstack] failed importing `hls.js`. Dynamic import returned invalid constructor.'
          : ''
      );
    }
    return ctor;
  } catch (err) {
    (_e = callbacks.onLoadError) == null ? void 0 : _e.call(callbacks, err);
  }
  return void 0;
}
async function loadHLSScript(src, callbacks = {}) {
  var _a, _b, _c;
  if (!isString(src)) return void 0;
  (_a = callbacks.onLoadStart) == null ? void 0 : _a.call(callbacks);
  try {
    await loadScript(src);
    if (!isFunction(window.Hls)) {
      throw Error(
        true
          ? '[vidstack] failed loading `hls.js`. Could not find a valid `Hls` constructor on window'
          : ''
      );
    }
    const ctor = window.Hls;
    (_b = callbacks.onLoaded) == null ? void 0 : _b.call(callbacks, ctor);
    return ctor;
  } catch (err) {
    (_c = callbacks.onLoadError) == null ? void 0 : _c.call(callbacks, err);
  }
  return void 0;
}
var JS_DELIVR_CDN = 'https://cdn.jsdelivr.net';
var _ctor, _controller, _library;
var HLSProvider = class extends VideoProvider {
  constructor() {
    super(...arguments);
    __publicField(this, '$$PROVIDER_TYPE', 'HLS');
    __privateAdd(this, _ctor, null);
    __privateAdd(this, _controller, new HLSController(this.video, this.ctx));
    __privateAdd(
      this,
      _library,
      `${JS_DELIVR_CDN}/npm/hls.js@^1.5.0/dist/hls${'.js'}`
    );
  }
  /**
   * The `hls.js` constructor.
   */
  get ctor() {
    return __privateGet(this, _ctor);
  }
  /**
   * The current `hls.js` instance.
   */
  get instance() {
    return __privateGet(this, _controller).instance;
  }
  get type() {
    return 'hls';
  }
  get canLiveSync() {
    return true;
  }
  /**
   * The `hls.js` configuration object.
   *
   * @see {@link https://github.com/video-dev/hls.js/blob/master/docs/API.md#fine-tuning}
   */
  get config() {
    return __privateGet(this, _controller).config;
  }
  set config(config) {
    __privateGet(this, _controller).config = config;
  }
  /**
   * The `hls.js` constructor (supports dynamic imports) or a URL of where it can be found.
   *
   * @defaultValue `https://cdn.jsdelivr.net/npm/hls.js@^1.0.0/dist/hls.min.js`
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
    new HLSLibLoader(__privateGet(this, _library), this.ctx, (ctor) => {
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
   * The given callback is invoked when a new `hls.js` instance is created and right before it's
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
 * Whether `hls.js` is supported in this environment.
 */
__publicField(HLSProvider, 'supported', isHLSSupported());
export { HLSProvider };
//# sourceMappingURL=vidstack-GNfRj3wa-6L7WR2GG.js.map
