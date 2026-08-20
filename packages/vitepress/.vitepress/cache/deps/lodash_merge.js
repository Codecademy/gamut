import {
  require_baseRest,
  require_isArrayLikeObject,
} from './chunk-VPWSID2I.js';
import {
  require_cloneBuffer,
  require_cloneTypedArray,
  require_copyArray,
  require_copyObject,
  require_initCloneObject,
  require_keysIn,
} from './chunk-OS67M36N.js';
import { require_isPlainObject } from './chunk-3NRMCMWZ.js';
import { require_baseFor } from './chunk-NCFD7VAW.js';
import { require_Stack } from './chunk-AMWG64K5.js';
import { require_isBuffer, require_isTypedArray } from './chunk-ACWKLXN7.js';
import './chunk-GODEWNY3.js';
import { require_isArrayLike } from './chunk-DJ6AUZB2.js';
import './chunk-USBSOQYR.js';
import './chunk-X4575NEQ.js';
import { require_baseAssignValue } from './chunk-USMCKF2P.js';
import './chunk-DSHCLZZZ.js';
import { require_isArguments, require_isIndex } from './chunk-J7QHC2UB.js';
import './chunk-PY63MGA6.js';
import './chunk-MRFDMUT5.js';
import { require_eq } from './chunk-ESHVIK4X.js';
import { require_isFunction } from './chunk-C4YMECY4.js';
import { require_isObject } from './chunk-PG56PVWR.js';
import './chunk-KB4OAGHR.js';
import { require_isArray } from './chunk-ZBBJSO6M.js';
import { __commonJS } from './chunk-4B2QHNJT.js';

// ../../node_modules/lodash/_assignMergeValue.js
var require_assignMergeValue = __commonJS({
  '../../node_modules/lodash/_assignMergeValue.js'(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var eq = require_eq();
    function assignMergeValue(object, key, value) {
      if (
        (value !== void 0 && !eq(object[key], value)) ||
        (value === void 0 && !(key in object))
      ) {
        baseAssignValue(object, key, value);
      }
    }
    module.exports = assignMergeValue;
  },
});

// ../../node_modules/lodash/_safeGet.js
var require_safeGet = __commonJS({
  '../../node_modules/lodash/_safeGet.js'(exports, module) {
    function safeGet(object, key) {
      if (key === 'constructor' && typeof object[key] === 'function') {
        return;
      }
      if (key == '__proto__') {
        return;
      }
      return object[key];
    }
    module.exports = safeGet;
  },
});

// ../../node_modules/lodash/toPlainObject.js
var require_toPlainObject = __commonJS({
  '../../node_modules/lodash/toPlainObject.js'(exports, module) {
    var copyObject = require_copyObject();
    var keysIn = require_keysIn();
    function toPlainObject(value) {
      return copyObject(value, keysIn(value));
    }
    module.exports = toPlainObject;
  },
});

// ../../node_modules/lodash/_baseMergeDeep.js
var require_baseMergeDeep = __commonJS({
  '../../node_modules/lodash/_baseMergeDeep.js'(exports, module) {
    var assignMergeValue = require_assignMergeValue();
    var cloneBuffer = require_cloneBuffer();
    var cloneTypedArray = require_cloneTypedArray();
    var copyArray = require_copyArray();
    var initCloneObject = require_initCloneObject();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isArrayLikeObject = require_isArrayLikeObject();
    var isBuffer = require_isBuffer();
    var isFunction = require_isFunction();
    var isObject = require_isObject();
    var isPlainObject = require_isPlainObject();
    var isTypedArray = require_isTypedArray();
    var safeGet = require_safeGet();
    var toPlainObject = require_toPlainObject();
    function baseMergeDeep(
      object,
      source,
      key,
      srcIndex,
      mergeFunc,
      customizer,
      stack
    ) {
      var objValue = safeGet(object, key),
        srcValue = safeGet(source, key),
        stacked = stack.get(srcValue);
      if (stacked) {
        assignMergeValue(object, key, stacked);
        return;
      }
      var newValue = customizer
        ? customizer(objValue, srcValue, key + '', object, source, stack)
        : void 0;
      var isCommon = newValue === void 0;
      if (isCommon) {
        var isArr = isArray(srcValue),
          isBuff = !isArr && isBuffer(srcValue),
          isTyped = !isArr && !isBuff && isTypedArray(srcValue);
        newValue = srcValue;
        if (isArr || isBuff || isTyped) {
          if (isArray(objValue)) {
            newValue = objValue;
          } else if (isArrayLikeObject(objValue)) {
            newValue = copyArray(objValue);
          } else if (isBuff) {
            isCommon = false;
            newValue = cloneBuffer(srcValue, true);
          } else if (isTyped) {
            isCommon = false;
            newValue = cloneTypedArray(srcValue, true);
          } else {
            newValue = [];
          }
        } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          newValue = objValue;
          if (isArguments(objValue)) {
            newValue = toPlainObject(objValue);
          } else if (!isObject(objValue) || isFunction(objValue)) {
            newValue = initCloneObject(srcValue);
          }
        } else {
          isCommon = false;
        }
      }
      if (isCommon) {
        stack.set(srcValue, newValue);
        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
        stack['delete'](srcValue);
      }
      assignMergeValue(object, key, newValue);
    }
    module.exports = baseMergeDeep;
  },
});

// ../../node_modules/lodash/_baseMerge.js
var require_baseMerge = __commonJS({
  '../../node_modules/lodash/_baseMerge.js'(exports, module) {
    var Stack = require_Stack();
    var assignMergeValue = require_assignMergeValue();
    var baseFor = require_baseFor();
    var baseMergeDeep = require_baseMergeDeep();
    var isObject = require_isObject();
    var keysIn = require_keysIn();
    var safeGet = require_safeGet();
    function baseMerge(object, source, srcIndex, customizer, stack) {
      if (object === source) {
        return;
      }
      baseFor(
        source,
        function (srcValue, key) {
          stack || (stack = new Stack());
          if (isObject(srcValue)) {
            baseMergeDeep(
              object,
              source,
              key,
              srcIndex,
              baseMerge,
              customizer,
              stack
            );
          } else {
            var newValue = customizer
              ? customizer(
                  safeGet(object, key),
                  srcValue,
                  key + '',
                  object,
                  source,
                  stack
                )
              : void 0;
            if (newValue === void 0) {
              newValue = srcValue;
            }
            assignMergeValue(object, key, newValue);
          }
        },
        keysIn
      );
    }
    module.exports = baseMerge;
  },
});

// ../../node_modules/lodash/_isIterateeCall.js
var require_isIterateeCall = __commonJS({
  '../../node_modules/lodash/_isIterateeCall.js'(exports, module) {
    var eq = require_eq();
    var isArrayLike = require_isArrayLike();
    var isIndex = require_isIndex();
    var isObject = require_isObject();
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (
        type == 'number'
          ? isArrayLike(object) && isIndex(index, object.length)
          : type == 'string' && index in object
      ) {
        return eq(object[index], value);
      }
      return false;
    }
    module.exports = isIterateeCall;
  },
});

// ../../node_modules/lodash/_createAssigner.js
var require_createAssigner = __commonJS({
  '../../node_modules/lodash/_createAssigner.js'(exports, module) {
    var baseRest = require_baseRest();
    var isIterateeCall = require_isIterateeCall();
    function createAssigner(assigner) {
      return baseRest(function (object, sources) {
        var index = -1,
          length = sources.length,
          customizer = length > 1 ? sources[length - 1] : void 0,
          guard = length > 2 ? sources[2] : void 0;
        customizer =
          assigner.length > 3 && typeof customizer == 'function'
            ? (length--, customizer)
            : void 0;
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? void 0 : customizer;
          length = 1;
        }
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    module.exports = createAssigner;
  },
});

// ../../node_modules/lodash/merge.js
var require_merge = __commonJS({
  '../../node_modules/lodash/merge.js'(exports, module) {
    var baseMerge = require_baseMerge();
    var createAssigner = require_createAssigner();
    var merge = createAssigner(function (object, source, srcIndex) {
      baseMerge(object, source, srcIndex);
    });
    module.exports = merge;
  },
});
export default require_merge();
//# sourceMappingURL=lodash_merge.js.map
