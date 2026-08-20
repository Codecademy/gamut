import {
  IS_CHROME,
  IS_IOS,
  IS_SERVER,
  canGoogleCastSrc,
  loadScript,
} from './chunk-AB3KZNRI.js';
import { listenEvent, peek } from './chunk-KJZMXNFV.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-C8ZxSSGF.js
function getCastFrameworkURL() {
  return 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';
}
function hasLoadedCastFramework() {
  var _a;
  return !!((_a = window.cast) == null ? void 0 : _a.framework);
}
function isCastAvailable() {
  var _a, _b;
  return !!((_b = (_a = window.chrome) == null ? void 0 : _a.cast) == null
    ? void 0
    : _b.isAvailable);
}
function isCastConnected() {
  return getCastContext().getCastState() === cast.framework.CastState.CONNECTED;
}
function getCastContext() {
  return window.cast.framework.CastContext.getInstance();
}
function getCastSession() {
  return getCastContext().getCurrentSession();
}
function getCastSessionMedia() {
  var _a;
  return (_a = getCastSession()) == null ? void 0 : _a.getSessionObj().media[0];
}
function hasActiveCastSession(src) {
  var _a;
  const contentId =
    (_a = getCastSessionMedia()) == null ? void 0 : _a.media.contentId;
  return contentId === (src == null ? void 0 : src.src);
}
function getDefaultCastOptions() {
  return {
    language: 'en-US',
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    resumeSavedSession: true,
    androidReceiverCompatible: true,
  };
}
function getCastErrorMessage(code) {
  const defaultMessage = `Google Cast Error Code: ${code}`;
  {
    switch (code) {
      case chrome.cast.ErrorCode.API_NOT_INITIALIZED:
        return 'The API is not initialized.';
      case chrome.cast.ErrorCode.CANCEL:
        return 'The operation was canceled by the user';
      case chrome.cast.ErrorCode.CHANNEL_ERROR:
        return 'A channel to the receiver is not available.';
      case chrome.cast.ErrorCode.EXTENSION_MISSING:
        return 'The Cast extension is not available.';
      case chrome.cast.ErrorCode.INVALID_PARAMETER:
        return 'The parameters to the operation were not valid.';
      case chrome.cast.ErrorCode.RECEIVER_UNAVAILABLE:
        return 'No receiver was compatible with the session request.';
      case chrome.cast.ErrorCode.SESSION_ERROR:
        return 'A session could not be created, or a session was invalid.';
      case chrome.cast.ErrorCode.TIMEOUT:
        return 'The operation timed out.';
      default:
        return defaultMessage;
    }
  }
}
function listenCastContextEvent(type, handler) {
  return listenEvent(getCastContext(), type, handler);
}
var _player,
  _GoogleCastLoader_instances,
  loadCastFramework_fn,
  showPrompt_fn,
  setOptions_fn,
  notifyRemoteStateChange_fn,
  createError_fn;
var GoogleCastLoader = class {
  constructor() {
    __privateAdd(this, _GoogleCastLoader_instances);
    __publicField(this, 'name', 'google-cast');
    __publicField(this, 'target');
    __privateAdd(this, _player);
  }
  /**
   * @see {@link https://developers.google.com/cast/docs/reference/web_sender/cast.framework.CastContext}
   */
  get cast() {
    return getCastContext();
  }
  mediaType() {
    return 'video';
  }
  canPlay(src) {
    return IS_CHROME && !IS_IOS && canGoogleCastSrc(src);
  }
  async prompt(ctx) {
    var _a;
    let loadEvent, openEvent, errorEvent;
    try {
      loadEvent = await __privateMethod(
        this,
        _GoogleCastLoader_instances,
        loadCastFramework_fn
      ).call(this, ctx);
      if (!__privateGet(this, _player)) {
        __privateSet(this, _player, new cast.framework.RemotePlayer());
        new cast.framework.RemotePlayerController(__privateGet(this, _player));
      }
      openEvent = ctx.player.createEvent('google-cast-prompt-open', {
        trigger: loadEvent,
      });
      ctx.player.dispatchEvent(openEvent);
      __privateMethod(
        this,
        _GoogleCastLoader_instances,
        notifyRemoteStateChange_fn
      ).call(this, ctx, 'connecting', openEvent);
      await __privateMethod(
        this,
        _GoogleCastLoader_instances,
        showPrompt_fn
      ).call(this, peek(ctx.$props.googleCast));
      ctx.$state.remotePlaybackInfo.set({
        deviceName:
          (_a = getCastSession()) == null
            ? void 0
            : _a.getCastDevice().friendlyName,
      });
      if (isCastConnected())
        __privateMethod(
          this,
          _GoogleCastLoader_instances,
          notifyRemoteStateChange_fn
        ).call(this, ctx, 'connected', openEvent);
    } catch (code) {
      const error =
        code instanceof Error
          ? code
          : __privateMethod(
              this,
              _GoogleCastLoader_instances,
              createError_fn
            ).call(this, (code + '').toUpperCase(), 'Prompt failed.');
      errorEvent = ctx.player.createEvent('google-cast-prompt-error', {
        detail: error,
        trigger: openEvent ?? loadEvent,
        cancelable: true,
      });
      ctx.player.dispatch(errorEvent);
      __privateMethod(
        this,
        _GoogleCastLoader_instances,
        notifyRemoteStateChange_fn
      ).call(
        this,
        ctx,
        isCastConnected() ? 'connected' : 'disconnected',
        errorEvent
      );
      throw error;
    } finally {
      ctx.player.dispatch('google-cast-prompt-close', {
        trigger: errorEvent ?? openEvent ?? loadEvent,
      });
    }
  }
  async load(ctx) {
    if (IS_SERVER) {
      throw Error('[vidstack] can not load google cast provider server-side');
    }
    if (!__privateGet(this, _player)) {
      throw Error('[vidstack] google cast player was not initialized');
    }
    return new (
      await import('./vidstack-Dybq7b7g-LSAIAUOP.js')
    ).GoogleCastProvider(__privateGet(this, _player), ctx);
  }
};
_player = new WeakMap();
_GoogleCastLoader_instances = new WeakSet();
loadCastFramework_fn = async function (ctx) {
  if (hasLoadedCastFramework()) return;
  const loadStartEvent = ctx.player.createEvent('google-cast-load-start');
  ctx.player.dispatch(loadStartEvent);
  await loadScript(getCastFrameworkURL());
  await customElements.whenDefined('google-cast-launcher');
  const loadedEvent = ctx.player.createEvent('google-cast-loaded', {
    trigger: loadStartEvent,
  });
  ctx.player.dispatch(loadedEvent);
  if (!isCastAvailable()) {
    throw __privateMethod(
      this,
      _GoogleCastLoader_instances,
      createError_fn
    ).call(
      this,
      'CAST_NOT_AVAILABLE',
      'Google Cast not available on this platform.'
    );
  }
  return loadedEvent;
};
showPrompt_fn = async function (options) {
  __privateMethod(this, _GoogleCastLoader_instances, setOptions_fn).call(
    this,
    options
  );
  const errorCode = await this.cast.requestSession();
  if (errorCode) {
    throw __privateMethod(
      this,
      _GoogleCastLoader_instances,
      createError_fn
    ).call(this, errorCode.toUpperCase(), getCastErrorMessage(errorCode));
  }
};
setOptions_fn = function (options) {
  var _a;
  (_a = this.cast) == null
    ? void 0
    : _a.setOptions({
        ...getDefaultCastOptions(),
        ...options,
      });
};
notifyRemoteStateChange_fn = function (ctx, state, trigger) {
  const detail = { type: 'google-cast', state };
  ctx.notify('remote-playback-change', detail, trigger);
};
createError_fn = function (code, message) {
  const error = Error(message);
  error.code = code;
  return error;
};
var loader = Object.freeze({
  __proto__: null,
  GoogleCastLoader,
});

export {
  getCastContext,
  getCastSession,
  getCastSessionMedia,
  hasActiveCastSession,
  getCastErrorMessage,
  listenCastContextEvent,
  loader,
};
//# sourceMappingURL=chunk-KM6AIIOI.js.map
