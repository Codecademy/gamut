import { require_baseUnary } from './chunk-DJ6AUZB2.js';
import { require_isArguments, require_isIndex } from './chunk-J7QHC2UB.js';
import { require_isLength } from './chunk-PY63MGA6.js';
import {
  require_baseGetTag,
  require_freeGlobal,
  require_isObjectLike,
  require_root,
} from './chunk-KB4OAGHR.js';
import { require_isArray } from './chunk-ZBBJSO6M.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  '../../node_modules/lodash/_baseTimes.js'(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1,
        result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  },
});

// ../../node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  '../../node_modules/lodash/stubFalse.js'(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  },
});

// ../../node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  '../../node_modules/lodash/isBuffer.js'(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports =
      typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule =
      freeExports &&
      typeof module == 'object' &&
      module &&
      !module.nodeType &&
      module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  },
});

// ../../node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  '../../node_modules/lodash/_baseIsTypedArray.js'(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = '[object Arguments]';
    var arrayTag = '[object Array]';
    var boolTag = '[object Boolean]';
    var dateTag = '[object Date]';
    var errorTag = '[object Error]';
    var funcTag = '[object Function]';
    var mapTag = '[object Map]';
    var numberTag = '[object Number]';
    var objectTag = '[object Object]';
    var regexpTag = '[object RegExp]';
    var setTag = '[object Set]';
    var stringTag = '[object String]';
    var weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]';
    var dataViewTag = '[object DataView]';
    var float32Tag = '[object Float32Array]';
    var float64Tag = '[object Float64Array]';
    var int8Tag = '[object Int8Array]';
    var int16Tag = '[object Int16Array]';
    var int32Tag = '[object Int32Array]';
    var uint8Tag = '[object Uint8Array]';
    var uint8ClampedTag = '[object Uint8ClampedArray]';
    var uint16Tag = '[object Uint16Array]';
    var uint32Tag = '[object Uint32Array]';
    var typedArrayTags = {};
    typedArrayTags[float32Tag] =
      typedArrayTags[float64Tag] =
      typedArrayTags[int8Tag] =
      typedArrayTags[int16Tag] =
      typedArrayTags[int32Tag] =
      typedArrayTags[uint8Tag] =
      typedArrayTags[uint8ClampedTag] =
      typedArrayTags[uint16Tag] =
      typedArrayTags[uint32Tag] =
        true;
    typedArrayTags[argsTag] =
      typedArrayTags[arrayTag] =
      typedArrayTags[arrayBufferTag] =
      typedArrayTags[boolTag] =
      typedArrayTags[dataViewTag] =
      typedArrayTags[dateTag] =
      typedArrayTags[errorTag] =
      typedArrayTags[funcTag] =
      typedArrayTags[mapTag] =
      typedArrayTags[numberTag] =
      typedArrayTags[objectTag] =
      typedArrayTags[regexpTag] =
      typedArrayTags[setTag] =
      typedArrayTags[stringTag] =
      typedArrayTags[weakMapTag] =
        false;
    function baseIsTypedArray(value) {
      return (
        isObjectLike(value) &&
        isLength(value.length) &&
        !!typedArrayTags[baseGetTag(value)]
      );
    }
    module.exports = baseIsTypedArray;
  },
});

// ../../node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  '../../node_modules/lodash/_nodeUtil.js'(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports =
      typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule =
      freeExports &&
      typeof module == 'object' &&
      module &&
      !module.nodeType &&
      module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = (function () {
      try {
        var types =
          freeModule && freeModule.require && freeModule.require('util').types;
        if (types) {
          return types;
        }
        return (
          freeProcess && freeProcess.binding && freeProcess.binding('util')
        );
      } catch (e) {}
    })();
    module.exports = nodeUtil;
  },
});

// ../../node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  '../../node_modules/lodash/isTypedArray.js'(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray
      ? baseUnary(nodeIsTypedArray)
      : baseIsTypedArray;
    module.exports = isTypedArray;
  },
});

// ../../node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  '../../node_modules/lodash/_arrayLikeKeys.js'(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value),
        isArg = !isArr && isArguments(value),
        isBuff = !isArr && !isArg && isBuffer(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? baseTimes(value.length, String) : [],
        length = result.length;
      for (var key in value) {
        if (
          (inherited || hasOwnProperty.call(value, key)) &&
          !(
            skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
            (key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
              (isBuff && (key == 'offset' || key == 'parent')) || // PhantomJS 2 has enumerable non-index properties on typed arrays.
              (isType &&
                (key == 'buffer' ||
                  key == 'byteLength' ||
                  key == 'byteOffset')) || // Skip index properties.
              isIndex(key, length))
          )
        ) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  },
});

// ../../node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  '../../node_modules/lodash/_isPrototype.js'(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  },
});

export {
  require_isBuffer,
  require_nodeUtil,
  require_isTypedArray,
  require_arrayLikeKeys,
  require_isPrototype,
};
//# sourceMappingURL=chunk-ACWKLXN7.js.map
