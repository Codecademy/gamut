import {
  require_arrayLikeKeys,
  require_isPrototype,
} from './chunk-ACWKLXN7.js';
import { require_overArg } from './chunk-GODEWNY3.js';
import { require_isArrayLike } from './chunk-DJ6AUZB2.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  '../../node_modules/lodash/_nativeKeys.js'(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  },
});

// ../../node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  '../../node_modules/lodash/_baseKeys.js'(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != 'constructor') {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  },
});

// ../../node_modules/lodash/keys.js
var require_keys = __commonJS({
  '../../node_modules/lodash/keys.js'(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  },
});

export { require_keys };
//# sourceMappingURL=chunk-DXUOIL7S.js.map
