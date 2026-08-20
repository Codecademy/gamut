import { IS_SERVER, appendParamsToURL } from './chunk-AB3KZNRI.js';
import {
  effect,
  isString,
  listenEvent,
  peek,
  signal,
} from './chunk-KJZMXNFV.js';
import {
  __privateAdd,
  __privateGet,
  __privateMethod,
  __privateSet,
  __publicField,
} from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-CFWvJYI8.js
var _iframe, _EmbedProvider_instances, watchSrc_fn, onWindowMessage_fn;
var EmbedProvider = class {
  constructor(iframe) {
    __privateAdd(this, _EmbedProvider_instances);
    __privateAdd(this, _iframe);
    __publicField(this, 'src', signal(''));
    /**
     * Defines which referrer is sent when fetching the resource.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy}
     */
    __publicField(this, 'referrerPolicy', null);
    __privateSet(this, _iframe, iframe);
    iframe.setAttribute('frameBorder', '0');
    iframe.setAttribute('aria-hidden', 'true');
    iframe.setAttribute(
      'allow',
      'autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope'
    );
    if (this.referrerPolicy !== null) {
      iframe.setAttribute('referrerpolicy', this.referrerPolicy);
    }
  }
  get iframe() {
    return __privateGet(this, _iframe);
  }
  setup() {
    listenEvent(
      window,
      'message',
      __privateMethod(this, _EmbedProvider_instances, onWindowMessage_fn).bind(
        this
      )
    );
    listenEvent(__privateGet(this, _iframe), 'load', this.onLoad.bind(this));
    effect(
      __privateMethod(this, _EmbedProvider_instances, watchSrc_fn).bind(this)
    );
  }
  postMessage(message, target) {
    var _a;
    if (IS_SERVER) return;
    (_a = __privateGet(this, _iframe).contentWindow) == null
      ? void 0
      : _a.postMessage(JSON.stringify(message), target ?? '*');
  }
};
_iframe = new WeakMap();
_EmbedProvider_instances = new WeakSet();
watchSrc_fn = function () {
  const src = this.src();
  if (!src.length) {
    __privateGet(this, _iframe).setAttribute('src', '');
    return;
  }
  const params = peek(() => this.buildParams());
  __privateGet(this, _iframe).setAttribute(
    'src',
    appendParamsToURL(src, params)
  );
};
onWindowMessage_fn = function (event) {
  var _a;
  const origin = this.getOrigin(),
    isOriginMatch =
      (event.source === null ||
        event.source ===
          ((_a = __privateGet(this, _iframe)) == null
            ? void 0
            : _a.contentWindow)) &&
      (!isString(origin) || origin === event.origin);
  if (!isOriginMatch) return;
  try {
    const message = JSON.parse(event.data);
    if (message) this.onMessage(message, event);
    return;
  } catch (e) {}
  if (event.data) this.onMessage(event.data, event);
};

export { EmbedProvider };
//# sourceMappingURL=chunk-NC2U644D.js.map
