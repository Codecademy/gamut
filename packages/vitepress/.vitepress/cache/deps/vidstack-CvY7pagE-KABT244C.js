'use client';
import { HTMLAirPlayAdapter, HTMLMediaProvider } from './chunk-AB3KZNRI.js';
import { scoped } from './chunk-KJZMXNFV.js';
import './chunk-Y4QXJQIJ.js';
import { require_react } from './chunk-QBXGYTN6.js';
import { __publicField, __toESM } from './chunk-4B2QHNJT.js';

// ../../node_modules/@vidstack/react/dev/chunks/vidstack-CvY7pagE.js
var import_react = __toESM(require_react(), 1);
var AudioProvider = class extends HTMLMediaProvider {
  constructor(audio, ctx) {
    super(audio, ctx);
    __publicField(this, '$$PROVIDER_TYPE', 'AUDIO');
    __publicField(this, 'airPlay');
    scoped(() => {
      this.airPlay = new HTMLAirPlayAdapter(this.media, ctx);
    }, this.scope);
  }
  get type() {
    return 'audio';
  }
  setup() {
    super.setup();
    if (this.type === 'audio') this.ctx.notify('provider-setup', this);
  }
  /**
   * The native HTML `<audio>` element.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement}
   */
  get audio() {
    return this.media;
  }
};
export { AudioProvider };
//# sourceMappingURL=vidstack-CvY7pagE-KABT244C.js.map
