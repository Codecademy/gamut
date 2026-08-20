import {
  require_ListCache,
  require_Map,
  require_MapCache,
} from './chunk-ESHVIK4X.js';
import { require_root } from './chunk-KB4OAGHR.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  '../../node_modules/lodash/_stackClear.js'(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  },
});

// ../../node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  '../../node_modules/lodash/_stackDelete.js'(exports, module) {
    function stackDelete(key) {
      var data = this.__data__,
        result = data['delete'](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  },
});

// ../../node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  '../../node_modules/lodash/_stackGet.js'(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  },
});

// ../../node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  '../../node_modules/lodash/_stackHas.js'(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  },
});

// ../../node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  '../../node_modules/lodash/_stackSet.js'(exports, module) {
    var ListCache = require_ListCache();
    var Map = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  },
});

// ../../node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  '../../node_modules/lodash/_Stack.js'(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = (this.__data__ = new ListCache(entries));
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype['delete'] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  },
});

// ../../node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  '../../node_modules/lodash/_Uint8Array.js'(exports, module) {
    var root = require_root();
    var Uint8Array = root.Uint8Array;
    module.exports = Uint8Array;
  },
});

export { require_Stack, require_Uint8Array };
//# sourceMappingURL=chunk-AMWG64K5.js.map
