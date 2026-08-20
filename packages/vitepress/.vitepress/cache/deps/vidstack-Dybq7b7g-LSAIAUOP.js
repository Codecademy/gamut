'use client';
import {
  getCastContext,
  getCastErrorMessage,
  getCastSession,
  getCastSessionMedia,
  hasActiveCastSession,
  listenCastContextEvent,
} from './chunk-KM6AIIOI.js';
import { ListSymbol, RAFLoop, TimeRange } from './chunk-AB3KZNRI.js';
import {
  DOMEvent,
  createScope,
  effect,
  keysOf,
  listenEvent,
  onDispose,
  peek,
  untrack,
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

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-Dybq7b7g.js
var import_react = __toESM(require_react(), 1);
var _info, _GoogleCastMediaInfoBuilder_instances, buildCastTrack_fn;
var GoogleCastMediaInfoBuilder = class {
  constructor(src) {
    __privateAdd(this, _GoogleCastMediaInfoBuilder_instances);
    __privateAdd(this, _info);
    __privateSet(
      this,
      _info,
      new chrome.cast.media.MediaInfo(src.src, src.type)
    );
  }
  build() {
    return __privateGet(this, _info);
  }
  setStreamType(streamType) {
    if (streamType.includes('live')) {
      __privateGet(this, _info).streamType = chrome.cast.media.StreamType.LIVE;
    } else {
      __privateGet(this, _info).streamType =
        chrome.cast.media.StreamType.BUFFERED;
    }
    return this;
  }
  setTracks(tracks) {
    __privateGet(this, _info).tracks = tracks.map(
      __privateMethod(
        this,
        _GoogleCastMediaInfoBuilder_instances,
        buildCastTrack_fn
      )
    );
    return this;
  }
  setMetadata(title, poster) {
    __privateGet(this, _info).metadata =
      new chrome.cast.media.GenericMediaMetadata();
    __privateGet(this, _info).metadata.title = title;
    __privateGet(this, _info).metadata.images = [{ url: poster }];
    return this;
  }
};
_info = new WeakMap();
_GoogleCastMediaInfoBuilder_instances = new WeakSet();
buildCastTrack_fn = function (track, trackId) {
  const castTrack = new chrome.cast.media.Track(
    trackId,
    chrome.cast.media.TrackType.TEXT
  );
  castTrack.name = track.label;
  castTrack.trackContentId = track.src;
  castTrack.trackContentType = 'text/vtt';
  castTrack.language = track.language;
  castTrack.subtype = track.kind.toUpperCase();
  return castTrack;
};
var _cast,
  _ctx,
  _onNewLocalTracks,
  _GoogleCastTracksManager_instances,
  getLocalAudioTracks_fn,
  getRemoteTracks_fn,
  getRemoteActiveIds_fn,
  syncLocalTracks_fn,
  editTracksInfo_fn,
  findLocalTrack_fn,
  findRemoteTrack_fn,
  isMatch_fn;
var GoogleCastTracksManager = class {
  constructor(cast2, ctx, onNewLocalTracks) {
    __privateAdd(this, _GoogleCastTracksManager_instances);
    __privateAdd(this, _cast);
    __privateAdd(this, _ctx);
    __privateAdd(this, _onNewLocalTracks);
    __privateSet(this, _cast, cast2);
    __privateSet(this, _ctx, ctx);
    __privateSet(this, _onNewLocalTracks, onNewLocalTracks);
  }
  setup() {
    const syncRemoteActiveIds = this.syncRemoteActiveIds.bind(this);
    listenEvent(
      __privateGet(this, _ctx).audioTracks,
      'change',
      syncRemoteActiveIds
    );
    listenEvent(
      __privateGet(this, _ctx).textTracks,
      'mode-change',
      syncRemoteActiveIds
    );
    effect(
      __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        syncLocalTracks_fn
      ).bind(this)
    );
  }
  getLocalTextTracks() {
    return __privateGet(this, _ctx)
      .$state.textTracks()
      .filter((track) => track.src && track.type === 'vtt');
  }
  syncRemoteTracks(event) {
    if (!__privateGet(this, _cast).isMediaLoaded) return;
    const localAudioTracks = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        getLocalAudioTracks_fn
      ).call(this),
      localTextTracks = this.getLocalTextTracks(),
      remoteAudioTracks = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        getRemoteTracks_fn
      ).call(this, chrome.cast.media.TrackType.AUDIO),
      remoteTextTracks = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        getRemoteTracks_fn
      ).call(this, chrome.cast.media.TrackType.TEXT);
    for (const remoteAudioTrack of remoteAudioTracks) {
      const hasLocalTrack = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        findLocalTrack_fn
      ).call(this, localAudioTracks, remoteAudioTrack);
      if (hasLocalTrack) continue;
      const localAudioTrack = {
        id: remoteAudioTrack.trackId.toString(),
        label: remoteAudioTrack.name,
        language: remoteAudioTrack.language,
        kind: remoteAudioTrack.subtype ?? 'main',
        selected: false,
      };
      __privateGet(this, _ctx).audioTracks[ListSymbol.add](
        localAudioTrack,
        event
      );
    }
    for (const remoteTextTrack of remoteTextTracks) {
      const hasLocalTrack = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        findLocalTrack_fn
      ).call(this, localTextTracks, remoteTextTrack);
      if (hasLocalTrack) continue;
      const localTextTrack = {
        id: remoteTextTrack.trackId.toString(),
        src: remoteTextTrack.trackContentId,
        label: remoteTextTrack.name,
        language: remoteTextTrack.language,
        kind: remoteTextTrack.subtype.toLowerCase(),
      };
      __privateGet(this, _ctx).textTracks.add(localTextTrack, event);
    }
  }
  syncRemoteActiveIds(event) {
    if (!__privateGet(this, _cast).isMediaLoaded) return;
    const activeIds = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        getRemoteActiveIds_fn
      ).call(this),
      editRequest = new chrome.cast.media.EditTracksInfoRequest(activeIds);
    __privateMethod(this, _GoogleCastTracksManager_instances, editTracksInfo_fn)
      .call(this, editRequest)
      .catch((error) => {
        var _a;
        {
          (_a = __privateGet(this, _ctx).logger) == null
            ? void 0
            : _a
                .errorGroup('[vidstack] failed to edit cast tracks info')
                .labelledLog('Edit Request', editRequest)
                .labelledLog('Error', error)
                .dispatch();
        }
      });
  }
};
_cast = new WeakMap();
_ctx = new WeakMap();
_onNewLocalTracks = new WeakMap();
_GoogleCastTracksManager_instances = new WeakSet();
getLocalAudioTracks_fn = function () {
  return __privateGet(this, _ctx).$state.audioTracks();
};
getRemoteTracks_fn = function (type) {
  var _a;
  const tracks =
    ((_a = __privateGet(this, _cast).mediaInfo) == null ? void 0 : _a.tracks) ??
    [];
  return type ? tracks.filter((track) => track.type === type) : tracks;
};
getRemoteActiveIds_fn = function () {
  const activeIds = [],
    activeLocalAudioTrack = __privateMethod(
      this,
      _GoogleCastTracksManager_instances,
      getLocalAudioTracks_fn
    )
      .call(this)
      .find((track) => track.selected),
    activeLocalTextTracks = this.getLocalTextTracks().filter(
      (track) => track.mode === 'showing'
    );
  if (activeLocalAudioTrack) {
    const remoteAudioTracks = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        getRemoteTracks_fn
      ).call(this, chrome.cast.media.TrackType.AUDIO),
      remoteAudioTrack = __privateMethod(
        this,
        _GoogleCastTracksManager_instances,
        findRemoteTrack_fn
      ).call(this, remoteAudioTracks, activeLocalAudioTrack);
    if (remoteAudioTrack) activeIds.push(remoteAudioTrack.trackId);
  }
  if (activeLocalTextTracks == null ? void 0 : activeLocalTextTracks.length) {
    const remoteTextTracks = __privateMethod(
      this,
      _GoogleCastTracksManager_instances,
      getRemoteTracks_fn
    ).call(this, chrome.cast.media.TrackType.TEXT);
    if (remoteTextTracks.length) {
      for (const localTrack of activeLocalTextTracks) {
        const remoteTextTrack = __privateMethod(
          this,
          _GoogleCastTracksManager_instances,
          findRemoteTrack_fn
        ).call(this, remoteTextTracks, localTrack);
        if (remoteTextTrack) activeIds.push(remoteTextTrack.trackId);
      }
    }
  }
  return activeIds;
};
syncLocalTracks_fn = function () {
  const localTextTracks = this.getLocalTextTracks();
  if (!__privateGet(this, _cast).isMediaLoaded) return;
  const remoteTextTracks = __privateMethod(
    this,
    _GoogleCastTracksManager_instances,
    getRemoteTracks_fn
  ).call(this, chrome.cast.media.TrackType.TEXT);
  for (const localTrack of localTextTracks) {
    const hasRemoteTrack = __privateMethod(
      this,
      _GoogleCastTracksManager_instances,
      findRemoteTrack_fn
    ).call(this, remoteTextTracks, localTrack);
    if (!hasRemoteTrack) {
      untrack(() => {
        var _a;
        return (_a = __privateGet(this, _onNewLocalTracks)) == null
          ? void 0
          : _a.call(this);
      });
      break;
    }
  }
};
editTracksInfo_fn = function (request) {
  const media = getCastSessionMedia();
  return new Promise((resolve, reject) =>
    media == null ? void 0 : media.editTracksInfo(request, resolve, reject)
  );
};
findLocalTrack_fn = function (localTracks, remoteTrack) {
  return localTracks.find((localTrack) =>
    __privateMethod(this, _GoogleCastTracksManager_instances, isMatch_fn).call(
      this,
      localTrack,
      remoteTrack
    )
  );
};
findRemoteTrack_fn = function (remoteTracks, localTrack) {
  return remoteTracks.find((remoteTrack) =>
    __privateMethod(this, _GoogleCastTracksManager_instances, isMatch_fn).call(
      this,
      localTrack,
      remoteTrack
    )
  );
};
// Note: we can't rely on id matching because they will differ between local/remote. A local
// track id might not even exist.
isMatch_fn = function (localTrack, remoteTrack) {
  return (
    remoteTrack.name === localTrack.label &&
    remoteTrack.language === localTrack.language &&
    remoteTrack.subtype.toLowerCase() === localTrack.kind.toLowerCase()
  );
};
var _player,
  _ctx2,
  _tracks,
  _currentSrc,
  _state,
  _currentTime,
  _played,
  _seekableRange,
  _timeRAF,
  _playerEventHandlers,
  _reloadInfo,
  _isIdle,
  _GoogleCastProvider_instances,
  attachCastContextEventListeners_fn,
  attachCastPlayerEventListeners_fn,
  reset_fn,
  resumeSession_fn,
  endSession_fn,
  disconnectFromReceiver_fn,
  onAnimationFrame_fn,
  onRemotePlayerEvent_fn,
  onCastStateChange_fn,
  onMediaLoadedChange_fn,
  onCanControlVolumeChange_fn,
  onCanSeekChange_fn,
  getStreamType_fn,
  onCurrentTimeChange_fn,
  onDurationChange_fn,
  onVolumeChange_fn,
  onPausedChange_fn,
  onProgress_fn,
  onPlayerStateChange_fn,
  getSeekableRange_fn,
  createEvent_fn,
  buildMediaInfo_fn,
  buildLoadRequest_fn,
  reload_fn,
  onNewLocalTracks_fn;
var GoogleCastProvider = class {
  constructor(player, ctx) {
    __privateAdd(this, _GoogleCastProvider_instances);
    __publicField(this, '$$PROVIDER_TYPE', 'GOOGLE_CAST');
    __publicField(this, 'scope', createScope());
    __privateAdd(this, _player);
    __privateAdd(this, _ctx2);
    __privateAdd(this, _tracks);
    __privateAdd(this, _currentSrc, null);
    __privateAdd(this, _state, 'disconnected');
    __privateAdd(this, _currentTime, 0);
    __privateAdd(this, _played, 0);
    __privateAdd(this, _seekableRange, new TimeRange(0, 0));
    __privateAdd(
      this,
      _timeRAF,
      new RAFLoop(
        __privateMethod(
          this,
          _GoogleCastProvider_instances,
          onAnimationFrame_fn
        ).bind(this)
      )
    );
    __privateAdd(this, _playerEventHandlers);
    __privateAdd(this, _reloadInfo, null);
    __privateAdd(this, _isIdle, false);
    __privateSet(this, _player, player);
    __privateSet(this, _ctx2, ctx);
    __privateSet(
      this,
      _tracks,
      new GoogleCastTracksManager(
        player,
        ctx,
        __privateMethod(
          this,
          _GoogleCastProvider_instances,
          onNewLocalTracks_fn
        ).bind(this)
      )
    );
  }
  get type() {
    return 'google-cast';
  }
  get currentSrc() {
    return __privateGet(this, _currentSrc);
  }
  /**
   * The Google Cast remote player.
   *
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.RemotePlayer}
   */
  get player() {
    return __privateGet(this, _player);
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
   */
  get cast() {
    return getCastContext();
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastSession}
   */
  get session() {
    return getCastSession();
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/chrome.cast.media.Media}
   */
  get media() {
    return getCastSessionMedia();
  }
  /**
   * Whether the current Google Cast session belongs to this provider.
   */
  get hasActiveSession() {
    return hasActiveCastSession(__privateGet(this, _currentSrc));
  }
  setup() {
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      attachCastContextEventListeners_fn
    ).call(this);
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      attachCastPlayerEventListeners_fn
    ).call(this);
    __privateGet(this, _tracks).setup();
    __privateGet(this, _ctx2).notify('provider-setup', this);
  }
  async play() {
    var _a;
    if (!__privateGet(this, _player).isPaused && !__privateGet(this, _isIdle))
      return;
    if (__privateGet(this, _isIdle)) {
      await __privateMethod(
        this,
        _GoogleCastProvider_instances,
        reload_fn
      ).call(this, false, 0);
      return;
    }
    (_a = __privateGet(this, _player).controller) == null
      ? void 0
      : _a.playOrPause();
  }
  async pause() {
    var _a;
    if (__privateGet(this, _player).isPaused) return;
    (_a = __privateGet(this, _player).controller) == null
      ? void 0
      : _a.playOrPause();
  }
  getMediaStatus(request) {
    return new Promise((resolve, reject) => {
      var _a;
      (_a = this.media) == null
        ? void 0
        : _a.getStatus(request, resolve, reject);
    });
  }
  setMuted(muted) {
    var _a;
    const hasChanged =
      (muted && !__privateGet(this, _player).isMuted) ||
      (!muted && __privateGet(this, _player).isMuted);
    if (hasChanged)
      (_a = __privateGet(this, _player).controller) == null
        ? void 0
        : _a.muteOrUnmute();
  }
  setCurrentTime(time) {
    var _a;
    __privateGet(this, _player).currentTime = time;
    __privateGet(this, _ctx2).notify('seeking', time);
    (_a = __privateGet(this, _player).controller) == null ? void 0 : _a.seek();
  }
  setVolume(volume) {
    var _a;
    __privateGet(this, _player).volumeLevel = volume;
    (_a = __privateGet(this, _player).controller) == null
      ? void 0
      : _a.setVolumeLevel();
  }
  async loadSource(src) {
    var _a;
    if (
      ((_a = __privateGet(this, _reloadInfo)) == null ? void 0 : _a.src) !== src
    )
      __privateSet(this, _reloadInfo, null);
    if (hasActiveCastSession(src)) {
      __privateMethod(
        this,
        _GoogleCastProvider_instances,
        resumeSession_fn
      ).call(this);
      __privateSet(this, _currentSrc, src);
      return;
    }
    __privateGet(this, _ctx2).notify('load-start');
    const loadRequest = __privateMethod(
        this,
        _GoogleCastProvider_instances,
        buildLoadRequest_fn
      ).call(this, src),
      errorCode = await this.session.loadMedia(loadRequest);
    if (errorCode) {
      __privateSet(this, _currentSrc, null);
      __privateGet(this, _ctx2).notify(
        'error',
        Error(getCastErrorMessage(errorCode))
      );
      return;
    }
    __privateSet(this, _currentSrc, src);
  }
  destroy() {
    __privateMethod(this, _GoogleCastProvider_instances, reset_fn).call(this);
    __privateMethod(this, _GoogleCastProvider_instances, endSession_fn).call(
      this
    );
  }
};
_player = new WeakMap();
_ctx2 = new WeakMap();
_tracks = new WeakMap();
_currentSrc = new WeakMap();
_state = new WeakMap();
_currentTime = new WeakMap();
_played = new WeakMap();
_seekableRange = new WeakMap();
_timeRAF = new WeakMap();
_playerEventHandlers = new WeakMap();
_reloadInfo = new WeakMap();
_isIdle = new WeakMap();
_GoogleCastProvider_instances = new WeakSet();
attachCastContextEventListeners_fn = function () {
  listenCastContextEvent(
    cast.framework.CastContextEventType.CAST_STATE_CHANGED,
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      onCastStateChange_fn
    ).bind(this)
  );
};
attachCastPlayerEventListeners_fn = function () {
  const Event2 = cast.framework.RemotePlayerEventType,
    handlers = {
      [Event2.IS_CONNECTED_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onCastStateChange_fn
      ),
      [Event2.IS_MEDIA_LOADED_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onMediaLoadedChange_fn
      ),
      [Event2.CAN_CONTROL_VOLUME_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onCanControlVolumeChange_fn
      ),
      [Event2.CAN_SEEK_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onCanSeekChange_fn
      ),
      [Event2.DURATION_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onDurationChange_fn
      ),
      [Event2.IS_MUTED_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onVolumeChange_fn
      ),
      [Event2.VOLUME_LEVEL_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onVolumeChange_fn
      ),
      [Event2.IS_PAUSED_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onPausedChange_fn
      ),
      [Event2.LIVE_SEEKABLE_RANGE_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onProgress_fn
      ),
      [Event2.PLAYER_STATE_CHANGED]: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        onPlayerStateChange_fn
      ),
    };
  __privateSet(this, _playerEventHandlers, handlers);
  const handler = __privateMethod(
    this,
    _GoogleCastProvider_instances,
    onRemotePlayerEvent_fn
  ).bind(this);
  for (const type of keysOf(handlers)) {
    __privateGet(this, _player).controller.addEventListener(type, handler);
  }
  onDispose(() => {
    for (const type of keysOf(handlers)) {
      __privateGet(this, _player).controller.removeEventListener(type, handler);
    }
  });
};
reset_fn = function () {
  if (!__privateGet(this, _reloadInfo)) {
    __privateSet(this, _played, 0);
    __privateSet(this, _seekableRange, new TimeRange(0, 0));
  }
  __privateGet(this, _timeRAF).stop();
  __privateSet(this, _currentTime, 0);
  __privateSet(this, _reloadInfo, null);
};
resumeSession_fn = function () {
  const resumeSessionEvent = new DOMEvent('resume-session', {
    detail: this.session,
  });
  __privateMethod(
    this,
    _GoogleCastProvider_instances,
    onMediaLoadedChange_fn
  ).call(this, resumeSessionEvent);
  const { muted, volume, savedState } = __privateGet(this, _ctx2).$state,
    localState = savedState();
  this.setCurrentTime(
    Math.max(
      __privateGet(this, _player).currentTime,
      (localState == null ? void 0 : localState.currentTime) ?? 0
    )
  );
  this.setMuted(muted());
  this.setVolume(volume());
  if ((localState == null ? void 0 : localState.paused) === false) this.play();
};
endSession_fn = function () {
  this.cast.endCurrentSession(true);
  const { remotePlaybackLoader } = __privateGet(this, _ctx2).$state;
  remotePlaybackLoader.set(null);
};
disconnectFromReceiver_fn = function () {
  const { savedState } = __privateGet(this, _ctx2).$state;
  savedState.set({
    paused: __privateGet(this, _player).isPaused,
    currentTime: __privateGet(this, _player).currentTime,
  });
  __privateMethod(this, _GoogleCastProvider_instances, endSession_fn).call(
    this
  );
};
onAnimationFrame_fn = function () {
  __privateMethod(
    this,
    _GoogleCastProvider_instances,
    onCurrentTimeChange_fn
  ).call(this);
};
onRemotePlayerEvent_fn = function (event) {
  __privateGet(this, _playerEventHandlers)[event.type].call(this, event);
};
onCastStateChange_fn = function (data) {
  const castState = this.cast.getCastState(),
    state =
      castState === cast.framework.CastState.CONNECTED
        ? 'connected'
        : castState === cast.framework.CastState.CONNECTING
        ? 'connecting'
        : 'disconnected';
  if (__privateGet(this, _state) === state) return;
  const detail = { type: 'google-cast', state },
    trigger = __privateMethod(
      this,
      _GoogleCastProvider_instances,
      createEvent_fn
    ).call(this, data);
  __privateSet(this, _state, state);
  __privateGet(this, _ctx2).notify('remote-playback-change', detail, trigger);
  if (state === 'disconnected') {
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      disconnectFromReceiver_fn
    ).call(this);
  }
};
onMediaLoadedChange_fn = function (event) {
  const hasLoaded = !!__privateGet(this, _player).isMediaLoaded;
  if (!hasLoaded) return;
  const src = peek(__privateGet(this, _ctx2).$state.source);
  Promise.resolve().then(() => {
    if (
      src !== peek(__privateGet(this, _ctx2).$state.source) ||
      !__privateGet(this, _player).isMediaLoaded
    )
      return;
    __privateMethod(this, _GoogleCastProvider_instances, reset_fn).call(this);
    const duration = __privateGet(this, _player).duration;
    __privateSet(this, _seekableRange, new TimeRange(0, duration));
    const detail = {
        provider: this,
        duration,
        buffered: new TimeRange(0, 0),
        seekable: __privateMethod(
          this,
          _GoogleCastProvider_instances,
          getSeekableRange_fn
        ).call(this),
      },
      trigger = __privateMethod(
        this,
        _GoogleCastProvider_instances,
        createEvent_fn
      ).call(this, event);
    __privateGet(this, _ctx2).notify('loaded-metadata', void 0, trigger);
    __privateGet(this, _ctx2).notify('loaded-data', void 0, trigger);
    __privateGet(this, _ctx2).notify('can-play', detail, trigger);
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      onCanControlVolumeChange_fn
    ).call(this);
    __privateMethod(
      this,
      _GoogleCastProvider_instances,
      onCanSeekChange_fn
    ).call(this, event);
    const { volume, muted } = __privateGet(this, _ctx2).$state;
    this.setVolume(volume());
    this.setMuted(muted());
    __privateGet(this, _timeRAF).start();
    __privateGet(this, _tracks).syncRemoteTracks(trigger);
    __privateGet(this, _tracks).syncRemoteActiveIds(trigger);
  });
};
onCanControlVolumeChange_fn = function () {
  __privateGet(this, _ctx2).$state.canSetVolume.set(
    __privateGet(this, _player).canControlVolume
  );
};
onCanSeekChange_fn = function (event) {
  const trigger = __privateMethod(
    this,
    _GoogleCastProvider_instances,
    createEvent_fn
  ).call(this, event);
  __privateGet(this, _ctx2).notify(
    'stream-type-change',
    __privateMethod(this, _GoogleCastProvider_instances, getStreamType_fn).call(
      this
    ),
    trigger
  );
};
getStreamType_fn = function () {
  var _a;
  const streamType =
    (_a = __privateGet(this, _player).mediaInfo) == null
      ? void 0
      : _a.streamType;
  return streamType === chrome.cast.media.StreamType.LIVE
    ? __privateGet(this, _player).canSeek
      ? 'live:dvr'
      : 'live'
    : 'on-demand';
};
onCurrentTimeChange_fn = function () {
  if (__privateGet(this, _reloadInfo)) return;
  const currentTime = __privateGet(this, _player).currentTime;
  if (currentTime === __privateGet(this, _currentTime)) return;
  __privateGet(this, _ctx2).notify('time-change', currentTime);
  if (currentTime > __privateGet(this, _played)) {
    __privateSet(this, _played, currentTime);
    __privateMethod(this, _GoogleCastProvider_instances, onProgress_fn).call(
      this
    );
  }
  if (__privateGet(this, _ctx2).$state.seeking()) {
    __privateGet(this, _ctx2).notify('seeked', currentTime);
  }
  __privateSet(this, _currentTime, currentTime);
};
onDurationChange_fn = function (event) {
  if (
    !__privateGet(this, _player).isMediaLoaded ||
    __privateGet(this, _reloadInfo)
  )
    return;
  const duration = __privateGet(this, _player).duration,
    trigger = __privateMethod(
      this,
      _GoogleCastProvider_instances,
      createEvent_fn
    ).call(this, event);
  __privateSet(this, _seekableRange, new TimeRange(0, duration));
  __privateGet(this, _ctx2).notify('duration-change', duration, trigger);
};
onVolumeChange_fn = function (event) {
  if (!__privateGet(this, _player).isMediaLoaded) return;
  const detail = {
      muted: __privateGet(this, _player).isMuted,
      volume: __privateGet(this, _player).volumeLevel,
    },
    trigger = __privateMethod(
      this,
      _GoogleCastProvider_instances,
      createEvent_fn
    ).call(this, event);
  __privateGet(this, _ctx2).notify('volume-change', detail, trigger);
};
onPausedChange_fn = function (event) {
  const trigger = __privateMethod(
    this,
    _GoogleCastProvider_instances,
    createEvent_fn
  ).call(this, event);
  if (__privateGet(this, _player).isPaused) {
    __privateGet(this, _ctx2).notify('pause', void 0, trigger);
  } else {
    __privateGet(this, _ctx2).notify('play', void 0, trigger);
  }
};
onProgress_fn = function (event) {
  const detail = {
      seekable: __privateMethod(
        this,
        _GoogleCastProvider_instances,
        getSeekableRange_fn
      ).call(this),
      buffered: new TimeRange(0, __privateGet(this, _played)),
    },
    trigger = event
      ? __privateMethod(
          this,
          _GoogleCastProvider_instances,
          createEvent_fn
        ).call(this, event)
      : void 0;
  __privateGet(this, _ctx2).notify('progress', detail, trigger);
};
onPlayerStateChange_fn = function (event) {
  const state = __privateGet(this, _player).playerState,
    PlayerState = chrome.cast.media.PlayerState;
  __privateSet(this, _isIdle, state === PlayerState.IDLE);
  if (state === PlayerState.PAUSED) return;
  const trigger = __privateMethod(
    this,
    _GoogleCastProvider_instances,
    createEvent_fn
  ).call(this, event);
  switch (state) {
    case PlayerState.PLAYING:
      __privateGet(this, _ctx2).notify('playing', void 0, trigger);
      break;
    case PlayerState.BUFFERING:
      __privateGet(this, _ctx2).notify('waiting', void 0, trigger);
      break;
    case PlayerState.IDLE:
      __privateGet(this, _timeRAF).stop();
      __privateGet(this, _ctx2).notify('pause');
      __privateGet(this, _ctx2).notify('end');
      break;
  }
};
getSeekableRange_fn = function () {
  return __privateGet(this, _player).liveSeekableRange
    ? new TimeRange(
        __privateGet(this, _player).liveSeekableRange.start,
        __privateGet(this, _player).liveSeekableRange.end
      )
    : __privateGet(this, _seekableRange);
};
createEvent_fn = function (detail) {
  return detail instanceof Event
    ? detail
    : new DOMEvent(detail.type, { detail });
};
buildMediaInfo_fn = function (src) {
  const { streamType, title, poster } = __privateGet(this, _ctx2).$state;
  return new GoogleCastMediaInfoBuilder(src)
    .setMetadata(title(), poster())
    .setStreamType(streamType())
    .setTracks(__privateGet(this, _tracks).getLocalTextTracks())
    .build();
};
buildLoadRequest_fn = function (src) {
  var _a, _b;
  const mediaInfo = __privateMethod(
      this,
      _GoogleCastProvider_instances,
      buildMediaInfo_fn
    ).call(this, src),
    request = new chrome.cast.media.LoadRequest(mediaInfo),
    savedState = __privateGet(this, _ctx2).$state.savedState();
  request.autoplay =
    (((_a = __privateGet(this, _reloadInfo)) == null ? void 0 : _a.paused) ??
      (savedState == null ? void 0 : savedState.paused)) === false;
  request.currentTime =
    ((_b = __privateGet(this, _reloadInfo)) == null ? void 0 : _b.time) ??
    (savedState == null ? void 0 : savedState.currentTime) ??
    0;
  return request;
};
reload_fn = async function (paused, time) {
  const src = peek(__privateGet(this, _ctx2).$state.source);
  __privateSet(this, _reloadInfo, { src, paused, time });
  await this.loadSource(src);
};
onNewLocalTracks_fn = function () {
  __privateMethod(this, _GoogleCastProvider_instances, reload_fn)
    .call(
      this,
      __privateGet(this, _player).isPaused,
      __privateGet(this, _player).currentTime
    )
    .catch((error) => {
      var _a;
      {
        (_a = __privateGet(this, _ctx2).logger) == null
          ? void 0
          : _a
              .errorGroup('[vidstack] cast failed to load new local tracks')
              .labelledLog('Error', error)
              .dispatch();
      }
    });
};
export { GoogleCastProvider };
//# sourceMappingURL=vidstack-Dybq7b7g-LSAIAUOP.js.map
